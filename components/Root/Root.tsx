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
    default:
      return (
        <div>
          <h1>Invalid platform configuration</h1>
          <p>Please check `NEXT_PUBLIC_APP_PLATFORM` in your `.env` file.</p>
        </div>
      );
  }
}
