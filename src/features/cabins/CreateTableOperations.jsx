import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";
function CreateTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterFiled="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          { value: "name-asc", label: "Sort by name (A-Z)" },
          { value: "name-desc", label: "Sort by name (Z-A)" },
          { value: "regularPrice-asc", label: "Sort by price (low First)" },
          { value: "regularPrice-desc", label: "Sort by price (High First)" },
          { value: "maxCapacity-asc", label: "Sort by capacity (low First)" },
          { value: "maxCapacity-desc", label: "Sort by capacity (high First)" },
        ]}
      />
    </TableOperations>
  );
}

export default CreateTableOperations;
