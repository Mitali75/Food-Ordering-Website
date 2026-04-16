function addToCart(itemName, price) {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        alert("Please login first to add items to cart.");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: itemName, price: price });
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(itemName + " added to cart!");
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartList = document.getElementById('cart-list');
    let totalPrice = document.getElementById('total-price');

    if (!cartList || !totalPrice) return;

    cartList.innerHTML = '';
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        let li = document.createElement('li');
        li.textContent = cart[i].name + " - ₹" + cart[i].price;
        cartList.appendChild(li);
        total += cart[i].price;
    }

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Your cart is empty.</li>';
    }

    totalPrice.textContent = "Total Price: ₹" + total;
}

function clearCart() {
    localStorage.removeItem('cart');
    displayCart();
}

function goToOrder() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!currentUser) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    window.location.href = "order.html";
}

function loadOrderSummary() {
    let summaryBox = document.getElementById('order-summary');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!summaryBox) return;

    if (cart.length === 0) {
        summaryBox.innerHTML = "<p>No items in cart.</p>";
        return;
    }

    let total = 0;
    let html = "<h3>Order Summary</h3><ul>";

    for (let i = 0; i < cart.length; i++) {
        html += `<li>${cart[i].name} - ₹${cart[i].price}</li>`;
        total += cart[i].price;
    }

    html += `</ul><p><strong>Total: ₹${total}</strong></p>`;
    summaryBox.innerHTML = html;
}

function placeOrder(event) {
    event.preventDefault();

    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert("Please login first.");
        window.location.href = "login.html";
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("Your cart is empty.");
        window.location.href = "cart.html";
        return;
    }

    let name = document.getElementById('name').value;
    let address = document.getElementById('address').value;
    let phone = document.getElementById('phone').value;
    let message = document.getElementById('order-message');

    message.textContent = "Thank you, " + name + "! Your order has been placed successfully.";
    localStorage.removeItem('cart');

    document.getElementById('name').value = "";
    document.getElementById('address').value = "";
    document.getElementById('phone').value = "";

    let summaryBox = document.getElementById('order-summary');
    if (summaryBox) {
        summaryBox.innerHTML = "<p>Your cart is now empty.</p>";
    }
}

function registerUser(event) {
    event.preventDefault();

    let name = document.getElementById('register-name').value;
    let email = document.getElementById('register-email').value;
    let password = document.getElementById('register-password').value;

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem('registeredUser', JSON.stringify(user));
    document.getElementById('register-message').textContent = "Registration successful!";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
}

function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById('login-email').value;
    let password = document.getElementById('login-password').value;

    let registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(registeredUser));
        document.getElementById('login-message').textContent = "Login successful!";

        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        document.getElementById('login-message').textContent = "Invalid email or password";
        document.getElementById('login-message').style.color = "red";
    }
}

function showUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let profileLink = document.getElementById('profile-link');

    if (currentUser && profileLink) {
        profileLink.textContent = currentUser.name.charAt(0).toUpperCase();
        profileLink.href = "login.html";
        profileLink.title = "Logged in as " + currentUser.name;
    }
}

function handleSearch(event) {
    if (event.key === "Enter") {
        let value = event.target.value.toLowerCase().trim();

        if (value === "pizza") {
            window.location.href = "menu.html?category=Pizza";
        } else if (value === "burger") {
            window.location.href = "menu.html?category=Burger";
        } else if (value === "noodles") {
            window.location.href = "menu.html?category=Noodles";
        } else if (value === "dessert") {
            window.location.href = "menu.html?category=Dessert";
        } else if (value === "sandwich") {
            window.location.href = "menu.html?category=Sandwich";
        } else if (value === "toscano") {
            window.location.href = "restaurant.html?name=Toscano";
        } else if (value === "tsuki") {
            window.location.href = "restaurant.html?name=Tsuki";
        } else if (value === "aasmana") {
            window.location.href = "restaurant.html?name=Aasmana";
        } else if (value === "paasha") {
            window.location.href = "restaurant.html?name=Paasha";
        } else {
            alert("No matching food or restaurant found");
        }
    }
}

function loadMenuPage() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    const menuTitle = document.getElementById("menu-title");
    const menuSubtitle = document.getElementById("menu-subtitle");
    const menuItems = document.getElementById("menu-items");

    if (!menuItems) return;

    let items = [];

    if (category === "Pizza") {
        menuTitle.textContent = "Pizza Menu";
        menuSubtitle.textContent = "Choose your favourite pizza";
        items = [
            { name: "Cheesy Delight Pizza", price: 250, icon: "🍕", desc: "Cheesy and delicious pizza" },
            { name: "Veg Pizza", price: 230, icon: "🍕", desc: "Veg loaded pizza" },
            { name: "Margherita Pizza", price: 240, icon: "🍕", desc: "Classic margherita" }
        ];
    } else if (category === "Burger") {
        menuTitle.textContent = "Burger Menu";
        menuSubtitle.textContent = "Choose your favourite burger";
        items = [
            { name: "Classic Burger", price: 180, icon: "🍔", desc: "Juicy burger with fillings" },
            { name: "Veg Burger", price: 150, icon: "🍔", desc: "Fresh veg burger" },
            { name: "Cheese Burger", price: 190, icon: "🍔", desc: "Burger with cheese" }
        ];
    } else if (category === "Noodles") {
        menuTitle.textContent = "Noodles Menu";
        menuSubtitle.textContent = "Choose your favourite noodles";
        items = [
            { name: "Hakka Noodles", price: 160, icon: "🍜", desc: "Hot and spicy noodles" },
            { name: "Schezwan Noodles", price: 170, icon: "🍜", desc: "Spicy schezwan noodles" },
            { name: "Veg Noodles", price: 150, icon: "🍜", desc: "Simple veg noodles" }
        ];
    } else if (category === "Dessert") {
        menuTitle.textContent = "Dessert Menu";
        menuSubtitle.textContent = "Choose your favourite dessert";
        items = [
            { name: "Chocolate Ice Cream", price: 120, icon: "🍨", desc: "Creamy chocolate dessert" },
            { name: "Brownie", price: 140, icon: "🍰", desc: "Soft brownie" },
            { name: "Waffle", price: 160, icon: "🧇", desc: "Crispy waffle dessert" }
        ];
    } else if (category === "Sandwich") {
        menuTitle.textContent = "Sandwich Menu";
        menuSubtitle.textContent = "Choose your favourite sandwich";
        items = [
            { name: "Veg Sandwich", price: 110, icon: "🥪", desc: "Fresh sandwich" },
            { name: "Grilled Sandwich", price: 130, icon: "🥪", desc: "Crispy grilled sandwich" },
            { name: "Cheese Sandwich", price: 140, icon: "🥪", desc: "Sandwich with cheese" }
        ];
    } else {
        menuTitle.textContent = "Our Menu";
        menuSubtitle.textContent = "Choose your favourite food";
        items = [
            { name: "Cheesy Delight Pizza", price: 250, icon: "🍕", desc: "Cheesy and delicious pizza" },
            { name: "Classic Burger", price: 180, icon: "🍔", desc: "Juicy burger" },
            { name: "Hakka Noodles", price: 160, icon: "🍜", desc: "Hot and spicy noodles" }
        ];
    }

    menuItems.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        menuItems.innerHTML += `
            <div class="food-card">
                <div class="food-img">${items[i].icon}</div>
                <h4>${items[i].name}</h4>
                <p>${items[i].desc}</p>
                <span>₹${items[i].price}</span><br>
                <button onclick="addToCart('${items[i].name}', ${items[i].price})">Add to Cart</button>
            </div>
        `;
    }
}

function loadRestaurantPage() {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");

    const restaurantTitle = document.getElementById("restaurant-title");
    const restaurantSubtitle = document.getElementById("restaurant-subtitle");
    const restaurantItems = document.getElementById("restaurant-items");

    if (!restaurantItems) return;

    let items = [];

    if (name === "Toscano") {
        restaurantTitle.textContent = "Toscano";
        restaurantSubtitle.textContent = "Italian food, pasta, pizza";
        items = [
            { name: "Pasta Alfredo", price: 320, icon: "🍝", desc: "Creamy white sauce pasta" },
            { name: "Margherita Pizza", price: 350, icon: "🍕", desc: "Classic italian pizza" },
            { name: "Garlic Bread", price: 180, icon: "🍞", desc: "Buttery garlic bread" }
        ];
    } else if (name === "Tsuki") {
        restaurantTitle.textContent = "Tsuki";
        restaurantSubtitle.textContent = "Japanese food, sushi, noodles";
        items = [
            { name: "Sushi Roll", price: 400, icon: "🍣", desc: "Fresh sushi rolls" },
            { name: "Ramen", price: 280, icon: "🍜", desc: "Japanese ramen bowl" },
            { name: "Tempura", price: 300, icon: "🍤", desc: "Crispy tempura" }
        ];
    } else if (name === "Aasmana") {
        restaurantTitle.textContent = "Aasmana";
        restaurantSubtitle.textContent = "Fine dining, Indian food";
        items = [
            { name: "Paneer Tikka", price: 290, icon: "🍢", desc: "Tandoori paneer starter" },
            { name: "Dal Makhani", price: 260, icon: "🥘", desc: "Creamy dal makhani" },
            { name: "Butter Naan", price: 70, icon: "🫓", desc: "Soft butter naan" }
        ];
    } else if (name === "Paasha") {
        restaurantTitle.textContent = "Paasha";
        restaurantSubtitle.textContent = "Luxury dining, North Indian";
        items = [
            { name: "Chicken Biryani", price: 380, icon: "🍛", desc: "Rich biryani" },
            { name: "Kebab Platter", price: 420, icon: "🍢", desc: "Mixed kebab platter" },
            { name: "Mutton Curry", price: 450, icon: "🥘", desc: "Spicy mutton curry" }
        ];
    } else {
        restaurantTitle.textContent = "Restaurant";
        restaurantSubtitle.textContent = "Restaurant menu";
    }

    restaurantItems.innerHTML = "";

    for (let i = 0; i < items.length; i++) {
        restaurantItems.innerHTML += `
            <div class="food-card">
                <div class="food-img">${items[i].icon}</div>
                <h4>${items[i].name}</h4>
                <p>${items[i].desc}</p>
                <span>₹${items[i].price}</span><br>
                <button onclick="addToCart('${items[i].name}', ${items[i].price})">Add to Cart</button>
            </div>
        `;
    }
}