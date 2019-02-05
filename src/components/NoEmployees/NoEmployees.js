// @flow

import * as React from 'react';
import { Link } from 'react-router';
import {
    Input,
    InputGroup,
    Breadcrumb,
    Container,
    Header,
    Content,
    Table,
    Panel,
    Icon,
    ButtonToolbar,
    Button,
    IconButton,
    Navbar,
    DOMHelper,
    Notification
} from 'rsuite';
import SearchBar from '../SearchBar';


const { Column, HeaderCell, Cell } = Table;
const { getHeight } = DOMHelper;

type Props = {};
type State = {
    showDrawer: boolean
};

class NoEmployees extends React.Component<Props, State> {
    constructor() {
        super();
        this.state = {
            showDrawer: false
        };
    }
    handleShowDrawer = () => {
        this.setState({
            showDrawer: true
        });
    };
    handleCloseDrawer = () => {
        this.setState({
            showDrawer: false
        });
    };
    render() {
        const midTitleStyle = { position: 'absolute', width: '204px', height: '28px', left: '737px', top: '563px', color: '#063778'};
        const grayTextStyle = {position: 'absolute',width: '295px',height: '21px',left: '691px',top: '601px'};
        
        return (
            <div>
                <Panel header={
                    <div>
                        <span style= {{ display: 'inline-block', marginRight: '30px'}}>
                            <h1>Payroll</h1>
                        </span>
                        <Button appearance="primary" className="tight-border spread-button bold-font" color="green" placement="left" style={{ verticalAlign: '6px', fontSize: '12px' }} onClick={this.handleShowDrawer}>
                            PAY EMPLOYEES
                        </Button>
                    </div>}
                >
                    <SearchBar addAction={()=>{}}/>
                    <div className="error-page" style={{ textAlign: 'center' }}>
                        <div className="item">
                            <svg width="132" height="106" viewBox="0 0 132 106" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M128.341 49.8774C143.961 99.9575 108.07 79.0874 49.2483 99.9575C-9.57319 120.828 4.71696 83.1542 0.72895 51.8543C-3.25906 20.5544 10.0341 39.3341 18.3421 14.771C26.6502 -9.79221 49.2483 3.75101 49.2483 3.75101C72.8433 33.0743 112.722 -0.202619 128.341 49.8774Z" fill="#1875F0" fill-opacity="0.05" />
                                <g clip-path="url(#clip0)">
                                    <path d="M60.7895 70.8586C49.7429 70.8586 40.7878 61.9035 40.7878 50.8569H17.9287V85.1456H103.65V50.8569H80.7912C80.7912 61.9035 71.836 70.8586 60.7895 70.8586Z" fill="#4F97F8" />
                                    <path d="M104.986 50.3484L93.5566 20.3459C93.3453 19.7913 92.8137 19.4257 92.2207 19.4257H29.3582C28.7653 19.4257 28.2337 19.7913 28.0223 20.3459L16.5928 50.3484C16.5405 50.4956 16.5126 50.6498 16.5098 50.8053C16.5098 50.8242 16.5 50.8381 16.5 50.857V85.1456C16.5 85.9346 17.1397 86.5743 17.9287 86.5743H103.65C104.439 86.5743 105.079 85.9346 105.079 85.1456V50.857C105.079 50.8381 105.069 50.8242 105.069 50.8053C105.066 50.6498 105.038 50.4956 104.986 50.3484ZM30.3426 22.2831H91.2364L101.577 49.4283H80.7912C80.0022 49.4283 79.3625 50.068 79.3625 50.857C79.3625 61.1145 71.047 69.43 60.7895 69.43C50.5319 69.43 42.2165 61.1145 42.2165 50.857C42.2165 50.068 41.5768 49.4283 40.7878 49.4283H20.002L30.3426 22.2831ZM102.222 83.7169H19.3574V52.2856H39.4065C40.1544 63.545 49.505 72.295 60.7895 72.295C72.0739 72.295 81.4246 63.545 82.1724 52.2856H102.222V83.7169Z" fill="#004FAC" />
                                    <path d="M26.5009 78.0021H25.0722V73.716C25.0722 72.9271 24.4325 72.2874 23.6435 72.2874C22.8545 72.2874 22.2148 72.9271 22.2148 73.716V79.4308C22.2148 80.2198 22.8545 80.8595 23.6435 80.8595H26.5009C27.2899 80.8595 27.9296 80.2198 27.9296 79.4308C27.9296 78.6418 27.2899 78.0021 26.5009 78.0021Z" fill="#004FAC" />
                                    <path d="M35.0729 78.0021H32.2156C31.4266 78.0021 30.7869 78.6418 30.7869 79.4308C30.7869 80.2198 31.4266 80.8595 32.2156 80.8595H35.0729C35.8619 80.8595 36.5016 80.2198 36.5016 79.4308C36.5016 78.6418 35.8619 78.0021 35.0729 78.0021Z" fill="#004FAC" />
                                </g>
                                <defs>
                                    <clipPath id="clip0">
                                        <rect width="88.5789" height="88.5789" fill="white" transform="translate(16.5 8.71051)" />
                                    </clipPath>
                                </defs>
                            </svg>


                            <div className="text">
                                <h1 className="code"></h1>
                                <p>
                                    No Employee Added<br/> add an Employee to get started.
                                </p>
                            </div>
                        </div>
                    </div>
                </Panel>
                
            </div>
        );
    }
}

export default NoEmployees;
