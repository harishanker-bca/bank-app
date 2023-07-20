import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  user: String = ""
  balanceSuccessStatus: Boolean = false
  constructor(private api: ApiService, private toaster: ToasterService, private fb: FormBuilder, private navigate: Router) { }


  balance: Number = 0
  // fund tranfer form
  transferForm = this.fb.group({
    creditAcno: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]],

    creditAmount: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
  })

  ngOnInit(): void {
    if (localStorage.getItem("loginUserName")) {
      this.user = localStorage.getItem("loginUserName") || ""
    }
  }

  getBalance() {
    const acno = localStorage.getItem("loginAcno")
    this.api.getBalance(acno).subscribe({
      next: (res: any) => {
        this.balance = res

        this.balanceSuccessStatus = true

      },
      error: (err: any) => {
        // console.log(err);
        this.toaster.showWarning(err.error, "warning")
        this.balanceSuccessStatus = false

      }
    })
  }

  fundTransfer() {
    if (this.transferForm.valid) {
      let creditacno = this.transferForm.value.creditAcno
      let amount = this.transferForm.value.creditAmount
      this.api.fundTransfer(creditacno, amount).subscribe({
        next: (res: any) => {
          this.toaster.showSuccess(res, "Transaction Successfull")
        },
        error: (err: any) => {
          console.log(err.error);
          this.toaster.showError(err.error, "Failed")
        }
      })
    } else {
      this.toaster.showWarning("complete the form ", "warning")
    }

  }

  deleteAcount() {
    this.api.deleteAcount().subscribe({
      next: (res: any) => {
        localStorage.clear()
        this.toaster.showSuccess(res, "Success")
        setTimeout(() => {
          this.navigate.navigateByUrl("")
        }, 2000)
      },
      error: (err: any) => {
        this.toaster.showError(err.error, "Failed")
      }
    })
  }

  logout() {
    localStorage.clear()
    setTimeout(() => {
      this.navigate.navigateByUrl("")
    }, 2000)
  }
}
