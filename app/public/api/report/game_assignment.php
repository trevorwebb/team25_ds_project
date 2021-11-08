<?php

try {
    $_POST = json_decode(
                file_get_contents('php://input'), 
                true,
                2,
                JSON_THROW_ON_ERROR
            );
} catch (Exception $e) {
    header($_SERVER["SERVER_PROTOCOL"] . " 400 Bad Request");
    exit;
}

require("class/DbConnection.php");

// Step 0: Validate the incoming data
// This code doesn't do that, but should ...
// For example, if the date is empty or bad, this insert fails.

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
        'SELECT 
        -- concat(first_name," ",last_name) as ref_name,
        -- date_of_birth,
        -- ref_rating,
        game_level,
        game_date,
        assign_status
    FROM ASSIGNMENT 
    INNER JOIN GAMES ON ASSIGNMENT.game_id = GAMES.game_id
    INNER JOIN REFEREES ON ASSIGNMENT.ref_ID = REFEREES.id
	Where REFEREES.id = ? 
	AND 
	GAMES.game_date > ?
	AND
	GAMES.game_date < ?'
    );

$stmt->execute([
  $_POST['id'],
  $_POST['start_date'],
  $_POST['end_date']
  
 ]);

 $assignments = $stmt->fetchAll();
 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "game_level, game_date, assign_status\r\n";
    // echo "ref_name,date_of_birth,ref_rating, game_level, game_date, assign_status\r\n";
  
    foreach($assignments as $a) {
      echo "\"".$a['game_level']. "\","
                .$a['game_date'] . ","
                .$a['assign_status']."\r\n";
    }
    // echo "\"".$a['ref_name']. "\","
    // .$a['date_of_birth'] . ","
    // .$a['ref_rating'] . ","
    // .$a['game_level'] . ","
    // .$a['game_date'] . ","
    // .$a['assign_status']."\r\n";
  } 
  else {

  
 // Step 3: Convert to JSON
 $json = json_encode($assignments, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;}