import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [ReactiveFormsModule,MatInputModule,MatFormFieldModule,ReactiveFormsModule,
    MatInputModule,MatFormFieldModule,MatButtonModule,FormsModule,MatCardModule,NavbarComponent],
    templateUrl: './address.component.html',
    styleUrl: './address.component.scss'
  })
  export class AddressComponent implements OnInit {
    addressForm!:FormGroup
    fileError: string | null = null;
    private router = inject(Router)

  ngOnInit(): void {
    this.form()
  }

  form(){
    this.addressForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      address1: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{5,6}$')]),
      country: new FormControl('', Validators.required),
      addressProof: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    if (this.addressForm.valid) {
      console.log('Form Submitted', this.addressForm.value);
      localStorage.setItem("obj", JSON.stringify(this.addressForm.value) );
      this.router.navigate(['/details'])
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      if (file.type !== 'application/pdf') {
        this.fileError = 'Only PDF files are allowed.';
        this.addressForm.get('addressProof')?.setErrors({ invalidFile: true });
      } else {
        this.fileError = null;
        this.addressForm.get('addressProof')?.setValue(file);
        this.addressForm.get('addressProof')?.setErrors(null);
      }
    }
  }
}
