<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=database";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

try {
    $userJSON = json_decode(file_get_contents('php://input'), true);
    $user = $userJSON['username'];

    $sql = "SELECT Domanda FROM utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result == false) {
        throw new Exception('Domanda di sicurezza non trovata, controlla di aver inserito correttamente lo username');
    } 
    else {
        $response = [
            'stato' => true,
            'messaggio' => $result['Domanda']
        ];
    }

} 
catch (PDOException | Exception $e) {
    $response = [
        'stato' => false,
        'messaggio' => "Errore: " . $e->getMessage()
    ];
}
header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>