import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryService, URLTYPE } from 'src/app/shared/library.service';
import { MemberViewComponent } from './member-view/member-view.component';

export interface Member {
  position: number;
  id: number;
  email: string;
  nama: string;
  jenis_kelamin: any;
  tgl_lahir: any;
  alamat: string;
  kontak: number;
  roles: string;
  tgl_input: any;
  user_input: string;
  tgl_update?: any;
  user_update?: string;
}
@Component({
  selector: 'app-admin-member',
  templateUrl: './admin-member.component.html',
  styleUrls: ['./admin-member.component.scss']
})
export class AdminMemberComponent implements OnInit {
  displayedColumns: string[] = ['position', 'email', 'nama', 'jenis_kelamin', 'tgl_lahir', 'alamat', 'kontak', 'roles', 'tgl_input', 'user_input', 'aksi'];
  dataMember: Member[] = [];
  dataSource = new MatTableDataSource<Member>();
  showTable = false;
  constructor(
    private librarySvc: LibraryService,
    public dialog: MatDialog
  ) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.doGetData();
  }

  doGetData() {
    const data = JSON.parse(localStorage.getItem('user'));
    const params = `?email=${data.email}`;
    this.librarySvc.listWithGuard(URLTYPE.MEMBER, params).subscribe((response) => {
      response.data.map((item, index) => {
        this.dataMember.push({
          position: index + 1,
          id: item.id,
          email: item.email,
          nama: item.nama,
          jenis_kelamin: item.jenis_kelamin,
          tgl_lahir: new Date(`${item.tgl_lahir}`).toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric'} ),
          alamat: item.alamat,
          kontak: item.kontak,
          roles: item.roles,
          tgl_input: new Date(`${item.tgl_input}`).toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric'} ),
          user_input: item.user_input
        });
      })
      console.log(this.dataMember);
      this.dataSource.data = this.dataMember;
      this.showTable = true;
    });
  }

  onBtnClickAddNewUser() {

  }

  onBtnViewDetail($event): void {
    const dialogRef = this.dialog.open(MemberViewComponent, {
      width: '450px',
      data: $event,
      position: {
        top: '100px'
      },
      autoFocus: true,
    });

    dialogRef.afterClosed().subscribe(response => {
      console.log('The dialog was closed');
      console.log(response);
    });
  }

}
