import { Modal, ModalBody, ModalOverlay, ModalContent, ModalCloseButton, ModalHeader, ModalFooter, Button, Text } from "@chakra-ui/react";
import PropTypes from 'prop-types';


function Overlay() {
    return (
        <ModalOverlay
            bg='blackAlpha.300'
            backdropFilter='blur(10px)'
        />
    )
}

function MessageBox({ isOpen, onClose, message }) {
    return(
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
            {<Overlay />}
            <ModalContent>
            <ModalHeader>Info</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Text>{message}</Text>
            </ModalBody>
            <ModalFooter>
                <Button onClick={onClose}>Close</Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

MessageBox.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
};

export { MessageBox }
