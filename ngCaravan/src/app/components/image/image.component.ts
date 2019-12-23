import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { Image } from './../../models/image';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {


  // F I E L D S

  title = 'ngImages';

  images: Image[] = [];

  selected: Image = null;

  newImage: Image = new Image();

  editImage: Image = null;

  urlId = 0;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private imageSvc: ImageService, private currentRoute: ActivatedRoute, private router: Router) { }

  // M E T H O D S

  ngOnInit() {

    if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
      console.log('in oninit if statement');
      return this.imageSvc
        .show(this.currentRoute.snapshot.paramMap.get('id'))
        .subscribe(
          data => {
            this.selected = data;
          },
          error => {
            console.error(error);
            this.router.navigateByUrl('not-found');
          }
        );
    }
    this.imageSvc.index().subscribe(
      data => {
        this.images = data;
      },
      err => console.error('ngOnInit error in Image Component')
    );
  }

  reload() {
    this.imageSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.images = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Image Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfImages() {
    return this.images.length;
  }

  countImages(): number {
    return this.images.length;
  }

  displayImage(image) {
    this.selected = image;
  }

  displayTable() {
    this.selected = null;
  }

  addImage() {
    this.imageSvc.createImage(this.newImage).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newImage = new Image();
        this.reload();
      },
      (didntWork) => {
        console.error('Image Component addImage() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditImage(image: Image) {
    this.editImage = Object.assign({}, this.selected);
  }

  updateImage(image: Image) {
    this.imageSvc.updateImage(image).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editImage = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Image Component updateImage(image) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteImage(id) {
    this.imageSvc.deleteImage(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Image Component deleteImage(id) DID NOT WORK');
        this.reload();
      }

    );
  }

}
