import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(allTransaction: any[], searchTerm: string, property: string): any[] {
    const result: any = []
    if (!allTransaction || searchTerm == "" || property == "") {
      return allTransaction
    }
    allTransaction.forEach((item: any) => {
      if (item[property].trim().toLowerCase().includes(searchTerm.trim().toLowerCase())
      ) {
        result.push(item)
      }
    })
    return result;
  }

}
