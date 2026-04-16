import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {
  Address,
  ApiListResponse,
  Branch,
  Cart,
  Category,
  CouponPreview,
  DynamicPage,
  NotificationItem,
  OrderDetail,
  OrderSummary,
  ProductDetail,
  ProductListItem,
  PublicSettings,
  Review,
  UserProfile,
  Wallet,
  WalletTransaction,
} from '../models/api.models';
import { ApiService } from './api';

@Injectable({
  providedIn: 'root',
})
export class PublicApiService {
  private readonly api = inject(ApiService);

  getPublicSettings(): Observable<PublicSettings> {
    return this.api.getData('/settings/public');
  }

  getBranches(): Observable<Branch[]> {
    return this.api.getData('/branches');
  }

  getCategories(): Observable<Category[]> {
    return this.api.getData('/categories');
  }

  getProducts(params?: Record<string, unknown>): Observable<ApiListResponse<ProductListItem>> {
    return this.api.getPaginated('/products', params);
  }

  getBestSellers(): Observable<ProductListItem[]> {
    return this.api.getData('/products/best-sellers');
  }

  getProduct(productId: number | string): Observable<ProductDetail> {
    return this.api.getData(`/products/${productId}`);
  }

  getProductReviews(productId: number | string): Observable<ApiListResponse<Review>> {
    return this.api.getPaginated(`/products/${productId}/reviews`);
  }

  getDynamicPage(slug: string): Observable<DynamicPage> {
    return this.api.getData(`/pages/${slug}`);
  }

  getPublicProfile(username: string): Observable<Record<string, unknown>> {
    return this.api.getData(`/profiles/${username}`);
  }

  getProfile(): Observable<UserProfile> {
    return this.api.getData('/profile');
  }

  updateProfile(payload: Record<string, unknown>): Observable<unknown> {
    return this.api.patchData('/profile', payload);
  }

  updatePrivacy(payload: Record<string, unknown>): Observable<unknown> {
    return this.api.patchData('/profile/privacy', payload);
  }

  getAddresses(): Observable<Address[]> {
    return this.api.getData('/addresses');
  }

  createAddress(payload: Record<string, unknown>): Observable<Address> {
    return this.api.postData('/addresses', payload);
  }

  updateAddress(addressId: number, payload: Record<string, unknown>): Observable<Address> {
    return this.api.patchData(`/addresses/${addressId}`, payload);
  }

  deleteAddress(addressId: number): Observable<null> {
    return this.api.deleteData(`/addresses/${addressId}`);
  }

  setDefaultAddress(addressId: number): Observable<Address> {
    return this.api.patchData(`/addresses/${addressId}/default`, {});
  }

  getCart(): Observable<Cart> {
    return this.api.getData('/cart');
  }

  addCartItem(payload: Record<string, unknown>): Observable<Cart> {
    return this.api.postData('/cart/items', payload);
  }

  updateCartItem(itemId: number, payload: Record<string, unknown>): Observable<Cart> {
    return this.api.patchData(`/cart/items/${itemId}`, payload);
  }

  removeCartItem(itemId: number): Observable<Cart> {
    return this.api.deleteData(`/cart/items/${itemId}`);
  }

  clearCart(): Observable<null> {
    return this.api.deleteData('/cart');
  }

  previewCoupon(payload: Record<string, unknown>): Observable<CouponPreview> {
    return this.api.postData('/cart/preview-coupon', payload);
  }

  checkout(payload: Record<string, unknown>): Observable<OrderDetail> {
    return this.api.postData('/orders/checkout', payload);
  }

  getOrders(): Observable<ApiListResponse<OrderSummary>> {
    return this.api.getPaginated('/orders');
  }

  getOrder(orderId: number): Observable<OrderDetail> {
    return this.api.getData(`/orders/${orderId}`);
  }

  updateOrderNotes(orderId: number, notes: string): Observable<OrderDetail> {
    return this.api.patchData(`/orders/${orderId}/notes`, { notes });
  }

  cancelOrder(orderId: number): Observable<OrderDetail> {
    return this.api.postData(`/orders/${orderId}/cancel`, {});
  }

  createReview(payload: Record<string, unknown>): Observable<Review> {
    return this.api.postData('/reviews', payload);
  }

  getNotifications(): Observable<ApiListResponse<NotificationItem>> {
    return this.api.getPaginated('/notifications');
  }

  getUnreadNotificationCount(): Observable<{ unread_count: number }> {
    return this.api.getData('/notifications/unread-count');
  }

  markNotificationRead(notificationId: string): Observable<NotificationItem> {
    return this.api.patchData(`/notifications/${notificationId}/read`, {});
  }

  markAllNotificationsRead(): Observable<{ marked_as_read: number }> {
    return this.api.postData('/notifications/read-all', {});
  }

  getWallet(): Observable<Wallet> {
    return this.api.getData('/wallet');
  }

  getWalletTransactions(params?: Record<string, unknown>): Observable<ApiListResponse<WalletTransaction>> {
    return this.api.getPaginated('/wallet/transactions', params);
  }

  redeemGiftCard(code: string): Observable<Wallet> {
    return this.api.postData('/wallet/redeem', { code });
  }
}
