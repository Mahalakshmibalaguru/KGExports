(function ($) {
    "use strict";

    $(document).ready(function($){
        
        // testimonial sliders
        $(".testimonial-sliders").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:1,
                    nav:false
                },
                1000:{
                    items:1,
                    nav:false,
                    loop:true
                }
            }
        });

        // homepage slider
        $(".homepage-slider").owlCarousel({
            items: 1,
            loop: true,
            autoplay: true,
            nav: true,
            dots: false,
            navText: ['<i class="fas fa-angle-left"></i>', '<i class="fas fa-angle-right"></i>'],
            responsive:{
                0:{
                    items:1,
                    nav:false,
                    loop:true
                },
                600:{
                    items:1,
                    nav:true,
                    loop:true
                },
                1000:{
                    items:1,
                    nav:true,
                    loop:true
                }
            }
        });

        // logo carousel
        $(".logo-carousel-inner").owlCarousel({
            items: 4,
            loop: true,
            autoplay: true,
            margin: 30,
            responsive:{
                0:{
                    items:1,
                    nav:false
                },
                600:{
                    items:3,
                    nav:false
                },
                1000:{
                    items:4,
                    nav:false,
                    loop:true
                }
            }
        });

        // count down
        if($('.time-countdown').length){  
            $('.time-countdown').each(function() {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function(event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><div class="inner"><span class="count">%D</span>Days</div></div> ' + '<div class="counter-column"><div class="inner"><span class="count">%H</span>Hours</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%M</span>Mins</div></div>  ' + '<div class="counter-column"><div class="inner"><span class="count">%S</span>Secs</div></div>'));
            });
         });
        }

        // projects filters isotop
        $(".product-filters li").on('click', function () {
            
            $(".product-filters li").removeClass("active");
            $(this).addClass("active");

            var selector = $(this).attr('data-filter');

            $(".product-lists").isotope({
                filter: selector,
            });
            
        });
        
        // isotop inner
        $(".product-lists").isotope();

        // magnific popup
        $('.popup-youtube').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });

        // light box
        $('.image-popup-vertical-fit').magnificPopup({
            type: 'image',
            closeOnContentClick: true,
            mainClass: 'mfp-img-mobile',
            image: {
                verticalFit: true
            }
        });

        // homepage slides animations
        $(".homepage-slider").on("translate.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").removeClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").removeClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

        $(".homepage-slider").on("translated.owl.carousel", function(){
            $(".hero-text-tablecell .subtitle").addClass("animated fadeInUp").css({'opacity': '0'});
            $(".hero-text-tablecell h1").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.3s'});
            $(".hero-btns").addClass("animated fadeInUp").css({'opacity': '0', 'animation-delay' : '0.5s'});
        });

       

        // stikcy js
        $("#sticker").sticky({
            topSpacing: 0
        });

        //mean menu
        $('.main-menu').meanmenu({
            meanMenuContainer: '.mobile-menu',
            meanScreenWidth: "992"
        });
        
         // search form
        $(".search-bar-icon").on("click", function(){
            $(".search-area").addClass("search-active");
        });

        $(".close-btn").on("click", function() {
            $(".search-area").removeClass("search-active");
        });
    
    });

//store at cart
$(document).ready(function () {
    // Retrieve existing cart data from sessionStorage
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Function to update the cart display on the page
    function updateCartDisplay() {
        // Clear existing cart display
        $('#cartItems').empty();

        // Append each product to the cart display
        cart.forEach(product => {
            const newRow = `
                <tr class="table-body-row">
                    <td class="product-remove"><a href="#"><i class="far fa-window-close"></i></a></td>
                    <td class="product-image"><img src="${product.image}" alt=""></td>
                    <td class="product-name">${product.name}</td>
                    <td class="product-price">₹${product.price}</td>
                    <td class="product-quantity">${product.quantity}</td>
                    <td class="product-total">₹${product.total}</td>
                </tr>`;
            $('#cartItems').append(newRow);
          
        });
    }

    // Event handler for the cart button click
    $('.cart-btn').on('click', function () {
        // Extract product details from the current item
        const productName = $(this).siblings('h3').text();
        const price = parseInt($(this).siblings('.product-price').text().match(/\d+/)[0]); // Extracting the numeric part
        const productImage = $(this).siblings('.product-image').find('img').attr('src');

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex(product => product.name === productName);

        if (existingProductIndex !== -1) {
            // If the product is already in the cart, update the quantity and price
            cart[existingProductIndex].quantity += 1;
            cart[existingProductIndex].total = cart[existingProductIndex].quantity * cart[existingProductIndex].price;
        } else {
            // If the product is not in the cart, add it with quantity 1
            const newProduct = {
                name: productName,
                price: price,
                quantity: 1,
                total: price, // Initial total
                image: productImage
            };
            cart.push(newProduct);
        }

        // Update sessionStorage with the modified cart data
        sessionStorage.setItem('cart', JSON.stringify(cart));

        // Optionally, you can display a confirmation message or perform other actions
        alert('Product added to cart!');

        // Update the cart display on the page
        updateCartDisplay();
       
    });

    // Initial load
    updateCartDisplay();
  
    // Calculate the subtotal dynamically
    subtotal += product.total;
    $('#subtotalValue').text(subtotal);
   

    // Assume you have updated values for shipping dynamically
    var shipping = 45;

    // Calculate the total
   
    var total = subtotal + shipping;

    // Update the values in the table
    //$('#subtotalValue').text(subtotal);
    $('#shippingValue').text(shipping);
    $('#totalValue').text(total);

    // Function to calculate the subtotal based on product prices
    function calculateSubtotal(products) {
        var subtotal = 0;
        for (var i = 0; i < products.length; i++) {
            subtotal += products[i].price * products[i].quantity;
        }
        return subtotal;
    }
});


    
jQuery(window).on("load",function(){
    jQuery(".loader").fadeOut(1000);
});


}(jQuery));