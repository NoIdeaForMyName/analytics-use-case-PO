import { Checkbox, Td, Tr } from '@chakra-ui/react';
import PropTypes from 'prop-types';


function BikeRow({ bikeId, isElectric, reportsNb, checked, onCheckboxChange }) {
    return (
      <Tr>
        <Td>
          <Checkbox
            isChecked={checked}
            onChange={(e) => onCheckboxChange(bikeId, e.target.checked)}
          />
        </Td>
        <Td>{bikeId}</Td>
        <Td>{isElectric ? "Elektryczny" : "Standardowy"}</Td>
        <Td>{reportsNb} zgłoszeń</Td>
      </Tr>
    );
  }
  
  BikeRow.propTypes = {
    bikeId: PropTypes.number.isRequired,
    isElectric: PropTypes.bool.isRequired,
    reportsNb: PropTypes.number.isRequired,
    checked: PropTypes.bool.isRequired,
    onCheckboxChange: PropTypes.func.isRequired,
  };
  
  export { BikeRow };
  
