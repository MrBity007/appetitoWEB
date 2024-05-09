import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deliveryTimePipe'
})
export class DeliveryTimePipePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';

    const currentTime = new Date(value);

    currentTime.setMinutes(currentTime.getMinutes() + 30);

    const deliveryTimeString = currentTime.toLocaleTimeString('hu-HU', {
      hour: '2-digit',
      minute: '2-digit'
    });

    return deliveryTimeString;
  }

}
