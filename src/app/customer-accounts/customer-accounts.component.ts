import { Component, OnInit } from '@angular/core';
import {CustomerService} from "../services/customer.service";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/Customer";

@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit {
  customerId!: string;
  customer! : Customer;

  constructor( private customerService: CustomerService, private fb : FormBuilder,private router: Router, private activeRouer: ActivatedRoute) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }

  ngOnInit(): void {
    this.customerId = this.activeRouer.snapshot.params['id'];
  }

}
