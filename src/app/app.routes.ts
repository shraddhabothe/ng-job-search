import { Routes } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { JobFavoriteComponent } from './components/favorite-job/job-favorite.component';


export const routes: Routes = [
    {path: "job-list", component: JobListComponent},
    {path: "job-favorite", component: JobFavoriteComponent},
    {path: "job-details", component: JobDetailsComponent},
    {path: "", component: JobListComponent},
];
