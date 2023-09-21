export const formatReview = (review: ReviewDB, user: User | null): ReviewDB => {
    return {
        ...review,
        editable:
            user?.id_user === review.authorId
                ? true
                : user?.role === 'ADMIN'
                ? true
                : false,
    };
};
