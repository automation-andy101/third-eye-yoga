import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AuthWrapper from "@/components/AuthWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/globals.css";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "Third Eye Yoga | Book a Yoga Class",
  description: "Book a class at Third Eye Yoga",
};

export default function RootLayout({ children }) {
  return (
    <AuthWrapper>
      <html lang="en">
        <body className={`flex flex-col min-h-screen ${inter.className} `}>
          <Header />

          {/* <main className="mx-auto w-full px-4 py-6 sm:px-6 lg:px-8"> */}
          <main>
            {children}
          </main>

          <Footer />
          <ToastContainer />

        </body>
      </html>
    </AuthWrapper>
  );
}
