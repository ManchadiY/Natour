"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CatchAsync;
function CatchAsync(fn) {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
}
