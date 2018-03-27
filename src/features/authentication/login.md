# Login

## Create session

    POST
    https://secure.ecster.se/rest/sessions/v1

## Poll

    GET
    https://secure.ecster.se/rest/sessions/v1/5BA682D6AE5872EA45A692F348BA40ED?v=1522131115806


    {
        "responseTime":99,
        "status":200,
        "response": {
            "key":"5BA682D6AE5872EA45A692F348BA40ED",
            "ttl":1800,
            "authentication": {
                "status":"IN_PROGRESS",
               "type":"BANKID_MOBILE",
                "eid": {
                    "pollTime":1500
                }
            }
        }
    }

## Authenticated


    GET
    https://secure.ecster.se/rest/sessions/v1/5BA682D6AE5872EA45A692F348BA40ED?v=1522131115902



