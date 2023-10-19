import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedComponent } from './add-feed.component';

describe('AddFeedComponent', () => {
  let component: AddFeedComponent;
  let fixture: ComponentFixture<AddFeedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFeedComponent]
    });
    fixture = TestBed.createComponent(AddFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
