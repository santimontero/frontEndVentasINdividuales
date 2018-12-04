import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiariosDependientesComponent } from './beneficiarios-dependientes.component';

describe('BeneficiariosDependientesComponent', () => {
  let component: BeneficiariosDependientesComponent;
  let fixture: ComponentFixture<BeneficiariosDependientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiariosDependientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiariosDependientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
