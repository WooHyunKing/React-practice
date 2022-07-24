import React from "react";
import { Card, Box, CardContent, CardActions, Typography, IconButton, CardMedia, Avatar } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SnackMsg from "./SnackMsg";
import { styled } from "@mui/system";
import SelectUnstyled, { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, { optionUnstyledClasses } from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { LikeAtom } from "./atom.js";

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

export default function SearchPage() {
  const [likes, setLikes] = React.useState({});
  const [songUrl, setSongUrl] = React.useState({});
  const [likeList, setLikeList] = useRecoilState(LikeAtom);
  const [played, setPlayed] = React.useState({});
  const [player, setPlayer] = React.useState({});
  const [snackState, setSnackState] = React.useState({ open: false, msg: "" });

  const [likeListInfo, setLikeListInfo] = React.useState({});
  console.log(likeList);

  console.log(likeListInfo);

  const theme = useTheme();
  const toggleFavorite = (id, name) => () => {
    setLikes({ ...likes, [id]: !likes[id] });
    setSnackState({ ...snackState, open: true, msg: `${name} is clicked` });
    setLikeList([...likeList, id]);
    console.log("LikeList :" + likeList);
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackState({ open: false, msg: "" });
  };

  const handleplayed = (id, url) => () => {
    setPlayed({ ...played, [id]: !played[id] });
    console.log("played : " + played[id]);
    setSongUrl({ ...songUrl, [id]: `${url}` });
    console.log(songUrl);
    if (played[id] === true) {
      player[id].pause();
    } else if (player[id] == undefined) {
      const audio = new Audio(url);
      setPlayer({ ...player, [id]: audio });
      audio.play();
    } else {
      player[id].play();
    }
  };
  {
    likeList.map((item, i) => {
      React.useEffect(() => {
        fetch(`https://itunes.apple.com/us/lookup?id=${likeList}`)
          .then((r) => r.json())
          .then((r) => {
            setLikeListInfo({ ...likeListInfo, results: r.results });
          })
          .catch((e) => console.log("error when search musician"));
      }, []);
    });
  }
  console.log("This is like list info:" + likeListInfo);
  {
    Object.values(likeListInfo).map((item, i) => {
      item.map((list, i) => {
        console.log(item[i].artistName);
      });
    });
  }

  return (
    <div>
      {Object.values(likeListInfo).map((item, i) => {
        return item.map((list, i) => {
          return (
            <Card
              sx={{
                display: "flex",
                mx: "auto",
                maxWidth: 1000,
                "&:hover": {
                  backgroundColor: "secondary.main",
                  opacity: [0.9, 0.8, 0.7],
                },
              }}
              key={item[i].trackId}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 700,
                }}
              >
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography variant="h6"> {item[i].trackCensoredName}</Typography>
                  <Typography variant="subtitle2" color="text.secondory">
                    {" "}
                    Album : {item[i].collectionCensoredName}
                  </Typography>
                  <Typography variant="caption" color="text.secondory">
                    {" "}
                    Artist : {item[i].artistName}
                  </Typography>
                </CardContent>
                <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
                  <IconButton aria-label="previous">{theme.direction === "rtl" ? <SkipNextIcon /> : <SkipPreviousIcon />}</IconButton>
                  <IconButton aria-label="play/pause" onClick={handleplayed(item[i].trackId, item[i].previewUrl)}>
                    {played[item[i].trackId] === true ? <StopIcon /> : <PlayArrowIcon />}
                  </IconButton>
                  <IconButton aria-label="next">{theme.direction === "rtl" ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton>
                  <CardActions>
                    <audio className="audio-element">
                      <source src={songUrl[item[i].trackId]} />
                    </audio>
                    <IconButton onClick={toggleFavorite(item[i].trackId, item[i].trackName)}>
                      {likes[item[i].trackId] === true ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                  </CardActions>
                </Box>
              </Box>
              <CardMedia
                component="img"
                sx={{
                  marginTop: 3,
                  marginBottom: 3,
                  maxWidth: 160,
                  maxheight: 160,
                }}
                src={item[i].artworkUrl100}
              />
            </Card>
          );
        });
      })}
    </div>
  );
}
