import { useRef, useState } from "react";
import MailingList from "./components/MailingList";
import { motion, AnimatePresence } from "framer-motion";
import NavBar from "./components/NavBar";
import PortalContactUs from "./components/PortalContactUs";
import PortalAbout from "./components/PortalAbout";
import Background from "./assets/landingV3BSmall.jpg";
import { ReactComponent as PFMHorizontal } from "./components/PFMHorizontal.tsx";




export default function App() {
  const MotionDiv = motion.create("div");
  const mailingRef = useRef<HTMLDivElement>(null);
  const [activePanel, setActivePanel] = useState<null | "about" | "contact">(null);

  const scrollToMailingList = () => {
    setActivePanel(null);
    mailingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const togglePanel = (panel: "about" | "contact") =>
    setActivePanel((p) => (p === panel ? null : panel));

  return (
    <>
      <div className="relative h-screen overflow-hidden flex flex-col bg-offwhite-slaps">
        <NavBar
          onAboutClick={() => togglePanel("about")}
          onContactClick={() => togglePanel("contact")}
          onMailingListClick={scrollToMailingList}
          onLogoClick={() => setActivePanel(null)}
        />
        <MotionDiv
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-full h-full overflow-hidden border-b-[15px] border-r-[15px] border-l-[15px] border-offwhite-slaps">
            <img
              src={Background}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
            <section className="area-main relative flex flex-col items-center justify-center w-full h-full pt-[60px]">
              <div ref={mailingRef} className="flex flex-col items-center justify-center gap-14 sm:gap-20 max-w-xl mx-auto">
                <MailingList />
              </div>
              <div className="w-full overflow-hidden mt-50">
                <motion.div
                  className="flex mix-blend-difference text-white w-max"
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "loop" }}
                >
                  <PFMHorizontal className="h-10 w-auto flex-shrink-0" style={{ marginRight: '200px' }} />
                  <PFMHorizontal className="h-10 w-auto flex-shrink-0" style={{ marginRight: '200px' }} />
                  <PFMHorizontal className="h-10 w-auto flex-shrink-0" style={{ marginRight: '200px' }} />
                  <PFMHorizontal className="h-10 w-auto flex-shrink-0" style={{ marginRight: '200px' }} />
                </motion.div>
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
                  className="absolute inset-0 bg-offwhite-slaps flex flex-col items-center justify-center z-10"
                >
                  {activePanel === "about" && <PortalAbout onClose={() => setActivePanel(null)} />}
                  {activePanel === "contact" && <PortalContactUs onClose={() => setActivePanel(null)} />}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </MotionDiv>
      </div>
    </>
  );
}
