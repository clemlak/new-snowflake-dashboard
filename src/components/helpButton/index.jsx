/**
 * Displays a help button triggering a tooltip on hover
 */

import React, {
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import {
  IoIosHelpCircleOutline,
} from 'react-icons/io';

import Tooltip from '../tooltip';

function HelpButton(props) {
  const {
    content,
  } = props;

  const [isTooltipOpen, setIsTooltipOpen] = useState(true);

  const iconRef = useRef();

  return (
    <div>
      <div className="text-center" ref={iconRef}>
        <IoIosHelpCircleOutline
          className="wallet__help help"
        />
      </div>
      {iconRef.current && (
        <Tooltip
          target={iconRef}
          content={content}
          isOpen={isTooltipOpen}
          toggle={() => setIsTooltipOpen(!isTooltipOpen)}
        />
      )}
    </div>
  );
}

HelpButton.propTypes = {
  content: PropTypes.string.isRequired,
};

export default HelpButton;
