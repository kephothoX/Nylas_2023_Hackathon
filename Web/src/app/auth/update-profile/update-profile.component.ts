import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss']
})
export class UpdateProfileComponent implements OnInit{

  User?: User;

  constructor (
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._authService.GetUserById(window.sessionStorage.getItem('active_user_id')).subscribe((response: any) => {
      console.log(response.response);

      this.User = response.response;
    })
  }


  updateProfileForm = this._formBuilder.group({
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    phone_number: ['', Validators.required],
    bio: ['', Validators.required],
    image_url: ['', Validators.required],
    username: ['', Validators.required],
    whatsapp_number: [''],
    x_link: [''],
    facebook_link: [''],
    instagram_link: [''],
    youtube_link: ['']

  })

  onSubmit() {
    const formValues = this.updateProfileForm.value;

    const data = {
      id : window.sessionStorage.getItem('active_user_id'),
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      phone_number: formValues.phone_number,
      bio: formValues.bio,
      image_url: formValues.image_url,
      whatsapp_number: formValues.whatsapp_number? formValues.whatsapp_number : ' ',
      username: formValues.username,
      x_link: formValues.x_link? formValues.x_link : '',
      facebook_link: formValues.facebook_link? formValues.facebook_link: ' ',
      instagram_link: formValues.instagram_link? formValues.instagram_link : ' ',
      youtube_link: formValues.youtube_link? formValues.youtube_link : ' '
    }

    console.log(data);

    this._authService.updateUserProfile(data).subscribe((response: any) => {
      console.log(response);
    });
  }


  resetForm() {
    this.updateProfileForm.reset();
  }

}
