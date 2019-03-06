#!/bin/sh

# Use this script to start interactive terminal in apollo-postgres container
# Run \c customers to connect to database
# Run \q to disconnect

docker exec -it customers-db psql -U postgres
