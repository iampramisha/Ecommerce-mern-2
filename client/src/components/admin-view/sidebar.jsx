
import { ChartNoAxesCombined } from 'lucide-react'
import React, { Fragment } from 'react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { BadgeCheck, LayoutDashboard, ShoppingBasket } from "lucide-react"

import { useNavigate } from 'react-router-dom'
import { SheetClose } from '../ui/sheet'
export const adminSidebarMenuItems=[
  {
    id:'dashboard',
    label:'Dashboard',
    path:'/admin/dashboard',
    icon: <LayoutDashboard/>
  },
  {
    id:'products',
    label:'Products',
    path:'/admin/products',
    icon:<ShoppingBasket/>
  },
  {
    id:'orders',
    label:'Orders',
    path:'/admin/orders',
    icon:<BadgeCheck/>
  }

]
function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  
  return (
    <nav className='mt-8 flex flex-col gap-2'>
      {adminSidebarMenuItems.map(MenuItem => (
        <div
          key={MenuItem.id}
          onClick={() => {
            navigate(MenuItem.path);
            setOpen ? setOpen(false) : null;
          }}
          className='flex items-center text-xl gap-2 cursor-pointer rounded-md px-3 py-2 text-muted-foreground hover:bg-muted'
        >
          {MenuItem.icon}
          <span>{MenuItem.label}</span>
        </div>
      ))}
    </nav>
  )
}
export default function AdminSidebar({open,setOpen}) {
  const navigate=useNavigate();
  return (
  
<Fragment>
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="left" className="w-64">
    <div className='flex flex-col h-full'>
<SheetHeader className="border-b">

  <SheetTitle className="flex gap-2 mt-5 mb-4 justify-between">
  <ChartNoAxesCombined size={30}/>
  <h1 className='text-2xl font-extrabold'>Admin Panel</h1>
  </SheetTitle>
</SheetHeader>
<MenuItems setOpen={setOpen}></MenuItems>
    </div>
  
  </SheetContent>
</Sheet>
<aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <ChartNoAxesCombined size={30} />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
</Fragment>
  )
}
