<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>{{ $marketing->siteName() }}</title>
    <link>{{ $marketing->frontendBaseUrl() }}</link>
    <description>{{ $marketing->siteName() }} product feed</description>
@foreach ($products as $product)
    <item>
      <g:id>{{ $product->id }}</g:id>
      <title><![CDATA[{{ \App\Support\Translatable::get($product->name) }}]]></title>
      <description><![CDATA[{{ $marketing->secureDescription(\App\Support\Translatable::get($product->short_description) ?: \App\Support\Translatable::get($product->description)) }}]]></description>
      <link>{{ $marketing->productUrl($product) }}</link>
      <g:image_link>{{ $marketing->assetUrl($product->main_image_path) ?? $marketing->defaultOgImageUrl() }}</g:image_link>
      <g:availability>in stock</g:availability>
      <g:condition>{{ $marketing->merchantCondition() }}</g:condition>
      <g:price>{{ number_format((float) ($product->base_price ?? 0), 2, '.', '') }} {{ $marketing->currencyCode() }}</g:price>
      <g:brand><![CDATA[{{ $marketing->merchantBrandName() }}]]></g:brand>
    </item>
@endforeach
  </channel>
</rss>
