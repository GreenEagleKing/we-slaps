import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as SlapsLogo } from "./SlapsLogo";
import { ReactComponent as CrossIcon } from "./CrossIcon";
import { ReactComponent as MenuCross } from "./MenuCross";


interface NavbarProps {
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLFGModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPrivacyModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAboutModal: React.Dispatch<React.SetStateAction<boolean>>;
  onMailingListClick?: () => void;
}

const Navbar = ({ setShowContactModal, setShowLFGModal, setShowPrivacyModal, setShowAboutModal, onMailingListClick }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-x-0 top-0 z-20">
      <nav className="flex justify-between items-center px-5 py-4">
        <SlapsLogo className="fill-white" />

        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setShowAboutModal(true)}
            className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading cursor-pointer"
          >
            About
          </button>
                    <button
            onClick={() => onMailingListClick?.()}
            className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading"
          >
            Mailing List
          </button>
          <a
            href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading"
            href="https://www.linkedin.com/company/weslaps/" target="_blank" rel="noreferrer"
          >
            LinkedIn
          </a>
          <button
            onClick={() => setShowContactModal(true)}
            className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading"
          >
            Contact
          </button>

        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="cursor-pointer md:hidden"
          aria-label="Toggle menu"
        >
          <motion.div
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <CrossIcon className="fill-offwhite-slaps" />
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-5 top-full flex flex-col items-end gap-3 pt-2"
          >
            <button
              onClick={() => { setShowAboutModal(true); setOpen(false); }}
              className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10"
            >
              About <MenuCross className="fill-offwhite-slaps w-4"/>
            </button>
            <button
              onClick={() => { onMailingListClick?.(); setOpen(false); }}
              className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10"
            >
              Mailing List <MenuCross className="fill-offwhite-slaps w-4"/>
            </button>
            <a
              href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading flex items-center gap-10"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <MenuCross className="fill-offwhite-slaps w-4"/>
            </a>
            <a href="https://www.linkedin.com/company/weslaps/" target="_blank" rel="noreferrer"
              className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10"
            >
              LinkedIn <MenuCross className="fill-offwhite-slaps w-4"/>
            </a>
            <a
              onClick={() => { setShowContactModal(true); setOpen(false); }}
              className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10"
            >
              Contact <MenuCross className="fill-offwhite-slaps w-4"/>
            </a>

            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
