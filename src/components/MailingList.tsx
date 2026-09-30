import { motion } from "framer-motion";
import { useState } from "react";

// Created once at module level: creating it during render remounts the form on every state change
const MotionDiv = motion.create("div");

interface MailingListProps {
  variant?: "hero" | "footer" | "stealth";
  /** Called after a successful signup with the form's centre in viewport coordinates */
  onSuccess?: (origin: { x: number; y: number }) => void;
}

const MailingList: React.FC<MailingListProps> = ({
  variant = "hero",
  onSuccess,
}) => {
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
        const rect = form.getBoundingClientRect();
        onSuccess?.({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
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

  if (variant === "stealth") {
    return (
      <form
        onSubmit={submitEmail}
        className="w-full max-w-[366px] md:max-w-[653px] font-stealth text-[12.7px] md:text-[19px] tracking-[-0.05em]"
      >
        <div className="flex items-center h-[39px] md:h-[55px] p-px md:p-[2px] pl-5 md:pl-[30px] bg-stealth-white rounded-full">
          <p className="text-stealth-gold text-nowrap">join the movement</p>
          <input
            className="flex-1 min-w-0 h-full ml-1 md:ml-1.5 bg-transparent text-stealth-dark placeholder:text-stealth-grey focus:outline-none"
            placeholder="your email"
            name="email"
          aria-label="Email address"
            type="email"
            required
          />
          <button
            className="h-full w-[92px] md:w-[173px] shrink-0 rounded-full bg-stealth-dark text-stealth-white text-nowrap hover:bg-black transition-colors cursor-pointer disabled:cursor-default"
            type="submit"
            disabled={mailingSubmissionState === "submitting"}
          >
            {mailingSubmissionState === "submitting"
              ? "Submitting..."
              : mailingSubmissionState === "success"
                ? "Subscribed!"
                : mailingSubmissionState === "error"
                  ? "Try again"
                  : "early access"}
          </button>
        </div>
      </form>
    );
  }

  if (variant === "footer") {
    return (
      <form
        onSubmit={submitEmail}
        className="flex flex-col md:flex-row gap-3 w-full md:w-[700px] items-start"
      >
        <input
          className="text-slaps-body bg-transparent border-2 border-black-slaps text-black-slaps text-[13px] w-full text-start rounded-full py-2 md:py-3 px-4 placeholder:text-black-slaps placeholder:text-start placeholder:text-slaps-body focus:outline-none focus:border-gold-slaps hover:border-gold-slaps transition-colors"
          placeholder="Enter your email address for first access"
          name="email"
          aria-label="Email address"
          type="email"
          required
        />
        <button
          className="text-slaps-heading border border-gold-slaps text-white-slaps bg-gold-slaps py-2 md:py-3 px-10 md:px-15 rounded-full uppercase text-sm hover:text-black-slaps transition-colors text-nowrap"
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
            className="bg-transparent text-slaps-body text-black-slaps text-[14px] md:text-[16px] w-full text-center sm:w-[400px] border-2 border-white-slaps rounded-full py-2 flex-grow placeholder:text-black-slaps sm:text-sm placeholder:text-center focus:border-white-slaps hover:border-gold-slaps"
            placeholder="YOUR EMAIL"
            name="email"
          aria-label="Email address"
            type="email"
            required
          />
          <button
            className="text-slaps-heading bg-gold-slaps text-white-slaps md:px-4 md:py-4 py-2 rounded-full border-2 border-gold-slaps uppercase md:text-3xl md:text-2xl text-md hover:border-white-slaps"
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
