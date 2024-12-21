import React from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, UsersRound, Pencil, Zap, MousePointerClick, SlidersHorizontal, User } from 'lucide-react';
import NavigationLink from './NavigationLink';


const projectVariants = {
    close: {
        x: -300,
        opacity: 0,
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    open: {
        x: 0,
        opacity: 100,
        transition: {
            type: "spring",
            damping: 15,
            duration: 0.5,
            ease: "easeInOut",
        },
    },
};

interface ProjectNavigationProps {
    selectedProject: string;
    isOpen: boolean;
    setSelectedProject: (val: string | null) => void;
}

const projectNavigationData = {
    navigationLinks: [
        { name: "Progress", icon: <TrendingUp strokeWidth={2} className=" stroke-inherit min-w-8 w-8" /> },
        { name: "Team Members", icon: <UsersRound strokeWidth={2} className=" stroke-inherit min-w-8 w-8" /> },
        { name: "In Review", icon: <Pencil strokeWidth={2} className=" stroke-inherit min-w-8 w-8" /> },
        { name: "In Progress", icon: <Zap strokeWidth={2} className=" stroke-inherit min-w-8 w-8" /> },
        { name: "Up Next", icon: <MousePointerClick strokeWidth={2} className=" stroke-inherit min-w-8 w-8" /> },
        { name: "Project Settings", icon: <SlidersHorizontal strokeWidth={2} className=" stroke-inherit min-w-8 w-8" /> },
    ],
    teamMembers: [
        { name: "John Doe", icon: <User strokeWidth={2} className="stroke-rose-800 bg-rose-200/70 w-8 h-8 p-1 rounded-full" /> },
        { name: "Jason Bourne", icon: <User strokeWidth={2} className="stroke-emerald-800 bg-emerald-200/70 w-8 h-8 p-1 rounded-full" /> },
        { name: "James Jameson", icon: <User strokeWidth={2} className="stroke-indigo-800 bg-indigo-200/70 w-8 h-8 p-1 rounded-full" /> },
    ],
};

const ProjectNavigation = ({ selectedProject, isOpen, setSelectedProject }: ProjectNavigationProps) => {
    return (
        <motion.nav
            variants={projectVariants}
            initial="close"
            animate="open"
            exit="close"
            className={`h-full flex flex-col gap-8 w-64 absolute bg-neutral-900 ml-0 
                ${isOpen ? "left-64" : "left-20"} 
                border-r border-neutral-800 p-5 z-20`}
        >
            <div className="flex flex-row w-full justify-between place-items-center">
                <h1 className="tracking-wide text-neutral-100 text-lg">{selectedProject || "Projects"}</h1>
                <button onClick={() => setSelectedProject(null)}>
                    <X className="w-8 stroke-neutral-400" />
                </button>
            </div>
            <input placeholder="Search" type="text" className="px-3 py-2 tracking-wide rounded-lg bg-neutral-600/40 text-neutral-100" />

            <div className="flex flex-col gap-3">
                {projectNavigationData.navigationLinks.map((link) => (
                    <NavigationLink key={link.name} name={link.name} isOpen={isOpen}>
                        {link.icon}
                    </NavigationLink>
                ))}
            </div>

            <div className="flex flex-col gap-5">
                <h1 className="tracking-wide text-neutral-300">Team Members</h1>
                {projectNavigationData.teamMembers.map((member) => (
                    <a key={member.name} href="#" className="flex flex-row gap-3 place-items-center">
                        {member.icon}
                        <p className="tracking-wide text-neutral-400">{member.name}</p>
                    </a>
                ))}
            </div>
        </motion.nav>
    );
};

export default ProjectNavigation;