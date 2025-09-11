import { createPortal } from "react-dom";
import PortalContactUs from "./PortalContactUs";

interface AboutProps {
  setShowContactModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const About = ({ setShowContactModal }: AboutProps) => {
  const handleCloseModal = () => setShowContactModal(false);

  return (
    <>
      {createPortal(
        <PortalContactUs onClose={handleCloseModal} />,
        document.body
      )}
    </>
  );
};

export default About;
