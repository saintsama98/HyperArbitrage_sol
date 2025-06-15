// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IUniswapV2Router {
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

contract ArbitrageBot is FlashLoanSimpleReceiverBase, Ownable {
    event ConstructorLog(address providerAddress);
    event DebugLog(string message, address value);

    constructor(address _provider) FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_provider)) Ownable(msg.sender) {
        emit DebugLog("Initializing FlashLoanSimpleReceiverBase with provider", _provider);
        emit DebugLog("Setting owner to", msg.sender);
    }

    struct ArbitrageParams {
        address tokenA;
        address tokenB;
        address router1;
        address router2;
        uint amountOutMin1;
        uint amountOutMin2;
    }

    // To be called only by the Aave Pool contract
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external override returns (bool) {
        ArbitrageParams memory arbParams = abi.decode(params, (ArbitrageParams));

        // Approve tokenA for router1
        IERC20(arbParams.tokenA).approve(arbParams.router1, amount);

        // Swap on Router 1
        address[] memory path1 = new address[](2);
        path1[0] = arbParams.tokenA;
        path1[1] = arbParams.tokenB;

        IUniswapV2Router(arbParams.router1).swapExactTokensForTokens(
            amount,
            arbParams.amountOutMin1,
            path1,
            address(this),
            block.timestamp
        );

        // Get the swapped tokenB balance
        uint tokenBAmount = IERC20(arbParams.tokenB).balanceOf(address(this));

        // Approve tokenB for router2
        IERC20(arbParams.tokenB).approve(arbParams.router2, tokenBAmount);

        // Swap back to tokenA on Router 2
        address[] memory path2 = new address[](2);
        path2[0] = arbParams.tokenB;
        path2[1] = arbParams.tokenA;

        IUniswapV2Router(arbParams.router2).swapExactTokensForTokens(
            tokenBAmount,
            arbParams.amountOutMin2,
            path2,
            address(this),
            block.timestamp
        );

        // Repay flash loan + premium
        uint total = amount + premium;
        IERC20(asset).approve(address(POOL), total);

        return true;
    }

    // Called off-chain or manually to initiate arbitrage
    function requestFlashLoan(
        address token,
        uint amount,
        bytes calldata params
    ) external onlyOwner {
        POOL.flashLoanSimple(
            address(this), // receiver
            token,
            amount,
            params,
            0 // referralCode
        );
    }
}
