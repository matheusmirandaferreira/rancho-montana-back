"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const fileFilter = (_, file, callback) => {
    const fileType = file.mimetype;
    const acceptedFiles = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];
    if (acceptedFiles.includes(fileType)) {
        callback(null, true);
    }
    else {
        callback(new Error(`O tipo ${fileType} não é aceito`), false);
    }
};
exports.fileFilter = fileFilter;
