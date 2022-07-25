import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Customer} from "../model/Customer";
import {map} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  cutomers: any;
  errorMessage: string | undefined;
  searchFormGroup: FormGroup | undefined;

  //to use ReactiveFormsModule You Need to inject a FormBuilder
  constructor(private customerService: CustomerService, private fb: FormBuilder, private router: Router) {
  }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group(
      {
        keyword: this.fb.control(null)
      }
    )
    this.getCustomerList();
  }

  getCustomerList() {
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        this.cutomers = data;
      },
      error: (err) => {
        console.log("ERROR >>" + err);
        this.errorMessage = err.message;
      }
    })
  }

  handleSearchCustomers() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customerService.searchCustomer(kw).subscribe({
      next: (data) => {
        this.cutomers = data;
      },
      error: (err) => {
        console.log("ERROR >>" + err);
        this.errorMessage = err.message;
      }
    })
  }


  deleteCustomer(c: Customer) {
    let confMessage = confirm("Are you sure You want to delete this?");
    if (!confMessage)
      return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next: (respose) => {
        // then delete Customer from Array
        let index = this.cutomers.indexOf(c);
        console.log("Index -->" + index);
        this.getCustomerList();
      },
      error: (err) => {
        console.log("ERROR >>" + err);
        this.errorMessage = err.message;
      }
    })

  }

  handleCustomerAccounts(c: Customer) {
    // By Using State on a navigateByUrl means that i can get access to the object (Customer)) after switching router
    // LIKE WHEN using ionc 3 routing push() VS ionic 5 (angular routing)
    this.router.navigateByUrl("customer-accounts/" + c.id, {state: c});

  }
}
