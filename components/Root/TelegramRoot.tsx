"use client";

import { type PropsWithChildren, useEffect, useMemo, useState } from "react";
import {
  SDKProvider,
  useLaunchParams,
  useMiniApp,
  useThemeParams,
  useViewport,
  bindMiniAppCSSVars,
  bindThemeParamsCSSVars,
  bindViewportCSSVars,
  retrieveLaunchParams,
} from "@telegram-apps/sdk-react";
import { AppRoot } from "@telegram-apps/telegram-ui";

import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ErrorPage } from "@/components/ErrorPage";
import { useTelegramMock } from "@/hooks/useTelegramMock";
import { useDidMount } from "@/hooks/useDidMount";
import axios from "axios";
import AppLoading from "../AppLoading";

function TelegramApp(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();

  // Also perform telegram app login in this component
  const { initDataRaw } = retrieveLaunchParams();
  // Set to true to show loading page
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  var initData = initDataRaw;
  if (process.env.NODE_ENV === "development") {
    initData = process.env.NEXT_PUBLIC_TELEGRAM_MOCK_INIT_DATA;
  }

  useEffect(() => {
    try {
      console.log(initData);
      setIsLoggingIn(true);

      if (!initData) {
        console.error("initData is empty");
        return;
      }

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/telegram/login`;
      axios
        .post(url, {
          init_data: initData,
        })
        .then((res) => {
          if (res.status != 200) {
            throw new Error(`Login request failed: ${res.data.message}`);
          }

          const data = res.data.data;
          console.log("login success", data);
          localStorage.setItem("token", data.access_token);
          localStorage.setItem("refresh_token", data.refresh_token);
        })
        .catch((err) => {
          console.error("failed to login", err);
        })
        .finally(() => {
          setIsLoggingIn(false);
        });
    } catch (error) {
      console.error("failed to login", error);
    }
  }, [initData]);

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  return isLoggingIn ? (
    <AppLoading />
  ) : (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      {props.children}
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
  const debug = useLaunchParams().startParam === "debug";
  const manifestUrl = useMemo(() => {
    return new URL("tonconnect-manifest.json", window.location.href).toString();
  }, []);

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import("eruda").then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <SDKProvider acceptCustomStyles debug={debug}>
      <TelegramApp>{children}</TelegramApp>
    </SDKProvider>
  );
}

export function TelegramRoot(props: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <AppLoading />
  );
}
