$(document).ready(function(){

    // scroll to top dugme
        $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
                $('#scrollbtn').fadeIn();
            } else {
                $('#scrollbtn').fadeOut();
            }
        });

        //Click event to scroll to top
        $('#scrollbtn').click(function(){
            $('html, body').animate({scrollTop : 0},800);
            return false;
        });


        // text shadow animacija (header, box shadow u galeriji, span u modalu, footer)

        $(function(){
            $("#right ul").on('mouseover', 'li', function(){
                this.style.textShadow = '-10px 10px #81A2B2';
            }).on('mouseout', 'li', function(){
                this.style.textShadow = '0 0 0';
            })
        });
    
        $(function(){
            $("#zatvori").on('mouseover', function(){
                this.style.textShadow = '-5px 0px #B7A6AB';
            }).on('mouseout', function(){
                this.style.textShadow = '0 0 0';
            })
        });
    
        $(function(){
            $("#social a").on('mouseover', function(){
                this.style.textShadow = '-10px 10px #81A2B2';
            }).on('mouseout', function(){
                this.style.textShadow = '0 0 0';
            })
        });
        
    // responsive navigacija

    $(".hidden").click(function() {
        $("#right ul").slideToggle();
        $("#right").css("float", "none");
    });

    $("#right ul li").click(function () {
        $("#right ul ul").slideUp();
        $(this).find('ul').stop().slideToggle();
       });

    $(window).resize(function(){
        if($(window).width()>822) {
            $("#right ul").removeAttr('style');
            $("#right").css("float", "right");
        }
    });


//     $(document).on('click', '.btnFilter', function(e){
//         e.preventDefault();
//         let price = $("#ddlPrice").val();
//         let cat = $("#ddlCat").val();
//         let mat = $("#ddlMat").val();
//         console.log(price, cat, mat);
//         $.ajax({
//             url: "./filterProducts.php",
//             method: "post",
//             data: {
//                 price: price,
//                 cat: cat,
//                 mat: mat,
//                 action :true
//             },
//             dataType: "json",
//             success: function(result){
//                 $("#containershop").html(result);
//             }
//         })
//    })

// local storage

    var buttonsAddToCart = document.getElementsByClassName("addtobasket");
    for (var i=0; i<buttonsAddToCart.length; i++) {
        var dugme = buttonsAddToCart[i];
        dugme.addEventListener("click", addToCartGlavna);
    }

function proizvodiUKorpi() {
    return JSON.parse(localStorage.getItem("products"));
}

function addToCartGlavna() {
let id = $(this).data("id");

var products = proizvodiUKorpi();

if(products) {
    if(proizvodVecUKorpi()) {
        alert("added to cart!")
        azuriranjeKolicine();
    } else {
        dodajULocalStorage()
        alert("added to cart!")
    }
} else {
    dodajPrviProizvodULS();
    alert("added to cart!")
}

function proizvodVecUKorpi() {
    return products.filter(p => p.id == id).length;
}

function dodajULocalStorage() {
    let products = proizvodiUKorpi();
    products.push({
        id : id,
        quantity : 1
    });
    localStorage.setItem("products", JSON.stringify(products))
}

function azuriranjeKolicine() {
    let products = proizvodiUKorpi();
    for(let i in products)
    {
        if(products[i].id == id) {
            products[i].quantity++;
            break;
        }      
    }

    localStorage.setItem("products", JSON.stringify(products));
}

function dodajPrviProizvodULS() {
    let products = [];
    products[0] = {
        id : id,
        quantity : 1
    };
    localStorage.setItem("products", JSON.stringify(products));
}

}
    //slider
    var slideIndex = 1;
    showSlides(slideIndex);

    function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}
    slides[slideIndex-1].style.display = "block";
    setTimeout(showSlides, 4000);
    }

})