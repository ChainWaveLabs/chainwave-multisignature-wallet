import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
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
        <div>
            <h2>Propose Transfer</h2>
            <Container fluid>    <Form onSubmit={(e) => submit(e)}>
                <Row>
                    <Col>   
                        <Form.Group controlId="formAmount">
                            <Form.Label>Amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter amount" onChange={e => updateTransfer(e, 'amount')} />
                            <Form.Text className="text-muted">
                                Amount in gwei
                             </Form.Text>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId="formTo">
                        <Form.Label>To</Form.Label>
                        <Form.Control type="text" placeholder="Enter Eth Address"  onChange={e => updateTransfer(e, 'to')} />
                    </Form.Group>
                    </Col>
                </Row>



                <Button variant="success" type="submit">
                    Submit
                </Button>
            </Form></Container>


            {/* 
            <form onSubmit={(e) => submit(e)}>

                <label htmlFor="amount">Amount</label>
                <input id="amount" type="text" onChange={e => updateTransfer(e, 'amount')}></input>

                <label htmlFor="to">To</label>
                <input id="to" type="text" onChange={e => updateTransfer(e, 'to')}></input>

                <Button type="submit"> Submit </Button>
            </form> */}
        </div>
    )
}

export default CreateTransfer;