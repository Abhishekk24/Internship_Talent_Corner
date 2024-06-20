#!/bin/bash

# Update package list and install ODBC development headers
apt-get update && apt-get install -y unixodbc-dev
