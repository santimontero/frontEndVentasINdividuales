import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteDomicilioComponent } from './cliente-domicilio.component';

describe('ClienteDomicilioComponent', () => {
  let component: ClienteDomicilioComponent;
  let fixture: ComponentFixture<ClienteDomicilioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteDomicilioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteDomicilioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
