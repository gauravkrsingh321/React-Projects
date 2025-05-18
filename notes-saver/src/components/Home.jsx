import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router'
import { addToPastes, updateToPastes } from '../redux/pasteSlice'

function Home() {
  const [title, setTitle] = useState('')
  const [value, setValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const pasteId = searchParams.get("pasteId") //from query parameter
  const dispatch = useDispatch();

  const createPaste = ()=> {
      const paste = {
        title:title,
        content:value,
        _id:pasteId || Date.now().toString(36),
        createdAt: new Date().toISOString()
      }

      if(pasteId) {
        //update
        dispatch(updateToPastes(paste))
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

  return (
    <div className='flex flex-col'>
      <div className=''>
      <input className='p-2 min-w-[64%] mr-4 border-white border rounded-2xl mt-2' type="text" 
      placeholder='Enter title here'
      value={title} 
      onChange={(e)=>setTitle(e.target.value)}/>

      <button onClick={createPaste} className='p-2 rounded-2xl mt-2'>
        {
          pasteId ? "Update My Paste" : "Create My Paste"
        }
      </button>
    </div>

    <div className='mt-8'>
       <textarea 
       className='rounded-2xl bg-black mt-4 min-w-[500px] p-4'
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