import { APIs } from '../../../core/apis';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Post, PostWithUser, User, Comment, CommentWithUser } from '../models';

@Injectable()
export class PostsService {
  constructor(private http: HttpClient) { }

  private getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(APIs.posts);
  }

  public getPostsWithUsers(): Observable<PostWithUser[]> {
    return forkJoin([this.getPosts(), this.getUsers()]).pipe(map(res => {
      return this.matchPostsWithUsers(res[0], res[1]);
    }))
  }

  public getPostById(postId: number): Observable<PostWithUser> {
    return this.getPostsWithUsers().pipe(map(res => {
      return res.find(post => post.post.id === postId)||{}as any
    }));
  }

  private matchPostsWithUsers(posts: Post[], users: User[]): PostWithUser[] {
    return posts.map(post => {
      const user: User = users.find(user => user.id === post.userId) || {} as any;
      return { post: post, user } as any
    })
  }

  private getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(APIs.comments);
  }
  private getCommentsWithUsers(): Observable<CommentWithUser[]> {
    return forkJoin([this.getComments(), this.getUsers()]).pipe(map(res => {
      return this.matchCommentsWithUsers(res[0], res[1]);
    }))
  }

  public getCommentsByPostId(postId: number): Observable<CommentWithUser[]> {
    return this.getCommentsWithUsers().pipe(map(res => {
      return res.filter(comment => comment.comment.postId === postId)
    }));
  }

  private matchCommentsWithUsers(commetns: Comment[], users: User[]): CommentWithUser[] {
    return commetns.map(comment => {
      const user: User = users.find(user => user.email === comment.email) || {} as any;
      return { comment, user } as any
    })
  }

  private getUsers(): Observable<User[]> {
    return this.http.get<User[]>(APIs.users);
  }

}
