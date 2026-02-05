import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { QuotationService } from './services/quotation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.css'],
  providers: [QuotationService],
})
export class QuotationComponent {
  quoteForm!: FormGroup;
  submitted = false;
  submittedData: any = null;
  constructor(
    private formBuilder: FormBuilder,
    private quotationService: QuotationService,
    private router: Router,
  ) {
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
    this.quotationService.createQuotation(this.submittedData).subscribe(
      (response) => {
        console.log('Quotation request submitted successfully', response);
        this.quoteForm.reset();
        this.submitted = false;
        this.router.navigate(['/thank-you']);
      },
      (error) => {
        console.error('Error submitting quotation request', error);
      },
    );
  }
}
