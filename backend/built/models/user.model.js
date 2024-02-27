"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.UserSchema = void 0;
var mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: false },
    role: { type: String, required: true },
    isSuperAdmin: { type: Boolean, required: true },
    schoolName: { type: String, required: false },
    schoolCode: { type: String, required: true },
    grade: { type: String, required: false },
    charactter: { type: String, required: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});
exports.UserModel = (0, mongoose_1.model)('user', exports.UserSchema);
