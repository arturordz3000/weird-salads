#!/bin/bash

set -e

is_docker_compose_running() {
  docker compose ps --services --filter "status=running" | grep -q .
}

echo "Checking Docker Compose status..."

if is_docker_compose_running; then
  echo "Docker Compose is already running."
else
  echo "Starting Docker Compose services..."
  docker-compose up -d
  echo "Docker Compose started."
fi

echo "Waiting for services to initialize..."
sleep 5

echo "Installing npm dependencies..."
npm install

echo "Running database migrations and data reset..."

node migration.js refresh
node migration.js up --migrate-all
node reset_table_data.js

echo "✅ All tasks completed successfully."
