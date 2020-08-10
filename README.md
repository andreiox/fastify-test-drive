# fastify-test-drive

Taking fastify for a spin!

## requirements

Looking to accomplish the things that I am already familiar with express.

-   [x] Validation
    -   [x] body
        -   [x] single error message
        -   [x] multiple params error message
    -   [x] header
    -   [x] query params
    -   [x] response
-   [x] Error Handling
-   [x] Basic Logging
-   [x] Endpoint Documentation

## docker support

```bash
docker build -t my/fastify-test-drive

docker run --rm -p 3000:3000 my/fastify-test-drive
```

## references

-   [fastify github page](https://github.com/fastify/fastify)
-   [fastify testing docs](https://www.fastify.io/docs/master/Testing/)
-   [fastify validation and serialization](https://www.fastify.io/docs/latest/Validation-and-Serialization/)
-   [fastify logging](https://www.fastify.io/docs/latest/Logging/)
-   [fastify swagger documentation generator](https://github.com/fastify/fastify-swagger)
