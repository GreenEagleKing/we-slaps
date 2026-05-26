import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import MailingList from "./components/MailingList";
import { motion, useScroll, useTransform } from "framer-motion";
import NavBar from "./components/NavBar";
import PortalContactUs from "./components/PortalContactUs";
import PortalAbout from "./components/PortalAbout";
import Background from "./assets/landingV3hero.png";
import draftAnimationMov from "./assets/pouch-360-safari2.mp4";
import draftAnimationWebm from "./assets/pouch-360-chrome.webm";
import {ReactComponent as SlapsBadge} from "./components/UVAUVBBadge";
import { ReactComponent as PFMBadge } from "./components/PFMBadge";
import { ReactComponent as SPF50Plus } from "./components/SPF50Plus";
import { ReactComponent as CrossIcon } from "./components/CrossIcon";



export default function App() {
  const MotionDiv = motion.create("div");
  const mailingRef = useRef<HTMLDivElement>(null);
  const crossRef = useRef<HTMLDivElement | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  const scrollToMailingList = () => {
    mailingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };
  const { scrollYProgress } = useScroll({ target: crossRef, offset: ["start 0.9", "end 0.3"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180]);
   
  return (
    <>
      <div className="relative min-h-screen flex flex-col">
        <MotionDiv
          className="flex-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-full h-[90vh]">
            <img
              src={Background}
              alt="Background"
              className="fixed inset-0 w-full h-full object-cover -z-10"
            />
            <NavBar
              setShowContactModal={setShowContactModal}
              setShowAboutModal={setShowAboutModal}
              onMailingListClick={scrollToMailingList}
            />
            <section className="area-main flex flex-col items-center justify-center w-full h-full relative">
              <SlapsBadge className="relative right-10 bottom-30 sm:right-80 fill-offwhite-slaps w-8 z-1" />
              <PFMBadge className="mix-blend-difference text-white w-[90vw] sm:w-180 z-1" />
              <SPF50Plus className="fill-orange-slaps w-[45vw] sm:w-90 ml-[45vw] sm:ml-80 mt-3 z-1" />
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full max-w-[35%] absolute z-0"
              >
                <source src={draftAnimationWebm} type="video/webm" />
                <source src={draftAnimationMov} type='video/mp4; codecs="hvc1"' />
              </video>
            </section>
          </div>

            <div ref={mailingRef} className="flex flex-col items-center pt-10 pb-16">
              <motion.div ref={crossRef} style={{ rotate }} className="mb-10">
                <CrossIcon className="fill-offwhite-slaps w-10 h-10" />
              </motion.div>
              <div className="mt-20 mb-[40vh] flex flex-col items-center justify-center gap-14 sm:gap-20 max-w-xl mx-auto">
                <MailingList />
              </div>
            </div>
         
        </MotionDiv>

        {/* Contact Modal */}
        {showContactModal &&
          createPortal(
            <PortalContactUs onClose={() => setShowContactModal(false)} />,
            document.body
          )}
        {/* About Modal */}
        {showAboutModal &&
          createPortal(
            <PortalAbout onClose={() => setShowAboutModal(false)} />,
            document.body
          )}
      </div>
    </>
  );
}
