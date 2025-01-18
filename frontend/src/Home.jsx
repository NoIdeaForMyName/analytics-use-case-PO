import { useState } from 'react';
import { Button, VStack, useDisclosure, Spacer } from '@chakra-ui/react';
import { serverURL } from './networkingConfig';
import { MessageBox } from './MessageBox';
import { BikeRow } from './BikeRow';
import { BikeList } from './BikeList';

function Home() {
  const [isLoadingAllReportsButton, setIsLoadingAllReportsButton] = useState(false);
  const [isLoadingChosenReportsButton, setIsLoadingChosenReportsButton] = useState(false);
  const [allReports, setAllReports] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [messageBoxText, setMessageBoxText] = useState('');
  const [bikeList, setBikeList] = useState([]);
  const [checkboxStates, setCheckboxStates] = useState({}); // Dynamiczny stan checkboxów
  const [checkedBikesIds, setCheckedBikesIds] = useState([])
  const [showDownloadChosenButton, setShowDownloadChosenButton] = useState(false);

  const mainButtonWidth = 300;
  

  const updateCheckboxState = (bikeId, checked) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [bikeId]: checked,
    }));
    setCheckedBikesIds((prevIds) => {
      let newIdList = []
      if (checked) {
        newIdList = [...prevIds, bikeId];
      } else {
        newIdList = prevIds.filter((id) => id !== bikeId);
      }
      setShowDownloadChosenButton(newIdList.length > 0);
      return newIdList;
    });
  };

  const downloadAllReports = async () => {
    try {
      const response = await fetch(`${serverURL}/analytics/get-all-reports-by-bike`);
      const json = await response.json();
      setAllReports(json);
      return json;
    } catch (error) {
      setMessageBoxText(error.message);
      onOpen();
      return null;
    }
  };

  const downloadAllReportsButton = async () => {
    setIsLoadingAllReportsButton(true);
    const jsonData = await downloadAllReports();
    setIsLoadingAllReportsButton(false);
    if (jsonData) {
      downloadJSON(jsonData, 'reports');
      setMessageBoxText("Dane wszystkich zgłoszeń zostały pobrane pomyślnie");
      onOpen();
    }
  };

  const downloadJSON = (jsonData, filename) => {
    console.log("JSON DATA TO DOWNLOAD: ", jsonData);
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(jsonData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = `${filename}.json`;
    link.click();
  };

  const showReportsDataButton = async () => {
    setIsLoadingChosenReportsButton(true);
    const jsonData = await downloadAllReports();
    setIsLoadingChosenReportsButton(false);

    if (jsonData) {
      const bikeRows = jsonData.map((bikeData) => ({
        bikeId: bikeData.bike_id,
        isElectric: bikeData.bike_is_electric,
        reportsNb: bikeData.reports.length,
      }));

      const initialCheckboxStates = bikeRows.reduce(
        (acc, bike) => ({ ...acc, [bike.bikeId]: false }),
        {}
      );
      setCheckboxStates(initialCheckboxStates);
      setCheckedBikesIds([]);
      setShowDownloadChosenButton(false);

      setBikeList(bikeRows);
    }
  };

  const downloadChosenReportsButton = () => {
    let filteredReports = allReports.filter((entry) => checkedBikesIds.includes(entry.bike_id))
    downloadJSON(filteredReports, 'filtered_reports');
    setMessageBoxText("Dane wybranych zgłoszeń zostały pobrane pomyślnie");
    onOpen();

  };

  return (
    <>
      <VStack spacing={20}>
        <VStack spacing={8}>
          <Spacer />
          <Button
            width={mainButtonWidth}
            isLoading={isLoadingAllReportsButton}
            onClick={downloadAllReportsButton}
          >
            Pobierz dane wszystkich zgłoszeń
          </Button>
          <Button
            width={mainButtonWidth}
            isLoading={isLoadingChosenReportsButton}
            onClick={showReportsDataButton}
          >
            Pokaż dane zgłoszeń
          </Button>
          <Button
            width={mainButtonWidth}
            onClick={downloadChosenReportsButton}
            visibility={showDownloadChosenButton ? 'block' : 'hidden'}
          >
            Pobierz dane wybranych zgłoszeń
          </Button>
        </VStack>

        <BikeList
          display='none'
          bikeRowList={bikeList.map((bike) => (
            <BikeRow
              key={bike.bikeId}
              bikeId={bike.bikeId}
              isElectric={bike.isElectric}
              reportsNb={bike.reportsNb}
              checked={checkboxStates[bike.bikeId] || false}
              onCheckboxChange={updateCheckboxState}
            />
          ))}
        />
      </VStack>

      <MessageBox isOpen={isOpen} onClose={onClose} message={messageBoxText} />
    </>
  );
}

export default Home;
