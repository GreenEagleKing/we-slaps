import { motion } from "framer-motion";
import { useState } from "react";

const MailingList: React.FC = () => {
  const [mailingSubmissionState, setMailingSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const submitEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");

    if (typeof email !== "string") {
      setMailingSubmissionState("error");
      return;
    }

    setMailingSubmissionState("submitting");

    try {
      const response = await fetch("/api/submit-to-notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.status !== 200) {
        setMailingSubmissionState("error");
      } else {
        setMailingSubmissionState("success");
        form.reset();
      }
    } catch (e) {
      console.error("Submission error:", e);
      setMailingSubmissionState("error");
    }
    setTimeout(() => {
      setMailingSubmissionState("idle");
    }, 1000);
  };

  const getScale = (): number => {
    switch (mailingSubmissionState) {
      case "success":
        return 1.15;
      case "error":
        return 0.95;
      default:
        return 1;
    }
  };

  const MotionDiv = motion.create("div");

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <MotionDiv
        whileHover={{
          scale: mailingSubmissionState === "idle" ? 1.05 : getScale(),
        }}
        animate={{ scale: getScale() }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div>
          <h2 className="text-3xl md:text-3xl lg:text-4xl text-center text-black-slaps text-slaps-heading uppercase mb-3">Join Mailing List</h2>
        </div>
        <form
          onSubmit={submitEmail}
          className="flex flex-col justify-between gap-3 w-[80vw] sm:w-auto"
        >
          <input
            className="bg-transparent text-slaps-body text-black-slaps text-[14px] md:text-[16px] w-full text-center sm:w-[400px] outline-2 outline-offwhite-slaps rounded-sm py-2 flex-grow placeholder:text-black-slaps sm:text-sm placeholder:text-center focus:outline-offwhite-slaps hover:outline-orange-slaps"
            placeholder="YOUR EMAIL"
            name="email"
            type="email"
            required
          />
          <button
            className="text-slaps-heading bg-offwhite-slaps text-black-slaps px-4 py-8 rounded-sm outline-3 outline-offset-2 outline-double outline-offwhite-slaps uppercase md:text-3xl text-2xl hover:outline-orange-slaps"
            type="submit"
            disabled={mailingSubmissionState === "submitting"}
          >
            {mailingSubmissionState === "submitting"
              ? "Submitting..."
              : mailingSubmissionState === "success"
              ? "Subscribed!"
              : mailingSubmissionState === "error"
              ? "Try again"
              : "Get Slaps First"}
          </button>
        </form>
      </MotionDiv>
    </div>
  );
};

export default MailingList;
