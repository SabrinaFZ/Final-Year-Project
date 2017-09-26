echo Install Postgres
sudo add-apt-repository "deb http://apt.postgresql.org/pub/repos/apt/ trusty-pgdg main"
wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -
sudo apt-get update
apt-get install -y -q postgresql-9.6 postgresql-contrib

sudo -u postgres createuser -s sabrina
echo "alter user sabrina with password 'sabrina';" | sudo -u postgres psql
sudo -u postgres createdb -O sabrina sabrina

cd ~
echo "localhost:5432:sabrina:sabrina:sabrina" > .pgpass
echo "localhost:5432:*:sabrina:sabrina" > .pgpass
sudo chmod 600 ./.pgpass

cd /vagrant
PGPASSFILE=~/.pgpass psql -h localhost -U sabrina -d sabrina -a -f "./db/tables.sql"
