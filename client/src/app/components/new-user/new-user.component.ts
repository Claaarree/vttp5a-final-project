import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NewUser } from '../../models/models';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';

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
  form!: FormGroup;
  new!: NewUser;
  
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
    console.log(this.form.value);
    this.new = this.form.value;
    lastValueFrom(this.userSvc.createUser(this.new)).then(
      () => {
        const message = "Please verify your email address before signing in! It may be in your spam."
        this.messagingSvc.add(
          { severity: 'info', summary: 'Signup Success', detail: message, key: "tc", life: 3000 }
        )
      }
    ).catch(
      (err) => {
        // TODO think about this
        const message = "There seemed to be an error... Please try again!";
        this.messagingSvc.add(
          { severity: 'error', summary: 'Signup Failure', detail: err.message, key: "tc", life: 3000 }
        )
      }
    );
  }
  
}
