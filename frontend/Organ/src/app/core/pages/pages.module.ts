import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [AboutComponent, HomeComponent, NotFoundComponent],
  imports: [CommonModule],
  exports: [AboutComponent, HomeComponent, NotFoundComponent],
})
export class PagesModule {}
