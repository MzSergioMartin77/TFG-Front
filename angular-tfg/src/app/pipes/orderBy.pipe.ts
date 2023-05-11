import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], field: string, direction: string): any[] {
    if (!value || !value.length) return [];
    if (!field || !direction) return value;
    let sortedArray = value.sort((a: any, b: any) => {
      if (a[field] < b[field]) {
        return direction === 'asc' ? -1 : 1;
      } else if (a[field] > b[field]) {
        return direction === 'asc' ? 1 : -1;
      } else {
        return 0;
      }
    });
    return sortedArray;
  }

}