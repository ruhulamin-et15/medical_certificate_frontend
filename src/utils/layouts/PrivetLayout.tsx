"use client";
import { useUser } from "@/lib/provider/UserProvider";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import Loading from "@/components/ui/Loading";

interface PrivateLayoutProps {
  children: ReactNode;
}

const PrivateLayout = ({ children }: PrivateLayoutProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const token = Cookies.get("token");

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else if (user) {
      if (
        user.role !== "ADMIN" &&
        user.role !== "USER" &&
        user.role !== "SPECIALIST"
      ) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    } else {
      setLoading(true);
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

  // Render children if the user is authenticated with a valid role
  return (
    <>
      {user && ["ADMIN", "USER", "SPECIALIST"].includes(user.role as string)
        ? children
        : null}
    </>
  );
};

export default PrivateLayout;
