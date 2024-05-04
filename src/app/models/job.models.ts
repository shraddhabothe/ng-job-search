export interface JobData {
  id: number;
  jobId: number,
    compName: string,
    title: string,
    companyLogo: string,
    reference: string,
    isSelectedJob: boolean
  }
  
  export interface JobDetailsData {
    id: number,
    companyName: string,
    title: string,
    companyLogo: string,
    reference: string,
    location: string,
    industries: string,
    types: string,
    description: string,
    publishDate: string
  }