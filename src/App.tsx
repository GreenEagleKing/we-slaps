import About from "./components/About";
import Events from "./components/Events";
import Journal from "./components/Journal";
import MailingList from "./components/MailingList";
import { ReactComponent as SlapsLogo } from "./components/SlapsLogo";
import UserFeedback from "./components/UserFeedback";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const MotionDiv = motion.create("div");
  return (
    <>
      <div className="relative min-h-screen">
        {isLoading && <LoadingScreen />}
        {!isLoading && (
          <MotionDiv
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="w-full min-h-screen bg-white bg-[linear-gradient(to_right,rgba(128,128,128,0.2)_2px,transparent_2px),linear-gradient(to_bottom,rgba(128,128,128,0.2)_2px,transparent_2px)] bg-[size:2rem_2rem]">
              <div className="flex items-center justify-center pt-6">
                <SlapsLogo />
              </div>

              <div className="px-4 flex flex-col justify-center items-center gap-12">
                <MailingList />
                <About />
                <UserFeedback />
                <Events />
                <Journal />
              </div>
            </div>
          </MotionDiv>
        )}
      </div>
    </>
  );
}
