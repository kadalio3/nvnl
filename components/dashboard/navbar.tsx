import { auth } from '@/auth'
import React from 'react'
import NavbarDashboard from './menu/dashboardmenu';

const Navbar = async () => {
    const session = await auth();
  return (
    <NavbarDashboard session={session ? { ...session, user: { ...session.user, name: session.user.name || '', image: session.user.image || undefined } } : null}/>
  )
}

export default Navbar