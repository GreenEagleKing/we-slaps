import { useState } from "react";

type PortalContactUsProps = {
  onClose: () => void;
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

  const submissionStateColour = (): string => {
    switch (submissionState) {
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

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
      <div className="bg-white rounded-xl shadow-lg p-6 flex-col flex gap-4 sm:w-4/12">
        <div className="flex flex-row-reverse">
          <button onClick={onClose} className="ml-2 cursor-pointer">
            X
          </button>
          <h2 className="uppercase font-display font-medium italic text-sm sm:text-base mr-auto">
            Say Hello
          </h2>
        </div>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="flex flex-col uppercase font-display font-medium italic text-sm sm:text-base gap-5"
        >
          {/* Netlify requires this hidden input */}
          <input type="hidden" name="form-name" value="contact" />

          <div className="flex flex-col gap-6 flex-nowrap">
            <input
              type="email"
              name="email"
              placeholder="EMAIL"
              required
              className="border border-black-slaps bg-white rounded-sm font-mono text-[12px] pl-4 pr-20 py-2 w-full placeholder:text-black-slaps sm:text-base placeholder:text-left"
            />

            <textarea
              name="message"
              placeholder="MESSAGE..."
              rows={4}
              maxLength={1000}
              required
              className="border border-black-slaps bg-white rounded-sm font-mono text-[12px] pl-4 pr-20 py-2 w-full placeholder:text-black-slaps sm:text-base placeholder:text-left"
            />
          </div>

          <button
            type="submit"
            className={`${submissionStateColour()} transition-colors duration-300 text-black-slaps px-4 py-1 rounded-sm font-mono text-[12px] border border-black-slaps uppercase sm:text-base w-2/6 ml-auto mr-auto`}
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
    </div>
  );
}
