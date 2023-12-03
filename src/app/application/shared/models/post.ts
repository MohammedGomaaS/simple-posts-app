export interface Content{
  id: number
  title?: string,
  body: string
}

export interface Post extends Content {
  userId: number,
}

export interface Comment extends Content {
  postId: number,
  name: string,
  email: string
}

export interface CommentWithUser {
  comment:Comment,
  user: User
}

export interface PostWithUser {
  post:Post,
  user: User
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

