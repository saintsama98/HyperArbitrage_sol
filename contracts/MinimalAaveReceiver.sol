// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";

contract MinimalAaveReceiver is FlashLoanSimpleReceiverBase {
    event DebugLog(string message, address value);
    constructor(address _provider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_provider)) {
        emit DebugLog("Initializing FlashLoanSimpleReceiverBase with provider", _provider);
        require(_provider != address(0), "Provider address is zero");
        uint256 size;
        assembly { size := extcodesize(_provider) }
        require(size > 0, "Provider is not a contract");
    }

    function executeOperation(
        address,
        uint256,
        uint256,
        address,
        bytes calldata
    ) external override returns (bool) {
        return true;
    }
}
