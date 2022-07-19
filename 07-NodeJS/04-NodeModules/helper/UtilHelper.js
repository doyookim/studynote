/**
 * @FileName : UtilHelper.js
 * @Description : 백엔드 개발시 자주 사용되는 독립 함수들 모음
 * @Author: EZEN 아카데미 Node.js 강의 (김도유, howdoyoodoit.gmail.com)
 */

import { networkInterfaces } from "os";

const myip = () => {
  const ipAdress = [];
  const nets = networkInterfaces();

  for (const attr in nets) {
    const item = nets[attr];

    item.map((v, i) => {
      // if (v.family == 'IPv4' && v.address != '127.0.0.1') {
      if (v.family == 4 && v.address != "127.0.0.1") {
        ipAdress.push(v.address);
      }
    });
  }
  return ipAdress;
};

const urlFormat = (urlObject) =>
  String(Object.assign(new URL("http://a.com").urlObject));

export { myip, urlFormat };
