<?php 
    $title = "admin | rustic";
    $cssfile = "css/style.css";
    include("views/header.php");
    include("views/nav.php");
    include("connection/connection.php");

    $query = "SELECT  u.id_u, u.fullname as fullname, u.email, u.username, r.name  as rolename FROM user u INNER JOIN role r ON u.id_r = r.id_r";
    $stmt = $konekcija->prepare($query);
    $rezultat = $stmt->execute();
    $users = $stmt->fetchAll();

    $query_role = "SELECT * FROM role";
    $stmt_role = $konekcija->prepare($query_role);
    $rezultat_role = $stmt_role->execute();
    $roles = $stmt_role->fetchAll();

    $query_msg = "SELECT * FROM messages";
    $stmt_msg = $konekcija->prepare($query_msg);
    $rezultat_msg = $stmt_msg->execute();
    $messages = $stmt_msg->fetchAll();

    $query_slider = "SELECT id_s, title, caption FROM slider";
    $stmt_slider = $konekcija->prepare($query_slider);
    $rezultat_slider = $stmt_slider->execute();
    $slider = $stmt_slider->fetchAll();

    $query_prod = "SELECT id_p, name, description, price FROM product";
    $stmt_prod = $konekcija->prepare($query_prod);
    $rezultat_prod = $stmt_prod->execute();
    $products = $stmt_prod->fetchAll();

    if($_SESSION['user']->id_r != 2){
        $url="index.php";
        echo "<script>location.href='$url'</script>";
    }  

?>
    <div class=container>
        <div class="basket">
            <h1>Users</h1><br/>
            <table id="cartitems">
                <tr>
                    <th>#</th>
                    <th>full name</th>
                    <th>email</th>
                    <th>username</th>
                    <th>role</th>
                    <th colspan="2">action</th>
                </tr>
                <?php foreach($users as $user): ?>
                    <tr data-rowid="<?php echo $user->id_u; ?>">
                    <td><?= $user->id_u; ?></td>
                    <td data-rowname="<?= $user->fullname;?>"><?= $user->fullname;?></td>
                    <td data-rowemail="<?= $user->email;?>"><?= $user->email;?></td>
                    <td data-rowusername="<?= $user->username;?>"><?= $user->username;?></td>
                    <td data-rowrole="<?= $user->rolename;?>"><?= $user->rolename;?></td>

                    <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                        <td><button type="button" class="btn-remove-user" data-id="<?php echo $user->id_u; ?>" >remove</button></td>
                        <td><button type="button" class="btn-update-user" data-id="<?php echo $user->id_u; ?>" >update</button></td>
                    <?php endif?>
                    </tr>
                <?php endforeach?>
            </table>
            <div id="success-label-5" class="success-labels"></div>

            <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                <div id="div-add-user">
                <td><button type="button" class="btn-add-user">add new user</button></td>
                <form id="add-user-form" method="post">
                    <input type="text" id="full-name-add" name="full-name-add" class="formitems" placeholder="full name">
                    <span id="full-name-add-error" class="all-errors"></span>
                    <input type="text" id="email-add" name="email-add" class="formitems" placeholder="e-mail address">
                    <span id="email-add-error" class="all-errors"></span>
                    <input type="text" id="usernameAdd" name="usernameAdd" class="formitems" placeholder="username">
                    <span id="username-add-error" class="all-errors"></span>
                    <input type="password" id="passwordAdd" name="passwordAdd" class="formitems" placeholder="password">
                    <span id="password-add-error" class="all-errors"></span>
                    <select id="role-option-add" class="formitems">
                        <option value="0">select</option>
                        <?php foreach($roles as $r):?>
                            <option value="<?php echo $r->id_r;?>"><?php echo $r->name; ?></option>
                        <?php endforeach; ?>
                    </select>
                    <span id="role-add-error" class="all-errors"></span>
                    <input type="hidden" id="user-id-add" name="user-id-add">
                    <input type="submit" id="btn-add-user-action" value="add" data-addid="1">
                    <br/>
                    <i class="fas fa-arrow-up" id="close-form-user-add"></i>
                    <div id="success-label-6" class="success-labels"></div>
                </form>
                </div>
            <?php endif?>

            <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                <div id="div-update-user">
                    <form id="update-user-form" method="post">
                        <input type="text" id="full-name-update" name="full-name-update" class="formitems" placeholder="full name">
                        <span id="full-name-update-error" class="all-errors"></span>
                        <input type="text" id="email-update" name="email-update" class="formitems" placeholder="e-mail address">
                        <span id="email-update-error" class="all-errors"></span>
                        <input type="text" id="usernameUpdate" name="usernameUpdate" class="formitems" placeholder="username">
                        <span id="username-update-error" class="all-errors"></span>
                        <input type="password" id="passwordUpdate" name="passwordUpdate" class="formitems" placeholder="password">
                        <span id="password-update-error" class="all-errors"></span>
                        <select id="role-option" class="formitems" name="role-update">
                            <option value="0">select</option>
                            <?php foreach($roles as $r):?>
                                <option value="<?php echo $r->id_r;?>"><?php echo $r->name; ?></option>
                            <?php endforeach; ?>
                        </select>
                        <span id="role-error" class="all-errors"></span>
                        <input type="hidden" id="user-id-update" name="user-id-update">
                        <input type="submit" id="btn-update-user-action" name="btn-update-user-action" value="update">
                        <br/>
                        <i class="fas fa-arrow-up" id="close-form-user-update"></i>
                        <p id="success-label-4" class="success-labels"></p>
                    </form>
                </div>
            <?php endif?>

            <h1>Messages</h1><br/>
            <table id="divmessages">
                <tr>
                    <th>#</th>
                    <th>email</th>
                    <th>message</th>
                    <th>action</th>
                </tr>
                <?php foreach($messages as $msg): ?>
                    <tr data-rowid="<?php echo $msg->id_msg; ?>">
                    <td><?= $msg->id_msg; ?></td>
                    <td data-rowemail="<?= $msg->mail;?>"><?= $msg->mail;?></td>
                    <td data-rowmsg="<?= $msg->msg;?>"><?= $msg->msg;?></td>

                    <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                        <td><button type="button" class="btn-remove-msg" data-id="<?php echo $msg->id_msg; ?>" >remove</button></td>
                    <?php endif?>
                    </tr>
                <?php endforeach?>
            </table><br/>
            <div id="success-label7" class="success-labels"></div><br/>
                    
            <h1 class="admin-panel-title">Slider caption</h1><br/>
            <table id="divslider">
                <tr>
                    <th>#</th>
                    <th>title</th>
                    <th>caption</th>
                    <th>action</th>
                </tr>
                <?php foreach($slider as $s): ?>
                    <tr data-rowid="<?php echo $s->id_s; ?>">
                    <td><?= $s->id_s; ?></td>
                    <td><?= $s->title;?></td>
                    <td><?= $s->caption;?></td>
                    <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                        <td><button type="button" class="btn-update-slider" data-id="<?php echo $s->id_s; ?>" >update</button></td>
                    <?php endif?>
                    </tr>
                <?php endforeach?>
            </table><br/>

            <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                <div id="div-update-slider">
                    <form id="update-slider-form" method="post">
                        <input type="text" id="slider-title-update" name="slider-title-update" class="formitems" placeholder="title">
                        <span id="slider-title-update-error" class="all-errors"></span>
                        <input type="text" id="slider-text-update" name="slider-text-update" class="formitems" placeholder="description">
                        <span id="slider-text-update-error" class="all-errors"></span>
                        <input type="hidden" id="slider-id-update" name="slider-id-update">
                        <input type="submit" id="btn-update-slider-action" name="btn-update-slider-action" value="update">
                        <br/>
                        <i class="fas fa-arrow-up" id="close-form-slider-update"></i>
                        <div id="success-label9" class="success-labels"></div><br/>
                    </form>
                </div>
            <?php endif?>
                        
            <h1 class="admin-panel-title">Product info</h1><br/>
            <table id="divslider">
                <tr>
                    <th>#</th>
                    <th>name</th>
                    <th>description</th>
                    <th>price</th>
                    <th>action</th>
                </tr>
                <?php foreach($products as $p): ?>
                    <tr data-rowid="<?php echo $s->id_p; ?>">
                    <td><?= $p->id_p; ?></td>
                    <td><?= $p->name;?></td>
                    <td><?= $p->description;?></td>
                    <td><?= $p->price;?></td>
                    <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                        <td><button type="button" class="btn-update-product" data-id="<?php echo $p->id_p; ?>" >update</button></td>
                    <?php endif?>
                    </tr>
                <?php endforeach?>
            </table><br/>
            

            <?php if(isset($_SESSION['user']) && $_SESSION['user']->id_r == 2): ?>
                <div id="div-update-product">
                    <form id="update-product-form" method="post">
                        <input type="text" id="product-name-update" name="product-name-update" class="formitems" placeholder="name">
                        <span id="product-name-update-error" class="all-errors"></span>
                        <input type="text" id="product-text-update" name="product-text-update" class="formitems" placeholder="description">
                        <span id="product-text-update-error" class="all-errors"></span>
                        <input type="text" id="product-price-update" name="product-price-update" class="formitems" placeholder="price">
                        <span id="product-price-update-error" class="all-errors"></span>
                        <input type="hidden" id="product-id-update" name="product-id-update">
                        <input type="submit" id="btn-update-product-action" name="btn-update-product-action" value="update">
                        <br/>
                        <i class="fas fa-arrow-up" id="close-form-product-update"></i>
                        <div id="success-label10" class="success-labels"></div><br/>
                    </form>
                </div>
            <?php endif?>
        </div>
        
    </div>
    <button id="scrollbtn" title="Go to top"><i class="fas fa-angle-up"></i></button>
<?php 
    $jsfile="js/admin.js";
    include("views/footer.php");
?>