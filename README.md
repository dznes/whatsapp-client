RUN postgres in port 5433

psql -U postgres -W -h localhost -p 5433 -d whatsapp_server -f sql/schema.sql
