import React, { useState } from 'react';
import {IPerson} from "../../typing/types";
import { Button, Table, InputGroup, FormControl } from 'react-bootstrap';

interface PersonsListProps {
    personsList: IPerson[];
    setPerson: React.Dispatch<React.SetStateAction<IPerson[]>>;
}

const PersonsList: React.FC<PersonsListProps> = ({ personsList, setPerson }) => {
    const [newPersonName, setNewPersonName] = useState<string>('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editedName, setEditedName] = useState<string>('');

    const handleCreate = () => {
        if (newPersonName.trim()) {
            setPerson([...personsList, { name: newPersonName }]);
            setNewPersonName('');
        }
    };

    const handleEdit = (index: number) => {
        setEditIndex(index);
        setEditedName(personsList[index].name || '');
    };

    const handleSave = () => {
        if (typeof editIndex === 'number') {
            const updatedPeople:IPerson[] = [...personsList];
            const personIndex = updatedPeople.findIndex((el: IPerson, index: number) => index === editIndex);
            if (personIndex !== -1) {
                updatedPeople[personIndex].name = editedName;
                setPerson(updatedPeople);
                setEditIndex(null);
                setEditedName('');
            }
        }
    };

    const handleCancel = () => {
        setEditIndex(null);
        setEditedName('');
    };

    const handleDelete = (index: number) => {
        const updatedPeople = personsList.filter((el: IPerson, i: number) => i !== index);
        setPerson(updatedPeople);
    };

    return (
        <div>
            <InputGroup>
                <FormControl
                    type="text"
                    value={newPersonName}
                    onChange={(e) => setNewPersonName(e.target.value)}
                    placeholder="Enter new name"
                />
                <Button variant="primary" onClick={handleCreate}>Add Person</Button>
            </InputGroup>
            <Table striped hover>
                <thead>
                    <tr>
                        <th style={{ width: '45%' }}>Name</th>
                        <th style={{ width: '15%' }}>Actions</th>
                        <th style={{ width: '40%' }}>Additional Info</th>
                    </tr>
                </thead>
                <tbody>
                {personsList.map((person: IPerson, index: number) => (
                    <tr key={index}>
                        <td>
                            {editIndex === index ? (
                                <InputGroup>
                                    <FormControl
                                        type="text"
                                        value={editedName}
                                        onChange={(e) => setEditedName(e.target.value)}
                                    />
                                </InputGroup>
                            ) : (
                                person.name
                            )}
                        </td>
                        <td>
                            {editIndex === index ? (
                                <div className="d-flex justify-content-between">
                                    <Button onClick={handleSave}>Save</Button>
                                    <Button variant="secondary" onClick={handleCancel}>Cancel</Button>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between">
                                    <Button variant="warning"  onClick={() => handleEdit(index)}>Edit</Button >
                                    <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                                </div>
                            )}
                        </td>
                        <td>
                            <div className="d-flex justify-content-between">
                                <span>Height: {person?.height}</span>
                                <span>Mass: {person?.mass}</span>
                                <span>Birth Year: {person?.birth_year}</span>
                            </div>

                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default PersonsList;
