<?php 
    $title = "survey | rustic";
    $cssfile = "css/style.css";
    include("views/header.php");
    include("views/nav.php");

    if(!isset($_SESSION['user'])){
        $url="index.php";
        echo "<script>location.href='$url'</script>";
    }

    $query_questions = "SELECT * FROM quiz_questions";
    $stmt_questions = $konekcija->prepare($query_questions);
    $rezultat_questions = $stmt_questions->execute();
    $questioncount = $stmt_questions->rowCount();

    $query_done_quiz = "SELECT * FROM quiz_user WHERE id_u = :id_u";
    $stmt_done_quiz = $konekcija->prepare($query_done_quiz);
    $stmt_done_quiz->bindParam(':id_u',  $_SESSION['user']->id_u, PDO::PARAM_INT);
    $stmt_done_quiz->execute();
    $rezultat_done_quiz = $stmt_done_quiz->fetch();

    if($stmt_done_quiz->rowCount()) {
        echo "<label id='success-label8' class='success-labels'>You've already completed the survey. Thank you for your feedback.</label>";
        exit();
    }

    if(isset($_GET['n']) && $_GET['n']!=""){
        $page = $_GET['n'];
    } else {
        $page = 1;
    }
       
    $limit = 2;
    $offset = $limit * ($page-1);
    $prev_page = $page-1;
    $next_page = $page + 1;

    $query_q_per_page = "SELECT * FROM quiz_questions LIMIT :l OFFSET :o";
    $stmt_q_per_page = $konekcija->prepare($query_q_per_page);
    $stmt_q_per_page->bindParam(':l', $limit, PDO::PARAM_INT);
    $stmt_q_per_page->bindParam(':o', $offset, PDO::PARAM_INT);
    $rezultat_q_per_page = $stmt_q_per_page->execute();
    $dohvati_q_per_page = $stmt_q_per_page->fetchAll(PDO::FETCH_ASSOC);

    $query_answers = "SELECT * FROM quiz_answers";
    $stmt_answers = $konekcija->prepare($query_answers);
    $rezultat_answers = $stmt_answers->execute();
    $dohvati_answers = $stmt_answers->fetchAll(PDO::FETCH_ASSOC);

    $pagecount = ceil($questioncount/$limit);
    $pretposlednja = $pagecount-1;
?>
        <div class=container>
            <div id="quizcontainer">
            <div id="quizcontent">
                <form id="quizform" action="quizCheck.php" method="POST">
                    <?php foreach ($dohvati_q_per_page as $q):?>
                        <div id="pitanje">
                                <h1><?php echo $q['question']?></h1>
                        </div>
                        <div id="odgovor">
                            <?php foreach ($dohvati_answers as $a):?>
                                <?php if($a['id_qq'] == $q['id_qq']):?>
                                    <input type="radio" id="<?php echo $a['id_qa'];?>" name="question_<?php echo $q['id_qq'];?>" value="<?php echo $a['id_qa'];?>">
                                    <label for="<?php echo $a['id_qa'];?>"><?php echo $a['answer'];?></label><br>
                                <?php endif?>
                            <?php endforeach?>
                        </div>
                    <?php endforeach?>
                </form>
            </div>
            <div id="stranicenje">
                <?php if($page > 1):?>
                    <a class="pagelink" href="<?php echo 'quiz.php?n='.$prev_page;?>">previous</a>
                <?php endif?>
                <?php if ($page==$pagecount):?>
                    <br/><br/><form action="quizCheck.php" method="POST"><input type="submit" id="submitquiz" name="submitquiz" value="submit"></form>
                <?php else:?>
                    <a class="pagelink" href="<?php echo 'quiz.php?n='.$next_page;?>">next</a>
                <?php endif?>
            </div>
            </div>
        </div>
    <button id="scrollbtn" title="Go to top"><i class="fas fa-angle-up"></i></button>
<?php 
    $jsfile="js/main.js";
    include("views/footer.php");
?>
