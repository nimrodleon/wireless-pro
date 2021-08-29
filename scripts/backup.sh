#!/bin/bash

# shellcheck disable=SC2006
DB_NAME=`date +"%d-%m-%Y"`
exec pg_dump -h localhost -U postgres db1 > "<dirPath>/$DB_NAME.sql"
