import { Skeleton } from "@/components/ui/skeleton";

const WbProductCardSkeleton = () => {
  return (
    <div className="job-post bg-offWhite position-relative">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="job-post-icon">
          <Skeleton className="w-full object-cover rounded-lg" />
        </div>
        <Skeleton className="w-full" />
        <Skeleton className="w-full" />
      </div>
    </div>
  );
};
export default WbProductCardSkeleton;
