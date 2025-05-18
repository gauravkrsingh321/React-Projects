import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice'


function Paste() {
  //The key names in your Redux state are decided by the keys you provide in the reducer object when you configure your store.
  //reducer: {
  //   paste: pasteReducer 👈 'paste' becomes state.paste
  // },
  const pastes = useSelector((state) => state.paste.pastes)
  const dispatch = useDispatch()
  function deletePasteById(paste) {
    dispatch(removeFromPastes(paste))
  }
  return (
    <div className='mt-4 flex flex-col p-4 min-h-[400px] min-w-[250px] border-2 '>
      {pastes.map((paste)=>(
      <div className='flex gap-y-4 flex-col justify-center items-center' key={paste._id}>
        <p className='text-2xl pt-2 font-bold text-center'>{paste.title}</p>
        <p className=' text-md text-end'>Created At : {paste.createdAt}</p>
        <p className='text-xl pb-6'>{paste.content}</p>
        {/* or just pass paste._id and not whole paste object*/}
        <button onClick={() => deletePasteById(paste)} className='bg-amber-200 hover:bg-red-400 text-2xl'>Delete </button>
        <hr className='bg-red-400 h-1 w-full' />

        </div>
    ))}
    </div>
  )
}

export default Paste
