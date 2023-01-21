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

    // user -------------------------

    // regularni izrazi

    var reName = /^([A-Z][a-z]{2,15})(\s[A-Z][a-z]{2,15})+$/;
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    var reUsernamePassword =  /^[a-zA-Z0-9]{4,20}$/;
    var rePrice = /^([0-9]*[.])?[0-9]+$/;

    // update user

    $("#update-user-form").hide();

    $(".btn-update-user").click(function(){
        $("#update-user-form").show();

        var id_update = $(this).data("id");
        document.getElementById("user-id-update").value = id_update;

    });

    $("#close-form-user-update").click(function(){
        $("#update-user-form").hide();
    });

    $("#btn-update-user-action").click(function(e){
        e.preventDefault()
            
            var inputFullName = document.getElementById("full-name-update");
            var inputEmail = document.getElementById("email-update");
            var inputUsername = document.getElementById("usernameUpdate");
            var inputPassword = document.getElementById("passwordUpdate");
            var izabranaOpcija = document.getElementById("role-option");
            var selectedOption = izabranaOpcija.options[izabranaOpcija.selectedIndex];
            var id = document.getElementById("user-id-update");
        
            var greska=false;
        
            if (!reName.test(inputFullName.value) || inputFullName.length==0) {
                inputFullName.classList.add("error");
                document.getElementById("full-name-update-error").innerHTML="Please enter first and last name in a valid format";
                greska=true;
            }
            else {
                inputFullName.classList.remove("error");
                document.getElementById("full-name-update-error").innerHTML=" ";
                greska=false;
            }
        
            if(!reEmail.test(inputEmail.value) || inputEmail.length==0) {
                inputEmail.classList.add("error");
                document.getElementById("email-update-error").innerHTML="Please enter a valid email address";
                greska=true;
            }
            else {
                inputEmail.classList.remove("error");
                document.getElementById("email-update-error").innerHTML=" ";
                greska=false;
            }
        
        
            if(!reUsernamePassword.test(inputUsername.value) || inputUsername.length==0) {
                inputUsername.classList.add("error");
                document.getElementById("username-update-error").innerHTML="Username must contain between 4 and 20 characters"
                greska=true;
            }
            else {
                inputUsername.classList.remove("error");
                document.getElementById("username-update-error").innerHTML=" ";
                greska=false;
            }
        
        
            if(!reUsernamePassword.test(inputPassword.value) || inputPassword.length==0) {
                inputPassword.classList.add("error");
                document.getElementById("password-update-error").innerHTML="Password must contain between 4 and 20 characters"
                greska=true;
            }
            else {
                inputPassword.classList.remove("error");
                document.getElementById("password-update-error").innerHTML=" ";
                greska=false;
            }
    
            if (selectedOption.value=="0") {
                izabranaOpcija.classList.add("error");
                document.getElementById("role-error").innerHTML="Select a valid option.";
                greska=true;
            }
            else {
                izabranaOpcija.classList.remove("error");
                document.getElementById("role-error").innerHTML=" ";
                greska=false;
            }
            
            // var obj={
                var id_u = parseInt(id.value);
                var fullname= inputFullName.value;
                var email= inputEmail.value;
                var username= inputUsername.value;
                var password= inputPassword.value;
                var role= parseInt(selectedOption.value);
            // };
            console.log(id_u, fullname, email, username, password, role)

            if(greska==false){
                
                
                $.ajax({
                    url: "./updateUser.php",
                    method: "POST",
                    dataType: "json",
                    data: {
                        id: id_u,
                        fullname: fullname,
                        email : email,
                        username: username,
                        password:password,
                        role:role,
                        update:true
                    },
                    success: function(data){
                        $("#success-label4").html("user updated");
                    },
                    error: function(xhr, status, error){
                        console.log(xhr, status, error)
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
                        $("#success-label4").html(poruka);   
                    }
                });
            }
        
    });

    // delete user

    $(".btn-remove-user").click(function(){
        
        let id = $(this).data('id');
        $.ajax({
            url: "./deleteUser.php",
            method: "POST",
            dataType: "json",
            data: {
                id:id
            },
            success: function(data){
                $("#success-label5").html("User deleted.");
                $('[data-rowid="'+id+'"]').remove();
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
                $("#success-label5").html(poruka);  
            }
        });
    });

    // add user

    $("#add-user-form").hide();
    $(".btn-add-user").click(function(){
        $("#add-user-form").show();

        var id_add=$(this).data("id");
        document.getElementById("user-id-add").value = id_add;

        $(".btn-add-user").hide();
    });

    $("#close-form-user-add").click(function(){
        $("#add-user-form").hide();
        $(".btn-add-user").show();
    });

    $("#btn-add-user-action").click(function(e){
        e.preventDefault();
        
        var inputFullName = document.getElementById("full-name-add");
        var inputEmail = document.getElementById("email-add");
        var inputUsername = document.getElementById("usernameAdd");
        var inputPassword = document.getElementById("passwordAdd");
        var izabranaOpcija = document.getElementById("role-option-add");
        var selectedOption = izabranaOpcija.options[izabranaOpcija.selectedIndex];
        var id=$(this).data("addid");
    
        var greska=false;
    
        if (!reName.test(inputFullName.value) || inputFullName.length==0) {
            inputFullName.classList.add("error");
            document.getElementById("full-name-add-error").innerHTML="Please enter first and last name in a valid format";
            greska=true;
        }
        else {
            inputFullName.classList.remove("error");
            document.getElementById("full-name-add-error").innerHTML=" ";
            greska=false;
        }
    
        if(!reEmail.test(inputEmail.value) || inputEmail.length==0) {
            inputEmail.classList.add("error");
            document.getElementById("email-add-error").innerHTML="Please enter a valid email address";
            greska=true;
        }
        else {
            inputEmail.classList.remove("error");
            document.getElementById("email-add-error").innerHTML=" ";
            greska=false;
        }
    
        if(!reUsernamePassword.test(inputUsername.value) || inputUsername.length==0) {
            inputUsername.classList.add("error");
            document.getElementById("username-add-error").innerHTML="Username must contain between 4 and 20 characters"
            greska=true;
        }
        else {
            inputUsername.classList.remove("error");
            document.getElementById("username-add-error").innerHTML=" ";
            greska=false;
        }
    
        if(!reUsernamePassword.test(inputPassword.value) || inputPassword.length==0) {
            inputPassword.classList.add("error");
            document.getElementById("password-add-error").innerHTML="Password must contain between 4 and 20 characters"
            greska=true;
        }
        else {
            inputPassword.classList.remove("error");
            document.getElementById("password-add-error").innerHTML=" ";
            greska=false;
        }

        if (selectedOption.value=="0") {
            izabranaOpcija.classList.add("error");
            document.getElementById("role-add-error").innerHTML="Select a valid option.";
            greska=true;
        }
        else {
            izabranaOpcija.classList.remove("error");
            document.getElementById("role-add-error").innerHTML=" ";
            greska=false;
        }
        
        if(greska==false){
            // var obj={
                var id_u = parseInt(id);
                var fullname= inputFullName.value;
                var email= inputEmail.value;
                var username= inputUsername.value;
                var password= inputPassword.value;
                var role= parseInt(selectedOption.value);
            // };
            console.log(id_u, fullname, email, username, password, role)
            $.ajax({
                url: "./addUser.php",
                method: "POST",
                dataType: "json",
                data: {
                    id: id_u,
                    fullname: fullname,
                    email : email,
                    username: username,
                    password:password,
                    role:role,
                    add:true
                },
                success: function(data){
                    $("#success-label6").html("User added successfully.");
                },
                error: function(xhr, status, error){
                    console.log(xhr, status, error)
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
                    $("#success-label6").html(poruka);  
                }
            });
        }
    
});

    // message -------------------------

    // delete message

    $(".btn-remove-msg").click(function(){
        
        let id = $(this).data('id');
        $.ajax({
            url: "./deleteMessage.php",
            method: "POST",
            dataType: "json",
            data: {
                id:id
            },
            success: function(data){
                $("#success-label7").html("Message deleted.");
                $('[data-rowid="'+id+'"]').remove();
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
                $("#success-label7").html(poruka);  
            }
        });
    });

    // slider --------------------------------------

    $("#update-slider-form").hide();

    $(".btn-update-slider").click(function(){
        $("#update-slider-form").show();

        var id_update = $(this).data("id");
        document.getElementById("slider-id-update").value = id_update;

    });

    $("#close-form-slider-update").click(function(){
        $("#update-slider-form").hide();
    });

    $("#btn-update-slider-action").click(function(e){
        e.preventDefault()
            
            var inputTitle = document.getElementById("slider-title-update");
            var inputText = document.getElementById("slider-text-update");
            var id_s = document.getElementById("slider-id-update");
        
            var greska=false;
        
            if ($("#slider-title-update").val().length===0) {
                inputTitle.classList.add("error");
                document.getElementById("slider-title-update-error").innerHTML="Please enter the title in a valid format";
                greska=true;
            }
            else {
                inputTitle.classList.remove("error");
                document.getElementById("slider-title-update-error").innerHTML=" ";
                greska=false;
            }
            
            if ($("#slider-text-update").val().length===0) {
                inputText.classList.add("error");
                document.getElementById("slider-text-update-error").innerHTML="Slider text can't be empty";
                greska=true;
            }
            else {
                inputText.classList.remove("error");
                document.getElementById("slider-text-update-error").innerHTML=" ";
                greska=false;
            }
            
            // var obj={
                var id_s = parseInt(id_s.value);
                var title= inputTitle.value;
                var text= inputText.value;
            // };
            console.log(id_s, title, text)

            if(greska==false){
                
                $.ajax({
                    url: "./updateSlider.php",
                    method: "POST",
                    dataType: "json",
                    data: {
                        id: id_s,
                        title: title,
                        text: text,
                        update_s:true
                    },
                    success: function(data){
                        $("#success-label9").html("slider updated");
                    },
                    error: function(xhr, status, error){
                        console.log(xhr, status, error)
                        var poruka ="";
                        switch(xhr.status){
                            case 422: poruka = "Data not entered in a valid format";
                            break;
                            case 500: poruka = "Server error";
                            break;
                        }
                        $("#success-label9").html(poruka);   
                    }
                });
            }
        
    });

    // product --------------------------------------

    $("#update-product-form").hide();

    $(".btn-update-product").click(function(){
        $("#update-product-form").show();

        var id_update = $(this).data("id");
        document.getElementById("product-id-update").value = id_update;

    });

    $("#close-form-product-update").click(function(){
        $("#update-product-form").hide();
    });

    $("#btn-update-product-action").click(function(e){
        e.preventDefault()
            
            var inputName = document.getElementById("product-name-update");
            var inputDesc = document.getElementById("product-text-update");
            var inputPrice = document.getElementById("product-price-update");
            var id_p = document.getElementById("product-id-update");
        
            var greska=false;
        
            if ($("#product-name-update").val().length===0) {
                inputName.classList.add("error");
                document.getElementById("product-name-update-error").innerHTML="Please enter the name with first capital letter on each word";
                greska=true;
            }
            else {
                inputName.classList.remove("error");
                document.getElementById("product-name-update-error").innerHTML=" ";
                greska=false;
            }

            if (!rePrice.test(inputPrice.value) || inputPrice.length==0) {
                inputPrice.classList.add("error");
                document.getElementById("product-price-update-error").innerHTML="Please enter the price with ";
                greska=true;
            }
            else {
                inputPrice.classList.remove("error");
                document.getElementById("product-price-update-error").innerHTML=" ";
                greska=false;
            }
            
            if ($("#product-text-update").val().length===0) {
                inputDesc.classList.add("error");
                document.getElementById("product-text-update-error").innerHTML="Description can't be empty";
                greska=true;
            }
            else {
                inputDesc.classList.remove("error");
                document.getElementById("product-text-update-error").innerHTML=" ";
                greska=false;
            }
            
            // var obj={
                var id_p = parseInt(id_p.value);
                var name= inputName.value;
                var desc= inputDesc.value;
                var price= parseFloat(inputPrice.value);
            // };
            console.log(id_p, name, desc, price)

            if(greska==false){
                
                $.ajax({
                    url: "./updateProduct.php",
                    method: "POST",
                    dataType: "json",
                    data: {
                        id: id_p,
                        name: name,
                        desc: desc,
                        price: price,
                        update_p:true
                    },
                    success: function(data){
                        $("#success-label10").html("product updated");
                    },
                    error: function(xhr, status, error){
                        console.log(xhr, status, error)
                        var poruka ="";
                        switch(xhr.status){
                            case 422: poruka = "Data not entered in a valid format";
                            break;
                            case 500: poruka = "Server error";
                            break;
                        }
                        $("#success-label10").html(poruka);   
                    }
                });
            }
        
    });


}