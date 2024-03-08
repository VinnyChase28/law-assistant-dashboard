import { IconSpinner } from "@/components/ui/icons";
const Loading = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <IconSpinner className="mx-auto h-12 w-12 animate-spin" />
      </div>
    </div>
  );
};

export default Loading;
