import { QueryKey } from '@tanstack/react-query';

export function findReviewById(
    data: [queryKey: QueryKey, data: ReviewDB[] | undefined][],
    reviewId: string
): ReviewDB | null {
    for (const tuple of data) {
        const review = tuple[1]?.find((review: ReviewDB) => {
            return review.review_id === reviewId;
        });
        if (review) {
            return review;
        }
    }
    return null;
}
