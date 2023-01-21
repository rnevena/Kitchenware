<?php 
    $title = "home | rustic";
    $cssfile = "css/style.css";
    include("views/header.php");
    include("views/nav.php");

    $query = "SELECT * FROM slider s INNER JOIN img i ON s.id_i=i.id_i";
    $stmt = $konekcija->prepare($query);
    $rezultat = $stmt->execute();

    $query1 = "SELECT * FROM product p INNER JOIN img i ON p.id_i=i.id_i";
    $stmt1 = $konekcija->prepare($query);
    $rezultat1 = $stmt->execute();
    $product_count = $stmt->rowCount();

    if(isset($_GET['n']) && $_GET['n']!=""){
        $page = $_GET['n'];
    } else {
        $page = 1;
    }

    $limit = 3;
    $offset = $limit * ($page-1);
    $prev_page = $page-1;
    $next_page = $page + 1;

    $query_p_per_page = "SELECT * FROM product p INNER JOIN img i ON p.id_i=i.id_i INNER JOIN prod_cat pc on p.id_p=pc.id_p WHERE pc.id_c=1 LIMIT :l OFFSET :o";
    $stmt_p_per_page = $konekcija->prepare($query_p_per_page);
    $stmt_p_per_page->bindParam(':l', $limit, PDO::PARAM_INT);
    $stmt_p_per_page->bindParam(':o', $offset, PDO::PARAM_INT);
    $rezultat_p_per_page = $stmt_p_per_page->execute();
    $dohvati_p_per_page = $stmt_p_per_page->fetchAll(PDO::FETCH_OBJ);

    $pagecount = ceil($product_count/$limit);
    $pretposlednja = $pagecount-1;

?>
        <div class=container>
            <div id="containerindex">
                <?php foreach($stmt as $s):?>
                <div id="containerindex1">
                    <div class="mySlides fade">
                        <img src="<?php echo $s->src;?>">
                        <div class="text">
                            <h1><?php echo $s->title;?></h1>
                            <br>
                            <p><?php echo $s->caption;?></p>
                        </div>  
                    </div>
                </div>
                <?php endforeach;?>
                <div id="mid-containerindex">
                <h1>Don't miss out on our new sets!</h1>
                </div>
                <div id="containerindex2">
                    <?php foreach($dohvati_p_per_page as $s): ?>
                        <div class="product1">
                        <div class="pictureBlock1">
                            <div class="picture1">
                            <a href="product.php?product_id=<?php echo $s->id_p;?>">
                                <img src="<?php echo $s->src;?>" alt="<?php echo $s->alt;?>"/>
                            </a>
                            </div>
                        </div>
                        <div class="descriptionBlock1">
                            <h1><?php echo $s->name;?></h1>
                            <p>&euro;<?php echo $s->price;?></p>
                            <button class="addtobasket" data-id=<?php echo $s->id_p;?>>Add to cart</button>
                        </div>
                        </div>
                    <?php endforeach;?>
                </div>
            </div>
        </div>
    <button id="scrollbtn" title="Go to top"><i class="fas fa-angle-up"></i></button>
<?php 
    $jsfile="js/main.js";
    include("views/footer.php");
?>
