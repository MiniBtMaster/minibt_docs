# MiniBT 量化交易知识库

欢迎使用 **MiniBT 量化交易知识库**！这里汇集了 MiniBT 量化交易的基础教程、策略开发指南及 TradingView 指标说明，助力你更简单、高效地开展量化交易策略开发。

## 相关资源

- <i class="fa-brands fa-zhihu"></i> [知乎专栏](https://zhuanlan.zhihu.com/column/c_1942555756558783128)
<!-- - <i class="fa-solid fa-globe"></i> [minibt官网](https://www.minibt.cn) -->
- <i class="fa-brands fa-github"></i> [GitHub仓库](https://github.com/MiniBtMaster/minibt)
- <i class="fa-brands fa-python"></i> [PyPI仓库](https://pypi.org/project/minibt/)

## 核心内容导航

### 一、MiniBT量化交易基本使用
本系列从**入门到进阶**，覆盖 MiniBT 基础概念、安装部署、数据类型与核心类使用等必备知识：

- [1.1 MiniBT 简介：让量化交易更简单、高效的一站式策略开发库](minibt_basic/1.1minibt_intro.md)
- [1.2 MiniBT 安装教程](minibt_basic/1.2minibt_install.md)
- [1.3 MiniBT 入门实战：5分钟跑通双均线策略](minibt_basic/1.3minibt_double_moving_average_strategy.md)
- [1.4 MiniBT 极速启动策略](minibt_basic/1.4minibt_fast_start_strategy.md)
- [1.5 MiniBT 量化交易：策略参数优化教程](minibt_basic/1.5minibt_strategy_param_optimization.md)
- [1.6 MiniBT 量化交易：策略获取数据使用指南](minibt_basic/1.6minibt_strategy_data_retrieval.md)
- [1.7 MiniBT 量化交易：Bt类介绍](minibt_basic/1.7minibt_bt_class_intro.md)
- [1.8 MiniBT 量化交易：策略类(Strategy)完整指南](minibt_basic/1.8minibt_strategy_class_guide.md)
- [1.9 MiniBT 量化交易：指标基类(IndicatorsBase)完整指南](minibt_basic/1.9minibt_indicatorsbase_class_guide.md)
- [1.10 MiniBT 量化交易：内部数据 IndFrame 类完整指南](minibt_basic/1.10minibt_internal_data_dataframe_guide.md)
- [1.11 MiniBT 量化交易：内部数据 KLine 类完整指南](minibt_basic/1.11minibt_internal_data_btdata_guide.md)
- [1.12 MiniBT 量化交易：内部数据 IndSeries 类完整指南](minibt_basic/1.12minibt_internal_data_series_guide.md)
- [1.13 MiniBT 量化交易：内部数据 Line 类完整指南](minibt_basic/1.13minibt_internal_data_line_guide.md)
- [1.14 MiniBT 量化交易：指标构造器 BtIndicator 类完整指南](minibt_basic/1.14minibt_btindicator_class_guide.md)
- [1.15 MiniBT 量化交易：K线回放](minibt_basic/1.15minibt_kline_replay.md)
- [1.16 MiniBT 量化交易：天勤实时图表功能](minibt_basic/1.16minibt_live_trading_plot.md)
- [1.17 MiniBT 量化交易：实盘多策略合约系统介绍](minibt_basic/1.17minibt_multi_strategy_live_trading_system.md)
- [1.18 MiniBT 量化交易：交易日志系统使用简介](minibt_basic/1.18minibt_transaction_log.md)
- [1.19 MiniBT 量化交易：btplot 函数功能说明](minibt_basic/1.19minibt_interactive_financial_charting_with_btplot.md)
- [1.20 MiniBT 量化交易：订单系统介绍](minibt_basic/1.20minibt_order_system.md)
- [1.21 MiniBT 量化交易：实时图表系统Lightweight Charts介绍](minibt_basic/1.21minibt_lightweight_charts.md)

### 二、MiniBT量化交易策略
本系列聚焦 **MiniBT 量化交易策略实战**，包含各类经典/创新策略的开发与应用：

- [2.1 Aberration（布林线突破）策略](minibt_strategies/2.1_aberration_breakout_strategy.md)
- [2.2 三重指数平滑平均线 (TRIX) 趋势策略](minibt_strategies/2.2_trix_strategy.md)
- [2.3 CMO策略](minibt_strategies/2.3_cmo_strategy.md)
- [2.4 涡旋指标策略](minibt_strategies/2.4_vortex-indicator-strategy.md)
- [2.5 Hull移动平均线策略](minibt_strategies/2.5_hull-strategy.md)
- [2.6 Keltner Channel策略](minibt_strategies/2.6_keltner_channel_strategy.md)
- [2.7 Qstick趋势策略](minibt_strategies/2.7_qstick_strategy.md)
- [2.8 Aroon指标趋势交易策略](minibt_strategies/2.8_aroon_strategy.md)
- [2.9 量价趋势策略（VPT）](minibt_strategies/2.9_vpt_strategy.md)
- [2.10 自动扶梯策略](minibt_strategies/2.10_escalator_strategy.md)
- [2.11 Dual Thrust策略](minibt_strategies/2.11_dual_thrust_strategy.md)
- [2.12 卡尔曼滤波配对交易策略](minibt_strategies/2.12_kalman_filter-strategy.md)
- [2.13 基于距离的配对交易策略](minibt_strategies/2.13_distance_based_strategy.md)
- [2.14 CCI均值回归策略](minibt_strategies/2.14_cci_strategy.md)
- [2.15 RSI超买/超卖交易策略](minibt_strategies/2.15_rsi_strategy.md)
- [2.16 Z-Score均值回归策略](minibt_strategies/2.16_zscore_strategy.md)
- [2.17 复合均值回归策略](minibt_strategies/2.17_mean_reversion_strategy.md)
- [2.18 随机森林预测策略](minibt_strategies/2.18_random_forest_strategy.md)

### 三、MiniBT量化交易之TradingView指标
本系列结合 **TradingView 指标工具**，助力策略信号生成与趋势判断：

- [3.1 MiniBT 量化交易之 TradingView 指标：Powertrend Volume Range Filter](minibt_tradingview_indicators/3.1_powertrend_volume_range_filter.md)
- [3.2 MiniBT 量化交易之 TradingView 指标：G Channels](minibt_tradingview_indicators/3.2_g_channels.md)
- [3.3 MiniBT 量化交易之 TradingView 指标：STD-Filtered N-Pole Gaussian Filter](minibt_tradingview_indicators/3.3_std_filtered_n_pole_gaussian_filter.md)
- [3.4 MiniBT 量化交易之 TradingView 指标：Adaptive Trend Filter](minibt_tradingview_indicators/3.4_adaptive_trend_filter.md)
- [3.5 MiniBT 量化交易之 TradingView 指标：Multi-Step Vegas SuperTrend](minibt_tradingview_indicators/3.5_multi_step_vegas_supertrend.md)
- [3.6 MiniBT 量化交易之 TradingView 指标：The Flash Strategy](minibt_tradingview_indicators/3.6_the_flash_strategy.md)
- [3.7 MiniBT 量化交易之 TradingView 指标：Multi-Step Vegas SuperTrend Strategy](minibt_tradingview_indicators/3.7_multi_step_vegas_superTrend_strategy.md)
- [3.8 MiniBT 量化交易之 TradingView 指标：LOWESS Locally Weighted Scatterplot Smoothing](minibt_tradingview_indicators/3.8_lowess_locally_weighted_scatterplot_smoothing.md)
- [3.9 MiniBT 量化交易之 TradingView 指标：John Ehlers The Price Radio](minibt_tradingview_indicators/3.9_john_ehlers_the_price_radio.md)
- [3.10 MiniBT 量化交易之 TradingView 指标：PMax Explorer](minibt_tradingview_indicators/3.10_pmax_explorer.md)
- [3.11 MiniBT 量化交易之 TradingView 指标：RJ Trend Engine Final Version](minibt_tradingview_indicators/3.11_rj_trend_engine_final_version.md)
- [3.12 MiniBT 量化交易之 TradingView 指标：Twin Range Filter Buy Sell Signals](minibt_tradingview_indicators/3.12_twin_kange_filter.md)
- [3.13 MiniBT 量化交易之 TradingView 指标：UT Bot Alerts](minibt_tradingview_indicators/3.13_ut_bot_alerts.md)
- [3.14 MiniBT 量化交易之 TradingView 指标：SuperTrend](minibt_tradingview_indicators/3.14_supertrend.md)
- [3.15 MiniBT 量化交易之 TradingView 指标：WaveTrend Oscillator](minibt_tradingview_indicators/3.15_wavetrend_oscillator.md)
- [3.16 MiniBT 量化交易之 TradingView 指标：Pivot Point Supertrend](minibt_tradingview_indicators/3.16_pivot_point_supertrend.md)
- [3.17 MiniBT 量化交易之 TradingView 指标：AlphaTrend](minibt_tradingview_indicators/3.17_alphatrend.md)
- [3.18 MiniBT 量化交易之 TradingView 指标：Chandelier Exit](minibt_tradingview_indicators/3.18_chandelier_exit.md)
- [3.19 MiniBT 量化交易之 TradingView 指标：SuperTrend Strategy](minibt_tradingview_indicators/3.19_supertrend_strategy.md)
- [3.20 MiniBT 量化交易之 TradingView 指标：Optimized Trend Tracker](minibt_tradingview_indicators/3.20_optimized_trend_tracker.md)
- [3.21 MiniBT 量化交易之 TradingView 指标：Turtle Trade Channels Indicator](minibt_tradingview_indicators/3.21_turtle_trade_channels_indicator.md)

### 四、MiniBT量化交易之强化学习
本系列深入探索 **MiniBT 强化学习功能**，涵盖AI交易策略开发、参数调优与算法选择：

- [4.1 MiniBT 量化交易：强化学习在量化交易中的应用](minibt_reinforcement_learning/4.1reinforcement_learning_for_quantitative_trading_with_minibt.md)
- [4.2 MiniBT 量化交易：强化学习参数调优完整指南](minibt_reinforcement_learning/4.2the_complete_parameter_tuning_guide.md)
- [4.3 MiniBT 量化交易：强化学习算法选择指南](minibt_reinforcement_learning/4.3algorithm_selection_for_trading_strategies.md)
- [4.4 MiniBT 量化交易：代码解析与验证集优异表现分析](minibt_reinforcement_learning/4.4code_analysis_and_validation_outperformance.md)
- [4.5 MiniBT 量化交易：AgentDDPG算法在minibt中的应用](minibt_reinforcement_learning/4.5DDPG_training_validation_analysis.md)
- [4.6 MiniBT 量化交易：AgentDoubleDQN算法在minibt框架中的实现与性能分析](minibt_reinforcement_learning/4.6DoubleDQN_strategy_validation.md)

### 五、使用技巧
掌握 **MiniBT 高效使用技巧**，提升开发效率与策略性能：

- [5.1 IndFrame 指标数据解包](minibt_tips/5.1_effortless_dataframe_indicator_unpacking.md)
- [5.2 lines 赋值 vs 返回数据 两种方法使用技巧](minibt_tips/5.2_lines_assignment_vs_return_data.md)
- [5.3 内置指标 rolling_apply 函数完整用法详解](minibt_tips/5.3_rolling_apply_func.md)
- [5.4 next 函数中获取最新数据](minibt_tips/5.4_get_latest_data_in_next.md)
  
### 六、API参考
MiniBT 核心技术指标库 **API 参考**，提供完整的函数说明与使用示例

- [PandasTa](minibt_api_reference/pandasta.md)
- [TaLib](minibt_api_reference/talib.md)
- [TqFunc](minibt_api_reference/tqfunc.md)
- [TqTa](minibt_api_reference/tqta.md)
- [TradingView](minibt_api_reference/tradingview.md)
