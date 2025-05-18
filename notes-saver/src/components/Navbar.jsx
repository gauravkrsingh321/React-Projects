import React from 'react'
import { NavLink } from 'react-router'

function Navbar() {
  return (
    <div className='flex text-2xl pt-4 justify-center  flex-row gap-4'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/pastes'>Pastes</NavLink>
    </div>
  )
}

export default Navbar