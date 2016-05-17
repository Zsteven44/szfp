<?php
$takenUsernames = array('bill', 'ted');
sleep(2);
if (!in_array( $_GET['username'], $takenUsernames )) {
	echo 'okay';
} else {
	echo 'denied';
}
?>