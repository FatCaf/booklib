# Set environment variables
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_HOST=${DB_HOST}
PORT=${PORT}

# Export the password for psql to use
export PGPASSWORD=$DB_PASSWORD

# Reconnect to the `postgres` database to drop and recreate the specified database
psql -U $DB_USER -h $DB_HOST -p $PORT -d postgres <<EOF
-- Terminate connections to the target database
DO \$\$
DECLARE
    rec RECORD;
BEGIN
    FOR rec IN
        SELECT pg_terminate_backend(pg_stat_activity.pid)
        FROM pg_stat_activity
        WHERE pg_stat_activity.datname = '$DB_NAME'
          AND pid <> pg_backend_pid()
    LOOP
    END LOOP;
END
\$\$;

-- Drop the database
DROP DATABASE IF EXISTS $DB_NAME;

-- Recreate the database
CREATE DATABASE $DB_NAME;
EOF

# Check the status of the previous psql command
if [ $? -eq 0 ]; then
    echo "Database $DB_NAME reset successfully to initial state."
    exit 0
else
    echo "Failed to reset database $DB_NAME."
    exit 1
fi
