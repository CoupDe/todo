import {
  Checkbox,
  FormControl,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import AnimationTypography from "./AnimationTypography";
//Правильнее наверно все таки использовать объект
const DEPARTAMENT = {
  DESIGN: "Дизайн",
  FRONTEND: "Фронтенд",
  BACKEND: "Бэкэнд",
  ALLDEPARTAMENT: "Все отделы",
};

const SelectDepartaments = () => {
  const [departaments, setDepartement] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof departaments>) => {
    const {
      target: { value },
    } = event;
    console.log(value);
    setDepartement(typeof value === "string" ? value.split(",") : value);
  };
  return (
    <>
      <FormControl
        sx={{
          height: "45px",
          minWidth: "100%",
          "& .MuiInputBase-root": {
            backgroundColor: "transparent",
          },
        }}
        size="small"
        variant="filled"
      >
        <Select
          sx={{
            height: "45px",
            "& .MuiFilledInput-input": {
              padding: "0 10px",
              display: "flex",
              alignItems: "center",
            },
            "& .MuiFormControl-root MuiInputBase-root-MuiFilledInput-root-MuiSelect-root":
              {
                backgroundColor: "red",
              },
          }}
          labelId="multiple-checkbox-label"
          id="multiple-checkbox"
          multiple
          displayEmpty
          value={departaments}
          onChange={handleChange}
          renderValue={(selected) => {
            return (
              <>
                <AnimationTypography items={selected} />
              </>
            );
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          {Object.entries(DEPARTAMENT).map(([key, val]) => (
            <MenuItem key={key} value={val}>
              <Checkbox checked={departaments.includes(val)} />
              <ListItemText primary={val} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectDepartaments;
