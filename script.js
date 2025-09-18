document.addEventListener('DOMContentLoaded', () => {
    const planetCards = document.querySelectorAll('.planet-card');
    const modalContainer = document.getElementById('modal-container');
    const solarSystemTitle = document.getElementById('solar-system-title');
    
    const planetData = {
        mercury: {
            name: 'عطارد',
            description: 'عطارد کوچکترین سیاره در منظومه خورشیدی و نزدیکترین سیاره به خورشید است. به دلیل نزدیکی به خورشید، دمای سطح آن نوسان زیادی دارد.'
        },
        venus: {
            name: 'زهره',
            description: 'زهره دومین سیاره از خورشید است و به دلیل جو غلیظ کربن دی‌اکسید خود، گرمترین سیاره منظومه خورشیدی است.'
        },
        earth: {
            name: 'زمین',
            description: 'زمین تنها سیاره شناخته شده‌ای است که حیات در آن وجود دارد. این سیاره دارای یک قمر طبیعی به نام ماه است.'
        },
        mars: {
            name: 'مریخ',
            description: 'مریخ به دلیل خاک قرمز رنگش، به سیاره سرخ معروف است. این سیاره دو قمر کوچک به نام‌های فوبوس و دیموس دارد.'
        },
        jupiter: {
            name: 'مشتری',
            description: 'مشتری بزرگترین سیاره منظومه خورشیدی و یک غول گازی است. لکه سرخ بزرگ آن یک طوفان عظیم و پایدار است.'
        },
        saturn: {
            name: 'زحل',
            description: 'زحل بیشتر به خاطر سیستم حلقه‌های خیره‌کننده‌اش شناخته می‌شود که از ذرات یخ و سنگ تشکیل شده‌اند.'
        },
        uranus: {
            name: 'اورانوس',
            description: 'اورانوس یک غول یخی است که به صورت افقی به دور خورشید می‌چرخد. جو آن عمدتاً از هیدروژن و هلیوم تشکیل شده است.'
        },
        neptune: {
            name: 'نپتون',
            description: 'نپتون دورترین سیاره شناخته شده از خورشید است. این سیاره نیز یک غول یخی است و بادهای بسیار شدیدی دارد.'
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