import { Component } from '@angular/core';
import { Item } from '../../../shared/models/Item';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent {
  item!: Item;
  
  constructor(activatedRoute:ActivatedRoute, itemService:ItemsService,
    private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      itemService.getItemById(params.id).subscribe(serverItem => {
        this.item = serverItem});
    })
   }

   addToCart(){
    this.cartService.addToCart(this.item);
    this.router.navigateByUrl('/cart-page');
   }

}
