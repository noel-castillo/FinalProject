import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizee'
})
export class CapitalizeePipe implements PipeTransform {

  transform(firstName: string): string {
      const firstLtr = firstName.substring(0, 1);
      const rest = firstName.substring(1, firstName.length - 1);

      return firstLtr + rest;
    }
  }


