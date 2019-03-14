import React from 'react';
import { connect } from 'react-redux';
//import { handleAddOrg } from '../../actions/org';
import { FlexboxGrid } from 'rsuite';
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
        <div className='show-grid'>
            <FlexboxGrid>
                <FlexboxGrid.Item className='split-item split-left' colspan={12}>
                    <h1><strong>Alkpay</strong></h1>
                    <br/>
                    <h2>Welcome aboard.</h2>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item justify='center' className='split-item split-right' colspan={12}><div>form</div></FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}
}

export default SignUp;