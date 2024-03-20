import {Router} from 'express';
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import auth from '../middlewares/auth.mid'
import { OrderStatus } from '../constants/order_status';
import { OrderModel } from '../models/order.model';

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

    // await OrderModel.deleteOne(
    //     {
    //         user:req.user.id,
    //         status:OrderStatus.NEW
    //     });

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
