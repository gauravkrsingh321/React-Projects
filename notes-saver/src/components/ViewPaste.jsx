import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function ViewPaste() {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);

  const filteredPaste = allPastes.filter((p) => p._id === id)[0];
  // track the id of the paste that was last copied
    const [copiedId, setCopiedId] = useState(null);
  function copyToClipBoard(text, id) {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopiedId(id))
      .catch((err) => alert("Failed to copy: " + err));
  }

  return (
    <div>
      <div className="flex flex-col">
        <div className="">
          <input
            className="p-2 min-w-[100%] text-sm sm:text-md sm:min-w-[100%] mr-4 border-white border rounded-2xl mt-4"
            type="text"
            placeholder="Enter title here"
            disabled
            value={filteredPaste.title}
          />
        </div>
        
          <div className="mt-6">
            <div className="w-full rounded-t-[1rem] flex bg-[#333333] items-center justify-between gap-x-4 px-4 py-2 "><div className="w-full flex gap-x-[6px] items-center select-none group"><div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]"></div><div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]"></div><div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]"></div></div><div className="w-fit rounded-t flex items-center justify-between gap-x-4 px-4"><button 
            onClick={() =>  copyToClipBoard(filteredPaste.content, filteredPaste._id)}
            className="flex justify-center items-center  transition-all duration-300 ease-in-out group">
              {copiedId === id ? (
                              <span className="text-green-400">Copied</span>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect
                                  width="14"
                                  height="14"
                                  x="8"
                                  y="8"
                                  rx="2"
                                  ry="2"
                                />
                                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                              </svg>
                            )}</button></div></div>
            <textarea
              disabled
              className="mb-4 bg-black text-sm sm:text-lg min-w-[340px] sm:min-w-[500px] p-4"
              value={filteredPaste.content}
              placeholder="Enter content here"
              rows={20}
            />
          </div>
        
      </div>
    </div>
  );
}

export default ViewPaste;
