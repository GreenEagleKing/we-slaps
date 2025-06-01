import softBottleGel from "../assets/softBottleGel.png";
import { motion } from "motion/react";

const UserFeedback = () => {
  return (
    <div className="md:absolute md:left-4/5 md:top-1/8 md:-translate-x-1/2 relative">
      <h2 className="uppercase bg-lilac-slaps text-white text-nowrap w-min top-[150px] z-10 absolute -translate-x-1/2 -translate-y-1/2">
        User Feedback
      </h2>
      <motion.div
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
      </motion.div>
    </div>
  );
};

export default UserFeedback;
