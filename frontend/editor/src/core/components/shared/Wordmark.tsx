import React from "react";
import { useMantineColorScheme } from "@mantine/core";
import { useLogoAssets } from "@app/hooks/useLogoAssets";

interface WordmarkProps extends React.HTMLAttributes<HTMLDivElement> {
  alt?: string;
  muted?: boolean;
}

export function Wordmark({ alt = "Chronicle PDF", muted = false, className = "", style, ...props }: WordmarkProps) {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const { iconDark, iconLight } = useLogoAssets();

  const iconSrc = isDark ? iconDark : iconLight;

  return (
    <div
      className={`chronicle-wordmark ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        fontWeight: 700,
        fontSize: "1.25rem",
        color: isDark ? "#ffffff" : "#1a1a1a",
        letterSpacing: "-0.02em",
        ...style,
      }}
      {...props}
    >
      <img src={iconSrc} alt={alt} style={{ height: "24px", width: "auto" }} />
      <span>Chronicle PDF</span>
    </div>
  );
}
