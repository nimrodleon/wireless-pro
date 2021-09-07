#!/bin/bash

DB_DIR=$(date +"%d-%m-%Y")
mkdir "/media/rbotDATA/RED2021/$DB_DIR"
cd "/media/rbotDATA/RED2021/$DB_DIR"
exec mongodump
