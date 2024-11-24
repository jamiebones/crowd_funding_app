import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
const inter = Inter({ subsets: ["latin"] });

import AppKitProvider from "../context";
import './globals.css';





export const metadata: Metadata = {
  title: "Bitcoin Backed Crowd Funding Application",
  description: "This application is a prototype of a Crwod Funding Application backed by Bitcoin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <body className={inter.className}>
         <AppKitProvider>
     
          <div className="flex flex-col min-h-screen">
              <Navbar />
      
            <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-6">
              {/* Main Content Area */}

              {children}
              
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
              />
            </main>
          </div>
        </AppKitProvider>
      </body>
    </html>
  );
}

