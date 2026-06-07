const CACHE_NAME = 'solar-system-v1';
const ASSETS_TO_CACHE = [
  './index.html',
  'https://raw.githubusercontent.com/PosterIran/solar-system/main/solar-system.webp',
  'https://PosterIran.github.io/solar-system/Images/sun.png',
  'https://PosterIran.github.io/solar-system/Images/mercury.png',
  'https://PosterIran.github.io/solar-system/Images/venus.png',
  'https://PosterIran.github.io/solar-system/Images/earth.png',
  'https://PosterIran.github.io/solar-system/Images/mars.png'
];

// مرحله نصب سرویس ورکر و ذخیره فایل‌ها در کش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('فایل‌های اصلی با موفقیت کش شدند.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// فعال‌سازی و حذف کش‌های قدیمی در صورت آپدیت نسخه
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('کش قدیمی حذف شد:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// استراتژی پاسخ‌دهی شبکه/کش (اول کش، سپس بروزرسانی از شبکه)
// جایگزین کردن این کد در بخش fetch فایل service-worker.js
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
    .then(response => {
      // اگر اینترنت وصل بود، نسخه جدید را در کش هم آپدیت کن
      return caches.open(CACHE_NAME).then(cache => {
        cache.put(event.request, response.clone());
        return response;
      });
    })
    .catch(() => {
      // اگر اینترنت قطع بود، فایل را از کش بخوان
      return caches.match(event.request);
    })
  );
});