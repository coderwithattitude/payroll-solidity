pragma solidity ^0.5.0;

import "./zeppelin/lifecycle/Killable.sol";

contract Authentication is Killable {
    struct User {
        bytes32 name;
    }

    mapping (address => User) private users;

    uint private id; // user id temp storage


    function login() public view onlyExistingUser returns (bytes32) {
        return (users[msg.sender].name);
    }

    function signup(bytes32 name) public onlyValidName(name) returns (bytes32) {
        if (users[msg.sender].name == 0x0) {
            users[msg.sender].name = name;
            return (users[msg.sender].name);
        }

        return (users[msg.sender].name);
    }

    function update(bytes32 name) public payable onlyValidName(name) onlyExistingUser returns (bytes32) {
        if (users[msg.sender].name != 0x0) {
            users[msg.sender].name = name;

            return (users[msg.sender].name);
        }
    }

    modifier onlyExistingUser {
        require(!(user[msg.sender].name == 0x0), "User does npt exist");
        _;
    }

    modifier onlyValidName(bytes32 name) {
        require(!(name == 0x0), "invalid name");
        _;
    }

}