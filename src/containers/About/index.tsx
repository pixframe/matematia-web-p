import React from 'react';
import { style } from 'typestyle';
import Layout from '../../components/Layout';
import MainAbout from '../../components/AboutComponents/Main';
import DescriptionAbout from '../../components/AboutComponents/Description';
import FocusDivAbout from '../../components/AboutComponents/Focus';
import DifferencesAbout from '../../components/AboutComponents/Differences';
import FooterAbout from '../../components/AboutComponents/Footer';

const mainDiv = style({
  display: 'flex',
  flexFlow: 'column',
  alignItems: 'center'
});

const About = () => {
  return (
    <Layout>
      <div className={mainDiv}>
        <MainAbout />
        <DescriptionAbout />
        <FocusDivAbout />
        <DifferencesAbout />
        <FooterAbout />
      </div>
    </Layout>
  );
};

export default About;
