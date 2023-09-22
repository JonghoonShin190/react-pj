import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AcaWriteForm from './components/WriteForm/AcaWriteForm';
import AcaInfo from './components/AcaInfo/AcaInfo';

function App() {
    return (
        <Switch>
            <Route exact={true} path="/" >
                <AcaInfo />
            </Route>
            <Route exact={true} path="/AcaWriteForm">
                <AcaWriteForm />
            </Route>
        </Switch >
    );
}

export default App;
