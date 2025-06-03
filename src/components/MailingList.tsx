import { motion } from "framer-motion";
import { useState } from "react";

const MailingList: React.FC = () => {
  const [mailingSubmissionState, setMailingSubmissionState] = useState<
    "idle" | "success" | "error"
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

    setMailingSubmissionState("idle");

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
    <MotionDiv
      whileHover={{
        scale: mailingSubmissionState === "idle" ? 1.05 : getScale(),
      }}
      animate={{ scale: getScale() }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`md:w-[500px] ${submissionStateColour()} px-6 py-6 rounded-[20px] md:absolute md:left-3/8 md:top-1/10 md:-translate-x-1/2 relative mt-10 min-w-[300px] transition-colors duration-300 drop-shadow-lg`}
    >
      <div className="">
        <h2 className="uppercase">Mailing List</h2>
        <p className="text-sm mt-2 mb-2">Be the first to know.</p>
      </div>
      <div>
        <form onSubmit={submitEmail} className="flex justify-between gap-4">
          <input
            className="border rounded-sm text-sm px-4 py-1 w-full"
            placeholder="enter email"
            name="email"
            type="email"
            required
          ></input>
          <button
            className="bg-gray-700 text-white px-4 py-1 rounded-md text-sm border-lime-slaps border-2 hover:border-2 hover:border-white active:bg-gray-900"
            type="submit"
          >
            subscribe
          </button>
        </form>
      </div>
    </MotionDiv>
  );
};

export default MailingList;
