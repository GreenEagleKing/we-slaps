import { ReactComponent as SlapsLogo } from "./SlapsLogo";
// import { ReactComponent as InstagramIcon } from "./socialIcons/InstagramIcon";
// import { ReactComponent as FacebookIcon } from "./socialIcons/FacebookIcon";
// import { ReactComponent as SpotifyIcon } from "./socialIcons/SpotifyIcon";
// import { ReactComponent as YoutubeIcon } from "./socialIcons/YoutubeIcon";

const Footer = () => {
  return (
    <div className="bg-white-slaps flex justify-center items-center px-5 py-4 pt-[10vh] gap-4">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
        className="cursor-pointer text-black-slaps hover:text-gold-slaps transition-colors"
      >
        <SlapsLogo className="fill-current mb-10" />
      </button>
      {/* <div className="flex items-center gap-6 mr-10">
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
      </div> */}
    </div>
  );
};

export default Footer;
