# Silver Mistral (Built for Base)

Silver Mistral is a read-only onchain exploration toolkit built for Base Mainnet and Sepolia. It allows developers to validate Base chainIds, check balances, view block metadata, and verify results through Basescan.

## Key features

- Coinbase Wallet SDK for wallet connection  
- Base chainId validation (8453 / 84532)  
- Snapshot of latest block (block number, timestamp, gas price)  
- Address inspection (balance, transaction count)  
- ERC-20 inspection (metadata, total supply, balance)  
- Direct Basescan verification links for cross-checking  

---

## Repository layout

- app/silver-mistral.ts  
  Browser-based script that performs Base RPC queries and renders results.

- contracts/  
  Solidity contracts deployed to Base Sepolia for testnet validation:
  - SecureWallet.sol — A wallet contract that allows deposits and withdrawals, with a security mechanism requiring two approvals (from two different addresses) to withdraw funds.  
  - EventLogger.sol — A contract that logs specific events triggered by users, such as "ActionLogged" events.    

- package.json  
  Dependency manifest with Coinbase SDKs and Base ecosystem references.

- README.md  
  Documentation for the repository and its usage.

---

## Base network context

Base Mainnet  
chainId (decimal): 8453  
Explorer: https://basescan.org  

Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

---

## Tooling references

This repository leverages open-source tools from the Base and Coinbase ecosystems:
- Coinbase Wallet SDK for seamless EIP-1193 integration  
- OnchainKit for Base-native primitives and account abstraction  
- viem for efficient, typed RPC interaction  
- Multiple Base and Coinbase GitHub repositories as direct dependencies  

---

## License

MIT License

Copyright (c) 2025 nereid-experts

---

## Author

GitHub: nereid-experts
Email: nereid-experts.0g@icloud.com
Public contact: x.com/carol_ux85  

---

## Testnet Deployment (Base Sepolia)

As part of pre-production validation, one or more contracts may be deployed to the Base Sepolia test network to confirm correct behavior and tooling compatibility.

Network: Base Sepolia  
chainId (decimal): 84532  
Explorer: https://sepolia.basescan.org  

Contract #1 address:  
0x6C7F1A3B9D2A5E6C3A4B1F8E9D1C3A7F0D8C5A1F

Deployment and verification:
- https://sepolia.basescan.org/address/0x6C7F1A3B9D2A5E6C3A4B1F8E9D1C3A7F0D8C5A1F
- https://sepolia.basescan.org/0x6C7F1A3B9D2A5E6C3A4B1F8E9D1C3A7F0D8C5A1F/0#code  

Contract #2 address:  
0xA2D5B3E1F5C9A8B2C1D8F7B6A9D2F7E8D0F1A7B2

Deployment and verification:
- https://sepolia.basescan.org/address/0xA2D5B3E1F5C9A8B2C1D8F7B6A9D2F7E8D0F1A7B2
- https://sepolia.basescan.org/0xA2D5B3E1F5C9A8B2C1D8F7B6A9D2F7E8D0F1A7B2/0#code  


These testnet deployments provide a controlled environment for validating Base tooling, account abstraction flows, and read-only onchain interactions prior to Base Mainnet usage.

