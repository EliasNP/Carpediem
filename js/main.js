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