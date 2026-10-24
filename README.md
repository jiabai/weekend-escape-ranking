# 周末出逃 · Weekend Escape Ranking

> 十种逃跑，一个周末。一个用「投票」包装的周末出逃方式排行榜静态站点。

每周五 18:00 开榜，网友票选出本周最想执行的一条出逃路线。从深山失踪到终极家里蹲，总有一款适合周五下午三点的你。

## ✨ 功能特性

- **本周主打 Hero**：展示当期冠军与 TOP3，圆形封面图 + 票数
- **TOP 10 榜单**：十张出逃方案卡片，标注预算、趋势（▲/▼/NEW）与一句话场景
- **分类筛选**：全部 / 自然出走 / 城市漫游 / 原地疗愈
- **票仓抽屉**：点击卡片右下角箭头投票，可撤回、可批量提交，提交后票数 +1
- **周五倒计时**：公告条实时显示距周五 18:00 的剩余时间，到点提示「出逃窗口已开启」
- **响应式**：适配桌面 / 平板 / 手机（1600 / 1050 / 700 / 420 断点）

## 🛠 技术栈

零构建、零依赖的纯静态站点：

- **HTML5** — 语义化结构，原生 `<dialog>` 实现抽屉
- **CSS3** — CSS 变量设计系统、Grid 布局、关键帧动画
- **原生 JavaScript** — 数据驱动渲染、事件委托、`localStorage` 未启用（纯前端演示）
- **Google Fonts** — Bricolage Grotesque（无衬线）+ Instrument Serif（衬线）

## 📁 项目结构

```
.
├── index.html      # 页面结构与文案
├── style.css       # 设计系统与全部样式
├── script.js       # 数据、渲染与交互逻辑
├── assets/
│   ├── plan-01.jpg ~ plan-10.jpg   # 十种出逃方案封面图
└── .gitignore
```

## 🚀 本地运行

无需安装依赖，任选一种方式启动静态服务器：

```bash
# 方式一：Python 3
python -m http.server 8000

# 方式二：Node（npx）
npx serve .

# 方式三：直接双击 index.html（部分浏览器对本地文件有协议限制，推荐用本地服务器）
```

然后访问 <http://localhost:8000>。

## 📦 数据结构

出逃方案定义在 [`script.js`](script.js) 顶部的 `plans` 数组中：

```js
{
  name: '深山失踪型',     // 方案名称
  cat: 'nature',          // 分类：nature | city | home
  cost: '¥180',           // 预算
  votes: 48210,           // 当前票数
  trend: 'up',            // 趋势：up | flat | down | new
  trendText: '▲ 三连冠',  // 趋势文案
  note: '深山 · 溪水 · 零信号',  // 一句话场景
  img: 'assets/plan-01.jpg'      // 封面图
}
```

修改 `plans` 即可增删或调整榜单内容。

## ☁️ 部署

站点为纯静态文件，可直接部署到任意静态托管平台：

- **Vercel**：`vercel --prod`（仓库已忽略 `.vercel` 本地配置）
- **Netlify / GitHub Pages / Cloudflare Pages**：将整个目录作为站点根目录上传即可

## 📄 许可证

MIT © 周末出逃有限公司（个体户）
