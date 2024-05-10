import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USERS_ADMINS_URL, USERS_URL, USER_LOGIN_URL, USER_REGISTER_URL, USER_REMOVE_URL } from '../shared/constants/urls';
import { User } from '../shared/models/User';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';


const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService
 {


  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  getAll():Observable<User[]>{
    return this.http.get<User[]>(USERS_URL);
  }

  getAllAdmins():Observable<IUserRegister[]>{
    return this.http.get<IUserRegister[]>(USERS_ADMINS_URL);
  }

  removeUser(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_REMOVE_URL, userLogin)
     .pipe(
      tap({
        next: (user) =>{
        
          this.toastrService.success(
            `user  ${user.name} removed successfully`,
            'Removed successguly'
          );
          localStorage.setItem("ERROR", "");

        },
        error: (errorResponse) => {
          localStorage.setItem("ERROR", errorResponse.error);

          this.toastrService.error(errorResponse.error, 'removed failed');
        }
      }));

  }

  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Magnetic board ${user.name}!`,
            'Login Successful'
          );
          localStorage.setItem("ERROR", "");

        },
        error: (errorResponse) => {
          localStorage.setItem("ERROR", errorResponse.error);

          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      }));
  }

  register(userRegister: IUserRegister): Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) =>{
          console.log("Register Successful");
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Magnetic board ${user.name}!`,
            'Register Successful'
          )
        },
        error: (errorResponse) => {
          console.log("Register failed");
          localStorage.setItem("ERROR", errorResponse.error);

          this.toastrService.error(errorResponse.error, 'Regsiter Failed');
        }
      }));
  }

  logout(){
    this.userSubject.next(new User()) 
    localStorage.removeItem(USER_KEY);
    window.location.reload();
    this.toastrService.success(
      `Welcome to Magnetic board !`,
      'Login Successful'
    )
  }

    getIUserRegisterOfCurrentUser():IUserRegister {

    const userRegister:IUserRegister = {
      name: this.currentUser.name,
      email: this.currentUser.email,
      password: "xxx",
      confirmPassword: "xxx",
      address: this.currentUser.address,
      schoolCode: this.currentUser.schoolCode,
      schoolName: this.currentUser.schoolCode,
      role: this.currentUser.role,
      grade: "xxx",
      schoolCharacter: this.currentUser.schoolCharacter ? this.currentUser.schoolCharacter : ''};

      return userRegister;
  }

  private setUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  private getUserFromLocalStorage():User{
    try{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User;
  } catch(exception)
  {
    console.log("ERROR123");
  }
  
    return new User();
  }

}

