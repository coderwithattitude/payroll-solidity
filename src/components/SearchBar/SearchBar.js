// @flow

import * as React from 'react';
import { Link } from 'react-router';
import {
    Input,
    InputGroup,
    Table,
    Icon,
    ButtonToolbar,
    Button,
    IconButton,
    DOMHelper,
} from 'rsuite';

class SearchBar extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            addActon: this.props.addActon || function () {}
        };
    }

    render () {
        return (
            <div className="table-toolbar search-bar">

                <div className="inner-right">
                    <div style={{display: 'inline-block'}}>
                        <InputGroup inside className="tight-border">
                            <Input placeholder="Search" />
                            <InputGroup.Addon>
                                <Icon icon="search" />
                            </InputGroup.Addon>
                        </InputGroup>
                    </div>

                    <Button appearance="primary" placement="left" onClick={this.handleShowModal} className="tight-border spread-button deep-blue bold-font" onClick={this.state.addActon}>
                        <Icon icon="plus" style={{ marginRight: '12px' }}  />
                        ADD EMPLOYEE
                    </Button>
                </div>
            </div>
        );
    }
}

export default SearchBar;