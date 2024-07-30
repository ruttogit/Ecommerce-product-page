product = [{
    thumbnail: "images/image-product-1-thumbnail.jpg",
    largeImage: "images/image-product-1.jpg",
    // price: 125.00
},
{
    thumbnail: "images/image-product-2-thumbnail.jpg",
    largeImage: "images/image-product-2.jpg",
    // price: 120.00
},
{
    thumbnail: "images/image-product-3-thumbnail.jpg",
    largeImage: "images/image-product-3.jpg",
    // price: 130.00
},
{
    thumbnail: "images/image-product-4-thumbnail.jpg",
    largeImage: "images/image-product-4.jpg",
    // price: 119.50
}]


// opn and close navigation in small devices

const menuBar = document.getElementById('menu-bar');
const closeBar = document.getElementById('close-bar');
const menuList = document.querySelector('.menu-list');

menuBar.addEventListener('click', () => {
    menuList.style.display = 'flex';
    menuBar.style.display = 'none';
    closeBar.style.display = 'block';

});

closeBar.addEventListener('click', () => {
    menuList.style.display = 'none';
    menuBar.style.display = 'block';
    closeBar.style.display = 'none';
})




const thumbnailCont = document.querySelector('.products-thumnails');
const productPrice = document.querySelector('.price-cont');

let price = 125;

product.forEach(product => {
    thumbnailCont.innerHTML += `<img class="product-thumnail" src="${product.thumbnail}" data-large="${product.largeImage}"></img>`
    productPrice.innerHTML = `<h3 class="price">${(price).toFixed(2)}</h3>`
});






// navigation links active
const navLinks = document.querySelectorAll('.nav-links');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove 'active' class from all links
        navLinks.forEach(nav => nav.classList.remove('active'));
        
        // Add 'active' class to the clicked link
        link.classList.add('active');
    });

});



const profileAvatar = document.querySelector('.profile-avatar');
 
// add active class to profile
profileAvatar.addEventListener('click', () => {
    profileAvatar.classList.toggle('active-prof')
})

// add active class to the active thumnail
productThumnail = document.querySelectorAll('.product-thumnail');
const largeImage = document.getElementById('largeImage');
const largeImageCont = document.querySelector('.product-card');


productThumnail.forEach(thumnail =>{
    thumnail.addEventListener('click', (event) =>{
        let largeImagePath = thumnail.dataset.large;
        largeImageCont.innerHTML = ''
        productThumnail.forEach(item => item.classList.remove('active-thumnail'));
        thumnail.classList.add('active-thumnail');
        // Change the large image source to the data-large attribute of the clicked thumbnail
        
        console.log(largeImagePath)
        largeImageCont.innerHTML += `<img id="largeImage" src="${largeImagePath}" class="largeImage" alt=""></img>`

        // update price
        // const productPrice = document.querySelector('.price-cont');
        // console.log(product);
        // productPrice.innerHTML = `<h3 class="price">$${product.price}</h3>`

        // let item = product.find(product => product.largeImage === largeImagePath)

        
        // if (item){
        //     productPrice.innerHTML = `<h3 class="price">$${(item.price).toFixed(2)}</h3>`
        //     let priceItem = item.price
        //     return priceItem
        // }
    })
})


// add functionality to increment and decrement buttons
const incrementButton = document.getElementById('increment-btn');
const decrementButton = document.getElementById('decrement-btn');
let initialQuantity = parseInt(document.getElementById('add-cart-quantity').innerHTML);

incrementButton.addEventListener('click', () => {
    initialQuantity += 1;
    document.getElementById('add-cart-quantity').innerHTML = initialQuantity;
    updatePrice();
});

decrementButton.addEventListener('click', () => {
    if (initialQuantity > 0) {
        initialQuantity -= 1;
        document.getElementById('add-cart-quantity').innerHTML = initialQuantity;
        updatePrice();
    }
});

let priceItem = 0;
function updatePrice(){
    priceItem = initialQuantity * price;
    document.querySelector('.price').innerHTML = (price).toFixed(2);
    document.querySelector('.cart-item-quantity').innerHTML = initialQuantity;
}

// cart items
const cartIconCont = document.querySelector('.cart-icon-cont');
cartIconCont.addEventListener('click', () => {
    document.querySelector('.cart-container').classList.toggle('active');
});

const cartItemsContainer = document.querySelector('.items-cart');
const addtocartButton = document.querySelector('.add-to-cart-btn');

addtocartButton.addEventListener('click', () => {
    cartItemsContainer.innerHTML = `<div class="cart-item">
        <div class="cart-thumbnail">
            <img src="images/image-product-1-thumbnail.jpg" alt="">
        </div>
        <div class="cart-details">
            <div class="cartname"><p>Fall Limited Edition Sneakers</p></div>
            <div class="cart-descr"><p>$${price} x <span>${initialQuantity}</span></p> <strong class="cart-price-item">$${priceItem}</strong></div>
        </div>
        <div class="delete-cont">
            <img src="images/icon-delete.svg" class="delete-btn" alt="">
        </div>
    </div>`;
    addDeleteEvent();
});

function addDeleteEvent() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const cartItem = event.target.closest('.cart-item');
            cartItem.remove();
            initialQuantity = 0;
            document.getElementById('add-cart-quantity').innerHTML = initialQuantity;
            updatePrice();
            checkCartStatus();
        });
    });
}

function checkCartStatus() {
    if (initialQuantity === 0) {
        document.querySelector('.cart-filled').style.display = 'none';
        document.querySelector('.empty-content').style.display = 'block';
    } else {
        document.querySelector('.cart-filled').style.display = 'block';
        document.querySelector('.empty-content').style.display = 'none';
    }
}

checkCartStatus();



let currentIndex = 0;

function showSlide(index) {
    const sliderImage = document.getElementById('sliderImage');
    if (sliderImage) {
        sliderImage.classList.remove('fade-in');
        sliderImage.classList.add('fade-out');
        
        setTimeout(() => {
            sliderImage.src = product[index].largeImage;
            sliderImage.classList.remove('fade-out');
            sliderImage.classList.add('fade-in');
        }, 1000); // Delay matches the animation duration
    } else {
        console.error('Slider image element not found');
    }
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % product.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + product.length) % product.length;
    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);
});