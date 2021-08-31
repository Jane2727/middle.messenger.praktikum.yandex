export const isClassDefined = (className: string | undefined) => {
    return (className && (className !== undefined)) ? className : "";
}