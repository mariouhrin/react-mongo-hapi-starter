#!/bin/sh

set -e

export PGPASSWORD="$DB_PASSWORD"
defaultDB="postgres"

# Shorthand command for psql
pg="psql -h $DB_HOST_CONTAINER -p $DB_PORT -U $DB_USER"

# Wait until postgres is available
until $pg -d "$defaultDB" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo 'Postgres is up'

# List databases
$pg -d "$defaultDB" -c '\l';

# Create DB $DB_NAME if does not exists
if $pg -d "$defaultDB" -lqt | cut -d \| -f 1 | grep -qw "$DB_NAME"; then
  >&2 echo "DB $DB_NAME already exists"
  # Should we drop / recreate DB here?
else
  >&2 echo "DB $DB_NAME does not exists - creating"
  $pg -d "$defaultDB" -c "CREATE DATABASE $DB_NAME"
fi

# Initialize DB schema
$pg -d "$DB_NAME" \
  -f schema/schema.sql
