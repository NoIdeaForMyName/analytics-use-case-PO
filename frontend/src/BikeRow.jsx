import { Checkbox, HStack, Td, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';


function BikeRow({ bikeId, isElectric, reportsNb }) {
    return (
        <Tr>
            <Td><Checkbox value={false}></Checkbox></Td>
            <Td>{bikeId}</Td>
            <Td>{isElectric ? "Elektryczny" : "Standardowy"}</Td>
            <Td>{reportsNb} zgłoszeń</Td>
        </Tr>
    )
}

BikeRow.propTypes = {
    bikeId: PropTypes.number.isRequired,
    isElectric: PropTypes.bool.isRequired,
    reportsNb: PropTypes.number.isRequired
};

export { BikeRow };
