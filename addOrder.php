<?php
    session_start();
    include("connection/connection.php");
    header("Content-type:application/json");
    $code=404;
    $data=null;
  
  if(isset($_POST['send'])){
      
      $idProductAndQuantity = $_POST['idProductAndQuantity'];

      if(isset($_SESSION['user']) && $_SESSION['user']->id_r==1){
          $id_u=$_SESSION['user']->id_u;
        }

    $query1 = "INSERT INTO orders(`id_u`) VALUES ($id_u)";

    try {
        $konekcija->beginTransaction();
        $konekcija->exec($query1);
        $id_o = $konekcija->lastInsertId();
        $konekcija->commit();
        $code=202;
    }
    catch(PDOException $e) {
        $konekcija->rollback();
        $code=500;
        echo $e->getMessage();
    }

    $query2 ="INSERT INTO order_details(`id_o`,`id_p`,`quantity`) VALUES";

    foreach($idProductAndQuantity as $pq) {
        $upitDelovi[] = '('. $id_o.','.$pq['id_p'].','.$k['quantity'].')';
    }

    $query2.=implode(',',$upitDelovi);

    try{
        $konekcija->beginTransaction();
        $konekcija->exec($query2);
        $konekcija->commit();
        $code=202;
    }
    catch(PDOException$e){
        $konekcija->rollback();
        $code=500;
        echo $e->getMessage();
    }
}
http_response_code($code);
echo json_encode($data);
?>