import React from 'react';
React
import { useInView } from 'react-intersection-observer';
import PropTypes from 'prop-types';

const SlideDownSection = ({ children, className }) => {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const styles = {
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(-20px)', // Slide effect
    transition: 'opacity 1s ease, transform 1s ease',
  };

  return (
    <div 
      ref={ref} 
      className={`${className} slide-down-section`} 
      style={styles}
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
