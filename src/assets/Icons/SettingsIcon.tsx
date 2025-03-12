import { SVGProps } from "preact/compat";

export function SettingsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      width="1em"
      height="1em"
      {...props}
    >
      <g
        fill="none"
        stroke="inherit"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="2" cy="2" r="1.5"></circle>
        <path d="M3.5 2h10"></path>
        <circle cx="7" cy="7" r="1.5"></circle>
        <path d="M.5 7h5m3 0h5"></path>
        <circle cx="12" cy="12" r="1.5"></circle>
        <path d="M10.5 12H.5"></path>
      </g>
    </svg>
  );
}
