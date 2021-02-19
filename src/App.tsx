import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './utils/firebase';
import './utils/i18n';
import { AuthProvider } from './utils/AuthContext';
import Auth from './components/Auth';
import Home from './containers/Home';
import './app.css';
import Admin from './containers/Admin';
import Profile from './containers/Profile';
import Play from './containers/Play';
import TopicShow from './containers/TopicShow';
import Reports from './containers/Reports';
import About from './containers/About';
import Blog from './containers/Blog';
import History from './containers/History';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/play/:topicId/:id/:topicCode" component={Play} />
          <Route path="/about" component={About} />
          <Route path="/auth" component={Auth} />
          <Route path="/admin" component={Admin} />
          <Route path="/perfil" component={Profile} />
          <Route path="/topic/:id" component={TopicShow} />
          <Route path="/blog/:id" component={Blog} />
          <Route path="/reports" component={Reports} />
          <Route path="/history" component={History} />
          <Route path="/" exact component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
