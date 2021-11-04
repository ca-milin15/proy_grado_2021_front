import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AutenticacionFinTransacPage } from './autenticacion-fin-transac.page';

describe('AutenticacionFinTransacPage', () => {
  let component: AutenticacionFinTransacPage;
  let fixture: ComponentFixture<AutenticacionFinTransacPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AutenticacionFinTransacPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AutenticacionFinTransacPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
