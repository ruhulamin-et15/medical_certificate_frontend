import {
  useCertificatePaymentStatusQuery,
  useCertificateRefNumberQuery,
  useUpdateCertificateStatusMutation,
} from "@/redux/api/certificate/certificate.post";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import Loading from "../ui/Loading";
import Header from "../ui/Header";

const AdminPriority = ({ data }: { data: any }) => {
  const route = usePathname();

  const pathArr = route.split("/");
  const path = pathArr[pathArr.length - 2];
  const id = pathArr[pathArr.length - 1];

  const [updateStatus, { isLoading }] = useUpdateCertificateStatusMutation();
  const { data: isPaid, isLoading: loading2 } =
    useCertificatePaymentStatusQuery({ id });
  const {
    data: refId,
    isLoading: loading3,
    refetch,
  } = useCertificateRefNumberQuery({ id });

  const handleApprove = async () => {
    await updateStatus({ route: path, id: id, requestStatus: "APPROVED" });
    refetch();
  };

  const handleReject = async () => {
    await updateStatus({ route: path, id: id, requestStatus: "REJECTED" });
    refetch();
  };

  const handleRefund = async () => {
    await updateStatus({ route: path, id: id, requestStatus: "REFUNDED" });
    refetch();
  };

  // Determine the text color based on the status
  const statusColor =
    data?.requestStatus === "PENDING"
      ? "text-red-500"
      : data?.requestStatus === "REJECTED"
      ? "text-orange-500"
      : data?.requestStatus === "REFUNDED"
      ? "text-blue-500"
      : "text-green-500";

  // console.log(refId?.data?.referenceNumber);

  return (
    <div className="p-4">
      {isLoading || loading2 || loading3 ? (
        <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <Fragment></Fragment>
      )}
      <div className="">
        <Header center className="mb-5 underline">
          Admin Action
        </Header>
        <h2 className={`text-base font-semibold mb-1 `}>
          Reference Id:{" "}
          <span
            className={` ${
              refId?.data?.referenceNumber ? "text-green-500" : "text-red-500"
            }`}
          >
            {" "}
            {refId?.data?.referenceNumber
              ? refId?.data?.referenceNumber
              : "(Auto generate after approval)"}
          </span>
        </h2>
        <h2 className={`text-base font-semibold mb-1 `}>
          Order Id: <span className={`text-green-500`}> {data?.id}</span>
        </h2>
        <h2 className={`text-base font-semibold mb-1 `}>
          Payment Id:{" "}
          <span className={`text-green-500`}>
            {isPaid?.data?.id ? (
              isPaid?.data?.id
            ) : (
              <span className="text-red-500">Unpaid</span>
            )}
          </span>
        </h2>
        <h2 className={`text-base font-semibold mb-1 `}>
          Pricing Request:{" "}
          <span className={`text-green-500`}> {data?.priorityOption}</span>
        </h2>
        <h2 className={`text-base font-semibold mb-1 `}>
          Payment Amount:{" "}
          <span className={`text-blue-500`}>
            {parseFloat(data?.amount).toFixed(2)}
          </span>
        </h2>
        <h2 className={`text-base font-semibold mb-1 `}>
          Payment Status:{" "}
          <span>
            {isPaid?.data === "unpaid" ? (
              <span className="text-red-500">Unpaid</span>
            ) : (
              <span className="text-green-500">Paid</span>
            )}
          </span>
        </h2>
        <h2 className={`text-base font-semibold mb-10 `}>
          Application Status:{" "}
          <span className={`${statusColor}`}>{data?.requestStatus}</span>
        </h2>
        <div className=" flex flex-wrap gap-4">
          <button
            disabled={
              isPaid?.data === "unpaid" ||
              data?.requestStatus === "APPROVED" ||
              data?.amount <= 0
            }
            type="button"
            onClick={handleApprove}
            className="bg-green-500 disabled:bg-green-300 text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            {data?.requestStatus === "APPROVED"
              ? "Application Approved"
              : "Approve Application"}
          </button>
          <button
            type="button"
            disabled={data?.requestStatus === "REJECTED"}
            onClick={handleReject}
            className="bg-red-500 disabled:bg-red-300 text-white py-2 px-4 rounded hover:bg-red-600 transition"
          >
            Reject Application
          </button>
          <button
            type="button"
            disabled={
              isPaid?.data === "unpaid" || data?.requestStatus === "REFUNDED"
            }
            onClick={handleRefund}
            className="bg-orange-500 disabled:bg-orange-200 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
          >
            {data?.requestStatus === "REFUNDED"
              ? "Application Refunded"
              : "Refund Application"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPriority;
