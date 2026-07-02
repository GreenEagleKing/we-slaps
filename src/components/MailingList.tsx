import { motion } from "framer-motion";
import { useState } from "react";

interface MailingListProps {
  variant?: "hero" | "footer";
}

const MailingList: React.FC<MailingListProps> = ({ variant = "hero" }) => {
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

  if (variant === "footer") {
    return (
        <form
          onSubmit={submitEmail}
          className="flex gap-3 w-[600px]"
        >
          <input
            className="text-body-heading bg-transparent border border-white-slaps text-white-slaps text-[13px] w-full text-center rounded-full py-2 px-4 placeholder:text-white-slaps placeholder:text-center focus:outline-none focus:border-gold-slaps hover:border-gold-slaps transition-colors"
            placeholder="ENTER YOUR EMAIL ADDRESS FOR FIRST ACCESS"
            name="email"
            type="email"
            required
          />
          <button
            className="text-slaps-heading border border-gold-slaps text-white-slaps bg-gold-slaps py-2 px-4 rounded-full uppercase text-sm hover:text-black-slaps transition-colors text-nowrap"
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
    );
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center">
      <MotionDiv
        whileHover={{
          scale: mailingSubmissionState === "idle" ? 1.05 : getScale(),
        }}
        animate={{ scale: getScale() }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <form
          onSubmit={submitEmail}
          className="flex flex-col justify-between gap-3 w-[80vw] sm:w-auto px-6"
        >
          <input
            className="bg-white-slaps text-slaps-body text-black-slaps text-[14px] md:text-[16px] w-full text-center sm:w-[400px] outline-2 outline-white-slaps rounded-full py-2 flex-grow placeholder:text-black-slaps sm:text-sm placeholder:text-center focus:outline-white-slaps hover:outline-gold-slaps"
            placeholder="YOUR EMAIL"
            name="email"
            type="email"
            required
          />
          <button
            className="text-slaps-heading bg-gold-slaps text-white-slaps md:px-4 md:py-4 py-2 rounded-full outline-2 outline-gold-slaps uppercase md:text-3xl md:text-2xl text-md hover:outline-white-slaps"
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
