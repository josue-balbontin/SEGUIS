import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoequiposComponent } from './grupoequipos.component';

describe('GrupoequiposComponent', () => {
  let component: GrupoequiposComponent;
  let fixture: ComponentFixture<GrupoequiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GrupoequiposComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrupoequiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
