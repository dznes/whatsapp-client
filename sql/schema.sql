CREATE DATABASE whatsapp_server;
\c whatsapp_server

CREATE SEQUENCE seq_users;
CREATE TABLE users (
  id int NOT NULL CONSTRAINT pk_users PRIMARY KEY DEFAULT nextval('seq_users'),

  login text NOT NULL,
  password text NOT NULL,

  CONSTRAINT uq_users_login UNIQUE (login)
);
ALTER SEQUENCE seq_users OWNED BY users.id;
