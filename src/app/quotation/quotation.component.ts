import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
})
export class QuotationComponent {
  quoteForm!: FormGroup;
  submitted = false;
  submittedData: any = null;
  constructor(private formBuilder: FormBuilder) {
    this.quoteForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      address: ['', Validators.required],
      productName: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1)]],
      message: [''],
    });
  }

  get f() {
    return this.quoteForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.quoteForm.invalid) {
      return;
    }
    this.submittedData = this.quoteForm.value;
    console.log('Form Submitted', this.submittedData);
  }
}
