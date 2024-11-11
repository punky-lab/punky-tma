"use client";

import { type PropsWithChildren, useEffect, useMemo } from "react";
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
import LoadingAnimation from "../loadingAnimation";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import axios from "axios";

function App(props: PropsWithChildren) {
  const lp = useLaunchParams();
  const miniApp = useMiniApp();
  const themeParams = useThemeParams();
  const viewport = useViewport();
  const { initDataRaw } = retrieveLaunchParams();

  var initData = initDataRaw;
  if (process.env.NODE_ENV === "development") {
    initData = process.env.NEXT_PUBLIC_TELEGRAM_MOCK_INIT_DATA;
  }

  useEffect(() => {
    return bindMiniAppCSSVars(miniApp, themeParams);
  }, [miniApp, themeParams]);

  useEffect(() => {
    return bindThemeParamsCSSVars(themeParams);
  }, [themeParams]);

  useEffect(() => {
    return viewport && bindViewportCSSVars(viewport);
  }, [viewport]);

  useEffect(() => {
    console.log(initData);

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
        const data = res.data.data;
        console.log("login success", data);
        localStorage.setItem("token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
      })
      .catch((err) => {
        console.error("failed to login", err);
      });
  }, [initData]);

  return (
    <AppRoot
      appearance={miniApp.isDark ? "dark" : "light"}
      platform={["macos", "ios"].includes(lp.platform) ? "ios" : "base"}
    >
      <DynamicContextProvider
        settings={{
          environmentId: "db69ee58-41e4-43e7-be42-a601a83085ea",
          walletConnectors: [SolanaWalletConnectors],
        }}
        theme={"dark"}
      >
        {props.children}
      </DynamicContextProvider>
    </AppRoot>
  );
}

function RootInner({ children }: PropsWithChildren) {
  // Mock Telegram environment in development mode if needed.
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useTelegramMock();
  }

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
      <App>{children}</App>
    </SDKProvider>
  );
}

export function Root(props: PropsWithChildren) {
  // Unfortunately, Telegram Mini Apps does not allow us to use all features of the Server Side
  // Rendering. That's why we are showing loader on the server side.
  const didMount = useDidMount();
  // const didMount = false;

  return didMount ? (
    <ErrorBoundary fallback={ErrorPage}>
      <RootInner {...props} />
    </ErrorBoundary>
  ) : (
    <div
      className="flex items-center justify-center h-screen w-screen bg-gradient-to-br  text-white"
      style={{
        background:
          "linear-gradient(90deg, rgba(58, 46, 81, 1), rgba(85, 70, 100, 1))",
      }}
    >
      <LoadingAnimation text="loading" />
    </div>
  );
}
