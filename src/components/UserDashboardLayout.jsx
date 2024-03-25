import React from 'react';
import { NavLink, Outlet,  } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';



export default function UserDashboardLayout() {

    return (
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row pt-16 lg:h-full gap-8">
            <PrivateRoute />
            <div className="lg:w-40 py-2 lg:py-16 px-4 mt-4 lg:mt-0 bg-white dark:bg-gray-800 lg:h-screen flex gap-4 flex-row lg:flex-col justify-center lg:justify-start text-xs lg:text-base">
                <div className="">
                    <NavLink to="." end>Dashboard</NavLink>
                </div>
                <div className="">
                    <NavLink to="deposit">Deposit</NavLink>
                </div>
                <div className="">
                    <NavLink to="apply-loan">Apply Loan</NavLink>
                </div>
                <div className="">
                    <NavLink to="user-transactions">Transaction Records</NavLink>
                </div>
                <div className="">
                    <NavLink to={`user-profile`}>User Profile</NavLink>
                </div>
            </div>
            <main className='flex flex-1 justify-center items-start mt-10 mb-10'>
                <Outlet />
            </main>
        </div>
    );
}
