// JavaScript para formatear los precios en el menú
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los elementos li que contienen precios
    const menuItems = document.querySelectorAll('section ul li');
    
    menuItems.forEach(item => {
        const text = item.textContent;
        
        // Buscar el patrón de precio (número + €)
        const priceMatch = text.match(/(\d+,?\d*€)/);
        
        if (priceMatch) {
            const price = priceMatch[0];
            const itemName = text.replace(price, '').trim();
            
            // Limpiar el contenido y crear la nueva estructura
            item.innerHTML = `
                <span class="item-name">${itemName}</span>
                <span class="item-price">${price}</span>
            `;
        }
    });
    
    // Agregar efectos de brillo ocasionales
    setInterval(() => {
        const randomSection = document.querySelectorAll('section')[Math.floor(Math.random() * document.querySelectorAll('section').length)];
        randomSection.classList.add('shimmer');
        setTimeout(() => {
            randomSection.classList.remove('shimmer');
        }, 2000);
    }, 5000);
});

// JavaScript para el menú de navegación de secciones
document.addEventListener('DOMContentLoaded', function() {
    
    // Crear el menú de navegación
    function createNavigationMenu() {
        const sections = document.querySelectorAll('section');
        
        // Asignar IDs a las secciones si no los tienen
        sections.forEach((section, index) => {
            const h2 = section.querySelector('h2');
            if (h2) {
                const sectionId = h2.textContent.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '');
                section.id = sectionId;
            }
        });
        
        // Crear el HTML del menú
        const menuHTML = `
            <nav class="menu-navigation">
                <div class="menu-nav-title">🍽️ Ir a Sección</div>
                <div class="menu-nav-links">
                    <a href="#tapas" class="menu-nav-link">🍤 Tapas</a><Br>
                    <a href="#ensaladas" class="menu-nav-link">🥗 Ensaladas</a><Br>
                    <a href="#hamburguesas" class="menu-nav-link">🍔 Hamburguesas</a><Br>
                    <a href="#bocadillos" class="menu-nav-link">🥪 Bocadillos</a><Br>
                    <a href="#pizzas" class="menu-nav-link">🍕 Pizzas</a><Br>
                    <a href="#carne-y-pescado" class="menu-nav-link">🥩 Carne y Pescado</a><Br>
                    <a href="#postres" class="menu-nav-link">🍰 Postres</a><Br>
                </div>
            </nav>
        `;
        
        // Insertar el menú después del título principal
        const mainTitle = document.querySelector('h1');
        if (mainTitle) {
            mainTitle.insertAdjacentHTML('afterend', menuHTML);
        }
    }
    
    // Función para destacar la sección activa
    function highlightActiveSection() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.menu-nav-link');
        
        // Configurar el observer para detectar qué sección está visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    
                    // Remover clase active de todos los enlaces
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Agregar clase active al enlace correspondiente
                    const activeLink = document.querySelector(`a[href="#${sectionId}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-100px 0px -100px 0px'
        });
        
        // Observar todas las secciones
        sections.forEach(section => {
            observer.observe(section);
        });
    }
    
    // Función para scroll suave personalizado
    function setupSmoothScroll() {
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('menu-nav-link')) {
                e.preventDefault();
                const targetId = e.target.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navHeight = document.querySelector('.navbar').offsetHeight;
                    const menuHeight = document.querySelector('.menu-navigation').offsetHeight;
                    const offset = navHeight + menuHeight + 20;
                    
                    const targetPosition = targetSection.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // Función para mostrar/ocultar el menú según el scroll
    function setupMenuVisibility() {
        const menu = document.querySelector('.menu-navigation');
        const mainTitle = document.querySelector('h1');
        
        if (!menu || !mainTitle) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    menu.style.opacity = '0';
                    menu.style.transform = 'translateY(-20px)';
                    setTimeout(() => {
                        menu.style.display = 'none';
                    }, 300);
                } else {
                    menu.style.display = 'block';
                    setTimeout(() => {
                        menu.style.opacity = '1';
                        menu.style.transform = 'translateY(0)';
                    }, 10);
                }
            });
        }, {
            threshold: 0.1
        });
        
        observer.observe(mainTitle);
    }
    
    // Función para agregar efectos de hover adicionales
    function setupHoverEffects() {
        const navLinks = document.querySelectorAll('.menu-nav-link');
        
        navLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
    
    // Inicializar todas las funciones
    createNavigationMenu();
    
    // Esperar un poco para que el DOM esté completamente cargado
    setTimeout(() => {
        highlightActiveSection();
        setupSmoothScroll();
        setupMenuVisibility();
        setupHoverEffects();
    }, 100);
    
    // Formatear precios (código anterior)
    const menuItems = document.querySelectorAll('section ul li');
    
    menuItems.forEach(item => {
        const text = item.textContent;
        const priceMatch = text.match(/(\d+,?\d*€)/);
        
        if (priceMatch) {
            const price = priceMatch[0];
            const itemName = text.replace(price, '').trim();
            
            item.innerHTML = `
                <span class="item-name">${itemName}</span>
                <span class="item-price">${price}</span>
            `;
        }
    });
    
    // Efecto de brillo ocasional
    setInterval(() => {
        const sections = document.querySelectorAll('section');
        const randomSection = sections[Math.floor(Math.random() * sections.length)];
        randomSection.classList.add('shimmer');
        setTimeout(() => {
            randomSection.classList.remove('shimmer');
        }, 2000);
    }, 5000);
});