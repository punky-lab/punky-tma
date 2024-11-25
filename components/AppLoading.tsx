import LoadingAnimation from "./loadingAnimation";

export default function AppLoading() {
  return (
    <div
      className="flex items-center justify-center h-screen w-screen bg-gradient-to-br text-white"
      style={{
        background:
          "linear-gradient(90deg, rgba(58, 46, 81, 1), rgba(85, 70, 100, 1))",
      }}
    >
      <LoadingAnimation text="loading" />
    </div>
  );
}
