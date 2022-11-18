import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styles: [
  ]
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  @Output() itemsCountChange = new EventEmitter<number>();
  @Output() sortChange = new EventEmitter<string>();
  sort:any= 'desc';
  itemsShowCount=12;
  constructor() { }

  ngOnInit(): void {
  }

  onSortUpdated(newSort: string):void{
    this.sort = newSort;
    this.sortChange.emit(newSort);
  }
  onItemUpdated(count:number):void{
    this.itemsShowCount = count;
    this.itemsCountChange.emit(count);
  }

  onColumnsupdated(colNumber:number):void{
    this.columnsCountChange.emit(colNumber);
  }
}
