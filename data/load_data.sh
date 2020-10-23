#/bin/sh

export $(egrep -v '^#' ../.env | xargs)
psql -h $DB_HOST -p $DB_PORT -U $DB_USERNAME $DB_DATABASE -f load_data.sql

