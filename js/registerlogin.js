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

    //dinamicka forma prva (registracija)

    var f1 = document.createElement("form");
    f1.setAttribute('action',"registrationCheck.php");
    f1.setAttribute('id',"prvaforma");
    f1.setAttribute('method',"POST");

    var label1 = document.createElement("label");
    label1.setAttribute('class', "all-labels");
    label1.innerHTML = "Make a new account";

    var item1 = document.createElement("input");
    item1.setAttribute('type', "text");
    item1.setAttribute('id', "full-name");
    item1.setAttribute('name', "full-name");
    item1.setAttribute('class', "formitems");
    item1.setAttribute('placeholder', "full name");

    var item1Error = document.createElement("span");
    item1Error.setAttribute('id', "full-name-error");
    item1Error.setAttribute ('class', "all-errors");

    var item2 = document.createElement("input");
    item2.setAttribute('type', "text");
    item2.setAttribute('id', "email");
    item2.setAttribute('name', "email");
    item2.setAttribute('class', "formitems");
    item2.setAttribute('placeholder', "your e-mail address");

    var item2Error = document.createElement("span");
    item2Error.setAttribute('id', "email-error");
    item2Error.setAttribute ('class', "all-errors");

    var item3 = document.createElement("input");
    item3.setAttribute('type', "text");
    item3.setAttribute('id', "usernameRegister");
    item3.setAttribute('name', "usernameRegister");
    item3.setAttribute('class', "formitems");
    item3.setAttribute('placeholder', "username");

    var item3Error = document.createElement("span");
    item3Error.setAttribute('id', "username-register-error");
    item3Error.setAttribute ('class', "all-errors");

    var item4 = document.createElement("input");
    item4.setAttribute('type', "password");
    item4.setAttribute('id', "passwordRegister");
    item4.setAttribute('name', "passwordRegister");
    item4.setAttribute('class', "formitems");
    item4.setAttribute('placeholder', "password");

    var item4Error = document.createElement("span");
    item4Error.setAttribute('id', "password-register-error");
    item4Error.setAttribute ('class', "all-errors");

    var item5 = document.createElement("input");
    item5.setAttribute('type', "submit");
    item5.setAttribute('id', "btnregister");
    item5.setAttribute('name', "btnregister");
    item5.setAttribute('value', "register");

    var success1 = document.createElement("div");
    success1.setAttribute('id', "success-label1");
    success1.setAttribute('class', "success-labels");

    this.document.getElementById('divregister').appendChild(f1);
    this.document.getElementById('prvaforma').appendChild(label1);
    this.document.getElementById('prvaforma').appendChild(item1);
    this.document.getElementById('prvaforma').appendChild(item1Error);
    this.document.getElementById('prvaforma').appendChild(item2);
    this.document.getElementById('prvaforma').appendChild(item2Error);
    this.document.getElementById('prvaforma').appendChild(item3);
    this.document.getElementById('prvaforma').appendChild(item3Error);
    this.document.getElementById('prvaforma').appendChild(item4);
    this.document.getElementById('prvaforma').appendChild(item4Error);
    this.document.getElementById('prvaforma').appendChild(success1);
    this.document.getElementById('prvaforma').appendChild(item5);
    this.document.getElementById('btnregister').addEventListener('click', registrationCheck);

function registrationCheck (e){
    e.preventDefault();
    var inputFullName = document.getElementById("full-name");
    var reName = /^([A-Z][a-z]{2,15})(\s[A-Z][a-z]{2,15})+$/;

    var greska=false;

    if (!reName.test(inputFullName.value) || inputFullName.length==0) {
        inputFullName.classList.add("error");
        document.getElementById("full-name-error").innerHTML="Please enter first and last name in a valid format";
        greska=true;
    }
    else {
        inputFullName.classList.remove("error");
        document.getElementById("full-name-error").innerHTML=" ";
        greska=false;
    }

    var inputEmail = document.getElementById("email");
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

    if(!reEmail.test(inputEmail.value) || inputEmail.length==0) {
        inputEmail.classList.add("error");
        document.getElementById("email-error").innerHTML="Please enter a valid email address";
        greska=true;
    }
    else {
        inputEmail.classList.remove("error");
        document.getElementById("email-error").innerHTML=" ";
        greska=false;
    }

    var inputUsername = document.getElementById("usernameRegister");
    var reUsernamePassword =  /^[a-zA-Z0-9]{4,20}$/;

    if(!reUsernamePassword.test(inputUsername.value) || inputUsername.length==0) {
        inputUsername.classList.add("error");
        document.getElementById("username-register-error").innerHTML="Username must contain between 4 and 20 characters"
        greska=true;
    }
    else {
        inputUsername.classList.remove("error");
        document.getElementById("username-register-error").innerHTML=" ";
        greska=false;
    }

    var inputPassword = document.getElementById("passwordRegister");

    if(!reUsernamePassword.test(inputPassword.value) || inputPassword.length==0) {
        inputPassword.classList.add("error");
        document.getElementById("password-register-error").innerHTML="Password must contain between 4 and 20 characters"
        greska=true;
    }
    else {
        inputPassword.classList.remove("error");
        document.getElementById("password-register-error").innerHTML=" ";
        greska=false;
    }
    
    if(greska==false){
        var obj={
            fullname: $("#full-name").val(),
            email: $("#email").val(),
            username: $("#usernameRegister").val(),
            password: $("#passwordRegister").val(),
            register: true 
        };
        $.ajax({
            url: "./registrationCheck.php",
            method: "POST",
            dataType: "json",
            data: obj,
            success: function(data){
                $("#success-label1").html("You've successfully made an account");
            },
            error: function(xhr, status, error){
                var poruka ="";
                switch(xhr.status){
                    case 404: poruka = "Page not found";
                    break;
                    case 409: poruka = "Username or email already exists";
                    break;
                    case 422: poruka = "Data not entered in a valid format";
                    break;
                    case 500: poruka = "Error";
                    break;
                }
                $("#success-label1").html(poruka);  
            }
        });
    }
}

    // dinamicka forma druga (login)

    var f2 = document.createElement("form");
    f2.setAttribute('action',"loginCheck.php");
    f2.setAttribute('id',"drugaforma");
    f2.setAttribute('method',"POST");

    var label2 = document.createElement("label");
    label2.setAttribute('class', "all-labels");
    label2.innerHTML = "Already a member? Log in";

    var item6 = document.createElement("input");
    item6.setAttribute('type', "text");
    item6.setAttribute('id', "usernameLogin");
    item6.setAttribute('name', "usernameLogin");
    item6.setAttribute('class', "formitems");
    item6.setAttribute('placeholder', "username");

    var item6Error = document.createElement("span");
    item6Error.setAttribute('id', "username-login-error");
    item6Error.setAttribute ('class', "all-errors");

    var item7 = document.createElement("input");
    item7.setAttribute('type', "password");
    item7.setAttribute('id', "passwordLogin");
    item7.setAttribute('name', "passwordLogin");
    item7.setAttribute('class', "formitems");
    item7.setAttribute('placeholder', "password");

    var item7Error = document.createElement("span");
    item7Error.setAttribute('id', "password-login-error");
    item7Error.setAttribute ('class', "all-errors");

    var success2 = document.createElement("div");
    success2.setAttribute('id', "success-label2");
    success2.setAttribute('class', "success-labels");

    var item8 = document.createElement("input");
    item8.setAttribute('type', "submit");
    item8.setAttribute('id', "btnlogin");
    item8.setAttribute('name', "btnlogin");
    item8.setAttribute('value', "log in");

    this.document.getElementById('divlogin').appendChild(f2);
    this.document.getElementById('drugaforma').appendChild(label2);
    this.document.getElementById('drugaforma').appendChild(item6);
    this.document.getElementById('drugaforma').appendChild(item6Error);
    this.document.getElementById('drugaforma').appendChild(item7);
    this.document.getElementById('drugaforma').appendChild(item7Error);
    this.document.getElementById('drugaforma').appendChild(success2);
    this.document.getElementById('drugaforma').appendChild(item8);
    this.document.getElementById('btnlogin').addEventListener('click', loginCheck);

    function loginCheck (){
    
        var inputUsername = document.getElementById("usernameLogin");
        var reUsernamePassword =  /^[a-zA-Z0-9]{4,20}$/;
    
        if(!reUsernamePassword.test(inputUsername.value) || inputUsername.length==0) {
            inputUsername.classList.add("error");
            document.getElementById("username-login-error").innerHTML="Username must contain between 4 and 20 characters"
        }
        else {
            inputUsername.classList.remove("error");
            document.getElementById("username-login-error").innerHTML=" ";
        }
    
        var inputPassword = document.getElementById("passwordLogin");
    
        if(!reUsernamePassword.test(inputPassword.value) || inputPassword.length==0) {
            inputPassword.classList.add("error");
            document.getElementById("password-login-error").innerHTML="Password must contain between 4 and 20 characters"
        }
        else {
            inputPassword.classList.remove("error");
            document.getElementById("password-login-error").innerHTML=" ";
        }
    }
}