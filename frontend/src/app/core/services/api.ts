import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiEnvelope, ApiListResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  getData<T>(endpoint: string, params?: Record<string, unknown>): Observable<T> {
    return this.http
      .get<ApiEnvelope<T>>(endpoint, { params: this.toParams(params) })
      .pipe(map((response) => response.data));
  }

  getPaginated<T>(endpoint: string, params?: Record<string, unknown>): Observable<ApiListResponse<T>> {
    return this.http
      .get<ApiEnvelope<T[]>>(endpoint, { params: this.toParams(params) })
      .pipe(
        map((response) => ({
          items: response.data ?? [],
          meta: response.meta ?? {},
          message: response.message,
        })),
      );
  }

  postData<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.post<ApiEnvelope<T>>(endpoint, body).pipe(map((response) => response.data));
  }

  patchData<T>(endpoint: string, body: unknown): Observable<T> {
    return this.http.patch<ApiEnvelope<T>>(endpoint, body).pipe(map((response) => response.data));
  }

  deleteData<T>(endpoint: string): Observable<T> {
    return this.http.delete<ApiEnvelope<T>>(endpoint).pipe(map((response) => response.data));
  }

  uploadFile<T>(endpoint: string, file: File, fields: Record<string, string> = {}): Observable<T> {
    const formData = new FormData();
    formData.append('file', file);

    for (const [key, value] of Object.entries(fields)) {
      formData.append(key, value);
    }

    return this.http.post<ApiEnvelope<T>>(endpoint, formData).pipe(map((response) => response.data));
  }

  private toParams(source?: Record<string, unknown>): HttpParams | undefined {
    if (!source) {
      return undefined;
    }

    let params = new HttpParams();

    for (const [key, rawValue] of Object.entries(source)) {
      if (rawValue === undefined || rawValue === null || rawValue === '') {
        continue;
      }

      if (Array.isArray(rawValue)) {
        for (const item of rawValue) {
          params = params.append(key, String(item));
        }

        continue;
      }

      params = params.set(key, String(rawValue));
    }

    return params;
  }
}
