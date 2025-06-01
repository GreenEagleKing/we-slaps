import { motion } from "framer-motion";
import { ReactComponent as SlapsLogoRaw } from "./SlapsLogo";
import ldnMarathon from "../assets/ldnMarathon2025-111-2.jpg";
import { useState, useEffect } from "react";

const SlapsLogoMotion = motion(SlapsLogoRaw);

const LoadingScreen = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const trailCount = 10;
  const totalMove = -605;
  const trailDelayStep = 0.1;
  const trailMoveFactor = 1;

  // Trigger animation start after 2 seconds delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartAnimation(true);
    }, 2000); // 2 seconds delay before animation starts

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${ldnMarathon})` }}
    >
      {/* Static logo at start */}
      {!startAnimation && (
        <SlapsLogoMotion
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            delay: 2.8,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            fill: "white",
            position: "absolute",
            zIndex: 5,
            scale: 1.5,
          }}
          className="w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      )}

      {/* Trails */}
      {startAnimation &&
        [...Array(trailCount)].map((_, i) => {
          const fadeDelay = (trailCount - 1 - i) * trailDelayStep;
          return (
            <SlapsLogoMotion
              key={i}
              initial={{ y: 0, opacity: 1, scale: 1.5 }}
              animate={{
                y: totalMove * trailMoveFactor,
                opacity: 0,
                scale: 1,
              }}
              transition={{
                duration: 2.5,
                ease: "easeInOut",
                delay: (i + 1) * trailDelayStep,
                opacity: {
                  delay: fadeDelay + trailDelayStep,
                  duration: 1.5,
                  ease: "easeOut",
                },
              }}
              style={{
                fill: "white",
                position: "absolute",
              }}
              className="w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
          );
        })}

      {/* Main animated logo */}
      {startAnimation && (
        <SlapsLogoMotion
          initial={{ y: 0, opacity: 0, scale: 1.5 }}
          animate={{ y: totalMove, opacity: 1, scale: 1 }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
            delay: 0.0,
            opacity: {
              delay: 0.5,
              duration: 0.1, // duration of fade-in
              ease: "easeInOut",
            },
          }}
          style={{
            fill: "white",
            position: "absolute",
            zIndex: 10,
          }}
          className="w-48 h-48 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 mt-4"
        />
      )}
    </div>
  );
};

export default LoadingScreen;
