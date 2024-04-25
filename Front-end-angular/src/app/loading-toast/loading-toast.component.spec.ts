import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingToastComponent } from './loading-toast.component';

describe('SnackBarComponent', () => {
  let component: LoadingToastComponent;
  let fixture: ComponentFixture<LoadingToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingToastComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadingToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
