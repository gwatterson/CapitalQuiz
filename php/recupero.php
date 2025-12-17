<?php declare(strict_types=1);

$user = $pwd = $pwd2 = $domanda = $risposta = '';
$pwdErr = $pwd2Err = false;
$c_str = "mysql:host=localhost;dbname=database";
$pdo = new PDO($c_str, 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

try {

    $recuperaJSON = json_decode(file_get_contents('php://input'), true);
    $user = $recuperaJSON['username'];
    $pwd = $recuperaJSON['password'];
    $pwd2 = $recuperaJSON['password2'];
    $risposta = $recuperaJSON['risposta'];
    
    // il controllo sulla presenza di username e password è già stato fatto in html, ripetuto per sicurezza
    if (empty($user)) {
        throw new Exception("Username richiesto");
    } 

    if (empty($pwd)) {
        throw new Exception("Password richiesta");
    } 

        // validazione della password (tra 8 e 20 caratteri)
        if (strlen($pwd) < 8) {
            $pwdErr = true;
        } 
        else if (strlen($pwd) > 20) {
            $pwdErr = true;
        }
        // validazione della password (almeno un numero)
        else if (!preg_match("#[0-9]+#", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (almeno una lettera minuscola)
        else if (!preg_match("#[a-z]+#", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (almeno una lettera maiuscola)
        else if (!preg_match("#[A-Z]+#", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (almeno un carattere speciale)
        else if (!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $pwd)) {
            $pwdErr = true;
        }
        // validazione della password (nessun carattere spazio)
        else if (preg_match("/\s/", $pwd)) {
            $pwdErr = true;
        }

        if ($pwdErr)
            throw new Exception("Password non valida");

    if (empty($pwd2)) {
        $pwd2Err = 'La password è richiesta';
        throw new Exception("Password richiesta");
    } 
        // validazione della password (tra 8 e 20 caratteri)
        if (strlen($pwd2) < 8) {
            $pwd2Err = true;
        } 
        else if (strlen($pwd2) > 20) {
            $pwd2Err = true;
        }
        // validazione della password (almeno un numero)
        else if (!preg_match("#[0-9]+#", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (almeno una lettera minuscola)
        else if (!preg_match("#[a-z]+#", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (almeno una lettera maiuscola)
        else if (!preg_match("#[A-Z]+#", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (almeno un carattere speciale)
        else if (!preg_match("/[\'^£$%&*()}{@#~?><>,|=_+!-]/", $pwd2)) {
            $pwd2Err = true;
        }
        // validazione della password (nessun carattere spazio)
        else if (preg_match("/\s/", $pwd2)) {
            $pwd2Err = true;
        }

        if ($pwd2Err)
            throw new Exception("Password non valida");

    if (empty($risposta)) {
        throw new Exception("Risposta alla domanda di sicurezza richiesta");
    } 

    if ($pwd != $pwd2) {
        throw new Exception("Attenzione! Le password non coincidono");
    }

    // prendo la risposta alla domanda di sicurezza dal database
    $sql = "SELECT Risposta FROM utente WHERE Username = ? LIMIT 1";
    $stmt = $pdo->prepare($sql);
    $stmt->bindValue(1, $user);
    $stmt->execute();
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // controllo se la risposta alla domanda di sicurezza inserita dall'utente coincide con quella nel database
    if (password_verify($risposta, $row['Risposta'])) {
        // aggiornamento della password
        $sql = "UPDATE utente SET Password = ? WHERE Username = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(1, password_hash($pwd, PASSWORD_BCRYPT));
        $stmt->bindValue(2, $user);
        $stmt->execute();
        $response = [
            'stato' => true,
            'messaggio' => 'Password ripristinata con successo'
        ];
    } 
    else {
        throw new Exception("Risposta alla domanda di sicurezza errata");
    }
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