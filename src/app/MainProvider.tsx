"use client";
import Store from "@/Redux/Store";
import React from "react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MainProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={Store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default MainProvider;
