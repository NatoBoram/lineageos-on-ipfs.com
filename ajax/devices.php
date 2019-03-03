<?php

require "../php/pdo.php";

// Prepared statement
$stmt = $pdo->prepare("SELECT
	`device`,
	`date`,
	`datetime`,
	`filename`,
	`filepath`,
	`sha1`,
	`sha256`,
	`size`,
	`type`,
	`version`,
	`ipfs`
FROM
	`builds_latest`
ORDER BY
	`version` DESC,
	`datetime` DESC,
	`device` ASC;");

$stmt->execute();
$devices = array();

while ($row = $stmt->fetch()) {

    // Put together a build
    $build = array(
        "device" => $row["device"],
        "date" => $row["date"],
        "datetime" => $row["datetime"],
        "filename" => $row["filename"],
        "filepath" => $row["filepath"],
        "sha1" => $row["sha1"],
        "sha256" => $row["sha256"],
        "size" => $row["size"],
        "type" => $row["type"],
        "version" => $row["version"],
        "ipfs" => $row["ipfs"],
    );

    // Put everything together
    array_push($devices, $build);
}

// Output as JSON
header('Content-Type: application/json; charset=utf-8');
echo json_encode($devices);
