import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';
import { SurajShopyyFormService } from 'src/app/services/suraj-shopyy-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  constructor(private formBuilder:  FormBuilder,
              private surajShopyyService: SurajShopyyFormService,
              private cartService: CartService){ }

  ngOnInit(): void {
      
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email:[''],
        phoneNumber: ['']
      }),
      shippingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']
      }),
      creditCard: this.formBuilder.group({
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })

    });

    //populate credit card months
    const startMonth: number = new Date().getMonth() +1;
    console.log("startMonth:"+startMonth);

    this.surajShopyyService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months :" + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

    //populate credit card years
    
    this.surajShopyyService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieved credit card years :" + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

    this.updateCartStatus();
  }


  onSubmit(){
    console.log("Submit data");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  copyShippingToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);

    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
    
  }

  updateCartStatus() {

    //subcribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    //subcribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );
  }

  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expirationYear);

    //if the current year = selected year, start with current month
    let startMonth: number;

    if(currentYear === selectedYear) {
      startMonth = new Date().getMonth() +1;
    } else {
      startMonth = 1;
    }

    this.surajShopyyService.getCreditCardMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    )
  }
}
