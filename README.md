# Codex Gateway

统一管理 Codex CLI、Claude Code 和 Kimi CLI 的 API 配置，通过本地代理实现协议转换，支持任意 OpenAI 兼容 API。

## 功能

- **Web 管理界面** - 可视化配置 API 提供商
- **协议转换** - 将 Codex CLI 的 Responses API 转换为 Chat Completions API
- **独立配置** - Codex CLI、Claude Code 和 Kimi CLI 各自独立的活跃提供商
- **自动生成命令** - 添加提供商后自动生成 Shell 命令
- **Token 统计** - 记录每日 API 用量，支持图表展示
- **登录保护** - 密码验证，JWT 认证
- **Kimi OAuth** - 支持 Kimi 官方 OAuth 认证

## 快速开始

### 安装

```bash
cd ~/codex-gateway
npm install
cd frontend && npm install && npm run build
cd ..
```

### 启动

```bash
node server.js
```

服务启动后：
- Web 管理界面: `http://localhost:3000`
- API 代理: `http://localhost:11434`

### 默认密码

```
codex2026
```

登录后可在界面修改密码。

## 使用方式

### 1. 添加提供商

访问 `http://localhost:3000`，登录后点击「添加提供商」。

**Codex CLI 配置项：**
- OpenAI Base URL（如 `https://api.example.com/v1`）
- API Key
- 模型列表（逗号分隔）
- YOLO 模式

**Claude Code 配置项：**
- Anthropic Base URL（如 `https://api.example.com/anthropic`）
- API Key
- Claude Model（如 `model-name[1m]`）
- Bypass Permissions

**Kimi CLI 配置项：**
- API Base URL（自定义 API）
- API Key
- Model
- YOLO 模式
- Kimi OAuth（官方平台，需 `/login` 认证）

### 2. 加载命令

```bash
source ~/.bashrc
```

### 3. 使用生成的命令

```bash
# Codex CLI - 使用指定提供商
codex-xiaomi exec "your prompt"
codex-deepseek exec "your prompt"

# Codex CLI - 使用当前活跃提供商
codexgo exec "your prompt"

# Claude Code - 使用指定提供商
claude-xiaomi
claude-deepseek

# Claude Code - 使用当前活跃提供商
claudego

# Kimi CLI - 使用指定提供商
kimi-xiaomi "your prompt"
kimi-deepseek "your prompt"

# Kimi CLI - 使用当前活跃提供商
kimigo "your prompt"

# Kimi CLI - OAuth 登录（首次使用需在终端运行）
kimi -m "kimi-code/kimi-for-coding"
# 然后输入 /login 完成 OAuth 认证
```

## 目录结构

```
~/.codex-gateway/
├── config.json          # 提供商配置
├── usage.json           # Token 用量统计
├── codex-aliases.sh     # Codex CLI 命令（自动生成）
├── claude-aliases.sh    # Claude Code 命令（自动生成）
├── kimi-aliases.sh      # Kimi CLI 命令（自动生成）
└── .jwt-secret          # JWT 密钥（自动生成）
```

## 配置文件说明

### config.json

```json
{
  "password": "codex2026",
  "activeProvider": "xiaomi",
  "activeCodex": "xiaomi",
  "activeClaude": "deepseek",
  "activeKimi": "kimi",
  "providers": {
    "xiaomi": {
      "name": "小米 MiMo",
      "baseUrl": "https://api.example.com/v1",
      "apiKey": "sk-xxx",
      "models": ["model-a", "model-b"],
      "anthropicUrl": "https://api.example.com/anthropic",
      "claudeModel": "model-a[1m]",
      "codexYolo": true,
      "claudeBypass": true,
      "kimiBaseUrl": "https://api.example.com/v1",
      "kimiApiKey": "sk-xxx",
      "kimiModel": "model-a",
      "kimiYolo": false,
      "kimiOAuth": false
    }
  }
}
```

### 字段说明

| 字段 | 说明 |
|------|------|
| `password` | 登录密码 |
| `activeCodex` | Codex CLI 当前活跃提供商 ID |
| `activeClaude` | Claude Code 当前活跃提供商 ID |
| `activeKimi` | Kimi CLI 当前活跃提供商 ID |
| `baseUrl` | OpenAI 兼容 API 地址（Codex 用） |
| `apiKey` | API 密钥 |
| `models` | 模型列表（Codex 用） |
| `anthropicUrl` | Anthropic 兼容 API 地址（Claude 用） |
| `claudeModel` | Claude 模型名称 |
| `codexYolo` | Codex YOLO 模式 |
| `claudeBypass` | Claude Bypass Permissions |
| `kimiBaseUrl` | Kimi 自定义 API 地址 |
| `kimiApiKey` | Kimi 自定义 API 密钥 |
| `kimiModel` | Kimi 模型名称 |
| `kimiYolo` | Kimi YOLO 模式 |
| `kimiOAuth` | 使用 Kimi OAuth 认证 |

## 技术栈

- **后端**: Node.js + Express
- **前端**: React + Vite + Recharts
- **认证**: JWT
- **存储**: JSON 文件

## 工作原理

```
Codex CLI → localhost:11434 → 协议转换 → 目标 API
                ↓
        Responses API  →  Chat Completions API
```

代理服务器监听 `11434` 端口，模拟 Ollama 服务，将 Codex CLI 的 Responses API 请求转换为目标提供商的 Chat Completions API 请求。

## 支持的提供商

任何提供 OpenAI 兼容 API 的服务均可使用，例如：

- 小米 MiMo
- DeepSeek
- OpenRouter
- Together AI
- Groq
- 本地模型（Ollama、LM Studio 等）
- Kimi Code（OAuth 认证）

## License

MIT
