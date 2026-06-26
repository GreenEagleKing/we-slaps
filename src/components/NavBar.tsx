import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as SlapsLogo } from "./SlapsLogo";
import { ReactComponent as CrossIcon } from "./CrossIcon";
import { ReactComponent as MenuCross } from "./MenuCross";


interface NavbarProps {
  onContactClick: () => void;
  onAboutClick: () => void;
  onMailingListClick?: () => void;
  onLogoClick?: () => void;
  onPrivacyClick: () => void;
}

const Navbar = ({ onContactClick, onAboutClick, onMailingListClick, onLogoClick, onPrivacyClick }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full relative z-20">
      <nav className="relative z-20 flex justify-between items-center px-7 py-6 bg-white-slaps">
        <button onClick={onLogoClick} aria-label="Go to homepage" className="cursor-pointer">
          <SlapsLogo className="fill-black-slaps shrink-0 h-6 sm:h-10" />
        </button>

        <div className="hidden md:flex items-center gap-6 lg:gap-12 xl:gap-26">
          <button
            onClick={() => onAboutClick()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-menu cursor-pointer hover:text-gold-slaps"
          >
            About
          </button>
                    <button
            onClick={() => onMailingListClick?.()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-menu cursor-pointer hover:text-gold-slaps"
          >
            Mailing List
          </button>
          <a
            href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-menu cursor-pointer hover:text-gold-slaps"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-menu cursor-pointer hover:text-gold-slaps"
            href="https://www.linkedin.com/company/weslaps/" target="_blank" rel="noreferrer"
          >
            LinkedIn
          </a>
           <button
            onClick={() => onPrivacyClick()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-menu cursor-pointer hover:text-gold-slaps"
          >
            Privacy
          </button>
          <button
            onClick={() => onContactClick()}
            className="uppercase text-black-slaps text-sm sm:text-base text-slaps-menu cursor-pointer hover:text-gold-slaps"
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
            <CrossIcon className="fill-gold-slaps" />
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute right-0 top-full w-full min-h-[30vh] bg-white-slaps flex flex-col items-end justify-start gap-8 px-8 py-10 md:hidden z-20"
          >
            <button
              onClick={() => { onAboutClick(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-gold-slaps"
            >
              About <MenuCross className="fill-black-slaps w-4"/>
            </button>
            <button
              onClick={() => { onMailingListClick?.(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-gold-slaps"
            >
              Mailing List <MenuCross className="fill-black-slaps w-4"/>
            </button>
            <a
              href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading flex items-center gap-10 hover:text-gold-slaps"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <MenuCross className="fill-black-slaps w-4"/>
            </a>
            <a href="https://www.linkedin.com/company/weslaps/" target="_blank" rel="noreferrer"
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-gold-slaps"
            >
              LinkedIn <MenuCross className="fill-black-slaps w-4"/>
            </a>
            <button
              onClick={() => { onPrivacyClick(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-gold-slaps"
            >
              Privacy <MenuCross className="fill-black-slaps w-4"/>
            </button>
            <a
              onClick={() => { onContactClick(); setOpen(false); }}
              className="uppercase text-black-slaps text-sm sm:text-base text-slaps-heading cursor-pointer flex items-center gap-10 hover:text-gold-slaps"
            >
              Contact <MenuCross className="fill-black-slaps w-4"/>
            </a>

            
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
