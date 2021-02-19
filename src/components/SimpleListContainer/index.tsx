import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from './styles.module.css';
import InputText from '../Input/InputText';

interface ListContainerOption {
  label: string;
  onClick: () => void;
}

interface Props<T> {
  options?: ListContainerOption[];
  status?: string;
  searchText?: string;
  page?: number;
  pages?: number;
  data?: T[];
  onNew?: () => void;
  onChangeSearchText?: (searchText: string) => void;
  onNextPage?: () => void;
  onPrevPage?: () => void;
}

class ListContainer<T> extends React.Component<Props<T>> {
  render() {
    const {
      children,
      options,
      onNew,
      onChangeSearchText,
      searchText,
      status,
      page,
      pages,
      onNextPage,
      onPrevPage,
      data
    } = this.props;
    return (
      <div className={styles.list}>
        <div className={styles.listTop}>
          <div className={styles.searchInputContainer}>
            <InputText
              id=""
              placeholder="Buscar..."
              value={searchText}
              onChange={(value) => onChangeSearchText?.(value)}
            />

            {status === 'searching' ? (
              <div className={styles.searching}>
                <FontAwesomeIcon icon={faSpinner} spin />
              </div>
            ) : null}
          </div>

          <div>
            {options?.map((item, index) => (
              <button onClick={item.onClick} key={index + item.label}>
                <span>{item.label}</span>
              </button>
            ))}

            {onNew ? (
              <button className={styles.topButton} onClick={onNew}>
                <span>Nuevo</span>
              </button>
            ) : null}
          </div>
        </div>
        {status === 'loading' ? (
          <div className={styles.loading}>
            <FontAwesomeIcon icon={faSpinner} spin />
          </div>
        ) : null}
        {['loaded', 'searched'].indexOf(status || '') !== -1 && !data?.length ? (
          <div className={styles.empty}>
            <span>No hay datos</span>
          </div>
        ) : null}
        {['loaded', 'searched', 'searching'].indexOf(status || '') !== -1 && data?.length ? (
          <div className={styles.body}>{children}</div>
        ) : null}
        <div className={styles.footer}>
          <button onClick={() => (page && page > 1 ? onPrevPage?.() : null)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          {`${page} / ${pages}`}
          <button onClick={() => onNextPage?.()}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    );
  }
}

export default ListContainer;
