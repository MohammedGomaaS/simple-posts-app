import { MatInputModule } from '@angular/material/input';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AllPostsComponent } from './all-posts.component';
import { PostsService } from 'src/app/application/shared/services';
import { QueryParamsHelperService } from 'src/app/core/services';
import { ReactiveFormsModule } from '@angular/forms';
import { PostWithUser } from 'src/app/application/shared/models';
import { SharedModule } from 'src/app/application/shared/shared.module';
import {mockedPosts} from './mock'
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
class MockPostsService {
  getPostsWithUsers(): Observable<PostWithUser[]> {
    return of(mockedPosts as any);
  }
}

describe('AllPostsComponent', () => {
  let component: AllPostsComponent;
  let fixture: ComponentFixture<AllPostsComponent>;
  let postsService: PostsService
  beforeEach(waitForAsync(() => {
    const route = { queryParams: new BehaviorSubject<any>({searchText:'sunt aut facere repellat'})}
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule,SharedModule,RouterModule,MatInputModule,BrowserAnimationsModule,NoopAnimationsModule],
      declarations: [AllPostsComponent],
      providers: [
        { provide: PostsService, useClass: MockPostsService },
        { provide: QueryParamsHelperService, useValue: {changeUrlParams:(params: any)=>{route.queryParams.next({searchText:params.searchText});}}},
        { provide: ActivatedRoute, useValue: route }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllPostsComponent);
    component = fixture.componentInstance;
    postsService = TestBed.get(PostsService)
    fixture.detectChanges();
    component.ngOnInit()
  });



  it('Creating search form and make first init', () => {
    spyOn(component, 'subscribeToUrlParams');
    spyOn(component, 'createSearchForm');
    component.ngOnInit()
    expect(component.subscribeToUrlParams).toHaveBeenCalled();
    expect(component.createSearchForm).toHaveBeenCalled();
  });


  it('First Init With Previous Search Keyword', () => {
    let componentList = component.componentList;
    expect(componentList.length).toBeGreaterThan(0);
  });

  it('Test search functionality Case sesitive', () => {
    component.searchForm.controls['searchText'].setValue('SUNT aut facere repellat');
    let componentList = component.componentList;
    expect(componentList.length).toEqual(0);
  });

  it('Test search functionality not existed word', () => {
    component.searchForm.controls['searchText'].setValue('dfdasfasdf');
    let componentList = component.componentList;
    expect(componentList.length).toEqual(0);
  });

  it('Test search functionality existed search text', () => {
    component.searchForm.controls['searchText'].setValue('sunt aut facere repellat');
    let componentList = component.componentList;
    expect(componentList.length).toEqual(1);
  });
});
