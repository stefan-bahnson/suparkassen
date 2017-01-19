var BASE_URL = 'http://localhost:3000/api/';

function getProducts() {
  $.ajax({
    url: BASE_URL + 'products',
    type: 'GET',
    success: renderProducts,
    error: function (err) {
      console.error(err.message);
    }
  });
}