import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private router: Router, private authService: AuthService) {

  }
  logout() {
    this.authService.logout().pipe(take(1)).subscribe(res=>{
      this.router.navigate(['login']);
    });
  }

}
