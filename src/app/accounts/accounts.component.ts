import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {CustomerService} from "../services/customer.service";
import {AccountsService} from "../services/accounts.service";
import {catchError, Observable, throwError} from "rxjs";
import {AccountDetails} from "../model/Account";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accountFormGroup!: FormGroup;
  operationFormGroup!: FormGroup;
  currentPage: number = 0;
  pageSize: number = 5;
  errorMessage: string | undefined;
  accountId: string | undefined;
  accountObserable!: Observable<AccountDetails>

  constructor(private fb: FormBuilder, private accountService: AccountsService, private router: Router) {
  }

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      accountId: this.fb.control('')
    })

    this.operationFormGroup = this.fb.group({
      operationType: this.fb.control(null),
      amount: this.fb.control(0),
      description: this.fb.control(null),
      accountDestination: this.fb.control(null),

    })

  }

  handleSearchAccount() {
    let accountId = this.accountFormGroup?.value.accountId;
    this.accountId = accountId;
    this.accountObserable = this.accountService.getAccount(accountId, this.currentPage, this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    );
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.handleSearchAccount();
  }

  handleAccountOperation() {
    let acccountId: string = this.accountFormGroup?.value.accountId;
    let operationType = this.operationFormGroup.value.operationType;
    let amount: number = this.operationFormGroup.value.amount;
    let description: string = this.operationFormGroup.value.description;
    let acountDestination: string = this.operationFormGroup.value.accountDestination;

    if (operationType == 'DEBIT') {
      this.accountService.debit(acccountId, amount, description).subscribe({
        next: (data) => {
          this.operationFormGroup.reset();
          alert("Debit successfull");
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log("ERROR >>" + err);
          this.errorMessage = err.message;
        }
      })
    } else if (operationType == 'CREDIT') {
      this.operationFormGroup.reset();
      this.accountService.credit(acccountId, amount, description).subscribe({
        next: (data) => {
          alert("Credit successfull");
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log("ERROR >>" + err);
          this.errorMessage = err.message;
        }
      })

    } else if (operationType == 'TRANSFERT') {
      this.accountService.transfert(acccountId, acountDestination, amount, description).subscribe({
        next: (data) => {
          this.operationFormGroup.reset();
          alert("Transfert successfull");
          this.handleSearchAccount();
        },
        error: (err) => {
          console.log("ERROR >>" + err);
          this.errorMessage = err.message;
        }
      })

    }
  }
}
