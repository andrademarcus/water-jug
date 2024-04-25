## Running application

Make a clone of this repository and install it in your development environment using the following command in your terminal.

```
git clone https://github.com/andrademarcus/water-jug
```

After cloning the repository content, access the created directory and install the dependencies:

```
cd waterjug
npm install
npm start
```

The server will be running at address `http://localhost:3000`.


## Run the unit tests

```
npm test
```

--- 

## Sample request with sucessful return

```
curl --location 'http://localhost:3000/api/waterjug/solve' \
--header 'Content-Type: application/json' \
--data '{
    "jugX": 2,
    "jugY": 10,
    "targetVolumeZ": 4
}'
```

The results should be http 200 / OK and the following json

```
{
  "solution": [
    {
      "step": 1,
      "bucketX": 2,
      "bucketY": 0,
      "action": "Fill bucket x"
    },
    {
      "step": 2,
      "bucketX": 0,
      "bucketY": 2,
      "action": "Transfer from bucket x to y"
    },
    {
      "step": 3,
      "bucketX": 2,
      "bucketY": 2,
      "action": "Fill bucket x"
    },
    {
      "step": 4,
      "bucketX": 0,
      "bucketY": 4,
      "action": "Transfer from bucket x to y",
      "status": "Solved"
    }
  ]
}
```

--- 

## Sample request with failure return - http 400 / bad request 

```
curl --location 'http://localhost:3000/api/waterjug/solve' \
--header 'Content-Type: application/json' \
--data '{
    "jugX": 2,
    "jugY": 6,
    "targetVolumeZ": 5
}'
```

```
{"error":"No Solution"}
```

--- 

## Sample request without required attributes - http 400 / bad request 

```
curl --location 'http://localhost:3000/api/waterjug/solve' \
--header 'Content-Type: application/json' \
--data '{
    "jugY": 2,
    "targetVolumeZ": 5
}'
```

```
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "validation": {
        "body": {
            "source": "body",
            "keys": [
                "jugX"
            ],
            "message": "\"jugX\" is required"
        }
    }
}
```



## Sample request with non-positive numbers - http 400 / bad request 

```
curl --location 'http://localhost:3000/api/waterjug/solve' \
--header 'Content-Type: application/json' \
--data '{
    "jugX": 2,
    "jugY": 0,
    "targetVolumeZ": 5
}'
```

```
{
    "statusCode": 400,
    "error": "Bad Request",
    "message": "Validation failed",
    "validation": {
        "body": {
            "source": "body",
            "keys": [
                "jugY"
            ],
            "message": "\"jugY\" must be a positive number"
        }
    }
}
````


