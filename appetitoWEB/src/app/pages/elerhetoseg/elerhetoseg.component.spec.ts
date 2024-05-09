import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElerhetosegComponent } from './elerhetoseg.component';

describe('ElerhetosegComponent', () => {
  let component: ElerhetosegComponent;
  let fixture: ComponentFixture<ElerhetosegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ElerhetosegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElerhetosegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
