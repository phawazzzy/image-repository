"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileHandler = void 0;
var fileHandler = function (req, _, next) {
    var _a, _b, _c, _d;
    // const { file } = req;
    if (req.file) {
        var file = {
            name: (_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname,
            type: (_b = req.file) === null || _b === void 0 ? void 0 : _b.mimetype,
            content: req.file.buffer,
            size: (_c = req.file) === null || _c === void 0 ? void 0 : _c.size,
            extension: "" + ((_d = req.file) === null || _d === void 0 ? void 0 : _d.originalname.split('.').pop())
        };
        Object.assign(req.body, file);
    }
    // const file: File = {
    //      name: file.originalname,
    //     type: file.mimetype,
    //     content: file.buffer,
    //     size: file.size,
    //     extension: `${file.originalname.split('.').pop()}`
    // }
    // }
    // const mappedFiles: File[] = ((files as Express.Multer.File[]) || []).map((file) => ({
    //     name: file.originalname,
    //     type: file.mimetype,
    //     content: file.buffer,
    //     size: file.size,
    //     extension: `${file.originalname.split('.').pop()}`
    // }));
    // Object.assign(req.body, { files: mappedFiles });
    return next();
};
exports.fileHandler = fileHandler;
