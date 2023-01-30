const passport = require("passport");

module.exports.getLogin = async (req, res) => {
  return res.redirect("/");
};

module.exports.postLogin = async (req, res, next) => {
  console.log("h1");
  // 첫 번째 인자로 'local'이 들어갔습니다. 이 local 부분을 만나면 위에서 만들었던 ../passport/localStrategy.js가 실행됩니다.
  passport.authenticate("local", (authError, user, info) => {
    // localStrategy.js에서 done으로 나온 결과가 passport.authenticate의 두 번째 인자로 들어가게 되는 것입니다.
    if (authError) {
      // 로그인 에러가 발생했을 경우 authError에서 걸리는 것
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      // user가 없을 경우 !user에서 걸리도록
      //req.flash('loginError',info.message);
      console.log("login Error");
      return res.redirect("/auth");
    }
    // 그 외에는 req.login(user) 코드를 작성하여 로그인을 성공
    // req.login()메서드는 passport가 추가해준 메서드로, 사용자의 정보를 세션에 저장해주는 메서드
    // 이 사용자 정보는 이후 req.user로 접근하여 찾을 수 있습니다.
    return req.login(user, (loginError) => {
      // 뒤의 로그인 에러는 done()까지 완료되었음에도, 세션에 저장실패 에러가 발생하거나 등등의 에러가 발생하였을 때를 대비하여 넣어둔 코드입니다.
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/"); // 로그인 성공시 날릴 라우터 부분
    });
  })(req, res, next);
};
