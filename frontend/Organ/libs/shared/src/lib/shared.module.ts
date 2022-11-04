import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { JobfilterPipe } from './pipes';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingSpinnerComponent, JobfilterPipe],
  exports: [LoadingSpinnerComponent, JobfilterPipe],
})
export class SharedModule {}
