export interface ApiEnvelope<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
  errors?: Record<string, string[]>;
}

export interface ApiMeta {
  current_page?: number;
  last_page?: number;
  per_page?: number;
  total?: number;
  unread_count?: number;
  [key: string]: unknown;
}

export interface ApiListResponse<T> {
  items: T[];
  meta: ApiMeta;
  message: string;
}

export interface TranslatedText {
  ar?: string | null;
  en?: string | null;
}

export interface PublicSettings {
  schema_version: number;
  general?: {
    site_name?: string;
    website_slug?: string;
    support_phone?: string;
    support_email?: string | null;
  };
  branding?: {
    brand_tagline?: TranslatedText;
    logo_path?: string | null;
    square_logo_path?: string | null;
    favicon_path?: string | null;
    cover_image_path?: string | null;
    brand_palette?: BrandPalette;
    social_links?: Record<string, string | null>;
  };
  localization?: {
    default_locale?: string;
    supported_locales?: string[];
    rtl_locales?: string[];
    default_timezone?: string;
  };
  currency?: {
    code?: string;
    symbol?: string;
    symbol_position?: 'before' | 'after';
    decimal_places?: number;
  };
  features?: Record<string, boolean>;
  auth?: {
    login_with_email?: boolean;
    login_with_username?: boolean;
    allowed_social_providers?: string[];
  };
  ordering?: {
    grace_period_minutes?: number;
    allow_order_notes?: boolean;
    max_note_length?: number;
    allow_cash_on_delivery?: boolean;
    allow_wallet_payments?: boolean;
  };
  delivery?: {
    fallback_delivery_fee?: number;
    free_delivery_threshold?: number;
    show_estimated_times?: boolean;
    default_eta_min_minutes?: number;
    default_eta_max_minutes?: number;
  };
  uploads?: {
    public_base_url?: string;
  };
  theme?: {
    theme_json?: {
      version?: number;
      tokens?: Record<string, string>;
    };
  };
  typography?: {
    public_ar_body_font?: string;
    public_en_body_font?: string;
    public_ar_heading_font?: string;
    public_en_heading_font?: string;
    admin_ar_body_font?: string;
    admin_en_body_font?: string;
    admin_ar_heading_font?: string;
    admin_en_heading_font?: string;
    font_library?: FontLibraryItem[];
  };
  seo?: {
    default_meta_title?: TranslatedText;
    default_meta_description?: TranslatedText;
    default_og_image_path?: string | null;
    canonical_host?: string | null;
    robots_indexing_enabled?: boolean;
    marketing_ready_mode?: boolean;
    share_links_enabled?: boolean;
    merchant_feeds_enabled?: boolean;
    merchant_feed_brand_name?: string | null;
    merchant_feed_condition?: 'new' | 'used' | 'refurbished';
    twitter_handle?: string | null;
    google_site_verification?: string | null;
    bing_site_verification?: string | null;
    meta_pixel_id?: string | null;
    google_tag_id?: string | null;
  };
}

export interface FontLibraryItem {
  name?: string;
  font_family: string;
  file_path?: string | null;
  font_type?: 'ar' | 'en' | 'both';
  scope?: 'public' | 'admin' | 'shared';
  font_weight?: string | null;
  font_style?: string | null;
}

export interface BrandPalette {
  primary?: string;
  secondary?: string;
  accent?: string;
  surface?: string;
}

export interface Category {
  id: number;
  parent_id: number | null;
  name: string;
  translations?: TranslatedText;
  slug: string;
  description?: string | null;
  is_active: boolean;
  children?: Category[];
}

export interface DeliveryZone {
  id: number;
  name: string;
  translations?: TranslatedText;
  delivery_fee: number;
  min_delivery_time_minutes?: number | null;
  max_delivery_time_minutes?: number | null;
}

export interface Branch {
  id: number;
  name: string;
  translations?: TranslatedText;
  slug: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  working_hours?: Record<string, unknown> | null;
  is_active: boolean;
  delivery_zones?: DeliveryZone[];
}

export interface ProductListItem {
  id: number;
  name: string;
  translations?: TranslatedText;
  slug: string;
  short_description?: string | null;
  short_description_translations?: TranslatedText;
  base_price?: number | null;
  main_image_path?: string | null;
  is_active: boolean;
  is_best_seller_pinned: boolean;
  best_seller_rank?: number | null;
  rating_summary: {
    average: number;
    count: number;
  };
  addon_groups_count?: number;
  purchases_count?: number;
  unique_customers_count?: number;
}

export interface ShareLinkResult {
  id: number;
  type: 'product' | 'menu' | 'page' | 'home';
  code: string;
  slug_hint?: string | null;
  title: string;
  description?: string | null;
  image_url?: string | null;
  share_url: string;
  destination_url: string;
}

export interface ShareLinkCreatePayload {
  type: 'product' | 'menu' | 'page' | 'home';
  resource_id?: number;
  slug?: string;
  query?: Record<string, unknown>;
  locale?: string;
}

export interface ProductMediaItem {
  id: number;
  media_type: 'image' | 'video' | 'external_video';
  disk?: string | null;
  path?: string | null;
  external_url?: string | null;
  url?: string | null;
  title?: string | null;
  is_primary?: boolean;
}

export interface ProductSize {
  id: number;
  code: string;
  name: string;
  translations?: TranslatedText;
  price: number;
  is_default: boolean;
}

export interface AddonOption {
  id: number;
  name: string;
  translations?: TranslatedText;
  base_price: number;
  size_price_overrides?: Record<string, number>;
}

export interface AddonGroup {
  id: number;
  name: string;
  translations?: TranslatedText;
  selection_type: 'single' | 'multiple';
  is_required: boolean;
  min_select: number;
  max_select?: number | null;
  options: AddonOption[];
}

export interface ProductDetail extends ProductListItem {
  description?: string | null;
  description_translations?: TranslatedText;
  categories: Array<Pick<Category, 'id' | 'name' | 'slug'>>;
  tags: Array<{ id: number; name: string; slug: string }>;
  sizes: ProductSize[];
  addon_groups: AddonGroup[];
  media: ProductMediaItem[];
}

export interface CartItem {
  id: number;
  product_id: number;
  product_size_id?: number | null;
  product_name: string;
  product_translations?: TranslatedText;
  size?: string | null;
  size_translations?: TranslatedText;
  quantity: number;
  price_snapshot: number;
  selected_addon_option_ids?: number[];
  selected_addons: SelectedAddonSnapshot[];
  line_subtotal: number;
}

export interface SelectedAddonSnapshot {
    id: number;
    name: string;
    price: number;
    translations?: TranslatedText;
    [key: string]: unknown;
}

export interface Cart {
  id: number;
  branch_id?: number | null;
  items: CartItem[];
  subtotal: number;
}

export interface CouponPreview {
  valid: boolean;
  message: string;
  discount_products: number;
  discount_delivery: number;
  discount_total: number;
  applies_to?: string | null;
  requires_delivery_zone?: boolean;
  coupon?: {
    code?: string;
    applies_to?: string;
    value?: number;
    type?: string;
  } | null;
}

export interface Address {
  id: number;
  label?: string | null;
  recipient_name: string;
  phone: string;
  alternative_phones?: string[] | null;
  country?: string | null;
  city?: string | null;
  area?: string | null;
  delivery_zone_id: number;
  delivery_zone?: DeliveryZone | null;
  street?: string | null;
  building?: string | null;
  floor?: string | null;
  apartment?: string | null;
  landmark?: string | null;
  notes?: string | null;
  is_default: boolean;
}

export interface UserProfileStats {
  total_orders: number;
  total_spent: number;
  monthly_rank: number;
  yearly_rank: number;
  favorite_products: Array<{ name: string; count: number }>;
}

export interface UserProfile {
  user: {
    id: number;
    name: string;
    username: string;
    email?: string | null;
    primary_phone: string;
    is_active: boolean;
    roles?: string[];
    profile?: {
      avatar_path?: string | null;
      is_public_profile?: boolean;
    };
  };
  stats: UserProfileStats;
}

export interface NotificationItem {
  id: string;
  type: string;
  data: Record<string, unknown>;
  read_at?: string | null;
  created_at: string;
}

export interface WalletTransaction {
  id: number;
  type: string;
  amount: number;
  balance_before: number;
  balance_after: number;
  notes?: string | null;
  created_at: string;
}

export interface Wallet {
  id: number;
  balance: number;
  transactions?: WalletTransaction[];
}

export interface OrderSummary {
  id: number;
  status: string;
  subtotal: number;
  delivery_fee: number;
  discount_total: number;
  wallet_amount: number;
  total: number;
  grand_total_before_discount?: number;
  grand_total_before_wallet?: number;
  payment_method?: 'cash_on_delivery' | 'wallet' | 'wallet_plus_cash_on_delivery';
  coupon_code?: string | null;
  grace_period_ends_at?: string | null;
  placed_at?: string | null;
}

export interface OrderDetail extends OrderSummary {
  currency_code: string;
  coupon_snapshot?: Record<string, unknown> | null;
  notes?: string | null;
  payment_summary?: {
    method: 'cash_on_delivery' | 'wallet' | 'wallet_plus_cash_on_delivery';
    paid_from_wallet: number;
    due_on_delivery: number;
    grand_total_before_discount: number;
    grand_total_before_wallet: number;
    discount_total: number;
  };
  delivery_person_name?: string | null;
  delivery_person_phone?: string | null;
  branch?: Branch | null;
  delivery_zone?: DeliveryZone | null;
  address?: Address | null;
  items: Array<{
    id: number;
    product_snapshot: Record<string, unknown>;
    product_name?: string;
    product_translations?: TranslatedText | null;
    size?: string | null;
    size_translations?: TranslatedText | null;
    selected_addons: SelectedAddonSnapshot[];
    unit_price: number;
    quantity: number;
    line_subtotal: number;
  }>;
  status_logs: Array<{
    id: number;
    from_status?: string | null;
    to_status: string;
    notes?: string | null;
    created_at: string;
  }>;
}

export interface Review {
  id: number;
  rating: number;
  comment?: string | null;
  is_anonymous: boolean;
  is_visible?: boolean;
  is_admin_generated?: boolean;
  user?: {
    id?: number;
    name?: string;
    username?: string;
  } | null;
  created_at?: string;
}

export interface DynamicPage {
  id: number;
  slug: string;
  title: string;
  translations?: TranslatedText;
  content?: string | null;
  is_active: boolean;
}

export interface SettingField {
  type: string;
  public: boolean;
  default: unknown;
  value: unknown;
  description?: TranslatedText | string | null;
  options?: unknown;
  example?: unknown;
}

export interface SettingGroup {
  group: string;
  label?: TranslatedText | string | null;
  description?: TranslatedText | string | null;
  is_public: boolean;
  updated_at?: string | null;
  fields: Record<string, SettingField>;
  values: Record<string, unknown>;
}

export interface SettingsSchema {
  version: number;
  groups: Record<string, SettingGroup>;
}

export interface AdminRole {
  id: number;
  name: string;
  permissions: Array<{ id: number; name: string }>;
}

export interface AdminRoleIndex {
  roles: AdminRole[];
  permissions: Array<{ id: number; name: string }>;
}

export interface UploadResult {
  disk: string;
  path: string;
  filename: string;
  mime_type?: string | null;
  size?: number | null;
  sha256?: string | null;
  scan_status?: string;
  scan_simulated?: boolean;
  url: string;
}
