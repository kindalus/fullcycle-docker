FROM golang:1.18 AS builder

WORKDIR /codeeducation

COPY . .

RUN GOARCH=amd64 GOOS=linux go build -o codeeducation .

FROM scratch

COPY --from=builder /codeeducation/codeeducation .
CMD ["./codeeducation"]