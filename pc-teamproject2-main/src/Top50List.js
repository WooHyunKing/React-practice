import React from "react";
import { Box } from "@mui/material";

import { TopMusicList } from "./TopMusicList";

export default function Top50List() {
  const [music, setMusic] = React.useState([]);

  React.useEffect(() => {
    setMusic(TopMusicList);
  });

  function H() {
    return <h1 className={"text-center"}>Music Top50</h1>;
  }

  const TopList = music.map((m, item) => (
    <tr key={item}>
      <td>{m.rank}</td>
      <td>
        {m.state === "상승" && <span style={{ color: "red" }}>▲{m.idcrement}</span>}
        {m.state === "하강" && <span style={{ color: "blue" }}>▼{m.idcrement}</span>}
        {m.state === "유지" && <span style={{ color: "grey" }}>-</span>}
      </td>
      <td>
        <img src={m.poster} width={"35"} height={"35"} />
      </td>
      <td>{m.title}</td>
      <td>{m.singer}</td>
    </tr>
  ));

  return (
    <div className={"row"}>
      <H />
      <table className={"table"}>
        <thead>
          <tr className={"success"}>
            <td>순위</td>
            <td>등폭</td>
            <td></td>
            <td>노래명</td>
            <td>가수명</td>
          </tr>
        </thead>
        <tbody>{TopList}</tbody>
      </table>
    </div>
  );
}
