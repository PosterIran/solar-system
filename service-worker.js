const CACHE_NAME = 'solar-system-v3';

// فایل‌های حیاتی که برای فعال شدن دکمه نصب الزامی هستند
const CORE_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './live-reload.js'
];

// تصاویر و فایل‌های فرعی (اگر فرمت png یا webp اشتباه باشد هم PWA خراب نمی‌شود)
const OPTIONAL_ASSETS = [
  './icons/icon-192x192.png',
  './icons/icon-512x512.png',
  'https://raw.githubusercontent.com/PosterIran/solar-system/main/solar-system.webp',
  'https://PosterIran.github.io/solar-system/Images/sun.webp',
  'https://PosterIran.github.io/solar-system/Images/mercury.webp',
  'https://PosterIran.github.io/solar-system/Images/venus.webp',
  'https://PosterIran.github.io/solar-system/Images/earth.webp',
  'https://PosterIran.github.io/solar-system/Images/mars.webp'
];

// نصب سرویس ورکر
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('در حال کش کردن منابع اصلی PWA...');
      // ذخیره فایل‌های اصلی
      return cache.addAll(CORE_ASSETS).then(() => {
        // ذخیره تصاویر به مرور در پس‌زمینه (بدون ایجاد وقفه یا خرابی در صورت خطای ۴۰۴)
        OPTIONAL_ASSETS.forEach(asset => {
          fetch(asset).then(response => {
            if (response.ok) cache.put(asset, response);
          }).catch(() => console.log('فایل فرعی در دسترس نبود:', asset));
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

// مدیریت درخواست‌ها و قابلیت آفلاین
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.status === 200) {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return response;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});