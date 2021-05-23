
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { switchMap } from 'rxjs/operators';
declare module "@angular/core" {
  interface ModuleWithProviders<T = any> {
      ngModule: Type<T>;
      providers?: Provider[];
  }
}
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  products : Product[];
  filteredProducts : Product[]=[];
  category : string;

  constructor(
    route : ActivatedRoute,
    productService : ProductService) {
      productService.getAll().subscribe(products => {
        this.products = products;
        route.queryParamMap.subscribe(params =>{
             this.category = params.get('category');
             this.filteredProducts = (this.category) ?
             this.products.filter(p => p.category === this.category) :
             this.products;
           });
        //return route.queryParamMap
      })
    //   .subscribe(params =>{
    //   this.category = params.get('category');
    //   this.filteredProducts = (this.category) ?
    //   this.products.filter(p => p.category === this.category) :
    //   this.products;
    // });
    
   }

}
