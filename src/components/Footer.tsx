import { Link } from "react-router-dom";
import { ReactComponent as SlapsLogo } from "./SlapsLogo";
import { ReactComponent as InstagramIcon } from "./socialIcons/InstagramIcon";
import { ReactComponent as FacebookIcon } from "./socialIcons/FacebookIcon";
import { ReactComponent as SpotifyIcon } from "./socialIcons/SpotifyIcon";
import { ReactComponent as YoutubeIcon } from "./socialIcons/YoutubeIcon";
import footerGradient from "../assets/footerGradient.svg";
import MailingList from "./MailingList";

interface FooterProps {
  onContactClick: () => void;
}

const Footer = ({ onContactClick }: FooterProps) => {
  const socialIcons = (
    <>
      <a
        href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        className="text-black-slaps hover:text-gold-slaps transition-colors"
      >
        <InstagramIcon className="w-6 h-6" />
      </a>
      <a
        href="https://www.youtube.com"
        target="_blank"
        rel="noreferrer"
        aria-label="YouTube"
        className="text-black-slaps hover:text-gold-slaps transition-colors"
      >
        <YoutubeIcon className="w-6 h-6" />
      </a>
      <a
        href="https://www.facebook.com/profile.php?id=61580049231291"
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        className="text-black-slaps hover:text-gold-slaps transition-colors"
      >
        <FacebookIcon className="w-6 h-6" />
      </a>
      <a
        href="https://www.spotify.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Spotify"
        className="text-black-slaps hover:text-gold-slaps transition-colors"
      >
        <SpotifyIcon className="w-6 h-6" />
      </a>
    </>
  );

  return (
    <div className="relative overflow-hidden bg-offwhite-slaps px-10 pt-10 pb-16">
      <img
        src={footerGradient}
        className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom translate-y-[35%] pointer-events-none"
        alt=""
      />

      {/* Mobile layout */}
      <div className="flex flex-col gap-8 relative z-10 md:hidden h-[60vh]">
        <MailingList variant="footer" />
        <div className="flex gap-8 text-black-slaps text-slaps-menu ml-auto md:mt-0 mt-10">
          <button
            onClick={onContactClick}
            className="uppercase hover:text-gold-slaps transition-colors underline"
          >
            Contact
          </button>
          <Link
            to="/privacy"
            className="uppercase hover:text-gold-slaps transition-colors underline"
          >
            Privacy
          </Link>
        </div>
        <div className="flex items-center gap-6 ml-auto">{socialIcons}</div>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="mt-auto cursor-pointer text-black-slaps hover:text-gold-slaps transition-colors"
        >
          <SlapsLogo className="fill-current w-[250px]" />
        </button>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex flex-col justify-between h-[calc(50vh-5rem)] gap-16 relative z-10">
        <div className="flex flex-col justify-end items-end w-full gap-8 mt-12">
          <div className="flex gap-8 text-black-slaps text-slaps-menu">
            <button
              onClick={onContactClick}
              className="uppercase hover:text-gold-slaps transition-colors underline"
            >
              Contact
            </button>
            <Link
              to="/privacy"
              className="uppercase hover:text-gold-slaps transition-colors underline"
            >
              Privacy
            </Link>
          </div>
          <MailingList variant="footer" />
        </div>
        <div className="flex justify-between items-center">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="cursor-pointer text-black-slaps hover:text-gold-slaps transition-colors"
          >
            <SlapsLogo className="fill-current w-[300px]" />
          </button>
          <div className="flex items-center gap-6">{socialIcons}</div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
