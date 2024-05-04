import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { JobDetailsData } from '../../models/job.models';

@Component({
  selector: 'job-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  constructor(private jobService: JobService,
    private router: Router){}
  http = inject(HttpClient)
  jobDetails!: JobDetailsData;

  backClick() {
  this.router.navigate(['/job-list']);
}

  ngOnInit(): void {
    const ListId = this.jobService.selectedJob.id;
    this.getJobDetails(ListId);
  }

    getJobDetails(id: number) {
    const url = `${'/jobs'}/${id}`;
     this.http.get<JobDetailsData>(url).subscribe((respdata => {
      this.jobDetails = respdata;
    }))
  }

}
