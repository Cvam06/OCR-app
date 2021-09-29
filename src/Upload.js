import React, { useState } from 'react';
import FileBase64 from 'react-file-base64';
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "./upload.css";
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Upload() {
    const [confirmation, setConfirmation] = useState("")
    const [isLoading, setIsLoading] = useState("")
    const [files, setFiles] = useState("")
    const [invoice, setInvoice] = useState("")
    const [amount, setAmount] = useState("")
    const [date, setDate] = useState("")
    const [vendor, setVendor] = useState("")
    const [description, setDescription] = useState("")
    let processing = "document processing"

    const handleSubmit = async (event) => {
        event.preventDefault();
    }

    const getFiles = async (files) => {
        setIsLoading("Extracting Files");
        setFiles(files);

        const UID = Math.round(1 + Math.random() * (1000000 - 1))

        var data = {
            fileExt: "png",
            imageID: UID,
            folder: UID,
            img: files[0].base64
        }
        await fetch('https://wotq9qx747.execute-api.us-east-2.amazonaws.com/Production',
            {
                method: "POST",
                header: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            }
        );

        let targetImage = UID + ".png";

        await fetch('https://wotq9qx747.execute-api.us-east-2.amazonaws.com/Production/ocr',
            {
                method: "POST",
                header: {
                    Accept: "application/json",
                    "Content-type": "application/json"
                },
                body: JSON.stringify(targetImage)
            }
        );
    }

    return (
        <div className="row">
            <div className="col-6 offset-3">
                <Form onSubmit={handleSubmit}>
                    <FormGroup>
                        <h3 className="text-danger">
                            {processing}
                        </h3>
                        <h6>Upload Invoice</h6>
                        <FormText color="muted">PNG, JPG</FormText>

                        <div className="form-group files color">
                            <FileBase64
                                multiple={true}
                                onDone={getFiles.bind(this)}
                            >

                            </FileBase64>
                        </div>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <h6>Invoice</h6>
                        </Label>
                        <Input
                            type="text"
                            name="invoice"
                            id="Invoice"
                            required
                            value={invoice}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <h6>Amount ($)</h6>
                        </Label>
                        <Input
                            type="text"
                            name="Amount"
                            id="Amount"
                            required
                            value={amount}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <h6>Date</h6>
                        </Label>
                        <Input
                            type="text"
                            name="date"
                            id="date"
                            required
                            value={date}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <h6>Vandor</h6>
                        </Label>
                        <Input
                            type="text"
                            name="vendor"
                            id="vendor"
                            required
                            value={vendor}
                        >
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>
                            <h6>Description</h6>
                        </Label>
                        <Input
                            type="text"
                            name="description"
                            id="description"
                            required
                            value={description}
                        >
                        </Input>
                    </FormGroup>

                    <Button className="btn btn-lg btn-block btn-success mt-3">
                        Submit
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default Upload
