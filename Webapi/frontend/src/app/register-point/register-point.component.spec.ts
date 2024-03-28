import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPointComponent } from './register-point.component';

describe('RegisterPointComponent', () => {
  let component: RegisterPointComponent;
  let fixture: ComponentFixture<RegisterPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
