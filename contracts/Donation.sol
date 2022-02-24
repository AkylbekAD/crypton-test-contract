// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {

  address private owner;
  address[] private arrayOfDonators;
  address public donationAddress;

  constructor() {
    owner = msg.sender;
  }

  mapping (address => uint) internal donation;

  event Received(address, uint);

  function donate () public payable {
    donation[msg.sender] += msg.value;
    arrayOfDonators.push(msg.sender);

    emit Received(msg.sender, msg.value);
  }

  function getBalance () public view returns (uint) {
    return donationAddress.balance;
  }

  function showDonationSum (address donatorAddress) public view returns (uint) {
    return donation[donatorAddress];
  }

  function showAllDonators () public view onlyOwner returns (address[] memory) {
    return arrayOfDonators;
  }

  function withdrawDonations (address payable _receiver) external onlyOwner {
    _receiver.transfer(address(this).balance);
  }

  modifier onlyOwner () {
    require(msg.sender == owner, "You`re not an owner!");
    _;
  }

  receive() external payable {
    donation[msg.sender] += msg.value;
    arrayOfDonators.push(msg.sender);

    emit Received(msg.sender, msg.value);
  }
}
