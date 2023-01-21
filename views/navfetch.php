<?php
    include("connection/connection.php");

    $query = "SELECT * FROM nav";
    $stmt = $konekcija->prepare($query);
    $rezultat = $stmt->execute();

    $loggedin = false;
    if(isset($_SESSION['user'])) { $loggedin = true; }

    $ispis = "<ul>";
    foreach($stmt as $s){
        if($s->level==0) {
            $ispis.= "<li><a href='$s->href'><span>$s->description</span></a></li>";
        }
        if($loggedin){
            if($s->level==2) {
                if($_SESSION['user']->id_r!=2 && $s->description=='admin') {
                    $ispis.='';
                }
                else {
                    $ispis.="<li><a href='$s->href'><span>$s->description</span></a></li>";
                }
            }
        }
        else {
            if($loggedin){
                if($s->level==1) {
                    if($_SESSION['user']->id_r!=1) {
                        $ispis.='';
                    }
                    else {
                        $ispis.="<li><a href='$s->href'><span>$s->description</span></a></li>";
                    }
                }
            }
        }
    }
        
    if($loggedin){
            $ispis.="<li><a href='quiz.php'><span>survey</span></a></li>";
            $ispis.="<li><a href='logout.php'><span>logout</span></a></li>";
    }
    else {
        $ispis.="<li><a href='register.php'><span>register/log in</span></a></li>";
        $ispis.="<li><a href='contact.php'><span>contact</span></a></li>";
    }
    
    $ispis.="</ul>";
    echo $ispis;
?>