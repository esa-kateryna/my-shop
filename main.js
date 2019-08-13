//чекбокс начало
const checkbox = document.getElementById("discount-checkbox");

checkbox.addEventListener("change", function() {
  if (this.checked) {
    this.nextElementSibling.classList.add("checked");
  } else {
    this.nextElementSibling.classList.remove("checked");
  }
});

/*если чекбоксов несколько, то находить все элементы по классу
const checkbox = document.querySelectorAll('.class-name');

и перебирать каждый через цыкл фор(чтобы не писать для каждого функцию)
for (let i = 0; i < checkbox.length; i++){
    checkbox[i].addEventListener('change', function(){
    if (this.checked){
        this.nextElementSibling.classList.add('checked');
    } else {
        this.nextElementSibling.classList.remove('checked');
    }
});
}

ИЛИ forEach
const checkbox = document.querySelectorAll('.class-name');

checkbox.forEach(function(elem) {
    elem.addEventListener('change', function(){
    if (this.checked){
        this.nextElementSibling.classList.add('checked');
    } else {
        this.nextElementSibling.classList.remove('checked');
    }
});
}

*/

//чекбокс конец

//корзина начало
const btnCart = document.getElementById("cart");
const modalCart = document.querySelector(".cart");
const closeBtn = document.querySelector(".cart-close");
btnCart.addEventListener("click", () => {
  modalCart.style.display = "flex";
  document.body.style.overflow = "hidden"; //чтобы содержимое сайта не проскролливалось под всплывшим окном
});
closeBtn.addEventListener("click", () => {
  modalCart.style.display = "";
  document.body.style.overflow = "";
});
//корзина конец

//добавление-удаление товаров в корзину
const cards = document.querySelectorAll('.goods .card');
const cartWrapper = document.querySelector('.cart-wrapper');
const cartEmpty = document.getElementById('cart-empty');
const countGoods = document.querySelector('.counter');
cards.forEach((card) => {
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
        const cardClone = card.cloneNode(true);
        cartWrapper.appendChild(cardClone);
        cartEmpty.remove();
        showData()
    })
});

//добавление-удаление товаров в корзину КОНЕЦ

//изменение цыферки количества товаров в корзине
function showData() {
    const cardsCart = cartWrapper.querySelectorAll('.card');
    countGoods.textContent = cardsCart.length;
}

