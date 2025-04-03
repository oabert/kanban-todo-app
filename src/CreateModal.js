import React, {useState} from 'react';
import {Button, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

const CreateModal = (props) => {
    const [backdrop, setBackdrop] = useState(true);

    const toggle = () => props.setOpenCreateMode(!props.openCreateMode);
    const changeBackdrop = (e) => {
        let { value } = e.target;

        setBackdrop(value);
    };
    return (
        <div>

            <Modal
                isOpen={props.openCreateMode}
                toggle={toggle}
                // className={className}
                // backdrop={backdrop}
                // keyboard={keyboard}
            >
                <ModalHeader toggle={toggle}>Create Task</ModalHeader>
                <ModalBody>
                    <Label>Todo task:</Label>
                    <Input type='text' placeholder='enter todo task'/>

                    <Label>Description:</Label>
                    <Input type='text' placeholder='description of the task'/>

                <Label for="backdrop">Status:</Label>

                <Input
                    type="select"
                    name="backdrop"
                    id="backdrop"
                    onChange={changeBackdrop}
                >
                    <option value="todo">todo</option>
                    <option value="progress">progress</option>
                    <option value="review">review</option>
                    <option value="done">done</option>
                </Input>

                    <Label for="backdrop">Priority:</Label>

                    <Input
                        type="select"
                        name="backdrop"
                        id="backdrop"
                        onChange={changeBackdrop}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </Input>

                </ModalBody>
                <ModalFooter>
                    <Button color="warning" onClick={toggle}>
                        SAVE
                    </Button>
                    <Button color="info" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default CreateModal;
