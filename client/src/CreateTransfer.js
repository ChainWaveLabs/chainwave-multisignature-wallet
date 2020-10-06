import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/Formcontrol';

function CreateTransfer({ createTransfer }) {
    const [transfer, setTransfer] = useState(undefined);

    const updateTransfer = (e, field) => {
        const value = e.target.value;
        setTransfer({ ...transfer, [field]: value })
    }

    const submit = e => {
        e.preventDefault();//prevents page reload
        createTransfer(transfer);
    }

    return (
        <Container fluid>
            <Card className="bg-dark" variant="primary">
                <Card.Header><h4>Propose Transfer</h4></Card.Header>
                <Card.Body>


                    <Form onSubmit={(e) => submit(e)}>
                        <InputGroup variant="dark" className="bg-dark mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Amount:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" placeholder="Enter amount" onChange={e => updateTransfer(e, 'amount')} />
                            <InputGroup.Append>
                                <InputGroup.Text>gwei</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>

                        <InputGroup variant="dark" className="bg-dark mb-3" >
                            <InputGroup.Prepend>
                                <InputGroup.Text>To:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" placeholder="Enter Eth Address" onChange={e => updateTransfer(e, 'to')} />
                        </InputGroup>
                        <Button type="submit">Submit Transfer Request</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>

    )
}

export default CreateTransfer;