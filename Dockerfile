FROM php:7.4-apache

LABEL maintainer="MSIS Team 25"

RUN docker-php-ext-install pdo_mysql

WORKDIR /srv/app

COPY app /srv/app

COPY docker/php/php.ini /usr/local/etc/php/php.ini

COPY docker/apache/vhost.conf /etc/apache2/sites-available/000-default.conf

