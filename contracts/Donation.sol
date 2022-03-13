// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Donation {

  address public owner;
  address[] internal arrayOfDonators;
  address public donationAddress;

  constructor() {
    owner = msg.sender;
    donationAddress = address(this);
  }

  mapping (address => uint) internal donation;

  event Received(address, uint);

  receive() external payable {
    if(donation[msg.sender] == 0) {
            arrayOfDonators.push(msg.sender);
        }
    donation[msg.sender] += msg.value;

    emit Received(msg.sender, msg.value);
  }
  
  fallback() external payable {    
    emit Received(msg.sender, msg.value);
  }

  function donate () public payable {
    if(donation[msg.sender] == 0) {
      arrayOfDonators.push(msg.sender);
    }
    donation[msg.sender] += msg.value;

    emit Received(msg.sender, msg.value);
  }

  function getBalance () public view returns (uint) {
    return address(this).balance;
  }

  function showDonationSum (address donatorAddress) public view returns (uint) {
    return donation[donatorAddress];
  } //впринципе не обязательная функция, т.к. mapping donation может возвращать тоже самое

  function showAllDonators () public view returns (address[] memory) {
    return arrayOfDonators;
  }

  function withdrawDonations (address payable _receiver) payable external onlyOwner {
    _receiver.transfer(msg.value);
  }

  modifier onlyOwner () {
    require(msg.sender == owner, "You`re not an owner!");
    _;
  }
}