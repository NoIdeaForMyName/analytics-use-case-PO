import { Center, Table, TableContainer, Tbody } from '@chakra-ui/react';
import PropTypes from 'prop-types';


function BikeList({ bikeRowList }) {
    return (
        <Center
            display={bikeRowList.length > 0 ? 'block' : 'none'}
        >
            <TableContainer
                height="60vh" // Upewnij się, że jednostka jest podana
                overflowY="scroll" // Ustaw przewijanie w pionie
                width="100%" // Opcjonalnie, jeśli potrzebujesz pełnej szerokości
                border="1px solid #e2e8f0" // Opcjonalnie, aby wizualnie podkreślić kontener
                borderRadius="md" // Opcjonalnie, jeśli chcesz zaokrąglić rogi
            >
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
