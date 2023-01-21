<?php
    
    $title = "shop | rustic";
    $cssfile = "css/shop.css";
    include("views/header.php");
    include("views/nav.php");

    $id = $_GET['product_id'];
    $query = "SELECT * FROM product p INNER JOIN img i ON p.id_i=i.id_i WHERE p.id_p=:id";
    $stmt = $konekcija->prepare($query);
    $stmt->bindParam(':id', $id);
    $rezultat = $stmt->execute();
    $dohvati = $stmt->fetch(PDO::FETCH_OBJ);

    $query2 = "SELECT * FROM category c INNER JOIN prod_cat pc ON pc.id_c=c.id_c WHERE pc.id_p=:id";
    $stmt2 = $konekcija->prepare($query2);
    $stmt2->bindParam(':id', $id);
    $rezultat2 = $stmt2->execute();
    $dohvati2 = $stmt2->fetchAll(PDO::FETCH_OBJ);
    
    $query3 = "SELECT * FROM material m INNER JOIN prod_mat pm ON pm.id_m=m.id_m WHERE pm.id_p=:id";
    $stmt3 = $konekcija->prepare($query3);
    $stmt3->bindParam(':id', $id);
    $rezultat3 = $stmt3->execute();
    $dohvati3 = $stmt3->fetchAll(PDO::FETCH_OBJ);

    $output="<div id='containershop2'>
    <div class='product2'>
            <div class='pictureBlock2'>
                <div class='picture2'>
               <img src='{$dohvati->src}' alt='{$dohvati->alt}'/>
                </div>
            </div>
            <div class='descriptionBlock2'>
                <h1>{$dohvati->name}</h1>
                <p>&euro;{$dohvati->price}</p><br/>
                <p><b>categories</b>: ";
                foreach($dohvati2 as $cat) {
                    $output.="<span class='cat-mat'>{$cat->name}</span>";
                    for($i=0; $i<$stmt2->rowCount()-1; $i++) {
                        $output.=" ";
                    }
                }
                $output.="</p><br/>";
                $output.="<p><b>materials</b>: ";
                foreach($dohvati3 as $mat) {
                    $output.="<span class='cat-mat'>{$mat->name}</span>";
                    for($i=0; $i<$stmt3->rowCount()-1; $i++) {
                        $output.=" ";
                    }
                }
                $output.="</p>";
                $output.="
                <br/><p><b>description:</b></p>
                <p>{$dohvati->description}</p> <br/>
                <button class='addtobasket' data-id='{$dohvati->id_p}'>Add to cart</button>
            </div>
        </div>
    </div>
    
    ";

    echo $output;

    $jsfile="js/main.js";
    include("views/footer.php");
?>