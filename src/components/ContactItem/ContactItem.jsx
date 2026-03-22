import { Item, Text, Number, Button } from "./ContactItem";
import { useDispatch } from "react-redux";
import { delContactsApi } from "../../redux/operations";
import { setLastDeleted } from "../../redux/contactsSlice";

export const ContactItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(delContactsApi(id));
    dispatch(setLastDeleted({ id, name, number }));
  };
  return (
    <Item id={id}>
      <Text>
        {name}:<Number>{number}</Number>
      </Text>
      <Button type="button" onClick={handleDelete}>
        ✖
      </Button>
    </Item>
  );
};
