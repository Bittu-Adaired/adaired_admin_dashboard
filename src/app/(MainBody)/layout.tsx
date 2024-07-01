"use client";
import Footer from "@/Layout/Footer/Footer";
import { SideBar } from "@/Layout/Sidebar/Sidebar";
import Store from "@/Redux/Store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "../../../src/index.scss";
import { Header } from "@/Layout/Header/Header";
import TapTop from "@/Layout/TapTop";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={Store}>
      <div className={`page-wrapper compact-wrapper`} id="pageWrapper">
        <Header />
        <div className="page-body-wrapper">
          <SideBar />
          <div className="page-body">{children}</div>
          <Footer />
        </div>
      </div>
      <ToastContainer />
      <TapTop />
    </Provider>
  );
}
