import { Routes } from '@angular/router';
import { QuotationComponent } from './quotation/quotation.component';
import { ThankYouComponent } from './thank-you/thank-you.component';

export const routes: Routes = [
  { path: '', component: QuotationComponent },
  { path: 'quotation', component: QuotationComponent },
  { path: 'thank-you', component: ThankYouComponent },
];
