import { useState } from "react";
import { ReactComponent as CrossIcon } from "./CrossIcon";

type PortalContactUsProps = {
  onClose?: () => void;
};

export default function PortalContactUs({ onClose }: PortalContactUsProps) {
  const [submissionState, setSubmissionState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const encode = (data: Record<string, string>) =>
    Object.keys(data)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
      )
      .join("&");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setSubmissionState("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "contact",
          email: formData.get("email") as string,
          message: formData.get("message") as string,
        }),
      });

      if (response.ok) {
        setSubmissionState("success");
        form.reset();
      } else {
        setSubmissionState("error");
      }
    } catch (err) {
      console.error("Netlify form error:", err);
      setSubmissionState("error");
    }

    setTimeout(() => {
      setSubmissionState("idle");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm px-6">
      <div className="flex items-center justify-between">
        <h2 className="text-black-slaps text-slaps-heading uppercase text-lg sm:text-md">
          Say Hello
        </h2>
        {onClose && (
          <button onClick={onClose} className="cursor-pointer ml-4">
            <span className="text-black-slaps hover:text-orange-slaps">X</span>
          </button>
        )}
      </div>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        onSubmit={handleSubmit}
        className="flex flex-col uppercase text-slaps-body text-sm sm:text-base gap-5"
      >
        <input type="hidden" name="form-name" value="contact" />

        <div className="flex flex-col gap-6 flex-nowrap">
          <input
            type="email"
            name="email"
            placeholder="EMAIL"
            required
            className="border border-black-slaps bg-offwhite-slaps text-slaps-body text-[12px] pl-4 pr-4 py-2 w-full rounded-sm placeholder:text-black-slaps sm:text-base placeholder:text-left hover:outline-orange-slaps"
          />

          <textarea
            name="message"
            placeholder="MESSAGE..."
            rows={4}
            maxLength={1000}
            required
            className="border border-black-slaps bg-offwhite-slaps text-slaps-body rounded-sm text-[12px] pl-4 pr-4 py-2 w-full placeholder:text-black-slaps sm:text-base placeholder:text-left hover:outline-orange-slaps"
          />
        </div>

        <button
          type="submit"
          className={`bg-offwhite-slaps transition-colors duration-300 rounded-sm text-slaps-body text-black-slaps px-4 py-2 text-[12px] uppercase sm:text-base sm:w-full sm:w-2/6 sm:ml-auto sm:mr-auto outline-3 outline-offset-2 outline-double outline-black-slaps hover:outline-orange-slaps`}
          disabled={submissionState === "submitting"}
        >
          {submissionState === "submitting"
            ? "Sending..."
            : submissionState === "success"
            ? "Sent!"
            : submissionState === "error"
            ? "Try again"
            : "Send"}
        </button>
      </form>
    </div>
  );
}
