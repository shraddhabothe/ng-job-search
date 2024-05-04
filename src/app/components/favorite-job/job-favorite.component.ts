import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { JobData } from '../../models/job.models';


@Component({
  selector: 'job-favorite',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './job-favorite.component.html',
  styleUrl: './job-favorite.component.css'
})
export class JobFavoriteComponent implements OnInit {
  noPreferredJob: string | undefined;
  isPreferred: boolean = false;

  constructor(private jobService: JobService,
    private router: Router){}
    preferredJobList: JobData[] = [];

 ngOnInit(): void {
    if(this.jobService.preferredJob.length !== 0) {
      this.isPreferred = true;
      this.preferredJobList = this.jobService.preferredJob;
    } else {
      this.isPreferred = false;
      this.noPreferredJob = 'No favorite selected'
    }
  }

  getDetails(selectedJob: JobData) {
    this.jobService.selectedJob = selectedJob;
    this.router.navigate(['/job-details']);
  }
}
