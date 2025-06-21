import React, {useState} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import SchoolTable from './components/SchoolTable';
import SchoolForm from './components/SchoolForm';
import './App.css';

const queryClient = new QueryClient();

function App() {
    const [showForm, setShowForm] = useState(false);

    const handleSchoolCreated = () => {
        setShowForm(false);
        queryClient.invalidateQueries('schools');
    };

    const handleSchoolDeactivated = () => {
        queryClient.invalidateQueries('schools');
    };

    return (
        <QueryClientProvider client={queryClient}>
            <div className="App">
                <header className="app-header">
                    <h1>Реєстр шкільних закладів</h1>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowForm(!showForm)}
                    >
                        {showForm ? 'Скасувати' : 'Додати школу'}
                    </button>
                </header>

                <main className="app-main">
                    {showForm && (
                        <div className="form-container">
                            <SchoolForm onSchoolCreated={handleSchoolCreated}/>
                        </div>
                    )}

                    <div className="table-container">
                        <SchoolTable onSchoolDeactivated={handleSchoolDeactivated}/>
                    </div>
                </main>
            </div>
        </QueryClientProvider>
    );
}

export default App;