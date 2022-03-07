require("@nomiclabs/hardhat-web3");
const {abi} = require('../artifacts/contracts/Donation.sol/Donation.json');

const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'

const Web3 = require('web3');
const web3 = new Web3 (new Web3.providers.HttpProvider("http://127.0.0.1:8545/"));
const DonationInterface = new web3.eth.Contract(abi,contractAddress);

    task("donationAddress","Prints out smart-contract`s address")
        .setAction(async () => {
            await DonationInterface.methods.donationAddress().call().then(console.log);
            });

    task("getBalance", "Prints smart-contract`s balance in wei")
        .setAction(async () => {
            await DonationInterface.methods.getBalance().call().then(console.log);
                });

    task("owner", "Prints smart-contract`s owner address")
        .setAction(async () => {
            await DonationInterface.methods.owner().call().then(console.log);
                });

    task("showAllDonators", "Prints all donators addresses who donated to contract")
        .setAction(async () => {
            await DonationInterface.methods.showAllDonators().call().then(console.log);
                });

    task("showDonationSum", "Prints total all amount of donations from certain address")
        .addParam("account", "The account which from you want to see all donations")
        .setAction(async () => {
            const account = web3.utils.toChecksumAddress(taskArgs.account);
            await DonationInterface.methods.showDonationSum().call({from:account}).then(console.log);
                });

    task("donate", "Smart-contract`s method to send donation to it")
        .addParam("account", "The account which from you want to donate")
        .addParam("amount", "The account which from you want to donate")
        .setAction(async (taskArgs) => {
            const account = web3.utils.toChecksumAddress(taskArgs.account);
            const amount = web3.utils.toWei(taskArgs.amount);
            await DonationInterface.methods.donate().send({from:account, value:amount})
                .on('receipt', function(receipt) {
                    console.log(receipt)
                })
            });

    task("withdrawDonations", "Wiwthdraw all ethers from smartcontract to certain address")
        .addParam("receiver", "Account address you want to send all ether")
        .setAction(async (taskArgs) => {
            const account = web3.utils.toChecksumAddress(taskArgs.account);
            await DonationInterface.methods.withdrawDonations().send({to:account})
                .on('receipt', function(receipt) {
                    console.log(receipt)
                })
        });

    task("getCertainBalance", "Prints the balance of the entered address")
        .addParam("account", "The account's address")
        .setAction(async (taskArgs) => {
            const account = web3.utils.toChecksumAddress(taskArgs.account);
            const balance = await web3.eth.getBalance(account);

            console.log(web3.utils.fromWei(balance, "ether"), "ETH"); 
        });