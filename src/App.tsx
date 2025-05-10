import SlapsLogo from "./components/SlapsLogo";

export default function App() {
  return (
    <>
      {/* Grid background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-black bg-[linear-gradient(to_right,rgba(255,255,255,0.3)_2px,transparent_2px),linear-gradient(to_bottom,rgba(255,255,255,0.3)_2px,transparent_2px)] bg-[size:3rem_3rem]"></div>
      <div className="flex items-center justify-center h-screen">
        <SlapsLogo />
      </div>
    </>
  );
}
