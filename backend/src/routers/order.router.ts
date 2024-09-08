import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import auth from '../middlewares/auth.mid'
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';
const nodemailer = require('nodemailer');


const router = Router();
router.use(auth)

router.post('/create',
asyncHandler(async (req:any, res:any) =>
{
    console.log("insode create");
    const requestOrder = req.body;

    if(requestOrder.items.length <= 0) {
        res.status(HTTP_BAD_REQUEST).send('עגלה ריקה');
        return;
    }
        const newOrder = new OrderModel ({...requestOrder, user:req.user.id});
        await newOrder.save();
        res.send(newOrder);
})
)
 
router.get('/newOrderForCurrentUser', asyncHandler( async (req:any,res ) => {
    console.log("newOrderForCurrentUser :" + req.user.id);

    const order= await getNewOrderForCurrentUser(req);
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}))

router.get('/ordersForCurrentUser', asyncHandler( async (req:any,res ) => {
    console.log("ordersForCurrentUser :" + req.user.id );

    const orders= await OrderModel.find({ user: req.user.id});
     res.send(orders);
}))

router.post('/newOrdersForCurrentSchoolCode', asyncHandler( async (req:any,res ) => {
    //const schoolCode = req.body.schoolCode;

    const {schoolCode} = req.body;
    console.log("orders for school code :" + schoolCode);
    const orders= await OrderModel.find({ schoolCode:schoolCode, status: OrderStatus.NEW });
    if(!orders) console.log("orders for school code :" + req.schoolCode + "was not found");
    res.send(orders);
}))

router.post('/getAllOrdersBySchoolCode', asyncHandler( async (req:any,res ) => {
    const {schoolCode} = req.body;
    const orders= await OrderModel.find({ schoolCode:schoolCode});
    console.log("orders for school code :" + schoolCode + orders);

    if(!orders) console.log("orders for school code :" + req.schoolCode + "was not found");
    res.send(orders);
}))




router.post('/pay', asyncHandler( async (req:any, res) => {
    console.log("inside pay");
    const {paymentId} = req.body;
    const order = await getNewOrderForCurrentUser(req);
    if(!order){
        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.paymentId = paymentId;
    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))

router.get('/getAllAdminsOrders', asyncHandler( async (req:any,res ) => {

    console.log("inside getAllAdminsOrders" );
    const orders= await OrderModel.find({ roleOfUser:"admin" , status: "PAYED"});
    if(!orders) console.log("orders was not found");
    res.send(orders);
}))

router.get('/getAllOrders', asyncHandler( async (req:any,res ) => {

    console.log("inside getAllOrders" );
    const orders= await OrderModel.find();
    if(!orders) console.log("orders was not found");
    res.send(orders);
}))

router.post('/delete', asyncHandler( async (req:any, res) => {
    console.log("inside delete");
    const {id} = req.body;
    console.log("inside delete" +id);

    try{
        await OrderModel.deleteOne({ _id: id});
        res.status(200).json({ message: 'order removed successfully' });
        console.log(`Order with id '${id}' removed successfully.`);

      } catch(err) {
          res.status(HTTP_BAD_REQUEST).send("Error while removing order");
          console.error('Error while removing order:', err);
      }    
}))


router.post('/changeStatusToApprove', asyncHandler( async (req:any, res) => {
    console.log("inside changeStatusToApprove");
    const {id} = req.body;
    console.log("inside changeStatusToApprove" +id);

    const order = await OrderModel.findOne({ _id: id});
    if(!order){
        console.log("not found order with id " + id);

        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.status = OrderStatus.APPROVED;
    await order.save();

    res.send(order._id);
}))

router.post('/changeStatusToNew', asyncHandler( async (req:any, res) => {
    console.log("inside changeStatusToNew");
    const {id,items, adminNotes} = req.body;
    console.log("inside changeStatusToNew" +id);

    const order = await OrderModel.findOne({ _id: id});
    if(!order){
        console.log("not found order with id " + id);

        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.status = OrderStatus.NEW;
    order.items = items;
    order.adminNotes = adminNotes;
    await order.save();

    res.send(order._id);
}))

router.post('/changeStatusToReject', asyncHandler( async (req:any, res) => {
    console.log("inside changeStatusToReject");
    const {id,items, adminNotes} = req.body;
    console.log("inside changeStatusToReject" +id);

    const order = await OrderModel.findOne({ _id: id});
    if(!order){
        console.log("not found order with id " + id);

        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.status = OrderStatus.REJECT;
    order.adminNotes = adminNotes;
    await order.save();

    res.send(order._id);
}))



router.post('/changeStatusToPayed', asyncHandler( async (req:any, res) => {
    console.log("inside changeStatusToPayed");
    const {id} = req.body;
    console.log("inside changeStatusToPayed" +id);

    const order = await OrderModel.findOne({ _id: id});
    if(!order){
        console.log("not found order with id " + id);

        res.status(HTTP_BAD_REQUEST).send('Order Not Found!');
        return;
    }

    order.status = OrderStatus.PAYED;
    await order.save();

    res.send(order._id);
}))


router.get('/track/:id', asyncHandler(async (req,res) =>{
    const order = await OrderModel.findById(req.params.id);
    res.send(order);
}))

export default router;

async function getNewOrderForCurrentUser(req: any) {
    console.log("inside getNewOrderForCurrentUser" + req.user.id);
    console.log(req.user.id);
    return await OrderModel.findOne({ user: req.user.id, status: OrderStatus.NEW });
}


router.post('/send-email', (req, res) => {
    console.log("inside send-email");

    const { email, subject, message } = req.body;
    console.log(email + subject);


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: 'moriya.raz@gmail.com',  // replace with your email
            pass: 'fgzz feja sgqt dxln',  // replace with your email password
        },
    });

    const mailOptions = {
        from: 'moriya.raz@gmail.com',  // replace with your email
        to: email,
        subject: subject,
        text: message,
    //     html: `<div dir="rtl">
    //   ${message}
    // </div>`
    };

    transporter.sendMail(mailOptions, (error:any, info:any) => {
        if (error) {
            console.log("Email NOT sent: " + error);

            return res.status(500).send(error.toString());
        }
        res.send('Email sent: ' + info.response);
        console.log("Email sent");

    });
});
