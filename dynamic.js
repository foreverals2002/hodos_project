const express = require("express");
const app = express();

app.use(express.urlencoded());

app.set("view engine", "ejs");

var final_answer = "helloworld";
var last_attempt;
var team1_last_attempt;
var team2_last_attempt;
var team3_last_attempt;

var passwords_dict = {
  team1: {
    first: "password0",
    second: "password1",
    third: "password2",
  },
  team2: {
    first: "password0",
    second: "password1",
    third: "password2",
  },
  team3: {
    first: "password0",
    second: "password1",
    third: "password2",
  },
};

var team1 = {
  id: "team1",
  name: "팀원",
  success: ["", "", ""],
  passwords: ["hello1", "hello2", "hello3"],
};
var team2 = {
  id: "team2",
  name: "팀투",
  success: ["", "", ""],
  passwords: ["hello1", "hello2", "hello3"],
};
var team3 = {
  id: "team3",
  name: "팀쓰리",
  success: ["", "", ""],
  passwords: ["hello1", "hello2", "hello3"],
};

function final_hint_available(team) {
  if (
    team.success[0] == "성공" &&
    team.success[1] == "성공" &&
    team.success[2] == "성공"
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

  if (last_attempt != undefined && Date.now() - last_attempt < 60 * 1000) {
    res.write("<script>alert('1분에 한번씩만 시도할 수 있습니다.')</script>");
    res.write('<script>window.location="./"</script>');
    res.end();
  } else if (password == final_answer) {
    res.render("success", {});
  } else {
    last_attempt = Date.now();
    res.write(
      "<script>alert('비밀번호가 틀렸습니다. 일분 후에 다시 시도하세요.')</script>"
    );
    res.write('<script>window.location="./"</script>');
    res.end();
  }
});

app.get("/team1", (req, res) => {
  res.render("team_subpage", { team: team1 });
});

app.post("/team1", (req, res) => {
  var password = req.body.password;

  res.set({ "content-type": "text/html; charset=utf-8" });

  if (
    team1_last_attempt != undefined &&
    Date.now() - team1_last_attempt < 60 * 1000
  ) {
    res.write("<script>alert('1분에 한번씩만 시도할 수 있습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
    res.end();
  } else if (password == passwords_dict.team1.first) {
    team1.success[0] = "성공";
    res.write("<script>alert('축하합니다! 미션 1을 완료하였습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
    res.end();
  } else if (password == passwords_dict.team1.second) {
    team1.success[1] = "성공";
    res.write("<script>alert('축하합니다! 미션 2를 완료하였습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
    res.end();
  } else if (password == passwords_dict.team1.third) {
    team1.success[2] = "성공";
    res.write("<script>alert('축하합니다! 미션 3을 완료하였습니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
    res.end();
  } else {
    team1_last_attempt = Date.now();
    res.write(
      "<script>alert('비밀번호가 틀렸습니다. 일분 후에 다시 시도하세요.')</script>"
    );
    res.write('<script>window.location="./team1"</script>');
    res.end();
  }
});

app.get("/team2", (req, res) => {
  res.render("team_subpage", { team: team2 });
});

app.post("/team2", (req, res) => {});

app.get("/team3", (req, res) => {
  res.render("team_subpage", { team: team3 });
});

app.post("/team3", (req, res) => {});

app.get("/team1_final_hint", (req, res) => {
  if (final_hint_available(team1)) {
    res.render("team1_final_hint", {});
  } else {
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.write("<script>alert('미션 1~3를 모두 완료해야합니다.')</script>");
    res.write('<script>window.location="./team1"</script>');
    res.end();
  }
});

app.get("/team2_final_hint", (req, res) => {
  if (final_hint_available(team2)) {
    res.render("team2_final_hint", {});
  } else {
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.write("<script>alert('미션 1~3를 모두 완료해야합니다.')</script>");
    res.write('<script>window.location="./team2"</script>');
    res.end();
  }
});

app.get("/team3_final_hint", (req, res) => {
  if (final_hint_available(team3)) {
    res.render("team3_final_hint", {});
  } else {
    res.set({ "content-type": "text/html; charset=utf-8" });
    res.write("<script>alert('미션 1~3를 모두 완료해야합니다.')</script>");
    res.write('<script>window.location="./team3"</script>');
    res.end();
  }
});

app.listen(3000, () => {
  console.log("server started on port 3000");
});
