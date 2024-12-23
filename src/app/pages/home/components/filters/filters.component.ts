import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html'
})
export class FiltersComponent implements OnInit, OnDestroy{

  @Output() showCategory = new EventEmitter<string>();
  categoriesSubscription : Subscription | undefined;
  categories: Array<string> | undefined;
  constructor(private storeSrevice:StoreService) { }

  ngOnDestroy(): void {
   if(this.categoriesSubscription){
    this.categoriesSubscription.unsubscribe();
   }
  }

  ngOnInit(): void {
    this.categoriesSubscription = this.storeSrevice.getAllCategory().subscribe(
      (response)=>{
        this.categories = response;
      }
    );
  }

  onShowCategory(category: string): void{
    this.showCategory.emit(category);
  }

}
