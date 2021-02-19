import { stylesheet } from 'typestyle';

const styles = stylesheet({
  list: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gridGap: '1em',
    transition: 'all 0.2s ease-in-out',
    maxWidth: 'calc(280px * 4.5)',
    margin: '0 auto',
    padding: '2em 1em'
  },
  card: {
    cursor: 'pointer',
    boxShadow: '0px 4px 20px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    transition: 'all 0.1s ease',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    breakInside: 'avoid',
    background: '#fff',
    fontSize: '1em',
    padding: '1em',
    minHeight: '20em',
    color: '#666',

    '&:hover': {
      boxShadow: '2px 6px 20px 5px rgba(0, 0, 0, 0.15)',
      transform: 'translateY(-5px) scale(1.02)'
    }
  }
});

export default styles;
