import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture/ngx';
import { Storage } from '@ionic/storage';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';
const MEDIA_FILES_KEY = 'mediaFiles';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page {
  mediaFiles = [];
  @ViewChild('myvideo') myVideo: any;
  // tslint:disable-next-line:max-line-length
  constructor(public navCtrl: NavController, private storage: Storage,  private file: File, private mediaCapture: MediaCapture,  private media: Media) {}

  ionViewDidLoad() {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      this.mediaFiles = JSON.parse(res) || [];
    });
  }

  captureAudio() {
    this.mediaCapture.captureAudio().then(res => {
      this.storeMediaFiles(res);
    }, (err: CaptureError) => console.error(err));
  }

  // play(myFile) {
  //   if (myFile.name.indexOf('.wav') > -1) {
  //     const audioFile: MediaObject = this.media.create(myFile.localURL);
  //     audioFile.play();
  //   }
  // }

  storeMediaFiles(files) {
    this.storage.get(MEDIA_FILES_KEY).then(res => {
      if (res) {
        let arr = JSON.parse(res);
        arr = arr.concat(files);
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(arr));
      } else {
        this.storage.set(MEDIA_FILES_KEY, JSON.stringify(files));
      }
      this.mediaFiles = this.mediaFiles.concat(files);
    });
  }

}

