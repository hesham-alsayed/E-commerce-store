import Link from "next/link";

export default function Logo({ height = 10, width }) {
  const px = height * 4;
  return (
    <div>
      <Link href="/">
        <img
          src="/logo.avif"
          alt="logo"
          height={px}
          width={width || "auto"}
          style={{ height: px, width: width || "auto" }}
          className="object-contain"
        />
      </Link>
    </div>
  );
}
