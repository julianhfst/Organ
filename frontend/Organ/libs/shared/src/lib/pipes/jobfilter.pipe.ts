import { Pipe, PipeTransform } from '@angular/core';
import { IJob, JobStatus } from 'libs/models/src';

@Pipe({
  name: 'jobfilter',
})
export class JobfilterPipe implements PipeTransform {
  transform(items: IJob[], filter: JobStatus): IJob[] {
    if (!items) return items;
    return items.filter((item) => item.status == filter);
  }
}
