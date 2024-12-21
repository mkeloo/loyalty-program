"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client"; // Import createClient
import Navigation from "@/components/Dashboard/Structure/Navigation";
import HeaderBar from "@/components/Dashboard/Structure/HeaderBar";
import { motion } from "framer-motion";

const DashboardPage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState<string>("Dashboard"); // Default to "Dashboard"
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient(); // Instantiate Supabase client
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            const { data, error } = await supabase.auth.getSession();

            if (error || !data.session) {
                router.push("/login"); // Redirect to login if not authenticated
            } else {
                setIsLoading(false); // Stop loading when authenticated
            }
        };

        checkSession();
    }, [supabase, router]);

    // Function to update the current page
    const handleSetCurrentPage = (page: string) => {
        setCurrentPage(page); // Dynamically update the current page title
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                Loading...
            </div>
        );
    }

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
                    <button
                        onClick={async () => {
                            await supabase.auth.signOut();
                            router.push("/login");
                        }}
                        className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </motion.section>
        </main>
    );
};

export default DashboardPage;