import { Component } from '@angular/core';
/*
import { NgForm } from '@angular/forms';
*/

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

/*
import { UserOptions } from '../../interfaces/user-options';
import { SignupPage } from '../signup/signup';
*/
import { TabsPage } from '../tabs-page/tabs-page';


/////
import { LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
/*
import { HomePage } from '../home/home';
*/
import { EmailValidator } from '../../validators/email';


let _this;

@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  /*
  login: UserOptions = { username: '', password: '' };
  submitted = false;
  */
 
  loginForm: FormGroup;
  loading: Loading;

  constructor(
    public navCtrl: NavController,
          public userData: UserData,
    public authData: AuthProvider,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {


    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid]),
      ],
      password: [
        '',
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    });

  }

  loginUser(){
    _this = this;
    if (!_this.loginForm.valid){
      console.log(_this.loginForm.value);
    } else {
      _this.authData.loginUser(_this.loginForm.value.email, _this.loginForm.value.password)
      .then( function() {
        console.log('ok. You are logged in.' );
        _this.navCtrl.setRoot(TabsPage);
      }, error => {
        _this.loading.dismiss().then( () => {
          let alert = _this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      _this.loading = _this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      _this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  createAccount(){
    this.navCtrl.push('SignupPage');
  }



}
