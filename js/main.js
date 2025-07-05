// JavaScript sencillo para tooltips en móviles
document.addEventListener('DOMContentLoaded', function() {
    
    // Función para manejar tooltips en móviles
    function setupMobileTooltips() {
        const tooltipItems = document.querySelectorAll('[data-tooltip]');
        
        tooltipItems.forEach(item => {
            // En móviles: mostrar/ocultar al hacer tap
            item.addEventListener('click', function(e) {
                // Solo en dispositivos móviles
                if (window.innerWidth <= 768 || !window.matchMedia('(hover: hover)').matches) {
                    e.preventDefault();
                    
                    // Ocultar todos los otros tooltips
                    tooltipItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('show-tooltip');
                        }
                    });
                    
                    // Toggle del tooltip actual
                    item.classList.toggle('show-tooltip');
                    
                    // Ajustar posición si se sale de la pantalla
                    setTimeout(() => {
                        adjustTooltipPosition(item);
                    }, 10);
                }
            });
        });
        
        // Cerrar tooltips al hacer click fuera
        document.addEventListener('click', function(e) {
            if (!e.target.closest('[data-tooltip]')) {
                tooltipItems.forEach(item => {
                    item.classList.remove('show-tooltip');
                });
            }
        });
    }
    
    // Función para ajustar posición del tooltip
    function adjustTooltipPosition(element) {
        const rect = element.getBoundingClientRect();
        const tooltipWidth = 250;
        
        // Limpiar clases anteriores
        element.classList.remove('tooltip-left', 'tooltip-right');
        
        // Si se sale por la izquierda
        if (rect.left < tooltipWidth / 2) {
            element.classList.add('tooltip-left');
        }
        // Si se sale por la derecha
        else if (rect.right > window.innerWidth - tooltipWidth / 2) {
            element.classList.add('tooltip-right');
        }
    }
    
    // Función para el formato de precios (código anterior)
    function formatPrices() {
        const menuItems = document.querySelectorAll('section ul li');
        
        menuItems.forEach(item => {
            const text = item.textContent;
            const priceMatch = text.match(/(\d+,?\d*€)/);
            
            if (priceMatch) {
                const price = priceMatch[0];
                const itemName = text.replace(price, '').trim();
                
                // Mantener el data-tooltip
                const tooltip = item.getAttribute('data-tooltip');
                
                item.innerHTML = `
                    <span class="item-name">${itemName}</span>
                    <span class="item-price">${price}</span>
                `;
                
                // Restaurar el tooltip
                if (tooltip) {
                    item.setAttribute('data-tooltip', tooltip);
                }
            }
        });
    }
    
    // Función para crear menú de navegación (código anterior)
    function createNavigationMenu() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const h2 = section.querySelector('h2');
            if (h2) {
                const sectionId = h2.textContent.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '');
                section.id = sectionId;
            }
        });
        
        const menuHTML = `
            <nav class="menu-navigation">
                <div class="menu-nav-title">🍽️ ¿¿que te apetece??</div>
                <div class="menu-nav-links">
                    <a href="#tapas" class="menu-nav-link">🍤 Tapas</a><br>
                    <a href="#ensaladas" class="menu-nav-link">🥗 Ensaladas</a><br>
                    <a href="#hamburguesas" class="menu-nav-link">🍔 Hamburguesas</a><br>
                    <a href="#bocadillos" class="menu-nav-link">🥪 Bocadillos</a><br>
                    <a href="#pizzas" class="menu-nav-link">🍕 Pizzas</a><br>
                    <a href="#carne-y-pescado" class="menu-nav-link">🥩 Carne y Pescado</a><br>
                    <a href="#postres" class="menu-nav-link">🍰 Postres</a><br>
                </div>
            </nav>
        `;
        
        const mainTitle = document.querySelector('h1');
        if (mainTitle) {
            mainTitle.insertAdjacentHTML('afterend', menuHTML);
        }
    }
    
    // Inicializar todas las funciones
    setupMobileTooltips();
    formatPrices();
    createNavigationMenu();
    
    // Re-detectar dispositivos móviles al cambiar orientación
    window.addEventListener('resize', function() {
        const tooltipItems = document.querySelectorAll('[data-tooltip]');
        tooltipItems.forEach(item => {
            item.classList.remove('show-tooltip');
        });
    });
    
});