"use client";
import Button from "@/components/ui/Button";
import { useUser } from "@/lib/provider/UserProvider";
import { useGetLoggedInUserInvoiceQuery } from "@/redux/api/payment/payment.api";
import Link from "next/link";
import InvoiceTable from "./InvoiceTable";

export default function Component() {
  const { user, logout } = useUser();
  const { data,  isLoading } = useGetLoggedInUserInvoiceQuery(undefined);
  if (data) {
    // (data);
  }
  // (error);
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <section className="mb-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl mb-4">
          My Medical Certificates
        </h1>
        <div className="bg-black/5 border-b border-b-black/15 px-2 py-2">
          Certificate Name
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-xl md:text-3xl mb-4">My Account</h2>
        <ul className="mb-4 list-disc pl-5">
          <li>
            <strong>Username:</strong> {user?.firstName} {user?.lastName}
          </li>
          <li>
            <strong>Email:</strong> {user?.email}
          </li>
        </ul>
        <div className="flex gap-4 flex-wrap">
          <Link href={"/profile"}>
            <Button size="static">Profile</Button>
          </Link>
          <Link href={"/forgot-password"}>
            <Button size="static">Change Password</Button>
          </Link>
          <Button onClick={logout} size="static">
            Logout
          </Button>
        </div>
      </section>
      <hr className="mb-10" />
      <section>
        <h2 className="text-xl md:text-3xl mb-4">Past Invoices</h2>
        <InvoiceTable isLoading={isLoading} data={data?.data} />
      </section>
    </div>
  );
}
