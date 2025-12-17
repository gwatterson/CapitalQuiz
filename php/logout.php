<?php declare(strict_types=1);

function logout()
{
    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }
    if (isset($_SESSION['username'])) {
        session_destroy();
        header("Location:../html/index.html");
    } 
    else {
        header("Location:../html/index.html");
    }
}

logout();
?>