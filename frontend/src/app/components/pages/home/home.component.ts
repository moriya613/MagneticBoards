import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../../services/items.service';
import { Item } from '../../../shared/models/Item';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public items:Item[] = [];

  constructor(private itemService:ItemsService, activatedRoute:ActivatedRoute) {

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

}