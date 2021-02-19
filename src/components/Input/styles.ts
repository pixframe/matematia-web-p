// For simple customizations

export const Colors = {
  labelColor: '#666'
};

export const Sizes = {
  labelFontSize: '.9em'
};

export const BaseInput = {
  container: {
    padding: '0 0 0.6em 0'
  },
  labelContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  label: {
    padding: '0 0 0.6em 0',
    color: Colors.labelColor,
    fontSize: Sizes.labelFontSize
  },
  input: {
    width: '100%',
    fontSize: '1em',
    height: '2.9em',
    background: '#fff',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    padding: '0 0.5em',
    outline: '0'
  },
  errorContainer: {
    height: '1em',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  error: {
    color: 'red'
  }
};
