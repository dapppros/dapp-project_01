//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Exchange {
    address public houseAccount;
    uint256 public gasPercent;

    constructor(address _houseAccount, uint256 _gasPercent) {
        houseAccount = _houseAccount;
        gasPercent = _gasPercent;
    }
}
