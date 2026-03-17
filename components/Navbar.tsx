'use client';
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignInButton, SignUpButton, Show, UserButton, useUser } from "@clerk/nextjs";
import React from 'react'

const navItems = [
    {
        label: "Library",
        href: "/"
    },
    {
        label: "Add New",
        href: "/books/new"
    },
]
const Navbar = () => {
    const pathname = usePathname();
    const { user } = useUser();
    return (
        <header className='w-full fixed z-50 bg-[#F8F4E9]'>
            <div className="wrapper navbar-height py-4 flex justify-between items-center">
                <Link href="/" className="flex gap-0.5 items-center">
                    <Image
                        src="/assets/logo.png"
                        alt="Bookified"
                        width={42}
                        height={26}
                    />
                    <span className="logo-text">Bookified</span>
                </Link>
                <nav className="w-fit flex gap-7.5 items-center">
                    {
                        navItems.map(({ label, href }) => {
                            const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                            return (
                                <Link key={label} href={href} className={`nav-link-base ${isActive ? 'nav-link-active' : 'text-black hover:opacity-70'}`}>
                                    {label}
                                </Link>
                            )
                        })
                    }
                    <div className="flex gap-7 5 items-center">
                        <Show when="signed-out">
                            <SignInButton mode="modal" />
                            <SignUpButton mode="modal" />
                        </Show>
                        <Show when="signed-in">
                            <UserButton />
                            <div className="nav-user-link">
                                {/* <Image src={user?.imageUrl} alt={user?.fullName} width={40} height={40} /> */}
                                {user?.firstName && (<Link href="/subscriptions" className="nav-user-name">{user.firstName}</Link>)}
                            </div>
                        </Show>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar