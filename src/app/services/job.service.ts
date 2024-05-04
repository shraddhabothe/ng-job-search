import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  
  constructor(private http: HttpClient) { }

featch() {
  const jobsUrl = '/jobs';
  return this.http.get<JobData[]>(jobsUrl);
}
}
