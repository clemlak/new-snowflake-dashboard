/**
 * Displays an Identicon
 * TODO: Identity - Convert this class to a hook
 * BUG: Identity - Investigate why this is not looking like the other identicons in other applications. Newer version?
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Blockies from '../../services/blockies';

class BlockiesIdenticon extends Component {
  constructor(props) {
    super(props);

    const {
      seed,
      color,
      bgColor,
      size,
      scale,
      spotColor,
    } = props;

    this.state = {
      seed,
      color,
      bgColor,
      size,
      scale,
      spotColor,
    };
  }

  componentDidMount() {
    const {
      seed,
      color,
      bgColor,
      size,
      scale,
      spotColor,
    } = this.state;

    Blockies.render({
      seed,
      color,
      bgColor,
      size,
      scale,
      spotColor,
    }, this.canvas);
  }

  render() {
    return React.createElement('canvas', {
      ref: canvas => this.canvas = canvas,
      className: 'identity__identicon',
    });
  }
}

BlockiesIdenticon.propTypes = {
  seed: PropTypes.string,
  color: PropTypes.string,
  bgColor: PropTypes.string,
  size: PropTypes.number,
  scale: PropTypes.number,
  spotColor: PropTypes.string,
};

BlockiesIdenticon.defaultProps = {
  seed: 'foo',
  color: '#dfe',
  bgColor: '#a71',
  size: 15,
  scale: 3,
  spotColor: '#000',
};

export default BlockiesIdenticon;
