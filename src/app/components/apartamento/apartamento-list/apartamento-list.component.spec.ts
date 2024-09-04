import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartamentoListComponent } from './apartamento-list.component';

describe('ApartamentoListComponent', () => {
  let component: ApartamentoListComponent;
  let fixture: ComponentFixture<ApartamentoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApartamentoListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApartamentoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
