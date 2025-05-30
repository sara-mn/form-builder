import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldListComponent } from './field-list.component';

describe('FieldListComponent', () => {
  let component: FieldListComponent;
  let fixture: ComponentFixture<FieldListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
