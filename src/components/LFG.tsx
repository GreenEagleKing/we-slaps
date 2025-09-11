import { createPortal } from "react-dom";
import PortalLFG from "./PortalLFG";

interface LFGProps {
  setShowLFGModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LFG = ({ setShowLFGModal }: LFGProps) => {
  const handleCloseModal = () => setShowLFGModal(false);

  return (
    <>{createPortal(<PortalLFG onClose={handleCloseModal} />, document.body)}</>
  );
};

export default LFG;
