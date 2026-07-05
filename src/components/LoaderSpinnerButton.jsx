import { RotatingLines } from "react-loader-spinner";

export default function LoaderSpinnerButton({ color = "white" }) {
  return (
    <RotatingLines
      visible={true}
      height="20"
      width="20"
      color={color}
      strokeWidth="5"
      animationDuration="0.75"
      ariaLabel="rotating-lines-loading"
    />
  );
}
