import { ReactComponent as SlapsLogo } from "./SlapsLogo";

interface FooterProps {
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowLFGModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPrivacyModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer = ({
  setShowContactModal,
  setShowLFGModal,
  setShowPrivacyModal,
}: FooterProps) => {
  return (
    <div className="flex justify-between items-center px-5 py-4">
      <SlapsLogo className="fill-offwhite-slaps" />
      <div className="flex items-center gap-8">
        <a
          href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base"
          target="_blank"
          rel="noreferrer"
        >
          About
        </a>
        <button
          onClick={() => setShowLFGModal(true)}
          className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base cursor-pointer"
        >
          Mailing List
        </button>
        <a
          href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base"
          target="_blank"
          rel="noreferrer"
        >
          Instagram
        </a>
        <button
          onClick={() => setShowPrivacyModal(true)}
          className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base cursor-pointer"
        >
          Privacy
        </button>
        <button
          onClick={() => setShowContactModal(true)}
          className="uppercase underline-offset-4 underline text-offwhite-slaps text-sm sm:text-base cursor-pointer"
        >
          Contact
        </button>
      </div>
    </div>
  );
};

export default Footer;
