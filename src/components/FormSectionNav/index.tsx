import React from 'react';
import classnames from 'classnames/bind';
import styles from './styles';

interface SectionHeaderOption {
  id: string;
  label: string;
}

interface Props {
  selected?: string;
  options?: SectionHeaderOption[];
  onClick?: (id: string) => void;
}

const cx = classnames.bind(styles);

const ExperienceListItem: React.FC<Props> = ({ options, onClick, selected }) => (
  <div className={styles.formSectionsNav}>
    {(options || []).map(({ id, label }) => (
      <button
        key={id}
        className={cx([styles.button, { [styles.activeButton]: id === selected }])}
        onClick={() => onClick?.(id)}
      >
        {label}
      </button>
    ))}
  </div>
);

export default ExperienceListItem;
