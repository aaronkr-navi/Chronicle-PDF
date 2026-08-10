import { useMemo } from "react";
import { useLogoAssets } from "@app/hooks/useLogoAssets";

/** Theme-specific no-text logo SVG URLs under the active variant folder (`modern-logo` / `classic-logo`). */
export function useLogoPath(): { dark: string; light: string } {
  const { folderPath } = useLogoAssets();

  return useMemo(
    () => ({
      dark: `${folderPath}/ChroniclePDFLogoNoTextDark.svg`,
      light: `${folderPath}/ChroniclePDFLogoNoTextLight.svg`,
    }),
    [folderPath],
  );
}
