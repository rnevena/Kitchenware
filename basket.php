<?php
    $title = "basket | rustic";
    $cssfile = "css/style.css";
    include("views/header.php");
    include("views/nav.php");
?>
<div class=container>
    <div class="basket-wrap">
        <h1 id="hidden-basket"></h1>
    <div class="basket">
        <h1 id="basket-msg"></h1>
        
    </div>
    <?php
         if(isset($_SESSION['user'])){
            $user=$_SESSION['user'];
            if($user->id_r==1){
                echo "<button type='submit' id='btn-order'>order</button>";
                              }
            else if($user->id_r==2) {
                echo "<button type='submit' id='btn-order'>order</button>";
            }
        }
        else{
            echo "<h1 id='basket-msg-2'><a href='register.php'>Log in or register</a> to order.</h1>";
        }
        ?>
        <?php
    $jsfile="js/basket.js";
    include("views/footer.php");
?>
    </div>
</div>
