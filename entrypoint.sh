
if [ ! -f /.initialized ]; then
    rm -f /app/tmp/pids/server.pid
	echo "initializing container..."
	mkdir -p /postgresql/data
	mkdir -p /postgresql/logs
	chown -R postgres /postgresql
	sudo -u postgres /usr/local/pgsql/bin/initdb -E UTF8 -D /postgresql/data -U postgres -W
	sudo -u postgres /usr/local/pgsql/bin/pg_ctl -D /postgresql/data -l /postgresql/logs/start.log start
	bundle install
	npm install
	echo "starting database initialization..."
	rails db:create
	echo "database initialization done!"
	echo "starting database migration..."
	rails db:migrate
	echo "database migration done!"
	touch /.initialized
	echo "initialization done!"
else
	sudo -u postgres /usr/local/pgsql/bin/pg_ctl -D /postgresql/data -l /postgresql/logs/start.log start
fi

rails s -b 0.0.0.0

