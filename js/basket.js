$(document).ready(function () {

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

ispisiTabelu();

$("#hidden-basket").hide();
$("#btn-order").hide();


$("#btn-order").on("click",function(){
    localStorage.removeItem("products");
    alert("you've successfully made an order");
    $("#btn-order").hide();
    $(".basket").hide();
    $("#hidden-basket").show();
    $("#hidden-basket").html("Your cart is empty!");
});

// $ls = window.localStorage.length;
if(localStorage.length===null) {$("#btn-order").hide();$("#hidden-basket").html("Your cart is empty!");}

});




console.log(productsLS.length);

function ispisiTabelu() {
    let proizvodi=dohvatiLocalStorage();
    $.ajax({
        url : "./fillBasket.php",
        success: function (data) {
            data = data.filter(p => {
                for(let pr of proizvodi)
                {
                    if(p.id_p == pr.id) {
                        p.quantity = pr.quantity;
                        return true;
                    }
                }
                return false;
            });
            ispisiProizvode(data)
            $("#btn-order").show();
        },
        error: function(xhr, status, error){
            var poruka ="";
            switch(xhr.status){
                case 404: poruka = "Page not found";
                case 500: poruka = "Error";
                break;
            }
            alert(poruka);  
        }
    });
}
function ispisiProizvode (pr) {
    var ispis = `
    <table id="cartitems">
    <tr>
    <th colspan="2">item &nbsp</th>
    <th>price &nbsp;</th>
    <th colspan="2">quantity</th>
    </tr>`;
    for(let p of pr) {
      ispis += `
        <tr class="basketRow">
        <td class="basketImg"><img src="${p.src}" alt="${p.alt}" style="width:100px; height: 100px"/></td>
        <td>${p.name}</td>
        <td class="basketElementPrice">${p.price}</td>
        <td class="basketElementQuantity">${p.quantity}</td>
        <td><button type="submit" class="btn-remove-user" onclick="obrisiIzKorpe(${p.id_p})">remove</button></td>
        </tr>
      `;
    };
    ispis+=`</table><h1 id="ukupnoIspis">Total sum of your order: </h1>
        
    `;
    document.getElementsByClassName('basket')[0].innerHTML = ispis;
    ukupnaCena();
    return ispis;
}

function ukupnaCena() {
    var basketContainer = document.getElementsByClassName("basket")[0];
    var basketRows = basketContainer.getElementsByClassName("basketRow");
    var ukupno = 0;
    for(var i=0; i<basketRows.length; i++){
        var basketRow = basketRows[i];
        var priceElement = basketRow.getElementsByClassName("basketElementPrice")[0];
        var quantityElement = basketRow.getElementsByClassName("basketElementQuantity")[0];
        var price = parseFloat(priceElement.innerText);console.log(typeof(price));
        var quantity = parseFloat(quantityElement.innerText);console.log(typeof(quantity))
        ukupno += price * quantity; console.log(typeof(ukupno))
    }
    document.getElementById("ukupnoIspis").innerText+=ukupno +`€`;
}

function dohvatiLocalStorage() {
    return JSON.parse(localStorage.getItem("products"));
}

function obrisiIzKorpe(id) {
    let products = dohvatiLocalStorage();
    let filtered = products.filter(p => p.id != id);
    localStorage.setItem("products", JSON.stringify(filtered));
    ispisiTabelu(filtered);
}







