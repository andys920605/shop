const addToCartButtons = document.querySelectorAll('.add-to-cart');
  
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

function addToCart(event) {
  const button = event.target;
  const card = button.closest('.card');
  const productId = card.getAttribute('data-id');
  const productName = card.getAttribute('data-name');
  const productPrice = card.getAttribute('data-price');

  const cart = getCart();
  const existingProduct = cart.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
  }

  saveCart(cart);
  updateCartItems();
  alert(`${productName} 已成功加入購物車！`);
}

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

const cartButton = document.querySelector('.cart-button');
const cartPopup = document.querySelector('.cart-popup');
const cartItemsList = document.querySelector('.cart-items');

function toggleCartPopup() {
  if (cartPopup.style.display === 'none') {
    showCartPopup();
  } else {
    hideCartPopup();
  }
}

function showCartPopup() {
  cartPopup.style.display = 'block';
  updateCartItems();
}

function hideCartPopup() {
  cartPopup.style.display = 'none';
}

function updateCartItems() {
  const cart = getCart();
  cartItemsList.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${item.name} x ${item.quantity} - $${item.price * item.quantity}
    `;
    cartItemsList.appendChild(li);
  });
}

function clearCart() {
  localStorage.removeItem('cart');
  updateCartItems();
  alert('購物車已清空！');
}