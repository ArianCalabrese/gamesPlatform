import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
//
import useCopyToClipboard from "../../shared/hooks/copy-clipboard-hook";
import Card from "../../shared/components/UIElements/Card";

import "./GameInfo.css";

const GameInfo = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="server-list center">
        <Card>
          <h2>No players yet</h2>
        </Card>
      </div>
    );
  } else {
    var payments = [];
    props.items.forEach((player) => {
      payments.push(
        <div className="wrapper">
          <p className="playerName">{player.name}</p>
          <p>|</p>
          <p className="playerScore">{player.score}</p>
        </div>
      );
    });
  }

  return (
    <div>
      <div className="topScoreBoard">
        <p>Player</p>
        <p>Score</p>
      </div>
      <div className="scoreboard">{payments}</div>
    </div>
  );
};

export default GameInfo;
