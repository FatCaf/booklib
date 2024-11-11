# Set environment variables
DB_NAME=${DB_NAME}
DB_USER=${DB_USER}
DB_PASSWORD=${DB_PASSWORD}
DB_HOST=${DB_HOST}
PORT=${PORT}

# Export the password for psql to use
export PGPASSWORD=$DB_PASSWORD

# Execute the migration script using psql
psql -U $DB_USER -h $DB_HOST -p $PORT -d $DB_NAME <<EOF

-- Ensure pgcrypto extension is available
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create users table and trigger for updating timestamps
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    email VARCHAR(50),
    password VARCHAR(200),
    role VARCHAR(10) DEFAULT 'user',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE OR REPLACE FUNCTION update_updatedAt_column()
RETURNS TRIGGER AS \$\$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;

CREATE TRIGGER set_timestamps_users
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Create books table and trigger for updating timestamps
CREATE TABLE IF NOT EXISTS books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    description TEXT,
    year INTEGER,
    image TEXT,
    quantity INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TRIGGER set_timestamps_books
BEFORE INSERT OR UPDATE ON books
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Create authors table and trigger for updating timestamps
CREATE TABLE IF NOT EXISTS authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE TRIGGER set_timestamps_authors
BEFORE INSERT OR UPDATE ON authors
FOR EACH ROW
EXECUTE FUNCTION update_updatedAt_column();

-- Create books_authors table for many-to-many relationship
CREATE TABLE IF NOT EXISTS books_authors (
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    author_id UUID REFERENCES authors(id) ON DELETE CASCADE,
    PRIMARY KEY (book_id, author_id)
);

-- Create users_books table for tracking which users have borrowed which books
CREATE TABLE IF NOT EXISTS users_books (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, book_id)
);

-- Create borrowed_books table for tracking borrowed books and due dates
CREATE TABLE IF NOT EXISTS borrowed_books (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID REFERENCES books(id) ON DELETE CASCADE,
    borrow_date TIMESTAMPTZ DEFAULT NOW(),
    return_due DATE,
    return_date DATE,
    PRIMARY KEY (user_id, book_id)
);

-- Create a function to update book quantity when books are borrowed/returned
CREATE OR REPLACE FUNCTION update_book_quantity()
RETURNS TRIGGER AS \$\$
DECLARE
    borrowed_count INT;
BEGIN
    IF TG_OP = 'INSERT' AND NEW.return_date IS NULL THEN
        SELECT COUNT(*)
        INTO borrowed_count
        FROM borrowed_books
        WHERE user_id = NEW.user_id AND return_date IS NULL;

        IF borrowed_count >= 5 THEN
            RAISE EXCEPTION 'User cannot borrow more than 5 books at a time';
        END IF;

        UPDATE books
        SET quantity = quantity - 1
        WHERE id = NEW.book_id;

        IF (SELECT quantity FROM books WHERE id = NEW.book_id) < 0 THEN
            RAISE EXCEPTION 'This book is out of stock';
        END IF;

    ELSIF TG_OP = 'UPDATE' AND OLD.return_date IS NULL AND NEW.return_date IS NOT NULL THEN
        UPDATE books
        SET quantity = quantity + 1
        WHERE id = NEW.book_id;
    END IF;

    RETURN NEW;
END;
\$\$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_book_quantity
AFTER INSERT OR UPDATE ON borrowed_books
FOR EACH ROW
EXECUTE FUNCTION update_book_quantity();

EOF

# Check the status of the previous psql command
if [ $? -eq 0 ]; then
    echo 'Migration successful'
    exit 0
else
    echo "Migration failed."
    exit 1
fi

