import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SairPage } from './sair.page';

describe('SairPage', () => {
  let component: SairPage;
  let fixture: ComponentFixture<SairPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SairPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
