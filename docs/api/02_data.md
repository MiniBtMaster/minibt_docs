# 数据层

## KLine

**继承**: `IndFrame`

## 框架内置K线数据核心类（继承 IndFrame 类）
    - 核心定位：封装标准化K线数据（OHLCV等），整合合约信息、交易执行、风险控制、周期转换等量化交易全流程能力，是回测与实盘的核心数据载体

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.11minibt_internal_data_btdata_guide/

    ### 核心特性：
    1. K线数据标准化：
    - 强制要求输入数据包含 `FILED.ALL` 定义的所有核心字段（datetime/open/high/low/close/volume/symbol等）
    - 自动补充合约基础信息（最小变动单位 `price_tick`、合约乘数 `volume_multiple` 等），实盘模式自动从TqApi获取，回测模式用默认配置
    2. 多模式兼容：
    - 回测模式：关联 `Broker` 类管理虚拟账户、持仓、手续费、保证金等
    - 实盘模式：对接天勤TqApi，自动关联 `TqObjs`（合约报价、持仓、目标仓位任务）
    3. 交易能力原生集成：
    - 直接提供开仓（`buy`/`sell`）、目标仓位设置（`set_target_size`）等交易接口
    - 内置手续费（固定/百分比/按tick）、滑点（`slip_point`）、保证金率（`margin_rate`）配置
    4. 风险控制工具：
    - 支持止损止盈（`_set_stop` 绑定 `Stop` 停止器），自动生成止损止盈线（`stop_lines`）
    - 实时计算持仓浮动盈亏（`float_profit`）、持仓成本（`cost_price`）、保证金（`margin`）等风险指标
    5. 数据增强与转换：
    - 支持K线周期转换（`resample` 重采样、`replay` 回放），回测模式下可自定义周期规则
    - 内置特殊K线生成（Heikin-Ashi布林带K线、Linear Regression线性回归K线）
    6. 因子分析支持：
    - 提供 `factors_analyzer` 方法，支持多因子（如技术指标）的标准化、去极值处理，以及与收益率的关联分析
    7. 可视化配置：
    - 继承 `IndFrame` 的绘图配置能力，自动适配蜡烛图样式（涨跌颜色 `bull_color`/`bear_color`）
    - 实盘/回测模式下自动同步K线绘图数据，无需额外配置

    ### 初始化参数说明：
    Args:
        data (pd.DataFrame): 输入K线数据，必须满足：
                            - 类型为 pd.DataFrame
                            - 列名包含 `FILED.ALL` 定义的所有核心字段（如 datetime、open、high、low、close、volume、symbol、duration 等）
        **kwargs: 额外配置参数（核心参数如下）：
                - follow (bool): 是否跟随主图显示（默认 True，蜡烛图类指标生效）
                - plot_index (list[int]): 绘图时的索引范围（默认 None，显示全部数据）
                - kline_object/source_object/conversion_object: 数据副本分类（分别存储原始K线、源数据、转换后数据，默认自动生成）
                - tq_object: 实盘模式下的TqApi数据对象（默认 None，自动关联）
                - isindicator (bool): 是否标记为指标（固定为 False，因 KLine 是K线数据而非指标）

    ### 核心属性说明：
    1. 基础K线数据（自动从输入数据封装为 `IndSeries` 类型）：
    - datetime: 时间序列（格式统一为 "%Y-%m-%d %H:%M:%S"）
    - open/high/low/close: 开盘价/最高价/最低价/收盘价序列
    - volume: 成交量序列
    2. 合约信息（`symbol_info` 为 `SymbolInfo` 实例）：
    - symbol: 合约名称（如 "SHFE.rb2410"）
    - cycle: K线周期（单位：秒，如 60 表示1分钟线）
    - price_tick: 最小变动单位（如 0.01 元/吨）
    - volume_multiple: 合约乘数（每手对应标的物数量，如 10 吨/手）
    3. 交易与风险相关：
    - account: 关联的账户对象（回测为 `BtAccount`，实盘为 `TqAccount`）
    - broker: 回测模式下的交易代理（`Broker` 实例，管理订单、持仓、手续费）
    - position: 持仓对象（回测为 `BtPosition`，实盘为 `TqPosition`）
    - stop: 止损止盈停止器（`Stop` 实例，需通过 `_set_stop` 绑定）
    - stop_lines: 止损止盈线数据（`IndFrame` 类型，含 stop_price/target_price 列）
    4. 实盘专属属性：
    - quote: 实盘实时报价（`Quote` 实例，含最新价格、买一卖一等）
    - TargetPosTask: 实盘目标仓位任务（需传入仓位大小，返回 TqApi 的 TargetPosTask 实例）
    5. 状态与配置：
    - current_close/current_datetime: 当前周期的收盘价/时间（随回测/实盘进度动态更新）
    - Heikin_Ashi_Candles/Linear_Regression_Candles: 是否启用特殊K线（布尔值，赋值后自动生成对应K线）

    ### 核心方法说明：
    1. 交易执行：
    - buy(size=1, stop=None, **kwargs): 多头开仓（size为手数，stop为绑定的止损器）
    - sell(size=1, stop=None, **kwargs): 空头开仓/多头平仓（逻辑由策略实例统一管理）
    - set_target_size(size=0, stop=None): 设置目标仓位（0 表示平仓，正数为多仓，负数为空仓）
    2. 数据转换：
    - resample(cycle, rule=None, **kwargs): K线周期重采样（如1分钟线转5分钟线，回测模式生效）
    - replay(cycle, rule=None, **kwargs): K线周期回放（模拟实时数据推送，回测模式生效）
    3. 因子分析：
    - factors_analyzer(*factors, periods=[1,3,5,10], n_groups=5, **kwargs): 多因子分析（支持去极值、标准化，输出因子与收益率关联数据）
    4. 快速启动：
    - run(*args, **kwargs): 快速创建策略并启动回测（传入指标配置、交易逻辑 `next` 函数，返回 `Bt` 实例）

    ### 使用示例：
    >>> #1. 回测模式：从本地数据初始化K线
    >>> self.data = self.get_kline(LocalDatas.test)

    >>> #2. 配置手续费与保证金
    >>> kline.fixed_commission = 1.5  # 每手固定手续费1.5元
    >>> kline.margin_rate = 0.08      # 保证金率8%

    >>> #3. 绑定止损器（假设Stop为自定义停止器类）
    >>> self.data.buy(stop=BBtStop.TimeSegmentationTracking)

    >>> # 4. 实盘模式：通过TqApi关联合约（需先初始化TqApi）
    >>> self.data.set_target_size(2)  # 实盘设置目标多仓2手

    >>> # 5. 快速启动回测
    >>> def next(strategy):
    ...     # 简单均线交叉策略：5日线穿10日线开多
    ...     if strategy.ma5.new > strategy.ma10.new and strategy.ma5.prev < strategy.ma10.prev:
    ...         strategy.kline.buy(size=1)
    >>> # 初始化并启动
    >>> bt = kline.run(
    ...     ["ma5", Multiply(PandasTa.sma, dict(length=5))],
    ...     ["ma10", Multiply(PandasTa.sma, dict(length=10))],
    ...     next=next
    ... )

### 方法

#### `def __init__(self, data: pd.DataFrame | dict, **kwargs) -> None`

#### `def broker(self) -> Broker | None` *(property)*

### 代理

#### `def orders(self) -> Orders | list[Order] | None` *(property)*

### 订单

#### `def factors_analyzer(self, *factors: BtIndType, periods=[1, 3, 5, 10], n_groups=5, winsorize=True, standardize=True, **kwargs)`

#### `def follow(self) -> bool` *(property)*

## 如果是特殊蜡烛图指标，根据K线生成的指标是否跟随特殊蜡烛图指标
        - False :生成的所有指标用的是实际K线数据
        - True :生成的所有指标用的是特殊蜡烛图指标数据

#### `def follow(self, value: bool)`

#### `def current_open(self) -> float | None` *(property)*

## 当前开盘价

#### `def current_high(self) -> float | None` *(property)*

## 当前开盘价

#### `def current_low(self) -> float | None` *(property)*

## 当前收盘价

#### `def current_close(self) -> float | None` *(property)*

## 当前收盘价

#### `def current_datetime(self) -> str | None` *(property)*

## 当前日期

#### `def current_time(self) -> datetime.datetime | None` *(property)*

## 当前日期

#### `def symbol_info(self) -> SymbolInfo` *(property)*

## 合约信息

#### `def symbol(self) -> str` *(property)*

## 合约名称

#### `def cycle(self) -> int` *(property)*

## 合约周期

#### `def price_tick(self) -> float` *(property)*

## 合约最小变动单位

#### `def price_tick(self, value: float)`

## 合约最小变动单位

#### `def volume_multiple(self) -> float` *(property)*

## 合约剩数,即合约最小波动单位的价值

#### `def volume_multiple(self, value: float)`

## 合约剩数,即合约最小波动单位的价值

#### `def quote(self) -> Quotes | Quote` *(property)*

#### `def TargetPosTask(self, size: int)`

## 实盘时使用

#### `def commission(self) -> dict | None` *(property)*

## 手续费

#### `def tick_commission(self) -> float | None` *(property)*

## 每手手续费为波动一个点的价值的倍数

#### `def tick_commission(self, value: float)`

#### `def percent_commission(self) -> float | None` *(property)*

## 每手手续费为每手价值的百分比

#### `def percent_commission(self, value: float)`

#### `def fixed_commission(self) -> float | None` *(property)*

## 每手手续费为固定手续费

#### `def fixed_commission(self, value: float)`

#### `def slip_point(self) -> float | None` *(property)*

## 每手手续费为固定手续费

#### `def slip_point(self, value: float)`

#### `def stop(self) -> Stop | None` *(property)*

## 停止器

#### `def stop_lines(self) -> IndFrame | None` *(property)*

## 停止线

#### `def stop_price(self) -> IndSeries | None` *(property)*

## 停止价

#### `def target_price(self) -> IndSeries | None` *(property)*

## 目标价

#### `def account(self) -> BtAccount | TqAccount` *(property)*

## 策略账户

#### `def buy(self, size: int=1, exectype: OrderType=OrderType.Close, price: float=None, valid: datetime | timedelta | int | None=None, stop=None) -> Order | float`

## 通过KLine对象执行买入操作

        - 便捷方法，通过KLine对象直接调用关联策略的买入接口

        Args:
            data (KLine, optional): 目标合约数据
            size: (int) 买入手数
            exectype (OrderType): 订单类型（Market, Limit, Stop等）
            price (float): 委托价格（限价单/止损单需要）
            valid (datetime.datetime | datetime.timedelta | float): 订单有效期
            stop (BtStop): 停止器设置
            **kwargs: 其他参数
                - bar (int): 1

        Returns:
        >>> float | None: 交易盈亏（回测模式）或浮动盈亏（实盘模式）

        ### 示例:
        ```python
        # Example: 在当前K线买入1手
        kline.buy(size=1)

        # Example: 买入2手并设置止损
        kline.buy(size=2, stop=BtStop.SegmentationTracking)
        ```
        ### Note:
        - 实际执行逻辑由关联的strategy_instance.buy方法处理
        - 回测模式返回交易盈亏，实盘模式返回浮动盈亏
        - 需确保KLine已正确关联到策略实例

#### `def sell(self, size: int=1, exectype: OrderType=OrderType.Close, price: float=None, valid: datetime | timedelta | int | None=None, stop=None) -> Order | float`

## 通过KLine对象执行卖出操作

        - 便捷方法，通过KLine对象直接调用关联策略的卖出接口

        Args:
            data (KLine, optional): 目标合约数据
            size: (int) 买入手数
            exectype (OrderType): 订单类型（Market, Limit, Stop等）
            price (float): 委托价格（限价单/止损单需要）
            valid (datetime.datetime | datetime.timedelta | float): 订单有效期
            stop (BtStop): 停止器设置
            **kwargs: 其他参数
                - bar (int): 1

        Returns:
        >>> float | None: 交易盈亏（回测模式）或浮动盈亏（实盘模式）

        ### 示例:
        ```python
        # Example: 在当前K线卖出1手
        kline.sell(size=1)

        # Example: 卖出2手并设置止损
        kline.sell(size=2, stop=BtStop.SegmentationTracking)
        ```
        ### Note:
        - 实际执行逻辑由关联的strategy_instance.sell方法处理
        - 回测模式返回交易盈亏，实盘模式返回浮动盈亏
        - 需确保KLine已正确关联到策略实例

#### `def set_target_size(self, size: int=0) -> None`

## 通过KLine对象设置目标仓位

        - 便捷方法，通过KLine对象直接调用关联策略的目标仓位设置接口

        Args:
            size (int): 目标仓位手数
                - 正数: 多头仓位
                - 负数: 空头仓位
                - 0: 平仓

        Returns:
            None
        ### 示例:
        ```python
        # Example: 设置目标仓位为5手多头
        kline.set_target_size(size=5)

        # Example: 设置目标仓位为-3手（空头）
        kline.set_target_size(size=-3)

        # Example: 平仓
        kline.set_target_size(size=0)
        ```
        ### Note:
        - 实际执行逻辑由关联的strategy_instance.set_target_size方法处理
        - 系统会自动计算当前仓位与目标仓位的差值，执行相应交易
        - 需确保KLine已正确关联到策略实例

#### `def margin(self) -> float | None` *(property)*

## 保证金

#### `def step_margin(self) -> list[float] | float | None` *(property)*

## 逐笔保证金

#### `def position_margin(self) -> float | None` *(property)*

## 保证金

#### `def margin_rate(self) -> float | None` *(property)*

## 保证金

#### `def margin_rate(self, value)`

#### `def position(self) -> Position | BtPosition | None` *(property)*

## 持仓对象

#### `def float_profit(self) -> float | None` *(property)*

## 持仓浮动盈亏

#### `def float_tick(self) -> float | None` *(property)*

## 持仓浮动点数

#### `def open_price(self) -> float | None` *(property)*

## 合约开仓价

#### `def cost_price(self) -> float | None` *(property)*

## 合约持仓成本价

#### `def current_commission(self) -> float | None` *(property)*

## 当前手续费

#### `def resample(self, cycle: int, data_length: int=None, rule: str=None, **kwargs) -> KLine`

## 周期转换

        Args:
            cycle (int): 转换周期,不能低于主周期.
            data_length (int): 数据长度.
            rule (str, optional): 日周期以上需要自行设置,D,W,M. Defaults to None.

        Returns:
        >>> KLine

#### `def replay(self, cycle: int, data_length: int=None, rule: str=None, **kwargs) -> KLine`

## 周期转换

        Args:
            cycle (int): 转换周期,不能低于主周期.
            data_length (int): 数据长度.
            rule (str, optional): 日周期以上需要自行设置,D,W,M. Defaults to None.

        Returns:
        >>> KLine

#### `def Heikin_Ashi_Candles(self) -> bool` *(property)*

## 黑金K线图

#### `def Heikin_Ashi_Candles(self, value: bool) -> None`

#### `def Linear_Regression_Candles(self) -> bool` *(property)*

## 线性回归K线图

#### `def Linear_Regression_Candles(self, value: int) -> None`

#### `def watermark(self) -> WaterMark | None` *(property)*

## 获取指标水印（属性接口）
        - 只适配lightweight_charts图表

        ### 设置水印:
        - bool ：True:默认水印,False:None
        - str : WaterMark(text)
        - WaterMark : WaterMark
        Returns:
            WaterMark | None

#### `def watermark(self, value: bool | str | WaterMark)`

#### `def iswatermark(self) -> bool` *(property)*

## 是否设置了指标水印（属性接口）
        - 只适配lightweight_charts图表

        ### 可设置默认水印
        Returns:
            bool

#### `def iswatermark(self, value)`

#### `def datetime(self) -> Line` *(property)*

## 时间序列

#### `def open(self) -> Line` *(property)*

## 开盘价序列

#### `def high(self) -> Line` *(property)*

## 最高价序列

#### `def low(self) -> Line` *(property)*

## 最低价序列

#### `def close(self) -> Line` *(property)*

## 收盘价序列

#### `def volume(self) -> Line` *(property)*

## 成交量序列

#### `def bear_color(self) -> str` *(property)*

## 获取或设置下跌蜡烛图（阴线）颜色

        - 获取当前K线图中下跌蜡烛图（收盘价低于开盘价）的颜色设置
        - 设置K线图中下跌蜡烛图（收盘价低于开盘价）的显示颜色

        Args:
            value (str): 颜色值，支持以下格式：
                - Colors枚举值（如Colors.green）
                - 十六进制颜色字符串（如"#00FF00"）

        Returns:
            str: 下跌蜡烛图的颜色值，格式为十六进制颜色字符串或颜色名称

        Raises:
            ValueError: 当传入无效颜色值时不会生效但不会报错（静默忽略）
            AttributeError: 当蜡烛图样式未启用时访问会引发异常

        ### 示例
        ```python
        # 获取当前下跌蜡烛颜色
        color = kline.bear_color
        print(f"下跌蜡烛颜色: {color}")
        # 设置下跌蜡烛为绿色
        kline.bear_color = Colors.green
        # 使用十六进制颜色
        kline.bear_color = "#008800"
        ```
        ### Note:
        - 仅当蜡烛图样式启用时（_plotinfo.candlestyle存在）才可访问
        - 默认通常为绿色或红色，取决于图表主题配置
        - 颜色值必须为有效的Colors枚举或非空字符串
        - 设置后立即生效，影响后续蜡烛图的绘制

#### `def bear_color(self, value: str)`

## 设置下跌蜡烛图（阴线）颜色

#### `def bull_color(self) -> str` *(property)*

## 获取或设置上涨蜡烛图（阳线）颜色

        - 获取当前K线图中上涨蜡烛图（收盘价高于开盘价）的颜色设置
        - 设置K线图中上涨蜡烛图（收盘价高于开盘价）的显示颜色

        Args:
            value (str): 颜色值，支持以下格式：
                - Colors枚举值（如Colors.red）
                - 十六进制颜色字符串（如"#FF0000"）

        Returns:
            str: 上涨蜡烛图的颜色值，格式为十六进制颜色字符串或颜色名称

        Raises:
            ValueError: 当传入无效颜色值时不会生效但不会报错（静默忽略）
            AttributeError: 当蜡烛图样式未启用时访问会引发异常

        ### 示例
        ```python
        # 获取当前上涨蜡烛颜色
        color = kline.bull_color
        print(f"上涨蜡烛颜色: {color}")
        # 设置上涨蜡烛为红色
        kline.bull_color = Colors.red
        # 使用十六进制颜色
        kline.bull_color = "#FF3333"
        ```

        ### Note:
        - 仅当蜡烛图样式启用时（_plotinfo.candlestyle存在）才可访问
        - 默认通常为红色或绿色，取决于图表主题配置
        - 颜色值必须为有效的Colors枚举或非空字符串
        - 设置后立即生效，影响后续蜡烛图的绘制

#### `def bull_color(self, value: str)`

## 设置上涨蜡烛图（阳线）颜色

#### `def datetime_index(self) -> pd.Index` *(property)*

数据时间索引，用于分析报告

#### `def run(self, *args: tuple[list[str, Multiply]], **kwargs) -> Bt`

## 快速启动策略

        ### 📘 **文档参考**:
        - https://www.minibt.cn/minibt_basic/1.4minibt_fast_start_strategy/

        ### Args:
        >>> tuple[list[str, Multiply]]

        ## Kwargs:
        >>> next (Callable)
            config (Config)

        Examples:
        >>> bt= LocalDatas.v2601_300.kline.run(
                ["ma1", Multiply(PandasTa.sma, dict(length=20))],
                ["ma2", Multiply(PandasTa.sma, dict(length=30))],
                ["ma3", Multiply(PandasTa.sma, dict(length=60))],
                ["ma4", Multiply(PandasTa.sma, dict(length=120))],
                ["ebsw", Multiply(PandasTa.ebsw)])

        >>> def next(self: Strategy):
                if not self.kline.position:
                    if self.ma1.prev < self.ma4.prev and self.ma1.new > self.ma4.new:
                        self.kline.buy()
                elif self.kline.position > 0:
                    if self.ma1.prev > self.ma4.prev and self.ma1.new < self.ma4.new:
                        self.kline.sell()
            config = Config(islog=False, profit_plot=True)
            bt= KLine(LocalDatas.get_IndFrame(LocalDatas.v2601_300)).run(
                ["ma1", Multiply(PandasTa.sma, dict(length=20))],
                ["ma2", Multiply(PandasTa.sma, dict(length=30))],
                ["ma3", Multiply(PandasTa.sma, dict(length=60))],
                ["ma4", Multiply(PandasTa.sma, dict(length=120))],
                ["ebsw", Multiply(PandasTa.ebsw)], next=next, config=config)

        Returns:
            Bt


---

## IndFrame

**继承**: `IndicatorsBase` → `PandasDataFrame` → `PandasTa` → `TaLib`

# 框架内置指标数据容器类（IndFrame 类型）
    - 核心定位：继承 pandas.DataFrame 并整合指标计算、可视化配置、交易信号管理能力，作为系统统一的多列指标数据格式

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.10minibt_internal_data_dataframe_guide/

    ### 核心特性：
    1. 多父类融合：
    - 继承 `pd.DataFrame`：保留原生 DataFrame 的数据存储与计算能力（如索引、切片、列操作）
    - 继承 `IndicatorsBase`：获得指标基础属性与方法（如指标ID、分类标识）
    - 继承 `PandasTa`/`TaLib`：直接调用 pandas_ta、TaLib 库的技术指标计算接口
    2. 指标化增强：
    - 将每列数据自动封装为 `Line` 类型（框架内置单指标序列），支持指标属性（如绘图样式、信号标记）
    - 内置指标元数据管理（`_plotinfo` 绘图配置、`_indsetting` 指标设置），无需额外定义
    3. 交易信号原生支持：
    - 内置多头/空头开仓/离场信号（`long_signal`/`short_signal`/`exitlong_signal`/`exitshort_signal`）
    - 支持信号样式自定义（颜色、标记、大小等），直接关联绘图逻辑
    4. 可视化配置集成：
    - 支持线型（`line_style`）、信号样式（`signal_style`）的批量/单独设置
    - 自动适配框架绘图模块，无需手动传递绘图参数
    5. 数据兼容性：
    - 支持多种输入数据类型（`pd.DataFrame`/`np.ndarray`/列表/元组/字典），自动转换为标准格式
    - 提供 `to_lines()`/`to_ndarray()` 方法，便捷转换为 `Line` 序列或 numpy 数组

    ### 初始化参数说明：
    Args:
        data: 输入数据，支持以下类型：
            - pd.DataFrame：直接使用已有 DataFrame，列名自动作为指标线名称
            - np.ndarray：numpy 数组，需通过 `kwargs` 指定 `lines`（指标线名称）
            - tuple/list：整数序列（如 (100, 3) 表示 100 行 3 列），自动生成全 NaN 数组（标记为自定义数据）
            - dict：键为列名、值为数据的字典，自动转换为 DataFrame
        **kwargs: 额外配置参数（核心参数如下）：
            - lines (list[str]): 指标线名称列表，未指定时自动读取 DataFrame 列名
            - id (BtID): 指标唯一标识（默认自动生成），用于指标区分与管理
            - isplot (bool/dict): 是否绘图（True/False 或按列名配置的字典），默认 True
            - category (str): 指标分类（如 "candles"/"momentum"，默认 Category.Any）
            - overlap (bool): 是否与主图重叠显示（默认 False）
            - isha/islr (bool): 是否为 Heikin-Ashi 蜡烛图/线性回归指标（默认 False）
            - ismain (bool): 是否为主图指标（默认 False）
            - isindicator (bool): 是否为技术指标（默认 True，非指标数据设为 False）
            - iscustom (bool): 是否为自定义数据（默认 False，列表/元组输入时自动设为 True）
            - height (int): 指标绘图高度（蜡烛图默认 300，其他默认 150）

    ### 核心属性说明：
    1. 数据与指标基础属性：
    - IndSeries: 转换为框架内置 `SeriesType`（单列指标容器）
    - _plotinfo: `PlotInfo` 实例，存储绘图配置（如高度、线型、信号样式、指标分类）
    - _indsetting: `IndSetting` 实例，存储指标元数据（如指标ID、维度、自定义标识）
    - _dataset: `DataFrameSet` 实例，管理数据副本与缓存
    2. 交易信号属性（支持赋值与读取）：
    - long_signal: 多头开仓信号（需为与数据长度一致的可迭代对象）
    - exitlong_signal: 多头离场信号
    - short_signal: 空头开仓信号
    - exitshort_signal: 空头离场信号
    3. 样式配置属性（支持批量/单独设置）：
    - signal_style: 信号样式（标记、颜色、大小等），返回 `SignalStyleType` 实例
    - line_style: 指标线型（线型、线宽、颜色等），返回 `LineStyleType` 实例
    - signal_color/line_color: 单独设置信号/线型颜色，返回 `SignalAttrType`/`LineAttrType` 实例
    - 其他样式属性：signal_key（信号位置）、signal_size（信号大小）、line_dash（线型虚实）等

    ### 使用示例：
    >>> # 1. 从 DataFrame 初始化指标 IndFrame
    >>> raw_df = pd.DataFrame({"close": [100, 101, 102, 103], "ma5": [99, 100, 101, 102]})
    >>> ind_df = IndFrame(raw_df, category="overlap", isplot=True)
    >>>
    >>> # 2. 设置多头信号
    >>> ind_df.long_signal = [0, 1, 0, 1]  # 第2、4期为多头开仓信号
    >>>
    >>> # 3. 自定义信号样式
    >>> ind_df.signal_style.long_signal = SignalStyle("low", Colors.blue, Markers.circle_dot, size=25)
    >>>
    >>> # 4. 转换为 Line 序列
    >>> close_line, ma5_line = ind_df.to_lines("close", "ma5")
    >>>
    >>> # 5. 调用 pandas_ta 指标（继承自 PandasTa）
    >>> rsi_df = ind_df.rsi(length=14)

### 方法

#### `def __init__(self, data: pd.DataFrame | np.ndarray | tuple[int] | list[int] | dict, **kwargs) -> None`

#### `def series(self) -> SeriesType` *(property)*

### Line转IndSeries

#### `def long_signal(self) -> Line` *(property)*

## 多头交易信号

#### `def long_signal(self, value) -> None`

#### `def exitlong_signal(self) -> Line` *(property)*

## 多头离场交易信号

#### `def exitlong_signal(self, value) -> None`

#### `def short_signal(self) -> Line` *(property)*

## 空头交易信号

#### `def short_signal(self, value) -> None`

#### `def exitshort_signal(self) -> Line` *(property)*

## 空头离场交易信号

#### `def exitshort_signal(self, value) -> None`

#### `def signal_style(self) -> SignalStyleType` *(property)*

## 信号指标线型设置

        - 提供对信号指标的视觉样式进行精细控制的接口。
        - 可以设置信号线的显示位置、颜色、标记符号、大小等视觉属性。

        Returns:
        >>> SignalStyleType
            SignalStyle配置对象，用于设置信号指标的显示样式

        ### Notes:
        1. 信号线用于在图表上标记交易信号（如买入、卖出点）
        2. 可以分别为不同的信号类型（long_signal, short_signal等）设置不同的样式
        3. SignalStyle包含多个属性：
            - key: 信号线绑定的价格位置（如'low', 'high', 'close'）
            - color: 信号标记的颜色
            - marker: 信号标记的符号
            - overlap: 信号标记是否主图显示
            - show: 信号标记是否显示
            - size: 信号标记的大小
            - label: 信号标签

        Examples:
        ```python
        # 设置买入信号的样式：在最低价位置显示蓝色圆形标记
        self.test.signal_style.long_signal = SignalStyle(
            "low", Colors.blue, Markers.circle_dot, size=25)

        # 设置卖出信号的样式：在最高价位置显示红色三角形标记
        self.test.signal_style.short_signal = SignalStyle(
            "high", Colors.red, Markers.triangle_down, size=25)

        # 查看当前信号样式
        current_style = self.test.signal_style.long_signal
        print(f"买入信号样式: {current_style}")
        ```

        ## Setter: 将所有指标线设置统一SignalStyle

        ```python
        # 将所有信号线统一设置为相同样式
        self.test.signal_style = SignalStyle(
            "low", Colors.blue, Markers.circle_dot, size=25)

        # 这相当于同时设置所有信号类型（long_signal, short_signal等）
        ```

#### `def signal_style(self, value)`

## 设置所有信号线的统一样式

#### `def signal_key(self) -> SignalAttrType` *(property)*

## 信号指标属性key设置

        - 设置信号线绑定的价格位置（如开盘价、最高价、最低价、收盘价）。
        - 这决定了信号标记在K线图上的垂直位置。

        Returns:
        >>> SignalAttrType
            信号属性配置对象，用于设置信号线绑定的价格位置

        ### Notes
        1. key值必须是数据列名，通常是'open', 'high', 'low', 'close'之一
        2. 不同信号类型可以绑定到不同的价格位置
        3. 常用组合：
            - 买入信号：绑定到'low'（在最低价位置显示）
            - 卖出信号：绑定到'high'（在最高价位置显示）

        Examples:
        ```python
        # 设置买入信号绑定到最低价位置
        self.test.signal_key.long_signal = "low"

        # 设置卖出信号绑定到最高价位置
        self.test.signal_key.short_signal = "high"

        # 设置平仓信号绑定到收盘价位置
        self.test.signal_key.exitlong_signal = "close"

        # 查看当前设置
        print(f"买入信号位置: {self.test.signal_key.long_signal}")
        ```

        ## Setter: 将所有指标线LineStyle属性line_color统一设置
        ```python
        # 注意：这里示例描述的是line_color，但实际是signal_key
        # 设置所有信号线都绑定到最低价位置
        self.test.signal_key = "low"

        # 设置所有信号线都绑定到收盘价位置
        self.test.signal_key = "close"
        ```

#### `def signal_key(self, value)`

## 设置所有信号线的统一价格位置

#### `def signal_show(self) -> SignalAttrType` *(property)*

## 信号显示开关设置

        - 控制是否在图表上显示特定的信号线。
        - 可以关闭对应信号显示。

        Returns:
        >>> SignalAttrType
            信号显示控制对象，用于设置信号线的可见性

        ### Notes
        1. 值为True时显示信号，False时隐藏信号
        2. 可以分别控制不同类型信号的显示状态
        3. 在回测可视化时，合理控制信号显示可以避免图表过于杂乱

        Examples:
        ```python
        # 显示买入信号，隐藏卖出信号
        self.test.signal_show.long_signal = True
        self.test.signal_show.short_signal = False

        # 临时隐藏所有信号（调试时使用）
        self.test.signal_show.long_signal = False
        self.test.signal_show.short_signal = False
        self.test.signal_show.exitllong_signal = False

        # 恢复显示所有信号
        for signal_type in ['long_signal', 'short_signal', 'exitllong_signal']:
            setattr(self.test.signal_show, signal_type, True)
        ```

        ## Setter: 统一设置所有信号的显示状态
        ```python
        # 显示所有信号
        self.test.signal_show = True

        # 隐藏所有信号
        self.test.signal_show = False

        # 注意：这会覆盖之前对单个信号的设置
        ```

#### `def signal_show(self, value)`

设置所有信号线的统一显示状态

#### `def signal_color(self) -> SignalAttrType` *(property)*

## 信号颜色设置

        - 设置信号标记的颜色，用于区分不同类型的交易信号。
        - 通常使用红色表示卖出信号，绿色表示买入信号。

        Returns:
        >>> SignalAttrType
            信号颜色配置对象，用于设置信号标记的颜色

        ### Notes
        1. 颜色值可以使用Colors枚举，如Colors.red, Colors.green
        2. 也可以使用十六进制颜色代码，如'#FF0000'（红色）
        3. 颜色设置应与交易逻辑一致，便于快速识别
        4. 建议遵循行业惯例：绿色=买入，红色=卖出

        Examples:
        ```python
        # 设置买入信号为绿色
        self.test.signal_color.long_signal = Colors.green

        # 设置卖出信号为红色
        self.test.signal_color.short_signal = Colors.red

        # 使用十六进制颜色
        self.test.signal_color.exit_signal = '#FFA500'  # 橙色

        # 使用RGB颜色
        from matplotlib.colors import to_hex
        self.test.signal_color.entry_signal = to_hex((0, 0.5, 1))  # 蓝色

        # 查看当前颜色设置
        print(f"买入信号颜色: {self.test.signal_color.long_signal}")
        ```

        ## Setter: 统一设置所有信号的颜色
        ```python
        # 将所有信号设置为红色
        self.test.signal_color = Colors.red

        # 将所有信号设置为蓝色
        self.test.signal_color = Colors.blue

        # 使用自定义颜色
        self.test.signal_color = '#32CD32'  # 石灰绿色
        ```

#### `def signal_color(self, value)`

## 设置所有信号线的统一颜色

#### `def signal_overlap(self) -> SignalAttrType` *(property)*

## 信号主图重叠显示设置

        - 控制信号标记是否覆盖在主K线图上显示。
        - 当设置为False时，信号标记会在副图指标中显示，默认是主图叠加。

        Returns:
        >>> SignalAttrType
            信号重叠显示配置对象，用于设置信号的显示模式

        ### Notes
        1. overlap=True: 信号标记覆盖在主K线图上（默认）
        2. overlap=False: 信号在独立面板中显示
        3. 独立显示可以避免信号标记与价格线互相遮挡
        4. 当信号较多时，建议使用独立显示以提高图表清晰度

        Examples:
        ```python
        # 买入信号在主图上显示（与价格线重叠）
        self.test.signal_overlap.long_signal = True

        # 卖出信号在独立面板显示
        self.test.signal_overlap.short_signal = False

        # 平仓信号在主图上显示
        self.test.signal_overlap.exit_signal = True

        # 查看当前设置
        print(f"买入信号重叠: {self.test.signal_overlap.long_signal}")
        print(f"卖出信号重叠: {self.test.signal_overlap.short_signal}")
        ```

        ## Setter: 统一设置所有信号的重叠显示模式
        ```python
        # 所有信号都在主图上显示（默认）
        self.test.signal_overlap = True

        # 所有信号都在独立面板显示
        self.test.signal_overlap = False

        # 这种设置适合信号较多或需要清晰查看价格走势的情况
        ```

#### `def signal_overlap(self, value)`

## 设置所有信号线的统一重叠显示模式

#### `def signal_size(self) -> SignalAttrType` *(property)*

## 信号标记大小设置

        - 设置信号标记在图表上的显示大小，默认为12。
        - 较大的标记更醒目，但可能遮挡更多价格信息。

        Returns:
        >>> SignalAttrType
            信号大小配置对象，用于设置信号标记的尺寸

        ### Notes
        1. 大小值通常为整数，表示标记的像素尺寸
        2. 常用范围：10-50，默认为12
        3. 不同类型的信号可以使用不同的大小以示区分
        4. 大小设置应考虑图表比例，避免标记过大或过小

        Examples:
        ```python
        # 设置买入信号标记大小为30
        self.test.signal_size.long_signal = 30

        # 设置卖出信号标记大小为25
        self.test.signal_size.short_signal = 25

        # 设置平仓信号标记大小为20
        self.test.signal_size.exit_signal = 20

        # 重要信号使用更大的标记
        self.test.signal_size.strong_buy = 40
        self.test.signal_size.strong_sell = 40

        # 查看当前设置
        print(f"买入信号大小: {self.test.signal_size.long_signal}")
        ```

        ## Setter: 统一设置所有信号标记的大小
        ```python
        # 将所有信号标记设置为相同大小
        self.test.signal_size = 25  # 默认大小

        # 使用较大标记（适用于演示或报告）
        self.test.signal_size = 35

        # 使用较小标记（信号密集时）
        self.test.signal_size = 15
        ```

#### `def signal_size(self, value)`

## 设置所有信号线的统一标记大小

#### `def signal_label(self) -> SignalAttrType` *(property)*

## 信号标签设置

        - 设置信号标记在图表上显示的文本标签。
        - 标签可以用于标识信号类型或添加额外信息。

        Returns:
        >>> SignalAttrType
            信号标签配置对象，用于设置信号标记的文本标签

        ### Notes
        1. 标签文本会显示在信号标记旁边
        2. 可以用于显示信号名称、交易数量、盈亏比例等信息
        3. 标签支持格式化字符串，可以包含动态数据
        4. 过多的标签可能使图表杂乱，应谨慎使用

        Examples:
        ```python
        # 设置简单的文本标签
        self.test.signal_label.long_signal = SignalLabel("买入",size=10, style="bold", color="red")
        self.test.signal_label.short_signal = SignalLabel("卖出",size=10, style="bold", color="red")

        # 清空标签（不显示）
        self.test.signal_label.exitlong_signal = False

        # 查看当前设置
        print(f"买入信号标签: {self.test.signal_label.long_signal}")
        ```

        ## Setter: 统一设置所有信号的标签
        ```python
        # 为所有信号设置相同的标签前缀
        self.test.signal_label = SignalLabel("Signal")

        # 清空所有信号的标签
        self.test.signal_label = False

        # 注意：统一设置会覆盖之前的个性化设置
        ```

#### `def signal_label(self, value)`

## 设置所有信号线的统一标签

#### `def line_style(self) -> LineStyleType` *(property)*

## 指标线型样式配置

        - 用于配置指标线的线型样式，支持以下两种使用方式：

        1. **链式调用**：设置特定指标线的完整样式
        2. **统一设置**：设置所有指标线的统一样式

        Returns:
        >>> LineStyleType: 线型样式配置对象，支持链式调用设置单个指标线样式

        Examples:
        ```python
        # 链式调用设置特定指标线样式
        indicator.line_style.long_signal = LineStyle(
            dash=LineDash.dashdot,
            width=3,
            color=Colors.red
        )

        # 统一设置所有指标线样式
        indicator.line_style = LineStyle(
            dash=LineDash.dashdot,
            width=3,
            color=Colors.red
        )
        ```

#### `def line_style(self, value)`

## 统一设置指标线样式

        Args:
            value (LineStyle): 线型样式对象，包含dash、width、color属性

        Note:
            - 仅对指标实例生效
            - 对于多维指标(isMDim=True)，会遍历设置所有子线样式

#### `def line_dash(self) -> LineAttrType` *(property)*

## 指标线虚线样式配置

        - 用于配置指标线的虚线样式，支持以下两种使用方式：

        1. **链式调用**：设置特定指标线的虚线样式
        2. **统一设置**：设置所有指标线的统一虚线样式

        Returns:
        >>> LineAttrType: 线型属性配置对象，支持链式调用设置单个属性

        ### 示例:
        ```python
        # 链式调用设置特定指标线虚线样式
        indicator.line_dash.long_signal = LineDash.solid

        #  统一设置所有指标线虚线样式
        indicator.line_dash = LineDash.dashdot
        ```
        ### Note: 
        >>> 支持样式：solid(实线), dash(虚线), dot(点线), dashdot(点划线)

#### `def line_dash(self, value)`

## 统一设置指标线虚线样式

        Args:
            value (LineDash): 虚线样式枚举值

        Note:
            - 仅对指标实例生效
            - 对于多维指标(isMDim=True)，会遍历设置所有子线样式

#### `def line_width(self) -> LineAttrType` *(property)*

## 指标线宽度配置

        - 用于配置指标线的宽度，支持以下两种使用方式：

        1. **链式调用**：设置特定指标线的宽度
        2. **统一设置**：设置所有指标线的统一宽度

        Returns:
        >>> LineAttrType: 线型属性配置对象，支持链式调用设置单个属性

        ### 示例:
        ```python
        # 链式调用设置特定指标线宽度
        indicator.line_width.long_signal = 3

        # 统一设置所有指标线宽度
        indicator.line_width = 3
        ```
        ### Note: 
        - 宽度值应为正整数，表示像素宽度
        - 该方法仅在指标实例中有效

#### `def line_width(self, value)`

## 统一设置指标线宽度

        Args:
            value (int): 线宽值，单位为像素

        Note:
            - 仅对指标实例生效
            - 对于多维指标(isMDim=True)，会遍历设置所有子线样式

#### `def line_color(self) -> LineAttrType` *(property)*

## 指标线颜色配置

        - 用于配置指标线的颜色，支持以下两种使用方式：

        1. **链式调用**：设置特定指标线的颜色
        2. **统一设置**：设置所有指标线的统一颜色

        Returns:
        >>> LineAttrType: 线型属性配置对象，支持链式调用设置单个属性
        ```python
        # 链式调用设置特定指标线颜色
        indicator.line_color.long_signal = Colors.red

        # 统一设置所有指标线颜色
        indicator.line_color = Colors.red
        ```
        ### Note: 
        - 颜色值应为Colors枚举值或RGB颜色值
        - 该方法仅在指标实例中有效

#### `def line_color(self, value)`

## 统一设置指标线颜色

        Args:
            value (Colors): 颜色值，支持Colors枚举或RGB格式

        Note:
            - 仅对指标实例生效
            - 对于多维指标(isMDim=True)，会遍历设置所有子线样式

#### `def price_line(self) -> LineAttrType` *(property)*

## 指标线价格水平线显示配置

        - 只适配lightweight_charts图表
        - 用于配置指标线/直方图是否显示价格水平线（在图表中指标价格水平线）
        - 支持两种使用方式，适配不同的配置场景：

        1. **链式调用**：为特定指标线单独设置价格标签显示状态
        2. **统一设置**：为当前指标实例下所有线统一设置价格标签显示状态

        Returns:
            LineAttrType: 线型属性配置对象，支持链式调用设置单个属性值

        ```python
        # 链式调用：为long_signal指标线开启价格水平线显示
        indicator.price_line.long_signal = True

        # 统一设置：为当前指标所有线关闭价格水平线显示
        indicator.price_line = False

#### `def price_line(self, value)`

#### `def price_label(self) -> LineAttrType` *(property)*

## 指标线价格标签显示配置

        - 只适配lightweight_charts图表
        - 用于配置指标线/直方图是否显示价格标签（在图表中指标数值旁显示价格文本）
        - 支持两种使用方式，适配不同的配置场景：

        1. **链式调用**：为特定指标线单独设置价格标签显示状态
        2. **统一设置**：为当前指标实例下所有线统一设置价格标签显示状态

        Returns:
            LineAttrType: 线型属性配置对象，支持链式调用设置单个属性值

        ```python
        # 链式调用：为long_signal指标线开启价格标签显示
        indicator.price_label.long_signal = True

        # 统一设置：为当前指标所有线关闭价格标签显示
        indicator.price_label = False

#### `def price_label(self, value)`

#### `def to_lines(self, *args: int | str) -> tuple[Line]`

### 返回多列Line

#### `def to_ndarray(self) -> tuple[np.ndarray]`

### 返回多列np.ndarray

#### `def select_dtypes(self, include: Literal['int', 'float', 'number', 'object', 'datetime', 'bool'] | list[str]=None, exclude=None, **kwargs) -> IndFrame | IndSeries`

## 根据数据类型选择列

        - 基于列的数据类型筛选DataFrame的列。

        Args:
            `include`：指定要保留的列类型（可选）
                - 含义：传入需要筛选保留的数据类型，列的 dtype 匹配该参数时会被保留。
                - 支持的传入格式：
                - 单个 dtype 字符串（如 `'int64'`、`'object'`）
                - dtype 列表（如 `['int64', 'float64']`）
                - numpy dtype 对象（如 `np.int64`、`np.float32`）
                - 快捷类型别名（如 `'number'` 代表所有数值类型：int + float；`'datetime'` 代表日期时间类型）
            `exclude`：指定要排除的列类型（可选）
                - 含义：传入需要过滤排除的数据类型，列的 dtype 匹配该参数时会被剔除。
                - 传入格式：与 `include` 完全一致（单个值、列表、numpy dtype 均可）。

        ### 注意事项
        - `include` 和 `exclude` 可以同时使用（先按 `include` 筛选，再从结果中按 `exclude` 排除）。
        - 两者不能同时为 `None`（默认 `include=None`、`exclude=None`，此时会抛出异常）。
        - 不能传入互相矛盾的参数（如 `include='int64'` 同时 `exclude='int64'`）。


        ### 常用数据类型参考

        | 类型类别       | 具体 dtype                | 快捷别名       |
        |----------------|--------------------------|----------------|
        | 整数类型       | int64、int32、int16       | 'int'          |
        | 浮点类型       | float64、float32          | 'float'        |
        | 数值类型（通用）| int + float               | 'number'       |
        | 字符串/对象类型 | object                   | 'object'       |
        | 日期时间类型   | datetime64[ns]            | 'datetime'     |
        | 布尔类型       | bool                      | 'bool'         |

        Returns:
        >>> IndFrame: 筛选后的数据子集

        Examples:
            >>> df = IndFrame({'A': [1, 2], 'B': ['x', 'y'], 'C': [1.1, 2.2]})
            >>> result = df.select_dtypes(include='number')
            >>> print(result)
            A    C
            0  1  1.1
            1  2  2.2

            >>> # 更多示例
            >>> df.select_dtypes(include=['int', 'float64'])  # 整数和浮点数
            >>> df.select_dtypes(exclude=['object', 'datetime'])  # 排除对象和日期类型
            >>> df.select_dtypes(include=['Int64', 'Float64'])  # 可空数值类型

#### `def pop(self, item: Hashable, **kwargs) -> IndSeries | None`

## 弹出指定列

        - 从DataFrame中删除并返回指定列。

        Args:
            item: 要弹出的列名

        Returns:
        >>> IndSeries: 弹出的列数据

        Examples:
            >>> df = IndFrame({'A': [1, 2], 'B': [3, 4]})
            >>> popped = df.pop('B')
            >>> print(popped)
            0    3
            1    4
            Name: B, dtype: int64
            >>> print(df)
               A
            0  1
            1  2

#### `def entries(self) -> IndSeries | None` *(property)*

### 获取开仓信号

        Returns:
            IndSeries: 开仓信号

#### `def exits(self) -> IndSeries | None` *(property)*

### 获取平仓信号

        Returns:
            IndSeries: 平仓信号

#### `def iloc(self)` *(property)*

## 基于**整数位置**的索引器（按行/列的位置序号选择数据）

        ### 核心特点：
        - 位置从 0 开始（如第 1 行对应 0，第 2 列对应 1）
        - 支持切片、整数列表、布尔数组等输入（详见示例）
        - 越界索引会报错（切片除外，兼容 Python 切片语义）

        ### 允许的输入类型：
        - 1. 单个整数（如 5 → 选择第 6 行/列）
        - 2. 整数列表/数组（如 [4,3,0] → 按顺序选择第 5、4、1 行/列）
        - 3. 切片（如 1:7 → 选择第 2 到第 7 行/列，包含边界）
        - 4. 布尔数组（长度需与行/列数一致，True 表示选择）
        - 5. 元组（如 (0,1) → 选择第 1 行第 2 列）

        ### 返回值：
        - 框架内置指标数据（单个值/`IndSeries`/`IndFrame`）
        - 原生 Pandas 对象

        ### 示例：
        >>> df.iloc[0]          # 选择第 1 行（返回 IndSeries 类型）
        >>> df.iloc[[0,2], [1]] # 选择第 1、3 行，第 2 列（返回 IndFrame 类型）

#### `def loc(self)` *(property)*

## 基于**标签（名称）** 的索引器（按行/列的标签选择数据）

        ### 核心特点：
        - 依赖索引标签（如行标签 'cobra'、列标签 'max_speed'）
        - 切片包含首尾边界（与 Python 原生切片不同）
        - 支持条件筛选（如按列值过滤行）

        ### 允许的输入类型：
        - 1. 单个标签（如 'a' 或 5 → 选择标签为 'a'/5 的行/列）
        - 2. 标签列表/数组（如 ['a','b'] → 按顺序选择指定标签）
        - 3. 标签切片（如 'a':'f' → 选择标签从 'a' 到 'f' 的行/列，包含边界）
        - 4. 布尔数组/Series（长度/索引需与行/列匹配）
        - 5. 函数（输入为当前对象，返回上述合法输入）

        ### 返回值：
        - 框架内置指标数据（单个值/`IndSeries`/`IndFrame`）
        - 原生 Pandas 对象


---

## IndSeries

**继承**: `IndicatorsBase` → `PandasSeries` → `PandasTa` → `TaLib`

## 框架内置指标数据序列类（IndSeries 类型）
    - 核心定位：继承 pandas.Series 并整合指标计算、可视化配置能力，作为系统统一的单列指标数据格式，适用于单一维度的技术指标（如RSI、MACD信号线等）

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.12minibt_internal_data_series_guide/

    ### 核心特性：
    1. 多父类融合：
    - 继承 `pd.Series`：保留原生 Series 的序列数据存储与计算能力（如索引、切片、元素操作）
    - 继承 `IndicatorsBase`：获得指标基础属性与方法（如指标ID、分类标识）
    - 继承 `PandasTa`/`TaLib`：直接调用 pandas_ta、TaLib 库的技术指标计算接口
    2. 指标化增强：
    - 内置指标元数据管理（`_indsetting` 指标设置、`_plotinfo` 绘图配置）
    - 支持自定义数据标记（`iscustom=True`），适用于用户手动生成的指标序列
    3. 可视化配置集成：
    - 支持线型（`line_style`）、线宽（`line_width`）、颜色（`line_color`）、虚实样式（`line_dash`）的单独设置
    - 自动适配框架绘图模块，无需手动传递绘图参数
    4. 数据兼容性：
    - 支持多种输入数据类型（`pd.Series`/`np.ndarray`/整数），整数输入时自动生成对应长度的全NaN数组
    - 与框架内置 `IndFrame` 类无缝兼容，可通过 `IndSeries` 属性相互转换

    ### 初始化参数说明：
    Args:
        data: 输入数据，支持以下类型：
            - pd.Series：直接使用已有 Series，自动继承其索引与数据
            - np.ndarray：numpy 数组，自动转换为 Series
            - int：整数表示序列长度，自动生成对应长度的全NaN数组（标记为自定义数据）
        **kwargs: 额外配置参数（核心参数如下）：
            - id (BtID)：指标唯一标识（默认自动生成），用于指标区分与管理
            - lines (list[str])：指标线名称列表（默认 ['line']，单列指标通常只需要一个名称）
            - category (str)：指标分类（如 "momentum"/"volatility"，默认 None）
            - isplot (bool)：是否绘图（默认 True）
            - overlap (bool)：是否与主图重叠显示（默认 False，"overlap" 分类指标自动设为 True）
            - sname/ind_name (str)：指标显示名称/内部名称（默认 'name'/'ind_name'）
            - ismain (bool)：是否为主图指标（默认 False）
            - isreplay/isresample (bool)：是否为回放/重采样数据（默认 False）
            - isindicator (bool)：是否为技术指标（默认 True，非指标数据设为 False）
            - iscustom (bool)：是否为自定义数据（默认 False，整数输入时自动设为 True）
            - height (int)：指标绘图高度（默认 150）
            - linestyle/signalstyle/spanstyle：绘图样式配置（默认空字典，使用框架默认样式）

    ### 核心属性说明：
    1. 数据与指标基础属性：
    - _indsetting：`IndSetting` 实例，存储指标元数据（如指标ID、长度、维度标识）
    - _plotinfo：`PlotInfo` 实例，存储绘图配置（如高度、线型、颜色等）
    - _dataset：`DataFrameSet` 实例，管理数据副本与缓存
    - lines：指标线名称列表（通常长度为1，如 ['rsi']）
    2. 样式配置属性（支持直接读写）：
    - line_style：线型完整配置（`LineStyle` 实例，包含线宽、颜色、虚实样式）
    - line_dash：线型虚实样式（如 `LineDash.solid` 实线、`LineDash.dash` 虚线）
    - line_width：线宽（整数或浮点数，如 2 表示2像素宽）
    - line_color：线条颜色（如 `Colors.red` 或 "#FF0000" 十六进制色值）

    ### 使用示例：
    >>> # 1. 从 numpy 数组初始化指标序列
    >>> import numpy as np
    >>> rsi_data = np.array([55.2, 58.7, 62.1, 59.3, 54.8])
    >>> rsi_IndSeries = IndSeries(rsi_data, lines=['rsi'], category='momentum', isplot=True)
    >>>
    >>> # 2. 自定义线型样式
    >>> rsi_IndSeries.line_color = Colors.blue  # 设置为蓝色
    >>> rsi_IndSeries.line_width = 2            # 线宽设为2
    >>> rsi_IndSeries.line_dash = LineDash.dash # 虚线样式
    >>>
    >>> # 3. 从整数长度初始化（自定义数据）
    # 生成100长度的全NaN序列
    >>> ma_IndSeries = IndSeries(100, iscustom=True, lines=['ma20'])
    >>>
    >>> # 4. 调用 pandas_ta 指标（继承自 PandasTa）
    >>> close_IndSeries = IndSeries(close_prices)  # close_prices 为价格序列
    >>> macd_signal = close_IndSeries.macd().signal  # 获取MACD信号线（Line类型）

### 方法

#### `def __init__(self, data: pd.Series | np.ndarray | int, **kwargs: IndSetting | dict) -> None`

#### `def line_style(self) -> LineStyle` *(property)*

## 获取或设置指标线的完整样式配置

        - 获取或设置当前指标序列的完整线型样式，包括线型、宽度和颜色
        - 设置当前指标序列的完整线型样式，一次性配置线型、宽度和颜色

        Args:
            value (LineStyle): 线型样式对象，包含line_dash、line_width、line_color属性

        Returns:
            LineStyle: 当前指标线的完整样式对象

        ### 示例
        ```python
        # 获取当前指标线的完整样式
        style = ind_series.line_style
        print(f"线型: {style.line_dash}, 宽度: {style.line_width}, 颜色: {style.line_color}")
        # 设置指标线的完整样式
        ind_series.line_style = LineStyle(
            line_dash=LineDash.dashdot,
            line_width=2.5,
            line_color=Colors.blue
        )
        ```

        ### GetNote:
        - 返回的是LineStyle对象的引用，修改返回的对象会影响原始样式
        - 仅适用于单线指标序列

        ### SetNote:
        - 必须传入LineStyle类型的实例
        - 设置后会立即覆盖原有的所有线型属性
        - 仅适用于单线指标序列

#### `def line_style(self, value: LineStyle)`

## 设置指标线的完整样式

#### `def line_dash(self) -> str | LineDash` *(property)*

## 获取或设置指标线的虚线样式

        - 获取或设置当前指标序列的虚线样式（如实线、虚线、点线等）
        - 设置当前指标序列的虚线样式，改变线条的绘制方式

        Args:
            value (str | LineDash): 虚线样式，必须是LineDash枚举值

        Returns:
            str | LineDash: 当前指标线的虚线样式

        ### 示例
        ```python
        # 获取当前线型
        dash_style = ind_series.line_dash
        print(f"当前线型: {dash_style}")

        # 设置指标线为虚线
        ind_series.line_dash = LineDash.dash

        # 设置指标线为点划线
        ind_series.line_dash = LineDash.dashdot
        ```

        ### GetNote:
        - 返回值为LineDash枚举值或对应的字符串
        - 仅适用于单线指标序列（lines[0]）
        - 可用值包括：LineDash.solid(实线)、LineDash.dash(虚线)、
        - LineDash.dot(点线)、LineDash.dashdot(点划线)

        ### SetNote:
        - 仅当传入值为有效的LineDash枚举值时设置才会生效
        - 仅适用于单线指标序列（lines[0]）
        - 设置后立即生效，影响图表显示

#### `def line_dash(self, value: str | LineDash)`

## 设置指标线的虚线样式

#### `def line_width(self) -> int | float` *(property)*

## 获取或设置指标线的宽度

        - 获取或设置当前指标序列的线条宽度（以像素为单位）
        - 设置当前指标序列的线条宽度，控制线条在图表上的粗细

        Args:
            value (int | float): 线条宽度值，必须为数值类型

        Returns:
            int | float: 当前指标线的宽度值
        ### 示例
        ```python
        # Example: 获取当前线宽
        width = ind_series.line_width
        print(f"当前线宽: {width}像素")

        # Example: 设置指标线宽度为2像素
        ind_series.line_width = 2

        # Example: 设置指标线宽度为1.5像素
        ind_series.line_width = 1.5
        ```

        ### GetNote:
        - 返回值为数值类型，表示像素宽度
        - 默认值通常为1.3
        - 仅适用于单线指标序列

        ### SetNote:
        - 仅当传入值为数值类型时设置才会生效
        - 仅适用于单线指标序列
        - 建议值范围：0.5-5.0，过大可能影响图表美观

#### `def line_width(self, value: int | float)`

## 设置指标线的宽度

#### `def line_color(self) -> str | Colors` *(property)*

## 获取或设置指标线的颜色

        - 获取或设置当前指标序列的线条颜色
        - 设置当前指标序列的线条颜色，改变线条在图表上的显示颜色

        Args:
            value (str | Colors): 颜色值，可以是Colors枚举或字符串格式

        Returns:
            str | Colors: 当前指标线的颜色值
        ### 示例
        ```python
        # 获取当前线色
        color = ind_series.line_color
        print(f"当前线色: {color}")

        # 使用Colors枚举设置颜色
        ind_series.line_color = Colors.red

        # 使用十六进制字符串设置颜色
        ind_series.line_color = "#00FF00"
        ```
        ### GetNote:
        - 返回值为Colors枚举值或颜色字符串
        - 仅适用于单线指标序列
        - 颜色值可以是十六进制字符串（如"#FF0000"）或Colors枚举（如Colors.red）

        ### SetNote:
        - 颜色值必须是有效的Colors枚举或非空字符串
        - 仅适用于单线指标序列
        - 建议选择与背景对比明显的颜色以提高可读性

#### `def line_color(self, value: str | Colors)`

## 设置指标线的颜色

#### `def price_line(self) -> str | Colors` *(property)*

## 指标线价格水平线显示配置

        - 只适配lightweight_charts图表
        - 用于配置指标线/直方图是否显示价格水平线（在图表中指标价格水平线）
        - 支持两种使用方式，适配不同的配置场景：

        1. **链式调用**：为特定指标线单独设置价格标签显示状态
        2. **统一设置**：为当前指标实例下所有线统一设置价格标签显示状态

        Returns:
            LineAttrType: 线型属性配置对象，支持链式调用设置单个属性值

        ```python
        # 链式调用：为long_signal指标线开启价格水平线显示
        indicator.price_line.long_signal = True

        # 统一设置：为当前指标所有线关闭价格水平线显示
        indicator.price_line = False

#### `def price_line(self, value)`

#### `def price_label(self) -> str | Colors` *(property)*

## 指标线价格标签显示配置

        - 只适配lightweight_charts图表
        - 用于配置指标线/直方图是否显示价格标签（在图表中指标数值旁显示价格文本）
        - 支持两种使用方式，适配不同的配置场景：

        1. **链式调用**：为特定指标线单独设置价格标签显示状态
        2. **统一设置**：为当前指标实例下所有线统一设置价格标签显示状态

        Returns:
            LineAttrType: 线型属性配置对象，支持链式调用设置单个属性值

        ```python
        # 链式调用：为long_signal指标线开启价格标签显示
        indicator.price_label.long_signal = True

        # 统一设置：为当前指标所有线关闭价格标签显示
        indicator.price_label = False

#### `def price_label(self, value)`

## 设置指标线的颜色


---

## Line

**继承**: `IndSeries`

## 框架内置单列指标数据类（继承 IndSeries 类）
    - 核心定位：作为 `IndFrame`/`KLine` 类的「列级数据载体」，封装单列指标的完整能力，同时保持与源数据（父 `IndFrame`/`KLine`）的联动，实现样式配置、绘图状态的双向同步

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.13minibt_internal_data_line_guide/

    ### 核心特性：
    1. 源数据强关联：
    - 初始化时必须绑定父级 `IndFrame` 或 `KLine` 实例（`source` 参数），确保与源数据共享元信息（如指标分类、绘图配置）
    - 样式修改（如颜色、线型）会自动同步到父级源数据，避免父子数据配置不一致
    2. 信号与普通指标双适配：
    - 自动识别是否为交易信号线（通过 `sname` 是否在父级 `signallines` 中判断）
    - 信号线额外支持信号样式配置（标记 `signal_marker`、颜色 `signal_color` 等），普通指标线仅保留基础线型配置
    3. 样式配置双向同步：
    - 线型（`line_style`）、线宽（`line_width`）、颜色（`line_color`）等基础样式修改时，同时更新自身与父级源数据的绘图配置
    - 信号专属样式（`signal_style`/`signal_key` 等）修改时，自动同步父级源数据的信号配置，确保绘图时信号与源数据匹配
    4. 继承与扩展并重：
    - 完全继承 `IndSeries` 类的指标计算能力（如调用 `pandas_ta`/`TaLib` 接口）、数据操作能力（索引、切片等）
    - 新增与父级联动的属性（如 `follow` 继承父级跟随状态、`overlap` 同步父级重叠显示配置），强化列级数据的上下文关联性

    ### 初始化参数说明：
    Args:
        source (IndFrame | KLine): 父级源数据实例，必须为框架内置的多列数据类型（`IndFrame` 或 `KLine`），用于关联元信息与同步配置
        data: 单列指标数据，支持类型与 `IndSeries` 类一致（`pd.Series`/`np.ndarray`/整数，整数表示生成对应长度的全NaN数组）
        **kwargs (IndSetting | dict): 额外配置参数（核心参数继承自 `IndSeries` 类，新增/增强如下）：
                - sname (str): 指标线名称（必须与父级 `IndFrame`/`KLine` 的列名一致，用于匹配父级配置）
                - 其他参数（如 `category`/`isplot`/`overlap` 等）若未指定，默认继承自父级源数据

    ### 核心属性说明：
    1. 源数据关联属性：
    - source: 父级源数据实例（`IndFrame` 或 `KLine`），可直接通过该属性访问父级的完整能力（如其他列数据、合约信息等）
    - follow: 继承父级的「主图跟随状态」（仅 `KLine` 等K线类数据有效，默认与父级一致）
    - isplot: 绘图开关，修改时自动同步父级源数据中对应列的绘图状态（非蜡烛图类父级有效）
    - overlap: 与主图重叠显示开关，修改时同步父级源数据对应列的重叠配置（非蜡烛图类父级有效）
    2. 基础线型配置属性（双向同步父级）：
    - line_style: 完整线型配置（`LineStyle` 实例），修改时同步父级源数据对应列的线型
    - line_dash: 线型虚实样式（如 `LineDash.solid` 实线），修改时同步父级
    - line_width: 线宽（整数/浮点数，需大于0），修改时同步父级
    - line_color: 线条颜色（支持 `Colors` 枚举或十六进制字符串），修改时同步父级
    3. 信号专属配置属性（仅信号线有效，双向同步父级）：
    - signal_style: 信号完整样式（`SignalStyle` 实例），仅当该线为信号线时可访问
    - signal_key: 信号锚定的父级列名（如信号标记在 "low" 列价格位置），修改时同步父级
    - signal_marker: 信号标记样式（如 `Markers.circle_dot` 圆点），修改时同步父级
    - signal_color: 信号颜色，修改时同步父级
    - signal_size: 信号大小，修改时同步父级
    - signal_show: 信号显示开关，修改时同步父级

    ### 使用示例：
    >>> # 1. 从 KLine 父级数据创建 Line 实例（假设 kline 为 KLine 实例，含 "close" 列）
    >>> close_line = self.data.close
    >>>
    >>> # 2. 修改线型样式（自动同步到父级 KLine）
    >>> close_line.line_color = Colors.red  # 关闭线设为红色，父级 kline 的 "close" 列颜色同步更新
    >>> close_line.line_width = 2           # 线宽设为2，父级同步更新
    >>>
    >>> # 3. 信号线配置（假设 "long_signal" 是父级的信号列）
    >>> if long_line.issignal:  # 自动识别为信号线
    ...     long_line.signal_marker = Markers.triangle_up  # 信号标记设为上三角
    ...     long_line.signal_color = Colors.green          # 信号颜色设为绿色，父级同步更新
    >>>
    >>> # 4. 控制绘图状态（同步父级）
    >>> long_line.isplot = True  # 开启信号线绘图，父级 kline 的 "long_signal" 列绘图状态同步开启

### 方法

#### `def __init__(self, source: IndFrame | KLine, data, **kwargs: IndSetting | dict) -> None`

#### `def line_style(self) -> LineStyle | None` *(property)*

## 完整线型配置（LineStyle 实例）

        - Get：
            - 获取当前列的完整线型配置（包含线宽、颜色、虚实样式等），
            - 从自身 _plotinfo.linestyle 中取对应 sname 的配置；
        - Set：
            - 设置当前列的完整线型配置，参数必须为 LineStyle 实例；
            - 设置时会先更新自身 _plotinfo.linestyle（用 Addict 包装确保格式一致），
            - 再同步更新父级 source 的 _plotinfo.linestyle，
            - 保证父子数据线型配置完全一致。

        Args:
            value (LineStyle): 线型样式对象，包含line_dash、line_width、line_color属性

        Returns:
            LineStyle | None: 当前列的完整线型配置对象，如果未设置则返回None

        ### 示例
        ```python
        # 获取当前列的线型样式
        style = line_obj.line_style
        print(f"线型: {style.line_dash}, 宽度: {style.line_width}, 颜色: {style.line_color}")

        # 设置当前列的完整线型样式
        line_obj.line_style = LineStyle(
            line_dash=LineDash.dash,
            line_width=2.0,
            line_color=Colors.blue
        )
        ```

        ### GetNote:
            - 返回的是LineStyle对象的引用，修改返回的对象会影响原始样式
            - 如果该列尚未设置线型样式，可能返回None

        ### SetNote:
            - 必须传入LineStyle类型的实例
            - 设置后会立即同步到父级数据源，确保显示一致性
            - 使用Addict包装确保数据结构一致性

#### `def line_style(self, value)`

## 设置完整线型配置

#### `def line_dash(self) -> LineDash` *(property)*

## 线型虚实样式（LineDash 枚举值）

        - Get：
            - 获取当前列的线型虚实样式，
            - 从自身 _plotinfo.linestyle 中对应 sname 的 line_dash 字段取值；
        - Set：
            - 设置当前列的线型虚实样式，
            - 参数必须为 LineDash 枚举成员（如 LineDash.solid 实线）；
            - 设置时先更新自身配置，再同步父级 source 的 _plotinfo.linestyle 中对应 sname 的 line_dash，确保线型统一。

        Args:
            value (LineDash): 虚线样式，必须是LineDash枚举值

        Returns:
            LineDash: 当前列的线型虚实样式

        ### 示例
        ```python
        # 获取当前线型虚实样式
        dash_style = line_obj.line_dash
        print(f"当前线型: {dash_style}")

        # 设置线型为实线
        line_obj.line_dash = LineDash.solid

        # 设置线型为点划线
        line_obj.line_dash = LineDash.dashdot
        ```

        ### GetNote:
            - 返回值为LineDash枚举成员
            - 如果未设置，将返回默认值

        ### SetNote:
            - 参数必须是LineDash枚举成员
            - 设置后会同步到父级数据源，确保显示一致性
            - 可用值包括：solid(实线)、dash(虚线)、dot(点线)、dashdot(点划线)

#### `def line_dash(self, value)`

## 设置线型虚实样式

#### `def line_width(self) -> float` *(property)*

## 线条宽度

        - Get：
            - 获取当前列的线条宽度，
            - 从自身 _plotinfo.linestyle 中对应 sname 的 line_width 字段取值；
        - Set：
            - 设置当前列的线条宽度，
            - 参数需为正数（int/float），且会自动转为 float 类型；
            - 设置时先更新自身配置，再同步父级 source 的 _plotinfo.linestyle 中对应 sname 的 line_width，避免线宽不一致。

        Args:
            value (int | float): 线条宽度值，必须为大于0的数值

        Returns:
            float: 当前列的线条宽度（像素）

        ### 示例
        ```python
        # 获取当前线条宽度
        width = line_obj.line_width
        print(f"当前线宽: {width}像素")

        # 设置线条宽度为2像素
        line_obj.line_width = 2

        # 设置线条宽度为1.5像素
        line_obj.line_width = 1.5
        ```

        ### GetNote:
            - 返回值为浮点数，表示像素宽度
            - 如果未设置，将返回默认值

        ### SetNote:
            - 参数必须为大于0的数值
            - 会自动转换为float类型存储
            - 设置后会同步到父级数据源，确保显示一致性
            - 建议值范围：0.5-5.0，过大可能影响图表美观

#### `def line_width(self, value)`

## 设置线条宽度

#### `def line_color(self) -> Colors | str` *(property)*

## 线条颜色

        - Get：
            - 获取当前列的线条颜色，
            - 从自身 _plotinfo.linestyle 中对应 sname 的 line_color 字段取值；
        - Set：
            - 设置当前列的线条颜色，
            - 参数支持 Colors 枚举成员（如 Colors.RED）或合法十六进制字符串（如 "#FF0000"）；
            - 设置时先更新自身配置，再同步父级 source 的 _plotinfo.linestyle 中对应 sname 的 line_color，确保颜色统一。

        Args:
            value (Colors | str): 颜色值，支持Colors枚举成员或合法的十六进制颜色字符串

        Returns:
            Colors | str: 当前列的线条颜色

        ### 示例
        ```python
        # 获取当前线条颜色
        color = line_obj.line_color
        print(f"当前线条颜色: {color}")

        # 使用Colors枚举设置颜色
        line_obj.line_color = Colors.red

        # 使用十六进制字符串设置颜色
        line_obj.line_color = "#00FF00"

        # 使用颜色名称设置颜色
        line_obj.line_color = "blue"
        ```

        ### GetNote:
            - 返回值为Colors枚举成员或十六进制颜色字符串
            - 如果未设置，将返回默认值

        ### SetNote:
            - 参数必须是有效的Colors枚举成员或非空颜色字符串
            - 颜色字符串必须是合法的十六进制格式（如"#FF0000"）
            - 设置后会同步到父级数据源，确保显示一致性
            - 建议选择与背景对比明显的颜色以提高可读性

#### `def line_color(self, value)`

## 设置线条颜色

#### `def price_line(self) -> str | Colors` *(property)*

## 指标线价格水平线显示配置

        - 只适配lightweight_charts图表
        - 用于配置指标线/直方图是否显示价格水平线（在图表中指标价格水平线）
        - 支持两种使用方式，适配不同的配置场景：

        1. **链式调用**：为特定指标线单独设置价格标签显示状态
        2. **统一设置**：为当前指标实例下所有线统一设置价格标签显示状态

        Returns:
            LineAttrType: 线型属性配置对象，支持链式调用设置单个属性值

        ```python
        # 链式调用：为long_signal指标线开启价格水平线显示
        indicator.price_line.long_signal = True

        # 统一设置：为当前指标所有线关闭价格水平线显示
        indicator.price_line = False

#### `def price_line(self, value)`

#### `def price_label(self) -> str | Colors` *(property)*

## 指标线价格标签显示配置

        - 只适配lightweight_charts图表
        - 用于配置指标线/直方图是否显示价格标签（在图表中指标数值旁显示价格文本）
        - 支持两种使用方式，适配不同的配置场景：

        1. **链式调用**：为特定指标线单独设置价格标签显示状态
        2. **统一设置**：为当前指标实例下所有线统一设置价格标签显示状态

        Returns:
            LineAttrType: 线型属性配置对象，支持链式调用设置单个属性值

        ```python
        # 链式调用：为long_signal指标线开启价格标签显示
        indicator.price_label.long_signal = True

        # 统一设置：为当前指标所有线关闭价格标签显示
        indicator.price_label = False

#### `def price_label(self, value)`

#### `def signal_style(self) -> SignalStyle | None` *(property)*

## 信号完整样式配置（仅信号线有效）

        - Get：
            - 获取当前信号线的完整样式配置（SignalStyle 实例），
            - 仅当 _issignal 为 True（是信号线）时有效，否则返回 None；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的配置取值；
        - Set：
            - 设置当前信号线的完整样式配置，
            - 参数必须为 SignalStyle 实例，且仅当 _issignal 为 True 时生效；
            - 设置时先更新父级 source 的 _plotinfo.signalstyle 中对应 sname 的配置，再同步自身配置，确保信号样式一致。

        Args:
            value (SignalStyle): 信号样式对象，包含key、color、marker、show、size、label等属性

        Returns:
            SignalLabel | None: 当前信号线的完整样式配置对象，如果非信号线则返回None

        ### 示例
        ```python
        # 获取信号线完整样式
        signal_style = line_obj.signal_style
        if signal_style:
            print(f"信号颜色: {signal_style.color}, 标记: {signal_style.marker}")

        # 设置信号线完整样式
        line_obj.signal_style = SignalStyle(
            key="close",
            color=Colors.green,
            marker=Markers.circle,
            show=True,
            size=10
        )
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回SignalStyle对象引用，修改会影响原始配置

        ### SetNote:
            - 必须传入SignalStyle类型的实例
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保显示一致性
            - SignalLabel属性可配置：text(文字)、size(大小)、style(样式)、color(颜色)

#### `def signal_style(self, value)`

## 设置信号完整样式配置

#### `def signal_key(self) -> str | None` *(property)*

## 信号锚定的父级列名（仅信号线有效）

        - Get：
            - 获取当前信号线锚定的父级列名（如 "low" 表示信号标记在父级 low 列价格位置），
            - 仅当 _issignal 为 True 时有效；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的 key 字段取值；
        - Set：
            - 设置当前信号线锚定的父级列名，参数必须是父级 source.lines 中的有效列名（确保锚定列存在），
            - 且仅当 _issignal 为 True 时生效；
            - 设置时同步更新父级 source 和自身的 _plotinfo.signalstyle 中对应 sname 的 key，确保锚定列一致。

        Args:
            value (str): 父级列名，必须是source.lines中的有效列名

        Returns:
            str | None: 当前信号线锚定的父级列名，如果非信号线则返回None

        ### 示例
        ```python
        # 获取信号锚定列名
        key = line_obj.signal_key
        print(f"信号锚定在: {key}")

        # 设置信号锚定在最低价
        line_obj.signal_key = "low"

        # 设置信号锚定在收盘价
        line_obj.signal_key = "close"
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回值为字符串，表示锚定的父级数据列名

        ### SetNote:
            - 参数必须是父级source.lines中的有效列名
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保锚定位置一致

#### `def signal_key(self, value) -> None`

## 设置信号锚定列名

#### `def signal_color(self) -> str | None` *(property)*

## 信号标记颜色（仅信号线有效）

        - Get：
            - 获取当前信号线的标记颜色，仅当 _issignal 为 True 时有效；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的 color 字段取值；
        - Set：
            - 设置当前信号线的标记颜色，参数必须为 Colors 枚举成员，且仅当 _issignal 为 True 时生效；
            - 设置时同步更新父级 source 和自身的 _plotinfo.signalstyle 中对应 sname 的 color，确保信号颜色一致。

        Args:
            value (Colors): 颜色值，必须是Colors枚举成员

        Returns:
            str | None: 当前信号线的标记颜色，如果非信号线则返回None

        ### 示例
        ```python
        # 获取信号颜色
        color = line_obj.signal_color
        print(f"信号颜色: {color}")

        # 设置信号为红色
        line_obj.signal_color = Colors.red

        # 设置信号为绿色
        line_obj.signal_color = Colors.green
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回值为Colors枚举成员对应的颜色值

        ### SetNote:
            - 参数必须是有效的Colors枚举成员
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保颜色显示一致
            - 常用颜色：red(红)、green(绿)、blue(蓝)、orange(橙)

#### `def signal_color(self, value) -> None`

## 设置信号标记颜色

#### `def signal_marker(self) -> str | None` *(property)*

## 信号标记样式（仅信号线有效）

        - Get：
            - 获取当前信号线的标记样式（如 "circle" 圆形、"triangle_up" 上三角），
            - 仅当 _issignal 为 True 时有效；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的 marker 字段取值；
        - Set：
            - 设置当前信号线的标记样式，参数必须为 Markers 枚举成员，且仅当 _issignal 为 True 时生效；
            - 设置时同步更新父级 source 和自身的 _plotinfo.signalstyle 中对应 sname 的 marker，确保标记样式一致。

        Args:
            value (Markers): 标记样式，必须是Markers枚举成员

        Returns:
            str | None: 当前信号线的标记样式，如果非信号线则返回None

        ### 示例
        ```python
        # 获取信号标记样式
        marker = line_obj.signal_marker
        print(f"信号标记: {marker}")

        # 设置信号为圆形标记
        line_obj.signal_marker = Markers.circle

        # 设置信号为上三角形标记
        line_obj.signal_marker = Markers.triangle_up

        # 设置信号为星形标记
        line_obj.signal_marker = Markers.star
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回值为Markers枚举成员对应的标记样式

        ### SetNote:
            - 参数必须是有效的Markers枚举成员
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保标记样式一致
            - 常用标记：circle(圆形)、triangle_up(上三角)、triangle_down(下三角)、star(星形)

#### `def signal_marker(self, value) -> None`

## 设置信号标记样式

#### `def signal_show(self) -> bool | None` *(property)*

## 信号显示开关（仅信号线有效）

        - Get：
            - 获取当前信号线的显示状态（True 显示、False 隐藏），仅当 _issignal 为 True 时有效；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的 show 字段取值；
        - Set：
            - 设置当前信号线的显示状态，参数会自动转为 bool 类型，且仅当 _issignal 为 True 时生效；
            - 设置时同步更新父级 source 和自身的 _plotinfo.signalstyle 中对应 sname 的 show，确保显示状态一致。

        Args:
            value (Any): 显示状态，可以是任何可转换为布尔值的类型

        Returns:
            bool | None: 当前信号线的显示状态，如果非信号线则返回None

        ### 示例
        ```python
        # 获取信号显示状态
        is_show = line_obj.signal_show
        print(f"信号显示: {'是' if is_show else '否'}")

        # 显示信号
        line_obj.signal_show = True

        # 隐藏信号
        line_obj.signal_show = False

        # 使用数值控制显示
        line_obj.signal_show = 1  # 等同于True
        line_obj.signal_show = 0  # 等同于False
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回值为布尔类型，True表示显示，False表示隐藏

        ### SetNote:
            - 参数会自动转换为布尔类型
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保显示状态一致
            - 当值为0、空字符串等假值时转换为False，否则转换为True

#### `def signal_show(self, value) -> None`

## 设置信号显示开关

#### `def signal_size(self) -> float | None` *(property)*

## 信号标记大小（仅信号线有效）

        - Get：
            - 获取当前信号线的标记大小，仅当 _issignal 为 True 时有效；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的 size 字段取值；
        - Set：
            - 设置当前信号线的标记大小，参数需为正数（int/float），且仅当 _issignal 为 True 时生效；
            - 设置时同步更新父级 source 和自身的 _plotinfo.signalstyle 中对应 sname 的 size，确保标记大小一致。

        Args:
            value (int | float): 标记大小，必须是大于0的数值

        Returns:
            float | None: 当前信号线的标记大小，如果非信号线则返回None

        ### 示例
        ```python
        # 获取信号标记大小
        size = line_obj.signal_size
        print(f"信号标记大小: {size}")

        # 设置信号标记大小为8
        line_obj.signal_size = 8

        # 设置信号标记大小为12.5
        line_obj.signal_size = 12.5
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回值为浮点数，表示标记大小

        ### SetNote:
            - 参数必须是大于0的数值
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保标记大小一致
            - 建议值范围：5-20，过小不易识别，过大会影响图表美观

#### `def signal_size(self, value) -> None`

## 设置信号标记大小

#### `def signal_label(self) -> SignalLabel | bool | None` *(property)*

## 信号标签配置（仅信号线有效）

        - Get：
            - 获取当前信号线的标签配置（SignalLabel 实例，含文字、偏移、字体样式等），
            - 仅当 _issignal 为 True 时有效；
            - 从自身 _plotinfo.signalstyle 中对应 sname 的 label 字段取值；
        - Set：
            - 设置当前信号线的标签配置，参数可以是SignalLabel实例、字符串或布尔值，
            - 且仅当 _issignal 为 True 时生效；
            - 设置时同步更新父级 source 和自身的 _plotinfo.signalstyle 中对应 sname 的 label，确保标签配置一致。

        Args:
            value (SignalLabel | str | bool): 标签配置，可以是：
                - SignalLabel实例：完整标签配置
                - 字符串：标签文字内容
                - 布尔值：True启用默认标签，False禁用标签

        Returns:
        >>> SignalLabel | bool | None: 当前信号线的标签配置，可能是SignalLabel实例或布尔值

        ### 示例
        ```python
        # 获取信号标签配置
        label = line_obj.signal_label
        if isinstance(label, SignalLabel):
            print(f"标签文字: {label.text}, 大小: {label.size}")

        # 使用SignalLabel实例设置完整标签
        line_obj.signal_label = SignalLabel(
            text="买入信号",
            size=12,
            style="bold",
            color=Colors.red,
        )

        # 使用字符串设置标签文字
        line_obj.signal_label = "卖出信号"

        # 启用默认标签
        line_obj.signal_label = True

        # 禁用标签
        line_obj.signal_label = False
        ```

        ### GetNote:
            - 仅对信号线有效，非信号线返回None
            - 返回值可能是SignalLabel实例或布尔值（False表示无标签）

        ### SetNote:
            - 支持多种参数类型：SignalLabel实例、字符串、布尔值
            - 仅对信号线有效，非信号线设置无效
            - 设置后会同步到父级数据源，确保标签配置一致
            - 字符串参数：设置为标签文字，使用默认样式
            - 布尔值参数：True启用默认标签，False禁用标签

#### `def signal_label(self, value) -> None`

## 设置信号标签配置

#### `def set_label(self, text: str='', size: int=10, style: LabelStyle='bold', color: str='red') -> None`

## 快捷设置信号标签（仅信号线有效）

        ### 功能：
            - 简化信号标签配置流程，直接传入标签参数，自动构建/更新 SignalLabel 实例，并同步父级与自身配置；
            - 仅当 text 为非空字符串时生效（避免空标签）。

        Args:
            text (str): 标签文字内容（必填，非空才会执行设置）；
            size (int): 标签字体大小（单位：pt，内部自动拼接为 "XXpt" 格式）；
            style (Literal["normal", "bold"]): 标签字体样式（"normal" 正常，"bold" 加粗）；
            color (Colors): 标签字体颜色（支持 Colors 枚举成员或十六进制字符串）。

        Returns:
            None

        ### 示例
        ```python
        # 设置买入信号标签
        line_obj.set_label(
            text="买入",
            size=12,
            style="bold",
            color=Colors.red,
        )

        # 设置卖出信号标签
        line_obj.set_label(
            text="卖出",
            size=10,
            style="normal",
            color=Colors.green,
        )
        ```

        ### Note:
            - 仅对信号线有效，非信号线调用无效
            - text参数必须为非空字符串，否则不执行设置
            - 设置后会同步到父级数据源，确保标签显示一致
            - 系统默认设置：
                long_label = dict(size=10, style="bold", color="red")
                short_label = dict(size=10, style="bold", color="green")
                default_signal_label = {
                    "long_signal": SignalLabel("Long Entry", **long_label),    # 多头入场标签
                    "short_signal": SignalLabel("Short Entry", **short_label),  # 空头入场标签
                    "exitlong_signal": SignalLabel("Exit Long", **short_label),  # 多头离场标签
                    "exitshort_signal": SignalLabel("Exit Short", **long_label)  # 空头离场标签
                }

#### `def isplot(self) -> bool` *(property)*

## 绘图开关（与父级非蜡烛图源数据同步）

        - Get：
            - 获取当前列的绘图状态（True 绘图、False 不绘图），
            - 取值自父级 source.isplot 中对应 sname 的状态；
        - Set：
            - 设置当前列的绘图状态，参数会自动转为 bool 类型；
            - 仅当父级 source.category != "candles"（非蜡烛图数据）时，才同步更新父级 source.isplot 中对应 sname 的状态，
            - 同时更新自身 _plotinfo.isplot，确保绘图状态一致。

        Args:
            value (Any): 绘图开关状态，任何可转换为布尔值的类型

        Returns:
            bool: 当前列的绘图状态，True表示绘制，False表示不绘制

        ### 示例
        ```python
        # 获取当前列的绘图状态
        plot_status = line_obj.isplot
        print(f"当前列是否绘制: {'是' if plot_status else '否'}")

        # 启用当前列的绘制
        line_obj.isplot = True

        # 禁用当前列的绘制
        line_obj.isplot = False

        # 使用数值控制
        line_obj.isplot = 1  # 启用绘制
        line_obj.isplot = 0  # 禁用绘制
        ```

        ### GetNote:
            - 返回值为布尔类型，True表示该列在图表中绘制，False表示不绘制
            - 取值来源是父级数据源中对应列名的绘图设置

        ### SetNote:
            - 参数会自动转换为布尔类型
            - 仅对非蜡烛图数据有效（父级category != 'candles'）
            - 设置后会同步到父级数据源的对应列绘图设置，确保显示一致性
            - 对于蜡烛图数据，设置仅影响当前Line对象的_plotinfo，不与父级同步

#### `def isplot(self, value)`

## 设置绘图开关

#### `def source(self) -> IndFrame | KLine` *(property)*

## 父级源数据实例（只读）

        - 获取当前 Line 实例绑定的父级源数据（IndFrame 或 KLine 实例），用于访问父级其他列、合约信息等元数据；

        Returns:
            IndFrame | KLine: 当前Line实例绑定的父级源数据

        ### 示例
        ```python
        # 获取父级源数据
        parent_source = line_obj.source
        print(f"父级数据类型: {type(parent_source).__name__}")
        print(f"父级数据列: {parent_source.lines.tolist()}")

        # 通过父级源数据访问其他信息
        if isinstance(parent_source, KLine):
            print(f"合约代码: {parent_source.symbol}")
            print(f"数据频率: {parent_source.timeframe}")
        ```

        ### Note:
            - 此属性为只读，无setter，初始化时绑定后不可修改
            - 通过该属性可以访问父级的所有数据和方法
            - 对于IndFrame类型的父级，可以访问其他指标线
            - 对于KLine类型的父级，可以访问OHLC数据、合约信息等

#### `def overlap(self) -> bool` *(property)*

## 与主图重叠显示开关（与父级非蜡烛图源数据同步）

        - Get：
            - 获取当前列是否与主图重叠显示（True 重叠、False 单独显示），
            - 取值自父级 source.overlap 中对应 sname 的状态；
        - Set：
            - 设置当前列的重叠显示状态，参数会自动转为 bool 类型；
            - 仅当父级 source.iscandles 为 False（非蜡烛图数据）时，才同步更新父级 source.overlap 中对应 sname 的状态，
            - 同时更新自身 _plotinfo.overlap，确保重叠显示配置一致。

        Args:
            value (Any): 重叠显示开关状态，任何可转换为布尔值的类型

        Returns:
            bool: 当前列的重叠显示状态，True表示与主图重叠显示，False表示单独显示

        ### 示例
        ```python
        # 获取当前列的重叠显示状态
        overlap_status = line_obj.overlap
        print(f"当前列是否与主图重叠: {'是' if overlap_status else '否'}")

        # 设置当前列与主图重叠显示
        line_obj.overlap = True

        # 设置当前列单独显示（不重叠）
        line_obj.overlap = False

        # 对于非蜡烛图数据的设置效果
        if not line_obj.source.iscandles:
            line_obj.overlap = True  # 该设置会同步到父级
        ```

        ### GetNote:
            - 返回值为布尔类型，True表示与主图重叠显示，False表示单独显示
            - 取值来源是父级数据源中对应列名的重叠显示设置
            - 重叠显示适用于需要在同一坐标轴上叠加多个指标的情况

        ### SetNote:
            - 参数会自动转换为布尔类型
            - 仅对非蜡烛图数据有效（父级iscandles == False）
            - 设置后会同步到父级数据源的对应列重叠显示设置，确保显示一致性
            - 对于蜡烛图数据，设置仅影响当前Line对象的_plotinfo，不与父级同步
            - 重叠显示可以节省图表空间，但可能造成视觉混乱

#### `def overlap(self, value)`

## 设置重叠显示开关

#### `def follow(self) -> bool` *(property)*

## 主图跟随状态（只读，继承父级）

        - 获取当前列是否跟随主图显示（True 跟随、False 不跟随），优先继承父级 source.follow 属性（若父级有该属性），
        - 父级无 follow 属性时默认返回 True；

        Returns:
            bool: 当前列的主图跟随状态，True表示跟随主图，False表示不跟随

        ### 示例
        ```python
        # 获取当前列的主图跟随状态
        follow_status = line_obj.follow
        print(f"当前列是否跟随主图: {'是' if follow_status else '否'}")

        # 检查父级是否有follow属性
        if hasattr(line_obj.source, "follow"):
            print(f"父级follow属性值: {line_obj.source.follow}")
        else:
            print("父级没有follow属性，使用默认值True")
        ```

        ### Note:
            - 此属性为只读，无setter，状态完全由父级决定
            - 如果父级有follow属性，则继承该属性的值
            - 如果父级没有follow属性，则默认返回True
            - 跟随主图表示该列的显示范围、缩放等操作与主图同步
            - 常用于需要与主图价格坐标对齐的指标线


---

## SeriesType

IndFrame指标线Line转IndSeries
---

## LocalDatas

**继承**: `base`

本地CSV数据

---
