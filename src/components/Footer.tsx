interface FooterProps {
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Footer = ({ setShowContactModal }: FooterProps) => {
  return (
    <div className="flex text-center gap-4 lg:flex-col lg:gap-2">
      <a
        href="https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        className="uppercase underline-offset-4 underline text-white text-sm sm:text-base"
        target="_blank"
      >
        Instagram
      </a>
      <a
        onClick={() => setShowContactModal(true)}
        className="uppercase underline-offset-4 underline  text-white text-sm sm:text-base"
      >
        Contact Us
      </a>
      <a
        href=""
        className="uppercase underline-offset-4 underline text-white text-sm sm:text-base"
        target="_blank"
      >
        LFG
      </a>
    </div>
  );
};

export default Footer;
