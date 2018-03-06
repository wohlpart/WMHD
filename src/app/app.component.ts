import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeAudio } from '@ionic-native/native-audio';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = HelloIonicPage;
  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public nativeAudio: NativeAudio
    ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Hello Ionic', component: HelloIonicPage },
      { title: 'My First List', component: ListPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.preloadComp("http://icecast.wmhdradio.org:8000/wmhd",1.0,1,0, 
      (onSuccess) => {
        //do nothing
       },
      (onError) => {
        alert("Error in preload:" + onError);
       });



      this.statusBar.styleDefault();
      this.splashScreen.hide();

      //this.media.create("http://icecast.wmhdradio.org:8000/wmhd").play();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }

  preloadComp(assetPath, volume, voices, delay, success, fail) {
    var res = new Audio();
    res.addEventListener('canplaythrough', success, false);
    res.onerror = fail;
    res.setAttribute('src', assetPath);
    res.load();
    res.volume = volume;
    res.play();
};

}
