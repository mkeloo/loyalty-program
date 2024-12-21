import React from 'react';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectLinkProps {
    children: React.ReactNode;
    name: string;
    setSelectedProject: (val: string | null) => void;
    isOpen: boolean; // Control the collapsible state
    setIsOpen: (val: boolean) => void; // Function to open the first navbar
}

const ProjectLink = ({ children, name, setSelectedProject, isOpen, setIsOpen }: ProjectLinkProps) => {
    const handleClick = () => {
        setIsOpen(true); // Ensure the first navbar is open
        setSelectedProject(name);
    };

    return (
        <motion.a
            href="#"
            onClick={handleClick}
            className="relative flex cursor-pointer p-2 rounded-lg stroke-[1.75] hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-white place-items-center gap-3 transition-colors duration-100"
        >
            {/* Hover effect for collapsed sidebar */}
            {!isOpen && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 bg-neutral-700/50 rounded-lg -z-10"
                />
            )}

            {/* Animated children (icon or badge) */}
            <motion.div
                initial={{ scale: 1 }}
                animate={{
                    scale: isOpen ? 1 : 0.8,
                    opacity: isOpen ? 1 : 0.7,
                }}
                transition={{ duration: 0.3 }}
                className="flex items-center"
            >
                {children}
            </motion.div>

            {/* Animated project name */}
            <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{
                    opacity: isOpen ? 1 : 0,
                    width: isOpen ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="flex overflow-hidden items-center justify-between w-full"
            >
                <p className="text-inherit truncate whitespace-nowrap tracking-wide">{name}</p>
            </motion.div>

            {/* Conditional Chevron visibility */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronRight strokeWidth={2} className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
                </motion.div>
            )}
        </motion.a>
    );
};

export default ProjectLink;