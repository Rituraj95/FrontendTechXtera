window.onscroll = () =>{
    if (window.scrollY > 60) {
        document.querySelector('#scroll-top').classList.add('active');
        
    } else {
        document.querySelector('#scroll-top').classList.remove('active');
    }
}

function loader(){
    document.querySelector('.loader-container').classList.add('fade-out');
}

function fadeOut(){
    setInterval(loader, 3000);
}

window.onload = fadeOut();

 // Initialize an empty cart
 let cart = [];

 // Function to add item to the cart
 function addToCart(button) {
     const id = button.getAttribute('data-id');
     const name = button.getAttribute('data-name');
     const price = button.getAttribute('data-price');

     // Create an item object
     const item = {
         id: id,
         name: name,
         price: price
     };

     // Add item to cart
     cart.push(item);

     // Update the cart display
     updateCart();
 }

 // Function to display the cart and update navbar cart count
 function updateCart() {
     const cartContainer = document.getElementById('cart-container');
     cartContainer.innerHTML = '<h3>Your Cart</h3>'; // Clear previous cart items

     let total = 0;

     cart.forEach(item => {
         total += parseInt(item.price);

         const cartItem = document.createElement('div');
         cartItem.classList.add('cart-item');
         cartItem.innerHTML = `
             <span>${item.name}</span> - 
             <span>₹${item.price}</span>
         `;
         cartContainer.appendChild(cartItem);
     });

     // Display total price
     const totalContainer = document.getElementById('total-price');
     totalContainer.innerText = `Total: ₹${total}`;

     // Update the cart count in the navbar
     const cartCount = document.getElementById('cart-count');
     cartCount.innerText = cart.length;
 }

 // Optional: A function to handle cart checkout
 function checkout() {
     if (cart.length > 0) {
         alert('Proceeding to checkout!');
         // You can add further logic here to handle checkout, like redirecting to a payment page
     } else {
         alert('Your cart is empty!');
     }
 }
 function showCart() {
    const cartSection = document.getElementById('cart-section');

    // Dynamically load the cart content from 'cart-content.html'
    fetch('cart.html')
        .then(response => response.text())
        .then(data => {
            // Inject the cart content into the page
            cartSection.innerHTML = data;

            // Populate the cart items and total price
            const cartItemsContainer = document.getElementById('cart-items');
            const totalPriceContainer = document.getElementById('total-price');
            let total = 0;
            cartItemsContainer.innerHTML = ''; // Clear previous items

            cart.forEach(item => {
                total += parseInt(item.price);

                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name}</span> - ₹${item.price}
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            totalPriceContainer.innerText = `Total: ₹${total}`;
        })
        .catch(err => console.error('Error loading cart content:', err));
}
