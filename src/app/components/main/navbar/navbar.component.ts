import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState, Logout } from 'src/app/states/auth.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

  @Select(AuthState.loginName)
  loginName$: Observable<string>

  constructor(private store: Store) {

  }

  logout() {
    this.store.dispatch(new Logout());
  }

  getLoginNameInitial(loginName: string) {
    return loginName[0];
  }

}
