function getItemsFromCart() {
  var cartItems = getItemFromLocalStorage('cart');
  console.log(cartItems[ 0 ]);

  $('.cart-item').remove();

  cartItems.forEach(function (cartItem) {
    var cartItemElement = createCartItem(cartItem);
    $('#cart').append(cartItemElement);
  });
}

function createCartItem(cartItem) {
  var itemContainer = $('<div class="cart-item">');

  var itemName = $('<h1>').text(cartItem.name);
  var itemDesc = $('<p>').text(cartItem.description);

  var infoContainer = $('<div class="info-container">');
  var itemAlcohol = $('<div class="label">').text(cartItem.alcohol + '%');
  var itemPrice = $('<div class="label">').text(cartItem.price + ' SEK');

  var itemQuantity = $('<div class="quantity">').text(cartItem.quantity + ' st');
  itemQuantity.attr('id', cartItem._id);

  var itemButton = $('<button>TA BORT</button>').click(function () {
    deleteItemFromCart(cartItem);
  });

  var buttonSubtract = $('<button>minska</button>').click(function () {
    subtractQuantity(cartItem);
  });

  var buttonAdd = $('<button>addera</button>').click(function () {
    addQuantity(cartItem);
  });

  infoContainer.append(itemPrice, itemAlcohol);

  var itemType = $('<div>').text(cartItem.type);

  return itemContainer.append(itemName, itemDesc, infoContainer, itemType, itemQuantity, itemButton, buttonSubtract, buttonAdd);
}


// remove item from cart
function deleteItemFromCart(cartItem) {
  var cart = getItemFromLocalStorage('cart');
  console.log(cart);

  var filteredCart = cart.filter(function (item) {
    return item._id !== cartItem._id
  });

  console.log(filteredCart);

  localStorage.setItem('cart', JSON.stringify(filteredCart));

  var x = JSON.parse(localStorage.getItem('cart'));
  console.log(x);

  getItemsFromCart();
}

function subtractQuantity(cartItem) {
  var cart = getItemFromLocalStorage('cart');

  cart.forEach(function (item) {
    if ( item._id === cartItem._id ) {

      if ( item.quantity > 1 ) {
        item.quantity--;
        $('#' + cartItem._id).text(item.quantity + ' st');

        localStorage.setItem('cart', JSON.stringify(cart));
      }
    }
  });
}

function addQuantity(cartItem) {
  var cart = getItemFromLocalStorage('cart');

  cart.forEach(function (item) {
    if ( item._id === cartItem._id ) {
      item.quantity++;
      $('#' + cartItem._id).text(item.quantity + ' st');

      localStorage.setItem('cart', JSON.stringify(cart));
    }
  });
}

function getItemFromLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

getItemsFromCart();
