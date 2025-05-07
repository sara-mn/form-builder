import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldEntryComponent } from './field-entry.component';

describe('FieldEntryComponent', () => {
  let component: FieldEntryComponent;
  let fixture: ComponentFixture<FieldEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
