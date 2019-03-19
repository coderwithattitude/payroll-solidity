import AuthenticationContract from '';
import { loginUser } from './login';
import store from '../store';

const contract = require('truffle-contract');

export function signUpUser(name) {
    let web3 = store.getState().web3.web3Instance;

    if (typeof web3 !== 'undefined') {
        return function(dispatch) {
            const authentication = contract(AuthenticationContract);
            authentication.setProvider(web3.currentProvider)

            let authenticationInstance;

            web3.eth.getCoinbase((error, coinbase) => {
                if (error) {
                    console.error(error);
                }

                authentication.deployed()
                .then((result)=> {
                    return dispatch(loginUser());
                })
                .catch((result) => {
                    console.log(result);
                });
            });
        }
    } else {
        console.error('Web3 is not initialized');
    }
}
