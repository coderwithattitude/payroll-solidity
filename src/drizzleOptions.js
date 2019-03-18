import DAIPay from '../build/contracts/DAIPay.json';

const drizzleOptions = {
  web3: {
    block: false,
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [
    DAIPay
  ],
  events: {
    DAIPay: ['DisbursePayment']
  },
  polls: {
    accounts: 1500
  }
}

export default drizzleOptions;