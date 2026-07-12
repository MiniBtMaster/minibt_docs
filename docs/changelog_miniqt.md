# MiniQT 更新日志

所有对 MiniQT 可视化界面的显著更改都将被记录在此文件中。

格式基于 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/)，
并且本项目遵循 [语义化版本](https://semver.org/lang/zh-CN/)。

## [v1.0.0] - 2026-07-09

### 🎉 首次发布

MiniQT 是基于 PyQt6 和 minibt 的量化交易可视化客户端，提供实时行情查看、K线图表分析、策略回测等功能。

### ✨ 新增功能

#### 核心模块

- **行情报价模块**：实时显示期货/股票行情数据，支持合约搜索和快速切换
- **看盘模块**：多图表并列显示，支持周期切换、指标叠加、画线工具
- **策略回测模块**：集成 minibt 回测引擎，支持代码编辑、参数优化、结果展示
- **开发工具**：提供 Python 终端、数据库管理、合约查询等实用工具

#### 数据源支持

- **期货数据**：通过 TqSdk (天勤量化) 获取实时期货数据
- **股票数据**：通过 MooTDX (通达信 TCP) 获取实时股票数据，避免 HTTP 爬虫的 IP 封禁问题
- **数据切换**：支持期货/股票数据源无缝切换，保持界面一致性

#### 图表功能

- **K线图表**：基于 TradingView Lightweight Charts，支持专业级金融可视化
- **周期切换**：支持 30秒/1分/5分/15分/30分/1时/日线/周线/月线/季线/年线
- **股票周期支持**：股票图表支持周线、月线、季线、年线，期货支持自定义秒级周期
- **指标叠加**：实时添加/移除技术指标，支持多种指标类型
- **画线工具**：支持趋势线、水平线、平行通道等多种画线工具
- **主题切换**：支持深色/浅色主题，图表样式自动适配

#### 数据管理

- **合约数据库**：使用 DuckDB 存储合约信息，支持快速查询和搜索
- **全量填充**：首次登录自动填充所有合约数据，后续增量更新
- **智能判断**：自动检测全新数据库，避免重复填充

#### 用户界面

- **Fluent Design**：采用 QFluentWidgets 组件库，现代化界面风格
- **多窗口布局**：支持 QSplitter 自由调整布局，可折叠/展开
- **键盘精灵**：空格键快速调用合约搜索，无需鼠标操作
- **状态栏提示**：实时显示登录状态、连接信息、错误提示

### 🔧 技术特性

#### 股票 API (StockApi)

- **MooTDX TCP 协议**：使用 TCP 协议获取股票数据，延迟 50-150ms，稳定性高
- **TqApi 接口风格**：`get_kline_serial`、`wait_update`、`is_changing` 接口与期货 API 保持一致
- **快照对比机制**：使用 `_last_bar_snapshot` 进行变化检测，简化更新逻辑
- **时区处理**：MooTDX 返回北京时间，自动转换为 UTC 与当前时间比较

#### 期货 API (TqApiQTimer)

- **异步更新**：使用 qasync 事件循环，支持协程环境下的实时数据更新
- **定时刷新**：K线、指标、账户信息独立定时器，频率可配置
- **变化检测**：`is_changing` 检测 K线/指标变化，避免重复渲染

#### 数据库管理

- **DuckDB 嵌入式数据库**：高性能列式存储，支持 SQL 查询
- **自动初始化**：首次启动自动创建表结构，检查数据完整性
- **智能填充**：检测全新数据库自动触发全量填充，已填充数据库跳过

### 📚 文档

- [6.1 MiniQT 介绍](minibt_miniqt/6.1_miniqt_intro.md)
- [6.2 主界面介绍](minibt_miniqt/6.2_main_window.md)
- [6.3 行情报价模块](minibt_miniqt/6.3_market_quote.md)
- [6.4 策略回测模块](minibt_miniqt/6.4_backtest.md)
- [6.5 开发工具](minibt_miniqt/6.5_dev_tools.md)
- [6.6 K线图表使用详解](minibt_miniqt/6.6_kline_chart.md)
- [6.7 期货与股票数据切换](minibt_miniqt/6.7_data_comparison.md)
- [6.8 K线更新逻辑详解](minibt_miniqt/6.8_kline_update_logic.md)

### 🔗 相关链接

- [GitHub - miniqt](https://github.com/MiniBtMaster/minibt/tree/main/miniqt)
- [TqSdk 天勤量化](https://www.shinnytech.com/tqsdk/)
- [MooTDX 通达信](https://github.com/mootdx/mootdx)
- [TradingView Lightweight Charts](https://www.tradingview.com/lightweight-charts/)