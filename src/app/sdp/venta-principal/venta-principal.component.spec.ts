import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaPrincipalComponent } from './venta-principal.component';

describe('VentaPrincipalComponent', () => {
  let component: VentaPrincipalComponent;
  let fixture: ComponentFixture<VentaPrincipalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaPrincipalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaPrincipalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
