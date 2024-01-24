const express = require("express");
const app = express();

app.use(express.urlencoded());
app.use(express.static(__dirname + '/public'));

app.set("view engine", "ejs");


// configurables 
let cooltime = 1;

let final_answer = "예수그리스도안에우린하나";

let mission2_description = "미션2 가이드:<br>초곡교회 곳곳에 붙어있는 미니임무를 찾아 수행하시오.<br> 조해창 감독관에게 임무 완료 검사를 받으면 스무고개 질문권을 받을 수 있습니다. <br> 질문권은 위수환 감독관에게 사용하십시오. <br> 스무고개의 답이 Mission2의 암호입니다. <br> 단, 각 조마다 스무고개 답은 다르니 주의하십시오."
let mission3_description = "미션3 가이드:<br>조해창 감독관을 찾아가 미션3를 받으시오."

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

// until here

var last_attempt;
var team1_last_attempt;
var team2_last_attempt;
var team3_last_attempt;

function final_hint_available(team) {
  if (
    team.success[0] == "O" &&
    team.success[1] == "O" &&
    team.success[2] == "O"
  ) {
    return true;
  } else {
    return false;
  }
}

app.get("/", (req, res) => {
  res.render("indexPage", {
    team1: team1,
    team2: team2,
    team3: team3,
  });
});

app.post("/final_password", (req, res) => {
  var password = req.body.final_password;

  res.set({ "content-type": "text/html; charset=utf-8" });

  if (last_attempt != undefined && Date.now() - last_attempt < 1 * 60 * 1000) {
    res.write("<script>alert('" + cooltime + " 분에 한번씩만 시도할 수 있습니다.')</script>");
    res.write('<script>window.location="./"</script>');
  } else if (password == final_answer) {
    res.render("success", {});
  } else {
    last_attempt = Date.now();
    res.write(
      "<script>alert('비밀번호가 틀렸습니다. 일분 후에 다시 시도하세요.')</script>"
    );
    res.write('<script>window.location="./"</script>');
  }
});

app.get("/team1", (req, res) => {
    if (team1.success[0] == "O") {
        mission2_desc = mission2_description
    } else {
        mission2_desc = ""
    }
    if (team1.success[1] == "O") {
        mission3_desc = mission3_description
    } else {
        mission3_desc = ""
    }
  res.render("team_subpage", { 
    team: team1, 
    mission2_desc: mission2_desc, 
    mission3_desc: mission3_desc 
    });
});

app.post("/team1", (req, res) => {
  var password = req.body.password;

  res.set({ "content-type": "text/html; charset=utf-8" });

  if (
    team1_last_attempt != undefined &&
    Date.now() - team1_last_attempt < 60 * 1000
  ) {
    res.write("<script>alert('" + cooltime + " 분에 한번씩만 시도할 수 있습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
  } else if (password == passwords_dict.team1.first) {
    team1.success[0] = "O";
    res.write("<script>alert('축하합니다! 미션 1을 완료하였습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
  } else if (password == passwords_dict.team1.second) {
    team1.success[1] = "O";
    res.write("<script>alert('축하합니다! 미션 2를 완료하였습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
  } else if (password == passwords_dict.team1.third) {
    team1.success[2] = "O";
    res.write("<script>alert('축하합니다! 미션 3을 완료하였습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
  } else {
    team1_last_attempt = Date.now();
    res.write(
      "<script>alert('비밀번호가 틀렸습니다. 일분 후에 다시 시도하세요.')</script>"
    );
    res.write('<script>window.location="./team1"</script>');
  }
});

app.post("/team2", (req, res) => {
    var password = req.body.password;
  
    res.set({ "content-type": "text/html; charset=utf-8" });
  
    if (
      team2_last_attempt != undefined &&
      Date.now() - team2_last_attempt < 60 * 1000
    ) {
        res.write("<script>alert('" + cooltime + " 분에 한번씩만 시도할 수 있습니다.')</script>");
      res.write('<script>window.location="./team2"</script>');
    } else if (password == passwords_dict.team2.first) {
      team2.success[0] = "O";
      res.write("<script>alert('축하합니다! 미션 1을 완료하였습니다.')</script>");
      res.write('<script>window.location="./team2"</script>');
    } else if (password == passwords_dict.team2.second) {
      team2.success[1] = "O";
      res.write("<script>alert('축하합니다! 미션 2를 완료하였습니다.')</script>");
      res.write('<script>window.location="./team2"</script>');
    } else if (password == passwords_dict.team2.third) {
      team2.success[2] = "O";
      res.write("<script>alert('축하합니다! 미션 3을 완료하였습니다.')</script>");
      res.write('<script>window.location="./team2"</script>');
    } else {
      team2_last_attempt = Date.now();
      res.write(
        "<script>alert('비밀번호가 틀렸습니다. 일분 후에 다시 시도하세요.')</script>"
      );
      res.write('<script>window.location="./team2"</script>');
    }
  });

  app.post("/team3", (req, res) => {
    var password = req.body.password;
  
    res.set({ "content-type": "text/html; charset=utf-8" });
  
    if (
      team3_last_attempt != undefined &&
      Date.now() - team3_last_attempt < 60 * 1000
    ) {
        res.write("<script>alert('" + cooltime + " 분에 한번씩만 시도할 수 있습니다.')</script>");
      res.write('<script>window.location="./team3"</script>');
    } else if (password == passwords_dict.team3.first) {
      team3.success[0] = "O";
      res.write("<script>alert('축하합니다! 미션 1을 완료하였습니다.')</script>");
      res.write('<script>window.location="./team3"</script>');
    } else if (password == passwords_dict.team3.second) {
      team3.success[1] = "O";
      res.write("<script>alert('축하합니다! 미션 2를 완료하였습니다.')</script>");
      res.write('<script>window.location="./team3"</script>');
    } else if (password == passwords_dict.team3.third) {
      team3.success[2] = "O";
      res.write("<script>alert('축하합니다! 미션 3을 완료하였습니다.')</script>");
      res.write('<script>window.location="./team3"</script>');
    } else {
      team3_last_attempt = Date.now();
      res.write(
        "<script>alert('비밀번호가 틀렸습니다. 일분 후에 다시 시도하세요.')</script>"
      );
      res.write('<script>window.location="./team3"</script>');
    }
  });

app.get("/team2", (req, res) => {
    if (team2.success[0] == "O") {
        mission2_desc = mission2_description
    } else {
        mission2_desc = ""
    }
    if (team2.success[1] == "O") {
        mission3_desc = mission3_description
    } else {
        mission3_desc = ""
    }
  res.render("team_subpage", { 
    team: team2, 
    mission2_desc: mission2_desc, 
    mission3_desc: mission3_desc 
    });
});

app.get("/team3", (req, res) => {
    if (team3.success[0] == "O") {
        mission2_desc = mission2_description
    } else {
        mission2_desc = ""
    }
    if (team3.success[1] == "O") {
        mission3_desc = mission3_description
    } else {
        mission3_desc = ""
    }
  res.render("team_subpage", { 
    team: team3, 
    mission2_desc: mission2_desc, 
    mission3_desc: mission3_desc 
    });
});

app.get("/team1_final_hint", (req, res) => {
  if (final_hint_available(team1)) {
    res.render("team1_final_hint", {});
  } else {
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.write("<script>alert('미션 1~3를 모두 완료해야합니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
  }
});

app.get("/team2_final_hint", (req, res) => {
  if (final_hint_available(team2)) {
    res.render("team2_final_hint", {});
  } else {
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.write("<script>alert('미션 1~3를 모두 완료해야합니다.')</script>");
    res.write('<script>window.location="./team2"</script>');
  }
});

app.get("/team3_final_hint", (req, res) => {
  if (final_hint_available(team3)) {
    res.render("team3_final_hint", {});
  } else {
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.write("<script>alert('미션 1~3를 모두 완료해야합니다.')</script>");
    res.write('<script>window.location="./team3"</script>');
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
