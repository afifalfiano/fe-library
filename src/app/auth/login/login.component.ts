import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibraryService, URLTYPE } from 'src/app/shared/library.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  hide = true;
  constructor(
    private formBuilder: FormBuilder,
    private librarySvc: LibraryService
  ) { }

  ngOnInit(): void {
    this.doInitForm();
  }

  doInitForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  getErrorMessage() {
    if (this.form.controls['email'].hasError('required')) {
      return 'You must enter a value';
    }
    

    return this.form.controls['email'].hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    const urlEncoded = new HttpParams({
      fromObject: {email: this.form.value.email, password: this.form.value.password}
    });
    this.doLogin(urlEncoded.toString());
  }

  doLogin(body: any) {
    this.librarySvc.login(URLTYPE.LOGIN, body).subscribe((response) => {
      console.log(response);
      if(response['access_token'] !== null) {
        localStorage.setItem('access_token', JSON.stringify(response['access_token']));
        localStorage.setItem('user', JSON.stringify(response['user']));
      } else {
        console.log('Check your credentials');
      }
    })
  }

}
