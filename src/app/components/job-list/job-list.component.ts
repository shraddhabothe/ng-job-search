import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { JobData } from '../../models/job.models';


@Component({
  selector: 'job-list',
  standalone: true,
  imports: [CommonModule,],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})

export class JobListComponent implements OnInit {
  http = inject(HttpClient)
  jobList: JobData[] = [];
  isSelected: boolean = false;
  error: string = "data not loading";
  constructor(private jobService: JobService, private router: Router){}

  ngOnInit(): void{
    if (this.jobService.selectedJobList.length != 0) {
      this.jobList = this.jobService.duplicateJobList;
    } else {
      this.getJobList();
    }
  }

  getJobList() {
    this.jobService.featch().subscribe(data => {
      this.jobList = data;
      this.jobService.duplicateJobList = this.jobList;
    })
    }

    PreferredMarked(job: JobData) {
      const item = this.jobList.filter(x => x.id === job.id);
      if(item[0].isSelectedJob){
        item[0].isSelectedJob = false;
      } else {
        item[0].isSelectedJob = true;
      }
      this.onSelectJob(job);
    }

  onSelectJob(job: JobData) {
    if(this.jobService.selectedJobList.length === 0) {
      this.jobService.selectedJobList.push(job);
      this.jobService.duplicateList = this.jobService.selectedJobList;
      this.jobService.preferredJob = this.jobService.selectedJobList;
    } 
    else {
      for(let i = 0; i < this.jobService.selectedJobList.length ; i++){
          if(this.jobService.selectedJobList.find(x => x.id === job.id) === undefined) {
            this.jobService.duplicateList.push(job);
            break;
          } else {
            this.jobService.duplicateList.forEach((item, index) => {
              if(item.jobId === job.jobId) {
                this.jobService.duplicateList.splice(index, 1);
              }
            });
            break;
          }
        }
        this.jobService.selectedJobList = this.jobService.duplicateList;
        this.jobService.preferredJob = this.jobService.selectedJobList;
      }
  }


  getData(selectedJob: JobData) {
    this.jobService.selectedJob = selectedJob;
    this.router.navigate(['/job-details']);
  }

}
