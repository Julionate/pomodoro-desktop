import { SVGProps } from "preact/compat";

export function NextIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      {...props}
    >
      <path
        fill="inherit"
        d="M2 3.002a1 1 0 0 1 1.578-.816l7 4.963a1 1 0 0 1 .007 1.628l-7 5.037A1 1 0 0 1 2 13.003zM14 2.5a.5.5 0 1 0-1 0v11a.5.5 0 0 0 1 0z"
      ></path>
    </svg>
  );
}
