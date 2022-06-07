import { Route, Switch } from 'react-router-dom';
import Layout from './containers/Layout/Layout';
import Medicines from './containers/Medicines/Medicines';
import Doctors from './containers/Doctors/Doctors';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path={"/medicines"} component = {Medicines} />
          <Route exact path={"/doctors"} component = {Doctors} />
        </Switch>
      </Layout>
    </>
  );
}

export default App;
