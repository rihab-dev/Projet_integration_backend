import { Routes } from '@angular/router';
import { LocationFormComponent } from './components/location-form/location-form.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { EditLocationComponent } from './edit-location/edit-location.component';

export const routes: Routes = [

    { path: 'add', component: LocationFormComponent },
    { path: 'list', component: LocationListComponent },
    { path: '', redirectTo: '/list', pathMatch: 'full' },
    {path: 'edit-location/:id', component: EditLocationComponent }
];

