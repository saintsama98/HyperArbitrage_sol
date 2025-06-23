// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@openzeppelin/contracts/access/Ownable.sol";

contract MinimalOwnable is Ownable {
    constructor() Ownable(msg.sender) {}
}
