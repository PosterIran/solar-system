document.addEventListener('DOMContentLoaded', () => {
    const planetCards = document.querySelectorAll('.planet-card');
    const modalContainer = document.getElementById('modal-container');

    const planetData = {
        mercury: {
            name: 'عطارد',
            description: 'عطارد کوچکترین و نزدیکترین سیاره به خورشید است. یک روز در آنجا حدود ۱۷۶ روز زمینی طول می‌کشد و یک سال آن ۸۸ روز زمینی است. عطارد هیچ قمر یا حلقه‌ای ندارد.'
        },
        venus: {
            name: 'زهره',
            description: 'زهره دومین سیاره از خورشید و داغ‌ترین سیاره منظومه شمسی است. به دلیل جو غلیظ دی‌اکسید کربن خود، داغ‌تر از عطارد است. زهره هم مانند عطارد قمری ندارد.'
        },
        earth: {
            name: 'زمین',
            description: 'زمین تنها سیاره شناخته شده‌ای است که از حیات پشتیبانی می‌کند. ۷۰٪ سطح آن را آب پوشانده و دارای یک قمر به نام ماه است. زمین سومین سیاره از خورشید است.'
        },
        mars: {
            name: 'مریخ',
            description: 'مریخ به دلیل رنگ قرمزش به سیاره سرخ معروف است. این سیاره دارای دو قمر به نام‌های فوبوس و دیموس و بزرگترین کوه آتشفشانی منظومه شمسی به نام المپوس مونس است.'
        },
        jupiter: {
            name: 'مشتری',
            description: 'مشتری بزرگترین سیاره منظومه شمسی است و یک غول گازی محسوب می‌شود. این سیاره بیش از دو برابر جرم تمام سیارات دیگر است و دارای ۷۹ قمر شناخته شده است.'
        },
        saturn: {
            name: 'زحل',
            description: 'زحل ششمین سیاره از خورشید و دومین غول گازی بزرگ است. این سیاره به خاطر حلقه‌های درخشان و خیره‌کننده‌اش که از ذرات یخ و سنگ تشکیل شده‌اند، مشهور است.'
        },
        uranus: {
            name: 'اورانوس',
            description: 'اورانوس هفتمین سیاره و یک غول یخی است. این سیاره به پهلو می‌چرخد، به طوری که محور چرخش آن تقریباً موازی با مدارش به دور خورشید است. اورانوس دارای ۲۷ قمر است.'
        },
        neptune: {
            name: 'نپتون',
            description: 'نپتون دورترین سیاره شناخته شده از خورشید و بادخیزترین سیاره است. این سیاره دارای بادهایی با سرعت‌های بسیار بالا و ۱۴ قمر است. نپتون یک غول یخی آبی رنگ است.'
        }
    };

    const solarSystemData = {
        name: 'منظومه خورشیدی',
        description: 'منظومه خورشیدی ما شامل خورشید، هشت سیاره اصلی، سیارات کوتوله، قمرها، سیارک‌ها و دنباله‌دارها است. این منظومه در کهکشان راه شیری قرار دارد.'
    };
    
    if (solarSystemTitle) {
        solarSystemTitle.addEventListener('click', () => {
            modalContainer.style.display = 'flex';
            modalContainer.innerHTML = `
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>${solarSystemData.name}</h2>
                        <button class="close-button">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${solarSystemData.description}</p>
                    </div>
                </div>
            `;
            
            document.querySelector('.close-button').addEventListener('click', () => {
                modalContainer.style.display = 'none';
            });
        });
    }
    
    planetCards.forEach(card => {
        card.addEventListener('click', () => {
            const planetKey = card.dataset.planet;
            const data = planetData[planetKey];
            
            if (data) {
                modalContainer.style.display = 'flex';
                modalContainer.innerHTML = `
                    <div class="modal-content">
                        <div class="modal-header">
                            <h2>${data.name}</h2>
                            <button class="close-button">&times;</button>
                        </div>
                        <div class="modal-body">
                            <p>${data.description}</p>
                        </div>
                    </div>
                `;
                
                document.querySelector('.close-button').addEventListener('click', () => {
                    modalContainer.style.display = 'none';
                });
            }
        });
    });
    
    modalContainer.addEventListener('click', (e) => {
        if (e.target.id === 'modal-container') {
            modalContainer.style.display = 'none';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const headerLogo = document.querySelector('.header-logo');
    
    if (headerLogo) {
        headerLogo.addEventListener('click', () => {
            headerLogo.classList.toggle('enlarged');
        });
    }
});