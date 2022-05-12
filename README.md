## Setup

### Install dependencies
To install dependencies make sure you have composer and npm installed, type `composer install` on your terminal and press enter

after it has run type `npm install` on your terminal and press enter

It is advisable to use Redis as your session, queue and cache driver so that your application can easily scale, you can get an environment to simulate this using docker (kindly ensure that docker is install and running on your computer), just type `./vendor/bin/sail up` on your terminal and press enter, this will setup laravel app, mysql and Redis on your computer.



