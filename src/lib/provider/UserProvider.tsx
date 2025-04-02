"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import Cookies from "js-cookie";
import { User } from "../interface/user.interface";
import { useLoginMutation } from "@/redux/api/user/user.auth";
import { LoginUserInterface } from "@/redux/api/user/user.auth.interface";
import { usePathname, useRouter } from "next/navigation";
import baseApiHandler from "@/utils/baseApiHandler";

// Define the context type for user authentication
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (user: LoginUserInterface) => Promise<void>;
  logout: () => void;
  isError: boolean;
  loginLoading: boolean;
}

// Create the user context
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = usePathname();
  const router = useRouter();
  const [loginMutation, { isError, data, isLoading: loginLoading }] =
    useLoginMutation();
  const baseApi = baseApiHandler();
  // Function to fetch the logged-in user
  const fetchLoggedInUser = useMemo(() => {
    return async () => {
      const logout = () => {
        Cookies.remove("token");
        setUser(null);
        setIsAuthenticated(false);
        router.push("/login"); // Redirect to login after logout
        localStorage.setItem("logout", "You are logged out Successfully.");
      };

      const token = Cookies.get("token"); // Retrieve the token from cookies
      if (token) {
        try {
          const response = await fetch(`${baseApi}/auth/user`, {
            method: "GET",
            headers: {
              Authorization: `${token}`, // Set the token in the Authorization header
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            router.push("/");
            logout();
            throw new Error("Failed to fetch user data");
          }

          const result = await response.json();
          setUser(result.data); // Assuming the response structure contains user data
        } catch (error) {
          console.error("Error fetching logged-in user:", error);
        }
      }
    };
  }, [baseApi, router]);

  useEffect(() => {
    // Check authentication status and set loading to false after checking
    if (data) {
      const token = data?.data?.token;
      if (token) {
        Cookies.set("token", token, { secure: true, sameSite: "strict" });
        setIsAuthenticated(true);
      }
    }

    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      setIsAuthenticated(true);
      fetchLoggedInUser(); // Fetch user data if token exists
    } else {
      setIsAuthenticated(false);
    }

    setIsLoading(false); // Mark loading as done
  }, [data, fetchLoggedInUser]);

  useEffect(() => {
    if (
      isAuthenticated &&
      (location.toString() === "/login" || location.toString() === "/register")
    ) {
      router.push("/"); // Redirect user if authenticated
    }
  }, [isAuthenticated, location, router]);

  // Login function to handle form submission and manage tokens
  const login = async (user: LoginUserInterface) => {
    const email = user.email;
    const password = user.password;

    if (typeof email === "string" && typeof password === "string") {
      const loginData: LoginUserInterface = { email, password };
      try {
        const result = await loginMutation(loginData).unwrap();
        const token = result?.data?.token;

        if (token) {
          Cookies.set("token", token, { secure: true, sameSite: "strict" });
          setIsAuthenticated(true);
          setUser(result.data.user); // Assuming result.data.user contains the user info
          router.push("/"); // Redirect after successful login
        }
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Login failed:", error.message);
        } else {
          // console.error("An unexpected error occurred:", error);
        }
      }
    }
  };

  // Logout handler to clear user data and token
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login"); // Redirect to login after logout
    localStorage.setItem("logout", "You are logged out Successfully.");
  };

  return (
    <UserContext.Provider
      value={{ user, isAuthenticated, login, logout, isError, loginLoading }}
    >
      {!isLoading && children}{" "}
      {/* Only render children when loading is complete */}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
