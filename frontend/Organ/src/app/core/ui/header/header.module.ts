import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ComponentsModule } from 'components';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, AppRoutingModule, ComponentsModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
