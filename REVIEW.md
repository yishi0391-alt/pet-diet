# 整理审阅记录

检查日期：2026-11-25。来源：yishi0391-alt/pet-diet 的 main 分支。本报告记录首次本地审阅结果；用户随后确认将整理包提交至仓库。Pages 设置未修改。

## 文件比较与保留策略

原始 README 为 68,911 字节，现有 index.html 为 89,050 字节。两者不同：现有页面增加新手引导、更新公告、扩充食物库并移除拍照记录。不能将 README 的旧源码覆盖现有入口。README 中从 DOCTYPE 至文件末尾的 HTML 已逐字提取至 archive/README.legacy.html，两个原始文件也完整保存。整理包的 index.html 以现有页面为基准，仅有下面两处修正。

## 已确认修正

1. exStop 中计步距离从 steps × 0.7 / 1000 改为 steps × 0.7，以米保存；confirmEx 已按米除以 1000 输出公里。原先 1000 步的日志会显示 0.00km，修正后为 0.70km。
2. showExSumm 将内部距离除以 1000 再显示公里。原先 GPS 跑 1000 米会显示 1000.00 公里，修正后为 1.00 公里。

旧 README 的 photoFood 对今日总热量与食物日志分别调用随机数，既无实际依据又可能不一致。当前入口已无该函数或按钮，因此不恢复旧功能；历史代码仅留档。当前 Math.random 用于宠物动画、对话等游戏表现。

## 测试结果

node tests/regression.cjs：5 项通过。覆盖 Haversine 米制计算、1000 步汇总与日志一致性、1000 米 GPS 汇总与日志及热量、零距离显示、旧拍照函数不存在。完整页面内联脚本在 Node VM 中成功解析；测试直接调用页面函数并模拟 DOM。

尚未完成：真实浏览器视觉检查、手机定位/计步授权、iOS 权限流程、后台及锁屏行为。不能据此宣称传感器已实测可用。

## 另发现的问题（未改动）

- 暂停后停止会重新以当前时间减起始时间，可能把暂停时间计入运动时长。
- DeviceMotion 未处理部分浏览器需要的 requestPermission。
- GPS 只按单段 0.5–50 米过滤，未结合精度和时间判断漂移。
- today() 使用 UTC 日期切片，在中国时区凌晨可能出现日期偏差。
- 部分用户输入直接插入 innerHTML；公开展示前应增加转义、输入范围校验。
- 周报的体重变化取全部历史首末记录，不能准确代表本周。

## GitHub Pages 部署计划

先确认本包内容，再在独立分支提交并审阅：替换 README、应用 index 的两处修正、添加测试；历史 HTML 可只作本地备份，避免误认为正式入口。提交前再次检查远程 main 是否变化并比较，避免覆盖后续更新。

审核后进入仓库 Settings → Pages → Build and deployment，选择 Deploy from a branch，main，/(root)，保存。入口为根目录 index.html。本次没有读取或修改当前 Pages 配置，因此不判断是否已经启用。

预期地址：https://yishi0391-alt.github.io/pet-diet/（未验证在线）。上线后检查部署记录、HTTPS、手机五个标签页、首次引导、保存与刷新、暂停恢复停止、权限拒绝和 GPS 无信号。先备份浏览器数据，不使用“重置数据”测试真实用户资料。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 求职主页后续

先置顶这个已验证的项目，介绍采用“原生 Web 宠物养成与日常记录原型”，附截图和实际测试范围。桌宠项目与 JobLens 需检查真实仓库后再写完成情况，不将规划写成成果。个人主页的求职方向、学校年级及联系方式等待本人提供后填写。

## 原始文件 SHA-256

- README.md: 012740347e7725586429e51632623792da1e48f77c2e86595d13a67d620ca8a9
- index.html: e85175e853d19f3461fe5dbae23309356b6da0f89cbeaf55570ac758318c88ac
