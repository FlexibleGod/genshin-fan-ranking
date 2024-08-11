# 原神粉丝排位赛

## 如何运行？

步骤如下：

1. 安装 docker，使用 docker 提供代码运行环境，这样你不用安装其它的很多东西了。
   docker 设置中需要添加一个 `registry-mirrors`，这样加速下载运行所需资源。
   
   ```
   "registry-mirrors": [
    "https://docker.m.daocloud.io"
   ]
   ```
    ![添加registry-mirrors](https://github.com/user-attachments/assets/0b2ecfaf-e6f0-4e5f-beed-200515d92f33)

2. 下载本项目的所有文件，得到文件夹 genshin-fan-ranking，在其中创建一个 `.env` 文件，用于存放你的B站身份认证信息（请勿将这些信息透露给别人，这相当于你的账号密码），内容格式如下：
   
   ```
   COOKIE="XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
   CSRF=XXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```
   XXX... 的部分获取方法：浏览器进入B站原神官号页面，按F12打开调试工具并切到“网络”面板，然后进行关注/取关操作就能看到 modify 的请求信息。
   
   ![获取cookie](https://github.com/user-attachments/assets/2535a995-1230-4538-bd0c-bb9c6582e026)
   ![获取csrf](https://github.com/user-attachments/assets/6f5bdefa-b75b-44e8-9a65-942ba4af1f94)

4. 打开 powershell，使用 `cd` 命令进入 genshin-fan-ranking 目录，执行 `docker compose up -d` 命令即可运行。运行后可在 docker 中查看/操作状态。
   
   ![docker 运行状态](https://github.com/user-attachments/assets/6a49d161-0da1-4dba-99a8-46b25441a463)
