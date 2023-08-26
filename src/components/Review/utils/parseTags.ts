export const parseTags = (string: string): string[] => {
    const regex = /#[^\s#]+/g;
    const hashtags = string.match(regex) || [];
    const cleanedHashtags = hashtags.map((tag) => tag.substring(1));
    return [...new Set(cleanedHashtags)];
};
