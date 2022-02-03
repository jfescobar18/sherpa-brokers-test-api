sequelize-auto -o "./src/Models" --indentation 4 -d sherpa-brokers-test-db -h sherpa-brokers-test-db.cg2clmjvpgdz.us-east-2.rds.amazonaws.com -u sherpa-brokers-user -p 3306 -x Se@d0gs4rena -e mysql

docker build . -t sherpa-brokers-test-api

docker run -dp 3000:3000 sherpa-brokers-test-api