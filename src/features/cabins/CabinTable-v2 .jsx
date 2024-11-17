import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRowv2 from "./CabinRow-v2";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function CabinTableV2() {
  // Using `useQuery` to fetch cabins data. This part looks fine.
  const { isLoading, data: cabins } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  // Using `useSearchParams` to fetch search query parameters. This is good.
  const [searchParams] = useSearchParams();

  // FIX: Ensure the `cabins` data is valid before proceeding. Return `Empty` only if `cabins` exists but has no length.
  if (!cabins?.length) return <Empty resource="Cabins" />;

  // 1) FILTER
  // FIX: Defaulting the `filteredValue` to "all" is fine here.
  const filteredValue = searchParams.get("discount") || "all";

  let filteredCabins;

  // FIX: Ensure the `cabins` array is valid before filtering to prevent errors.
  if (filteredValue === "all") filteredCabins = cabins;

  if (filteredValue === "with-discount")
    // FIX: Added optional chaining to ensure no runtime error if `cabins` is undefined.
    filteredCabins = cabins?.filter((cabin) => cabin.discount > 0);

  if (filteredValue === "no-discount")
    filteredCabins = cabins?.filter((cabin) => cabin.discount === 0);

  // 2) SORT
  // FIX: Handle default sort logic properly with a fallback to "startDate-asc".
  const sortBy = searchParams.get("sortBy") || "startDate-asc";

  // FIX: Destructured the `sortBy` value safely to avoid runtime errors if it doesn't contain a valid value.
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  // FIX: Added a null check for `filteredCabins` before applying the sort method to prevent runtime errors.
  const sortedCabins = filteredCabins?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  // FIX: Ensure loading state is handled correctly.
  if (isLoading) return <Spinner />;

  // Rendering the sorted and filtered cabins in a table. This part looks fine.
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabins</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>
        <Table.Body
          // FIX: Ensure data passed here is sortedCabins, which includes both sorting and filtering logic.
          data={sortedCabins}
          render={(cabin) => <CabinRowv2 cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTableV2;
