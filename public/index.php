<?php
/*
 * douggr/zf-rest-application
 *
 * @link https://github.com/douggr/zf-rest-application for the canonical source repository
 * @version 1.0.0
 */

// Define path to application directory
define('APPLICATION_PATH', realpath(__DIR__ . '/../application'));

// Path to /public
define('PUBLIC_PATH', __DIR__);

// Composer autoloader
require_once '../vendor/autoload.php';

// Create application, bootstrap, and run
$app = new Zend_Application(
    'development', APPLICATION_PATH . '/configs/application.json');

$app->bootstrap()
    ->run();
