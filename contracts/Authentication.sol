pragma solidity ^0.5.0;

import "./zeppelin/lifecycle/Killable.sol";

contract Authentication is Killable {
  
    mapping (address => bytes32) private users;

    uint private id; // user id temp storage


    function login() public view onlyExistingUser returns (bytes32) {
        return (users[msg.sender].name);
    }

    function signup(bytes32 name, bytes32 salt) public onlyValidName(name) returns (bytes32) {
        bytes32 org = keccak256(abi.encodePacked(name,salt));
        if (users[msg.sender] == 0x0) {
            users[msg.sender] = org;

            return (users[msg.sender]);
        }

        return (users[msg.sender]);
    }

    function update(bytes32 name, bytes32 salt) public payable onlyValidName(name) onlyExistingUser returns (bytes32) {
        bytes32 org = keccak256(abi.encodePacked(name,salt));

        if (users[msg.sender] != 0x0) {
            users[msg.sender] = org;

            return (users[msg.sender]);
        }
    }

    modifier onlyExistingUser {
        require(!(user[msg.sender] == 0x0), "User does not exist");
        _;
    }

    modifier onlyValidName(bytes32 name) {
        require(!(name == 0x0), "invalid name");
        _;
    }

}