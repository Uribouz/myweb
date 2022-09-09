docker build -t myweb:0.0.1 -f Dockerfile .
docker container stop myweb
docker run -d --rm -p 1323:1323 --name myweb myweb:0.0.1