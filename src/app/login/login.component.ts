import { Component, inject, Inject, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  signIn!: FormGroup;
  errorMessage = signal('');
  private router = inject(Router)
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.form()
  }

  form() {
    this.signIn = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }


  updateErrorMessage() {
    if (this.signIn.get('email')?.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.signIn.get('email')?.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  submit() {
    if (this.signIn.valid) {
      console.log(this.signIn.value)
      this.login()
    }
  }



  login() {
    const dummyToken = 'nedjnednednenind';
    this.authService.login(dummyToken);
    this.router.navigate(['/address'])
    alert('Logged in successfully!');
  }

  logout() {
    this.authService.logout();
    alert('Logged out successfully!');
  }

}


