import LoadingBar from "./LoadingBar";

export default function LoadingBarDemo() {
  return (
    <div className="flex min-h-full items-center justify-center px-4">
      <div className="w-full max-w-[320px]">
        <LoadingBar value={89} />
      </div>
    </div>
  );
}
