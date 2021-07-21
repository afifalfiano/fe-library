import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LibraryService, URLTYPE } from 'src/app/shared/library.service';
import { Member } from '../admin-member.component';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  formMember: FormGroup;
  jenisKelamin = [
    {
      label: 'Laki-Laki',
      value: 'Male',
    },
    {
      label: 'Perempuan',
      value: 'Female',
    },
    {
      label: 'Lain-Lain',
      value: 'Other',
    },
  ];
  roles = [
    {
      value: 'member',
      label: 'member',
    },
    {
      value: 'admin',
      label: 'admin',
    },
    {
      value: 'guest',
      label: 'guest',
    },
  ];
  hide = true;
  dataMember: Member;

  constructor(
    private formBuilder: FormBuilder,
    private librarySvc: LibraryService,
    private router: Router
  ) {
    if (this.router.url === '/admin/member/create') {
      this.dataMember = null;
    } else {
      this.dataMember = this.router.getCurrentNavigation().extras.state.data;
    }
  }

  ngOnInit(): void {
    console.log(this.dataMember, 'ds');
    this.doInitForm();
  }

  doInitForm() {
    if (this.dataMember === null) {
    this.formMember = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      nama: ['', [Validators.required]],
      jenis_kelamin: ['', [Validators.required]],
      tgl_lahir: ['', [Validators.required]],
      alamat: ['', [Validators.required]],
      kontak: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      roles: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
    } else {
      this.formMember = this.formBuilder.group({
        email: [this.dataMember.email, [Validators.required, Validators.email]],
        nama: [this.dataMember.nama, [Validators.required]],
        jenis_kelamin: [this.dataMember.jenis_kelamin, [Validators.required]],
        tgl_lahir: [new Date(this.dataMember.tgl_lahir), [Validators.required]],
        alamat: [this.dataMember.alamat, [Validators.required]],
        kontak: [this.dataMember.kontak, [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        roles: [this.dataMember.roles, [Validators.required]],
        password: ['', [Validators.required]]
      });
    }
  }

  onSubmit() {
    const data = JSON.parse(localStorage.getItem('user'));
    const params = `?email=${data.email}`;
    const body = new HttpParams({
      fromObject: {...this.formMember.value, tgl_lahir: new Date(this.formMember.value.tgl_lahir).toISOString().slice(0, 10)
      }
    });
    if(this.dataMember === null) {
      this.doSave(body, params);
    } else {
      this.doUpdate(body, params);
    }
  }

  doUpdate(body, params) {
    const param = `/${this.dataMember.id}`;
    this.librarySvc.update(URLTYPE.MEMBER, body, param).subscribe((response) => {
      console.log(response);
    });
  }

  doSave(body, params) {
    this.librarySvc.create(URLTYPE.MEMBER, body, params).subscribe((response) => {
      console.log(response);
    });
  }

}
