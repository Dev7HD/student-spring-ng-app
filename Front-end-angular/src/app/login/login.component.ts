import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }
  ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
          login: this.formBuilder.control('', Validators.required),
          password: this.formBuilder.control('', Validators.required),
        })
    }

    login(): void {
      let user = this.loginForm.value.login;
      let password = this.loginForm.value.password;
      let auth: boolean = this.authService.login(user,password)
      if(auth){
        this.router.navigateByUrl("/admin")
      }
    }



}
