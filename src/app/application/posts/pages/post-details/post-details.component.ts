import { ActivatedRoute } from '@angular/router';
import { CommentWithUser, PostWithUser } from './../../../shared/models/post';
import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/application/shared/services';
import { catchError, Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {
  public post$!: Observable<PostWithUser>;
  public componentList$!: Observable<CommentWithUser[]>;
  public postError: string = '';
  public commentsError: string = '';
  constructor(
    private postService: PostsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const postId: string = this.route.snapshot.params['postId'];
    this.componentList$ = this.getComponentList(+postId)
    this.post$ = this.getPostById(+postId);
  }

  private getComponentList(postId: number): Observable<CommentWithUser[]> {
    this.commentsError = '';
    return this.postService.getCommentsByPostId(postId).pipe(catchError(err => {
      this.commentsError = 'Something went wrong'
      return throwError(err);
    }))
  }

  private getPostById(postId: number): Observable<PostWithUser> {
    this.postError = ''
    return this.postService.getPostById(postId).pipe(catchError(err => {
      this.postError = 'Something went wrong'
      return throwError(err);
    }));
  }

}
