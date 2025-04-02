"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SnapImg from "@/assets/image/png/awsnap.png";
import AnimateHeader from "@/components/ui/AnimateHeader";
import { formatDate } from "@/utils/formateDate";
import {
  useBlockUserByAdminMutation,
  useGetSingleUserForAdminQuery,
} from "@/redux/api/admin/user.api";
import Loading from "@/components/ui/Loading";
import { useUser } from "@/lib/provider/UserProvider";

const Details = () => {
  const [showData, setShowData] = useState(true);
  const [showPopup, setShowPopup] = useState(false);
  const { id } = useParams();
  const router = useRouter();
  const { user: adminData } = useUser();

  const { data, isLoading, error } = useGetSingleUserForAdminQuery({
    id: id as string,
  });
  const [blockUser] = useBlockUserByAdminMutation();
  const user = data?.data;
  const [newStatus, setNewStatus] = useState(
    user?.status ? user.status : "ACTIVE"
  );

  useEffect(() => {
    if (error || !data) {
      setShowData(false);
    } else {
      setShowData(true);
    }
  }, [error, data]);

  // Handle user block/unblock toggle
  const toggleUserStatus = async () => {
    try {
      const updatedStatus = newStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
      await blockUser({ id: id as string, status: updatedStatus }).unwrap();
      setNewStatus(updatedStatus);
      setShowPopup(false); // Close popup after action
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  const words = "Opps... User Not Found".split("");

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-w-[500px]">
        <Loading />
      </div>
    );

  return (
    <div>
      {showData ? (
        <>
          <div className="flex flex-col items-center p-6">
            <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
                User Details
              </h2>

              <div className="grid gap-4 grid-cols-2">
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">User ID:</span>
                  <p className="text-gray-800">{user?.id ?? "N/A"}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Name:</span>
                  <p className="text-gray-800">
                    {user?.firstName} {user?.lastName ?? "N/A"}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Email:</span>
                  <p className="text-gray-800">{user?.email ?? "N/A"}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Phone:</span>
                  <p className="text-gray-800">{user?.phone ?? "N/A"}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Role:</span>
                  <p className="text-gray-800">{user?.role ?? "N/A"}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">Status:</span>
                  <p
                    className={`${
                      user?.status === "ACTIVE"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-medium`}
                  >
                    {user?.status ?? "N/A"}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">
                    Registered at:
                  </span>
                  <p className="text-gray-800">{formatDate(user?.createdAt)}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <span className="font-medium text-gray-600">
                    Profile updated at:
                  </span>
                  <p className="text-gray-800">{formatDate(user?.updatedAt)}</p>
                </div>
              </div>

              <div className="flex mt-5 gap-4">
                <button
                  onClick={() => router.back()}
                  className="w-full h-10 bg-primary text-white py-2 px-4 rounded hover:bg-primary transition duration-200"
                >
                  Go Back
                </button>
                <button
                  disabled={
                    user?.id === adminData?.id ||
                    user?.email === adminData?.email ||
                    adminData?.email === "admin@mediconline.com"
                  }
                  onClick={() => setShowPopup(true)}
                  className={`w-full h-10 ${
                    user?.status === "ACTIVE" ? "bg-red-600" : "bg-green-600"
                  } text-white py-2 px-4 rounded disabled:opacity-70 disabled:cursor-not-allowed hover:opacity-90 transition duration-200`}
                >
                  {user?.status === "ACTIVE" ? "Block User" : "Unblock User"}
                </button>
              </div>
            </div>
          </div>

          {/* Popup confirmation */}
          {showPopup && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <p className="text-lg font-semibold text-gray-800 mb-4">
                  Are you sure you want to{" "}
                  {newStatus === "ACTIVE" ? "block" : "unblock"} this user?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowPopup(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={toggleUserStatus}
                    className={`px-4 py-2 rounded ${
                      newStatus === "ACTIVE"
                        ? "bg-red-600 text-white hover:bg-red-700"
                        : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                  >
                    {newStatus === "ACTIVE" ? "Block" : "Unblock"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex w-full flex-col h-full items-center justify-center">
          <Image
            alt="snap"
            src={SnapImg}
            width={150}
            height={150}
            priority
            style={{ width: "auto", height: "auto" }}
            className="max-w-20"
          />
          <AnimateHeader
            words={words}
            className="text-gray-600 font-semibold text-2xl"
          ></AnimateHeader>
        </div>
      )}
    </div>
  );
};

export default Details;
