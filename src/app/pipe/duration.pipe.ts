import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string {
    if(value == null) return null;
    if(value<60){
      
        return Math.round(value*100)/100+" sec"
    }else{
        var min= value/60;
        return Math.round(min*100)/100+" min"
    }
}
}
