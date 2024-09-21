near call zimbirti.testnet \
add_tool \
'{"tool":{"query_url":"https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args=", "json_schema": "{\"type\":\"function\",\"function\":{\"name\":\"call_near_contract\",\"description\":\"Call a NEAR contract\",\"parameters\":{\"type\":\"object\",\"properties\":{\"contractName\":{\"type\":\"string\",\"description\":\"Name of the NEAR contract to call\"},\"methodName\":{\"type\":\"string\",\"description\":\"Name of the method to call on the contract\"},\"args\":{\"type\":\"string\",\"description\":\"Arguments to pass to the method\"}}}}}"}}' \
--accountId zimbirti.testnet 
