FROM golang:1.16.2 as builder

WORKDIR /myweb
COPY go.mod ./
COPY go.sum ./
COPY myweb/server.go ./

RUN go mod download
RUN GOOS=linux go build server.go

FROM gcr.io/distroless/base-debian10

WORKDIR /root
COPY --from=builder /myweb ./

CMD ["./server"]