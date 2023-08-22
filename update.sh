#!/bin/bash

# Activate virtual environment
source env/bin/activate

# Pull latest changes from Git repository
git up

# Install/update dependencies
pip install -r requirements.txt

# Apply database migrations
python manage.py migrate

python manage.py collectstatic --noinput
# Path to the Gunicorn process ID file
PID_FILE="/var/run/gunicorn/portfolio.dev.pid"

# Function to restart the Gunicorn process
restart_gunicorn() {
    echo "Restarting Gunicorn..."
    if [ -f "$PID_FILE" ]; then
        kill -HUP "$(cat "$PID_FILE")"
        echo "Gunicorn restarted."
    else
        echo "Gunicorn is not running."
    fi

    gunicorn -c /root/portfolio-website/config/gunicorn.py &
    echo "Done"
}

restart_gunicorn
