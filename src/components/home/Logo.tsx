import { useTheme } from "@/context/ThemeContext";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const { theme } = useTheme();
  const sizes = {
    sm: { text: "text-[14px]", icon: 16 },
    md: { text: "text-[18px]", icon: 22 },
    lg: { text: "text-[48px]", icon: 56 },
  };

  const s = sizes[size];
  const bgColor = theme === "light" ? "#F8FAFC" : "#0a0f1a";

  return (
    <span className={`inline-flex items-center gap-0 font-mono font-medium tracking-wide text-text-primary ${s.text}`}>
      Ele-
      <svg
        width={s.icon}
        height={s.icon}
        viewBox="0 0 56 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="inline-block align-middle"
      >
        <ellipse cx="28" cy="28" rx="24" ry="26" fill="#00d4ff" />
        <path
          d="M28 4C24 16 24 40 28 52C32 40 32 16 28 4Z"
          fill={bgColor}
          stroke={bgColor}
          strokeWidth="1"
        />
      </svg>
      -tric
    </span>
  );
}
