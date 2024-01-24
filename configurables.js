
let final_answer = "helloworld";

let mission2_description = "mission2 description"
let mission3_description = "mission3 description"

let passwords_dict = {
    team1: {
      first: "1password1",
      second: "1password2",
      third: "1password3",
    },
    team2: {
      first: "2password1",
      second: "2password2",
      third: "2password3",
    },
    team3: {
      first: "3password1",
      second: "3password2",
      third: "3password3",
    },
  };

  let team1 = {
    id: "team1",
    name: "팀원",
    success: ["X", "X", "X"],
    passwords: ["hello1", "hello2", "hello3"],
  };
  let team2 = {
    id: "team2",
    name: "팀투",
    success: ["X", "X", "X"],
    passwords: ["hello1", "hello2", "hello3"],
  };
  let team3 = {
    id: "team3",
    name: "팀쓰리",
    success: ["X", "X", "X"],
    passwords: ["hello1", "hello2", "hello3"],
  };

  module.exports = {final_answer, mission2_description, mission3_description, passwords_dict, team1, team2, team3}