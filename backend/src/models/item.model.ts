import { Schema, model } from "mongoose";

export interface Item{
    id:string;
    name:string;
    price:number;
    tags: string[];
    favorite:boolean;
    uses: number;
    imageUrl: string;
    width : number;
    length : number;
}

export const ItemSchema = new Schema<Item>(
    {
        name: {type: String, required: true},
        price: {type: Number, required: true},
        tags: {type: [String]},
        favorite: {type: Boolean, default: false},
        imageUrl: {type: String, required: true},
        width: {type: Number, required: true},
        length: {type: Number, required: true},
},{
    toJSON:{
        virtuals: true
    }, toObject:{
        virtuals:true
    },
    timestamps: true
});

export const ItemModel = model<Item>('item', ItemSchema);