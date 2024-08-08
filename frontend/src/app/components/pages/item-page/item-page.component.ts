import { Component, OnInit } from '@angular/core';
import { Item } from '../../../shared/models/Item';
import { ActivatedRoute, Router } from '@angular/router';
import { ItemsService } from '../../../services/items.service';
import { CartService } from '../../../services/cart.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent implements OnInit {
  item!: Item;
  returnUrl: string ='';
  
  constructor(private activatedRoute:ActivatedRoute, itemService:ItemsService, private location: Location,
    private cartService:CartService, private router:Router) {
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      itemService.getItemById(params.id).subscribe(serverItem => {
        this.item = serverItem});
    })

   }

   ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl;

   }

   addToCart(){
    this.cartService.addToCart(this.item);
    this.location.back();
   }

}
