import React from "react";
import { Card, Box, CardContent, CardActions, Typography, IconButton, CardMedia } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import SnackMsg from "./SnackMsg";

import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { LikeAtom } from "./atom.js";

const styles = {
  content: {},
  layout: {
    display: "flex",
    justifyContent: "center",
  },
  card: {
    minWidth: 275,
    maxWidth: 600,
    marginBottom: "20pt",
    marginLeft: "auto",
    marginRight: "auto",
  },
};

export default function MusicList({ list }) {
  const [likes, setLikes] = React.useState({});
  const [snackState, setSnackState] = React.useState({ open: false, msg: "" });
  const [played, setPlayed] = React.useState({});

  const [likeList, setLikeList] = useRecoilState(LikeAtom);
  const resetHistory = useResetRecoilState(LikeAtom);
  const [songUrl, setSongUrl] = React.useState({});
  const [player, setPlayer] = React.useState({});

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
    setSongUrl({ ...songUrl, [id]: `${url}`});
    console.log(songUrl);
    if(played[id]===true) {
      player[id].pause();
    }
    else if(player[id]==undefined) {
      const audio = new Audio(url);
      setPlayer({ ...player, [id]: audio})
      audio.play();
    }
    else {
      player[id].play();
    }
  };
  
  const theme = useTheme();
  return (
    <div>
      {list.map((item) => {
        return (
          <Card sx={{
              display : 'flex',
              mx: 'auto',
              maxWidth : 1000,
              '&:hover': {
                backgroundColor: 'secondary.main',
                opacity: [0.9, 0.8, 0.7],
            },
              }} key={item.trackId}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              width: 700,
              
            }}>
            <CardContent sx = {{flex: '1 0 auto'}}>
              <Typography variant="h6"> {item.trackCensoredName}</Typography>
              <Typography variant="subtitle2" color="text.secondory"> Album : {item.collectionCensoredName}</Typography>
              <Typography variant="caption" color="text.secondory"> Artist : {item.artistName}</Typography>
            </CardContent>
            <Box sx={{ display: 'flex', alignItems:'center', pl:1, pb:1}}>
              <IconButton aria-label="previous">{theme.direction === 'rtl' ? <SkipNextIcon/> : <SkipPreviousIcon />}
              </IconButton>
              <IconButton aria-label="play/pause" onClick ={handleplayed(item.trackId, item.previewUrl) }>
                  {played[item.trackId] === true ? <StopIcon/> : <PlayArrowIcon/>}
              </IconButton>
              <IconButton aria-label="next">{theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}</IconButton>
              <CardActions>
              <audio className="audio-element">
                  <source src={songUrl[item.trackId]}/>
              </audio>
                <IconButton onClick={toggleFavorite(item.trackId, item.trackName)}>
                {likes[item.trackId] === true ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                
              </CardActions>
              </Box>
            </Box>
            <CardMedia
          component="img"
          sx = {{
            marginTop : 3,
            marginBottom : 3,
            maxWidth : 160,
            maxheight : 160
          }}
          src  = {item.artworkUrl100}
          />

          </Card>
        );
      })}
      <SnackMsg open={snackState.open} message={snackState.msg} onClose={handleSnackbarClose} />
    </div>
  );
}
