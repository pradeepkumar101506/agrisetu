import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface QuotationRequest {
  id?: string;
  userName: string;
  email: string;
  contactNumber: string;
  address: string;
  productName: string;
  quantity: number;
  message?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private apiUrl = 'http://localhost:5000/api/quotations';

  constructor(private http: HttpClient) {}

  // CREATE - Submit a new quotation request
  createQuotation(data: QuotationRequest): Observable<QuotationRequest> {
    return this.http
      .post<QuotationRequest>(this.apiUrl, data)
      .pipe(catchError(this.handleError));
  }

  // READ - Get all quotations
  getQuotations(): Observable<QuotationRequest[]> {
    return this.http
      .get<QuotationRequest[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // READ - Get a single quotation by ID
  getQuotationById(id: string): Observable<QuotationRequest> {
    return this.http
      .get<QuotationRequest>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // UPDATE - Update an existing quotation
  updateQuotation(
    id: string,
    data: QuotationRequest,
  ): Observable<QuotationRequest> {
    return this.http
      .put<QuotationRequest>(`${this.apiUrl}/${id}`, data)
      .pipe(catchError(this.handleError));
  }

  // DELETE - Delete a quotation
  deleteQuotation(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
