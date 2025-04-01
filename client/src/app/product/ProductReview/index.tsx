'use client';

import Image from 'next/image';
import { useGetProductRatingQuery } from '@/services/api';
import { ProductRating } from '@/services/types';

export default function ProductReview({ productId }: { productId: number }) {
  // Fetch product ratings using the RTK Query hook
  const { data: productRatings, isLoading, error } = useGetProductRatingQuery({ productId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !productRatings) {
    return <div>Failed to load reviews.</div>;
  }

  return (
    <div>
      {productRatings.map((review: ProductRating) => (
        <div key={review.ratingId} className="mb-6">
          <div className="flex justify-between items-center mt-6">
            <div className="text-[20px] font-bold text-black">
              {`${review.firstName} ${review.lastName || ''}`}
            </div>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Image
                  key={index}
                  src={index < review.rating ? '/RatingStarYello.svg' : '/RatingStarEmpty.svg'}
                  alt="Star"
                  width={30}
                  height={30}
                />
              ))}
            </div>
          </div>
          <div className="text-[16px] mt-2 text-black">{review.review}</div>
          <div className="flex justify-start gap-2 items-center mt-4">
            {review.imagePath && (
              <Image src={review.imagePath} alt="Review" width={100} height={100} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
