import { Injectable } from '@angular/core';
import { Item } from '../shared/models/Item';
import { sample_items, sample_tags } from '../../data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { ITEMS_BY_ID_URL, ITEMS_BY_SCHOOL_CHARACTER_URL, ITEMS_BY_SEARCH_URL, ITEMS_BY_TAG_URL, ITEMS_TAGS_URL, ITEMS_URL } from '../shared/constants/urls';
import { Observable, of } from 'rxjs';
import { IUserRegister } from '../shared/interfaces/IUserRegister';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  allItems!:Observable<Item[]>;
  allTags!:Observable<Tag[]>;
  constructor(private http:HttpClient) { 
  }

  getAll():Observable<Item[]>{
    if(this.allItems)
      return this.allItems;

    this.allItems = this.http.get<Item[]>(ITEMS_URL);
    return this.allItems;
  }

  getItemsByScoolCharacter(userRegister:IUserRegister):Observable<Item[]> {

      return this.http.post<Item[]>(ITEMS_BY_SCHOOL_CHARACTER_URL , userRegister);
  }

  getAllItemsBySearchTerm(searchTerm:string): Observable<Item[]>{

    return this.http.get<Item[]>(ITEMS_BY_SEARCH_URL + searchTerm);
  }

  getItemById(id:string):Observable<Item>{
    return this.http.get<Item>(ITEMS_BY_ID_URL + id);
  }

  getAllTags():Observable<Tag[]>{
    if(this.allTags)
      return this.allTags;
    this.allTags = this.http.get<Tag[]>(ITEMS_TAGS_URL);
    return this.allTags;
  }

  getAllItemsByTag(tag:string) : Observable<Item[]>{
    return tag=="All" ? this.getAll() :
    this.http.get<Item[]>(ITEMS_BY_TAG_URL + tag);
  }
}
