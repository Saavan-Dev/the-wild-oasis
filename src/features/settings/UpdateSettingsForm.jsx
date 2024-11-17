import Form from "../../ui/Form";
import StyledFormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  // in this JSX we are doing only column level updates only!
  const {
    isLoading,
    settings: {
      breakfastPrice,
      maxBookingLength,
      maxGuestsPerBooking,
      minBookingLength,
    } = {},
  } = useSettings();
  const { isSettingsUpdating, updateSetting } = useUpdateSettings();
  if (isLoading) return <Spinner />;

  function handleUpdate(e, fieldName) {
    const { value } = e.target;
    if (!value) return;
    updateSetting({ [fieldName]: value });
  }

  return (
    <Form>
      <StyledFormRow labelName="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookingLength}
          disabled={isSettingsUpdating}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
        />
      </StyledFormRow>
      <StyledFormRow labelName="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookingLength}
          disabled={isSettingsUpdating}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </StyledFormRow>
      <StyledFormRow labelName="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          disabled={isSettingsUpdating}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
        />
      </StyledFormRow>
      <StyledFormRow labelName="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfastPrice}
          disabled={isSettingsUpdating}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </StyledFormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
