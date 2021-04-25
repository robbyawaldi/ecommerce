const LENGTH = 60;

export const textLimit = (text: string) => {
    return text.length > LENGTH
        ? text.substr(0, LENGTH) + ' ...'
        : text;
}