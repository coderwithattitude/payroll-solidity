import {ipfs} from 'ipfs';
import {OrbitDB} from 'orbit-db';

const ipfs = new ipfs();
const orbitdb = new OrbitDB(ipfs);
const docstore = orbitdb.docstore('payroll-db');