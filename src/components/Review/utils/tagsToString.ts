export const tagsToString = (tags: TagObject[]): string => {
    return tags
        .map((el: TagObject) => '#' + el.tag.tag_name)
        .join(' ')
        .toString();
};
