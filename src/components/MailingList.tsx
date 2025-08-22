import { motion } from "framer-motion";
import { useState } from "react";
import { ReactComponent as JoinWaitingList } from "./JoinWaitingList";

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
      const googleSheetsURL = import.meta.env.VITE_MAILING_LIST_GOOGLE_FORM;
      const response = await fetch(googleSheetsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email }),
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

  const submissionStateColour = (): string => {
    switch (mailingSubmissionState) {
      case "success":
        return "bg-green-300";
      case "submitting":
        return "bg-orange-300";
      case "error":
        return "bg-red-300";
      default:
        return "bg-lime-slaps";
    }
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
    <div className="flex flex-col gap-6">
      <p className="font-display font-bold italic uppercase text-center text-lime-slaps [text-shadow:1px_0_0_#000,-1px_0_0_#000,0_1px_0_#000,0_-1px_0_#000] text-2xl sm:text-2xl ">
        We're working on it...
      </p>
      <JoinWaitingList />
      <MotionDiv
        whileHover={{
          scale: mailingSubmissionState === "idle" ? 1.05 : getScale(),
        }}
        animate={{ scale: getScale() }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`mb-12 `}
      >
        <form onSubmit={submitEmail} className="flex justify-between gap-4">
          <input
            className="w-full sm:w-[400px] border border-black-slaps bg-white rounded-sm font-mono text-sm px-6 py-2 flex-grow placeholder:text-black-slaps sm:text-base"
            placeholder="Enter Email"
            name="email"
            type="email"
            required
          ></input>
          <button
            className={`${submissionStateColour()} transition-colors duration-300 text-black-slaps px-4 py-1 rounded-sm font-mono text-sm border border-black-slaps uppercase sm:text-base`}
            type="submit"
            disabled={mailingSubmissionState === "submitting"}
          >
            {mailingSubmissionState === "submitting"
              ? "Submitting..."
              : mailingSubmissionState === "success"
              ? "Subscribed!"
              : mailingSubmissionState === "error"
              ? "Try again"
              : "Subscribe"}
          </button>
        </form>
      </MotionDiv>
    </div>
  );
};

export default MailingList;
