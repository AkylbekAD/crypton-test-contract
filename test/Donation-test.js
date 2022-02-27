const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Donation contract", function () {

    let Donation;
    let owner;
    let acc1;
    let acc2;
    let hardhatDonation;

    beforeEach(async function () {
        Donation = await ethers.getContractFactory("Donation");
        [owner, acc1, acc2] = await ethers.getSigners();
        hardhatDonation = await Donation.deploy();
        await hardhatDonation.deployed()
    });

    describe("Deployment", function() {
        it("Should set the right owner", async function () {
            expect(await hardhatDonation.owner()).to.equal(owner.address);
        });
        it("Contract balance should be empty", async function () {
            expect(await hardhatDonation.getBalance()).to.equal(0);
        })
    });

    async function currentBalance (address, msg ='') {
        const rawBalance = await ethers.provider.getBalance(address);
        console.log(msg, ethers.utils.formatEther(rawBalance));
    };

    describe("Public functionality", function () {
        it("Straight transaction to the contract is avaliable and getBalance function works well", async function () {

            const transaction = {
                to: hardhatDonation.address,
                value: ethers.utils.parseEther('10.1')
            };
            const transactionSend = await acc1.sendTransaction(transaction);
            await transactionSend.wait();

            await currentBalance(acc1.address, 'Account 1 balance:');
            await currentBalance(hardhatDonation.address, 'Contract balance:');

            const unformatedBalance = await hardhatDonation.getBalance()
            expect(await ethers.utils.formatEther(unformatedBalance)).to.equal('10.1');
        })

        it("Donate function avaliabale and works just fine", async function () {
            const transaction = { value: ethers.utils.parseEther('10.1')}
            const donation = await hardhatDonation.connect(acc1).donate(transaction);
            await donation.wait();

            const unformatedBalance = await hardhatDonation.getBalance()
            expect(await ethers.utils.formatEther(unformatedBalance)).to.equal('10.1');
        })

        it("ShowAllDonators function returns an array of adresses who make donation", async function () {
            const transaction = { value: ethers.utils.parseEther('1.1')};

            const donation1 = await hardhatDonation.connect(acc1).donate(transaction);
            const donation2 = await hardhatDonation.connect(acc2).donate(transaction);
            await donation1.wait();
            await donation2.wait();

            const functionResult = await hardhatDonation.showAllDonators();
            const donatorsAdresses = [`${acc1.address}`,`${acc2.address}`];

            expect (functionResult[0],functionResult[1]).to.equal(donatorsAdresses[0],donatorsAdresses[1]);
        })

        it("showDonationSum function returns correct sum of all donations from one account", async function () {
            const transaction1 = { value: ethers.utils.parseEther('1.1')};
            const transaction2 = { value: ethers.utils.parseEther('10.1')};

            const donation1 = await hardhatDonation.connect(acc1).donate(transaction1);
            const donation2 = await hardhatDonation.connect(acc1).donate(transaction2);
            await donation1.wait();
            await donation2.wait();

            const unformatedSum = await hardhatDonation.showDonationSum(acc1.address);
            expect (await ethers.utils.formatEther(unformatedSum)).to.equal('11.2');
        })
    })

    describe("Private functionality", function () {
        it("Not owner accounts are not avaliable to use or success withdrawDonations function", async function () {
           let accessToWithdrawDonations = true;

           try {
                const tryToSteal = await hardhatDonation.connect(acc2).withdrawDonations(acc2.address);
                await tryToSteal.wait();
           }
           catch (Error) {
               console.log(Error)
               accessToWithdrawDonations = false;
           }
            expect(accessToWithdrawDonations).to.equal(false)
        })

        it("Owner account successfully can use withdrawDonations function to any address", async function (){
            let accessToWithdrawDonations = false;

            const transaction = { value: ethers.utils.parseEther('10.1')}

            try {
                const donation1 = await hardhatDonation.connect(acc1).donate(transaction);
                await donation1.wait();

                const tryToUse = await hardhatDonation.connect(owner).withdrawDonations(owner.address);
                await tryToUse.wait();
                accessToWithdrawDonations = true;
            }
            catch (Error) {
                console.log(Error)
                accessToWithdrawDonations = false;
            }
            finally {
                console.log (`Owner balance now: ${await ethers.provider.getBalance(owner.address)}`)
            }
       
            try {
                const donation2 = await hardhatDonation.connect(acc1).donate(transaction);
                await donation2.wait();

                const tryToUse = await hardhatDonation.connect(owner).withdrawDonations(acc2.address);
                await tryToUse.wait();
                accessToWithdrawDonations = true;
            }
            catch (Error) {
                console.log(Error)
                accessToWithdrawDonations = false;
            }
            finally {
                console.log (`Account 2 balance now: ${await ethers.provider.getBalance(acc2.address)}`)
            }

            expect(accessToWithdrawDonations).to.equal(true)
        })
    })
})