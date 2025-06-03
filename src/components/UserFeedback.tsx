import softBottleGel from "../assets/softBottleGel.png";
import { motion } from "framer-motion";

const UserFeedback = () => {
  const MotionDiv = motion.create("div");
  return (
    <div className="md:absolute md:left-1/2 md:top-4/12 md:-translate-x-1/2 relative drop-shadow-lg">
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSdlKH_qxYfze-pj8nI3vPYiA32luayM11YocfCFlD4Y9moMHQ/viewform?usp=header"
        target="_blank"
      >
        <h2 className="uppercase bg-lilac-slaps text-white text-nowrap w-min top-[150px] z-10 absolute -translate-x-1/2 -translate-y-1/2">
          User Feedback
        </h2>
        <MotionDiv
          whileHover={{
            rotate: [0, -20, 0],
            transition: { duration: 0.6, ease: "easeInOut" },
          }}
          whileTap={{ scale: 0.8 }}
        >
          <img
            src={softBottleGel}
            alt="Slaps soft bottle gel"
            className="z-0 rotate-20 w-[160px]"
          />
        </MotionDiv>
      </a>
    </div>
  );
};

export default UserFeedback;
