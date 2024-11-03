import React from 'react';
React
import { useInView } from 'react-intersection-observer';
import './SlideDownSection.css'; // Custom CSS for slide-down effect
import PropTypes from 'prop-types';

const SlideDownSection = ({ children, className }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div 
      ref={ref} 
      className={`${className} slide-down-section ${inView ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
};

SlideDownSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SlideDownSection;
