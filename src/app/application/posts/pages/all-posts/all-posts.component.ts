import { PostsService } from '../../../shared/services';
import { PostWithUser } from '../../../shared/models/post';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { QueryParamsHelperService } from 'src/app/core/services';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostsFilterParams } from '../../models/posts-filter-params';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.scss']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  public searchForm!: FormGroup;
  public componentList: PostWithUser[] = [];
  public posts: PostWithUser[] = [];
  private subscriptions: Subscription[] = [];
  private searchSubscription!: Subscription;
  private filterParams: PostsFilterParams = new PostsFilterParams();
  public isLoading: boolean = false;
  public err!: string;
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private queryParamsHelperService: QueryParamsHelperService,
    private fb: FormBuilder,
    private router:Router
  ) { }

  ngOnInit() {
    this.subscribeToUrlParams();
    this.createSearchForm();
  }

  public createSearchForm(): void {
    this.searchForm = this.fb.group({
      searchText: [this.filterParams?.searchText]
    });
    this.subscriptions.push(this.searchForm.valueChanges.subscribe(re => {
      this.filterParams = re;
      // we depend on filteration change cretira to the route query params so we can refresh and don't lose the filter
      this.queryParamsHelperService.changeUrlParams(this.filterParams)
    }));
  }


  public subscribeToUrlParams(): void {
    this.subscriptions.push(
      this.route.queryParams.subscribe(params => {
        Object.assign(this.filterParams, params);
        this.setComponentList();
      })
    );
  }

  private setComponentList(): void {
    this.searchSubscription?.unsubscribe();
    if (this.posts?.length > 0) {
      this.componentList = this.filterPosts(this.posts);
      return
    }
    this.isLoading = true;
    this.err = ''
    this.searchSubscription = this.postsService.getPostsWithUsers().pipe(
      tap(posts => { this.posts = posts }),
      map(posts => this.filterPosts(posts)))
      .subscribe({
        next: (posts) => {
          this.isLoading = false;
          this.componentList = posts;
        },
        error: (err: HttpErrorResponse) => {
          this.err = 'Something went wrong'
      }
      });
  }

  private filterPosts(posts: PostWithUser[]): PostWithUser[] {
    return posts.filter(post => {
      let existed: boolean = true
      if (this.filterParams.searchText) {
        existed = existed && (post.post.title?.includes(this.filterParams?.searchText) || post.post.body?.includes(this.filterParams?.searchText))
      }
      return existed;
    })
  }

  public navigateToPostDetails(postId:number):void{
    this.router.navigate(['/app','posts',postId,'details'])
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s?.unsubscribe());
    this.searchSubscription?.unsubscribe();
  }
}
