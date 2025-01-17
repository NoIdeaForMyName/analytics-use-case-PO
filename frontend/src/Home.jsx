import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Spacer, useDisclosure, VStack } from '@chakra-ui/react';
import { serverURL } from './networkingConfig'
import { MessageBox } from './MessageBox'
import { BikeRow } from './BikeRow'
import { BikeList } from './BikeList'

function Home() {
    const [isLoadingAllReportsButton, setIsLoadingAllReportsButton] = useState(false)
    const [isLoadingChosenReportsButton, setIsLoadingChosenReportsButton] = useState(false)
    const [allReports, setAllReports] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [messageBoxText, setMessageBoxText] = useState("")

    const navigate = useNavigate();

    const downloadAllReports = async () => {
        try {
            const response = await fetch(`${serverURL}/analytics/get-all-reports-by-bike`);
            const json = await response.json();
            setAllReports(json);
            return true;
        } catch (error) {
            setMessageBoxText(error.message);
            onOpen();
            return false;
        }
    };

    const downloadAllReportsButton = async () => {
        setIsLoadingAllReportsButton(true);
        const success = await downloadAllReports();
        setIsLoadingAllReportsButton(false);
        if (success) {
            const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                JSON.stringify(allReports)
            )}`;
            const link = document.createElement("a");
            link.href = jsonString;
            link.download = "reports.json";
            link.click();
        }
    }

    const downloadChosenReportsButton = async () => {
        setIsLoadingChosenReportsButton(true);
        const success = await downloadAllReports();
        setIsLoadingChosenReportsButton(false);
        if (success) {
            // TODO
            //navigate('/reports');
        }
    };

    const testBikeList = [
        <BikeRow
            key={12345}
            bikeId={12345}
            isElectric={false}
            reportsNb={12}
        />,
        <BikeRow
            key={54321}
            bikeId={54321}
            isElectric={true}
            reportsNb={17}
        />
    ]

    return (
        <>
            <VStack spacing={20}>
                <VStack spacing={8}>
                    <Spacer></Spacer>
                    <Button isLoading={isLoadingAllReportsButton} onClick={downloadAllReportsButton}>Pobierz dane wszystkich zgłoszeń</Button>
                    <Button isLoading={isLoadingChosenReportsButton} onClick={downloadChosenReportsButton}>Pobierz dane wybranych zgłoszeń</Button>
                </VStack>

                <BikeList
                    bikeRowList={testBikeList}
                />
            </VStack>

            <MessageBox
                isOpen={isOpen}
                onClose={onClose}
                message={messageBoxText}
            />
        </>
    );
}

export default Home
