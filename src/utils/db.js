// @TODO implement class

import {IPFS} from 'ipfs';
import {OrbitDB} from 'orbit-db';

const ipfs = new IPFS(); // new ipfs instance
const orbitdb = new OrbitDB(ipfs); // connect orbitdb to ipfs instance
const docstore = orbitdb.docs('payroll-db'); // create new orbitdb document database

// 
export async function addOrganization(name, admin, email, employees={}) {
    
    try {
        // Add organisation to payrolldb in orbitdb
        await docstore.put({ _id: admin,
                             orgname: name, 
                             email: email, 
                             employees: employees });
        return true;
    } catch(e) {
        console.log('error adding org name',e)
        return false;
    } 

}

// Retrieve organisation from payrollDb
export async function getOrganisation(addr) {
    let org;
    try {
        org = await docstore.get(addr);
    } catch(e) {
        console.log('Error fetching org:',e);
    }
    
    return org;
}

// Delete Organisation from PayrollDb
export async function deleteOrganisation(addr) {
    try {
        return await docstore.del(addr);
    } catch(e) {
        console.log('Error deleting org:', e);
    }
}



// Add employee into organisation in payrolldb
export async function addEmployee(admin,name,addr,rate,minHours,position,organisation) {

    let empObj = {
        [addr]: {
            address: addr,
            name: name,
            rate: rate,
            minHours: minHours,
            position: position,
            organisation: organisation
        }
    }
    try {
        let payrolldb = docstore.get(admin); // retrieve existing employee object
        await docstore.put({_id: addr, employees: Object.assign(payrolldb.employees, empObj)});
        return true;
    } catch(e) {
        console.log('Error adding employee',e);
        return false;
    }
}

// Get all employees for an organisation in payrollDB
export async function getEmployees(admin) {
    try {
        return await docstore.get(admin).employees;
    } catch(e) {
        console.log('error fetching employees',e);
    }
}

// delete employee from organisation
export async function deleteEmployee(admin,employee) {
    let employee_;
    employee_ = await docstore.get(admin).employees;
    delete employee_[employee];
    await docstore.put({_id:admin,employees:employee_});

}

