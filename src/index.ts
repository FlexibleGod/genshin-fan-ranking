import { to } from "await-to-js";
import axios from "axios";
import dotenv from "dotenv";

// 读取 .env 配置文件
dotenv.config();

const { COOKIE, CSRF } = process.env;

const targetId = "401742377";
const targetName = "原神";

function biliFanAPI(fanState: number) {
  return axios.post(
    "https://api.bilibili.com/x/relation/modify",
    {
      fid: targetId,
      act: fanState,
      re_src: 120,
      spmid: "333.337.0.0",
      cross_domain: true,
      extend_content: `{"entity":"query","entity_id":"${targetName}"}`,
      csrf: CSRF
    },
    {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7",
        "cache-control": "no-cache",
        "content-type": "application/x-www-form-urlencoded",
        "pragma": "no-cache",
        "priority": "u=1, i",
        "sec-ch-ua": "\"Not)A;Brand\";v=\"99\", \"Google Chrome\";v=\"127\", \"Chromium\";v=\"127\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "cookie": COOKIE,
        "Referer": `https://search.bilibili.com/all?keyword=${encodeURIComponent(targetName)}`,
        "Referrer-Policy": "no-referrer-when-downgrade"
      }
    }
  );
};

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dateTime() {
  return new Date().toLocaleString();
}

async function task() {
  let fanState = 2; // 1 = 关注, 2 = 取关

  const [err1, result1] = await to(biliFanAPI(fanState));

  if (err1) {
    console.log(err1);
    console.log(`[${dateTime()}] 取关失败`);
    return;
  }

  console.log(`[${dateTime()}] 取关 - `, result1.statusText);

  // 取关后间隔一定的毫秒数再进行关注，这里随机 800~1200 毫秒
  await sleep(getRandomNumber(800, 1200));

  fanState = fanState % 2 + 1;

  const [err2, result2] = await to(biliFanAPI(fanState));

  if (err2) {
    console.log(err2);
    console.log(`[${dateTime()}] 关注失败`);
    return;
  }

  console.log(`[${dateTime()}] 关注 - `, result2.statusText);
}

(async function () {
  while (1) {
    await task();

    // 执行完成取关/关注后间隔 5~8 秒
    await sleep(getRandomNumber(5000, 8000));
  }
})();
