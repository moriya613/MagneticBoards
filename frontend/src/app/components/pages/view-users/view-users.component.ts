import { Component } from '@angular/core';
import { User } from '../../../shared/models/User';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';


@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrl: './view-users.component.css'
}) 
export class ViewUsersComponent {
  public users:User[] = [];
  public titles:string[] = ["שם" , "אמייל" , "כתובת" , "תפקיד " , "קוד מוסד"];


  constructor(private userSerivce:UserService) {

    let userObservable: Observable<User[]>;

    userObservable = userSerivce.getAll();

    userObservable.subscribe((serverItems) => {

        this.users = serverItems;
      })
  }

  removeUser(user:User){
    this.userSerivce.removeUser({email:user.email, password: "xxx"})
    .subscribe({
      next: (v) =>  window.location.reload(),
      error: (e) => console.log("error"),
  });
  }
}
