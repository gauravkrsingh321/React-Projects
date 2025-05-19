import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPastes, updateToPastes } from "../redux/pasteSlice";
import { NavLink } from "react-router";

function Paste() {
  //The key names in your Redux state are decided by the keys you provide in the reducer object when you configure your store.
  //reducer: {
  //   paste: pasteReducer 👈 'paste' becomes state.paste
  // },
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  // track the id of the paste that was last copied
  const [copiedId, setCopiedId] = useState(null);
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function deletePasteById(paste) {
    dispatch(removeFromPastes(paste));
  }
  function updatePasteById(paste) {
    dispatch(updateToPastes(paste));
  }

  // ← here: accept the text you want to copy
  function copyToClipBoard(text, id) {
    navigator.clipboard
      .writeText(text)
      .then(() => setCopiedId(id))
      .catch((err) => alert("Failed to copy: " + err));
  }

  if (filteredData.length === 0)
    return (
      <>
        <div className="relative mb-4 mt-4 w-[400px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
            placeholder="Search question here..."
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-2 text-xl p-4 text-center">
          No Paste Uploaded Yet{" "}
        </div>
      </>
    );

  return (
    <div>
      <div className="relative mb-4 mt-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-search absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-9"
          placeholder="Search question here..."
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="flex flex-col border w-full min-h-[250px] mb-8 max-w-[600px]  dark:border-gray-600 py-4 rounded-[0.4rem]">
        <h2 className="px-4 text-3xl font-bold border-b dark:border-gray-600 pb-4">
          All Pastes
        </h2>
        <div className="w-full px-4 pt-4 flex flex-wrap gap-y-5">
          <div className="border dark:border-gray-600 w-full  gap-y-6 justify-between flex-wrap flex flex-col sm:flex-row p-4 rounded-[0.3rem]">
            {filteredData.length >= 0 &&
              filteredData.map((paste) => {
                return (
                  <div
                    key={paste._id}
                    className="w-full flex flex-col flex-wrap"
                  >
                    <p className="text-2xl font-semibold">{paste.title} </p>
                    <div className="text-sm font-normal w-full pt-2 line-clamp-3 text-[#c5c4c4]">
                      {paste.content}
                      <span className="flex  gap-y-4 sm:items-end">
                        <span className="flex pt-3 gap-4 w-full flex-wrap sm:flex-nowrap">
                          <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 py-2 px-2 rounded-[0.2rem] bg-white dark:bg-black border dark:border-gray-600 hover:bg-transparent group hover:border-pictonBlue-500"
                            onClick={() => updatePasteById(paste)}
                          >
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
                              className="lucide lucide-pencil-line dark:text-white text-black group-hover:text-pictonBlue-500"
                            >
                              <path d="M12 20h9"></path>
                              <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"></path>
                              <path d="m15 5 3 3"></path>
                            </svg>
                          </button>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 py-2 px-2 rounded-[0.2rem] bg-white dark:bg-black border dark:border-gray-600 hover:bg-transparent group hover:border-indigo-500">
                            <NavLink to="/pastes/:id">
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
                                className="lucide lucide-eye dark:text-white text-black group-hover:text-indigo-500"
                              >
                                <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </NavLink>
                          </button>
                          <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 py-2 px-2 rounded-[0.2rem] bg-white dark:bg-black border dark:border-gray-600 hover:bg-transparent group hover:border-mandy-500"
                            onClick={() => deletePasteById(paste)}
                          >
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
                              className="lucide lucide-trash2 dark:text-white text-black group-hover:text-mandy-500"
                            >
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                              <line x1="10" x2="10" y1="11" y2="17"></line>
                              <line x1="14" x2="14" y1="11" y2="17"></line>
                            </svg>
                          </button>
                          <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 py-2 px-2 rounded-[0.2rem] bg-white dark:bg-black border dark:border-gray-600 hover:bg-transparent group hover:border-success-500"
                            onClick={() =>
                              copyToClipBoard(paste.content, paste._id)
                            }
                          >
                            {copiedId === paste._id ? (
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
                            )}
                          </button>
                          <button
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-primary-foreground h-10 py-2 px-2 bg-white rounded-[0.2rem] dark:bg-black border dark:border-gray-600 hover:bg-transparent group hover:border-chileanFire-500"
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="radix-:r16:"
                            data-state="closed"
                          >
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
                              className="lucide lucide-share dark:text-white text-black group-hover:text-chileanFire-400"
                            >
                              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                              <polyline points="16 6 12 2 8 6"></polyline>
                              <line x1="12" x2="12" y1="2" y2="15"></line>
                            </svg>
                          </button>
                        </span>
                      </span>
                      <p className="text-[0.8rem] pt-3 font-normal">
                        {new Date(paste.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        {new Date(paste.createdAt).toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>
                      <hr className="h-1 mt-3 w-full " />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Paste;
