pragma solidity ^0.5.2;

/**
 * @title ERC20Basic
 * @dev Simpler version of ERC20 interface
 * @dev see https://github.com/ethereum/EIPs/issues/179
 */
contract ERC20Basic {
    function totalSupply() public view returns (uint256);
    function balanceOf(address who) public view returns (uint256);
    function transfer(address to, uint256 value) public returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
}


contract ERC20 is ERC20Basic {
    function allowance(address owner, address spender) public view returns (uint256);
    function transferFrom(address from, address to, uint256 value) public returns (bool);
    function approve(address spender, uint256 value) public returns (bool);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract daipay {
    event DisbursePayment(address[50] employees, uint256[50] wages);
    address DAI;

    function payEmployees( address[50] memory employees, uint256[50] memory wages) public {
        ERC20 daiToken = ERC20(DAI);
        for(uint i = 0; i < employees.length; i++) {
            daiToken.transferFrom(msg.sender, employees[i], wages[i]);
        }
        emit DisbursePayment(employees, wages);
    }
}