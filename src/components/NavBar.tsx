"use client"
import React from 'react'
import { SidebarTrigger } from './ui/sidebar'
import { useIsMobile } from '@/hooks/use-mobile'

const NavBar = () => {
  const isMobile = useIsMobile()
  return (
    <div className='w-full bg-green-500 p-2 text-xl text-center flex justify-between items-center '>
     {isMobile && <SidebarTrigger className='size-4'/> }  <h2>Developed By Vipin</h2>
    </div>
  )
}

export default NavBar