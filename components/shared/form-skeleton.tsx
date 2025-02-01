import { Skeleton } from "@/components/ui/skeleton";
import { FC } from "react";

interface FormSkeletonProps {
  isSubmitButton: boolean | undefined;
}

export const FormSkeleton: FC<FormSkeletonProps> = ({ isSubmitButton }) => {
  return (
    <div className={!isSubmitButton ? `animate-pulse flex gap-2 items-center` : `animate-pulse  gap-2 items-center`}>
      <div className="pick py-5 flex flex-col gap-3 px-2 bg-white rounded-md w-1/2">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex">
          <div className="flex flex-col items-start justify-center w-full">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px]"></div>
          <div className="w-[170px] flex flex-col items-start justify-center">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px]"></div>
          <div className="w-[170px] flex flex-col items-start justify-center">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>

      {!isSubmitButton && <Skeleton className="h-10 w-[200px] rounded-md mt-4 mx-auto  " />}

      <div className="pick py-5 flex flex-col gap-3 px-2 bg-white rounded-md mt-4  w-1/2">
        <div className="flex gap-2 items-center">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-48" />
        </div>
        <div className="flex">
          <div className="flex flex-col items-start justify-center w-full">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px]"></div>
          <div className="w-[170px] flex flex-col items-start justify-center">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
          <div className="h-[60px] bg-[#90A3BF] opacity-25 w-[1px]"></div>
          <div className="w-[170px] flex flex-col items-start justify-center">
            <Skeleton className="h-5 w-20 mb-2" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>
      </div>
      {isSubmitButton && <Skeleton className="h-10 w-[200px] rounded-md mt-4 mx-auto  " />}
    </div>
  );
};
