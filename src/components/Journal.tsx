import benBike from "../assets/benBike.png";
import { motion } from "framer-motion";

const Journal = () => {
  const MotionDiv = motion.create("div");
  return (
    <div className="md:absolute md:left-2/12 md:top-3/10 md:-translate-x-1/2 relative mb-10 drop-shadow-lg">
      <h2 className="uppercase bg-lime-slaps w-min absolute left-[15px] top-[20px] z-10">
        Journal
      </h2>
      <MotionDiv
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.8 }}
        className="justify-center flex relative"
      >
        <img
          src={benBike}
          alt="Man on lime bike with slaps logo"
          className="w-2/3"
        />
      </MotionDiv>
    </div>
  );
};

export default Journal;
