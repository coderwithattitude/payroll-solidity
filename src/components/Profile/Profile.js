import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import {
  Button,
  Col,
  Container,
  Content,
  FlexboxGrid,
  Icon,
  Grid,
  Nav,
  Navbar,
  DOMHelper,
  Row,
} from 'rsuite';

import { pageview } from '../../tracker';

import save_time_icon from '../../images/home/save_time_icon.png';
import zero_volatility_icon from '../../images/home/zero_volatility_icon.png';
import work_time_calculator_icon from '../../images/home/work_time_calculator_icon.png';

const { getHeight, on } = DOMHelper;
const contactNumber = '+2348056556566';
const contactEmail = 'hello@daipay.com';
const contactSocial = {
  twitter: '',
  linkedin: '',
  github: 'https://github.com/renown-fruit/dai-payroll',
  reddit: ''
}

type State = {
  windowHeight: number
};

class Profile extends React.Component<Props, State> {
}

export default Profile;