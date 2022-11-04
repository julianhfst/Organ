import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationGuard } from 'guards';
import { AboutComponent } from './core/pages/about/about.component';
import { HomeComponent } from './core/pages/home/home.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {
    path: 'tasks',
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./core/pages/tasks/tasks.module').then((m) => m.TasksModule),
  },
  {
    path: 'notes',
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./core/pages/notes/notes.module').then((m) => m.NotesModule),
  },
  {
    path: 'boards',
    canLoad: [AuthenticationGuard],
    canActivate: [AuthenticationGuard],
    loadChildren: () =>
      import('./core/pages/boards/boards.module').then((m) => m.BoardsModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/pages/auth/auth.module').then((m) => m.AuthModule),
  },

  { path: '**', component: NotFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
