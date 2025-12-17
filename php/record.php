<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=Watterson_636075";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

try {

    // ulteriore verifica per assicurarsi che l'utente sia loggato
    if (isset($_SESSION['username']) == false) {
        throw new Exception("Utente non loggato");
    }

    $sql = "SELECT * FROM record WHERE utente = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $_SESSION['username']);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $recordCountdown = null;
    foreach ($result as $row) {
        if ($row['modalita'] === 'countdown') {
            $recordCountdown = $row['punteggio'];
        }
        if ($row['modalita'] === 'sopravvivenza') {
            $recordSopravvivenza = $row['punteggio'];
        }
    }

    $response = [
        'stato' => true,
        'messaggio' => 'Punteggio salvato con successo',
        'recordCountdown' => $recordCountdown ?? 0,
        'recordSopravvivenza' => $recordSopravvivenza ?? 0
    ];

} 
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => 'Errore: ' . $e->getMessage()
    ];
}
header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>