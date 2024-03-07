import { IconSpinner } from "./_components/ui/icons";

const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <IconSpinner className="mx-auto h-12 w-12 animate-spin" />
        <p className="mt-2 text-lg">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
