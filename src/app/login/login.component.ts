import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../services/toaster.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../services/api.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoggedIn: boolean = false


  constructor(private fb: FormBuilder, private toaster: ToasterService, private api: ApiService, private loginRouter: Router) {


  }


  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]],

    pswd: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*")]]
  })
  login() {


    // if(this.registerForm.valid){
    //   let userName = this.registerForm.value.userName
    // let acno = this.registerForm.value.acno
    // let pswd = this.registerForm.value.pswd
    // alert(`${userName},${pswd},${acno}}`)
    // }
    // else{
    //   this.toaster.showWarning("Invalid form","Warning")
    // }

    if (this.loginForm.valid) {
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.pswd
      // this.toaster.showSuccess(`${acno}`,'success')
      this.api.login(acno, pswd).subscribe({
        next: (res: any) => {
          console.log(res);
          const {loginUser,token}=res
          localStorage.setItem("loginUserName",loginUser.username)
          localStorage.setItem("loginAcno",loginUser.acno)
          localStorage.setItem("token",token)

          this.isLoggedIn = true
          setTimeout(() => {
            
            this.isLoggedIn = false
            this.loginRouter.navigateByUrl("user/dashboard")
            this.toaster.showSuccess(`welcome  ${loginUser.username}`, "login successfull")

          }, 2000)


        }, error: (err: any) => {
          // console.log(err.error);
          this.toaster.showError(err.error, "error")
          setTimeout(() => {
            this.loginForm.reset()
          }, 3000);
        }
      })
    }
    else {
      this.toaster.showWarning("Complete the form", "Warning")

    }



  }
}
