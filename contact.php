<?php 
    $title = "Contact | Francis Bacon";
    $cssfile = "css/style.css";
    include("views/header.php");
    include("views/nav.php");

    if(isset($_SESSION['user'])) {
        $URL="index.php";
        echo "<script>location.href='$URL'</script>";
    }  
?>
    <div class=container>
        <div id="contact">
            
        </div>
    </div>
    <button id="scrollbtn" title="Go to top"><i class="fas fa-angle-up"></i></button>
<?php 
    $jsfile="js/contact.js";
    include("views/footer.php");
?>