import { Box, Center, StackDivider, Table, TableContainer, Tbody, VStack } from '@chakra-ui/react';
import PropTypes from 'prop-types';


function BikeList({ bikeRowList }) {
    return (
        <Center>
            <TableContainer>
                <Table>
                    <Tbody>
                        {bikeRowList.map((bikeRow) => (
                            bikeRow
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </Center>
    )
}

BikeList.propTypes = {
    bikeRowList: PropTypes.array.isRequired
}

export { BikeList }
