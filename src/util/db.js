import {ipfs} from 'ipfs';
import {OrbitDB} from 'orbit-db';

const ipfsOptions = {
    EXPERIMENTAL: {
        pubsub: true
    }
}

const ipfs = new IPFS(ipfsOptions);
ipfs.on('ready', () => {
    
})