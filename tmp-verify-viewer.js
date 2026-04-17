const { chromium } = require('C:/Users/PC/AppData/Local/ms-playwright-go/1.50.1/package');
const fs = require('fs');
const path = require('path');

(async() => {
  const outDir = path.join(process.cwd(), 'tmp-playwright-shots2');
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ headless: true, executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe' });
  async function ctx(url, locale='en') {
    const context = await browser.newContext({ viewport: { width: 1600, height: 1000 } });
    const page = await context.newPage();
    await page.addInitScript(({ locale }) => localStorage.setItem('restaurant-demo.locale', locale), { locale });
    await page.goto(url, { waitUntil: 'networkidle' });
    return { context, page };
  }
  {
    const {context,page} = await ctx('http://127.0.0.1:4200/products/11/pizza','en');
    await page.waitForTimeout(1200);
    await page.screenshot({ path: path.join(outDir, 'product-11.png'), fullPage: true });
    await page.locator('.detail-media__asset--image').click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'product-11-viewer.png'), fullPage: true });
    await page.mouse.click(20,20);
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(outDir, 'product-11-after-mask-click.png'), fullPage: true });
    await context.close();
  }
  {
    const {context,page} = await ctx('http://127.0.0.1:4200/menu','en');
    const branch = page.locator('.branch-pill').first();
    if (await branch.count()) { await branch.click(); await page.waitForTimeout(1200); }
    await page.locator('.menu-card').first().click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(outDir, 'menu-preview.png'), fullPage: true });
    await page.locator('.preview-gallery__asset--image').click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(outDir, 'menu-preview-viewer.png'), fullPage: true });
    await context.close();
  }
  await browser.close();
  console.log(outDir);
})();
