export const asyncHandler = (callback) => {
    return function (request, response, next) {
        return callback(request, response, next).catch(next);
    };
};
