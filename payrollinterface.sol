pragma solidity ^0.4.10;
contract PayrollInterface {
/* OWNER ONLY */
address owner;
uint256 empId;
uint256 empCount;
address oracle;
uint256 EURrate;
function PayrollInterface( address _oracle){
    oracle = _oracle;
    owner = msg.sender;
}
struct Employee {
    bytes32 name;
    address account;
    address[] allowedTokens;
    uint256 salary;
    uint256 lastPayday;
    uint256[] distribution;
}

mapping (uint256 => Employee)public employees;
mapping(address => uint256) public depositHistory;

event EURExchangeRateSet(uint256 _rate, uint256 _time);
event Employees(address _employee, uint256 _time, bool _state);
event Deposit(uint256 _amount, uint256 _time);
event Withdraw(uint256 _amount, uint256 _time);
event Payday(uint256 _amount, uint256 _rate, uint256 _time);

function addEmployee(address _accountAddress, bytes32 _name, address[] _allowedTokens, uint256 _initialYearlyEURSalary) isOwner{
    uint256 _empId = empId++;
    employees[_empId].account = _accountAddress;
    employees[_empId].allowedTokens = _allowedTokens;
    employees[_empId].salary = _initialYearlyEURSalary;
    employees[_empId].name = _name;
   ++empCount;
   Employees(employees[_empId].account, now, true);

}
function setEmployeeSalary(uint256 employeeId, uint256 yearlyEURSalary) isOwner{
    employees[employeeId].salary = yearlyEURSalary;
}
function removeEmployee(uint256 _empId) isOwner{
    delete employees[_empId].account;
    delete employees[_empId].salary;
    delete employees[_empId].name;
    delete employees[_empId].lastPayday;
     --empCount;
     Employees(employees[_empId].account, now, false);
}
function addFunds() payable{
    Deposit(msg.value, now);
}
function scapeHatch()isOwner {
    owner.transfer(this.balance);
    Withdraw(this.balance, now);
}
// function addTokenFunds()? // Use approveAndCall or ERC223 tokenFallback
function getEmployeeCount() constant returns (uint256){
    return empCount;
}
function getEmployee(uint256 _empId) constant returns (address _employee, bytes32 _name,  uint256 _salary){
    _employee = employees[_empId].account;
    _name = employees[_empId].name;
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

function payday(uint256 _empId) isEmployee(_empId) balanceCheck onlyAfter(_empId, 4){

   uint256 converted = employees[_empId].salary * EURrate;
    (employees[_empId].account).transfer(converted);
    Payday(converted, EURrate, now);

} // only callable once a month


/* ORACLE ONLY */
function setExchangeRate(uint256 EURExchangeRate)isOracle {
    EURrate = EURExchangeRate;
    EURExchangeRateSet(EURrate, now);
} // uses decimals from token

modifier isOwner(){
    require(msg.sender == owner);
    _;
}
modifier isOracle(){
    require(msg.sender == oracle);
    _;
}
modifier onlyAfter(uint256 _empId, uint256 _period){
    if(employees[_empId].lastPayday != 0)
        require((now - employees[_empId].lastPayday) >= (_period * 1 weeks) );
    _;
}
modifier isEmployee(uint256 _empId){
    require(employees[_empId].account != 0x0);
    _;
}

modifier balanceCheck(){
    require(this.balance >= calculatePayrollBurnrate());
    _;
}
}

