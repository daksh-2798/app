import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product : Product;
  @Input('show-actions') showActions="true";
  constructor(private cartService : ShoppingCartService) { }

  addToCart(product : Product){
    let cartId = localStorage.getItem('cartId');
    if(!cartId){
      this.cartService.create().then(result =>{
        localStorage.setItem('cartId',result.key);
      });
    }
  }

}
