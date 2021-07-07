import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthorBookComponent } from './admin-author-book.component';

describe('AdminAuthorBookComponent', () => {
  let component: AdminAuthorBookComponent;
  let fixture: ComponentFixture<AdminAuthorBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAuthorBookComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAuthorBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
