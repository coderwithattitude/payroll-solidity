// @TODO implement class

const IPFS = require('ipfs');
const OrbitDB = require('orbit-db');
let orbitdb, docstore;
const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true
  }
}

const ipfs = new IPFS(ipfsOptions); // new ipfs instance

ipfs.on('ready', () => {
  // Create OrbitDB instance
  orbitdb = new OrbitDB(ipfs);
  docstore = orbitdb.docs('payroll-db');
  console.log('orbit: ',orbitdb);
  console.log('orbit db: ',docstore);

})

//const orbitdb = new OrbitDB(ipfs); // connect orbitdb to ipfs instance
//const docstore = orbitdb.docs('payroll-db'); // create new orbitdb document database


export function addOrganization(name, admin, email) {
    
    // Add organisation to payrolldb in orbitdb
    orbitdb.docstore('payroll-db').then((docstore) => {
    docstore.put({ _id: admin, orgName: name, 
                 email: email, employees: {} }).then((hash)=>console.log('org added', hash))
                 .catch((e)=>console.error('error adding organisation',e));
    });
    
}

// Retrieve organisation from payrollDb
export function getOrganisation(addr) {
    let org;
    orbitdb.docstore('payroll-db').then((docstore) => {
    docstore.get(addr).then((value)=> org = value);
    });
    console.log('org', org);
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
export function addEmployee(admin,name,addr,rate,minHours,position,organisation) {
    
    //let _id = Object.keys(docstore.get(admin).employees).length;
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
        //let payrolldb = await docstore.get(admin); // retrieve existing employee object
        orbitdb.docstore('payroll-db').then((docstore) => {
            docstore.get(admin).then((value) => docstore.put({ _id: admin, employees: Object.assign(value.employees, empObj) })) // retrieve existing employee object
                
                .then((hash)=>console.log('hash',docstore.get(admin)) );
            });
        
        //console.log('paydb',payrolldb);
        return true;
    } catch(e) {
        console.log('Error adding employee',e);
        return false;
    }
}

// Get all employees for an organisation in payrollDB
export function getEmployees(admin) {
    try {
        orbitdb.docstore('payroll-db').then((docstore) => {
        docstore.get(admin).then((value) => value.employees);
        });
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

