import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../models/models';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  standalone: false,
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  
  private fb = inject(FormBuilder);
  private userSvc = inject(UserService);
  private messagingSvc = inject(MessageService);
  private router = inject(Router);
  form!: FormGroup;
  new!: NewUser;
  isSubmitted = false;
  
  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      username: this.fb.control<string>('', [Validators.required, Validators.minLength(3)]),
      email: this.fb.control<string>('', [Validators.required, Validators.email]),
      password: this.fb.control<string>('', [Validators.required, Validators.minLength(6)])
    })
  }

  handleSubmit() {
    this.isSubmitted = true;
    console.log(this.form.value);
    this.new = this.form.value;
    lastValueFrom(this.userSvc.createUser(this.new)).then(
      () => {
        const message = "Please verify your email address before signing in! It may be in your spam."
        this.messagingSvc.add(
          { severity: 'info', summary: 'Signup Success', detail: message, key: "tr", life: 3000 }
        )
        this.router.navigate(['']);
      }
    ).catch(
      (err) => {
        // TODO think about this
        const message = "There seemed to be an error... Please try again!";
        this.messagingSvc.add(
          { severity: 'error', summary: 'Signup Failure', detail: err.message, key: "tr", life: 3000 }
        )
      }
    );
  }

  goBack() {
    this.router.navigate(['']);
  }
  
}
