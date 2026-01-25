"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "/assets/images/logo_1.png";
import { FaUser, FaSignInAlt, FaSignOutAlt, FaBuilding, FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import destroySession from "/app/actions/destroySession";
import { useAuth } from "/context/authContext";
import { useState } from "react";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const { isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin, currentUser } = useAuth();

    const handleLogout = async () => {
        const { success, error } = await destroySession();

        if (success) {
            setIsAuthenticated(false);
            setIsAdmin(false);
            router.push("/login");
        } else {
            toast.error(error);
        }
    };

    return (
            <header className="bg-gray-100">
                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <Link href="/" aria-label="Go to home">
                                <Image
                                    className="h-14 w-auto"
                                    src={logo}
                                    alt="Third Eye Yoga"
                                    priority
                                />
                            </Link>

                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link
                                        href="/classes"
                                        data-testid="nav-class-schedule-desktop"
                                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Class Schedule
                                    </Link>

                                    {isAdmin && (
                                        <div className="relative group">
                                            {/* Admin trigger */}
                                            <span 
                                                className="cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                                data-testid="nav-admin-desktop"
                                            >
                                                Admin
                                            </span>

                                            {/* Dropdown */}
                                            <div className="absolute left-0 top-full z-10 hidden w-48 pt-2 group-hover:block">
                                                <div className="rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                                    <Link
                                                        href="/admin/dashboard"
                                                        data-testid="nav-admin-dashboard-desktop"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Dashboard
                                                    </Link>

                                                    <Link
                                                        href="/admin/teachers"
                                                        data-testid="nav-admin-teachers-desktop"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Teachers
                                                    </Link>

                                                    <Link
                                                        href="/admin/classes"
                                                        data-testid="nav-admin-classes-desktop"
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                    >
                                                        Classes
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="ml-auto">
                            <div className="ml-auto flex items-center md:ml-6">
                                {/* Desktop auth links */}
                                <div className="hidden md:flex items-center">
                                    {!isAuthenticated && (
                                        <>
                                            <Link
                                                href="/login"
                                                data-testid="nav-login-desktop"
                                                className="mr-3 text-gray-800 hover:text-gray-600"
                                            >
                                                <FaSignInAlt className="inline mr-1" /> Login
                                            </Link>
                                            <Link
                                                href="/register"
                                                data-testid="nav-register-desktop"
                                                className="mr-3 text-gray-800 hover:text-gray-600"
                                            >
                                                <FaUser className="inline mr-1" /> Register
                                            </Link>
                                        </>
                                    )}

                                    {isAuthenticated && (
                                        <>
                                            <Link 
                                                href="/bookings" 
                                                className="mr-3 text-gray-800 hover:text-gray-600"
                                                data-testid="nav-my-bookings-desktop"
                                            >
                                                <FaBuilding className="inline mr-1" /> My Bookings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                data-testid="nav-signout-desktop"
                                                className="text-gray-800 hover:text-gray-600"
                                            >
                                                <FaSignOutAlt className="inline mr-1" /> Sign Out
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* Mobile hamburger */}
                                <button
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    data-testid="nav-toggle-menu-mobile"
                                    className="md:hidden text-gray-800 focus:outline-none"
                                    aria-label="Toggle menu"
                                >
                                    {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-200 bg-gray-100">
                        <div className="space-y-1 px-4 py-4">
                            <Link
                                href="/"
                                onClick={() => setIsMenuOpen(false)}
                                data-testid="nav-class-schedule-mobile"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                            >
                                Class Schedule
                            </Link>

                            {isAdmin && (
                                <>
                                    <Link
                                        href="/admin/dashboard"
                                        onClick={() => setIsMenuOpen(false)}
                                        data-testid="nav-dashboard-mobile"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Admin Dashboard
                                    </Link>

                                    <Link
                                        href="/admin/teachers"
                                        onClick={() => setIsMenuOpen(false)}
                                        data-testid="nav-teachers-mobile"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Teachers
                                    </Link>

                                    <Link
                                        href="/admin/classes"
                                        onClick={() => setIsMenuOpen(false)}
                                        data-testid="nav-classes-mobile"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Classes
                                    </Link>
                                </>
                            )}

                            {!isAuthenticated && (
                                <>
                                    <Link
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        data-testid="nav-login-mobile"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        href="/register"
                                        onClick={() => setIsMenuOpen(false)}
                                        data-testid="nav-register-mobile"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Register
                                    </Link>
                                </>
                            )}

                            {isAuthenticated && (
                                <>
                                    <Link
                                        href="/bookings"
                                        onClick={() => setIsMenuOpen(false)}
                                        data-testid="nav-my-bookings-mobile"
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        My Bookings
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                            handleLogout();
                                        }}
                                        data-testid="nav-signout-mobile"
                                        className="w-full text-left rounded-md px-3 py-2 text-base font-medium text-gray-800 hover:bg-gray-700 hover:text-white"
                                    >
                                        Sign Out
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                )}

            </header>
    )
}

export default Header