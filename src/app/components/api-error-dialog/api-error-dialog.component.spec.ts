import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiErrorDialogComponent } from './api-error-dialog.component';

describe('ApiErrorDialogComponent', () => {
  let component: ApiErrorDialogComponent;
  let fixture: ComponentFixture<ApiErrorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApiErrorDialogComponent]
    });
    fixture = TestBed.createComponent(ApiErrorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
