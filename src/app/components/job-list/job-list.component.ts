import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';
import { JobData } from '../../models/job.models';
import { CookieService } from 'ngx-cookie-service';

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

  constructor(private jobService: JobService, private router: Router, private cookieService: CookieService){  
   
  }

  ngOnInit(): void{    
    if (this.jobService.selectedJobList.length != 0) {
      this.jobList = this.jobService.duplicateJobList;
      this.jobService.preferredJob.forEach(job=>{
        for (let i = 0; i < this.jobList.length; i++) {
          const jobData = this.jobList[i];
          if(job.id==jobData.id){
            this.jobList[i].isSelectedJob=job.isSelectedJob;
          }
        }
      });
    } else {
      this.getJobList();
    }
  }

  getJobList() {
    this.jobService.featch().subscribe(data => {
      this.jobService.preferredJob.forEach(job=>{
        for (let i = 0; i < data.length; i++) {
          const jobData = data[i];
          if(job.id==jobData.id){
            data[i].isSelectedJob=job.isSelectedJob;
          }
        }
      });
      this.jobList = data;
      this.jobService.duplicateJobList = this.jobList;
    })
  }

  preferredMarked(job: JobData) {
      const item = this.jobList.filter(x => x.id === job.id);
      if(item[0].isSelectedJob){
        item[0].isSelectedJob = false;
      } else {
        item[0].isSelectedJob = true;
      }
      this.onSelectJob(job);
  }

  onSelectJob(job: JobData) {
    this.jobService.selectedJobList = this.jobService.preferredJob;
    if(this.jobService.selectedJobList.length === 0) {
      this.jobService.selectedJobList.push(job);
      this.jobService.duplicateList = this.jobService.selectedJobList;
      //this.jobService.preferredJob = this.jobService.selectedJobList;
      const set = new Set<JobData>();
      this.jobService.selectedJobList.forEach(job=>{
        set.add(job);
        this.jobService.preferredJob.push(job);
      });
      this.jobService.preferredJob.forEach(job=>{
        set.add(job);
      });
      this.jobService.preferredJob=[...set];
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
        //this.jobService.preferredJob = this.jobService.selectedJobList;
        const set = new Set<JobData>();
        this.jobService.selectedJobList.forEach(job=>{
          set.add(job);
          this.jobService.preferredJob.push(job);
        });
        this.jobService.preferredJob.forEach(job=>{
          set.add(job);
        });
        this.jobService.preferredJob=[...set];
      }
      this.cookieService.set('preferredJob', JSON.stringify(this.jobService.preferredJob));
  }


  getData(selectedJob: JobData) {
    this.jobService.selectedJob = selectedJob;
    this.router.navigate(['/job-details']);
  }

}
