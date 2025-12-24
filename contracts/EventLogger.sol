// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract EventLogger {
    event ActionLogged(address indexed user, string action, uint256 timestamp);

    function logAction(string calldata action) external {
        emit ActionLogged(msg.sender, action, block.timestamp);
    }

    function getActionHash(address user, string calldata action) external view returns (bytes32) {
        return keccak256(abi.encodePacked(user, action, block.timestamp));
    }
}
