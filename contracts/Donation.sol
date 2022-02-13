// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {

  address private owner;
  address[] private arrayOfDonators;
  address public donationAddress;
  uint private index;

  constructor() {
    owner = msg.sender;
    donationAddress = address(this);
  }

  mapping (address => uint) internal donation;
  mapping (uint => address) internal donator;

  event Received(address, uint);

  function Donate () public payable {
    donation[msg.sender] += msg.value;

    index++;
    donator[index] = msg.sender;

    arrayOfDonators.push(donator[index]);

    emit Received(msg.sender, msg.value);
  }

  function getBalance () public view returns (uint) {
    return donationAddress.balance;
  }

  function showDonation (address donatorAddress) public view returns (uint) {
    return donation[donatorAddress];
  }

  function showAllDonators () public view returns (address[] memory) {
    require(msg.sender == owner, "You`re not an owner!");
    return arrayOfDonators;
  }

  function WithdrawDonations (address payable receiver) external onlyOwner {
    uint amount = donationAddress.balance;
    (bool success,) = receiver.call{value: amount}("");
    require(success, "Failed to send Ether");
  }

  modifier onlyOwner () {
    require(msg.sender == owner, "You`re not an owner!");
    _;
  }
}
