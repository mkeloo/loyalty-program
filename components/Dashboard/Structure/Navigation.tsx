"use client";
import React, { useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCheck,
    Radiation,
    PanelRightClose,
    Home,
    Megaphone,
    Users,
    Clock,
    Settings,
    Gift,
    Sparkles,
} from "lucide-react";
import { motion, useAnimationControls, AnimatePresence } from "framer-motion";
import ProjectLink from "./ProjectLink";
import ProjectNavigation from "./ProjectNavigation";

const containerVariants = {
    close: {
        width: "5.5rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    open: {
        width: "16rem",
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const svgVariants = {
    close: {
        rotate: 360,
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    open: {
        rotate: 180,
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

const subMenuVariants = {
    close: {
        opacity: 0,
        y: -10,
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.3,
            ease: "easeInOut",
        },
    },
    open: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.3,
            ease: "easeInOut",
        },
    },
};

interface NavigationProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (val: boolean) => void;
    setCurrentPage: (page: string) => void; // Function to update current page
}

const Navigation = ({
    isSidebarOpen,
    setIsSidebarOpen,
    setCurrentPage,
}: NavigationProps) => {
    const [isOpen, setIsOpen] = useState(isSidebarOpen); // Sync local state with parent
    const [selectedProject, setSelectedProject] = useState<string | null>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null); // Track dropdown state
    const [activeLink, setActiveLink] = useState<string>("Dashboard"); // Track active link

    const containerControls = useAnimationControls();
    const svgControls = useAnimationControls();

    const navigationLinks = [
        {
            name: "Home",
            icon: <Home strokeWidth={2} className="min-w-8 w-8" />,
        },
        {
            name: "Rewards",
            icon: <Gift strokeWidth={2} className="min-w-8 w-8" />,
        },
        {
            name: "Member Tiers",
            icon: <Sparkles strokeWidth={2} className="min-w-8 w-8" />,
        },
        {
            name: "Campaigns",
            icon: <Megaphone strokeWidth={2} className="min-w-8 w-8" />,
            subLinks: [
                { name: "Active", icon: <Radiation strokeWidth={2} className="w-5 h-5" /> },
                { name: "Completed", icon: <CheckCheck strokeWidth={2} className="w-5 h-5" /> },
            ],
        },
        {
            name: "Members",
            icon: <Users strokeWidth={2} className="min-w-8 w-8" />,
        },
        {
            name: "Activity",
            icon: <Clock strokeWidth={2} className="min-w-8 w-8" />,
        },
        {
            name: "Settings",
            icon: <Settings strokeWidth={2} className="min-w-8 w-8" />,
        },
    ];

    // const projectLinks = [
    //     { name: "Virtual Reality", color: "bg-pink-700 border-pink-600" },
    //     { name: "Apple Vision Pro", color: "bg-indigo-700 border-indigo-600" },
    //     { name: "Augmented Reality", color: "bg-emerald-700 border-emerald-600" },
    //     { name: "AI Labs", color: "bg-lime-500 border-lime-200" },
    // ];

    useEffect(() => {
        if (isOpen) {
            containerControls.start("open");
            svgControls.start("open");
        } else {
            containerControls.start("close");
            svgControls.start("close");
            setOpenDropdown(null); // Close all dropdowns when sidebar collapses
        }
    }, [isOpen]);

    const handleOpenClose = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        setIsSidebarOpen(newState); // Sync with parent
        setSelectedProject(null); // Reset project-specific navigation
    };

    const handleNavigationClick = (page: string) => {
        if (!isOpen) {
            setIsOpen(true);
            setIsSidebarOpen(true); // Open the sidebar
        }

        // If the clicked link has sub-links and is already active, toggle the dropdown
        if (page === openDropdown) {
            setOpenDropdown(null); // Close the dropdown if it's open
        } else {
            setOpenDropdown(page); // Open the dropdown for this page
        }

        setActiveLink(page); // Update the active link
        setSelectedProject(null); // Close the second sidebar
        setCurrentPage(page); // Update the current page in the main content
    };

    const toggleDropdown = (name: string) => {
        if (!isOpen) {
            setIsOpen(true); // Open the sidebar if closed
            setIsSidebarOpen(true);
        }
        setOpenDropdown((prev) => (prev === name ? null : name)); // Toggle dropdown state
    };

    const handleSubLinkClick = (name: string) => {
        setActiveLink(name); // Set active link for the clicked sub-link
        setCurrentPage(name); // Update the current page in the main content
        setSelectedProject(null); // Close the second navbar (Project Navigation)
    };

    return (
        <>
            <motion.nav
                variants={containerVariants}
                animate={containerControls}
                initial="close"
                className="bg-gradient-to-br from-gray-600 via-gray-700 to-gray-800 flex flex-col z-30 gap-20 p-5 shadow shadow-neutral-600 absolute top-0 left-0 h-full overflow-y-scroll scrollbar-hidden"
            >

                <div className="w-full flex flex-row justify-between place-items-center">
                    {/* {isOpen && (
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" />
                    )} */}
                    <button
                        className="bg-slate-800 p-1.5 rounded-lg flex shadow-xl"
                        onClick={handleOpenClose}
                    >
                        <motion.span
                            variants={svgVariants}
                            animate={svgControls}
                            initial="close"
                            className="flex items-center "
                        >
                            <PanelRightClose
                                strokeWidth={2}
                                className="w-6 h-6 stroke-gray-300 hover:stroke-neutral-100 active:scale-110"
                            />
                        </motion.span>
                    </button>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col gap-3">
                    {navigationLinks.map((link) => (
                        <div key={link.name} className="flex flex-col">
                            <div
                                className={`flex items-center justify-between ${activeLink === link.name ? "bg-blue-950 text-cyan-400 font-bold" : "text-neutral-200"
                                    } p-2 rounded-lg cursor-pointer hover:text-white hover:bg-cyan-500`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent bubbling
                                    handleNavigationClick(link.name); // Navigate to the parent link
                                }}
                            >
                                <div className="flex items-center gap-3 active:scale-110 duration-200 transition-transform">
                                    {link.icon}
                                    {isOpen && <span className="truncate">{link.name}</span>}
                                </div>
                                {/* Dropdown Indicator */}
                                {link.subLinks && isOpen && (
                                    <motion.div
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: openDropdown === link.name ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center"
                                    >
                                        <ArrowRight
                                            strokeWidth={2}
                                            className="w-4 h-4 rotate-90 transition-transform"
                                        />
                                    </motion.div>
                                )}
                            </div>
                            {/* SubLinks */}
                            {link.subLinks && openDropdown === link.name && (
                                <motion.div
                                    variants={subMenuVariants}
                                    initial="close"
                                    animate="open"
                                    exit="close"
                                    className="py-2 px-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-b-xl shadow-2xl flex flex-col gap-2"
                                >
                                    {link.subLinks.map((subLink) => (
                                        <div
                                            key={subLink.name}
                                            className={`cursor-pointer  text-black hover:text-white hover:bg-neutral-700/30 p-2 rounded-md ${activeLink === subLink.name ? "bg-blue-950 text-cyan-400 font-bold" : ""
                                                }`}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent bubbling
                                                handleSubLinkClick(subLink.name);
                                                // setOpenDropdown(null); // Close dropdown on sublink click
                                            }}
                                        >
                                            <div className="flex items-center gap-3 active:scale-110 duration-200 transition-transform">
                                                {subLink.icon} {/* Render the sub-link icon */}
                                                <span>{subLink.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Project Links */}
                {/* <div className="flex flex-col gap-3">
                    {projectLinks.map((project) => (
                        <ProjectLink
                            key={project.name}
                            name={project.name}
                            setSelectedProject={(name) => {
                                setSelectedProject(name); // Open the second navbar
                                setOpenDropdown(null); // Close any open dropdown
                            }} // Ensure this resets the state
                            setIsOpen={setIsOpen} // Open the sidebar if collapsed
                            isOpen={isOpen}
                        >
                            <div
                                className={`min-w-4 mx-2 border rounded-full aspect-square ${project.color}`}
                            />
                        </ProjectLink>
                    ))}
                </div> */}
            </motion.nav>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectNavigation
                        selectedProject={selectedProject}
                        setSelectedProject={setSelectedProject}
                        isOpen={isOpen}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Navigation;