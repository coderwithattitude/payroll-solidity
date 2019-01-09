import {IPFS} from 'ipfs';
import {OrbitDB} from 'orbit-db';

const ipfs = new IPFS();
const orbitdb = new OrbitDB(ipfs);
const docstore = orbitdb.docs('payroll-db');

export async function addOrganization(name, admin, employeeCount=1, email, employees={}) {
    try {
        await docstore.put({ _id: admin, orgname: name, noofemps:employeeCount, email: email, employees: employees });
        return true;
    } catch(e) {
        console.log('error adding org name',e)
        return false;
    } 

}

export async function getOrganisation(addr) {
    let org;
    try {
        org = await docstore.get(addr);
    } catch(e) {
        console.log('Error fetching org:',e);
    }
    
    return org;
} 

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
    let payrolldb = docstore.get(admin);
    await docstore.put({_id: addr, employees: Object.assign(payrolldb.employees, empObj)});
    return true;
} catch(e) {
    console.log('Error adding employee',e);
    return false;
}
}



