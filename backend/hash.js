const bcrypt = require("bcryptjs");

(async () => {
  const plain = "123456"; // mật khẩu gốc
  const hashed = await bcrypt.hash(plain, 12);
  console.log("✅ Hash của mật khẩu:", plain);
  console.log(hashed);
})();
////file này để hash mật khẩu bị lỗi không xóa////
