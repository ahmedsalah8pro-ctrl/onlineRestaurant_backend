import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  AdminRoleIndex,
  ApiListResponse,
  OrderDetail,
  OrderSummary,
  SettingGroup,
  SettingsSchema,
  UploadResult,
} from '../models/api.models';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class AdminApiService {
  private readonly api = inject(ApiService);

  listResource<T>(resource: string): Observable<T[]> {
    return this.api.getData(`/admin/${resource}`);
  }

  showResource<T>(resource: string, id: number | string): Observable<T> {
    return this.api.getData(`/admin/${resource}/${id}`);
  }

  createResource<T>(resource: string, payload: Record<string, unknown>): Observable<T> {
    return this.api.postData(`/admin/${resource}`, payload);
  }

  updateResource<T>(resource: string, id: number | string, payload: Record<string, unknown>): Observable<T> {
    return this.api.patchData(`/admin/${resource}/${id}`, payload);
  }

  deleteResource(resource: string, id: number | string): Observable<null> {
    return this.api.deleteData(`/admin/${resource}/${id}`);
  }

  listOrders(params?: Record<string, unknown>): Observable<ApiListResponse<OrderSummary>> {
    return this.api.getPaginated('/admin/orders', params);
  }

  showOrder(orderId: number): Observable<OrderDetail> {
    return this.api.getData(`/admin/orders/${orderId}`);
  }

  updateOrderStatus(orderId: number, payload: Record<string, unknown>): Observable<OrderDetail> {
    return this.api.patchData(`/admin/orders/${orderId}/status`, payload);
  }

  assignDelivery(orderId: number, payload: Record<string, unknown>): Observable<OrderDetail> {
    return this.api.patchData(`/admin/orders/${orderId}/delivery`, payload);
  }

  getSettingsCatalog(): Observable<Record<string, unknown>> {
    return this.api.getData('/admin/settings');
  }

  getSettingsSchema(): Observable<SettingsSchema> {
    return this.api.getData('/admin/settings/schema');
  }

  getSettingsGroup(group: string): Observable<SettingGroup> {
    return this.api.getData(`/admin/settings/${group}`);
  }

  updateSettingsGroup(group: string, values: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.api.patchData(`/admin/settings/${group}`, { values });
  }

  resetSettingsGroup(group: string): Observable<Record<string, unknown>> {
    return this.api.postData(`/admin/settings/${group}/reset`, {});
  }

  exportSettings(groups?: string[]): Observable<Record<string, unknown>> {
    const params = groups && groups.length > 0 ? { groups } : undefined;
    return this.api.getData('/admin/settings/export', params);
  }

  importSettings(payload: Record<string, unknown>): Observable<Record<string, unknown>> {
    return this.api.postData('/admin/settings/import', payload);
  }

  getRolesIndex(): Observable<AdminRoleIndex> {
    return this.api.getData('/admin/roles');
  }

  createRole(payload: Record<string, unknown>): Observable<unknown> {
    return this.api.postData('/admin/roles', payload);
  }

  updateRole(roleId: number, payload: Record<string, unknown>): Observable<unknown> {
    return this.api.patchData(`/admin/roles/${roleId}`, payload);
  }

  deleteRole(roleId: number): Observable<null> {
    return this.api.deleteData(`/admin/roles/${roleId}`);
  }

  upload(file: File, directory = 'branding'): Observable<UploadResult> {
    return this.api.uploadFile('/admin/uploads', file, { directory });
  }
}
