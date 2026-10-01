import runningBlurPouch from "../assets/runningPouch-1.jpg";
import { ReactComponent as SlapsLogo } from "../components/SlapsLogo";
import MailingList from "../components/MailingList";
import HalftoneVeil from "../components/HalftoneVeil";
import { useState } from "react";

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/weslaps/about/",
  },
  { label: "hello@weslaps.com", href: "mailto:hello@weslaps.com" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/we.slaps?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  },
];

export default function Stealth() {
  const [pulse, setPulse] = useState<{ id: number; x: number; y: number }>();

  return (
    <div className="relative flex flex-col min-h-dvh overflow-hidden bg-stealth-dark font-stealth text-white">
      {/* Mobile crops tight on the pouch; desktop shows the wider frame */}
      <img
        src={runningBlurPouch}
        alt=""
        className="absolute right-0 bottom-0 h-[143%] max-w-none md:inset-0 md:w-full md:h-full md:object-cover md:object-[50%_29%]"
      />
      <HalftoneVeil className="absolute inset-0 w-full h-full" pulse={pulse} />

      {/* pt is 40px more than pb, nudging the block 20px below centre as in the design */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-[18px] pt-[104px] pb-16">
        <h1 className="sr-only">Slaps</h1>
        <SlapsLogo className="w-[232px] md:w-[322px] h-auto" />
        <p className="mt-4 md:mt-[23px] max-w-[277px] md:max-w-none text-[18px] md:text-[26px] leading-[20px] md:leading-normal tracking-[-0.05em] font-medium uppercase text-center">
          Protection for movement
          <span className="hidden md:inline"> - </span> Coming spring 2027
        </p>
        <div className="flex justify-center w-full mt-4 md:mt-[16px]">
          <MailingList
            variant="stealth"
            onSuccess={(origin) =>
              setPulse((p) => ({ id: (p?.id ?? 0) + 1, ...origin }))
            }
          />
        </div>
      </main>

      <footer className="font-regular  absolute inset-x-0 bottom-0 flex justify-between md:justify-center md:gap-10 px-[17px] pb-[14px] md:pb-[38px] text-[16px] md:text-[18px] leading-[0.969] tracking-[-0.05em]">
        {links.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="underline hover:text-stealth-dark transition-colors"
          >
            {label}
          </a>
        ))}
      </footer>
    </div>
  );
}
