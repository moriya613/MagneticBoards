import { Injectable } from '@angular/core';
import { Order } from '../shared/models/Order';
import { HttpClient } from '@angular/common/http';
import { ORDER_ADMINS_ORDERS_URL, ORDER_ALL_ORDERS_URL, ORDER_BY_SCHOOL_CODE, ORDER_CHANGE_STATUS_TO_APPROVE, ORDER_CHANGE_STATUS_TO_NEW, ORDER_CHANGE_STATUS_TO_PAYED, ORDER_CHANGE_STATUS_TO_REJECT, ORDER_CREATE_URL, ORDER_FOR_CURRENT_USER_URL, ORDER_NEW_FOR_CURRENT_SCHOOL_CODE, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { Point } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL,order);
    
  }

  changeStatusToApproved(order:Order):Observable<Order> {
    console.log(order.items[0].position);
    return this.http.post<Order>(ORDER_CHANGE_STATUS_TO_APPROVE,order);

  }

  changeStatusToNew(order:Order):Observable<Order> {
    return this.http.post<Order>(ORDER_CHANGE_STATUS_TO_NEW,order);

  }


  changeStatusToPayed(order:Order):Observable<Order> {
    return this.http.post<Order>(ORDER_CHANGE_STATUS_TO_PAYED,order);

  }

  changeStatusToReject(order:Order):Observable<Order> {
    return this.http.post<Order>(ORDER_CHANGE_STATUS_TO_REJECT,order);

  }

  getNewOrderForCurrentUser():Observable<Order>{
    return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  }

  getOrdersForCurrentUser():Observable<Order[]>{
    return this.http.get<Order[]>(ORDER_FOR_CURRENT_USER_URL);
  }

  getAllAdminsOrders():Observable<Order[]>{ // for super admin only
    return this.http.get<Order[]>(ORDER_ADMINS_ORDERS_URL);
  }

  getAllOrders():Observable<Order[]>{ // for super admin only
    return this.http.get<Order[]>(ORDER_ALL_ORDERS_URL);
  }

  getNewOrdersForCurrentSchoolCode(userRegister:IUserRegister):Observable<Order[]>{ // get board that need approval
    return this.http.post<Order[]>(ORDER_NEW_FOR_CURRENT_SCHOOL_CODE , userRegister);
  }

  getAllOrdersBySchoolCode(userRegister:IUserRegister):Observable<Order[]>{ // get board that need approval
    return this.http.post<Order[]>(ORDER_BY_SCHOOL_CODE , userRegister);
  }

  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id) ;
  }


  getHebrewStatus(order:Order):string{
    if(order.status == 'NEW')
      return 'ממתין לאישור מנהל';
    if(order.status == 'APPROVED')
      return 'מאושר';
    if(order.status == 'PAYED')
      return 'הסתיים';
    if(order.status == 'REJECT')
      return 'ממתין לתיקון המורה';

    return '';
  }

  
}
