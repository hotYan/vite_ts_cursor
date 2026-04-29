# Vite + Vue3 + TypeScript 基础架构

## 1. 环境要求

- Node.js: `20.19.4`（建议使用 nvm）
- 包管理器: `pnpm 10+`

## 2. 快速开始

```bash
pnpm install
pnpm dev
```

默认开发地址为 `http://localhost:5173`。

## 3. 常用命令

- `pnpm dev`：启动开发环境
- `pnpm build`：类型检查 + 生产构建
- `pnpm preview`：预览生产包
- `pnpm type-check`：执行 TS 类型检查
- `pnpm lint`：执行 ESLint 检查
- `pnpm lint:fix`：自动修复可修复的 lint 问题
- `pnpm format`：执行 Prettier 格式化

## 4. 目录结构

```text
src
├─ apis/         # API 模块（按业务域组织）
├─ assets/       # 静态资源
├─ components/   # 公共组件
├─ router/       # 路由配置与守卫
├─ stores/       # Pinia 状态管理
├─ types/        # 全局类型声明
├─ utils/        # 工具函数与请求封装
└─ views/        # 页面级组件
```

## 5. 环境变量

项目已提供：

- `.env.development`
- `.env.production`

示例变量：

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

注意：前端可访问变量必须以 `VITE_` 前缀命名。

## 6. 请求层与权限骨架

- 统一请求实例：`src/utils/http.ts`
  - 内置 `baseURL`、超时、请求/响应拦截器
  - 请求时自动注入 token
  - 401 时自动清理 token
  - 支持统一响应结构 `ApiResult<T>` 自动解包
- 统一错误与业务异常：`src/utils/errors.ts`
  - `ErrorCode` 统一错误码枚举（成功/未授权/无权限/服务异常/网络异常）
  - `BusinessError` 统一业务异常类型
  - `getErrorMessage()` 用于界面层统一展示错误文案
- 路由权限：`src/router/index.ts`
  - `meta.requiresAuth`：需要登录
  - `meta.guestOnly`：仅未登录可访问
  - 全局 `beforeEach` 进行跳转控制

## 7. 提交规范（Husky + lint-staged + commitlint）

已启用：

- `pre-commit`：执行 `pnpm lint-staged`
- `commit-msg`：执行 `pnpm commitlint --edit "$1"`

推荐提交格式（Conventional Commits）：

```text
feat: 新增登录权限守卫
fix: 修复接口 401 处理逻辑
chore: 调整 lint 配置
```

常见 type：`feat` / `fix` / `docs` / `style` / `refactor` / `test` / `chore`。
