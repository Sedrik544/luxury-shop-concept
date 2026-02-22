const products = [
    // Najdi v script.js tuto část a přepiš ji:
{ 
    id: 1, 
    name: "Noir Distillé", 
    price: 3200, 
    img: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600" 
}
    { id: 2, name: "Santal Blanc", price: 2850, img: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=600" },
    { id: 3, name: "Ambre Lumière", price: 4100, img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=600" }
];

let cart = [];

// 1. Vygenerovat produkty
const productGrid = document.getElementById('product-grid');
products.forEach(p => {
    productGrid.innerHTML += `
        <div class="product-card">
            <div class="img-container mb-6">
                <img src="${p.img}" alt="${p.name}">
                <button onclick="addToCart(${p.id})" class="absolute bottom-0 left-0 w-full bg-black/90 text-white py-4 opacity-0 hover:opacity-100 transition-opacity uppercase text-[10px] tracking-[0.2em]">Přidat do košíku</button>
            </div>
            <h3 class="text-xl italic mb-2">${p.name}</h3>
            <p class="opacity-60 text-sm font-light">${p.price.toLocaleString()} Kč</p>
        </div>
    `;
});

// 2. Logika košíku
window.addToCart = (id) => {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCart();
    toggleCart(true);
};

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    cartCount.innerText = cart.length;
    cartItems.innerHTML = '';
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        cartItems.innerHTML += `
            <div class="flex justify-between items-center border-b border-black/5 pb-4">
                <div class="flex items-center gap-4">
                    <img src="${item.img}" class="w-12 h-16 object-cover">
                    <div>
                        <p class="text-sm italic">${item.name}</p>
                        <p class="text-[10px] opacity-50">${item.price.toLocaleString()} Kč</p>
                    </div>
                </div>
                <button onclick="removeFromCart(${index})" class="text-[10px] uppercase opacity-40 hover:opacity-100">Odstranit</button>
            </div>
        `;
    });
    cartTotal.innerText = `${total.toLocaleString()} Kč`;
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateCart();
};

// 3. UI Ovládání
const cartSidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');

function toggleCart(show) {
    if (show) {
        cartSidebar.classList.add('open');
        overlay.classList.add('show');
    } else {
        cartSidebar.classList.remove('open');
        overlay.classList.remove('show');
    }
}

document.getElementById('cart-icon').onclick = () => toggleCart(true);
document.getElementById('close-cart').onclick = () => toggleCart(false);
overlay.onclick = () => toggleCart(false);
