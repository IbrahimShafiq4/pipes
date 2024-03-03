import { HostListener, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  serviceValue: string = '';
  serviceLimit: number = 0;
  fullValue: string = ''; // Variable to store the full value

  transform(value: any, limit: number): string {
    this.serviceValue = value;
    this.serviceLimit = limit;
    this.fullValue = value; // Store the full value when transforming

    if (this.serviceValue.length > this.serviceLimit) {
      return `${value.substr(0, this.serviceLimit)}...`
    }

    return value;
  }
}
