// Main site is switched off while the stealth page is live.
// To restore it, uncomment these imports and the routes below.
// import { Routes, Route } from "react-router-dom";
// import ScrollToTop from "./components/ScrollToTop";
// import Home from "./pages/Home";
// import Privacy from "./pages/Privacy";
import Stealth from "./pages/Stealth";

export default function App() {
  return (
    <>
      {/* <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes> */}
      <Stealth />
    </>
  );
}
