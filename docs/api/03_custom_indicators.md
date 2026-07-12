# 自定义指标

## BtIndicator

**继承**: `CustomBase` → `KLine`

## 自定义指标创建基类（继承 CustomBase 与 KLine）

    ### 核心定位
    - 提供标准化接口快速构建自定义技术指标，自动集成框架数据结构与绘图系统，
    - 支持将用户定义的计算逻辑转换为框架兼容的指标数据（IndSeries/IndFrame）

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.14minibt_btindicator_class_guide/

    ### 核心特性：
    1. 简化指标开发流程：
       - 通过重写 `next` 方法定义指标计算逻辑，无需关注数据格式转换与框架集成细节
       - 自动解析指标输出列名（`lines`），支持手动指定或从 `next` 方法返回值自动提取
    2. 完整的指标配置能力：
       - 继承 `CustomBase` 的绘图配置属性（`overlap` 重叠显示、`isplot` 绘图开关、`category` 指标分类等）
       - 支持自定义线型（`linestyle`）、信号样式（`signalstyle`）、绘图高度（`height`）等可视化参数
    3. 框架无缝集成：
       - 生成的指标自动兼容 `KLine`/`IndFrame` 数据结构，可直接用于策略逻辑或进一步计算
       - 通过 `@tobtind` 装饰器自动处理指标元数据（如指标ID、绘图信息），无需手动维护
    4. 参数化与灵活性：
       - 支持通过 `params` 属性定义指标参数，实现同一指标的多参数版本
       - 支持批量注册自定义方法到 `KLine` 类，扩展基础数据结构的指标计算能力

    ### 初始化参数说明：
    Args:
        data (IndFrame | pd.DataFrame): 输入数据，需为框架内置 `IndFrame` 或 pandas 的 `pd.DataFrame`
                                        （含计算所需基础字段如 open/close 等）
        **kwargs (IndSetting | dict): 指标配置参数，支持以下核心配置：
            - lines (list[str] | Lines): 指标输出列名列表（如 ["ma5", "ma10"]，
                                         未指定时自动从 `next` 方法返回值提取）
            - overlap (bool): 是否与主图重叠显示（默认继承 `CustomBase` 的 `overlap=False`）
            - isplot (bool): 是否绘图（默认 True）
            - ismain (bool): 是否为主图指标（默认 False）
            - category (str): 指标分类（如 "overlap" 归为重叠指标，默认 None）
            - linestyle (Addict[str, LineStyle] | dict[str, LineStyle]): 指标线样式配置
                - 覆盖规则：若键与 `lines` 中的列名匹配，优先使用该配置；未匹配项使用框架默认
            - signalstyle (Addict[str, SignalStyle] | dict[str, SignalStyle]): 交易信号线样式配置
                - 仅对 `lines` 中标记为信号的列（如 "long_signal"）生效
            - spanstyle (SpanList[SpanStyle] | list[SpanStyle]): 区间填充样式配置
                - 要求：`SpanStyle` 实例的 `start_line`/`end_line` 必须在 `lines` 中定义
            - _multi_index: 多索引标识（内部使用，用户一般无需设置）
            - 其他参数：会被合并到 `params` 属性，可在 `next` 方法中通过 `self.params` 访问

    ### ⚠️ 重要注意事项：
    1. **方法命名冲突风险**：
        - BtIndicator 类会在内部将自定义指标类的方法注入到传入的内置指标对象中
        - 如果自定义方法名与内置指标方法（如 `ma`, `atr`, `sma`, `ema` 等）相同，会导致覆盖
        - 覆盖后可能影响系统内其他使用相同内置指标的代码逻辑
        - **建议**：在自定义指标中使用独特的前缀或命名约定，避免与内置方法同名

    2. **注入机制说明**：
        - 自定义指标类中的方法（除 `next` 外）会被动态添加到输入数据对象的类中
        - 这种设计允许在 `next` 方法中方便地调用自定义方法
        - 但如果方法名冲突，会覆盖原有方法，可能导致不可预期的行为

    ### 关键方法说明：
    >>> next(self: KLine) -> IndFrame | IndSeries | pd.Series | pd.DataFrame | np.ndarray | tuple:
        - 核心方法，需用户重写，定义指标计算逻辑
        - 参数 `self`：通常为 `KLine` 实例，可直接访问其字段（如 `self.close` 获取收盘价序列）
        - 返回值：支持多种数据类型，框架会自动转换为 `IndSeries`（单列）或 `IndFrame`（多列）
        - 示例：返回 `self.close.rolling(5).mean()` 实现5期均线

    ### 使用示例：
    >>> # 1. 定义简单移动平均线指标
    >>> class MyMA(BtIndicator):
    ...     # 手动指定输出列名（也可省略，框架自动提取）
    ...     lines = ["ma5", "ma10"]
    ...     # 指标参数（可在初始化时通过 kwargs 覆盖）
    ...     params = {"length5": 5, "length10": 10}
    ...
    ...     # 注意：自定义方法命名避免与内置方法冲突
    ...     def _custom_calc_ma(self, data, length):
    ...         return data.rolling(length).mean()
    ...
    ...     def next(self):
    ...         # self 为 KLine 实例，可访问收盘价
    ...         ma5 = self._custom_calc_ma(self.close, self.params.length5)
    ...         ma10 = self._custom_calc_ma(self.close, self.params.length10)
    ...         return ma5, ma10  # 返回多列数据，对应 lines 定义
    ...
    >>> # 2. 使用自定义指标
    >>> # 假设 kline 为 KLine 实例（含 close 字段）
    >>> ma_indicator = MyMA(kline, isplot=True, category="overlap")
    >>> # 3. 访问指标结果（已自动转换为 IndFrame）
    >>> print(ma_indicator.ma5)  # 输出5期均线序列（Line类型）
    >>> print(ma_indicator.ma10) # 输出10期均线序列（Line类型）
    >>> # 4. 指标自动支持绘图，配置已通过类属性和初始化参数设置

    ### 命名建议：
    - 自定义方法使用下划线前缀（如 `_calc_...`）
    - 使用指标名称作为前缀（如 `myindicator_...`）
    - 避免使用内置指标常见的方法名（ma, atr, sma, ema, rsi, macd, etc.）
    - 保持方法名清晰描述其功能

---

## IndicatorClass

## 第三方指标库集成

---

## CoreIndicators

## 核心指标计算类

    该类作为技术指标计算的统一入口，提供对多种技术分析库的便捷访问。
    通过不同的方法前缀，可以调用来自不同技术分析库的指标计算方法。

    ## 支持的指标库前缀：
    - `pta_` : PandasTA 指标 - 基于pandas的高性能技术分析库
    - `btind_` : BtInd 指标 - 回测专用指标库
    - `ti_` : TuLip 指标 - 传统技术分析指标库
    - `talib_` : TA-Lib 指标 - 行业标准技术分析库（C语言实现，速度快）
    - `finta_` : FinTA 指标 - 金融技术分析库
    - `tqfunc_` : TqFunc 指标 - 天勤量化函数库
    - `tqta_` : TqTa 指标 - 天勤技术分析库
    - `pair_` : Pair 指标 - 配对交易专用指标
    - `factor_` : Factors 指标 - 多因子模型指标

    ## 核心特点：
    1. **统一接口**：通过单一对象访问多个技术分析库
    2. **数据一致性**：自动处理数据格式转换和预处理
    3. **性能优化**：底层使用高效计算库（如TA-Lib）
    4. **类型安全**：返回标准的IndSeries/IndFrame对象

    ## 使用方式：
    方式1：通过CoreIndicators类直接访问
    ```python
    ci = CoreIndicators(data)  # data可以是IndSeries/IndFrame/pd.Series/pd.DataFrame
    indicators = ci.indicators  # 获取指标计算器
    sma = indicators.pta_sma(20)  # 计算20日简单移动平均
    rsi = indicators.talib_rsi(14)  # 计算14日RSI
    ```

    方式2：通过内置属性访问（推荐）
    ```python
    # 假设kline是一个包含价格数据的IndFrame
    ma = kline.close.core_indicators.pta_sma(30)  # 直接访问
    ```

### 方法

#### `def __init__(self, data)`

#### `def indicators(self) -> CoreFunc` *(property)*

## 指标计算器访问属性

        返回CoreFunc对象，提供对所有技术指标计算方法的访问。

        Returns
        -------
        CoreFunc
            核心函数计算器，包含所有前缀的指标方法

        Examples
        --------
        ```python
        # 获取指标计算器
        ci = CoreIndicators(close_prices)
        calc = ci.indicators

        # 计算不同库的指标
        # PandasTA库的SMA
        sma_pd = calc.pta_sma(20)

        # TA-Lib库的RSI
        rsi_talib = calc.talib_rsi(14)

        # TuLip库的布林带
        bb_ti = calc.ti_bbands(20, 2)

        # 多因子模型的合并因子
        merged_factor = calc.factor_optimizer(factor1, factor2, factor3)
        ```


---

## BtInd

## 自定义指标指引
    - 自定义指标类，用于封装项目中自定义的基础指标计算逻辑，提供框架兼容的指标访问接口

    ### 核心功能：
    - 基于输入的基础数据（IndSeries/IndFrame）提供自定义指标的计算与访问
    - 通过 @tobtind 装饰器将原生数据转换为框架内置的指标数据类型（IndSeries/IndFrame）
    - 支持基础行情数据（开盘价、最高价、最低价等）的直接访问与指标化处理

    ### 使用说明：
    - 1. 初始化：传入框架支持的基础数据对象（需包含对应的原始字段）
       >>> ind = self.data.btind.alerts()

### overlap

| 方法 | 签名 | 说明 |
|------|------|------|
| `zigzag` | `zigzag(self, up_thresh: float=0.0, down_thresh: float=0.0, multiplier: float=1.0, **kwargs) -> IndSeries` | ZigZag指标 - 包含NaN数据版本 |
| `zigzag_full` | `zigzag_full(self, up_thresh: float=0.0, down_thresh: float=0.0, multiplier: float=1.0, **kwargs) -> IndSeries` | ZigZag指标 - 无NaN数据版本 |

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `smoothrng` | `smoothrng(self, length: int=14, mult: float=1.0, **kwargs) -> IndSeries` | 平滑平均范围指标 (Smoothed Average Range) |
| `rngfilt` | `rngfilt(self, r: pd.Series=None, **kwargs) -> IndFrame` | 范围过滤指标 (Range Filter) |
| `alerts` | `alerts(self, length: int=14, mult: float=2.0, **kwargs) -> IndFrame` | 警报指标系统 (Alerts Indicator System) |
| `noises_density` | `noises_density(self, length: int=10, **kwargs) -> IndSeries` | 价格噪音密度函数 (Price Noise Density Function) |
| `noises_er` | `noises_er(self, length: int=10, **kwargs) -> IndSeries` | 效率比率指标 (Efficiency Ratio) |
| `noises_fd` | `noises_fd(self, length: int=10, **kwargs) -> IndSeries` | 分形维度指标 (Fractal Dimension) |
| `kama` | `kama(self, length=None, fast=None, slow=None, drift=None, offset=0, **kwargs) -> IndFrame | IndSeries` | 考夫曼自适应移动平均 (Kaufman Adaptive Moving Average, KAMA) |
| `mama` | `mama(self, fastlimit: float=0.6185, slowlimit: float=0.06185, **kwargs) -> IndFrame` | MESA自适应移动平均 (MESA Adaptive Moving Average, MAMA) |
| `pmax` | `pmax(self, length: int=14, mult: float=3.0, mode: MaModeType='hma', dev: DevType='stdev', **kwargs) -> IndFrame` | PMax指标 (Price Max) - 第一个版本 |
| `pmax2` | `pmax2(self, length: int=14, mult: float=3.0, mode: MaModeType='hma', dev: DevType='stdev', **kwargs) -> IndFrame` | PMax指标 (Price Max) - 第二个版本 |
| `pmax3` | `pmax3(self, length: int=14, mult: float=3.0, mode: MaModeType='hma', dev: DevType='stdev', **kwargs) -> IndFrame` | PMax指标 (Price Max) - 第三个版本 |
| `pv` | `pv(self, length=10, **kwargs) -> IndSeries` | 价格波动率指标 (Price Volatility) |
| `realized` | `realized(self, length: int=10, **kwargs) -> IndSeries` | 已实现波动率指标 (Realized Volatility) |
| `rsrs` | `rsrs(self, length: int=10, method: RSRSMethodType='r1', weights=True, **kwargs) -> IndFrame` | RSRS阻力支撑相对强度指标 (Resistance Support Relative Strength) |
| `savitzky_golay` | `savitzky_golay(self, window_length: Any=10, polyorder: Any=2, deriv: int=0, delta: float=1, axis: int=-1, mode: str='interp', cval: float=0, **kwargs) -> IndSeries` | Savitzky-Golay滤波平滑器 |
| `supertrend` | `supertrend(self, length=14, multiplier=2.0, weights=2.0, **Kwargs) -> IndFrame` | 超级趋势指标 (SuperTrend) |
| `zigzag_modes` | `zigzag_modes(self, up_thresh: float=0.0, down_thresh: float=0.0, multiplier: float=1.0, **kwargs) -> IndSeries` | ZigZag趋势模式指标 (ZigZag Trend Modes) |
| `zigzag_returns` | `zigzag_returns(self, up_thresh: float=0.0, down_thresh: float=0.0, multiplier: float=1.0, limit: bool=True, **kwargs) -> IndSeries` | ZigZag分段收益率指标 (ZigZag Segment Returns) |
| `AndeanOsc` | `AndeanOsc(self, length: int=14, signal_length: int=9, **kwargs) -> IndFrame` | 安第斯振荡器指标 (Andean Oscillator) |
| `Coral_Trend_Candles` | `Coral_Trend_Candles(self, smooth: int=9.0, mult: float=0.4, **kwargs) -> IndSeries` | 珊瑚趋势蜡烛指标 (Coral Trend Candles) |
| `signal_returns_stats` | `signal_returns_stats(self, close=None, n: int=1, **kwargs) -> IndFrame` | 信号收益率统计指标 (Signal Returns Statistics) |
| `calculate_trend_probabilities` | `calculate_trend_probabilities(self, window_length=60, up_threshold=0.001, down_threshold=-0.001, **kwargs)` | 趋势概率计算指标 (Trend Probability Calculator) |
| `gap_ratio` | `gap_ratio(self, length=20, **kwargs) -> IndFrame` | 通道差异系数指标 (Gap Ratio) |
| `vwap_window` | `vwap_window(self, window=20, offset=None, **kwargs)` | 滚动窗口VWAP指标 (Rolling Window VWAP) |
| `vwap_volume_based` | `vwap_volume_based(self, volume_quantile=0.25, lookback=100, offset=None, **kwargs)` | 成交量分位数VWAP指标 (Volume Quantile VWAP) |
| `gaussian_smoothed` | `gaussian_smoothed(self, window: int=11, **kwargs) -> IndSeries` | 高斯核卷积平滑 (Gaussian Smoothed) |
---
