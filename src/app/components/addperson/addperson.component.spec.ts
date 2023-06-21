import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpersonComponent } from './addperson.component';

describe('AddpersonComponent', () => {
  let component: AddpersonComponent;
  let fixture: ComponentFixture<AddpersonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddpersonComponent]
    });
    fixture = TestBed.createComponent(AddpersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
