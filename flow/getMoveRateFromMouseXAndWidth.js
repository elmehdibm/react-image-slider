export default (
    x,
    width,
) => {
    if (!width) {
        // if width is undefined or 0 it means we're out of the box
        return (x > 0) ? -75 : 75;
    }
    return (
        - Math.floor(((x / width)) * 100)
    );
};
