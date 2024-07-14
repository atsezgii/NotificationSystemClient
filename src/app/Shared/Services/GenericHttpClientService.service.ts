import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericHttpClientService<T> {
  constructor(private http: HttpClient) {}

  getAll(url: string): Observable<T[]> {
    return this.http.get<T[]>(url);
  }

  get(url: string, id: string | number): Observable<T> {
    return this.http.get<T>(`${url}/${id}`);
  }

  create(url: string, item: T): Observable<T> {
    return this.http.post<T>(url, item);
  }

  update(url: string, id: string | number, item: T): Observable<T> {
    return this.http.put<T>(`${url}/${id}`, item);
  }

  delete(url: string, id: string | number): Observable<void> {
    return this.http.delete<void>(`${url}/${id}`);
  }
}
