pragma solidity ^0.4.10;
contract PayrollInterface {
/* OWNER ONLY */
address owner;
uint256 empId;
uint256 empCount;
function PayrollInterface(){
    owner = msg.sender;
}
struct Employee {
    bytes32 name;
    address account;
    address[] allowedTokens;
    uint256 salary;

}

mapping (uint256 => Employee)public employees;
function addEmployee(address _accountAddress, bytes32 _name, address[] _allowedTokens, uint256 _initialYearlyEURSalary) isOwner{
    uint256 _empId = empId++;
    employees[_empId].account = _accountAddress;
    employees[_empId].allowedTokens = _allowedTokens;
    employees[_empId].salary = _initialYearlyEURSalary;
    employees[_empId].name = _name;
   ++empCount;

}
function setEmployeeSalary(uint256 employeeId, uint256 yearlyEURSalary) isOwner{
    employees[employeeId].salary = yearlyEURSalary;
}
function removeEmployee(uint256 _empId) isOwner{
    delete employees[_empId].account;
    delete employees[_empId].allowedTokens;
    delete employees[_empId].salary;
    delete employees[_empId].name;
     --empCount;
}
function addFunds() payable;
function scapeHatch();
// function addTokenFunds()? // Use approveAndCall or ERC223 tokenFallback
function getEmployeeCount() constant returns (uint256){
    return empCount;
}
function getEmployee(uint256 _empId) constant returns (address _employee, bytes32 _name, address[] _allowedTokens, uint256 _salary){
    _employee = employees[_empId].account;
    _name = employees[_empId].name;
    _allowedTokens = employees[_empId].allowedTokens;
    _salary = employees[_empId].salary;

} // Return all important info too
function calculatePayrollBurnrate() constant returns (uint256){
    uint256 burnRate;
    for(uint256 i =0; i<=empCount; i++){
        burnRate += employees[empCount].salary;
    }
    return burnRate;
} // Monthly EUR amount spent in salaries
function calculatePayrollRunway() constant returns (uint256){
   return (this.balance - calculatePayrollBurnrate());
    }// Days until the contract can run out of funds
/* EMPLOYEE ONLY */
function determineAllocation(address[] tokens, uint256[] distribution); // only callable once every 6 months
function payday(); // only callable once a month
/* ORACLE ONLY */
function setExchangeRate(address token, uint256 EURExchangeRate); // uses decimals from token

modifier isOwner(){
    require(msg.sender == owner);
    _;
}
modifier isSixMonths(){

    _;
}
}

