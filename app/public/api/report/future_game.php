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
$sql = 'SELECT * FROM GAMES';
$vars = [];
// Note the use of parameterized statements to avoid injection
$stmt = $db->prepare(
        'SELECT
        GAMES.game_ID,
        GAMES.game_level,
        GAMES.game_date 
        from GAMES
        inner join ASSIGNMENT on ASSIGNMENT.game_ID=GAMES.game_ID
        WHERE GAMES.game_date > curdate() AND ASSIGNMENT.assign_status = 'Unassigned'
        GROUP BY GAMES.game_ID;'
    );

$stmt = $db->prepare($sql);
 $futuregames = $stmt->fetchAll();
 if (isset($_GET['format']) && $_GET['format']=='csv') {
    header('Content-Type: text/csv');
    echo "game_ID, game_level, game_date\r\n";
  
    foreach($futuregames as $a) {
      echo "\"".$a['game_ID']. "\","
                .$a['game_level'] . ","
                .$a['game_date'] . "\r\n";
    }
  
  } 
  else {

  
 // Step 3: Convert to JSON
 $json = json_encode($futuregames, JSON_PRETTY_PRINT);
 
 // Step 4: Output
 header('Content-Type: application/json');
 echo $json;}