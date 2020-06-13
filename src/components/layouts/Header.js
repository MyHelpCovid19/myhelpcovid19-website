import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import './Header.scss';
import iconForWeb from '../../assets/images/logo192.png';

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img src={iconForWeb} alt="" />
          MyHelpCovid19
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/essentials/">Covid-19 Essential Products</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/livenewschannels/">Live News Channels</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/freecourses/">Free Courses</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/faqs/">FAQs</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
