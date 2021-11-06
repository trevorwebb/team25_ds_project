<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM games';
$vars = [];

if (isset($_GET['referees'])) {
$sql = 'Select 
games.game_ID, 
games.game_level, 
games.game_date, 
REFEREES.id from GAMES
inner join ASSIGNMENT on ASSIGNMENT.game_ID = games.game_ID
inner join REFEREES on REFEREES.id = ASSIGNMENT.ref_ID
where id = ?;';
$vars = [ $_GET['referees'] ];
}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$offers = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;
