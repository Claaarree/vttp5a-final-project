import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  hide:boolean = true;

  fb = inject(FormBuilder);
  userSvc = inject(UserService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', Validators.email),
      // Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:
      password: this.fb.control<string>('', Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"))
      // username: this.fb.control<string>('')
    });
  }

  protected login() {
    const value: User = this.loginForm.value;
    console.log(value)
    const result = this.userSvc.sendLoginRequest(value);
    result.subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => console.log(error)
    })
  }

}
