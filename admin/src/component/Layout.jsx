import React, { useState } from 'react'
import Nav from './Nav'
import Sidebar from './Sidebar'

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className='min-h-screen bg-slate-50'>
            <Nav toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 pt-20 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <Sidebar closeSidebar={() => setSidebarOpen(false)} />
            </div>

            {/* Overlay for mobile */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Main Content */}
            <main className={`transition-all duration-300 pt-20 md:pl-64 min-h-screen`}>
                <div className="p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default Layout
