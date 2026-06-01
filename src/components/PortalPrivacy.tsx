type PortalPrivacyProps = {
  onClose: () => void;
};

export default function PortalPrivacy({ onClose }: PortalPrivacyProps) {
  return (
    <div className="flex flex-col gap-4 text-sm sm:text-base max-w-md sm:max-w-4xl w-full px-6 overflow-y-auto max-h-[80dvh]">
      <div className="flex items-center justify-between">
        <h2 className="text-black-slaps text-slaps-heading uppercase text-lg sm:text-md">
          Privacy Policy
        </h2>
        <button onClick={onClose} className="cursor-pointer ml-4">
          <span className="text-black-slaps hover:text-orange-slaps">X</span>
        </button>
      </div>
      <section className="flex flex-col gap-4 text-black-slaps text-slaps-body text-justify text-sm">
        <p>
          At Slaps, we value your privacy and are committed to protecting your
          personal data. This policy explains what information we collect, how
          we use it, and your rights.
        </p>

        <h3 className="font-semibold uppercase text-black-slaps">
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

        <h3 className="font-semibold uppercase text-black-slaps">
          2. How We Use Your Information
        </h3>
        <p>We use this information to:</p>
        <ul className="list-disc list-inside">
          <li>Send you updates about Slaps (if you've signed up).</li>
          <li>Improve our website and content.</li>
        </ul>

        <h3 className="font-semibold uppercase text-black-slaps">
          3. Sharing Your Information
        </h3>
        <p>
          We do not sell your information. We may use trusted third-party
          services (e.g. email platforms, website analytics) to help us
          operate our website and communications.
        </p>

        <h3 className="font-semibold uppercase text-black-slaps">4. Cookies</h3>
        <p>
          Our website uses cookies to understand how visitors use the site and
          improve the experience. You can disable cookies in your browser
          settings, though some features may not work properly.
        </p>

        <h3 className="font-semibold uppercase text-black-slaps">5. Your Rights</h3>
        <p>Under data protection laws, you have the right to:</p>
        <ul className="list-disc list-inside">
          <li>Access the personal data we hold about you.</li>
          <li>Ask us to correct or delete your data.</li>
          <li>Withdraw consent for marketing at any time.</li>
        </ul>
        <p>
          To exercise these rights, email us at{" "}
          <a href="mailto:hello@weslaps.com" className="underline hover:text-orange-slaps">
            hello@weslaps.com
          </a>
          .
        </p>

        <h3 className="font-semibold uppercase text-black-slaps">
          6. Updates to This Policy
        </h3>
        <p>
          We may update this policy from time to time. Any changes will be
          posted on this page.
        </p>

        <h3 className="font-semibold uppercase text-black-slaps">7. Contact Us</h3>
        <p>
          If you have questions about this policy or how we handle your data,
          please contact us at:{" "}
          <a href="mailto:hello@weslaps.com" className="underline hover:text-orange-slaps">
            hello@weslaps.com
          </a>
          .
        </p>
      </section>
    </div>
  );
}
