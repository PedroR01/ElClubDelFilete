import { useEffect } from 'react';
import { AnimatePresence, motion } from "framer-motion";

export default function Toast({ message, visible, duration = 6000, onClose }) {
    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                onClose();
            }, duration);
            return () => clearTimeout(timer);
        }
    }, [visible, duration, onClose]);

    if (!visible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 40, opacity: 0 }}
                exit={{ x: 40 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="fixed flex justify-between w-96 h-20 bottom-5 right-5 transform bg-gradient-to-t from-[#24222B] to-[#19171e] bg-opacity-80 text-[#FEFFFB] px-4 py-2 rounded shadow-lg transition-opacity duration-300 items-center">
                <p className='justify-self-start'>{message}</p>
                <div className='bg-[#d49932] w-8 h-8 rounded-full animate-pulse-custom'></div>
            </motion.div>
        </AnimatePresence>
    );
}