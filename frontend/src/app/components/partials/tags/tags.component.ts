import { Component } from '@angular/core';
import { Tag } from '../../../shared/models/Tag';
import { ItemsService } from '../../../services/items.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {
  tags?:Tag[];
  constructor(itemService:ItemsService){
    itemService.getAllTags().subscribe(serverTags => {
      this.tags = serverTags;
    })
  }
}
