import React from 'react'
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="py-2 z-10">
        <div className="md:w-11/12 w-full md:px-0 px-3 mx-auto ">     
            <div className="flex items-center justify-between h-16">
            <div className="flex gap-4 items-center">
                <p style={{fontSize:'25px', marginLeft:'11%'}}><b>GrievanceAlly</b></p>
                <div style={{marginLeft:'55%'}}className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className=" hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Home
                    </Link>
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Departments
                    </Link>
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-rgb(226, 165, 52) px-3 py-2 rounded-md text-sm font-medium"
                    >
                    About
                    </Link>
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-rgb(226, 165, 52) px-3 py-2 rounded-md text-sm font-medium"
                    >
                    New
                    </Link>
                    <Link
                    to="/" style={{fontSize:'16.5px'}}
                    className="hover:bg-button-primary hover:text-rgb(226, 165, 52) px-3 py-2 rounded-md text-sm font-medium"
                    >
                    Contact
                    </Link>
                </div>
                </div>
            </div>
            </div>
            </div>
        </nav>
  )
}
