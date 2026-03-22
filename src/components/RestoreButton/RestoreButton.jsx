import { useDispatch, useSelector } from "react-redux";
import { restoreContactsApi } from "../../redux/operations.js";
import { Button } from "./RestoreButton.js";

export const RestoreButton = () => {
  const dispatch = useDispatch();
  const lastDeletedContact = useSelector(
    (state) => state.contacts.lastDeletedContact
  );

  const handleRestore = () => {
    if (lastDeletedContact) dispatch(restoreContactsApi(lastDeletedContact));
  };

  return (
    <Button onClick={handleRestore} id="restore-button" type="button">
      Restore last deleted contact
    </Button>
  );
};
