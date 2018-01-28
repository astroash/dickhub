import React from 'react';
import { Head, Container, Logo, Avatar } from './index.styles';
import logo from '../../../dickhub.svg';

const Header = () => (
  <Head role="banner">
    <Container>
      <a href="" aria-label="Issues Page">
        <Logo src={logo} alt="dickhub-logo" />
      </a>
      {/* below we should pass in the avatar the user has selected as props so that it shows in the header when the user is logged in */}
      {/* {avatar ? <Avatar src={avatar} alt="avatar" /> : null} */}
    </Container>
  </Head>
);

export default Header;
