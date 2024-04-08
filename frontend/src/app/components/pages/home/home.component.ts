import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { Item } from '../../../shared/models/Item';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { User } from '../../../shared/models/User';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../parials/confirmation-dialog/confirmation-dialog.component';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public items:Item[] = [];
  user!:User;

  constructor(private itemService:ItemsService, activatedRoute:ActivatedRoute,
     private cartService:CartService, private userService:UserService, private dialog: MatDialog) {

      userService.userObservable.subscribe((newUser) => {
        this.user = newUser;
      })

    let itemsObservable: Observable<Item[]>;

    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        itemsObservable = this.itemService.getAllItemsBySearchTerm(params.searchTerm);
      else if(params.tag)
      itemsObservable = this.itemService.getAllItemsByTag(params.tag);
      else itemsObservable = itemService.getAll();

      itemsObservable.subscribe((serverItems) => {

        this.items = serverItems;
      })
    })
  }

  ngOnInit(): void {

  }

  addToCart(item:Item){
    this.cartService.addToCart(item);
   }

   removeFromCart(item:Item){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cartService.removefromCart(item.id);

      }
    });

  }

  get isSuperAdmin(){
    return this.user.isSuperAdmin;
  }

}