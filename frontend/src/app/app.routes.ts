import { Routes } from '@angular/router';
import { adminAuthGuard } from './core/guards/admin-auth-guard';
import { userAuthGuard } from './core/guards/user-auth-guard';
import { AdminShell } from './features/admin/layout/admin-shell/admin-shell';
import { AdminLoginPage } from './features/admin/pages/admin-login-page/admin-login-page';
import { CatalogPage } from './features/admin/pages/catalog-page/catalog-page';
import { ContentPage } from './features/admin/pages/content-page/content-page';
import { DashboardPage } from './features/admin/pages/dashboard-page/dashboard-page';
import { IntegrationsPage } from './features/admin/pages/integrations-page/integrations-page';
import { OrdersPage as AdminOrdersPage } from './features/admin/pages/orders-page/orders-page';
import { SettingsPage } from './features/admin/pages/settings-page/settings-page';
import { PublicShell } from './features/public/layout/public-shell/public-shell';
import { AccountPage } from './features/public/pages/account-page/account-page';
import { AuthPage } from './features/public/pages/auth-page/auth-page';
import { CartPage } from './features/public/pages/cart-page/cart-page';
import { CheckoutPage } from './features/public/pages/checkout-page/checkout-page';
import { HomePage } from './features/public/pages/home-page/home-page';
import { MenuPage } from './features/public/pages/menu-page/menu-page';
import { OrdersPage as PublicOrdersPage } from './features/public/pages/orders-page/orders-page';
import { PageDetailPage } from './features/public/pages/page-detail-page/page-detail-page';
import { ProductDetailPage } from './features/public/pages/product-detail-page/product-detail-page';
import { StatusPage } from './features/public/pages/status-page/status-page';
import { WalletPage } from './features/public/pages/wallet-page/wallet-page';

export const routes: Routes = [
  {
    path: '',
    component: PublicShell,
    children: [
      { path: '', component: HomePage, pathMatch: 'full' },
      { path: 'menu', component: MenuPage },
      { path: 'products/:id/:slug', component: ProductDetailPage },
      { path: 'products/:id', component: ProductDetailPage },
      { path: 'pages/:slug', component: PageDetailPage },
      { path: 'cart', component: CartPage },
      { path: 'checkout', component: CheckoutPage, canActivate: [userAuthGuard] },
      { path: 'account', component: AccountPage, canActivate: [userAuthGuard] },
      { path: 'orders/:id', component: PublicOrdersPage, canActivate: [userAuthGuard] },
      { path: 'orders', component: PublicOrdersPage, canActivate: [userAuthGuard] },
      { path: 'wallet/Transactions/:transactionId', component: WalletPage, canActivate: [userAuthGuard] },
      { path: 'wallet/Transactions', component: WalletPage, canActivate: [userAuthGuard] },
      { path: 'wallet/giftcard', component: WalletPage, canActivate: [userAuthGuard] },
      { path: 'wallet/redeem', component: WalletPage, canActivate: [userAuthGuard] },
      { path: 'wallet/deposit', component: WalletPage, canActivate: [userAuthGuard] },
      { path: 'wallet', component: WalletPage, canActivate: [userAuthGuard] },
      { path: '401', component: StatusPage, data: { statusCode: 401 } },
      { path: '403', component: StatusPage, data: { statusCode: 403 } },
      { path: '404', component: StatusPage, data: { statusCode: 404 } },
      { path: 'auth/:mode', component: AuthPage },
      { path: 'auth', redirectTo: 'auth/login', pathMatch: 'full' },
    ],
  },
  {
    path: 'admin/login',
    component: AdminLoginPage,
  },
  {
    path: 'admin',
    component: AdminShell,
    canActivate: [adminAuthGuard],
    children: [
      { path: '', component: DashboardPage, pathMatch: 'full' },
      { 
        path: 'catalog', 
        loadComponent: () => import('./features/admin/pages/catalog/catalog-shell').then(m => m.CatalogShell),
        children: [
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          { path: 'products', loadComponent: () => import('./features/admin/pages/catalog/product-list-page').then(m => m.ProductListPage) },
          { path: 'products/create', loadComponent: () => import('./features/admin/pages/catalog/product-editor-page').then(m => m.ProductEditorPage) },
          { path: 'products/:id/edit', loadComponent: () => import('./features/admin/pages/catalog/product-editor-page').then(m => m.ProductEditorPage) },
          { path: ':resourceType', loadComponent: () => import('./features/admin/pages/catalog/resource-list-page').then(m => m.ResourceListPage) },
          { path: ':resourceType/create', loadComponent: () => import('./features/admin/pages/catalog/generic-editor-page').then(m => m.GenericEditorPage) },
          { path: ':resourceType/:id/edit', loadComponent: () => import('./features/admin/pages/catalog/generic-editor-page').then(m => m.GenericEditorPage) },
        ]
      },
      { path: 'orders', component: AdminOrdersPage },
      { path: 'settings', component: SettingsPage },
      { 
        path: 'access', 
        loadComponent: () => import('./features/admin/pages/access/access-shell').then(m => m.AccessShell),
        children: [
          { path: '', redirectTo: 'members', pathMatch: 'full' },
          { path: 'members', loadComponent: () => import('./features/admin/pages/access/member-list').then(m => m.MemberListPage) },
          { path: 'members/create', loadComponent: () => import('./features/admin/pages/access/member-editor').then(m => m.MemberEditorPage) },
          { path: 'members/:id/edit', loadComponent: () => import('./features/admin/pages/access/member-editor').then(m => m.MemberEditorPage) },
          { path: 'roles', loadComponent: () => import('./features/admin/pages/access/role-list').then(m => m.RoleListPage) },
          { path: 'roles/create', loadComponent: () => import('./features/admin/pages/access/role-editor').then(m => m.RoleEditorPage) },
          { path: 'roles/:id/edit', loadComponent: () => import('./features/admin/pages/access/role-editor').then(m => m.RoleEditorPage) },
          { path: 'permissions', loadComponent: () => import('./features/admin/pages/access/permission-list').then(m => m.PermissionListPage) },
        ]
      },
      { path: 'content', component: ContentPage },
      { path: 'integrations', component: IntegrationsPage },
    ],
  },
  { path: '**', redirectTo: '404' },
];
