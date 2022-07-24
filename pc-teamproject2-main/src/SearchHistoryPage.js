import React from "react";
import {
  Card,
  Box,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";

import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
import { HistoryAtom } from "./atom.js";
import Top50List from "./Top50List";

export default function SearchHistoryPage() {
  const [History, setHistory] = useRecoilState(HistoryAtom);

  const HistoryLogs = History.map((History, i) => {
    console.log("History items :" + History);
  });

  return (
    <div>
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          marginLeft: "80px",
          marginRight: "80px",
          justifyContent: "center",
          border: "3px solid black",
          borderRadius: "30px",
        }}
      >
        {" "}
        <Typography variant="h4">History & Recomend Songs</Typography>
      </div>

      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "glay" }}>
        {History.map((History, item) => {
          return (
            <ListItem alignItems="flex-start" key={item}>
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={`${History}`}
                secondary={
                  <React.Fragment>
                    <Typography sx={{ display: "inline" }} component="span" variant="body2" color="text.primary">
                      {`Explained ${History} - `}
                    </Typography>
                    {"Ready for this text"}
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
        <Divider />
      </List>
      <Top50List></Top50List>
    </div>
  );
}
