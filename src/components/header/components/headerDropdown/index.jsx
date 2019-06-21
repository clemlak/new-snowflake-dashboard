import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  PopoverHeader,
  PopoverBody,
} from 'reactstrap';

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
        <PopoverHeader>
          {address.substring(0, 7)}...
        </PopoverHeader>
        <PopoverBody>
          <p>External Balances:</p>
          <p>{ethBalance} ETH</p>
          <p>{hydroBalance} Hydro</p>
          <p>dApp Store Balance:</p>
          <p>{snowflakeBalance}</p>
          <Button color="primary">
            Get more Hydro
          </Button>
        </PopoverBody>
      </Popover>
    </div>
  );
}

HeaderDropdown.propTypes = {
  target: PropTypes.string.isRequired,
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
