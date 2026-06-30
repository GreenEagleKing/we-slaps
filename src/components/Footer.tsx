import { ReactComponent as SlapsLogo } from "./SlapsLogo";
import { ReactComponent as InstagramIcon } from "./socialIcons/InstagramIcon";
import { ReactComponent as FacebookIcon } from "./socialIcons/FacebookIcon";
import { ReactComponent as SpotifyIcon } from "./socialIcons/SpotifyIcon";
import { ReactComponent as YoutubeIcon } from "./socialIcons/YoutubeIcon";
import footerGradient from "../assets/footerGradient.svg";
import MailingList from "./MailingList";

interface FooterProps {
  onPrivacyClick: () => void;
  onContactClick: () => void;
}

const Footer = ({onPrivacyClick, onContactClick}:FooterProps) => {
  return (
    <div className="relative overflow-hidden bg-black-slaps flex flex-col justify-between pb-16 px-10 h-[50vh] pt-10 gap-16">
      <img src={footerGradient} className="absolute bottom-0 left-0 w-full h-full object-cover object-bottom translate-y-[30%] pointer-events-none" alt="" />
            <div className="flex justify-between items-center w-full relative z-10">
              <MailingList variant="footer" />
              <div className="flex gap-8 text-white-slaps text-slaps-menu pr-20 ">
                <button  onClick={() => onContactClick()} className="uppercase hover:text-gold-slaps transition-colors">Contact</button>
                <button onClick={() => onPrivacyClick()} className="uppercase hover:text-gold-slaps transition-colors">Privacy</button>
              </div>


            </div>
      <div className="flex justify-between items-center relative z-10">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="cursor-pointer text-white-slaps hover:text-gold-slaps transition-colors"
            >
              <SlapsLogo className="fill-current w-[200px]" />
            </button>
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="text-white-slaps hover:text-gold-slaps transition-colors"
              >
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61580049231291"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="text-white-slaps hover:text-gold-slaps transition-colors"
              >
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.spotify.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Spotify"
                className="text-white-slaps hover:text-gold-slaps transition-colors"
              >
                <SpotifyIcon className="w-6 h-6" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="text-white-slaps hover:text-gold-slaps transition-colors"
              >
                <YoutubeIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
    </div>
   
  );
};

export default Footer;
