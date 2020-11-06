import React from "react";
import Card from "../../shared/components/UIElements/Card";
import { Table } from "react-bootstrap";

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
    var players = props.items.sort(function (a, b) {
      if (a.score > b.score) {
        return 1;
      }
      if (a.score < b.score) {
        return -1;
      }
      return 0;
    });
  }

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Player</th>
          <th>Score</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player, index) => (
          <tr>
            <td>{index}</td>
            <td>{player.name}</td>
            <td>{player.score}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default GameInfo;
