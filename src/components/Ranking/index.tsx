import React from 'react';
import { style } from 'typestyle';
import ranking from '../../assets/images/icons/ranking.svg';

interface RankingProps {
  users: string[];
  points: number[];
  imageUrl?: string;
  title?: string;
  width?: string;
}

const cardHeader = style({
  backgroundColor: '#0071BC',
  borderRadius: '0.4em 0.4em 0 0',
  paddingLeft: '0.1em',
  paddingRight: '0.1em',
  color: 'white',
  display: 'flex',
  flexFlow: 'row',
  alignItems: 'center',
  justifyContent: 'start'
});

const cardTile = style({
  fontSize: '1.2em',
  display: 'flex',
  flexFlow: 'row',
  justifyContent: 'space-between',
  paddingTop: '0.2em',
  paddingBottom: '0.2em'
});

const Ranking: React.FC<RankingProps> = ({
  users,
  points,
  imageUrl = ranking,
  title = 'TOP 10 SEMANAL',
  width = 'fit-content'
}) => {
  const card = style({
    boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2);',
    borderRadius: '1em 1em 0.4em 0.4em',
    backgroundColor: 'white',
    display: 'flex',
    flexFlow: 'column',
    minWidth: '16em',
    width: width,
    justifyContent: 'space-around'
  });
  return (
    <div className={card}>
      <div className={cardHeader}>
        <img src={imageUrl} style={{ width: '4em', marginRight: '0.5em' }} alt={title} />
        <span style={{ fontSize: '1.1em', fontWeight: 'bold' }}>{title}</span>
      </div>
      <div style={{ padding: '1em' }}>
        {users.map((value, index) => {
          return (
            <div
              key={value + index}
              className={cardTile}
              style={{
                borderBottom: index < users.length - 1 ? '0.1em solid #D5D3D3' : 'none',
                color:
                  index === 0
                    ? '#EF492E'
                    : index === 1
                    ? '#FF842F'
                    : index === 2
                    ? '#FBB03B'
                    : '#0071BC'
              }}
            >
              <span>{value}</span>
              <div
                style={{
                  marginRight: '0.5em',
                  width: '2em',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <span>{points[index]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Ranking;
