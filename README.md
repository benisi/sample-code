## Setup

#### Install dependencies
To install dependencies make sure you have composer and npm installed, run `composer install` then run `npm install`

copy the .env.example on the root directory, rename it to .env, add your credentials and run `vendor/bin/sail artisan key:generate`

It is advisable to use Redis as your session, queue and cache driver so that your application can easily scale, you can get an environment to simulate this using docker (kindly ensure that docker is installed and running on your computer), just type `./vendor/bin/sail up` on your terminal and press enter, this will setup laravel app, mysql and Redis on your computer.

#### Migrating Data

To migrate data run `vendor/bin/sail artisan migrate` and `vendor/bin/sail artisan db:seed`, you can specify the admin credentials by adding `ADMIN_EMAIL` and `ADMIN_PASSWORD` to your .env file before seeding

#### Polling post from external blog
For the sake of scalability we used a scheduler to poll post data from our client external blog. To poll data kindly run the command `vendor/bin/sail artisan schedule:work`, this will start a worker that poll post from our client blog every one hour, you can configure the cron on the `console kernel file`. You can change the url to poll from by changing `EXTERNAL_BLOG_URL` value in your .env file. 

visit your app at http://localhost/ if you want to change the port that serves your application add `APP_PORT` to your .env specifying the new port

#### Without sails

if you want to run your app without sails kindly follow the about instructions replacing `./vendor/bin/sail` with `php`, kindly ignore running `./vendor/bin/sail up`

#### Running test
To run the test cases run `./vendor/bin/sail test` or `./vendor/bin/phpunit` (if you are not using sails)
