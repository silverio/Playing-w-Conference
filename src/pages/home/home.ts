import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  itemValue = '';
  items: Observable<any[]>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public aFModule: AngularFireModule,
    public db: AngularFireDatabase
  ) {
    this.items = db.list('list').valueChanges();
  }


  onSubmit() {
    this.db.list('/items/user45453443543b').push({ content : '34ds'});
    this.itemValue = '';
  }

}
