"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = exports.ItemSchema = void 0;
var mongoose_1 = require("mongoose");
exports.ItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    tags: { type: [String] },
    favorite: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    width: { type: Number, required: true },
    length: { type: Number, required: true },
}, {
    toJSON: {
        virtuals: true
    }, toObject: {
        virtuals: true
    },
    timestamps: true
});
exports.ItemModel = (0, mongoose_1.model)('item', exports.ItemSchema);
