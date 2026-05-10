interface LogoProps {
  variant?: "light" | "dark";
  size?: number;
}

export default function Logo({ variant = "dark", size = 32 }: LogoProps) {
  const src = variant === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="plinq"
      width={(size * 94) / 27}
      height={size}
      style={{ height: size, width: "auto", display: "block" }}
    />
  );
}
