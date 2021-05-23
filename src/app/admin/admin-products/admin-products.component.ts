import { Product } from './../../models/product';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs';
import { ProductService } from './../../product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription: Subscription;
 
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Product> = new Subject();

  constructor(private productService: ProductService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true
    };

    this.subscription = this.productService.getAll()
    .subscribe(products => {
      this.filteredProducts = this.products = products;
      this.dtTrigger.next(); 
    });
   }

  // ngOnInit(): void {
   
  // }   

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.dtTrigger.unsubscribe();
      }

  filter(query: string){
    this.filteredProducts = (query) ?
      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())):
      this.products;
  }

}

// import { Product } from './../../models/product';
// import { ProductService } from './../../product.service';
// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs/Subscription';

// @Component({
//   selector: 'app-admin-products',
//   templateUrl: './admin-products.component.html',
//   styleUrls: ['./admin-products.component.css']
// })
// export class AdminProductsComponent implements OnInit, OnDestroy {
//   products : Product[];
//   filteredProducts : any[];
//   subscription : Subscription;
//   dtOptions: DataTables.Settings = {}
//   constructor(private poductService : ProductService) {
//     this.subscription=this.poductService.getAll().subscribe(products => this.filteredProducts = this.products=products = products);
//    }

//    filter(query : string){
//      this.filteredProducts = (query) ?
//      this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
//      this.products;
//    }

//   ngOnInit(): void {
    
//   }

//   ngOnDestroy(){
//     this.subscription.unsubscribe();
//   }

// }
