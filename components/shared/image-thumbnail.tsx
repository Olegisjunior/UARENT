"use client";

import ImageGallery from "react-image-gallery";
import React from "react";
import { Car } from "@prisma/client";
import { Skeleton } from "../ui/skeleton";

type ImageThumbnailTypes = {
  product: Car;
};

export const ImageThumbnail: React.FC<ImageThumbnailTypes> = ({ product }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (product) {
      setIsLoading(false);
    }
  }, [product]);

  const images = [
    {
      original: product.imageUrl,
      thumbnail: product.imageUrl,
    },
    {
      original: (product.imageInteriors as string[])[0],
      thumbnail: (product.imageInteriors as string[])[0],
    },
    {
      original: (product.imageInteriors as string[])[1],
      thumbnail: (product.imageInteriors as string[])[1],
    },
  ];

  return (
    <>
      {isLoading ? (
        <div className="animate-pulse flex flex-col gap-4">
          <Skeleton className="h-[300px]" />
          <div className="flex gap-4 justify-center items-center">
            <div className=" animate-pulse rounded-md h-[100px] w-[160px] flex gap-4 bg-primary/10">
              <Skeleton className="h-[100px] w-[160px]" />
            </div>
            <div className=" animate-pulse rounded-md h-[100px] w-[160px] flex gap-4 bg-primary/10">
              <Skeleton className="h-[100px] w-[160px]" />
            </div>
            <div className=" animate-pulse rounded-md h-[100px] w-[160px] flex gap-4 bg-primary/10">
              <Skeleton className="h-[100px] w-[160px]" />
            </div>
          </div>
        </div>
      ) : (
        <ImageGallery
          items={images}
          showNav={true}
          thumbnailPosition={"bottom"}
          showFullscreenButton={false}
          lazyLoad={true}
          showPlayButton={false}
          disableThumbnailScroll={true}
        />
      )}
    </>
  );
};
