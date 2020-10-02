import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

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
        <div>
            <h2>Quorum</h2>
            <Container fluid>
                <Form onSubmit={(e) => submit(e)}>
                <Row>
                    <Col>   
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="string" placeholder="Proposed Quorum" onChange={e => updateQuorum(e, 'newQuorum')} />
                            <Form.Text className="text-muted">
                                New quorum must be greater than zero
                             </Form.Text>
                        </Form.Group>
                    </Col>
                </Row>
                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form></Container>


     
        </div>
    )
}

export default ModifyQuorum;