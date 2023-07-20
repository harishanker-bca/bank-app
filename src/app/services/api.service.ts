import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  base_url = 'http://localhost:3005'
  constructor(private http: HttpClient) { }

  appendToken() {
    const token = localStorage.getItem("token")
    let headers = new HttpHeaders()
    if (token) {
      headers = headers.append("access-token", token)
    }
    return { headers }
  }

  register(username: any, acno: any, password: any) {
    const body = {
      username, acno, password
    }
    return this.http.post(`${this.base_url}/register`, body)
  }

  login(acno: any, password: any) {
    const body = {
      acno, password
    }
    return this.http.post(`${this.base_url}/login`, body)
  }

  getBalance(acno: any) {

    return this.http.get(`${this.base_url}/get-balance/${acno}`, this.appendToken())
  }

  fundTransfer(creditAcno: any, amount: any) {
    const body =
    {
      creditAcno, amount
    }
    return this.http.post(`${this.base_url}/fund-transfer`, body, this.appendToken())
  }

  getTransations() {
    return this.http.get(`${this.base_url}/get-transactions`, this.appendToken())
  }

  deleteAcount() {
    return this.http.delete(`${this.base_url}/delete-account`, this.appendToken())

  }
}
