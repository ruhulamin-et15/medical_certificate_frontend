// "use client";
// import { useParams, useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import SnapImg from "@/assets/image/png/awsnap.png";
// import AnimateHeader from "@/components/ui/AnimateHeader";
// import { formatDate } from "@/utils/formateDate";
// // import {
// //   useBlockUserByAdminMutation,
// // } from "@/redux/api/admin/user.api";
// import Loading from "@/components/ui/Loading";
// import { useGetSingleTransitionQuery } from "@/redux/api/admin/transitions";

// const Details = () => {
//   const [showData, setShowData] = useState(true);
//   // const [showPopup, setShowPopup] = useState(false);
//   // const [newStatus, setNewStatus] = useState("ACTIVE");
//   const { id } = useParams();
//   const router = useRouter();

//   const { data, isLoading, error } = useGetSingleTransitionQuery({
//     id: id as string,
//   });
//   // const [blockUser] = useBlockUserByAdminMutation();
//   const payment = data?.data;
//   // (payment);

//   useEffect(() => {
//     if (error || !data) {
//       setShowData(false);
//     } else {
//       setShowData(true);
//     }
//   }, [error, data]);

//   // Handle user block/unblock toggle
//   // const toggleUserStatus = async () => {
//   //   try {
//   //     const updatedStatus = newStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
//   //     await blockUser({ id: id as string, status: updatedStatus }).unwrap();
//   //     setNewStatus(updatedStatus);
//   //     setShowPopup(false); // Close popup after action
//   //   } catch (error) {
//   //     console.error("Error updating user status:", error);
//   //   }
//   // };

//   const words = "Opps... User Not Found".split("");

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-w-[500px]">
//         <Loading />
//       </div>
//     );

//   return (
//     <div>
//       {showData ? (
//         <>
//           <div className="flex flex-col items-center p-6">
//             <div className="w-full max-w-2xl bg-white rounded-lg shadow-md print:shadow-none p-6">
//               <h2 className="text-2xl font-semibold text-center mb-4 text-gray-800">
//                 Payment Details
//               </h2>

//               <div className="flex flex-wrap gap-1 mb-2 items-center">
//                 <span className="font-medium text-gray-600">Payment ID:</span>
//                 <p className="text-gray-800 text-wrap w-sm">
//                   {payment?.paymentId ?? "N/A"}
//                 </p>
//               </div>
//               <div className="flex gap-2 items-center mb-2">
//                 <span className="font-medium text-gray-600">Order ID:</span>
//                 <p className="text-gray-800">{payment?.orderId ?? "N/A"}</p>
//               </div>
//               <hr className="my-5" />
//               <div className="grid gap-4 grid-cols-2">
//                 <div className="flex gap-2 col-span-2 items-center">
//                   <span className="font-medium text-gray-600">
//                     Product Name:
//                   </span>
//                   <p className="text-gray-800">
//                     {payment?.productName ?? "N/A"}
//                   </p>
//                 </div>

//                 <div className="flex gap-2 items-center">
//                   <span className="font-medium text-gray-600">User Name:</span>
//                   <p className="text-gray-800">
//                     {payment?.customerDetails?.name ?? "N/A"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <span className="font-medium text-gray-600">Email:</span>
//                   <p className="text-gray-800">
//                     {payment?.customerDetails?.email ?? "N/A"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <span className="font-medium text-gray-600">Phone:</span>
//                   <p className="text-gray-800">
//                     {payment?.customerDetails?.phone ?? "N/A"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <span className="font-medium text-gray-600">
//                     Payment Method:
//                   </span>
//                   <p className="text-gray-800 first-letter:uppercase">
//                     {payment?.paymentMethod ?? "N/A"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <span className="font-medium text-gray-600">Status:</span>
//                   <p
//                     className={`${
//                       payment?.paymentStatus === "paid"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     } font-medium first-letter:uppercase`}
//                   >
//                     {payment?.paymentStatus ?? "N/A"}
//                   </p>
//                 </div>
//                 <div className="flex gap-2 items-center">
//                   <span className="font-medium text-gray-600">Paid at:</span>
//                   <p className="text-gray-800">
//                     {formatDate(payment?.createdAt)}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex mt-5 gap-4">
//                 <button
//                   onClick={() => router.back()}
//                   className="w-full h-10 bg-primary text-white py-2 px-4 rounded btn transition duration-200"
//                 >
//                   Go Back
//                 </button>
//                 {/* <button
//                   onClick={() => setShowPopup(true)}
//                   className={`w-full h-10 ${
//                     user?.status === "ACTIVE" ? "bg-red-600" : "bg-green-600"
//                   } text-white py-2 px-4 rounded hover:opacity-90 transition duration-200`}
//                 >
//                   {user?.status === "ACTIVE" ? "Block User" : "Unblock User"}
//                 </button> */}
//               </div>
//             </div>
//           </div>

//           {/* Popup confirmation */}
//           {/* {showPopup && (
//             <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
//               <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
//                 <p className="text-lg font-semibold text-gray-800 mb-4">
//                   Are you sure you want to{" "}
//                   {newStatus === "ACTIVE" ? "block" : "unblock"} this user?
//                 </p>
//                 <div className="flex gap-4">
//                   <button
//                     onClick={() => setShowPopup(false)}
//                     className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={toggleUserStatus}
//                     className={`px-4 py-2 rounded ${
//                       newStatus === "ACTIVE"
//                         ? "bg-red-600 text-white hover:bg-red-700"
//                         : "bg-green-600 text-white hover:bg-green-700"
//                     }`}
//                   >
//                     {newStatus === "ACTIVE" ? "Block" : "Unblock"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )} */}
//         </>
//       ) : (
//         <div className="flex w-full flex-col h-full items-center justify-center">
//           <Image
//             alt="snap"
//             src={SnapImg}
//             width={150}
//             height={150}
//             priority
//             style={{ width: "auto", height: "auto" }}
//             className="max-w-20"
//           />
//           <AnimateHeader
//             words={words}
//             className="text-gray-600 font-semibold text-2xl"
//           ></AnimateHeader>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Details;
"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SnapImg from "@/assets/image/png/awsnap.png";
import AnimateHeader from "@/components/ui/AnimateHeader";
import Loading from "@/components/ui/Loading";
import { useGetSingleTransitionQuery } from "@/redux/api/admin/transitions";
import InvoiceComponent from "@/components/ui/payment/InvoiceComponent";
import Button from "@/components/ui/Button";
import { FaPrint } from "react-icons/fa6";

const Details = () => {
  const [showData, setShowData] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useGetSingleTransitionQuery({
    id: id as string,
  });
  const payment = data?.data;

  useEffect(() => {
    if (error || !data) {
      setShowData(false);
    } else {
      setShowData(true);
    }
  }, [error, data]);

  const words = "Opps... Data Not Found".split("");

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-w-[500px]">
        <Loading />
      </div>
    );

  return (
    <div className="container mx-auto p-4">
      <div className="print:hidden">
        <AnimateHeader
          center
          className="mb-10 text-primary"
          words={"Payment Details".split("")}
        />
      </div>
      {showData && payment ? (
        // Call the Invoice component and pass the payment data as props
        <div>
          <div className="flex print:hidden justify-between max-w-3xl mx-auto mb-10">
            <Button
              onClick={() => router.back()}
              size="static"
              className="bg-gray-50 !rounded-md border border-gray-300 text-gray-600 font-medium text-sm"
            >
              {"<"} Back
            </Button>
            <Button
              className="flex items-center gap-2 text-xl px-5"
              onClick={() => window.print()}
            >
              <FaPrint />
              Print Invoice
            </Button>
          </div>
          <InvoiceComponent info={payment} />
        </div>
      ) : (
        <div className="text-center mt-8">
          <Image
            src={SnapImg}
            alt="Not Found"
            className="mx-auto"
            width={200}
            height={200}
          />
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            {words.join(" ")}
          </h2>
        </div>
      )}
    </div>
  );
};

export default Details;
