import type { SVGProps } from "react";

const YoutubeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24.08 16.62"
    fill="currentColor"
    {...props}
  >
    <path d="M20.64,16.46c-5.95.22-11.25.22-17.19-.02C-.65,16.28-.18,8.96.33,3.1.45,1.79,2.11.21,3.44.16c5.95-.21,11.26-.22,17.2,0,1.34.05,2.98,1.62,3.1,2.94.52,5.91,1.03,13.21-3.1,13.36ZM15.99,8.08l-6.41-3.3v6.56s6.41-3.27,6.41-3.27Z" />
  </svg>
);

export { YoutubeIcon as ReactComponent };
