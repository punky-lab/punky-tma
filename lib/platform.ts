import { ReactNode } from "react";

export interface PlatformComponentSelector {
    telegram: ReactNode;
}

export type SupportedPlatform = "telegram" | "tiktok"
