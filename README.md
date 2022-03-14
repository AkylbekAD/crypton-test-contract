# Donation smart-contract on Hardhat

This project demonstrates a basic Hardhat use case. It comes with a Donation contract, a test for that contract, a sample script that deploys that contract and tasks to interact with it.

You can check or test deployed contract on:

Etherscan - https://rinkeby.etherscan.io/address/0x09801CF826d876E6cc2aa32f6127b099C8D0EA2C#readContract

Alchemy - https://dashboard.alchemyapi.io/apps/t0snyf466mrjs3mg

## Functionality

owner - address of the publisher wallet of the contract

donationAddress - address of the contract at network

donate - The contract has a feature to deposit any donation amount in the native currency of the blockchain

withdrawDonations - The contract has a function to output any amount to any address, and the function can only be called by the owner of the contract

showAllDonators - The contract has a view function that returns a list of all users who had ever donated

showDonationSum - Function that allows you to get the total amount of all donations from a particular address

## Before running tasks!

You need to start localhost node and then deploy smart-contract Donation to it, by following next commands:

```
npx hardhat node

npx hardhat run --network localhost scripts/deploy.js

```

### Try running some of the following tasks:

To see all available hardhat tasks run:

```
npx hardhat help

```

Watch which parameters you need to add to interact with smart-contracts functionality by useing --help option

Example:

```
npx hardhat donate --help

```

Example command to donate 10 ether from 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 address to smart-contracts balance:

```
npx hardhat donate --account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 --amount 10

```
