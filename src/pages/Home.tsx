import { useRef } from "react";
import MailingList from "../components/MailingList";
import { motion } from "framer-motion";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import ContactSection from "../components/ContactSection";
import Background from "../assets/landingV3BSmall.jpg";
import Pouch from "../assets/pouchWebRotateWide3.mp4";
import AboutImage from "../assets/pouchSide.jpg";
import { ReactComponent as PFMHorizontal } from "../components/PFMHorizontal.tsx";

export default function Home() {
  const MotionDiv = motion.create("div");
  const mailingRef = useRef<HTMLDivElement>(null);

  const scrollToMailingList = () =>
    mailingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });

  const scrollToAbout = () =>
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className="relative min-h-screen overflow-x-hidden overflow-y-auto flex flex-col bg-white-slaps">
      <NavBar
        onAboutClick={scrollToAbout}
        onContactClick={scrollToContact}
        onMailingListClick={scrollToMailingList}
      />
      <MotionDiv
        className="flex-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full border-r-[15px] border-l-[15px] border-white-slaps">
          <section className="area-main relative flex flex-col items-center w-full md:h-screen md:justify-center md:pt-[80px]">
            {/* Mobile: video in flow; Desktop: absolute background */}
            <video
              src={Pouch}
              autoPlay
              muted
              loop
              playsInline
              className="w-[80%] sm:w-[46%] mx-auto h-[80vh] md:h-[40vh] object-cover md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[55%] lg:w-[30%] md:h-auto md:object-contain md:z-0 md:pb-10 -mt-10"
            />

            {/* Desktop-only: original two-column overlay */}
            <div className="hidden md:flex relative z-10 w-full h-full">
              <div className="w-1/2 flex flex-col items-end justify-center gap-4 mr-[4vw]">
                <h1 className="text-gold-slaps uppercase text-slaps-h1 text-center text-[clamp(28px,4vw,56px)]">
                  This is suncare
                </h1>
                <div className="flex justify-end gap-[clamp(4px,0.5vw,16px)]">
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">
                    Broad Spectrum
                  </span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">
                    Advanced Formula
                  </span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">
                    High Protection
                  </span>
                </div>
              </div>
              <div className="w-1/2 flex flex-col items-start justify-center gap-4 ml-[4vw]">
                <h1 className="text-gold-slaps uppercase text-slaps-h1 text-center text-[clamp(28px,4vw,56px)]">
                  built to move.
                </h1>
                <div className="flex gap-[clamp(4px,0.5vw,16px)]">
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">
                    Sweat Resistant
                  </span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">
                    Super-Lightweight
                  </span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">
                    Built-in Hydration
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile-only: stacked headings + pill grid */}
            <div className="flex flex-col items-center gap-6 w-full md:px-4 py-8 md:hidden pt-0 -mt-24 relative z-10">
              <h1 className="text-gold-slaps uppercase text-slaps-h1 text-start md:text-[50px] text-[50px] leading-[45px] sm:pr-40 pl-10 pr-20">
                This is suncare built to move.
              </h1>
            </div>

            {/* Early access marquee — both viewports */}
            <div className="mt-6 md:mt-20 flex flex-col items-center z-10">
              <span className="bg-offwhite-slaps rounded-t-lg md:px-10 pl-6 pr-4 py-2 text-black-slaps text-slaps-body uppercase text-xs md:text-base">
                Early Access <span className="ml-2 mr-0">▼</span>
              </span>
              <div className="border-2 border-offwhite-slaps bg-white-slaps">
                <div className="w-full overflow-hidden my-6">
                  <div className="flex flex-shrink-0 animate-marquee">
                    <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite-slaps" />
                    <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps" />
                    <PFMHorizontal
                      className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite
                    -slaps"
                    />
                    <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps" />
                    <PFMHorizontal
                      className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite-slaps"
                      aria-hidden="true"
                    />
                    <PFMHorizontal
                      className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps"
                      aria-hidden="true"
                    />
                    <PFMHorizontal
                      className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite-slaps"
                      aria-hidden="true"
                    />
                    <PFMHorizontal
                      className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="md:ml-6 md:mt-30 mt-10 mb-5">
            <h2 className="text-slaps-h2 md:text-[28px] text-[16px] text-black-slaps uppercase text-start md:text-left">
              Join Mailing List For Early Access
            </h2>
          </div>
          <section className="relative h-[50vh] overflow-hidden mb-[20vh] rounded-lg">
            <img
              src={Background}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              ref={mailingRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-14 sm:gap-20 max-w-xl mx-auto"
            >
              <MailingList />
            </div>
          </section>

          <section
            id="about"
            className="relative overflow-hidden mb-[20vh] flex flex-col md:flex-row justify-between items-stretch"
          >
            <div className="flex flex-col justify-between items-stretch md:ml-6 bg-[#F0F0F0] rounded-lg w-full mr-4 px-4 md:px-8 order-2 md:order-1 md:mt-0 mt-4">
              {/* Mobile */}
              <h2 className="md:hidden text-slaps-h2 text-[50px] text-black-slaps text-start mb-10 mt-16">
                Sunscreen
                <br />
                wasn't built
                <br />
                for people
                <br />
                who move.
                <br />
                So we built
                <br />
                one that is.
              </h2>
              {/* Desktop */}
              <h2 className="hidden md:block text-slaps-h2 md:text-[60px] text-black-slaps text-start mb-10 mt-16">
                Sunscreen wasn't built for <br /> people who move.
                <br />
                So we built one that is.
              </h2>

              <div className="flex flex-col md:pb-10 pb-20">
                <button
                  className="mt-8 text-slaps-heading border-2 border-gold-slaps text-black-slaps bg-white-slaps py-2 md:py-4 px-16 rounded-full uppercase text-sm hover:text-black-slaps transition-colors text-nowrap order-2 md:order-1 self-center md:self-start"
                  onClick={() => scrollToContact()}
                >
                  Contact Us
                </button>
                <p className="md:w-[35vw] text-slaps-body text-black-slaps text-[14px] md:text-[16px] my-10 order-1 md:order-2">
                  <span className="block">
                    We make protection for movement, body care built for the
                    new wave of sport and wellness. Guided by performance,
                    product innovation and cultural alignment.
                  </span>
                  <span className="block mt-4">
                    Our mission is to make SPF the norm - trusted by pros and
                    a core piece of kit for any casual athlete. We’re
                    optimising products that fit effortlessly into active
                    lifestyles and support skin health.
                  </span>
                  <span className="block mt-4">
                    Sun protection has been left behind and we’re bringing it
                    up to speed. No longer a chore, but an experience.
                  </span>
                  <span className="block mt-4">
                    We’re working on it. For now, join our mailing list, get
                    early access and join us on this journey building SLAPS.
                  </span>
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <img
                src={AboutImage}
                alt="About SLAPS"
                className="w-full md:max-w-[40vw] aspect-[4/5] object-cover rounded-lg mr-6"
              />
            </div>
          </section>
        </div>
      </MotionDiv>
      <ContactSection />
      {/* Mobile: scrolling marquee */}
      <div className="md:hidden overflow-hidden -mb-[15px]">
        <div className="animate-marquee">
          <span className="text-slaps-body text-black-slaps text-[100px] leading-none uppercase whitespace-nowrap mr-16">
            Coming Soon
          </span>
          <span className="text-slaps-body text-black-slaps text-[100px] leading-none uppercase whitespace-nowrap mr-16">
            Coming Soon
          </span>
          <span
            className="text-slaps-body text-black-slaps text-[100px] leading-none uppercase whitespace-nowrap mr-16"
            aria-hidden="true"
          >
            Coming Soon
          </span>
          <span
            className="text-slaps-body text-black-slaps text-[100px] leading-none uppercase whitespace-nowrap mr-16"
            aria-hidden="true"
          >
            Coming Soon
          </span>
        </div>
      </div>
      {/* Desktop: static */}
      <h2 className="hidden md:block text-slaps-body text-offwhite-slaps text-[200px] m-auto leading-none uppercase -mb-[35px]">
        Coming Soon
      </h2>
      <Footer onContactClick={scrollToContact} />
    </div>
  );
}
