CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE gender_enum AS ENUM ('male', 'female');

CREATE TABLE customers
(
  index SERIAL,
  guid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  isactive BOOLEAN NOT NULL,
  balance TEXT,
  age SMALLINT,
  name TEXT,
  gender gender_enum,
  company TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  registered TEXT
);


COPY customers FROM '/data/data.csv' delimiter ',' csv header;

UPDATE customers SET balance = to_number(balance, '9G999'), registered = replace(registered, ' ', '');

ALTER TABLE customers ALTER COLUMN balance TYPE INTEGER USING (trim(balance)::integer);

ALTER SEQUENCE customers_index_seq RESTART WITH 33;
