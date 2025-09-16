import testLFG from "../assets/testLFG.mp4";

type PortalLFGProps = {
  onClose: () => void;
};

export default function PortalLFG({ onClose }: PortalLFGProps) {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex items-center justify-center z-50 bg-black/70"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-6/10 sm:w-4/10 md:w-4/10 lg:w-3/10 xl:w-2/10"
        onClick={(e) => e.stopPropagation()}
      >
        <source src={testLFG} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
