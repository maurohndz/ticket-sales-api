-- Database: box_office
-- DROP DATABASE IF EXISTS box_office;
CREATE DATABASE box_office
    WITH
    OWNER = ticket_sales
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- SCHEMA: main
-- DROP SCHEMA IF EXISTS main ;
CREATE SCHEMA IF NOT EXISTS main AUTHORIZATION ticket_sales;

-- SCHEMA: security
-- DROP SCHEMA IF EXISTS security ;
CREATE SCHEMA IF NOT EXISTS security AUTHORIZATION ticket_sales;


-- Table: main.customers
-- DROP TABLE IF EXISTS main.customers;
CREATE TABLE IF NOT EXISTS main.customers
(
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    names character varying COLLATE pg_catalog."default" NOT NULL,
    last_name character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    status boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    CONSTRAINT customers_pkey PRIMARY KEY (id),
    CONSTRAINT customers_email_key UNIQUE (email)
)

TABLESPACE pg_default;
ALTER TABLE IF EXISTS main.customers OWNER to ticket_sales;

-- Table: security.credentials
-- DROP TABLE IF EXISTS security.credentials;
CREATE TABLE IF NOT EXISTS security.credentials
(
    id uuid NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    status boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    CONSTRAINT credentials_pkey PRIMARY KEY (id),
    CONSTRAINT credentials_id_fkey FOREIGN KEY (id)
        REFERENCES main.customers (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;
ALTER TABLE IF EXISTS security.credentials OWNER to ticket_sales;