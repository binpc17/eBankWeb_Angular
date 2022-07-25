import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {Customer} from "../model/Customer";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit {
  newCustomerformGroup!: FormGroup;
  errorMessage: string | undefined;

  constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
  }

  ngOnInit(): void {
    ///Init of the form
    this.newCustomerformGroup = this.fb.group(
      {
        name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
        email: this.fb.control(null, [Validators.required, Validators.email])
      }
    )
  }

  handleSaveCustomer() {
    let customer: Customer = this.newCustomerformGroup.value
    this.customerService.saveCustomer(customer).subscribe({
      next: (data) => {
        this.newCustomerformGroup.reset();
        //alert("Customer saved successfully");
        this.router.navigateByUrl("/cutomers");
      },
      error: (err) => {
        console.log("ERROR >>" + err);
        this.errorMessage = err.message;
      }
    })
  }
}
