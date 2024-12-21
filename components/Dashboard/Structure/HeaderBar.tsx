import React, { useState, useEffect } from 'react';
import { User, CalendarDays, Clock } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const HeaderBar = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [currentDate, setCurrentDate] = useState('');

    // Update time every minute
    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            setCurrentTime(
                now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            );
            setCurrentDate(
                now.toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })
            );
        };

        updateDateTime(); // Set initial time and date
        const interval = setInterval(updateDateTime, 60000); // Update every minute
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

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
                    <PopoverContent className="flex flex-col items-start justify-center p-4 bg-neutral-800 text-white rounded-lg shadow-lg space-y-2 max-w-fit mx-4">
                        <p className="text-sm font-semibold">Admin</p>
                        <a
                            href="/"
                            className="text-blue-400 font-semibold underline text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Live Website
                        </a>
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default HeaderBar;