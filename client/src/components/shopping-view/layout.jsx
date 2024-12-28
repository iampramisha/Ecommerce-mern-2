import React from 'react'
import ShoppingViewHeader from './header'
import { Outlet } from 'react-router-dom'

export default function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
     <ShoppingViewHeader/>
      <main className='flex flex-col w-full'>
<Outlet/>
      </main>
    </div>
  )
}
