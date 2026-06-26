import { useRef, useState } from "react";
import MailingList from "./components/MailingList";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import PortalContactUs from "./components/PortalContactUs";
import PortalAbout from "./components/PortalAbout";
import PortalPrivacy from "./components/PortalPrivacy";
import Background from "./assets/landingV3BSmall.jpg";
import FishVideo from "./assets/Web no bg test.mp4";
import { ReactComponent as PFMHorizontal } from "./components/PFMHorizontal.tsx";

export default function App() {
  const MotionDiv = motion.create("div");
  const mailingRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<null | "about" | "contact" | "privacy">(null);

  const scrollToMailingList = () => {
    setActivePanel(null);
    mailingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const togglePanel = (panel: "about" | "contact" | "privacy") =>
    setActivePanel((p) => (p === panel ? null : panel));

  return (
    <>
      <div className="relative min-h-screen overflow-x-hidden overflow-y-auto flex flex-col bg-white-slaps">
        <NavBar
          onAboutClick={() => togglePanel("about")}
          onContactClick={() => togglePanel("contact")}
          onPrivacyClick={() => togglePanel("privacy")}
          onMailingListClick={scrollToMailingList}
          onLogoClick={() => setActivePanel(null)}
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
                src={FishVideo}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-[40vh] sm:h-[52vh] object-cover md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:h-full md:min-w-full md:w-auto md:z-0"
              />

              {/* Desktop-only: original two-column overlay */}
              <div className="hidden md:flex relative z-10 w-full h-full">
                <div className="w-1/2 flex flex-col items-end justify-center gap-4 mr-[4vw]">
                  <h1 className="text-gold-slaps uppercase text-slaps-h1 text-center text-[clamp(28px,4vw,56px)]">This is suncare</h1>
                  <div className="flex justify-end gap-[clamp(4px,0.5vw,16px)]">
                    <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">Broad Spectrum</span>
                    <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">Advanced Formula</span>
                    <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">High Protection</span>
                  </div>
                </div>
                <div className="w-1/2 flex flex-col items-start justify-center gap-4 ml-[4vw]">
                  <h1 className="text-gold-slaps uppercase text-slaps-h1 text-center text-[clamp(28px,4vw,56px)]">built to move.</h1>
                  <div className="flex gap-[clamp(4px,0.5vw,16px)]">
                    <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">Sweat Resistant</span>
                    <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">Super-Lightweight</span>
                    <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-[clamp(6px,1.2vw,40px)] py-1 whitespace-nowrap text-[clamp(8px,1.1vw,14px)]">Built-in Hydration</span>
                  </div>
                </div>
              </div>

              {/* Mobile-only: stacked headings + pill grid */}
              <div className="flex flex-col items-center gap-6 w-full md:px-4 py-8 md:hidden pt-0">
                <h1 className="text-gold-slaps uppercase text-slaps-h1 text-start md:text-[50px] text-[50px] leading-[45px] sm:pr-40 pl-10 pr-20">This is suncare built to move.</h1>
              </div>

              {/* Early access marquee — both viewports */}
              <div className="mt-6 md:mt-20 flex flex-col items-center z-10">
                <span className="bg-offwhite2-slaps rounded-t-lg md:px-10 pl-6 pr-4 py-2 text-black-slaps text-slaps-body uppercase text-xs md:text-base">Early Access <span className="ml-2 mr-0">▼</span></span>
                <div className="border-2 border-offwhite2-slaps">
                  <div className="w-full overflow-hidden my-6">
                    <div className="flex flex-shrink-0 animate-marquee">
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite2-slaps" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite2-slaps" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite2-slaps" aria-hidden="true" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps" aria-hidden="true" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-offwhite2-slaps" aria-hidden="true" />
                      <PFMHorizontal className="h-4 sm:h-6 md:h-8 w-auto flex-shrink-0 mr-16 md:mr-[200px] text-gold-slaps" aria-hidden="true" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile-only: stacked headings + pill grid, below marquee */}
              <div className="flex flex-col items-center gap-6 w-full px-4 py-8 md:hidden">
                <div className="grid grid-cols-2 gap-2 w-full text-nowrap">
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-1 sm:px-2 py-1 text-center text-[9px] sm:text-[11px] whitespace-nowrap">Broad Spectrum</span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-1 sm:px-2 py-1 text-center text-[9px] sm:text-[11px] whitespace-nowrap">Advanced Formula</span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-1 sm:px-2 py-1 text-center text-[9px] sm:text-[11px] whitespace-nowrap">High Protection</span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-1 sm:px-2 py-1 text-center text-[9px] sm:text-[11px] whitespace-nowrap">Sweat Resistant</span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-1 sm:px-2 py-1 text-center text-[9px] sm:text-[11px] whitespace-nowrap">Super-Lightweight</span>
                  <span className="text-black-slaps text-slaps-body uppercase rounded-full border-2 border-black-slaps px-1 sm:px-2 py-1 text-center text-[9px] sm:text-[11px] whitespace-nowrap">Built-in Hydration</span>
                </div>
              </div>
            </section>
            <div className="md:ml-6 md:mt-30 mt-10 mb-5">
              <h2 className="text-slaps-h2 md:text-[28px] text-[16px] text-black-slaps uppercase text-center md:text-left">Join Mailing List For Early Access</h2>
            </div>
            <section className="relative h-[40vh] overflow-hidden mx-6 mb-[20vh] rounded-lg">
              <img src={Background} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
              <div ref={mailingRef} className="absolute inset-0 flex flex-col items-center justify-center gap-14 sm:gap-20 max-w-xl mx-auto">
                <MailingList />
              </div>
            </section>


            <AnimatePresence>
              {activePanel && (
                <motion.div
                  key={activePanel}
                  initial={{ y: "-100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="absolute top-0 left-0 right-0 min-h-screen bg-white-slaps flex flex-col items-center justify-start pt-[20dvh] z-10 sm:pb-20 pb-10 w-full"
                >
                  {activePanel === "about" && <PortalAbout onClose={() => setActivePanel(null)} />}
                  {activePanel === "contact" && <PortalContactUs onClose={() => setActivePanel(null)} />}
                  {activePanel === "privacy" && <PortalPrivacy onClose={() => setActivePanel(null)} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MotionDiv>
        <Footer />
      </div>
    </>
  );
}
