import {Schema, model} from 'mongoose';

export interface User{
    id:string;
    email:string;
    password: string;
    name:string;
    address:string;
    schoolName:string;
    schoolCode:string;
    grade:string;
    charactter:string;
    role:string;
    isSuperAdmin:boolean;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    address: {type: String, required: false},
    role: {type: String, required: true},
    isSuperAdmin: {type: Boolean, required: true},

    schoolName:{type: String, required: false},
    schoolCode:{type: String, required: true},
    grade:{type: String, required: false},
    charactter:{type: String, required: false},
}, {
    timestamps: true,
    toJSON:{
        virtuals: true
    },
    toObject:{
        virtuals: true
    }
});

export const UserModel = model<User>('user', UserSchema);