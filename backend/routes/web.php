<?php

use App\Http\Controllers\MarketingController;
use App\Http\Controllers\SharePreviewImageController;
use App\Http\Controllers\ShareRedirectController;
use Illuminate\Support\Facades\Route;

Route::get('/robots.txt', [MarketingController::class, 'robots']);
Route::get('/sitemap.xml', [MarketingController::class, 'sitemap']);
Route::get('/feeds/products/google.xml', [MarketingController::class, 'googleMerchantFeed']);
Route::get('/feeds/products/meta.csv', [MarketingController::class, 'metaCatalogFeed']);
Route::get('/share/{type}/{slug}/{code}/preview.jpg', SharePreviewImageController::class)
    ->where([
        'type' => '[A-Za-z0-9_-]+',
        'slug' => '[A-Za-z0-9_-]+',
        'code' => '[A-Za-z0-9]+',
    ]);
Route::get('/share/{type}/{slug}/{code}', ShareRedirectController::class)
    ->where([
        'type' => '[A-Za-z0-9_-]+',
        'slug' => '[A-Za-z0-9_-]+',
        'code' => '[A-Za-z0-9]+',
    ]);
