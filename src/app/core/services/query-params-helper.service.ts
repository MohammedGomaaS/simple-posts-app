import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class QueryParamsHelperService {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public changeUrlParams(params: any, replaceUrl = false) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: QueryParamsHelperService.makeUrlParamsOf(params),
      replaceUrl
    });
  }

  public static makeUrlParamsOf(params: { [key: string]: string | number | boolean | any }): { [key: string]: string } {
    const keys = Object.keys(params);
    let newParams: { [key: string]: string } = {};
    for (let key of keys) {
      if (params[key] || (typeof params[key] === 'number' && params[key] === 0)) {
        if (typeof params[key] === 'object') {
          if (params[key] instanceof Array && params[key].length === 0) {
            continue;
          }
          newParams[key] = JSON.stringify(params[key]);
        } else {
          newParams[key] = params[key].toString();
        }
      }
    }
    return newParams;
  }

  public makeUrlParamsString(params: { [key: string]: string }): string {
    let queryString = "";
    for (let key in params) {
      let paramObjectTest;
      try {
        paramObjectTest = JSON.parse(params[key]);
      } catch { }
      if (paramObjectTest && typeof paramObjectTest === 'object') {
        try {
          params[key] = JSON.parse(params[key]);
        } catch {
          delete params[key];
        }
        if (params[key] as any instanceof Array) {
          for (let param of params[key]) {
            queryString = this.addToQueryString(queryString, key, param);
          }
        }
      } else {
        if (params[key]) {
          queryString = this.addToQueryString(queryString, key, params[key].toString());
        }
      }
    }
    return queryString;
  }

  private addToQueryString(queryString: string, key: string, value: string) {
    if (queryString.length === 0) {
      queryString += '?';
    } else {
      queryString += '&';
    }
    queryString += `${key}=${encodeURIComponent(value)}`;
    return queryString;
  }

}
