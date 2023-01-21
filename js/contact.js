window.onload=function(){

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

    // dinamicka forma treca (contact)

    var f3 = document.createElement("form");
    f3.setAttribute('action',"contactCheck.php");
    f3.setAttribute('id',"trecaforma");
    f3.setAttribute('method',"POST");    

    var label3 = document.createElement("label");
    label3.setAttribute('class', "all-labels");
    label3.innerHTML = "Got any feedback? Send us a message and we'll get to you as soon as possible.";

    var item9 = document.createElement("input");
    item9.setAttribute('type', "text");
    item9.setAttribute('id', "emailContact");
    item9.setAttribute('name', "emailContact");
    item9.setAttribute('class', "formitems");
    item9.setAttribute('placeholder', "your e-mail address");

    var item9Error = document.createElement("span");
    item9Error.setAttribute('id', "email-contact-error");
    item9Error.setAttribute ('class', "all-errors");

    var item10 = document.createElement("textarea");
    item10.setAttribute('cols', 65);
    item10.setAttribute('rows', 7);
    item10.setAttribute('style', "resize:none");
    item10.setAttribute('id', "tekstpolje");
    item10.setAttribute('class', "formitems");
    item10.setAttribute('placeholder', "the message");

    var item10Error = document.createElement("span");
    item10Error.setAttribute('id', "message-error");
    item10Error.setAttribute ('class', "all-errors");

    var success3 = document.createElement("div");
    success3.setAttribute('id', "success-label3");
    success3.setAttribute('class', "success-labels");

    var item11 = document.createElement("input");
    item11.setAttribute('type', "submit");
    item11.setAttribute('id', "btncontact");
    item11.setAttribute('name', "btncontact");
    item11.setAttribute('value', "contact");

    this.document.getElementById('contact').appendChild(f3);
    this.document.getElementById('trecaforma').appendChild(label3);
    this.document.getElementById('trecaforma').appendChild(item9);
    this.document.getElementById('trecaforma').appendChild(item9Error);
    this.document.getElementById('trecaforma').appendChild(item10);
    this.document.getElementById('trecaforma').appendChild(item10Error);
    this.document.getElementById('trecaforma').appendChild(item11);
    this.document.getElementById('trecaforma').appendChild(success3);
    this.document.getElementById('btncontact').addEventListener('click', contactCheck);

function contactCheck (e){

    e.preventDefault();
    var greska=false;

    var inputEmail = document.getElementById("emailContact");
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if(!reEmail.test(inputEmail.value) || inputEmail.length==0) {
            inputEmail.classList.add("error");
            document.getElementById("email-contact-error").innerHTML="Please enter a valid email address";
            greska=true;
    }
    else {
            inputEmail.classList.remove("error");
            document.getElementById("email-contact-error").innerHTML=" ";
            greska=false;
    }

    var inputMessage = document.getElementById("tekstpolje");
    var reMessage = /^.{10,255}$/;

    if(!reMessage.test(inputMessage.value) || inputMessage.length==0) {
        inputMessage.classList.add("error");
        document.getElementById("message-error").innerHTML="Message must be between 10 and 255 characters long";
        greska=true;
    }
    else {
        inputMessage.classList.remove("error");
        document.getElementById("message-error").innerHTML=" ";
        greska=false;
    }

    if(greska==false){
            var obj={
                    email: $("#emailContact").val(),
                    message: $("#tekstpolje").val(),
                    contact: true 
            };

            $.ajax({
            url: "./contactCheck.php",
            method: "POST",
            dataType: "json",
            data: obj,
            success: function(data){
                    $("#success-label3").html("Thanks for your feedback.");
            },
            error: function(xhr, status, error){
                    var poruka ="";
                    switch(xhr.status){
                    case 404: poruka = "Page not found";
                    break;
                    case 409: poruka = "You already sent an email from this address.";
                    break;
                    case 422: poruka = "Data not entered in a valid format";
                    break;
                    case 500: poruka = "Error";
                    break;
                    }
                    $("#success-label3").html(poruka);  
                }
            });
        }
    }

}