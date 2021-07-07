import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedMaterialModule } from '../shared/sharedmaterial.module';
import { AdminBookComponent } from './admin-book/admin-book.component';
import { AdminPublisherComponent } from './admin-publisher/admin-publisher.component';
import { AdminAuthorBookComponent } from './admin-author-book/admin-author-book.component';
import { AdminMemberComponent } from './admin-member/admin-member.component';


@NgModule({
  declarations: [AdminComponent, AdminDashboardComponent, AdminBookComponent, AdminPublisherComponent, AdminAuthorBookComponent, AdminMemberComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedMaterialModule
  ]
})
export class AdminModule { }
