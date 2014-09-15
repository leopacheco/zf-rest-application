# zf-rest demo application
A very simple application to demonstrate the [zf-rest](https://github.com/douggr/zf-rest) extension.

## What's included?
 - Bearer authentication
 - A basic CRUD

## Requirements
 - [PHP 5.5+](https://php.net) You'll need PHP.
 - [MySQL 5.6+](https://mysql.com) You'll need MySQL.
 - [composer](http://getcomposer.org)

## Installation
```shell
$ git clone https://github.com/douggr/zf-rest-application.git
$ cd zf-rest-application
$ composer install
```

## Database setup
Configure your database credentials as usual:
```shell
$ editor application/configs/application.json
```
Run the installer. You **need** to use this installer.
```shell
$ cd vendor/douggr/zf-rest/schema/
$ ./install.sh DATABASE USERNAME PASSWORD PORT
```
Please note, running `install.sh` will **destroy** the `$DATABASE` if it exists. You've been warned. I really don't care about windows users. Sorry, feel free to write another script to install the database.

## Running
```shell
$ cd ../../../../public
$ php -S 127.0.0.1:4035
```
And open http://127.0.0.1:4035/demo/ (note the trailing slash). Login with `admin@example.com`, password `12345`.

## Note
This demo is intended to show the [zf-rest](https://github.com/douggr/zf-rest) extension and NOT an AngularJS app or how to use AngularJS. I made this just for fun.

## License
MIT
