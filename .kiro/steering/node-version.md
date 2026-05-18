---
description: 确保所有终端命令在本地最新 Node 版本下运行
inclusion: auto
---

# Node 版本管理规则

在执行任何终端命令之前，必须先确认并切换到本地最新的 Node.js 版本。

## 流程

1. 执行 `nvm ls` 查看本地已安装的 Node 版本列表。
2. 识别列表中版本号最高的版本。
3. 执行 `nvm use <最新版本>` 切换到该版本。
4. 确认切换成功后，再执行后续的所有命令（安装依赖、构建、运行脚本等）。

## 规则

- 每次会话首次执行终端命令前，必须完成上述版本切换流程。
- 切换完成后，同一会话内后续命令无需重复切换。
- 如果 `nvm use` 失败（版本未安装），使用 `nvm install <版本>` 安装后再切换。
- 禁止在未确认 Node 版本的情况下直接执行 `pnpm install`、`pnpm run build` 等命令。

## 示例

```bash
# 1. 查看本地版本
nvm ls

# 2. 切换到最新版本
nvm use v20.19.4

# 3. 确认版本
node -v

# 4. 然后再执行项目命令
pnpm install
pnpm run build
```
