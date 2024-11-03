import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListsComponent } from './edit-lists.component';

describe('EditListsComponent', () => {
  let component: EditListsComponent;
  let fixture: ComponentFixture<EditListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditListsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
