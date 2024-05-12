import {model, Schema, Types} from 'mongoose';
import { Item, ItemSchema } from './item.model';
import { OrderStatus } from '../constants/order_status';
import { Point } from "@angular/cdk/drag-drop";


export interface LatLng{
    lat:string;
    lng:string;
}


export const LatLngSchema = new Schema<LatLng>(
    {
        lat: {type:String, required: true},
        lng: {type:String, required: true}
    });

    export interface OrderItem {
        item:Item;
        price:number;
        quantity:number;
        position:string;
     }

     export const OrderItemSchema = new Schema<OrderItem>(
        {
            item:{type: ItemSchema, required: true},
            price: { type: Number, required: true},
            quantity: {type: Number, required:true},
            position: {type: String, required:true},

        }
     );

     export interface Order {
        id:number;
        items:OrderItem[];
        totalPrice:number;
        name:string;
        address:string;
        paymentId:string;
        status:OrderStatus;
        widthOfBoard:number;
        heightOfBoard:number;
        user: Types.ObjectId;
        roleOfUser: string;
        schoolCode: string;
        createdAt:Date;
        updatedAt:Date;
        adminNotes:string;
    
    }

    const orderSchema =new Schema<Order>(
        {
            name: {type:String, required: true},
            address: {type:String, required: true},
            paymentId: {type:String},
            totalPrice: {type:Number, required:true},
            items: {type:[OrderItemSchema], required:true},
            status: {type: String, default:OrderStatus.NEW},
            user: {type: Schema.Types.ObjectId},
            schoolCode: {type:String},
            roleOfUser: {type:String},
            widthOfBoard: {type:Number, required:false},
            heightOfBoard: {type:Number, required:false},
            adminNotes:{type:String}
        }, {
            timestamps:true,
            toJSON: {
                virtuals:true
            },
            toObject: {
                virtuals:true

            }
        });


        export const OrderModel = model('order', orderSchema);
