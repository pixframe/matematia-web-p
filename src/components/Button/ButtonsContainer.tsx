import React, { Children } from 'react';
import { stylesheet } from 'typestyle';

const styles = stylesheet({
  buttonsContainer: {
    padding: '1em 0 0 0',
    display: 'flex'
  },
  buttonWrapper: {
    padding: '0 1em 0 0'
  }
});

interface Props {
  justifyContent?: 'flex-end' | 'flex-start' | 'center';
}

const ButtonsContainer: React.FC<Props> = ({ children, justifyContent }) => (
  <div className={styles.buttonsContainer} style={{ justifyContent }}>
    {Children.map(children, (child) => (
      <div className={styles.buttonWrapper}>{child}</div>
    ))}
  </div>
);

ButtonsContainer.defaultProps = {
  justifyContent: 'flex-end'
};

export default ButtonsContainer;
