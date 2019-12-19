import { ɵLocaleDataIndex } from '@angular/core';
import { Adventure } from './adventure';

export class AdventureCalendar {

  id: number;
  adventure: Adventure;
  startDate: Date;
  endDate: Date;

  constructor(adventure?: Adventure, startDate?: Date, endDate?: Date) {
    this.adventure = adventure;
    this.startDate = startDate;
    this.endDate = endDate;
  }
}
