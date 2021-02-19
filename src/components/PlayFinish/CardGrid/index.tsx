import React from 'react';
import { Topic } from '../../../utils/types';
import { styles } from '../styles';
import { i18n } from 'i18next';
import Card from '../Card';

interface CardGridProps {
  needTopic: Topic;
  i18n: i18n | undefined;
  setSelectedHelp: (value: number) => void;
}

const CardGrid: React.FC<CardGridProps> = ({ needTopic, i18n, setSelectedHelp }) => {
  const hasBlibliografy = needTopic.resources.find((resource) => resource.kind === 'bibliografy');
  const normalResources = needTopic.resources.filter((resource) => resource.kind !== 'bibliografy');

  return (
    <div className={styles.cardGrid}>
      {normalResources.map((resource, index) => (
        <Card
          i18n={i18n}
          key={`resource_card_${index}`}
          resource={resource}
          index={index}
          setSelectedHelp={setSelectedHelp}
        />
      ))}
      {hasBlibliografy && (
        <Card
          i18n={i18n}
          resource={needTopic.resources[needTopic.resources.length - 1]}
          index={needTopic.resources.length - 1}
          setSelectedHelp={setSelectedHelp}
        />
      )}
    </div>
  );
};

export default CardGrid;
