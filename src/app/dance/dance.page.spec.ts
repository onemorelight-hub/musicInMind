import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DancePage } from './dance.page';

describe('DancePage', () => {
  let component: DancePage;
  let fixture: ComponentFixture<DancePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DancePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
