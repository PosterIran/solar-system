const CACHE_NAME = 'solar-system-v2';

// فایل‌های حیاتی که حتماً باید برای کارکرد آفلاین ذخیره شوند
const REQUIRED_ASSETS = [
  './',
  './index.html',
  'manifest.json'
];

// فایل‌های فرعی (تصاویر سیارات) که در صورت در دسترس بودن کش می‌شوند
const OPTIONAL_ASSETS = [
  'https://raw.githubusercontent.com/PosterIran/solar-system/main/solar-system.webp',
  'https://PosterIran.github.io/solar-system/Images/sun.png',
  'https://PosterIran.github.io/solar-system/Images/mercury.png',
  'https://PosterIran.github.io/solar-system/Images/venus.png',
  'https://PosterIran.github.io/solar-system/Images/earth.png',
  'https://PosterIran.github.io/solar-system/Images/mars.png'
];

// نصب سرویس ورکر
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('در حال کش کردن فایل‌های اصلی...');
      // ابتدا فایل‌های اصلی را ذخیره می‌کند تا نصب حتماً موفقیت‌آمیز باشد
      return cache.addAll(REQUIRED_ASSETS)
        .then(() => {
          // سپس تصاویر را در پس‌زمینه اضافه می‌کند
          OPTIONAL_ASSETS.forEach(asset => {
            fetch(asset)
              .then(response => {
                if (response.ok) cache.put(asset, response);
              })
              .catch(err => console.log('خطا در کش کردن فایل فرعی:', asset));
          });
        });
    })
  );
  self.skipWaiting();
});

// فعال‌سازی و حذف کش‌های قدیمی
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('حذف کش قدیمی:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// مدیریت درخواست‌ها (اول شبکه، در صورت قطع اینترنت استفاده از کش)
self.addEventListener('fetch', (event) => {
  // فقط درخواست‌های GET کش می‌شوند
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // اگر پاسخ شبکه درست بود، آن را در کش بروزرسانی کن
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        // در صورت عدم دسترسی به شبکه، فایل را از کش لود کن
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          // اگر مسیر اصلی پیدا نشد، ریشه را برگردان
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});