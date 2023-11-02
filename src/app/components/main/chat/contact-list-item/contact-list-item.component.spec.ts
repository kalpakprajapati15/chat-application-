import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactListItemComponent } from './contact-list-item.component';

describe('ContactListItemComponent', () => {
  let component: ContactListItemComponent;
  let fixture: ComponentFixture<ContactListItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListItemComponent]
    });
    fixture = TestBed.createComponent(ContactListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
