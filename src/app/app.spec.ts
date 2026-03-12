import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { AppModule } from './app.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './core/services/user.service';
import { of } from 'rxjs';

describe('App', () => {
  beforeEach(async () => {
    const userServiceMock = {
      balance$: of(500000),
      user$: of({ id: 'user-001', name: 'Test', balance: 500000, subscriptions: [] }),
      subscriptions$: of([]),
      getBalance: () => 500000,
    };

    await TestBed.configureTestingModule({
      imports: [AppModule, NoopAnimationsModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the header', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});
