import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/Customer";
import {environment} from "../../environments/environment";
import {AccountDetails} from "../model/Account";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http: HttpClient) {
  }

  public getAccount(accountId: string, page: number, size: number): Observable<AccountDetails> {
    return this.http.get<AccountDetails>(environment.backendHot + "/accounts/" + accountId + "/pageOperations?page=" + page + "&size=" + size)
  }

  public debit(accountId: string, amount: number, description: string) {
    let data = {
      accountId: accountId,
      amount: amount,
      description: description
    }
    console.log("DEBIT DATA >>" + JSON.stringify(data));
    return this.http.post(environment.backendHot + "/accounts/debit", data)
  }

  public credit(accountId: string, amount: number, description: string) {
    let data = {
      accountId: accountId,
      amount: amount,
      description: description
    }
    return this.http.post(environment.backendHot + "/accounts/credit", data)
  }

  public transfert(accountSource: string, accountDestination: string, amount: number, description: string) {
    let data = {
      accountSource,
      accountDestination,
      amount,
      description
    }
    return this.http.post(environment.backendHot + "/accounts/transfert", data)
  }
}
