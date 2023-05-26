import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-productt-list',
  templateUrl: './productt-list-grid.component.html',
  styleUrls: ['./productt-list.component.css']
})
export class ProducttListComponent implements OnInit{

  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  constructor(private productService: ProductService,
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
  
      this.productService.getProductList(this.currentCategoryId).subscribe(
        data => {
          this.products = data;
        }
      )
  }

  handleSearchProducts() {

    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;
    console.log("in handle search");
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }
}
