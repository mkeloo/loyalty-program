import React, { useState, useEffect } from "react";
import { User, CalendarDays, Clock, LogOut, BookOpenText } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

const HeaderBar = () => {
    const [currentTime, setCurrentTime] = useState("");
    const [currentDate, setCurrentDate] = useState("");
    const router = useRouter();
    const supabase = createClient();

    // Update time every minute
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
            );
            setCurrentDate(
                now.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })
            );
        };

        updateDateTime(); // Set initial time and date
        const interval = setInterval(updateDateTime, 60000); // Update every minute
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
    };

    return (
        <div className="w-full flex items-center justify-between bg-gray-900 text-white px-4 py-3 shadow-md">
            {/* Left: Welcome Message */}
            <div className="text-lg">Welcome admin</div>

            {/* Right: Time, Date, and User Icon */}
            <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1 text-sm">
                    <Clock className="w-5 h-5 text-gray-300" />
                    <span>{currentTime}</span>
                </span>
                <span className="flex items-center space-x-1 text-sm">
                    <CalendarDays className="w-5 h-5 text-gray-300" />
                    <span>{currentDate}</span>
                </span>

                {/* Popover for User Icon */}
                <Popover>
                    <PopoverTrigger asChild>
                        <span className="p-2.5 flex items-center justify-center rounded-full bg-neutral-600 cursor-pointer">
                            <User className="w-5 h-5 text-gray-300" />
                        </span>
                    </PopoverTrigger>
                    <PopoverContent className="flex flex-col items-center justify-center p-4 bg-gray-700 text-white rounded-md shadow-md space-y-4 mx-6 w-60">
                        {/* Admin Label */}
                        <p className="text-sm font-semibold text-gray-200 border-b border-gray-600 pb-2 w-full text-center">
                            Admin Panel
                        </p>

                        {/* Live Website Link */}
                        <a
                            href="/"
                            className="w-full text-center flex justify-center items-center gap-2 px-3 py-2 text-sm font-semibold bg-blue-950 text-cyan-400 rounded-md hover:bg-cyan-500 transition-all duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <BookOpenText strokeWidth={2} className="w-5 h-5" />
                            Visit Website
                        </a>

                        {/* Logout Link */}
                        <a
                            onClick={handleLogout}
                            className="w-full text-center flex justify-center items-center gap-2 px-3 py-2 text-sm font-semibold text-white bg-red-600 rounded-md hover:bg-red-500 transition-all duration-200"
                            role="button"
                        >
                            <LogOut strokeWidth={2} className="w-5 h-5" />
                            Logout
                        </a>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default HeaderBar;