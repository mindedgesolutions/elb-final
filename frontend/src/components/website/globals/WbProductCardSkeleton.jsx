import { Skeleton } from "@/components/ui/skeleton";

const WbProductCardSkeleton = ({ count = 5 }) => {
  const productCards = Array.from({ length: count }, (_, index) => {
    return (
      <div className="job-post bg-offWhite position-relative" key={index + 1}>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div className="job-post-icon">
            <Skeleton className="w-full object-cover rounded-lg" />
          </div>
          <Skeleton className="w-full" />
          <Skeleton className="w-full" />
        </div>
      </div>
    );
  });
  return productCards;
};
export default WbProductCardSkeleton;
