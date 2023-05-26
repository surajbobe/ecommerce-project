import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProducttListComponent } from './components/productt-list/productt-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProducttListComponent},
  {path: 'category/:id/:name', component: ProducttListComponent},
  {path: 'category', component: ProducttListComponent},
  {path: 'products', component: ProducttListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProducttListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
