import React from 'react';
import { connect } from 'react-redux';
//import { handleAddOrg } from '../../actions/org';

class SignUp extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            orgName: '',
            wallet: '',
            email: ''

        }
    }

    handleInputChange = (e) => {
        const { value, name } = e.target;

        this.setState(() => ({
            [name]: value
        }));
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.dispatch(handleAddOrg(this.state));
    }


render () {
    return(
        <div className="split-container">
        <p>Hello!!</p>
            <div className="split-item split-left"></div>
            <div className="split-item split-right"></div>
        </div>
    );
}
}

export default SignUp;