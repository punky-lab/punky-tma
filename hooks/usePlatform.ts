import { SupportedPlatform } from "@/lib/platform";

export function usePlatformComponent() {}

export function usePlatform(): SupportedPlatform {
  if (process.env.NEXT_PUBLIC_APP_PLATFORM == "tiktok") {
    return "tiktok";
  }

  return "telegram";
}
