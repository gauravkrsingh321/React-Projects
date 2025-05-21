import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

function Home() {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId") //from query parameter
  const dispatch = useDispatch();
  const allPastes = useSelector((state)=>state.paste.pastes)

  const createPaste = ()=> {
      if (!title.trim() || !value.trim()) {
        toast.error("Title and content cannot be empty");
        return;
      }
      const paste = {
        title:title,
        content:value,
        _id:pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString()
      }

      if(pasteId) {
        //update
        dispatch(updateToPastes(paste))
        toast.success('Paste Updated Successfully');
      }
      else {
        //create
        dispatch(addToPastes(paste))
      }

      //after creation or updation
      setTitle("");
      setValue("");
      setSearchParams({})
  }

  useEffect(()=>{
    if(pasteId) {
      const specificPaste =allPastes.find((p)=> p._id === pasteId)
      setTitle(specificPaste.title)
      setValue(specificPaste.content)
    }
  },[pasteId])

  return (
    <div className='flex flex-col'>
      <div className='text-sm sm:text-md'>
      <input className='p-2 sm:min-w-[68%] mr-4 border-white border rounded-2xl mt-2 sm:mt-4' type="text" 
      placeholder='Enter title here'
      value={title} 
      onChange={(e)=>setTitle(e.target.value)}/>

      <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>

    <div className='mt-5 mb-4'>
       <textarea 
       className='rounded-2xl bg-black mt-4 text-sm sm:text-lg min-w-[380px] sm:min-w-[500px] p-4'
       value={value}
       placeholder='Enter content here'
       onChange={(e)=>setValue(e.target.value)}
       rows={20}
       />
    </div>
    </div>
  )
}

export default Home