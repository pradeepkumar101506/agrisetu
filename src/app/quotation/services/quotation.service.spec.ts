import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { QuotationService, QuotationRequest } from './quotation.service';
import { environment } from '../../../environments/environment';

describe('QuotationService', () => {
  let service: QuotationService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiBaseUrl}/quotations`;

  const mockQuotation: QuotationRequest = {
    id: '1',
    userName: 'John Doe',
    email: 'john@example.com',
    contactNumber: '1234567890',
    address: '123 Main St, City',
    productName: 'Fertilizer',
    quantity: 100,
    message: 'Urgent request',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [QuotationService],
    });
    service = TestBed.inject(QuotationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('createQuotation', () => {
    it('should POST a new quotation and return it', () => {
      service.createQuotation(mockQuotation).subscribe((result) => {
        expect(result).toEqual(mockQuotation);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('POST');
      req.flush(mockQuotation);
    });
  });

  describe('getQuotations', () => {
    it('should GET all quotations', () => {
      const mockQuotations: QuotationRequest[] = [mockQuotation];

      service.getQuotations().subscribe((result) => {
        expect(result.length).toBe(1);
        expect(result).toEqual(mockQuotations);
      });

      const req = httpMock.expectOne(apiUrl);
      expect(req.request.method).toBe('GET');
      req.flush(mockQuotations);
    });
  });

  describe('getQuotationById', () => {
    it('should GET a quotation by ID', () => {
      const id = '1';

      service.getQuotationById(id).subscribe((result) => {
        expect(result).toEqual(mockQuotation);
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('GET');
      req.flush(mockQuotation);
    });
  });

  describe('updateQuotation', () => {
    it('should PUT an updated quotation', () => {
      const id = '1';
      const updatedQuotation = { ...mockQuotation, quantity: 150 };

      service.updateQuotation(id, updatedQuotation).subscribe((result) => {
        expect(result.quantity).toBe(150);
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('PUT');
      req.flush(updatedQuotation);
    });
  });

  describe('deleteQuotation', () => {
    it('should DELETE a quotation by ID', () => {
      const id = '1';

      service.deleteQuotation(id).subscribe(() => {
        expect(true).toBe(true);
      });

      const req = httpMock.expectOne(`${apiUrl}/${id}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });
  });

  describe('error handling', () => {
    it('should handle errors gracefully', () => {
      service.createQuotation(mockQuotation).subscribe(
        () => fail('should have failed'),
        (error) => {
          expect(error).toBeTruthy();
        },
      );

      const req = httpMock.expectOne(apiUrl);
      req.error(new ErrorEvent('Network error'));
    });
  });
});
