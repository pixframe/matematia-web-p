import { AsyncHandler, Button } from '@calderaro/react-toolbox';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { linksDelete } from '../../services/links';
import { localButton } from '../../styles/buttons';
import { Link } from '../../utils/types';
import { ListHandlerChildrenProps } from '../SimpleListHandler';
import styles from './styles';

const UserLinks: React.FC<ListHandlerChildrenProps<Link>> = ({ state, reload }) => (
  <div className={styles.container}>
    <div className={styles.spacer} />
    <div className={styles.title}>Mis vinculaciones</div>
    <div className={styles.links}>
      {state.data.map((link) => (
        <div key={link.id} className={styles.link}>
          <div className={styles.linkText}>{link.viewerUsername}</div>
          <AsyncHandler handler={() => linksDelete(link.id)} onExecuteSuccess={reload}>
            {(props) => (
              <Button buttonClassname={localButton} onClick={props.execute}>
                {state.status === 'loading' ? <FontAwesomeIcon icon={faSpinner} spin /> : 'Anular'}
              </Button>
            )}
          </AsyncHandler>
        </div>
      ))}
    </div>
  </div>
);

export default UserLinks;
