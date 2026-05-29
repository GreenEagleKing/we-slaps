import type { SVGProps } from "react";

const MenuCross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 18.12 17.32"
    fill="currentColor"
    {...props}
  >
    <path d="M7.48,17.32v-7.2H0v-2.92h7.48V0h3.16v7.2h7.48v2.92h-7.48v7.2h-3.16Z" />
  </svg>
);

export { MenuCross as ReactComponent };
