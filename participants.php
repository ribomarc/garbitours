<?php

	define('DB_NAME','contacts');
	define('DB_USER','admin');
	define('DB_PASSWORD','xyz.');
	define('DB_HOST','palomacalvocalvo62829.domaincommysql.com');
	
	$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

	if (!$link) {
		die('Could not connect: ' .mysql_error());
	}
	
	$db_selected = mysql_select_db(DB_NAME, $link);
	
	if (!$db_selected) {
		die('Can\'t use ' .DB_NAME . ': ' .mysql_error());
	}
	
	echo 'Thanks for your message! We will contact you briefly.';
	
	$name = $_POST['contact-name'];
	$email = $_POST['contact-email'];
	$phone = $_POST['contact-phone'];
	$companion = $_POST['contact-companion'];
	$message = $_POST['contact-message'];
	
	$sql = "INSERT INTO participants (`contact-name`, `contact-email`, `contact-phone`, `contact-companion`, `contact-message`) VALUES ('$name','$email','$phone','$companion','$message')";
	
	if (!mysql_query($sql)) {
		die('Error: ' .mysql_error());
	}
	
	mysql_close();
?>