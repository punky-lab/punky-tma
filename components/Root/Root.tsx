import { usePlatform } from "@/hooks/usePlatform";
import { PropsWithChildren } from "react";
import { TelegramRoot } from "./TelegramRoot";
import { TiktokRoot } from "./TiktokRoot";

export default function Root(props: PropsWithChildren) {
  const platform = usePlatform();

  switch (platform) {
    case "telegram":
      return <TelegramRoot>{props.children}</TelegramRoot>;
    case "tiktok":
      return <TiktokRoot>{props.children}</TiktokRoot>;
  }
}
