import { Routes } from '@angular/router';
import { HomeComponentComponent } from './home-component/home-component.component';

export const routes: Routes = [
    { path: '', redirectTo: '/spreadsheet', pathMatch: 'full' }, // Redireciona para o componente
    { path: 'spreadsheet', component: HomeComponentComponent}
];
