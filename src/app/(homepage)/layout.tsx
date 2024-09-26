/* eslint-disable @next/next/no-page-custom-font */
"use client"

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Container } from "@mui/material";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import { Bounce } from 'react-toastify';

const HomepageLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div>
            <Head>
                <div>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link href="https://fonts.googleapis.com/css2?family=Jaro:opsz@6..72&display=swap" rel="stylesheet" />
                </div>

            </Head>
            <Header />
            <main className="py-2 pt-20 lg:pt-24 font-joro">
                <Container>
                    {children}
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        transition={Bounce}
                    />
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default HomepageLayout;