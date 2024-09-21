# Example Contract

##  Description

This is an example contract that calls RPC API of the near test network.

##  Usage

```bash
curl --location 'https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args=' \
--header 'Accept: application/json'
```

### Python Example

```python
import requests

url = "https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args="
response = requests.request("GET", url, headers={'Accept': 'application/json'})
print(response.text)
```

###  JavaScript Example

```javascript
fetch('https://wapo-testnet.phala.network/ipfs/QmPYNmVuJqsX8QywmEH4Frquq4YXAAH29BKFyzaCUAuJnq?contractName=zimbirti.testnet&methodName=get_greeting&args=')
  .then(response => response.json())
  .then(data => console.log(data));
```
