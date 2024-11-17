import Heading from "../ui/Heading";
import Row from "../ui/Row";
// import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";
import CabinTableV2 from "../features/cabins/CabinTable-v2 ";
import CreateTableOperations from "../features/cabins/CreateTableOperations";

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CreateTableOperations />
      </Row>
      <Row>
        <CabinTableV2 />
        <AddCabin />
      </Row>
    </>
  );
}

export default Cabins;
