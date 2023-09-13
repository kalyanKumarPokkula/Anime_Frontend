import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Movie", "Tv"];

export default function TypesMultipleSelectCheckmarks(props) {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = event => {
    const {
      target: { value },
    } = event;
    props.onTypeHandler(personName);
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl
        fullWidth={true}
        sx={{
          "& .MuiOutlinedInput-root.Mui-focused": {
            "& > fieldset": {
              borderColor: "orange",
            },
          },
        }}
      >
        <InputLabel
          id="demo-multiple-checkbox-label"
          sx={{
            fontSize: "0.8rem",
            color: "#fff",
          }}
        >
          Typ
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={selected => selected.join(", ")}
          MenuProps={MenuProps}
          sx={{
            backgroundColor: "#212529",
            color: "#FF9E00",
          }}
        >
          {names.map(name => (
            <MenuItem
              key={name}
              value={name}
              sx={{
                backgroundColor: "#212529",
              }}
            >
              <Checkbox
                checked={personName.indexOf(name) > -1}
                sx={{
                  color: "#FF9E00",
                }}
              />
              <ListItemText
                primary={name}
                sx={{
                  color: "#FF9E00",
                }}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
