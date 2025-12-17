<?php declare(strict_types=1);

$c_str = "mysql:host=localhost;dbname=database";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {
    $input = json_decode(file_get_contents('php://input'), true);
    $modalita = $input['modalita'] ?? null; // parametro modalità passato nella richiesta
    
    $sql = "SELECT RANK() OVER(ORDER BY Punteggio DESC) AS Posizione, Username, Punteggio, Data FROM salvate WHERE modalita = ? ORDER BY Punteggio DESC LIMIT 10";
    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(1, $modalita);
    $stmt->execute();
    if ($stmt->rowCount() == 0) {
        $response = [
            'length' => 0,
            'messaggio' => 'Non ci sono partite in classifica'
        ];
    } 
    else {
        $response = [
            'length' => $stmt->rowCount(),
            'messaggio' => 'Classifica caricata con successo',
            'classifica' => $stmt->fetchAll(PDO::FETCH_ASSOC)
        ];
    }
} 
catch (PDOException | Exception $e) {
    $response = [
        'length' => 0,
        'messaggio' => 'Errore: ' . $e->getMessage()
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
$pdo = null;
?>