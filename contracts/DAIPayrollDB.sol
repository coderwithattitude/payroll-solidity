pragma solidity ^0.5.1;

contract DAIPayrollDB {
    
    struct Employees {
        address addr;
        uint wages;
    }
    
    struct Oraganizations {
        string name;
        address admin;
        Employees[] employee;
    }
 
    mapping (address => Oraganizations) orgs;

    function addOrganisation(string memory name, address[] memory employees, uint[] memory wages) public {
        require(employees.length == wages.length);
        orgs[msg.sender].name = name;
        orgs[msg.sender].admin = msg.sender;
        for(uint8 i=0; i <= employees.length; i++){
            orgs[msg.sender].employee[i].addr = employees[i];
            orgs[msg.sender].employee[i].wages = wages[i];
        }
    }
    
    function addEmployee(address addr, uint wages) public {
        require(msg.sender == orgs[msg.sender].admin);
        uint count = orgs[msg.sender].employee.length;
        orgs[msg.sender].employee[count++].addr = addr;
        orgs[msg.sender].employee[count++].wages = wages;
        
    }
}