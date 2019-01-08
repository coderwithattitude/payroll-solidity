import {IPFS} from 'ipfs';
import {OrbitDB} from 'orbit-db';

const ipfs = new IPFS();
const orbitdb = new OrbitDB(ipfs);
const docstore = await orbitdb.docstore('payroll-db');

export async function addOrganization(name, admin, employees=1, email,) {
    try {
        await docstore.put({ _id: admin, orgname: name, noofemps:employees, email: email });
    } catch(e) {
        console.log('error adding org name',e)
    } 

}



