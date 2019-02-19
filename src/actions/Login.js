import AuthenticationContract from "../../build/contracts/Authentication.json";
import { browserHistory } from 'react-router';
import store from '../store';

const contract = require('truffle-contract')

export const USER_LOGGED_IN = 'USER_LOOGED_IN';

// user login dispatch function
function userLoggedIn(user) {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}
// redux action to authenticate user via authentication smart contract
export function loginUser() {

    // get web3 instance from store
    let web3 = store.getState().web3.web3Instance;
    
    if(typeof web3 !== 'undefined') {
        return function(dispatch) {

            // retrieve contract abi
            const authentication = contract(AuthenticationContract);

            // set provider for smart contract
            authentication.setProvider(web3.currentProvider);
            
            let authenticationInstance;

            web3.eth.getCoinbase((error, coinbase) => {
                if(error) {
                    console.error(error);
                }
                authentication.deployed().then((instance) => {
                    authenticationInstance = instance;

                    authenticationInstance.login({from: coinbase})
                    .then((result) => {
                        let userName = web3.toUtf8(result);
                        dispatch(userLoggedIn({"name": userName}));

                        let currentLocation = browserHistory.getCurrentLocation();

                        if('redirect' in currentLocation.query) {
                            return browserHistory.push(decodeURIComponent(currentLocation.query.redirect))
                        }

                        // if successful redirect to payroll dashboard
                        return browserHistory.push('/dashboard');
                    }).catch((result) => {
                        // If error, go to signup page.
                         console.error('Wallet ' + coinbase + ' does not have an account!');

                         return browserHistory.push('/signup');
                    })
                })
            })
        }
    } else {
        console.error('Web3 is not initialized')
    }
}