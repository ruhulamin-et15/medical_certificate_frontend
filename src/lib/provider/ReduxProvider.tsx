"use client";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { UserProvider } from "./UserProvider";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>
  <UserProvider>{children}</UserProvider>  
  </Provider>;
};

export default ReduxProvider;
