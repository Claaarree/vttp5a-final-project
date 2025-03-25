import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from '../../models/models';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

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
  router = inject(Router);
  messageService = inject(MessageService);
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control<string>('', Validators.email),
      // Minimum six characters, at least one uppercase letter, one lowercase letter, one number and one special character:
      password: this.fb.control<string>('')//, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"))
    });
  }

  protected login() {
    const value: User = this.loginForm.value;
    console.log(value)
    const result = this.userSvc.sendLoginRequest(value);
    result.subscribe({
      next: (data) => {
        console.log(data);
        const message = "Welcome! Start browsing for your next place to chiak!";
        this.messageService
          .add({ severity: 'info', summary: 'Signin Success', detail: message, key: "tc", life: 3000 });
          this.router.navigate(['/home']);
        },
      error: (error) => {
        console.log(error);
        const message = "Email and/or password may be wrong... Please try again!";
        this.messageService
          .add({ severity: 'info', summary: 'Signin failure', detail: message, key: "tc", life: 3000 });
      }
    })
  }

  goToSignUp() {
    this.router.navigate(['/signup'])
  }

}
