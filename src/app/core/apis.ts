import { environment } from './../../environments/environment';
const baseURL: string = environment.baseURL;
export const APIs = {
  posts:`${baseURL}posts`,
  comments:`${baseURL}comments`,
  users:`${baseURL}users`

}
