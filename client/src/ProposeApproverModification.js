import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

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
            <Card className="bg-dark" variant="primary">
                <Card.Header><h4>Propose Approver Change</h4></Card.Header>
                <Card.Body>
                    <Form onSubmit={(e) => submit(e)}>
                        <InputGroup variant="dark" className="bg-dark">
                            <InputGroup.Prepend>
                                <InputGroup.Text>Modify Approvers</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" placeholder="Enter eth address" onChange={e => updateApproverProposal(e, 'newApprover')} />
                            <InputGroup.Append>
                                <InputGroup.Text>New Approver?</InputGroup.Text>
                                <InputGroup.Checkbox type="checkbox" placeholder="Check to add, uncheck to remove" onChange={e => updateApproverProposal(e, 'adding')}></InputGroup.Checkbox>
                                <Button type="submit">Submit Approver Change</Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ProposeApproverModification;