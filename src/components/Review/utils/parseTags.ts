export const parseTags = (string: string): string[] => {
    const regex = /#[^\s#]+/g;
    const hashtags = string.match(regex) || [];
    return [...new Set(hashtags)];
};
