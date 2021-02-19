import React from 'react';
import Layout from '../../components/Layout';
import { style } from 'typestyle';
import { Button } from '@calderaro/react-toolbox';

interface PlayWelcomeProps {
  onContinue: () => void;
}

const container = style({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '6em 1em 1em 1em'
});

const title = style({
  color: '#666',
  fontSize: '2em',
  padding: '0 0 3em 0'
});

const PlayWelcome: React.FC<PlayWelcomeProps> = ({ onContinue }) => (
  <Layout>
    <div className={container}>
      <div className={title}>¡Bienvenido!</div>
      <Button theme="green" onClick={onContinue}>
        Empezar a jugar
      </Button>
    </div>
  </Layout>
);

export default PlayWelcome;
