/** Async error handler middleware. Wraps an async function with try-catch. */
export const use = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)