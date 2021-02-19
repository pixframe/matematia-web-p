import React from 'react';
import SideBar from '../SideBar';
import styles from './styles.module.css';
import Layout from '../Layout';
import brand from '../../assets/logos/brand.png';

export default class SectionWithSideBar extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <div className={styles.container}>
        <SideBar
          brand={brand}
          options={[
            { id: 'home', label: 'Inicio', path: '/' },
            { id: 'topics', label: 'Temas', path: '/admin/topics' },
            {
              id: 'subtopics',
              label: 'Subtopics',
              path: '/admin/subtopics'
            }
          ]}
        />
        <Layout>{children}</Layout>
      </div>
    );
  }
}
