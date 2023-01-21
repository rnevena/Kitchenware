<?php 
    $title = "register | rustic";
    $cssfile = "css/style.css";
    include("views/header.php");
    include("views/nav.php");

    if(isset($_SESSION['user'])) {
        $URL="index.php";
        echo "<script>location.href='$URL'</script>";
    }  
?>
    <div class=container>
        <div id="registerlogin">
            <div id="reglogin-container">
                <div id="divregister"></div>
                <div id="divlogin"></div>
                <?php
                    if(isset($_SESSION['errors'])){
                        echo "<div id='success-label2' class='success-labels'>" . $_SESSION['errors'] . "</div>";
                        unset($_SESSION['errors']);
                    }
                ?>
            </div>
        </div>
    </div>
    <button id="scrollbtn" title="Go to top"><i class="fas fa-angle-up"></i></button>
<?php 
    $jsfile="js/registerlogin.js";
    include("views/footer.php");
?>