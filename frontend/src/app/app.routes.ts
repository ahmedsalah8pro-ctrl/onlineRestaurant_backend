import { Routes } from '@angular/router';
import { adminAuthGuard } from './core/guards/admin-auth-guard';
import { userAuthGuard } from './core/guards/user-auth-guard';
import { AdminShell } from './features/admin/layout/admin-shell/admin-shell';
import { AccessPage } from './features/admin/pages/access-page/access-page';
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
import { WalletPage } from './features/public/pages/wallet-page/wallet-page';

export const routes: Routes = [
  {
    path: '',
    component: PublicShell,
    children: [
      { path: '', component: HomePage, pathMatch: 'full' },
      { path: 'menu', component: MenuPage },
      { path: 'products/:id', component: ProductDetailPage },
      { path: 'pages/:slug', component: PageDetailPage },
      { path: 'cart', component: CartPage, canActivate: [userAuthGuard] },
      { path: 'checkout', component: CheckoutPage, canActivate: [userAuthGuard] },
      { path: 'account', component: AccountPage, canActivate: [userAuthGuard] },
      { path: 'orders', component: PublicOrdersPage, canActivate: [userAuthGuard] },
      { path: 'wallet', component: WalletPage, canActivate: [userAuthGuard] },
      { path: 'auth', component: AuthPage },
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
      { path: 'catalog', component: CatalogPage },
      { path: 'orders', component: AdminOrdersPage },
      { path: 'settings', component: SettingsPage },
      { path: 'access', component: AccessPage },
      { path: 'content', component: ContentPage },
      { path: 'integrations', component: IntegrationsPage },
    ],
  },
  { path: '**', redirectTo: '' },
];
