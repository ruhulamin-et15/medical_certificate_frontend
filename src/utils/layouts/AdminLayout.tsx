"use client";
import { useUser } from "@/lib/provider/UserProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/ui/Loading";

interface PrivateLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: PrivateLayoutProps) => {
  const { user } = useUser();
  const router = useRouter();
  // const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token || (user && user.role !== "ADMIN")) {
      router.push("/login");
    } else if (token && !user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user, token, router]);

  // Show loading animation while user data is being fetched
  if (loading) {
    return (
      <div className="min-h-screen w-full fixed top-0 left-0 bg-black/25 flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  // Render children if the user is authenticated as ADMIN
  return <>{user?.role === "ADMIN" ? children : null}</>;
};

export default AdminLayout;
