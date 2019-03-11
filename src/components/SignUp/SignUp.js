import React from 'react';

class SignUp extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            orgName: '',
            wallet: '',
            email: ''

        }
    }
}

export default SignUp;