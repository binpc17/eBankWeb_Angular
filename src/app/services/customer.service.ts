import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer} from "../model/Customer";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private http: HttpClient) {
  }

  public getCustomers(): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHot + "/customers")
  }

  public searchCustomer(keyword: String): Observable<Array<Customer>> {
    return this.http.get<Array<Customer>>(environment.backendHot + "/customers/search?keyword=" + keyword)
  }

  public saveCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.backendHot + "/customers/", customer);
  }

  public deleteCustomer(id: number) {
    return this.http.delete(environment.backendHot + "/customers/" + id);
  }
}
