<?php 
    $title = "shop | rustic";
    $cssfile = "css/shop.css";
    include("views/header.php");
    include("views/nav.php");

    $parametri="";
    $catId="";
    $matId="";
    $price="";

    if(isset($_GET['ddlPrice'])) {
        $price=$_GET['ddlPrice'];
        $parametri.="&ddlPrice=$price";
    }

    if(isset($_GET['ddlCat'])) {
        $catId=$_GET['ddlCat'];
        $parametri.="&ddlCat=$catId";
    }
    
    if(isset($_GET['ddlMat'])) {
        $matId=$_GET['ddlMat'];
        $parametri.="&ddlMat=$matId";
    }

    $query_cat = "SELECT * FROM category";
    $stmt_cat = $konekcija->prepare($query_cat);
    $rezultat_cat = $stmt_cat->execute();
    $dohvati_cat = $stmt_cat->fetchAll(PDO::FETCH_OBJ);

    $cat=!empty($catId) ? "INNER JOIN prod_cat pc ON p.id_p=pc.id_p WHERE pc.id_c=$catId AND" : "WHERE";
    
    $query_mat = "SELECT * FROM material";
    $stmt_mat = $konekcija->prepare($query_mat);
    $rezultat_mat = $stmt_mat->execute();
    $dohvati_mat = $stmt_mat->fetchAll(PDO::FETCH_OBJ);

    $mat=!empty($matId) ? "INNER JOIN prod_mat pm ON p.id_p=pm.id_p WHERE pm.id_m=$matId AND" : "WHERE";

    $query = "SELECT * FROM product p INNER JOIN img i ON p.id_i=i.id_i";
    $stmt = $konekcija->prepare($query);
    $rezultat = $stmt->execute();
    $product_count = $stmt->rowCount();

    $page=0;
    if(isset($_GET['n']) && $_GET['n']!=""){
        $page = ($_GET['n']-1)*6;
    }
    // else {
    //     $page = 1;
    // }

    // $limit = 6;
    // $offset = $limit * ($page-1);
    // $prev_page = $page-1;
    // $next_page = $page + 1;

    $query_p_per_page = "SELECT * FROM product p INNER JOIN img i ON p.id_i=i.id_i" . ($catId? " INNER JOIN prod_cat pc ON p.id_p=pc.id_p" : " "). ($matId? " INNER JOIN prod_mat pm ON p.id_p=pm.id_p" : " ") . " WHERE " . ($catId ? "pc.id_c = $catId" : " 1 ") . " AND " . ($matId ? "pm.id_m = $matId" : " 1 ") . " GROUP BY p.id_p " . ($price? "ORDER BY price $price" : "ORDER BY p.id_p") . " LIMIT $page,6";
    $stmt_p_per_page = $konekcija->prepare($query_p_per_page);
    // $stmt_p_per_page->bindParam(':l', $limit, PDO::PARAM_INT);
    // $stmt_p_per_page->bindParam(':o', $offset, PDO::PARAM_INT);
    $rezultat_p_per_page = $stmt_p_per_page->execute();
    $dohvati_p_per_page = $stmt_p_per_page->fetchAll(PDO::FETCH_OBJ);
    $rowcount=$stmt_p_per_page->rowCount();
    $pagecount = ceil($product_count/6);
    // $pretposlednja = $pagecount-1;
?>
    <div class=container>
        <div id="divshop">
        <h1>Shop our latest arrivals</h1>
        <div id="filtershop">
            <form id="filter-form" method="GET" action="">
            <button id="btnBasket"><a href="basket.php" id="basketlink"><i class="fas fa-shopping-cart"></i>&nbsp;cart</a></button>
            <select id="ddlPrice" name="ddlPrice">
                <option value="0" selected>price</option>
                <option value="ASC">ascending</option>
                <option value="DESC">descending</option>
            </select>
            <select id="ddlCat" name="ddlCat">
                <option selected value="0">category</option>
                <?php foreach($dohvati_cat as $c):?>
                    <option value="<?= $c->id_c ?>" <?=$catId==$c->id_c?"selected":""?>><?= $c->name ?></option>
                <?php endforeach?>
            </select>
            <select id="ddlMat" name="ddlMat">
                <option value="0">material</option>
                <?php foreach($dohvati_mat as $m):?>
                    <option value="<?= $m->id_m ?>"><?= $m->name ?></option>
                <?php endforeach?>
            </select>
            <button type="submit" class="btnFilter" name="btnFilter">apply</button>
            </form>
        </div>
        <div id="containershop">
        <?php foreach($dohvati_p_per_page as $s): ?>
            <div class="product">
                <div class="pictureBlock">
                    <div class="picture">
                    <a href="product.php?product_id=<?=$s->id_p;?>">
                   <img src="<?=$s->src;?>" alt="<?=$s->alt;?>"/>
                    </a>
                    </div>
                </div>
                <div class="descriptionBlock">
                    <h1><?=$s->name;?></h1>
                    <p>&euro;<?=$s->price;?></p>
                    <button class="addtobasket" value="<?=$s->id_p;?>" data-id="<?=$s->id_p;?>">Add to cart</button>
                </div>
            </div>
        <?php endforeach;?>
        </div>
        <div id="stranicenje_shop">
                <?php for($i=1; $i<=$pagecount; $i++):?>
                    <a class="pagelink" href="<?php echo 'shop.php?n='.$i.$parametri;?>"><?=$i?></a>
                <?php endfor?>
            </div>
        </div>
    </div>
    <button id="scrollbtn" title="Go to top"><i class="fas fa-angle-up"></i></button>
<?php 
    $jsfile="js/main.js";
    include("views/footer.php");
?>