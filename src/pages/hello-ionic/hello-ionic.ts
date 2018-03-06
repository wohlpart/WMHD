import { Component } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio';


@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(private nativeAudio: NativeAudio) {
  }

  startAudio() {    
    this.nativeAudio.preloadComplex("stream","http://icecast.wmhdradio.org:8000/wmhd",1.0,1,0).then((onSuccess) => {
       //do nothing
      }, (onError) => {
      alert("Error in preload:" + onError);
      })
    this.nativeAudio.play("stream");
  }

  stopAudio() {
  console.log("ayayayya");
    this.nativeAudio.stop("stream");
  }

}
