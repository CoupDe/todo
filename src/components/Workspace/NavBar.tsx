import {
  Avatar,
  Box,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";

import { useAppDispatch } from "../../hook/hook";
import { getSortedValue } from "../../redux/slices/viewSlice";

import SelectDepartament from "./SelectDepartament";

const NavBar = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const handleSetSortedValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(getSortedValue(event.target.value));
  };

  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            "minmax(50px,100px) minmax(min-content,250px) minmax(min-content,250px) repeat(1, 1fr) 1fr",
          height: "100%",

          alignItems: "center",
          justifyItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "45px",
            alignItems: "center",
            marginLeft: "10px",
            justifySelf: "start",
          }}
        >
          <Typography variant="subtitle1">Фильтры:</Typography>
          <Divider
            sx={{
              borderColor: theme.palette.divider,
              marginLeft: "10px",
              borderStyle: "dashed",
            }}
            light
            flexItem
            orientation="vertical"
            variant="middle"
          />
        </Box>
        <Box
          sx={{
            gridColumn: "2",
            display: "flex",
            height: "45px",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <FormControl
            sx={{
              justifySelf: "start",
              justifyContent: "center",
              height: "50px",
            }}
          >
            <FormLabel
              sx={{
                fontSize: "0.8rem",
              }}
              id="row-radio-buttons-group-label"
            >
              <Typography fontWeight="500">Дата:</Typography>
            </FormLabel>
            <RadioGroup
              sx={{ flexWrap: "nowrap", height: "30px", minWidth: "100%" }}
              row
              defaultValue="created"
              onChange={handleSetSortedValue}
              aria-labelledby="sorted-group"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="created"
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{ fontSize: "0.8rem" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    Создания
                  </Typography>
                }
              />
              <FormControlLabel
                value="expirationDate"
                control={<Radio size="small" />}
                label={
                  <Typography
                    sx={{ fontSize: "0.8rem" }}
                    variant="body2"
                    color="textSecondary"
                  >
                    Окончания
                  </Typography>
                }
              />
            </RadioGroup>
          </FormControl>
          <Divider
            sx={{
              borderColor: theme.palette.divider,
              borderStyle: "dashed",
            }}
            light
            flexItem
            orientation="vertical"
            variant="middle"
          />
        </Box>
        <SelectDepartament />
        <Avatar
          sx={{
            bgcolor: theme.palette.secondary.main,
            color: theme.palette.text.primary,
            gridColumn: "5",
            alignItems: "center",
          }}
          alt="Avatar"
        >
          H
        </Avatar>
      </Box>
    </>
  );
};

export default NavBar;
