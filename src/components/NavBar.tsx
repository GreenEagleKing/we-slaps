import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as SlapsLogo } from "./SlapsLogo";
import { ReactComponent as CrossIcon } from "./CrossIcon";
import { ReactComponent as MenuCross } from "./MenuCross";


interface NavbarProps {
  onContactClick: () => void;
  onAboutClick: () => void;
  onMailingListClick?: () => void;
}

const Navbar = ({ onContactClick, onAboutClick, onMailingListClick }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full relative z-20">
      <nav className="flex justify-between items-center px-7 py-6 bg-offwhite-slaps">
        <SlapsLogo className="fill-black-slaps shrink-0" />

        <div className="hidden md:flex items-center gap-6 lg:gap-12 xl:gap-26">
          <button
            onClick={() => onAboutClick()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer hover:text-orange-slaps"
          >
            About
          </button>
                    <button
            onClick={() => onMailingListClick?.()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer hover:text-orange-slaps"
          >
            Mailing List
          </button>
          <a
            href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer hover:text-orange-slaps"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer hover:text-orange-slaps"
            href="https://www.linkedin.com/company/weslaps/" target="_blank" rel="noreferrer"
          >
            LinkedIn
          </a>
          <button
            onClick={() => onContactClick()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer hover:text-orange-slaps"
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
            <CrossIcon className="fill-orange-slaps" />
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
            className="absolute right-0 top-full w-2/3 min-h-[50vh] bg-offwhite-slaps flex flex-col items-end justify-center gap-8 px-8 py-10"
          >
            <button
              onClick={() => { onAboutClick(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-orange-slaps"
            >
              About <MenuCross className="fill-black-slaps w-4"/>
            </button>
            <button
              onClick={() => { onMailingListClick?.(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-orange-slaps"
            >
              Mailing List <MenuCross className="fill-black-slaps w-4"/>
            </button>
            <a
              href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading flex items-center gap-10 hover:text-orange-slaps"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <MenuCross className="fill-black-slaps w-4"/>
            </a>
            <a href="https://www.linkedin.com/company/weslaps/" target="_blank" rel="noreferrer"
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-orange-slaps"
            >
              LinkedIn <MenuCross className="fill-black-slaps w-4"/>
            </a>
            <a
              onClick={() => { onContactClick(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-orange-slaps"
            >
              Contact <MenuCross className="fill-black-slaps w-4"/>
            </a>

            
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
