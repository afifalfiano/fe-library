import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LibraryService, URLTYPE } from 'src/app/shared/library.service';
import { HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';

export interface User {
  nama: string;
  email: string;
  roles: string;
}
@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  user: User;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private librarySvc: LibraryService, private location: Location) {}
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    console.log(this.user);
  }

  onLogout() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    const body = new HttpParams({
      fromObject: {email: user['email']}
    });
    this.librarySvc.logout(URLTYPE.LOGOUT, body).subscribe(response => {
      console.log(response);
    });
    localStorage.clear();
    this.location.back();
  }



}
