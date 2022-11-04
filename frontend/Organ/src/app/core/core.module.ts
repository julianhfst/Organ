import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesModule } from './pages/pages.module';
import { HeaderModule } from './ui/header/header.module';
import { FooterModule } from './ui/footer/footer.module';

@NgModule({
  declarations: [],
  imports: [],
  exports: [HeaderModule, FooterModule, PagesModule],
})
export class CoreModule {}
