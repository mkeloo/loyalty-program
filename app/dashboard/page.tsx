"use client";

import React, { useState } from "react";
import Navigation from "@/components/Dashboard/Structure/Navigation";
import HeaderBar from "@/components/Dashboard/Structure/HeaderBar";
import { motion } from "framer-motion";

const DashboardPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<string>("Dashboard"); // Default to "Dashboard"

    // Function to update the current page
    const handleSetCurrentPage = (page: string) => {
        setCurrentPage(page); // Dynamically update the current page title
    };

    return (
        <main className="w-full min-h-[100vh] h-full flex flex-row relative bg-black overflow-y-scroll scrollbar-hidden">
            <Navigation
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen}
                setCurrentPage={handleSetCurrentPage} // Pass the dynamic function
            />

            <motion.section
                animate={{
                    marginLeft: isSidebarOpen ? "16rem" : "5.5rem",
                }}
                transition={{
                    type: "spring",
                    damping: 15,
                    stiffness: 100,
                }}
                className="w-full h-full flex flex-col bg-black"
            >
                <HeaderBar />
                <div className="flex flex-col px-10 py-5 gap-5">
                    <div className="flex justify-between items-center">
                        <h1 className="text-4xl text-neutral-200">{currentPage}</h1>
                    </div>
                </div>
            </motion.section>
        </main>
    );
};

export default DashboardPage;