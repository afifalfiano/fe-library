import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthorBookComponent } from './admin-author-book/admin-author-book.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';
import { MemberFormComponent } from './admin-member/member-form/member-form.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent, },
  { path: 'book', component: AdminBookComponent, },
  { path: 'author-book', component: AdminAuthorBookComponent, },
  { path: 'publisher', component: AdminPublisherComponent, },
  { path: 'member', component: AdminMemberComponent},
  { path: 'member/create', component: MemberFormComponent},
  { path: 'member/update', component: MemberFormComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
