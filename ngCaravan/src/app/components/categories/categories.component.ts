import { Categories } from './../../models/categories';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {


  // F I E L D S

  title = 'ngCategories';

  categories: Categories[] = [];


  selected: Categories = null;

  newCategory: Categories = new Categories();

  editCategory: Categories = null;

  urlId = 0;

  // C O N S T R U C T O R

  // tslint:disable-next-line: max-line-length
  constructor(private auth: AuthService, private categoriesSvc: CategoriesService, private currentRoute: ActivatedRoute, private router: Router) { }

  // M E T H O D S

  ngOnInit() {

    // grabs the array of todos from the service & adds it to this component
    // if (!this.selected && this.currentRoute.snapshot.paramMap.get('id')) {
    console.log(this.currentRoute.snapshot.paramMap.get('id'));
    this.categoriesSvc.index().subscribe(
      data => {
        this.categories = data;
      },
      err => console.error('ngOnInit error in Categories Component')
    );
  }

  reload() {
    this.categoriesSvc.index().subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.categories = aGoodThingHappened;
      },
      (didntWork) => {
        console.error('Categories Component reload() DID NOT WORK');
      }
    );
  }

  getNumOfCategories() {
    return this.categories.length;
  }

  countCategories(): number {
    return this.categories.length;
  }

  displayCategory(category) {
    this.selected = category;
  }

  displayTable() {
    this.selected = null;
  }

  addCategory() {
    this.categoriesSvc.create(this.newCategory).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.newCategory = new Categories();
        this.reload();
      },
      (didntWork) => {
        console.error('Categories Component addCategory() DID NOT WORK');
        this.reload();
      }
    );
  }

  setEditCategory(category: Categories) {
    this.editCategory = Object.assign({}, this.selected);
  }

  updateCategory(category: Categories) {
    this.categoriesSvc.updateCategory(category).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
        this.editCategory = null;
        this.selected = null;
      },
      (didntWork) => {
        console.error('Categories Component updateCategory(category) DID NOT WORK');
        this.reload();
      }

    );
  }

  deleteCategory(id) {
    this.categoriesSvc.deleteCategory(id).subscribe(
      (aGoodThingHappened) => {
        console.log(aGoodThingHappened);
        this.reload();
      },
      (didntWork) => {
        console.error('Categories Component deleteCategories(id) DID NOT WORK');
        this.reload();
      }

    );
  }

}
