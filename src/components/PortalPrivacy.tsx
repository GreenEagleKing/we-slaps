type PortalPrivacyProps = {
  onClose: () => void;
};

export default function PortalPrivacy({ onClose }: PortalPrivacyProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-y-auto z-50 bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 flex-col flex gap-4 sm:w-1/2 w-3/4 md:w-1/2 max-h-[90dvh] overflow-y-auto text-sm sm:text-base"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row-reverse">
          <button onClick={onClose} className="ml-2 cursor-pointer">
            X
          </button>
          <h2 className="uppercase font-display font-medium italic text-sm sm:text-base mr-auto">
            Privacy Policy
          </h2>
        </div>
        <section className="flex flex-col gap-4">
          <p>
            At Slaps, we value your privacy and are committed to protecting your
            personal data. This policy explains what information we collect, how
            we use it, and your rights.
          </p>

          <h3 className="font-display font-semibold">
            1. Information We Collect
          </h3>
          <p>We may collect:</p>
          <ul className="list-disc list-inside">
            <li>Email addresses if you sign up to hear from us.</li>
            <li>
              Basic usage data like IP address, browser type, and pages visited
              (through cookies and analytics tools).
            </li>
          </ul>

          <h3 className="font-display font-semibold">
            2. How We Use Your Information
          </h3>
          <p>We use this information to:</p>
          <ul className="list-disc list-inside">
            <li>Send you updates about Slaps (if you’ve signed up).</li>
            <li>Improve our website and content.</li>
          </ul>

          <h3 className="font-display font-semibold">
            3. Sharing Your Information
          </h3>
          <p>
            We do not sell your information. We may use trusted third-party
            services (e.g. email platforms, website analytics) to help us
            operate our website and communications.
          </p>

          <h3 className="font-display font-semibold">4. Cookies</h3>
          <p>
            Our website uses cookies to understand how visitors use the site and
            improve the experience. You can disable cookies in your browser
            settings, though some features may not work properly.
          </p>

          <h3 className="font-display font-semibold">5. Your Rights</h3>
          <p>Under data protection laws, you have the right to:</p>
          <ul className="list-disc list-inside">
            <li>Access the personal data we hold about you.</li>
            <li>Ask us to correct or delete your data.</li>
            <li>Withdraw consent for marketing at any time.</li>
          </ul>
          <p>
            To exercise these rights, email us at{" "}
            <a
              href="mailto:weslaps123@gmail.com"
              className="underline text-blue-600 hover:text-blue-800"
            >
              weslaps123@gmail.com
            </a>
            .
          </p>

          <h3 className="font-display font-semibold">
            6. Updates to This Policy
          </h3>
          <p>
            We may update this policy from time to time. Any changes will be
            posted on this page.
          </p>

          <h3 className="font-display font-semibold">7. Contact Us</h3>
          <p>
            If you have questions about this policy or how we handle your data,
            please contact us at:{" "}
            <a
              href="mailto:weslaps123@gmail.com"
              className="underline text-blue-600 hover:text-blue-800"
            >
              weslaps123@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
