import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { JobListComponent } from './components/job-list/job-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
       JobListComponent
      ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-job-search';
  constructor(private router: Router){}

  tabNavigate(tabname: string){
    this.router.navigate([`/${tabname}`]);
  }
}
