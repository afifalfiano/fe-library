import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { LibraryService, URLTYPE } from 'src/app/shared/library.service';

export interface Publisher {
  position: number;
  id: number;
  nama: string;
  buku?: any;
  tgl_input: any;
  user_input: string;
}
@Component({
  selector: 'app-admin-publisher',
  templateUrl: './admin-publisher.component.html',
  styleUrls: ['./admin-publisher.component.scss']
})
export class AdminPublisherComponent implements OnInit {
  displayedColumns: string[] = ['position', 'nama', 'buku', 'tgl_input', 'user_input', 'aksi'];
  dataPublisher: Publisher[] = [];
  dataSource = new MatTableDataSource<Publisher>();
  showTable = false;
  constructor(
    private librarySvc: LibraryService,
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
    this.librarySvc.listWithGuard(URLTYPE.PUBLISHER, params).subscribe((response) => {
      response.data.map((item, index) => {
        this.dataPublisher.push({
          position: index + 1,
          id: item.id,
          nama: item.nama,
          buku: null,
          tgl_input: new Date(`${item.tgl_input}`).toLocaleDateString('id-ID', {year: 'numeric', month: 'long', day: 'numeric'} ),
          user_input: item.user_input
        });
      })
      console.log(this.dataPublisher);
      this.dataSource.data = this.dataPublisher;
      this.showTable = true;
    });
  }

  onBtnClickAddNewPublisher() {
    
  }
} 
