import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productt-list',
  templateUrl: './productt-list-grid.component.html',
  styleUrls: ['./productt-list.component.css']
})
export class ProducttListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  // for pagination
  thePageNumber: number = 1;
  thePageSize: number = 10;
  theTotalElements: number = 0;

  previousKeyword: string = "";


  constructor(private productService: ProductService,
              private cartService: CartService,
              private route: ActivatedRoute){ }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
   
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    console.log("in listProducts");
    if(this.searchMode) {
      this.handleSearchProducts();
      console.log("has keyword");
    } else {
      this.handleListProducts();
    }
    
  }

  handleListProducts() {
      //check if id parameter is available
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

      if(hasCategoryId){
        //get the "id" param string. convert string to a number using "+" symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
  
        //get the "name" param string
        this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
      } else {
        //no category avaialable
        this.currentCategoryId = 1 ;
        this.currentCategoryName = 'Books';
      }

      //
      //Check if we have different category that previous
      //Note: Angular will reuse a component if it is currently being viewd
      //

      //if we have a different category id than previous
      //then set thePageNumber back to 1

      if(this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
      }
  
      this.previousCategoryId = this.currentCategoryId;
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
      
      this.productService.getProductListPaginate(this.thePageNumber - 1,
                                                this.thePageSize,
                                                this.currentCategoryId)
                                                .subscribe(
                                                  this.processResult() );
      
  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    //if we have diff keyword that previous then set thePageNumber to 1
    if(this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductsPaginate(this.thePageNumber-1,
                                              this.thePageSize,
                                              theKeyword).subscribe(
                                                this.processResult());
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();
  }

  processResult() {
    return (data: any) => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };
  }

  addToCart(theProduct: Product){
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    const theCartItem = new CartItem(theProduct);
    this.cartService.addToCart(theCartItem);
  }
}
