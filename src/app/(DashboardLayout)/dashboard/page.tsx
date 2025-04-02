"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PieChartComponent from "@/components/page/dashboard/EarningsPieChart";
import ErrorBoundary from "@/components/ui/ErrorBoundary";
import { FaUser } from "react-icons/fa6";
import { RiFileDownloadFill } from "react-icons/ri";
import {
  useTodayEarningAdminQuery,
  useTotalEarningAdminQuery,
} from "@/redux/api/payment/payment.api";
import Loading from "@/components/ui/Loading";
import {
  useGetDashboardDataQuery,
  useGetUserForAdminQuery,
} from "@/redux/api/admin/user.api";
import { BsFillClipboard2CheckFill } from "react-icons/bs";
import { HiMiniReceiptRefund } from "react-icons/hi2";
import { MdOutlineFreeCancellation } from "react-icons/md";

const Dashboard: React.FC = () => {
  // Sample data for the dashboard statistics

  // State to check if the component is mounted
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading } = useTotalEarningAdminQuery(undefined);
  const { data: today, isLoading: loading2 } =
    useTodayEarningAdminQuery(undefined);
  const { data: users } = useGetUserForAdminQuery({ searchTerm: "", page: 1 });

  const { data: getDashboardData } = useGetDashboardDataQuery(undefined);

  const totalEarnings = data?.data ? parseFloat(data?.data) : 0;
  const todayEarnings = today?.data ? parseFloat(today?.data) : 0;
  const userData = users?.data?.meta?.total;
  const totalUsers = userData ? parseInt(userData) : 0;
  const totalPending = getDashboardData?.data?.all?.pending || 0;
  const totalApproved = getDashboardData?.data?.all?.approved || 0;
  const totalRejected = getDashboardData?.data?.all?.rejected || 0;
  const totalRefunded = getDashboardData?.data?.all?.refunded || 0;

  useEffect(() => {
    // Set mounted state to true when component mounts
    setIsMounted(true);
  }, []);

  return (
    <div className="">
      {isLoading || loading2 ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        ""
      )}
      <h1 className="text-3xl font-bold mb-6">Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {/* Statistics Cards with Links */}
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Earnings</h2>
            <p className="text-2xl text-green-500 mt-2">£ {totalEarnings}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/transactions"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Today&#39;s Earnings</h2>
            <p className="text-2xl text-teal-600 mt-2">£ {todayEarnings}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/transactions"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Total Certificates</h2>
            <p className="text-2xl flex gap-2 items-center text-blue-500 mt-2">
              <RiFileDownloadFill />
              {totalPending + totalApproved + totalRefunded + totalRejected}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/all-certificate"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>{" "}
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Total User</h2>
            <p className="text-2xl items-center text-violet-500 flex gap-2 mt-2">
              <FaUser /> {totalUsers}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/user-management"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Pending Requests</h2>
            <p className="text-2xl flex gap-2 items-center text-red-500 mt-2">
              <RiFileDownloadFill />
              {totalPending}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/certificate-requests"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Approved Requests</h2>
            <p className="text-2xl flex gap-2 items-center text-teal-600 mt-2">
              <BsFillClipboard2CheckFill />
              {totalApproved ? totalApproved : 0}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/all-certificates"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Rejected Requests</h2>
            <p className="text-2xl flex gap-2 items-center text-blue-500 mt-2">
              <MdOutlineFreeCancellation />
              {totalRejected ? totalRejected : 0}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/certificate-requests"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>{" "}
        <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg shadow p-4">
          <div>
            <h2 className="text-xl font-semibold">Refunded Requests</h2>
            <p className="text-2xl items-center text-violet-500 flex gap-2 mt-2">
              <HiMiniReceiptRefund /> {totalRefunded}
            </p>
          </div>
          <div className="flex flex-col justify-between">
            <div></div>
            <Link
              href="/dashboard/all-certificates"
              className="text-primary underline hover:no-underline"
            >
              View
            </Link>
          </div>
        </div>
      </div>

      {/* Chart Component - Render only if mounted */}
      <div className="bg-white flex justify-between flex-wrap gap-4 rounded-lg p-4">
        <div>
          <h2 className="text-xl font-semibold mb-4">Status Breakdown</h2>
          <ErrorBoundary>
            {isMounted && (
              <PieChartComponent
                todayEarnings={todayEarnings}
                totalEarnings={totalEarnings}
                totalRequests={totalPending}
                totalUsers={totalUsers}
              />
            )}
          </ErrorBoundary>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
