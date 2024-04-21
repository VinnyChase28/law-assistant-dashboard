import { Skeleton } from "@components/ui/skeleton";

interface SkeletonAbstractProps {
  width?: string;
  height?: string;
}

export function SkeletonAbstract({ width, height }: SkeletonAbstractProps) {
  return (
    <div className="flex items-center space-x-4 py-10">
      <Skeleton
        className={`${width ?? "h-12"} ${height ?? "w-12"} rounded-full`}
      />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
}
