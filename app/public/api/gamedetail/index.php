<?php
require 'class/DbConnection.php';

// Step 1: Get a datase connection from our helper class
$db = DbConnection::getConnection();

// Step 2: Create & run the query
$sql = 'SELECT * FROM GAMES';
$vars = [];


if (isset($_GET['referee'])) {
$sql = 'SELECT
GAMES.game_ID, 
GAMES.game_level, 
GAMES.game_date, 
REFEREES.id from GAMES
inner join ASSIGNMENT on ASSIGNMENT.game_ID = GAMES.game_ID
inner join REFEREES on REFEREES.id = ASSIGNMENT.ref_ID
WHERE id = ?';
$vars = [ $_GET['referee'] ];

}

$stmt = $db->prepare($sql);
$stmt->execute($vars);

$games = $stmt->fetchAll();

// Step 3: Convert to JSON
$json = json_encode($games, JSON_PRETTY_PRINT);

// Step 4: Output
header('Content-Type: application/json');
echo $json;