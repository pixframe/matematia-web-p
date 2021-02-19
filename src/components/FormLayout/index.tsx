import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FormHandlerChildrenProps } from '@calderaro/react-toolbox';
import styles from './styles.module.css';
import get from 'lodash/get';

interface Props<T> extends FormHandlerChildrenProps<T> {
  back?: () => void;
  bodyStyle?: any;
}

class FormLayout<T> extends React.Component<Props<T>> {
  render() {
    const { children, remove, create, update, back, bodyStyle, state } = this.props;
    const isLoading = ['loading', 'creating', 'updating', 'deleting'].indexOf(state.status) !== -1;
    const id = get(state, 'data.id', '');
    return (
      <div className={styles.container}>
        <div className={styles.formHeader}>
          <div>
            {back ? (
              <button className={styles.headerButton} onClick={back}>
                Volver
              </button>
            ) : null}
          </div>
          <div className={styles.buttons}>
            {state.error ? <div className={styles.message}>{state.error.message}</div> : null}
            {isLoading ? (
              <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />
            ) : null}
            {remove && id ? (
              <button className={styles.headerButton} onClick={remove} disabled={isLoading}>
                Eliminar
              </button>
            ) : null}
            {create || update ? (
              <button
                className={styles.headerButton}
                onClick={() => (id ? update?.() : create?.())}
                disabled={isLoading}
              >
                Guardar
              </button>
            ) : null}
          </div>
        </div>
        <div className={styles.formBody} style={bodyStyle}>
          {children}
        </div>
      </div>
    );
  }
}

export default FormLayout;
