import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { JobData } from '../models/job.models';

@Injectable({
  providedIn: 'root'
})

export class JobService {
  selectedJob!: JobData;
  preferredJob: JobData[] = [];
  duplicateJobList: JobData[] = [];
  selectedJobList: JobData[] = [];
  duplicateList : JobData[] = [];

  constructor(private http: HttpClient,private cookieService: CookieService) {
    const preferredJobData=this.cookieService.get('preferredJob');
    if(null!=preferredJobData && ""!=preferredJobData){
      const preferredData = JSON.parse(preferredJobData);
      this.preferredJob =  preferredData;  
    }
   }

  featch() {
    const jobsUrl = '/jobs';
    return this.http.get<JobData[]>(jobsUrl);
  }
}
