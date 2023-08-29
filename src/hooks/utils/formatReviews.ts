export const formatReviews = (
    data: ReviewDB[],
    user: User | null
): ReviewDB[] => {
    const sortedData = data.sort(
        (a, b) => Date.parse(b.create_date) - Date.parse(a.create_date)
    );
    return sortedData.map((el) => {
        return {
            ...el,
            editable:
                user?.id_user === el.authorId
                    ? true
                    : user?.role === 'ADMIN'
                    ? true
                    : false,
        };
    });
};
