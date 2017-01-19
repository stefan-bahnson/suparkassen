function saveToCart(data) {
  var items = JSON.parse(localStorage.getItem('cart'));
  var isInCart = false;

  if ( !items ) {
    items = [];
  } else {
    items.forEach(function (item) {
      if ( item._id === data._id ) {
        item.quantity += data.quantity;
        isInCart = true;
      }
    })
  }

  if ( !isInCart ) {
    items.push(data);
  }

  localStorage.setItem('cart', JSON.stringify(items));
}

function getCart() {
  var cart = JSON.parse(localStorage.getItem('cart'));
  return cart;
}

function handleCheckout() {
  // get firstname from input etc

  var order = {
    firstname: 'firstname', // etc
    items: getCart()
  };

  console.log(order);
}