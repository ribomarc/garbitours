<?php

	define('DB_NAME','assistance_confirmation');
	define('DB_USER','andressa_marc');
	define('DB_PASSWORD','mjHack123.');
	define('DB_HOST','andressaemarccom.ipagemysql.com');
	
	$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

	if (!$link) {
		die('Could not connect: ' .mysql_error());
	}
	
	$db_selected = mysql_select_db(DB_NAME, $link);
	
	if (!$db_selected) {
		die('Can\'t use ' .DB_NAME . ': ' .mysql_error());
	}
	
	echo 'Thanks for coming! We appreciate it very much!';
	
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