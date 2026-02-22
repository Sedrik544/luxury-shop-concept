const products = [
    { 
        id: 1, 
        name: "Noir Classic", 
        price: 3500, 
        // Tento nový odkaz je přímý a stabilní:
        img: "https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=800" 
    },
    { 
        id: 2, 
        name: "L'Homme Blue", 
        price: 2800, 
        img: "https://images.unsplash.com/photo-1550531108-96443834827c?w=800&q=80" 
    },
    { 
        id: 3, 
        name: "Aventos Intense", 
        price: 4100, 
        img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&q=80" 
    }
];

let cart = [];

const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');

function initProducts() {
    productGrid.innerHTML = products.map(p => `
        <div class="product-card group cursor-pointer" onclick="addToCart(${p.id})">
            <div class="img-container mb-6 shadow-sm">
                <img src="${p.img}" alt="${p.name}">
                <div class="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                    <div class="w-full bg-black/80 text-white text-[9px] uppercase tracking-[0.3em] py-4">
                        Přidat do košíku
                    </div>
                </div>
            </div>
            <h3 class="text-xl italic mb-1">${p.name}</h3>
            <p class="text-[11px] uppercase tracking-widest opacity-40">${p.price.toLocaleString()} Kč</p>
        </div>
    `).join('');
}

window.addToCart = (id) => {
    const item = products.find(p => p.id === id);
    cart.push(item);
    updateUI();
    toggleCart(true);
};

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateUI();
};

function updateUI() {
    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="flex gap-6 items-center border-b border-black/5 pb-4">
            <img src="${item.img}" class="w-16 h-20 object-cover bg-gray-100">
            <div class="flex-grow">
                <h4 class="text-sm italic">${item.name}</h4>
                <p class="text-[10px] opacity-40 mt-1">${item.price.toLocaleString()} Kč</p>
            </div>
            <button onclick="event.stopPropagation(); removeFromCart(${index})" class="text-[9px] uppercase opacity-20 hover:opacity-100">Odstranit</button>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    cartTotal.innerText = `${total.toLocaleString()} Kč`;
}

function toggleCart(open) {
    if (open) {
        cartSidebar.classList.add('open');
        overlay.classList.add('show');
        overlay.classList.remove('hidden');
    } else {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('show');
        setTimeout(() => overlay.classList.add('hidden'), 500);
    }
}

document.getElementById('cart-icon').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
overlay.onclick = () => toggleCart(false);

initProducts();
