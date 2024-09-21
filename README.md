# Wındmill

## Description



## Demo App

## Near Tool Contract

## Phala Backend 

* add_tool_call.sh: Bash script to call add_tool function in the contract

    ```bash

    zsh add_tool_call.sh

    Unsigned transaction:

    signer_id:    zimbirti.testnet
    receiver_id:  zimbirti.testnet
    actions:
    -- function call:      
                    method name:  add_tool
                    args:         {
                                    "tool": {
                                        "json_schema": "{\"type\":\"function\",\"function\":{\"name\":\"call_near_contract\",\"description\":\"Call a NEAR contract\",\"parameters\":{\"type\":\"object\",\"properties\":{\"contractName\":{\"type\":\"string\",\"description\":\"Name of the NEAR contract to call\"},\"methodName\":{\"type\":\"string\",\"description\":\"Name of the method to call on the contract\"},\"args\":{\"type\":\"string\",\"description\":\"Arguments to pass to the method\"}}}}}",
                                        "query_url": "https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args="
                                    }
                                    }
                    gas:          30.0 Tgas
                    deposit:      0 NEAR

    ▹▹▸▹▹ Signing the transaction with a key saved in the secure keychain ...                                                                               
    Your transaction was signed successfully.
    Public key: ed25519:FZitdKeNHiY43Kco8trTwXPEBRpUkuDLkxqKApD2WXJ6
    Signature: ed25519:kr61n7fRA5WLQ84TTafoUnt5NSntc6AFNNqbA5Jzr5AbGHGTTMDcWao18Yz39ievhWE7yDwRnCYobexaDSU2GXZ
    ▹▹▹▹▸ Sending transaction ...                                                                                                                           
    --- Logs ---------------------------
    Logs [zimbirti.testnet]:   No logs
    --- Result -------------------------
    Empty result
    ------------------------------------

    The "add_tool" call to <zimbirti.testnet> on behalf of <zimbirti.testnet> succeeded.

    Gas burned: 9.5 Tgas
    Transaction fee: 0.0009496189156495 NEAR
    Transaction ID: H8Qr3Q6CHhfkUXFTxQpvJVnMkSzDcVj2dZMdVRreZ4Es
    To see the transaction in the transaction explorer, please open this url in your browser:
    https://explorer.testnet.near.org/transactions/H8Qr3Q6CHhfkUXFTxQpvJVnMkSzDcVj2dZMdVRreZ4Es




    Here is your console command if you need to script it or re-run:
        /Users/dogukan/.nvm/versions/node/v20.11.1/lib/node_modules/near-cli-rs/node_modules/.bin_real/near contract call-function as-transaction zimbirti.testnet add_tool json-args '{"tool":{"query_url":"https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args=", "json_schema": "{\"type\":\"function\",\"function\":{\"name\":\"call_near_contract\",\"description\":\"Call a NEAR contract\",\"parameters\":{\"type\":\"object\",\"properties\":{\"contractName\":{\"type\":\"string\",\"description\":\"Name of the NEAR contract to call\"},\"methodName\":{\"type\":\"string\",\"description\":\"Name of the method to call on the contract\"},\"args\":{\"type\":\"string\",\"description\":\"Arguments to pass to the method\"}}}}}"}}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as zimbirti.testnet network-config testnet sign-with-keychain send

    ```

* get_tool_call.sh: Bash script to call get_tool function in the contract

    ```bash
    zsh get_tool_call.sh 
    ▹▹▸▹▹ Getting a response to a read-only function call ...                                                                                               --------------
    No logs
    --------------
    Result:
    [
    {
        "json_schema": "{\"type\":\"function\",\"function\":{\"name\":\"call_near_contract\",\"description\":\"Call a NEAR contract\",\"parameters\":{\"type\":\"object\",\"properties\":{\"contractName\":{\"type\":\"string\",\"description\":\"Name of the NEAR contract to call\"},\"methodName\":{\"type\":\"string\",\"description\":\"Name of the method to call on the contract\"},\"args\":{\"type\":\"string\",\"description\":\"Arguments to pass to the method\"}}}}}",
        "query_url": "https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args=",
        "votes": 0
    }
    ]
    --------------


    Here is your console command if you need to script it or re-run:
        /Users/dogukan/.nvm/versions/node/v20.11.1/lib/node_modules/near-cli-rs/node_modules/.bin_real/near contract call-function as-read-only zimbirti.testnet get_tools json-args {} network-config testnet now
        
    ``` 
* upvote_tool_call.sh: Bash script to call upvote_tool function in the contract

    ```bash
    zsh upvote_tool_call.sh

    Unsigned transaction:

    signer_id:    zimbirti.testnet
    receiver_id:  zimbirti.testnet
    actions:
    -- function call:      
                    method name:  upvote_tool
                    args:         {
                                    "id": 0
                                    }
                    gas:          30.0 Tgas
                    deposit:      0 NEAR

    ▹▹▸▹▹ Signing the transaction with a key saved in the secure keychain ...                                                                               
    Your transaction was signed successfully.
    Public key: ed25519:FZitdKeNHiY43Kco8trTwXPEBRpUkuDLkxqKApD2WXJ6
    Signature: ed25519:yU7wokixjvEp9g3LncdNH84oER1y3ag8CGV9H7AMT4pjkui7ecWtNTpWKx9Qe4tGE42DRtY4L38pWeS4gtfxJ7o
    ▹▹▹▹▹ Sending transaction ...                                                                                                                           
    --- Logs ---------------------------
    Logs [zimbirti.testnet]:
    Upvoting tool with id 0
    Tool: [object Object]
    --- Result -------------------------
    Empty result
    ------------------------------------

    The "upvote_tool" call to <zimbirti.testnet> on behalf of <zimbirti.testnet> succeeded.

    Gas burned: 10.9 Tgas
    Transaction fee: 0.0010835958954943 NEAR
    Transaction ID: Dz3qxA7AfhZw3n8P6VCGFpozSW2xNWEzCoZ7YBNREQZV
    To see the transaction in the transaction explorer, please open this url in your browser:
    https://explorer.testnet.near.org/transactions/Dz3qxA7AfhZw3n8P6VCGFpozSW2xNWEzCoZ7YBNREQZV




    Here is your console command if you need to script it or re-run:
        /Users/dogukan/.nvm/versions/node/v20.11.1/lib/node_modules/near-cli-rs/node_modules/.bin_real/near contract call-function as-transaction zimbirti.testnet upvote_tool json-args '{"id": 0}' prepaid-gas '30.0 Tgas' attached-deposit '0 NEAR' sign-as zimbirti.testnet network-config testnet sign-with-keychain send
    
    ``` 
