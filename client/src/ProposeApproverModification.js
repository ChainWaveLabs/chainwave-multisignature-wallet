import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Alert from 'react-bootstrap/Alert';

function ProposeApproverModification({ proposeApprover }) {
    const [approverProposal, setApproverProposal] = useState(undefined);

    const updateApproverProposal = (e, field) => {
        const value = e.target.value;
        setApproverProposal({ ...approverProposal, [field]: value })
    }

    const submit = e => {
        e.preventDefault();//prevents page reload
        proposeApprover(approverProposal)
    }

    return (
        <Container fluid>
            <Card className="bg-dark mb-3" variant="primary">
                <Card.Header><h4>Propose Approver Change</h4></Card.Header>
                <Card.Body>
                    <Alert variant="warning">Here you can change the approvers / governance addresses for this multisig wallet. You can propose to add new approver addresses or remove existing addresses. 
                       Add the etherum address and check the box if you'd like to add new. Unchecked removes an existing address.
                    </Alert>
                    <Form onSubmit={(e) => submit(e)}>
                        <InputGroup variant="dark" className="bg-dark">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Approver</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="string" placeholder="Enter eth address" onChange={e => updateApproverProposal(e, 'newApprover')} />
                            <InputGroup.Append>
                                <InputGroup.Text>New?</InputGroup.Text>
                                <InputGroup.Checkbox type="checkbox" placeholder="Check to add, uncheck to remove" onChange={e => updateApproverProposal(e, 'adding')}></InputGroup.Checkbox>
                                <Button type="submit" variant="success">Submit Change</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProposeApproverModification;