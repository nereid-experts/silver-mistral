// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureWallet {
    address public owner1;
    address public owner2;
    uint256 public withdrawalCount;

    event Deposit(address indexed sender, uint256 amount);
    event Withdrawal(address indexed receiver, uint256 amount);

    modifier onlyOwners() {
        require(msg.sender == owner1 || msg.sender == owner2, "Not authorized");
        _;
    }

    modifier enoughApprovals() {
        require(withdrawalCount >= 2, "Not enough approvals");
        _;
    }

    constructor(address _owner1, address _owner2) {
        owner1 = _owner1;
        owner2 = _owner2;
        withdrawalCount = 0;
    }

    receive() external payable {
        emit Deposit(msg.sender, msg.value);
    }

    function approveWithdrawal() external onlyOwners {
        withdrawalCount++;
    }

    function withdraw(uint256 amount) external onlyOwners enoughApprovals {
        require(address(this).balance >= amount, "Insufficient funds");
        payable(msg.sender).transfer(amount);
        emit Withdrawal(msg.sender, amount);
        withdrawalCount = 0; // Reset after successful withdrawal
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
