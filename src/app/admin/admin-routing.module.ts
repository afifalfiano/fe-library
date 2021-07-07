import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminAuthorBookComponent } from './admin-author-book/admin-author-book.component';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: AdminDashboardComponent, },
  { path: 'book', component: AdminBookComponent, },
  { path: 'author-book', component: AdminAuthorBookComponent, },
  { path: 'publisher', component: AdminPublisherComponent, },
  { path: 'member', component: AdminMemberComponent, },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
