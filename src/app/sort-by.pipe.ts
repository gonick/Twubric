import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortBy',
  pure:false
})
export class SortByPipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    array.sort((a: any, b: any) => {
      if (a.twubric.args < b.twubric.args) {
        return -1;
      } else if (a.twubric.args > b.twubric.args) {
        return 1;
      } else {
        return 0;
      }
    });
    return array;
  }

}
