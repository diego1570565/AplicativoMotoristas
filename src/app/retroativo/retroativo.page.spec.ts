import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RetroativoPage } from './retroativo.page';

describe('RetroativoPage', () => {
  let component: RetroativoPage;
  let fixture: ComponentFixture<RetroativoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RetroativoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
