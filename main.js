//чекбокс начало
function toggleCheckbox() {
  const checkbox = document.getElementById("discount-checkbox");

  checkbox.addEventListener("change", function() {
    if (this.checked) {
      this.nextElementSibling.classList.add("checked");
    } else {
      this.nextElementSibling.classList.remove("checked");
    }
  });
}

toggleCheckbox();


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
function toggleCart() {
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
}
toggleCart();
//корзина конец

//добавление-удаление товаров в корзину
function addCart() {
  const cards = document.querySelectorAll(".goods .card");
  const cartWrapper = document.querySelector(".cart-wrapper");
  const cartEmpty = document.getElementById("cart-empty");
  const countGoods = document.querySelector(".counter");
  
  
  cards.forEach(card => {
    const btn = card.querySelector("button");
    btn.addEventListener("click", () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      showData();
      //удаление с катрочки в корзине кнопки "в корзину"
      const removeBtn = cardClone.querySelector('.btn');
      removeBtn.textContent = 'Удалить из корзины';
      removeBtn.addEventListener('click', () => {
        cardClone.remove();
        showData();
      });
    });
  });
  
  //добавление-удаление товаров в корзину КОНЕЦ
  
  //изменение цыферки количества товаров в корзине
  function showData() {
    const cardsCart = cartWrapper.querySelectorAll(".card");
    const cardsPrice = cartWrapper.querySelectorAll('.card-price');
    const cardTotal = document.querySelector('.cart-total span');
    let sum = 0;
  
    countGoods.textContent = cardsCart.length;
    //получить общую сумму товаров в корзине
    cardsPrice.forEach((cardPrice) => {
      let price = parseFloat(cardPrice.textContent);
      sum += price;
    });
    cardTotal.textContent = sum;
  
  /*чтобы удалялась надпись "корзина пуста", когда добавляем товар и возвращалась, когда все удаляем из корзины*/
    if(cardsCart.length !== 0) {
      cartEmpty.remove();
    } else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
}
addCart();


function actionPage() {
  //фильтр акций (чтобы при клике на чекбокс отображались только акционные товары)
  const cards = document.querySelectorAll('.goods .card');
  const discountCheckbox = document.getElementById('discount-checkbox'),
  goods = document.querySelector('.goods'),
  min = document.getElementById('min'),
  max = document.getElementById('max'),
  search = document.querySelector('.search-wrapper_input'),
  searchBtn = document.querySelector('.search-btn');

  discountCheckbox.addEventListener('click', () => {
    cards.forEach((card) => {
      if(discountCheckbox.checked) {
        if(!card.querySelector('.card-sale')) {
          card.parentNode.style.display = "none";
        }
      } else {
        card.parentNode.style.display = "";
      }
    });
  });

  //фильтр по цене "от... до..."
  function filterPrice() {
    cards.forEach((card) => {
      const cardPrice = card.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      if((min.value && price < min.value) || (max.value && price > max.value)) {
        card.parentNode.remove();
      } else {
        goods.appendChild(card.parentNode);
      }
    });
  }
  min.addEventListener('change', filterPrice);
  max.addEventListener('change', filterPrice);

  //строка поиска и кнопка поиск
  searchBtn.addEventListener('click', () => {
    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((card) => {
      const title = card.querySelector('.card-title');
      if(!searchText.test(title.textContent)) {
        card.parentNode.style.display = "none";
      } else {
        card.parentNode.style.display = "";
      }
    });
    search.value = '';
  });
}
actionPage();