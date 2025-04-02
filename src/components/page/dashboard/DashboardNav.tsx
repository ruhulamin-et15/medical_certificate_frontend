"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaChartBar, FaCog } from "react-icons/fa";
import Logo from "../../common/Logo";
import { RiFileDownloadFill } from "react-icons/ri";
// import { RiCouponLine } from "react-icons/ri";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { FaUsersGear } from "react-icons/fa6";

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();

  return (
    <aside
      style={{ position: "sticky" }}
      className={`bg-gray-800 print:hidden inset-y-0 text-white w-14 lg:w-64 min-h-screen flex flex-col transition-all duration-300 ease-in-out ${
        !isOpen ? "-ml-14 lg:-ml-64" : "ml-0"
      }`} // Change translation based on isOpen
    >
      <div className="">
        <div className="flex items-center space-x-2">
          <Logo sm />
          <span className="text-xl font-bold lg:block hidden">Admin Panel</span>
        </div>
      </div>
      <nav className="flex-1  py-4">
        <NavItem
          href="/dashboard"
          icon={<FaChartBar />}
          text="Dashboard"
          isActive={pathname === "/dashboard"}
        />
        <NavItem
          href="/dashboard/certificate-requests"
          icon={<RiFileDownloadFill />}
          text="Certificate Requests"
          isActive={pathname.includes("/certificate-requests")}
        />
        <NavItem
          href="/dashboard/all-certificates"
          icon={<BsFillClipboard2CheckFill />}
          text="All Certificates"
          isActive={pathname.includes("/all-certificates")}
        />
        <NavItem
          href="/dashboard/user-management"
          icon={<FaUsersGear />}
          text="User Management"
          isActive={pathname.includes("/user-management")}
        />
        <NavItem
          href="/dashboard/transactions"
          icon={<RiMoneyPoundCircleFill />}
          text="Transactions"
          isActive={pathname.includes("/transactions")}
        />
        {/* <NavItem
          href="/dashboard/coupon"
          icon={<RiCouponLine />}
          text="Coupon"
          isActive={pathname.includes("/coupon")}
        /> */}
        <NavItem
          href="/profile"
          icon={<FaCog />}
          text="Settings"
          isActive={pathname === "/settings"}
        />
        <NavItem
          href="/"
          icon={<FaHome />}
          text="Back to Home"
          isActive={pathname === "/analytics"}
        />
      </nav>
    </aside>
  );
};

const NavItem = ({
  href,
  icon,
  text,
  isActive,
}: {
  href: string;
  icon: React.ReactNode;
  text: string;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={`flex items-center space-x-2 text-gray-300 hover:text-white hover:bg-gray-700 p-2 px-4 mb-1 transition-colors duration-200 ${
      isActive ? "bg-gray-700 text-white" : ""
    }`}
  >
    <div className="text-2xl lg:text-base">{icon}</div>
    <span className="lg:block hidden">{text}</span>
  </Link>
);

export default Sidebar;
