# Login

## Create session

    POST
    https://secure.ecster.se/rest/sessions/v1
    
     {
         "response": {
             "key": "AF470EEB42AD6F38C0BBF1C120C826DC",
             "ttl": 1800,
             "authentication": {
                 "eid": {
                     "type": "BANKID",
                     "pollTime": 1000,
                     "startURL": "bankid://"
                 },
                 "status": "IN_PROGRESS"
             }
         }
     }

## Poll

With status IN_PROGRESS

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

## Authenticated (last poll)

With status VERIFIED

    GET
    https://secure.ecster.se/rest/sessions/v1/5BA682D6AE5872EA45A692F348BA40ED?v=1522131115902

     {
         "response": {
             "key": "AF470EEB42AD6F38C0BBF1C120C826DC",
             "ttl": 1800,
             "authentication": {
                 "status": "VERIFIED",
                 "type": "BANKID"
             },
             "person": {
                 "id": 641,
                 "ssn": "370203-0333",
                 "name": "Helman, Roger",
                 "address": "Rasundavagen 35",
                 "address2": "",
                 "city": "SOLNA",
                 "zip": "169 67",
                 "country": "SE",
                 "phone": "20150615",
                 "cellular": "+4673533598",
                 "email": "ölk@dgh.se"
             }
         }
     }

