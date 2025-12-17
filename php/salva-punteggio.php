<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=database";
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

    $input = json_decode(file_get_contents('php://input'), true);
    $punteggio = $input['punteggio'] ?? null;
    $modalita = $input['modalita'] ?? null;
    $nuovo = false;

    $sql = "INSERT INTO salvate(username, data, punteggio, modalita) VALUE (?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $_SESSION['username']);
    $data = date("Y-m-d");
    $stmt->bindParam(2, $data);
    $stmt->bindParam(3, $punteggio);
    $stmt->bindParam(4, $modalita);
    $stmt->execute();

    $sql = "SELECT punteggio as max_punteggio FROM record WHERE utente = ? AND modalita = ?"; // recupero il record dell'utente corrente per la modalità corrente
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $_SESSION['username']);
    $stmt->bindParam(2, $modalita);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result || $punteggio > $result['max_punteggio']) {  // se il punteggio appena salvato è maggiore del vecchio record dell'utente aggiorno la tabella record
        $sql = "INSERT INTO record(utente, modalita, punteggio) VALUES (?, ?, ?) 
                ON DUPLICATE KEY UPDATE punteggio = VALUES(punteggio)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindParam(1, $_SESSION['username']);
        $stmt->bindParam(2, $modalita);
        $stmt->bindParam(3, $punteggio);
        $stmt->execute();
        $nuovo = true;
    }

    $response = [
        'stato' => true,
        'messaggio' => 'Punteggio salvato con successo',
        'nuovoRecord' => $nuovo
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