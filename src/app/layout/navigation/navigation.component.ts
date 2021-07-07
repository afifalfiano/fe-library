import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LibraryService, URLTYPE } from 'src/app/shared/library.service';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private librarySvc: LibraryService, private location: Location) {}

  onLogout() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const body = new HttpParams({
      fromObject: {email: user['email']}
    });
    this.librarySvc.logout(URLTYPE.LOGOUT, body).subscribe(response => {
      console.log(response);
      localStorage.removeItem('user');
      localStorage.removeItem('access_token');
      this.location.back();
    })
  }

}
