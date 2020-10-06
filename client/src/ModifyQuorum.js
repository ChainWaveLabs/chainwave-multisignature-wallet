import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';

function ModifyQuorum({ proposeQuorum }) {
    const [newQuorum, setQuorum] = useState(undefined);

    const updateQuorum = (e, field) => {
        const value = e.target.value;
        setQuorum({ ...newQuorum, [field]: value })
    }

    const submit = e => {
        e.preventDefault();//prevents page reload
        proposeQuorum(newQuorum)
    }

    return (
        <Container fluid>
            <Card className="bg-dark mb-3" variant="primary">
                <Card.Header><h4>Propose Quorum Change</h4></Card.Header>
                <Card.Body>
                <Alert variant="warning">Change the quorum with this component. Increase or decrease the approvals needed for proposals to pass. 
                Must be greater than zero and less than the number of Aprovers.
                    </Alert>
                    <Form onSubmit={(e) => submit(e)}>
                        <InputGroup variant="dark" className="bg-dark">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Quorum</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="number" id="newQuorum" placeholder="Proposed Quorum ex. 5" onChange={e => updateQuorum(e, 'newQuorum')} />
                            <InputGroup.Append>
                            <Button type="submit" variant="success">Submit Change</Button>
                            </InputGroup.Append>
                        </InputGroup>         
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ModifyQuorum;