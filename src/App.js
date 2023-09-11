import React, { useState, useEffect } from 'react';
import PouchDB from 'pouchdb';

const App = () => {
    const [message, setMessage] = useState('Hello, Electron with React and PouchDB!');
    const db = new PouchDB('my_database');
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        console.log('Component mounted');
        setMessage('Your message here'); // Update the message
        db.info().then((info) => {
            setMessage(`Database Info: ${JSON.stringify(info)}`);
        });

        const fetchDocuments = async () => {
            try {
                const result = await db.allDocs({ include_docs: true });
                setDocuments(result.rows.map((row) => row.doc));
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    const [data, setData] = useState({ name: '', age: '' });

    const handleCreate = async () => {
        try {
            const response = await db.put({...data, ...{_id: 'adfsadf'}});
            console.log('Document created:', response);
            // Clear the form
            setData({ _id: '', name: '', age: '' });
        } catch (error) {
            console.error('Error creating document:', error);
        }
    };


    return (
        <div>
            <h1>{message}</h1>

            <div>
                <h2>Create Data</h2>
                <input
                    type="text"
                    placeholder="Name"
                    value={data.name}
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Age"
                    value={data.age}
                    onChange={(e) => setData({ ...data, age: e.target.value })}
                />
                <button onClick={handleCreate}>Create</button>
            </div>

            <div>
            <h2>Read Data</h2>
            <ul>
                {documents.map((doc) => (
                    <li key={doc._id}>
                        {doc.name} - Age: {doc.age}
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );

    
};

export default App;
