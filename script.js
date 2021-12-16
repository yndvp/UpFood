// Menu objects
const cheeseBurger = {
  id: 0,
  name: 'Cheese Burger',
  image: 'img/cheese-burger.jpg',
  price: 6.5,
  quantity: 0,
};
const wagyuBurger = {
  id: 1,
  name: 'Wagyu Burger',
  image: 'img/wagyu-burger.jpg',
  price: 7.8,
  quantity: 0,
};
const spicyChickenBurger = {
  id: 2,
  name: 'Spicy Chicken Burger',
  image: 'img/spicy-burger.jpg',
  price: 6.9,
  quantity: 0,
};
const VeggieBurger = {
  id: 3,
  name: 'Veggie Burger',
  image: 'img/veggie-burger.jpg',
  price: 4.5,
  quantity: 0,
};
const bonelessChicken = {
  id: 4,
  name: 'Boneless Chicken',
  image: 'img/boneless-chicken.png',
  price: 32.9,
  quantity: 0,
};
const soyGarlicChicken = {
  id: 5,
  name: 'Soy Garlic Chicken',
  image: 'img/soy-garlic-chicken.png',
  price: 34.9,
  quantity: 0,
};
const spicyChicken = {
  id: 6,
  name: 'Spicy Chicken',
  image: 'img/spicy-chicken.jpg',
  price: 35.9,
  quantity: 0,
};
const curryChicken = {
  id: 7,
  name: 'Curry Chicken',
  image: 'img/curry-chicken.jpg',
  price: 31.9,
  quantity: 0,
};
const pepperoniPizza = {
  id: 8,
  name: 'Pepperoni Pizza',
  image: 'img/pepperoni-pizza.jpg',
  price: 14.9,
  quantity: 0,
};
const hawaiianPizza = {
  id: 9,
  name: 'Hawaiian Pizza',
  image: 'img/hawaiian-pizza.jpg',
  price: 15.5,
  quantity: 0,
};
const steakPizza = {
  id: 10,
  name: 'Steak Pizza',
  image: 'img/steak-pizza.jpg',
  price: 18.6,
  quantity: 0,
};
const bbpPizza = {
  id: 11,
  name: 'BBQ Pizza',
  image: 'img/bbq-pizza.jpg',
  price: 17.9,
  quantity: 0,
};
const riceNoodles = {
  id: 12,
  name: 'Rice Noodles',
  image: 'img/rice-noodles.jpg',
  price: 12.9,
  quantity: 0,
};
const blackBeanNoodles = {
  id: 13,
  name: 'Black Bean Noodles',
  image: 'img/black-bean-noodles.jpeg',
  price: 14.2,
  quantity: 0,
};
const ramenNoodles = {
  id: 14,
  name: 'Ramen Noodles',
  image: 'img/ramen-noodles.jpg',
  price: 15.9,
  quantity: 0,
};
const chickenNoodles = {
  id: 15,
  name: 'Chicken Noodles',
  image: 'img/chicken-noodles.jpg',
  price: 13.5,
  quantity: 0,
};

const menuArray = [
  cheeseBurger,
  wagyuBurger,
  spicyChickenBurger,
  VeggieBurger,
  bonelessChicken,
  soyGarlicChicken,
  spicyChicken,
  curryChicken,
  pepperoniPizza,
  hawaiianPizza,
  steakPizza,
  bbpPizza,
  riceNoodles,
  blackBeanNoodles,
  ramenNoodles,
  chickenNoodles,
];
let cartArray = [];
const orderArray = [];

// Variables
const cartBtn = document.querySelector('.cart-btn');
const ordersContainer = document.querySelector('.cart-main .menus');
const hisoryContainer = document.querySelector('.history-main .orders');
// Initialize cart items
loadCartItems();
loadOrderHistory();
const minusBtn = document.querySelectorAll('.btn.minus');
const plusBtn = document.querySelectorAll('.btn.plus');
const quantityInput = document.querySelectorAll('.quantity-field');
const quantityInputCart = document.querySelectorAll('.quantity-field.cart');
const quantityInputOrder = document.querySelectorAll('.quantity-field.order');
const removeBtn = document.querySelectorAll('.remove-btn');
const orderBtn = document.querySelector('.order-btn');
const total = document.querySelector('.total-price');

// Minus the quantity by 1 if user press the minus button
minusBtn.forEach((i) => {
  i.addEventListener('click', function (e) {
    let quantityValue = i.parentElement.querySelector('.quantity-field').value;
    if (quantityValue > 0)
      i.parentElement.querySelector('.quantity-field').value -= 1;
    calculateTotalPrice();
  });
});

// Plus the quantity by 1 if user press the minus button
plusBtn.forEach((i) => {
  i.addEventListener('click', function (e) {
    i.parentElement.querySelector('.quantity-field').value =
      Number(i.parentElement.querySelector('.quantity-field').value) + 1;
    calculateTotalPrice();
  });
});

// Push the items to cartArray
const pushToCart = function (i, q) {
  let loadedItems = localStorage.getItem('cart');
  if (!loadedItems) {
    localStorage.setItem('cart', JSON.stringify(cartArray));
    loadedItems = localStorage.getItem('cart');
  }
  const parsedItems = JSON.parse(loadedItems);

  // If cartArray already include the same menu, just update the quantity
  if (Array.from(parsedItems).some((p) => p.id == i)) {
    parsedItems.find((o) => o.id == i).quantity += q;
  }
  // Put quantity of food object and push it into cartArray
  else {
    menuArray[i].quantity = q;
    parsedItems.push(menuArray[i]);
  }
  localStorage.setItem('cart', JSON.stringify(parsedItems));
};

// When user click the add to cart button
if (cartBtn) {
  cartBtn.addEventListener('click', function (e) {
    // Pass the menu and quantity that user added to pushToCart function
    quantityInputCart.forEach((q) => {
      if (q.value > 0) {
        pushToCart(Number(q.id), Number(q.value));
      }
    });

    // Reset the quantity values to 0
    quantityInputCart.forEach((q) => {
      q.value = '0';
    });

    // Let the user decide to go to cart page or not
    const answer = window.confirm(
      `Successfully added to cart
Do you want to view the cart?`
    );
    if (answer) {
      window.location.replace('../cart.html');
    }
  });
}

// Retrieve cart items from local storage and display on the cart page
function loadCartItems() {
  let html = '';
  const loadedItems = localStorage.getItem('cart');
  if (loadedItems) {
    const parsedItems = JSON.parse(loadedItems);

    parsedItems.forEach((o) => {
      html += `<div class="menu">
            <span class="remove-btn">REMOVE</span>
            <div class="menu-detail">
              <img src=${o.image} alt="${o.name.toLowerCase()}" />
              <div class="menu-detail-info">
                <h4 class="name">${o.name}</h4>
                <div class="price">$ ${o.price}0</div>
              </div>
            </div>
            <div class="quantity">
              <input
                class="btn minus"
                type="button"
                value="-"
                class="minus"
              /><input
              id="${o.id}"
                class="quantity-field order"
                type="number"
                step="1"
                min="0"
                max=""
                name="quantity"
                value="${o.quantity}"
              /><input class="btn plus" type="button" value="+" class="plus" />
            </div>
          </div>`;
    });
  } else {
    html = '<h3>There is no item in this cart.</h3>';
  }
  if (ordersContainer) {
    ordersContainer.insertAdjacentHTML('afterbegin', html);
  }
}

// Calculate total price
function calculateTotalPrice() {
  if (total) {
    let totalPrice = 0;
    document.querySelectorAll('.quantity-field.order').forEach((q) => {
      totalPrice += menuArray[q.id].price * q.value;
    });
    const formatter = Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    });
    total.innerText = formatter.format(totalPrice);
  }
}
calculateTotalPrice();

// If user press the remove button, the item will be removed from the cart
if (removeBtn) {
  removeBtn.forEach((b) => {
    b.addEventListener('click', function (e) {
      let loadedItems = localStorage.getItem('cart');
      const parsedItems = JSON.parse(loadedItems);
      const id = Number(b.closest('.menu').querySelector('.quantity-field').id);
      cartArray = parsedItems.filter((c) => {
        return c.id != id;
      });
      b.closest('.menu').remove();
      localStorage.setItem('cart', JSON.stringify(cartArray));
      calculateTotalPrice();
    });
  });
}

// Push the items to orderArray
const pushToOrder = function (i, q) {
  menuArray[i].quantity = q;
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const d = new Date();
  const month = months[d.getMonth()];
  const day = d.getDate();
  menuArray[i].date = `${month} ${day}`;

  let loadedItems = localStorage.getItem('order');
  if (!loadedItems) {
    localStorage.setItem('order', JSON.stringify(orderArray));
    loadedItems = localStorage.getItem('order');
  }
  const parsedItems = JSON.parse(loadedItems);
  parsedItems.push(menuArray[i]);
  localStorage.setItem('order', JSON.stringify(parsedItems));
};

// When user click the place order button
if (orderBtn) {
  orderBtn.addEventListener('click', function (e) {
    // Pass the menu and quantity that user added to pushToCart function
    quantityInputOrder.forEach((q) => {
      if (q.value > 0) {
        pushToOrder(Number(q.id), Number(q.value));
      }
    });

    // Clear the cart items
    cartArray.length = 0;
    localStorage.setItem('cart', JSON.stringify(cartArray));

    // Redirect the user to order history page
    alert('Order Completed');
    window.location.replace('history.html');
  });
}

// Retrieve ordered items from local storage and display on the history page
function loadOrderHistory() {
  let html = '';
  const loadedItems = localStorage.getItem('order');
  if (loadedItems) {
    const parsedItems = JSON.parse(loadedItems);

    parsedItems.forEach((o) => {
      html += `<div class="menu">
        <div class="menu-detail">
          <img src=${o.image} alt="${o.name.toLowerCase()}" />
          <div class="menu-detail-info">
            <h4 class="name">${o.name}</h4>
            <div class="price">$ ${o.price}0 * ${o.quantity}</div>
          </div>
        </div>
        <div class="date">${o.date}</div>
      </div>`;
    });
  } else {
    html = '<h3>There is no order history.</h3>';
  }
  if (hisoryContainer) {
    hisoryContainer.insertAdjacentHTML('afterbegin', html);
  }
}
