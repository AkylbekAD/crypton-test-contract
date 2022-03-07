# Donation smart-contract on Hardhat

This project demonstrates a basic Hardhat use case. It comes with a Donation contract, a test for that contract, a sample script that deploys that contract.

You can check or test deployed contract on:
Etherscan - https://rinkeby.etherscan.io/address/0xA8547B1e8AD1ceFDC8C0833E711011F37983B96d#code
Alchemy - https://dashboard.alchemyapi.io/apps/qmhiswe8ap56xkcu

## Functionality

owner - address of the publisher wallet of the contract

donationAddress - address of the contract at network

donate - The contract has a feature to deposit any donation amount in the native currency of the blockchain

withdrawDonations - The contract has a function to output any amount to any address, and the function can only be called by the owner of the contract

showAllDonators - The contract has a view function that returns a list of all users who have ever donated

showDonationSum - There is a feature in the contract that allows you to get the total amount of all donations for a particular address


### Try running some of the following tasks:

```shell

npx hardhat node - to start localhost node to do test smart-contract tasks
npx hardhat help - to see all hardhat and smart-contract tasks 

example command to interact with smart-contract to donate 10 ether from 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 address:
npx hardhat donate --account 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 --amount 10

npx hardhat accounts
npx hardhat compile
npx hardhat clean
npx hardhat test

```
