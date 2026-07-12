# 核心框架

## Bt

## 轻量级量化回测与实盘框架（minibt）核心类

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.7minibt_bt_class_intro/
    - K线回放：https://www.minibt.cn/minibt_basic/1.15minibt_kline_replay/
    - 实时图表：https://www.minibt.cn/minibt_basic/1.20minibt_lightweight_charts/

    ### 核心功能：
    - 1. 数据管理：手动/自动加载回测数据
    - 2. 策略管理：加载自定义策略、默认策略
    - 3. 实盘对接：天勤TqApi实盘/模拟盘连接
    - 4. 参数优化：支持遗传算法（GA）和贝叶斯优化（Optuna）
    - 5. 回测执行：单策略/多策略并行回测
    - 6. 结果分析：Bokeh可视化、QuantStats性能报告

    ### 标准使用流程：
    - → 1. 初始化Bt实例 
    - → 2. 添加数据（adddata）/策略（addstrategy）/实盘API（addTqapi）
    - → 3. （可选）参数优化（optstrategy） 
    - → 4. 执行回测/实盘（run） 
    - → 5. 结果分析（画图/报告）

    Args：
    >>> auto (bool): 是否自动加载全局资源（推荐生产环境手动添加，调试时可开启）
            - True：自动扫描全局变量中的有效回测数据（DataFrame）和天勤TqApi实例
            - False：仅使用手动添加的资源（addata/addTqapi等方法）
        live (bool): 是否启用实盘模式（默认False，即回测模式）
            - True：连接实盘/模拟盘，执行实时交易逻辑
            - False：基于历史数据执行回测
        replay (bool): 是否启用回放模式（用于策略回放测试，默认False）
        kwargs: 额外配置参数
            - quick_live (dict): 快速实盘配置字典，含'live'键（控制是否进入实盘模式）

    Examples:
    >>> if __name__ == "__main__":
            Bt().run()

### 方法

#### `def __init__(self, auto=True, live=False, replay=False, **kwargs) -> None`

初始化minibt回测/实盘框架实例，完成核心资源初始化与环境配置

        参数说明：
            auto (bool): 是否自动加载全局资源（推荐生产环境手动添加，调试时可开启）
                - True：自动扫描全局变量中的有效回测数据（DataFrame）和天勤TqApi实例
                - False：仅使用手动添加的资源（addata/addTqapi等方法）
            live (bool): 是否启用实盘模式（默认False，即回测模式）
                - True：连接实盘/模拟盘，执行实时交易逻辑
                - False：基于历史数据执行回测
            replay (bool): 是否启用回放模式（用于实策略回放测试，默认False）
        ** kwargs: 额外配置参数
                - quick_live (dict): 快速实盘配置字典，含'live'键（控制是否进入实盘模式）

        核心属性初始化：
            - 运行状态：记录框架启动时间（__start_time，用于统计总耗时）、回测/优化完成状态（__is_finish）、
            参数优化开关（__isoptimize）
            - 数据管理：存储回测数据列表（__datas，元素为pandas.DataFrame）
            - 策略管理：存储未实例化的策略类列表（strategy）、策略参数列表（__params）、多策略数量标记（__multi_num）
            - 实盘对接：天勤TqApi实例（_api，初始未连接）、实盘模式开关（__live）
            key为合约简称，value为全称，实盘时用于合约映射）

        自动加载资源逻辑（仅当auto=True时触发）：
            1. 回测数据加载（非实盘模式）：
                - 扫描全局变量中的DataFrame对象，筛选包含所有必要字段（FILED.ALL）的数据
                - 为符合条件的数据自动绑定全局变量名（便于识别），并存入__datas列表
            2. TqApi实例加载（实盘模式）：
                - 屏蔽天勤TqApi初始化时的冗余日志（通过重定向stdout实现）
                - 从全局变量中查找已初始化的TqApi实例，若存在则赋值给_api属性

#### `def addTqapi(self, tq_auth: tq_auth=None, tq_account: tq_account | None=None, api=None) -> Bt`

## 添加天勤实盘/模拟盘API连接（手动初始化TqApi）
        ---

        Args:
        ----
            tq_auth (_tq): 天勤用户认证信息（含username、password）
            tq_account (_tq, optional): 天勤实盘账户信息（含broker_id、account_id、password）
                                        - 非None：连接实盘账户
                                        - None：连接模拟盘（默认）
            api (TqApi, optional): 当无账户信息时可传入天勤API

#### `def adddata(self, *args, **kwargs: dict[str, pd.DataFrame]) -> Bt`

## 向回测系统添加数据，支持多种数据传入方式
        - 添加的据将存储在内部数据列表中，可用于后续回测分析。

        ### 该方法支持两种数据传入格式：
        - 1. 位置参数 (*args): 一个或多个未命名的DataFrame数据
        - 2. 关键字参数 (**kwargs): 多个已命名的DataFrame数据，格式为 name=DataFrame

        Args:
            *args: 可变位置参数，可接收一个或多个DataFrame对象。
                每个DataFrame必须包含回测所需的完整字段（由FILED.ALL定义）。
                这些数据会按顺序自动命名为"data0"、"data1"等。

            **kwargs: 可变关键字参数，接收以名称作为键、DataFrame作为值的字典。
                    键将作为数据的名称存储在DataFrame.name属性中。
                    例如：adddata(us_stock=df1, hk_stock=df2)

        Returns:
            Bt: 返回Bt实例自身，支持链式调用。

        Raises:
            ValueError: 当未传入任何数据时抛出
            TypeError: 当传入的数据不是DataFrame类型时抛出

        Examples:
            >>> bt = Bt()
            >>> df1 = pd.DataFrame(...)
            >>> df2 = pd.DataFrame(...)

            # 方式1: 使用位置参数
            >>> bt.adddata(df1, df2)

            # 方式2: 使用关键字参数命名数据
            >>> bt.adddata(main_data=df1, aux_data=df2)

            # 方式3: 混合使用
            >>> bt.adddata(df1, benchmark=df2)

            # 链式调用
            >>> bt.adddata(df1).adddata(df2).run()

#### `def addstrategy(self, *args: Strategy, **kwargs: dict) -> Bt`

## 添加策略类（手动加载自定义策略，支持多策略）

        Args:
            arg (Strategy): 策略类（必须是Strategy基类的子类，非实例）
            kwargs: 策略参数（list[dict]/dict，与策略类一一对应，用于批量传递参数）

        Returns:
            Bt: 返回Bt实例，支持链式调用

#### `def optstrategy(self, target: OPTTargetType='profit_ratio', weights: float | tuple[float]=1.0, opconfig: OpConfig | OptunaConfig | dict | list[dict]={}, op_method: OPTMethodType='optuna', show_bar=True, skip=False, **kwargs)`

## 策略参数优化配置（设置优化目标、方法、参数，不实际执行优化）

        ### 📘 **文档参考**:
        - https://www.minibt.cn/minibt_basic/1.5minibt_strategy_param_optimization/

        Note:
            kwargs 参数格式说明：
                - 数值范围（带步长）：range(1,10)（1到10步长1）、(10,30,2)（10到30步长2）
                - 固定选项：[3,5,8,13]（仅从列表中选择参数值）
                - 固定值：10（参数不参与优化，固定为该值）

        Args:
            target (str, optional): 优化目标（QuantStats性能指标），默认'profit_ratio'（盈利比）
                                    支持指标列表见函数内注释，部分指标需额外传参（如'compare'需传'benchmark'）
            weights (float | tuple[float], optional): 优化目标权重（默认1.0）
                                                     - 正数：最大化目标（如1.0表示最大化盈利比）
                                                     - 负数：最小化目标（如-1.0表示最小化最大回撤）
                                                     - 元组：多目标优化，权重与target一一对应
            opconfig (OpConfig | dict, optional): 优化配置参数（默认空dict）
                                                  - GA优化：传OpConfig实例或dict
                                                  - Optuna优化：传OptunaConfig实例或dict
            op_method (Literal['ga', 'optuna'], optional): 优化方法（默认'ga'）
                                                           - 'ga'：遗传算法（基于DEAP库）
                                                           - 'optuna'：贝叶斯优化（基于Optuna库）
            show_bar (bool, optional): 是否显示优化进度条（默认True）
            skip: (bool): True/False（是否跳过优化，默认False）
            kwargs: 待优化参数（格式见Note）
                path (str): 参数保存路径. 默认'./minibt/op_params/'

#### `def run(self, isplot=True, isreport: bool=False, **kwargs) -> Bt`

## 策略执行入口函数（根据配置自动识别运行模式：实盘交易/参数优化/回测分析）

        ### 本方法根据初始化配置自动选择运行模式：
        - 实盘交易模式 (live)
        - 参数优化模式 (optimize) 
        - 回测分析模式 (backtest)

        支持多策略并行回测及参数优化，完成后可生成可视化图表和分析报告。

        Args:
            isplot (bool, optional): 是否生成可视化图表（Bokeh）。默认为 True
            isreport (bool, optional): 是否生成QuantStats量化分析报告。默认为 False

        Kwargs:
            #### 多策略并行参数
            - model (str): 并行计算库选择，可选 ['dask','joblib','sklearn','multiprocessing']。默认为 'joblib'

            #### 可视化图表参数 (传递至 bokeh_plot)
            - trade_signal (bool): 是否显示交易信号标记（开仓/平仓点）。默认为 True
            - black_style (bool): 是否使用黑色主题风格（默认为白色主题）。默认为 False
            - plot_width (int): 图表显示宽度（像素值，默认全屏自适应）
            - plot_cwd (str): 图表文件存储目录路径。默认为当前工作目录
            - plot_name (str): 图表文件名称。默认为 ''
            - open_browser (bool): 是否在浏览器中自动打开图表（Jupyter中建议关闭）。默认为 False
            - save_plot (bool): 是否保存图表HTML文件。默认为 True

            #### 分析报告参数 (传递至 qs_reports)
            - report_cwd (str): 报告存储目录路径。默认为当前工作目录
            - report_name (str): 报告文件名称（默认自动生成）
            - report_height (int): 报告页面显示高度。默认为 800
            - show (bool): 是否在生成后立即显示报告。默认为 True
            - keep_temp (bool): 是否保留临时计算文件。默认为 True

            #### 可统一设置图表及报告文件存储目录路径及名称
            - cwd (str): 图表及报告文件存储目录路径。默认为当前工作目录
            - name (str): 图表及报告文件名称。默认为 ''

            #### 实盘交易参数
            - period_milliseconds (int): 实盘数据更新频率（毫秒）。默认为 0（实时更新）
            - update_length (int): 实盘和回收中更新数据的长度，若网络有延时，可设置更长的更新长度。默认为 10

            #### 账户信息参数
            - print_account (bool): 是否打印账户详细信息。默认为 False

        Returns:
            Bt: 返回当前Bt实例，支持链式调用

        Raises:
            AssertionError: 当未添加策略或实盘模式未初始化天勤API时抛出

#### `def bokeh_plot(self, trade_signal: bool=True, black_style: bool=False, open_browser: bool=False, plot_width: int=None, plot_cwd='', plot_name: str='', save_plot: bool=False, **kwargs) -> Tabs`

## 生成Bokeh交互式可视化图表（展示回测结果分析）

        本方法基于回测结果数据生成交互式图表，包含以下核心组件：
        - 价格走势图表（K线/折线）
        - 技术指标图表（如均线、MACD等）
        - 交易信号标记（开仓/平仓点）
        - 账户净值曲线

        Args:
            trade_signal (bool, optional): 是否显示交易信号标记（开仓/平仓点）。默认为 True
            black_style (bool, optional): 是否使用黑色主题风格（默认为白色主题）。默认为 False
            open_browser (bool, optional): 是否在浏览器中自动打开图表（Jupyter中建议关闭）。默认为 False
            plot_width (int, optional): 图表显示宽度（像素值，默认全屏自适应）
            plot_cwd (str, optional): 图表文件存储目录路径。默认为当前工作目录
            plot_name (str, optional): 图表文件名称（不含后缀）。默认为 'bokeh_plot'

        Returns:
            Tabs: 返回bokeh.models.Tabs

        Raises:
            UserWarning: 当策略尚未完成回测时发出警告

        Note:
            - 需先调用run()方法完成回测后再调用此方法
            - 图表默认保存为HTML文件，可在浏览器中交互查看
            - 多策略回测时可选择显示特定策略的图表

#### `def qs_reports(self, report_cwd: str='', report_name: str='', report_height: int=800, show: bool=True, keep_temp: bool=True, **kwargs) -> Bt`

## 生成QuantStats量化分析报告（支持多策略合并为单一HTML文件）

        本方法基于回测结果生成专业的QuantStats量化分析报告，包含以下核心分析模块：
        - 收益表现分析（年化收益、夏普比率、索提诺比率等）
        - 风险指标分析（最大回撤、波动率、VaR等）
        - 交易行为分析（胜率、盈亏比、持仓周期等）
        - 绩效归因分析（收益来源分解）
        - 可视化图表（收益曲线、回撤曲线、月度收益热力图等）

        支持多策略回测结果合并，生成统一的导航式报告页面。

        Args:
            report_cwd (str, optional): 报告存储目录路径。默认为当前工作目录
            report_name (str, optional): 报告文件名称（不含后缀）。默认为自动生成
            report_height (int, optional): 报告显示高度（像素值）。默认为 800
            show (bool, optional): 是否在生成后立即显示报告。默认为 True
            keep_temp (bool, optional): 是否保留临时生成的文件。默认为 False

        Returns:
            Bt: 返回当前Bt实例，支持链式调用

        Raises:
            ImportError: 当缺少必要依赖库时抛出
            PermissionError: 当无权限创建或写入目录时抛出
            ValueError: 当无有效报告可合并时抛出
            RuntimeError: 当保存合并报告失败时抛出

        Note:
            - 需先调用run()方法完成回测后再调用此方法
            - 多策略回测时会自动合并所有策略报告为单一HTML文件
            - 报告默认保存为HTML格式，可在浏览器中交互查看
            - Jupyter环境中会自动嵌入显示报告，非Jupyter环境会打开浏览器

#### `def get_results(self, select: int | str | list[int]='all') -> list[list[pd.DataFrame]]`

## 获取回测结果数据（DataFrame格式，含行情、交易、账户净值等）
        -------------

#### `def qs_stats(self, select: int=0) -> Stats`

## 获取QuantStats性能统计对象（支持调用多种性能/风险指标方法）

        ### Method:支持的指标方法包括（部分）
            - 收益类：profit_ratio（盈利比）、cagr（年化收益率）、avg_return（平均收益率）
            - 风险类：max_drawdown（最大回撤）、volatility（波动率）、var（风险价值）
            - 风险收益比：sharpe（夏普率）、sortino（索提诺率）、calmar（卡玛率）
            - 其他：win_rate（胜率）、consecutive_wins（最大连续盈利次数）、drawdown_details（回撤详情）

        Args:
            select (int, optional): 策略索引（多策略时选择，默认0）. Defaults to 0.

        Returns:
            Stats: QuantStats统计对象（可调用上述指标方法）

#### `def qs_plot(self, select: int=0) -> QSPlots`

## 获取QuantStats可视化对象（支持绘制多种回测结果图表）

        ### Method:支持的绘图方法包括（部分）
            - returns（收益率曲线）、drawdown（回撤曲线）、histogram（收益率分布直方图）
            - monthly_heatmap（月度收益热力图）、rolling_sharpe（滚动夏普率）
            - yearly_returns（年度收益率）、distribution（收益分布）

        Args:
            select (int, optional): 策略索引（多策略时选择，默认0）. Defaults to 0.

        Returns:
            QSPlots: QuantStats可视化对象（可调用上述绘图方法）

#### `def qs_metrics(self, benchmark=None, rf=0.0, display=True, mode='basic', sep=False, compounded=True, periods_per_year=252, prepare_returns=True, match_dates=False, **kwargs)`

## 生成QuantStats指标报告（仅数值指标，无图表）
        包括收益率、风险、风险收益比等核心指标

#### `def qs_plots(self, benchmark=None, grayscale=False, figsize=(8, 5), mode='basic', compounded=True, periods_per_year=252, prepare_returns=True, match_dates=False)`

## 生成QuantStats可视化报告（仅图表，无数值指标）
        包括收益率曲线、回撤曲线、收益分布等图表

#### `def qs_basic(self, benchmark=None, rf=0.0, grayscale=False, figsize=(8, 5), display=True, compounded=True, periods_per_year=252, match_dates=False)`

## 生成QuantStats基础报告（简化版，含核心指标和关键图表）

#### `def qs_full(self, benchmark=None, rf=0.0, grayscale=False, figsize=(8, 5), display=True, compounded=True, periods_per_year=252, match_dates=False)`

## 生成QuantStats完整报告（详细版，含所有指标、图表、分析结论）

#### `def qs_html(self, benchmark=None, rf=0.0, grayscale=False, title='Strategy Tearsheet', output=None, compounded=True, periods_per_year=252, download_filename='quantstats-tearsheet.html', figfmt='svg', template_path=None, match_dates=False, **kwargs)`

## 生成HTML格式QuantStats报告（可在浏览器打开/保存，支持分享）

#### `def qs_iDisplay(self, *objs, include=None, exclude=None, metadata=None, transient=None, display_id=None, **kwargs)`

## Jupyter Notebook中交互式显示QuantStats报告（支持动态更新）

#### `def qs_iHTML(self, data=None, url=None, filename=None, metadata=None)`

## Jupyter Notebook中显示HTML格式QuantStats报告（支持本地/远程HTML）


---

## Strategy

**继承**: `Base` → `StrategyBase`

## 量化交易策略核心基类（继承Base基础类、StrategyBase策略接口类和StrategyMeta元类）

    ### 📘 **文档参考**:
    - 类简介：https://www.minibt.cn/minibt_basic/1.8minibt_strategy_class_guide/

    ### 核心定位：
    - 统一封装量化交易的回测、实盘、参数优化、强化学习（RL）等全流程能力，提供标准化接口供用户自定义策略逻辑

    ### 主要功能：
    - 1. 策略生命周期管理：包含初始化、数据准备、回测运行、结果输出、实盘启动等完整流程
    - 2. 多周期数据处理：支持 K 线周期转换（resample 重采样、replay 数据回放），解决多周期策略的数据对齐问题
    - 3. 指标与数据管理：自动收录自定义指标（IndSeries/IndFrame）与 K 线数据（KLine），维护数据一致性
    - 4. 参数优化：支持策略参数批量优化，自动计算优化目标（如收益率、夏普比率）
    - 5. 强化学习集成：对接 elegantrl 框架，支持 RL 智能体训练、加载与预测，含数据增强、特征处理能力
    - 6. 实盘与回测兼容：统一接口适配回测（基于 BtAccount 虚拟账户）与实盘（基于天勤 TQApi 账户）

    ### **使用示例：**
    >>> from minibt import *
        class MA(Strategy):
            params = dict(length1=10, length2=20)  # 策略参数
            def __init__(self):
                # 1. 获取回测数据
                self.data = self.get_kline(LocalDatas.test)
                # 2. 计算指标
                self.ma1 = self.data.close.sma(self.params.length1)
                self.ma2 = self.data.close.sma(self.params.length2)
                # 3. 定义交易信号
                self.long_signal = self.ma1.cross_up(self.ma2)  # MA1上穿MA2：开多信号
                self.short_signal = self.ma2.cross_down(
                    self.ma1)  # MA2下穿MA1：开空信号
            def next(self):
                # 无持仓时：根据信号开仓
                if not self.data.position:
                    if self.long_signal.new:
                        self.data.buy()  # 开多
                    elif self.short_signal.new:
                        self.data.sell()  # 开空
                # 有多头持仓时：空头信号平仓
                elif self.data.position > 0 and self.short_signal.new:
                    self.sell()  # 平多
                # 有空头持仓时：多头信号平仓
                elif self.data.position < 0 and self.long_signal.new:
                    self.buy()  # 平空
        if __name__ == "__main__":
            bt = Bt(auto=True)  # 初始化回测引擎（自动加载策略）
            bt.run()  # 启动策略

### 方法

#### `def __init__(self: Strategy, *args, **kwargs)`

## 策略实例初始化（入口方法）

        ### 核心作用：
        - 注册实例到全局管理集合、初始化配置/参数、绑定自定义属性

        Args:
            *args: 额外位置参数（预留扩展）
            **kwargs: 额外关键字参数（用于动态设置属性，如自定义指标、数据）

        ### 逻辑说明：
        1. 提取策略类名，将当前实例注册到全局策略实例集合（便于框架管理）
        2. 初始化策略配置：优先使用类自定义config，无则用框架默认btconfig
        3. 初始化策略参数：转换为Addict类型（支持属性式访问，如self.params.length1）
        4. 绑定kwargs属性：将用户传入的自定义数据/指标设为实例属性

#### `def resample(self, cycle: int, data: KLine=None, rule: str=None, **kwargs) -> KLine`

## 对外暴露的K线周期转换接口（低→高周期）
        ### 核心作用：
        - 提供标准化接口，将指定K线数据转换为目标高周期，返回KLine实例

        Args:
            cycle (int): 目标高周期（秒），必须大于原始周期且为原始周期的倍数
            data (KLine, optional): 待转换的原始K线数据，默认使用主数据. Defaults to None.
            rule (str, optional): 时间规则（如'D'=日、'W'=周，用于日以上周期）. Defaults to None.

        Kwargs:
            online (bool): 是否在线获取多周期数据（True时从TQApi获取，默认True）

        Returns:
            KLine: 转换后的高周期K线数据实例

        ### 关键校验：
        1. 周期必须为整数
        2. 目标周期必须大于原始周期且为原始周期的倍数

#### `def replay(self, cycle: int, data: KLine=None, rule: str=None, **kwargs) -> KLine`

## 对外暴露的数据回放接口（高→低周期）
        ### 核心作用：
        - 将高周期K线数据回放为低周期，模拟实时行情，返回KLine实例（实盘模式不生效）

        Args:
            cycle (int): 目标低周期（秒），必须大于原始周期且为原始周期的倍数
            data (KLine, optional): 待回放的高周期K线数据，默认使用主数据. Defaults to None.
            rule (str, optional): 时间规则（如'D'=日、'W'=周）. Defaults to None.

        Returns:
            KLine: 回放后的低周期K线数据实例

        ### 关键校验：
        1. 周期必须为整数
        2. 目标周期必须大于原始周期且为原始周期的倍数

#### `def wait_update(self, deadline=60) -> bool`

#### `def btind_like(self, ds: IndSeries | IndFrame | tuple[int] | int, **kwargs) -> IndSeries | IndFrame`

## 创建自定义指标的工具方法（初始化全NaN数据）
        ### 核心作用：
        - 根据参考数据或维度，生成结构一致的全NaN指标（IndSeries/IndFrame），供用户后续赋值

        ### 适用场景：
        - 手动计算自定义指标（如动态止损价、自定义信号）
        - 确保自定义指标与参考数据（如K线、其他指标）结构一致

        Args:
            ds (Union[IndSeries, IndFrame, tuple[int], int]): 参考数据或维度：
                - IndSeries/IndFrame：生成与参考指标结构（长度、列数）一致的指标
                - tuple[int]：维度元组（如(100, 2)表示100行2列）
                - int：长度（生成1列、指定长度的IndSeries）

        ### Kwargs:
            指标属性配置（如lines=列名、category=指标分类、isplot=是否绘图等，同IndSetting）

        Returns:
            Union[IndSeries, IndFrame]: 全NaN的自定义指标（IndSeries对应1列，IndFrame对应多列）

        ### 示例：
        >>> # 1. 参考MA指标生成自定义止损价指标（同长度）
        >>> self.ma5 = self.data.close.ema(5)
        >>> self.stop_price = self.btind_like(self.ma5, name='stop_price', isplot=True)
        >>> # 2. 手动赋值止损价（如MA5*0.98）
        >>> self.stop_price[:] = self.ma5 * 0.98
        >>> 
        >>> # 3. 按维度生成2列、100行的自定义指标
        >>> self.custom_ind = self.btind_like((100, 2), lines=['ind1', 'ind2'], category='momentum')

#### `def get_signal_features(self) -> np.ndarray | None`

## 获取用于强化学习的信号特征

        - 当启用强化学习（rl=True）时，通过__process_quant_features处理特征，
        - 返回处理后的特征数组（numpy格式），否则返回None

#### `def set_process_quant_features(self, normalize_method: Literal['standard', 'robust', 'minmax', 'rolling']='robust', rolling_window: int=60, feature_range: tuple=(-1, 1), use_log_transform: bool=True, handle_outliers: str='clip', pca_n_components: float=1.0, target_returns: np.ndarray | None=None)`

## 量化交易特征处理函数，整合归一化、异常值处理、特征变换和降维
        - 存储特征处理的各项参数，后续调用get_signal_features时会使用这些参数处理特征
        Args:
            features: 原始特征数组，形状为(时间步, 特征数)
            normalize_method: 归一化方法：
                - 'standard': 均值为0、标准差为1（对极端值敏感）
                - 'robust': 中位数为0、四分位距为1（抗极端值）
                - 'minmax': 缩放到指定范围（保留相对大小）
                - 'rolling': 滚动窗口内标准化（避免未来数据泄露）
            rolling_window: 滚动窗口大小（仅当normalize_method='rolling'时有效）
            feature_range: MinMaxScaler的缩放范围（仅当normalize_method='minmax'时有效）
            use_log_transform: 是否对非负特征应用对数变换（压缩长尾分布）
            handle_outliers: 异常值处理方式：
                - 'clip': 截断到合理范围（四分位法）
                - 'mark': 新增异常值标记特征（0/1）
            pca_n_components: PCA降维参数（0~1表示保留信息量比例，>1表示保留特征数）
            target_returns: 目标收益率数组（用于过滤低相关特征，可选）

        Returns:
            处理后的特征数组，形状为(时间步, 处理后特征数)

#### `def data_enhancement(self, obs: np.ndarray, rate: float=0.5) -> np.ndarray`

## 随机应用一种数据增强方法（概率由rate控制）

        - 用于强化学习中的数据增强，防止模型过拟合。首次调用时加载增强函数库，
        - 之后按概率随机选择一种增强方法对输入特征进行处理

        Args:
            obs (np.ndarray): 输入的特征数据（多维数组）
            rate (float): 应用增强的概率，默认0.5

        Returns:
            np.ndarray: 处理后的一维特征数组（增强后或原数组展平）

#### `def set_model_params(self, agent=None, train: bool=True, continue_train: bool=False, random_policy_test: bool=False, window_size: int=10, env_name: str='', num_envs: int=1, max_step: int=0, state_dim: int=0, action_dim: int=0, if_discrete: bool=True, break_step: int=1000000.0, batch_size: int=128, horizon_len: int=2048, buffer_size: int=None, repeat_times: float=8.0, if_use_per: bool=False, gamma: float=0.985, reward_scale: float=1.0, net_dims: tuple[int]=(64, 32), learning_rate: float=6e-05, weight_decay: float=0.0001, clip_grad_norm: float=0.5, state_value_tau: float=0.0, soft_update_tau: float=0.005, save_gap: int=8, ratio_clip: float=0.25, lambda_gae_adv: float=0.95, lambda_entropy: float=0.01, eps: float=1e-05, momentum: float=0.9, lr_decay_rate: float=0.999, gpu_id: int=0, num_workers: int=4, num_threads: int=8, random_seed: int | None=42, learner_gpu_ids: tuple[int]=(), cwd: str | None=None, if_remove: bool=True, break_score: float=np.inf, if_keep_save: bool=True, if_over_write: bool=False, if_save_buffer: bool=False, eval_times: int=3, eval_per_step: int=20000.0, eval_env_class=None, eval_env_args=None, eval_record_step: int=0, Loss=None, Optim=None, LrScheduler=None, SWA=None, Activation=None, swa_start_epoch_progress: float=0.8, Norm=None, dropout_rate: float=0.0, bias: bool=True, actor_path: str='', actor_name: str='', file_extension: str='.pth', **params)`

## 配置强化学习模型参数并初始化训练环境
        - 本方法用于设置强化学习算法的各项参数，包括环境配置、网络结构、训练超参数、
        - 优化器设置等，并初始化强化学习训练配置对象。支持多种强化学习算法和自定义组件。

        ### 📘 **文档参考**:
        - https://www.minibt.cn/minibt_reinforcement_learning/4.1reinforcement_learning_for_quantitative_trading_with_minibt/

        Args:
            agent (str, optional): 强化学习算法名称。默认为 None
            train (bool, optional): 是否进入训练模式。默认为 True
            continue_train (bool, optional): 是否继续之前的训练。默认为 False
            random_policy_test (bool, optional): 是否进行随机策略测试。默认为 False
            window_size (int, optional): 状态观察窗口大小。默认为 10
            env_name (str, optional): 环境名称。默认为空字符串
            num_envs (int, optional): 并行环境数量。默认为 1
            max_step (int, optional): 最大步数限制。默认为 0（使用数据集最大长度）
            state_dim (int, optional): 状态空间维度。默认为 0（自动计算）
            action_dim (int, optional): 动作空间维度。默认为 0（自动计算）
            if_discrete (bool, optional): 是否为离散动作空间。默认为 True
            break_step (int, optional): 训练中断步数。默认为 1e6
            batch_size (int, optional): 训练批次大小。默认为 128
            horizon_len (int, optional): 经验收集长度。默认为 2048
            buffer_size (int, optional): 经验回放缓冲区大小。默认为 None（使用数据集长度）
            repeat_times (float, optional): 策略更新重复次数。默认为 8.0
            if_use_per (bool, optional): 是否使用优先经验回放。默认为 False
            gamma (float, optional): 折扣因子。默认为 0.985
            reward_scale (float, optional): 奖励缩放因子。默认为 1.0
            net_dims (tuple[int], optional): 神经网络隐藏层维度。默认为 (64, 32)
            learning_rate (float, optional): 学习率。默认为 6e-5
            weight_decay (float, optional): 权重衰减系数。默认为 1e-4
            clip_grad_norm (float, optional): 梯度裁剪阈值。默认为 0.5
            state_value_tau (float, optional): 状态价值函数平滑参数。默认为 0.0
            soft_update_tau (float, optional): 目标网络软更新参数。默认为 5e-3
            save_gap (int, optional): 模型保存间隔（回合数）。默认为 8
            ratio_clip (float, optional): PPO算法裁剪比率。默认为 0.25
            lambda_gae_adv (float, optional): GAE优势估计参数。默认为 0.95
            lambda_entropy (float, optional): 熵奖励系数。默认为 0.01
            eps (float, optional): 数值稳定性参数。默认为 1e-5
            momentum (float, optional): 动量参数。默认为 0.9
            lr_decay_rate (float, optional): 学习率衰减率。默认为 0.999
            gpu_id (int, optional): 使用的GPU设备ID。默认为 0
            num_workers (int, optional): 数据加载工作线程数。默认为 4
            num_threads (int, optional): 计算线程数。默认为 8
            random_seed (int, optional): 随机种子。默认为 42
            learner_gpu_ids (tuple[int], optional): 学习者GPU设备ID列表。默认为空元组
            cwd (str, optional): 工作目录路径。默认为 None
            if_remove (bool, optional): 是否移除旧模型文件。默认为 True
            break_score (float, optional): 训练中断分数阈值。默认为无穷大
            if_keep_save (bool, optional): 是否保存检查点。默认为 True
            if_over_write (bool, optional): 是否覆盖已有模型。默认为 False
            if_save_buffer (bool, optional): 是否保存经验缓冲区。默认为 False
            eval_times (int, optional): 评估次数。默认为 3
            eval_per_step (int, optional): 评估间隔步数。默认为 2e4
            eval_env_class (type, optional): 评估环境类。默认为 None
            eval_env_args (dict, optional): 评估环境参数。默认为 None
            eval_record_step (int, optional): 评估记录步数。默认为 0
            Loss (class, optional): 自定义损失函数类。默认为 None
            Optim (class, optional): 自定义优化器类。默认为 None
            LrScheduler (class, optional): 自定义学习率调度器类。默认为 None
            SWA (class, optional): 随机权重平均类。默认为 None
            Activation (class, optional): 自定义激活函数类。默认为 None
            swa_start_epoch_progress (float, optional): SWA开始训练进度。默认为 0.8
            Norm (class, optional): 归一化层类。默认为 None
            dropout_rate (float, optional): Dropout比率。默认为 0.0
            bias (bool, optional): 是否使用偏置项。默认为 True
            actor_path (str, optional): 预训练Actor模型路径。默认为空字符串
            actor_name (str, optional): Actor模型名称。默认为空字符串
            file_extension (str, optional): 模型文件扩展名。默认为 ".pth"
            **params: 其他关键字参数

        Returns:
            Config: 强化学习训练配置对象，包含所有设置的参数

        Raises:
            AssertionError: 当指定的agent不在支持的算法列表中时抛出

        ### Note:
            - 本方法会自动计算状态和动作维度，无需手动指定
            - 支持多种强化学习算法，包括PPO、DDPG、SAC等
            - 提供丰富的自定义选项，包括网络结构、优化器、损失函数等
            - 设置完成后，返回的Config对象可直接用于训练过程

#### `def random_policy_test(self)`

## 随机策略测试，用于验证环境和动作空间的有效性

        - 该方法通过随机采样动作来与环境交互，输出总奖励、步数和动作分布统计，
        - 可用于判断环境是否正常工作以及动作空间设置是否合理

#### `def train_agent(self, **kwargs)`

## 启动强化学习智能体训练，调用底层训练函数

#### `def load_agent(self)`

## 加载智能体模型用于推理


---

## Config

## 策略设置

    >>> value: float = 1000_000.
        margin_rate: float = 0.05
        tick_commission: float = 0.
        percent_commission: float = 0.
        fixed_commission: float = 1.
        min_start_length: int = 0
        islog: bool = False
        isplot: bool = True
        clear_gap: bool = False
        data_segments: Union[float, int] = 1.
        slip_point = 0.
        print_account: bool = True
        key: str = 'datetime'
        start_time = None
        end_time = None
        time_segments: Union[time] = None
        profit_plot: bool = True
        click_policy: Literal["hide", "mute"] = "hide"
        take_time: bool = True
        on_close: bool = True

### 方法

#### `def logger_params_is_change(self) -> bool` *(property)*

#### `def logger_params(self) -> tuple` *(property)*


---

## OptunaConfig
*此 API 为模块级导出，详请参见源码。*


---

## FILED

*位于 `minibt/utils.py`*

此 API 为模块级导出（函数/变量/实例），请参考源码。

---

## options

*位于 `minibt/utils.py`*

此 API 为模块级导出（函数/变量/实例），请参考源码。

---

## Multiply

## 指标信息
    - 引用于多线程计算

    Args:
        func: Callable     :指标函数
        params: dict       :指标参数
        data: Any | KLine :指标数据

    Examples:
    >>> self.ebsw, self.ma1, self.ma2, self.buy_signal, self.sell_signal, self.ema40 = self.multi_apply(
            Multiply(Ebsw, data=self.data),
            [self.data.sma, dict(length=20),],
            [self.data.sma, dict(length=30),],
            [self.test1.t1.cross_up, dict(b=self.test1.t2)],
            [self.test1.t1.cross_down, dict(b=self.test1.t2),],
            Multiply(PandasTa.ema, dict(length=40), data=self.data))
            Multiply(PandasTa.ema, dict(length=20), self.data)

### 方法

#### `def values(self) -> tuple[Callable, dict, KLine]` *(property)*

## 返回计算指标信息


---
