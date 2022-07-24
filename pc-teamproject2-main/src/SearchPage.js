import React from "react";
import { Button, TextField } from "@mui/material";
import MusicList from "./MusicList";
import SelectUnstyled, { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";

import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { HistoryAtom } from "./atom.js";

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  900: "#003A75",
};

const grey = {
  100: "#E7EBF0",
  200: "#E0E3E7",
  300: "#CDD2D7",
  400: "#B2BAC2",
  500: "#A0AAB4",
  600: "#6F7E8C",
  700: "#3E5060",
  800: "#2D3843",
  900: "#1A2027",
};

const StyledButton = styled("button")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    min-width: 180px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 0.75em;
    margin: 0.5em;
    padding: 10px;
    text-align: left;
    line-height: 1.5;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
  
    &:hover {
      background: ${theme.palette.mode === "dark" ? "" : grey[100]};
      border-color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &.${selectUnstyledClasses.focusVisible} {
      outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[100]};
    }
  
    &.${selectUnstyledClasses.expanded} {
      &::after {
        content: '▴';
      }
    }
  
    &::after {
      content: '▾';
      float: right;
    }
    `
);

const StyledListbox = styled("ul")(
  ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 320px;
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[800] : grey[300]};
    border-radius: 0.75em;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    overflow: auto;
    outline: 0px;
    `
);

const StyledOption = styled(OptionUnstyled)(
  ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.highlighted} {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
  
    &.${optionUnstyledClasses.highlighted}.${optionUnstyledClasses.selected} {
      background-color: ${theme.palette.mode === "dark" ? blue[900] : blue[100]};
      color: ${theme.palette.mode === "dark" ? blue[100] : blue[900]};
    }
  
    &.${optionUnstyledClasses.disabled} {
      color: ${theme.palette.mode === "dark" ? grey[700] : grey[400]};
    }
  
    &:hover:not(.${optionUnstyledClasses.disabled}) {
      background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
      color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    }
    `
);

const StyledPopper = styled(PopperUnstyled)`
  z-index: 1;
`;

const CustomSelect = React.forwardRef(function CustomSelect(props, ref) {
  const components = {
    Root: StyledButton,
    Listbox: StyledListbox,
    Popper: StyledPopper,
    ...props.components,
  };

  return <SelectUnstyled {...props} ref={ref} components={components} />;
});

export default function SearchPage({ list, onSearch }) {
  const [searchWord, setSearchWord] = React.useState("");
  const [History, setHistory] = useRecoilState(HistoryAtom);
  const resetHistory = useResetRecoilState(HistoryAtom);

  const handleSearch = (event) => {
    event.preventDefault();
    console.log(searchWord);
    setSearchWord("");
    setHistory([...History, searchWord]);
    console.log("History :" + History);
    fetch(`http://itunes.apple.com/search?term=${searchWord}&entity=song`)
      .then((r) => r.json())
      .then((r) => {
        console.log(r);
        onSearch(r.results);
        setSearchWord("");
      })
      .catch((e) => console.log("error when search musician"));
  };

  const handleSearchTextChange = (event) => {
    setSearchWord(event.target.value);
  };

  return (
    <React.Fragment>
      <form style={{ display: "flex", marginTop: 20, marginBottom: 15 }}>
        <div style={{ display: "flex", marginLeft: "auto", marginRight: "auto" }}>
          <TextField
            variant="outlined"
            label="Music Album Search"
            type="search"
            style={{ width: 450 }}
            onChange={handleSearchTextChange}
            value={searchWord}
          ></TextField>
          <CustomSelect defaultValue={10}>
            <StyledOption key="1" value={10}>movie</StyledOption>
            <StyledOption key="2"  value={20}>podcast</StyledOption>
            <StyledOption key="3"  value={30}>music</StyledOption>
            <StyledOption key="4"  value={40}>musicVideo</StyledOption>
            <StyledOption key="5"  value={50}>audiobook</StyledOption>
            <StyledOption key="6"  value={60}>shortFilm</StyledOption>
            <StyledOption key="7"  value={70}>software</StyledOption>
            <StyledOption key="8"  value={80}>tvShow</StyledOption>
            <StyledOption key="9"  value={90}>all</StyledOption>
          </CustomSelect>
          <Button variant="contained" color="primary" type="submit" onClick={handleSearch} style={{ marginLeft: 10 }}>
            Search
          </Button>
        </div>
      </form>
      <MusicList list={list}></MusicList>
    </React.Fragment>
  );
}
