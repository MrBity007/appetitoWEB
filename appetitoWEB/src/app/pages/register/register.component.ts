import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    rePassword: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit(){
    if(this.signupForm.get('password')?.value === this.signupForm.get('rePassword')?.value){
      this.authService.signup(this.signupForm.get('email')?.value as string, this.signupForm.get('password')?.value as string)
        .then(success => {
          this.router.navigateByUrl('/etlap');
        }).catch(error => {
        window.alert(error);
      });
    }
    else{
      window.alert("A két jelszó nem egyezik!");
    }

  }

  cancel() {
    this.router.navigateByUrl('/login');  }
}
