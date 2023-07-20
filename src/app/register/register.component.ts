import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({
    userName: ['', [Validators.required, Validators.pattern("[a-zA-Z ]*"), Validators.minLength(2)]],

    acno: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*"), Validators.minLength(2)]],

    pswd: ['', [Validators.required, Validators.pattern("[a-zA-Z0-9]*"), Validators.minLength(2)]]
  })

  constructor(private fb: FormBuilder, private toaster: ToasterService, private api: ApiService, private registerRouter: Router) { }

  register() {
    if (this.registerForm.valid) {
      let userName = this.registerForm.value.userName
      let acno = this.registerForm.value.acno
      let pswd = this.registerForm.value.pswd
      this.api.register(userName, acno, pswd).subscribe({
        next: (res: any) => {
          console.log(res);
          this.toaster.showSuccess(`${res.username} registered successfully`,'success')
          setTimeout(()=>{
            this.registerRouter.navigateByUrl("user/login")
          },3000)

        }, error: (err: any) => {
          console.log(err);
          this.toaster.showError(`${err.error}`,"failed")
          setTimeout(()=>{ this.registerForm.reset()},3000)
        }
      })
    }
    else {
      this.toaster.showWarning("Invalid form", "Warning")
    }

  }
}

