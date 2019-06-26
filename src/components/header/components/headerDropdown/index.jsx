import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';
import {
  NavLink,
} from 'react-router-dom';

function HeaderDropdown(props) {
  const {
    target,
    isOpen,
    toggle,
    address,
    snowflakeBalance,
    hydroBalance,
    ethBalance,
  } = props;

  return (
    <div>
      <Popover placement="bottom" isOpen={isOpen} target={target} toggle={toggle} className="header-dropdown">
        <PopoverHeader className="header-dropdown__header text-center">
          <span className="header-dropdown__address-prefix">
            0x
          </span>
          {' '}
          <span className="header-dropdown__address">
            {`${address.substring(2, 15)}...`}
          </span>
        </PopoverHeader>
        <PopoverBody className="header-dropdown__body">
          <p className="header-dropdown__title mb-0">
            External Balances:
          </p>
          <p className="mb-0">
            E
            {' '}
            {ethBalance}
          </p>
          <p>
            H
            {' '}
            {hydroBalance}
          </p>
          <p className="header-dropdown__title mb-0">
            dApp Store Balance:
          </p>
          <p className="mb-0">
            H
            {' '}
            {snowflakeBalance}
          </p>
        </PopoverBody>
        <div className="header-dropdown__footer">
          <Button tag={NavLink} color="primary" exact to="/wallet">
            Get more Hydro
          </Button>
        </div>
      </Popover>
    </div>
  );
}

HeaderDropdown.propTypes = {
  /* eslint-disable-next-line react/forbid-prop-types */
  target: PropTypes.object.isRequired,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func.isRequired,
  address: PropTypes.string,
  snowflakeBalance: PropTypes.string,
  hydroBalance: PropTypes.string,
  ethBalance: PropTypes.string,
};

HeaderDropdown.defaultProps = {
  isOpen: false,
  address: '0x...',
  snowflakeBalance: '0',
  hydroBalance: '0',
  ethBalance: '0',
};

export default HeaderDropdown;
