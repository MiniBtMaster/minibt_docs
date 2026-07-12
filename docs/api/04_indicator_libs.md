# 第三方指标库

## PandasTa

## pandas_ta指标指引
    - pandas_ta 指标适配类，用于将 pandas_ta 库中的技术指标计算结果转换为框架内置的指标数据类型（IndSeries/IndFrame）

    ### 📘 **API文档参考**:
    - https://www.minibt.cn/minibt_api_reference/pandasta/

    ### 核心功能：
    - 封装 pandas_ta 库的各类技术指标，提供统一的调用接口
    - 通过 @tobtind 装饰器自动处理指标参数校验、计算逻辑调用和返回值转换，确保输出为框架兼容的 IndSeries 或 IndFrame
    - 支持多维度技术分析场景，覆盖蜡烛图形态、趋势跟踪、动量判断、波动率计算等量化交易核心需求
    - 内置指标分类体系，便于按业务场景快速定位和调用目标指标

    ### 指标分类与包含列表：
    该类支持的指标按功能划分为以下 9 大类，具体包含指标如下：

    **1. 蜡烛图分析（Candles）**
       - 功能：蜡烛图形态识别、特殊蜡烛图转换（如布林带K线、Z评分标准化蜡烛图）
       - 包含指标：cdl_pattern（蜡烛图形态识别）、cdl_z（Z评分标准化蜡烛图）、ha（Heikin-Ashi布林带K线）

    **2. 周期分析（Cycles）**
       - 功能：识别市场价格的周期性规律，辅助判断趋势转折节点
       - 包含指标：ebsw（周期检测指标）

    **3. 动量指标（Momentum）**
       - 功能：衡量价格变化的速度和力度，判断趋势强度与潜在反转
       - 包含指标：ao、apo、bias、bop、brar、cci、cfo、cg、cmo、coppock、cti、er、eri、fisher、
       - inertia、kdj、kst、macd、mom、pgo、ppo、psl、pvo、qqe、roc、rsi、rsx、rvgi、slope、smi、
       - squeeze、squeeze_pro、stc、stoch、stochrsi、td_seq、trix、tsi、uo、willr

    **4. 重叠指标（Overlap）**
       - 功能：通过价格平滑、均线拟合等方式，凸显价格趋势方向
       - 包含指标：alma、dema、ema、fwma、hilo、hl2、hlc3、hma、ichimoku、jma、kama、linreg、
       - mcgd、midpoint、midprice、ohlc4、pwma、rma、sinwma、sma、ssf、supertrend、swma、t3、
       - tema、trima、vidya、vwap、vwma、wcp、wma、zlma

    **5. 收益指标（Performance）**
       - 功能：计算资产的收益情况，量化投资回报表现
       - 包含指标：log_return（对数收益）、percent_return（百分比收益）

    **6. 统计指标（Statistics）**
       - 功能：基于统计方法分析价格分布特征、离散程度等
       - 包含指标：entropy（熵值）、kurtosis（峰度）、mad（平均绝对偏差）、median（中位数）、
       - quantile（分位数）、skew（偏度）、stdev（标准差）、tos_stdevall（全维度标准差）、
       - variance（方差）、zscore（Z评分）

    **7. 趋势指标（Trend）**
       - 功能：识别和确认价格趋势方向、强度及持续时间
       - 包含指标：adx、amat、aroon、chop、cksp、decay、decreasing（下跌趋势）、dpo、
       - increasing（上涨趋势）、long_run（长期趋势）、psar、qstick、short_run（短期趋势）、
       - tsignals（趋势信号）、ttm_trend、vhf、vortex、xsignals（扩展趋势信号）

    **8. 波动率指标（Volatility）**
       - 功能：衡量价格波动的剧烈程度，评估市场风险
       - 包含指标：aberration、accbands、atr（平均真实波幅）、bbands（布林带）、
       - donchian（唐奇安通道）、hwc、kc（肯特纳通道）、massi、natr（归一化平均真实波幅）、
       - pdist、rvi、thermo、true_range（真实波幅）、ui

    **9. 成交量指标（Volume）**
       - 功能：结合成交量数据分析资金流向，辅助判断价格走势的有效性
       - 包含指标：ad（积累/派发指标）、adosc（震荡指标）、aobv（绝对OBV）、cmf（资金流向指数）、
       - efi（资金效率指标）、eom（资金流动指数）、kvo（成交量震荡指标）、mfi（资金流量指标）、
       - nvi（负成交量指数）、obv（能量潮指标）、pvi（正成交量指数）、pvol（价格成交量指标）、
       - pvr（价格成交量比率）、pvt（价格成交量趋势）


    ### 使用说明：
    1. 初始化：
    - 传入框架支持的 IndSeries 或 IndFrame 数据对象（需包含指标计算所需的基础字段，如 open、high、low、close、volume 等）
    >>> data = IndFrame(...)  # 框架内置数据对象（含OHLCV等基础字段）
    >>> ta = PandasTa(data)

    2. 指标调用：
    - 直接调用对应指标方法，传入必要参数（默认参数已适配常见场景，可按需调整）
    >>> #示例1：识别十字星蜡烛图形态
    >>> #返回框架内置IndFrame，含十字星形态识别结果
    >>> doji_result = self.data.cdl_pattern(name="doji")
    >>> #示例2：计算Heikin-Ashi布林带K线
    >>> ha_candles = self.data.ha()  # 返回框架内置IndFrame，含HA蜡烛图的open、high、low、close字段
    >>> #示例3：计算14期RSI动量指标
    >>> rsi_14 = self.data.close.rsi(length=14)  # 返回框架内置IndSeries，含14期RSI值

    3. 返回值特性：
    - 所有方法返回框架内置的 IndSeries 或 IndFrame 类型，可直接用于后续策略逻辑（如信号生成、风险控制），无需额外类型转换


    ### 注意事项：
    - 部分指标需特定基础字段（如成交量指标需 volume 字段），调用前确保输入数据包含所需字段
    - 指标参数（如 length 周期）可通过方法参数调整，未指定时使用 pandas_ta 默认值
    - 可通过 @tobtind 装饰器的 kwargs 参数配置填充缺失值（fillna）、数据偏移（offset）等辅助功能

### candles

| 方法 | 签名 | 说明 |
|------|------|------|
| `cdl_z` | `cdl_z(self, length=30, full=False, ddof=1, offset=None, **kwargs) -> IndFrame` | Z分数标准化蜡烛图 (Candle Type: Z) |
| `ha` | `ha(self, length=0, offset=0, **kwargs) -> IndFrame` | 平均K线图 (Heikin Ashi Candles) |
| `lrc` | `lrc(self, length=11, **kwargs) -> IndFrame` | 线性回归蜡烛图 (Linear Regression Candles) |
| `abc` | `abc(self, lim: float=5.0, **kwargs) -> IndFrame` | ABC模式识别 (ABC Pattern Recognition) |
| `cdl_doji` | `cdl_doji(self, length: int=10, factor: int | float=100, scalar: int | float=100, asint: bool=True, offset: int=0, **kwargs) -> IndSeries` | 十字星形态 (Doji) |
| `cdl_inside` | `cdl_inside(self, asbool: bool=False, scalar: int | float=100, offset: int=0, **kwargs) -> IndSeries` | 内含线形态 (Inside Bar) |
| `cdl` | `cdl(self, name: str | list[str]='all', scalar: int | float=100, offset: int=0, **kwargs) -> IndFrame` | 蜡烛图形态识别 (Candle Pattern) |

### cycles

| 方法 | 签名 | 说明 |
|------|------|------|
| `reflex` | `reflex(self, length: int=20, smooth: int=20, alpha: int | float=0.04, pi: int | float=3.14159, sqrt2: int | float=1.414, offset: int=0, **kwargs) -> IndSeries` | 迟滞降低周期指标 (Reflex) |

### momentum

| 方法 | 签名 | 说明 |
|------|------|------|
| `crsi` | `crsi(self, rsi_length: int=3, streak_length: int=2, rank_length: int=100, scalar: int | float=100, talib: bool=True, drift: int=1, offset: int=0, **kwargs) -> IndSeries` | 康纳斯相对强弱指数 (Connors RSI) |
| `exhc` | `exhc(self, length: int=4, cap: int=13, asint: bool=False, show_all: bool=False, nozeros: bool=False, offset: int=0, **kwargs) -> IndFrame` | 衰竭计数 (Exhaustion Count) |
| `smc` | `smc(self, abr_length: int=14, close_length: int=50, vol_length: int=20, percent: int=5, vol_ratio: int | float=1.5, asint: bool=True, mamode: str='sma', talib: bool=True, offset: int=0, **kwargs) -> IndFrame` | 聪明钱概念 (Smart Money Concept) |
| `stochf` | `stochf(self, k: int=14, d: int=3, mamode: str='sma', talib: bool=True, offset: int=0, **kwargs) -> IndFrame` | 快速随机指标 (Fast Stochastic) |
| `tmo` | `tmo(self, tmo_length: int=14, calc_length: int=5, smooth_length: int=3, momentum: bool=False, normalize: bool=False, exclusive: bool=False, mamode: str='ema', offset: int=0, **kwargs) -> IndFrame` | 真实动量振荡器 (True Momentum Oscillator) |

### overlap

| 方法 | 签名 | 说明 |
|------|------|------|
| `alligator` | `alligator(self, jaw: int=13, teeth: int=8, lips: int=5, talib: bool=True, offset: int=0, **kwargs) -> IndFrame` | 比尔威廉姆斯鳄鱼指标 (Bill Williams Alligator) |
| `mama` | `mama(self, fastlimit: int | float=0.5, slowlimit: int | float=0.05, prenan: int=3, talib: bool=True, offset: int=0, **kwargs) -> IndFrame` | MESA自适应移动平均线 (MESA Adaptive Moving Average) |
| `pivots` | `pivots(self, method: str='traditional', anchor: str='D', **kwargs) -> IndFrame` | 枢轴点 (Pivot Points) |
| `smma` | `smma(self, length: int=10, mamode: str='sma', talib: bool=True, offset: int=0, **kwargs) -> IndSeries` | 平滑移动平均线 (Smoothed Moving Average) |
| `ssf3` | `ssf3(self, length: int=20, pi: int | float=3.14159, sqrt3: int | float=1.732, offset: int=0, **kwargs) -> IndSeries` | Ehlers三极点超平滑滤波器 (Ehlers's 3 Pole Super Smoother Filter) |

### performance

| 方法 | 签名 | 说明 |
|------|------|------|
| `drawdown` | `drawdown(self, offset: int=0, **kwargs) -> IndFrame` | 回撤 (Drawdown) |

### trend

| 方法 | 签名 | 说明 |
|------|------|------|
| `alphatrend` | `alphatrend(self, src: str='close', length: int=14, multiplier: int | float=1, threshold: int | float=50, lag: int=2, mamode: str='sma', talib: bool=True, offset: int=0, **kwargs) -> IndFrame` | Alpha趋势指标 (Alpha Trend) |
| `ht_trendline` | `ht_trendline(self, talib: bool=True, prenan: int=63, offset: int=0, **kwargs) -> IndSeries` | Hilbert变换趋势线 (Hilbert Transform TrendLine) |
| `rwi` | `rwi(self, length: int=14, mamode: str='rma', talib: bool=True, drift: int=1, offset: int=0, **kwargs) -> IndFrame` | 随机游走指数 (Random Walk Index) |
| `trendflex` | `trendflex(self, length: int=20, smooth: int=20, alpha: int | float=0.04, pi: int | float=3.14159, sqrt2: int | float=1.414, offset: int=0, **kwargs) -> IndSeries` | 趋势弹性指标 (Trendflex) |
| `zigzag` | `zigzag(self, legs: int=10, deviation: int | float=5, backtest: bool=False, offset: int=0, **kwargs) -> IndFrame` | 锯齿形指标 (Zigzag) |

### utils

| 方法 | 签名 | 说明 |
|------|------|------|
| `signals` | `signals(self, xa: int | float=None, xb: int | float=None, cross_values: bool=None, xseries=None, xseries_a=None, xseries_b=None, cross_series: bool=None, offset: int=0, **kwargs) -> IndFrame` | 信号检测器 (Signals) |

### volatility

| 方法 | 签名 | 说明 |
|------|------|------|
| `atrts` | `atrts(self, length: int=14, ma_length: int=20, k: int | float=3, mamode: str='ema', talib: bool=True, drift: int=1, offset: int=0, **kwargs) -> IndSeries` | ATR追踪止损 (ATR Trailing Stop) |
| `chandelier_exit` | `chandelier_exit(self, high_length: int=22, low_length: int=22, atr_length: int=14, multiplier: int | float=2.0, mamode: str='rma', talib: bool=True, use_close: bool=False, drift: int=1, offset: int=0, **kwargs) -> IndFrame` | 吊灯止损 (Chandelier Exit) |

### volume

| 方法 | 签名 | 说明 |
|------|------|------|
| `tsv` | `tsv(self, length: int=18, signal: int=10, mamode: str='sma', drift: int=1, offset: int=0, **kwargs) -> IndFrame` | 时间段成交量 (Time Segmented Volume) |
| `vhm` | `vhm(self, length: int=610, std_length: int=610, mamode: str='sma', offset: int=0, **kwargs) -> IndSeries` | 成交量热力图 (Volume Heatmap) |
| `vwap` | `vwap(self, anchor: str='D', bands: list=[], offset: int=0, **kwargs) -> IndSeries` | 成交量加权平均价 (Volume Weighted Average Price) |

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `cum` | `cum(self, length=10, **kwargs) -> IndSeries` | 滚动累积和 (Rolling Cumulative Sum) |
| `ZeroDivision` | `ZeroDivision(self, b=1.0, dtype=np.float64, fill_value=0.0, handle_inf=True, **kwargs) -> IndFrame | IndSeries` | 安全除法保护 (Safe Division Protection) |
| `cdl_pattern` | `cdl_pattern(self, name='2crows', scalar=None, offset=0, **kwargs) -> IndFrame` | 蜡烛图形态识别 (Candle Pattern) |
| `ebsw` | `ebsw(self, length=40, bars=10, offset=0, **kwargs) -> IndSeries` | 更优正弦波 (Even Better SineWave, EBSW) *测试版* |
| `ao` | `ao(self, fast=5, slow=34, offset=0, **kwargs) -> IndSeries` | 动量震荡指标 (Awesome Oscillator, AO) |
| `apo` | `apo(self, fast=12, slow=26, mamode='sma', offset=0, **kwargs) -> IndSeries` | 绝对价格震荡指标 (Absolute Price Oscillator, APO) |
| `bias` | `bias(self, length=26, mamode='sma', offset=0, **kwargs) -> IndSeries` | 乖离率指标 (Bias, BIAS) |
| `bop` | `bop(self, scalar=1, talib=True, offset=0, **kwargs) -> IndSeries` | 多空均衡指标 (Balance of Power, BOP) |
| `brar` | `brar(self, length=26, scalar=100, drift=1, offset=0, **kwargs) -> IndFrame` | 情绪指标 (BRAR) |
| `cci` | `cci(self, length=14, c=0.015, offset=0, **kwargs) -> IndSeries` | 商品通道指数 (Commodity Channel Index, CCI) |
| `cfo` | `cfo(self, length=9, scalar=100.0, drift=1, offset=0, **kwargs) -> IndSeries` | 钱德预测震荡指标 (Chande Forecast Oscillator, CFO) |
| `cg` | `cg(self, length=10, offset=0, **kwargs) -> IndSeries` | 重心指标 (Center of Gravity, CG) |
| `cmo` | `cmo(self, length=14, scalar=100.0, talib=True, drift=1, offset=0, **kwargs) -> IndSeries` | 钱德动量震荡指标 (Chande Momentum Oscillator, CMO) |
| `coppock` | `coppock(self, length=10, fast=11, slow=14, offset=0, **kwargs) -> IndSeries` | 科波克曲线 (Coppock Curve) |
| `cti` | `cti(self, length=12, offset=0, **kwargs) -> IndSeries` | 相关趋势指标 (Correlation Trend Indicator, CTI) |
| `dm` | `dm(self, length=14, mamode='rma', talib=True, drift=1, offset=0, **kwargs) -> IndFrame` | 方向运动指标 (Directional Movement, DM) |
| `er` | `er(self, length=14, drift=1, offset=0, **kwargs) -> IndSeries` | 效率比率 (Efficiency Ratio, ER) |
| `eri` | `eri(self, length=14, offset=0, **kwargs) -> IndFrame` | 艾尔德射线指标 (Elder Ray Index, ERI) |
| `fisher` | `fisher(self, length=9, signal=1, offset=0, **kwargs) -> IndFrame` | 费希尔变换 (Fisher Transform, FISHT) |
| `inertia` | `inertia(self, length=20, rvi_length=14, scalar=100.0, refined=False, thirds=False, mamode='ema', drift=1, offset=0, **kwargs) -> IndSeries` | 惯性指标 (Inertia, INERTIA) |
| `kdj` | `kdj(self, length=9, signal=3, offset=0, **kwargs) -> IndFrame` | KDJ指标 (KDJ) |
| `kst` | `kst(self, roc1=10, roc2=15, roc3=20, roc4=30, sma1=10, sma2=10, sma3=10, sma4=15, signal=9, drift=1, offset=0, **kwargs) -> IndFrame` | 确然指标 (Know Sure Thing, KST) |
| `macd` | `macd(self, fast=12, slow=26, signal=9, talib=True, offset=0, **kwargs) -> IndFrame` | 指数平滑移动平均线 (Moving Average Convergence Divergence, MACD) |
| `mom` | `mom(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries` | 动量指标 (Momentum, MOM) |
| `pgo` | `pgo(self, length=14, offset=0, **kwargs) -> IndSeries` | 相当好震荡指标 (Pretty Good Oscillator, PGO) |
| `ppo` | `ppo(self, fast=12, slow=26, signal=9, scalar=100.0, mamode='sma', talib=True, **kwargs) -> IndFrame` | 百分比价格震荡指标 (Percentage Price Oscillator, PPO) |
| `psl` | `psl(self, length=12, scalar=100.0, drift=1, offset=0, **kwargs) -> IndSeries` | 心理线 (Psychological Line, PSL) |
| `pvo` | `pvo(self, fast=12, slow=26, signal=9, scalar=100.0, offset=0, **kwargs) -> IndFrame` | 百分比成交量震荡指标 (Percentage Volume Oscillator, PVO) |
| `qqe` | `qqe(self, length=14, smooth=5, factor=4.236, mamode='sma', drift=1, offset=0, **kwargs) -> IndFrame` | 量化定性估计指标 (Quantitative Qualitative Estimation, QQE) |
| `roc` | `roc(self, length=10, scalar=100.0, talib=True, offset=0, **kwargs) -> IndSeries` | 变动率指标 (Rate of Change, ROC) |
| `rsi` | `rsi(self, length=14, scalar=100.0, talib=True, drift=1, offset=0, **kwargs) -> IndSeries` | 相对强弱指数 (Relative Strength Index, RSI) |
| `rsx` | `rsx(self, length=14, drift=1, offset=0, **kwargs) -> IndSeries` | 相对强弱扩展指标 (Relative Strength Xtra, RSX) |
| `rvgi` | `rvgi(self, length=14, swma_length=4, offset=0, **kwargs) -> IndFrame` | 相对活力指数 (Relative Vigor Index, RVGI) |
| `slope` | `slope(self, length=10, as_angle=False, to_degrees=False, vertical=None, offset=0, **kwargs) -> IndSeries` | 斜率指标 (Slope) |
| `smi` | `smi(self, fast=5, slow=20, signal=5, scalar=1.0, offset=0, **kwargs) -> IndFrame` | SMI遍历指标 (SMI Ergodic Indicator) |
| `squeeze` | `squeeze(self, bb_length=20, bb_std=2.0, kc_length=20, kc_scalar=1.5, mom_length=12, mom_smooth=6, use_tr=True, mamode='sma', offset=0, **kwargs) -> IndFrame` | 挤压指标 (Squeeze) |
| `squeeze_pro` | `squeeze_pro(self, bb_length=20, bb_std=2.0, kc_length=20, kc_scalar_wide=2.0, kc_scalar_normal=1.5, kc_scalar_narrow=1.0, mom_length=12, mom_smooth=6, use_tr=True, mamode='sma', offset=0, **kwargs) -> IndFrame` | 专业挤压指标 (Squeeze PRO) |
| `stc` | `stc(self, tclength=10, fast=12, slow=26, factor=0.5, offset=0, **kwargs) -> IndFrame` | 沙夫趋势周期 (Schaff Trend Cycle, STC) |
| `stoch` | `stoch(self, k=14, d=3, smooth_k=3, mamode='sma', offset=0, **kwargs) -> IndFrame` | 随机指标 (Stochastic Oscillator) |
| `stochrsi` | `stochrsi(self, length=14, rsi_length=14, k=3, d=3, mamode='sma', offset=0, **kwargs) -> IndFrame` | 随机相对强弱指数 (Stochastic RSI) |
| `trix` | `trix(self, length=18, signal=9, scalar=100.0, drift=1, offset=0, **kwargs) -> IndFrame` | 三重指数平滑平均线 (TRIX) |
| `tsi` | `tsi(self, fast=13, slow=25, signal=13, scalar=100.0, mamode='ema', drift=1, offset=0, **kwargs) -> IndFrame` | 真实强度指数 (True Strength Index, TSI) |
| `uo` | `uo(self, fast=7, medium=14, slow=28, fast_w=4.0, medium_w=2.0, slow_w=1.0, talib=True, drift=1, offset=0, **kwargs) -> IndSeries` | 终极震荡指标 (Ultimate Oscillator, UO) |
| `willr` | `willr(self, length=14, talib=True, offset=0, **kwargs) -> IndSeries` | 威廉指标 (William's Percent R, WILLR) |
| `alma` | `alma(self, length=10, sigma=6.0, distribution_offset=0.85, offset=0, **kwargs) -> IndSeries` | 阿诺德移动平均线 (Arnaud Legoux Moving Average, ALMA) |
| `dema` | `dema(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries` | 双指数移动平均线 (Double Exponential Moving Average, DEMA) |
| `ema` | `ema(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries` | 指数移动平均线 (Exponential Moving Average, EMA) |
| `fwma` | `fwma(self, length=10, asc=True, offset=0, **kwargs) -> IndSeries` | 斐波那契加权移动平均线 (Fibonacci's Weighted Moving Average, FWMA) |
| `hilo` | `hilo(self, high_length=13, low_length=21, mamode='sma', offset=0, **kwargs) -> IndFrame` | 甘氏高低激活器 (Gann HiLo Activator) |
| `hl2` | `hl2(self, offset=0, **kwargs) -> IndSeries` | 高低中点指标 (HL2) |
| `hlc3` | `hlc3(self, talib=True, offset=0, **kwargs) -> IndSeries` | 典型价格指标 (HLC3) |
| `hma` | `hma(self, length=10, offset=0, **kwargs) -> IndSeries` | 赫尔移动平均线 (Hull Moving Average, HMA) |
| `hwma` | `hwma(self, na=0.2, nb=0.1, nc=0.1, offset=0, **kwargs) -> IndSeries` | 霍尔特-温特斯移动平均线 (Holt-Winter Moving Average, HWMA) |
| `jma` | `jma(self, length=7, phase=0.0, offset=0, **kwargs) -> IndSeries` | 茹拉克移动平均线 (Jurik Moving Average, JMA) |
| `kama` | `kama(self, length=10, fast=2, slow=30, drift=1, offset=0, **kwargs) -> IndSeries` | 考夫曼自适应移动平均线 (Kaufman's Adaptive Moving Average, KAMA) |
| `ichimoku` | `ichimoku(self, tenkan=9, kijun=26, senkou=52, include_chikou=True, offset=0, **kwargs) -> IndFrame` | 一目均衡表 (Ichimoku Kinkō Hyō) |
| `linreg` | `linreg(self, length=10, offset=0, **kwargs) -> IndSeries` | 线性回归移动平均线 (Linear Regression Moving Average, LINREG) |
| `mcgd` | `mcgd(self, length=10, offset=0, c=1.0, **kwargs) -> IndSeries` | 麦金利动态指标 (McGinley Dynamic Indicator) |
| `midpoint` | `midpoint(self, length=2, talib=True, offset=0, **kwargs) -> IndSeries` | 中点指标 (Midpoint) |
| `midprice` | `midprice(self, length=2, talib=True, offset=0, **kwargs) -> IndSeries` | 中间价格指标 (Midprice) |
| `ohlc4` | `ohlc4(self, offset=0, **kwargs) -> IndSeries` | OHLC4指标 |
| `pwma` | `pwma(self, length=10, asc=True, offset=0, **kwargs) -> IndSeries` | 帕斯卡加权移动平均线 (Pascal's Weighted Moving Average, PWMA) |
| `ma` | `ma(self, name: str='sma', length: int=10, **kwargs) -> IndSeries` | 移动平均线工具函数 (MA Utility) |
| `rma` | `rma(self, length=10, offset=0, **kwargs) -> IndSeries` | 怀尔德移动平均线 (wildeR's Moving Average, RMA) |
| `sinwma` | `sinwma(self, length=10, offset=0, **kwargs) -> IndSeries` | 正弦加权移动平均线 (Sine Weighted Moving Average, SWMA) |
| `sma` | `sma(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries` | 简单移动平均线 (Simple Moving Average, SMA) |
| `ssf` | `ssf(self, length=10, poles=2, offset=0, **kwargs) -> IndSeries` | 埃勒超级平滑滤波器 (Ehler's Super Smoother Filter, SSF) © 2013 |
| `supertrend` | `supertrend(self, length=7, multiplier=3.0, offset=0, **kwargs) -> IndFrame` | 超级趋势指标 (Supertrend) |
| `swma` | `swma(self, length=10, asc=True, offset=0, **kwargs) -> IndSeries` | 对称加权移动平均线 (Symmetric Weighted Moving Average, SWMA) |
| `t3` | `t3(self, length=10, a=0.7, talib=True, offset=0, **kwargs) -> IndSeries` | 蒂姆·蒂尔森T3移动平均线 (Tim Tillson's T3 Moving Average) |
| `tema` | `tema(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries` | 三重指数移动平均线 (Triple Exponential Moving Average, TEMA) |
| `trima` | `trima(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries` | 三角移动平均线 (Triangular Moving Average, TRIMA) |
| `vidya` | `vidya(self, length=14, drift=1, offset=0, **kwargs) -> IndSeries` | 可变指数动态平均线 (Variable Index Dynamic Average, VIDYA) |
| `vwma` | `vwma(self, length=10, offset=0, **kwargs) -> IndSeries` | 成交量加权移动平均线 (Volume Weighted Moving Average, VWMA) |
| `wcp` | `wcp(self, talib=True, offset=0, **kwargs) -> IndSeries` | 加权收盘价 (Weighted Closing Price, WCP) |
| `wma` | `wma(self, length=10, asc=True, talib=True, offset=0, **kwargs) -> IndSeries` | 加权移动平均线 (Weighted Moving Average, WMA) |
| `zlma` | `zlma(self, length=10, mamode='ema', offset=0, **kwargs) -> IndSeries` | 零延迟移动平均线 (Zero Lag Moving Average, ZLMA) |
| `log_return` | `log_return(self, length=20, cumulative=False, offset=0, **kwargs) -> IndSeries` | 对数收益率 (Log Return) |
| `percent_return` | `percent_return(self, length=20, cumulative=False, offset=0, **kwargs) -> IndSeries` | 百分比收益率 (Percent Return) |
| `entropy` | `entropy(self, length=10, base=2.0, offset=0, **kwargs) -> IndSeries` | 信息熵 (Entropy) |
| `kurtosis_` | `kurtosis_(self, length=30, offset=0, **kwargs) -> IndSeries` | 滚动峰度 (Rolling Kurtosis) |
| `mad` | `mad(self, length=30, offset=0, **kwargs) -> IndSeries` | 滚动平均绝对偏差 (Rolling Mean Absolute Deviation) |
| `median_` | `median_(self, length=30, offset=0, **kwargs) -> IndSeries` | 滚动中位数 (Rolling Median) |
| `quantile_` | `quantile_(self, length=30, q=0.5, offset=0, **kwargs) -> IndSeries` | 滚动分位数 (Rolling Quantile) |
| `skew_` | `skew_(self, length=30, offset=0, **kwargs) -> IndSeries` | 滚动偏度 (Rolling Skew) |
| `stdev` | `stdev(self, length=30, ddof=1, talib=True, offset=0, **kwargs) -> IndSeries` | 滚动标准差 (Rolling Standard Deviation) |
| `tos_stdevall` | `tos_stdevall(self, length=30, stds=[1, 2, 3], ddof=1, offset=0, **kwargs) -> IndFrame` | TD Ameritrade Think or Swim 全标准差通道 (TOS_STDEV) |
| `variance` | `variance(self, length=30, ddof=1, talib=True, offset=0, **kwargs) -> IndSeries` | 滚动方差 (Rolling Variance) |
| `zscore` | `zscore(self, length=30, std=1.0, offset=0, **kwargs) -> IndSeries` | Z分数标准化 (Rolling Z Score) |
| `adx` | `adx(self, length=14, lensig=14, scalar=100, mamode='rma', drift=1, offset=0, **kwargs) -> IndFrame` | 平均趋向指数 (Average Directional Movement, ADX) |
| `amat` | `amat(self, fast=8, slow=21, lookback=2, mamode='ema', offset=0, **kwargs) -> IndFrame` | 阿彻移动平均趋势 (Archer Moving Averages Trends, AMAT) |
| `aroon` | `aroon(self, length=14, scalar=100, talib=True, offset=0, **kwargs) -> IndFrame` | 阿隆指标和震荡器 (Aroon & Aroon Oscillator) |
| `chop` | `chop(self, length=14, atr_length=1.0, ln=False, scalar=100, drift=1, offset=0, **kwargs) -> IndSeries` | 震荡指数 (Choppiness Index, CHOP) |
| `cksp` | `cksp(self, p=10, x=3, q=20, tvmode=True, offset=0, **kwargs) -> IndFrame` | 钱德-克罗尔止损 (Chande Kroll Stop, CKSP) |
| `decay` | `decay(self, kind='exponential', length=5, mode='linear', offset=0, **kwargs) -> IndSeries` | 衰减指标 (Decay) |
| `decreasing` | `decreasing(self, length=1, strict=False, asint=True, percent=None, drift=1, offset=0, **kwargs) -> IndSeries` | 下降序列检测 (Decreasing) |
| `dpo` | `dpo(self, length=20, centered=True, offset=0, **kwargs) -> IndSeries` | 去趋势价格震荡指标 (Detrend Price Oscillator, DPO) |
| `increasing` | `increasing(self, length=1, strict=False, asint=True, percent=None, drift=1, offset=0, **kwargs) -> IndSeries` | 上升序列检测 (Increasing) |
| `long_run` | `long_run(self, fast=None, slow=None, length=2, offset=0, **kwargs) -> IndSeries` | 长期运行指标 (Long Run) |
| `psar` | `psar(self, af0=0.02, af=0.02, max_af=0.2, offset=0, **kwargs) -> IndFrame` | 抛物线转向指标 (Parabolic Stop and Reverse, PSAR) |
| `qstick` | `qstick(self, length=10, ma='sma', offset=0, **kwargs) -> IndSeries` | Q棒指标 (Q Stick) |
| `short_run` | `short_run(self, fast=None, slow=None, length=None, offset=0, **kwargs) -> IndSeries` | 短期运行指标 (Short Run) |
| `tsignals` | `tsignals(self, trend=None, asbool=None, trend_reset=None, trend_offset=0, offset=0, **kwargs) -> IndFrame` | 趋势信号 (Trend Signals) |
| `ttm_trend` | `ttm_trend(self, length=6, offset=0, **kwargs) -> IndFrame` | TTM趋势指标 (TTM Trend) |
| `vhf` | `vhf(self, length=28, drift=None, offset=0, **kwargs) -> IndSeries` | 垂直水平过滤器 (Vertical Horizontal Filter, VHF) |
| `vortex` | `vortex(self, length=14, drift=1, offset=0, **kwargs) -> IndFrame` | 涡旋指标 (Vortex) |
| `xsignals` | `xsignals(self, signal=None, xa=None, xb=None, above=None, long=None, asbool=None, trend_reset=None, trend_offset=0, offset=0, **kwargs) -> IndFrame` | 交叉信号 (Cross Signals, XSIGNALS) |
| `above` | `above(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries` | 序列a大于或等于序列b或数值 |
| `below` | `below(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries` | 序列a小于或等于序列b或数值 |
| `cross` | `cross(self, b=None, above=True, asint=True, offset=0, **kwargs) -> IndSeries` | 序列a上穿序列b或数值 |
| `cross_up` | `cross_up(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries` | 序列a上穿序列b或数值 |
| `cross_down` | `cross_down(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries` | 下穿信号 (Cross Down) |
| `aberration` | `aberration(self, length=5, atr_length=15, offset=0, **kwargs) -> IndFrame` | 偏差通道指标 (Aberration) |
| `accbands` | `accbands(self, length=10, c=4, drift=1, mamode='sma', offset=0, **kwargs) -> IndFrame` | 加速带指标 (Acceleration Bands, ACCBANDS) |
| `atr` | `atr(self, length=14, mamode='rma', talib=True, drift=1, offset=0, **kwargs) -> IndSeries` | 平均真实波幅 (Average True Range, ATR) |
| `bbands` | `bbands(self, length=10, std=2.0, ddof=0, mamode='sma', talib=True, offset=0, **kwargs) -> IndFrame` | 布林带 (Bollinger Bands, BBANDS) |
| `donchian` | `donchian(self, lower_length=20, upper_length=20, offset=0, **kwargs) -> IndFrame` | 唐奇安通道 (Donchian Channels, DC) |
| `hwc` | `hwc(self, na=0.2, nb=0.1, nc=0.1, nd=0.1, scalar=1.0, channel_eval=False, offset=0, **kwargs) -> IndFrame` | 霍尔特-温特斯通道 (Holt-Winter Channel, HWC) |
| `kc` | `kc(self, length=20, scalar=2.0, mamode='ema', offset=0, **kwargs) -> IndFrame` | 凯尔特纳通道 (Keltner Channels, KC) |
| `massi` | `massi(self, fast=9, slow=25, offset=0, **kwargs) -> IndSeries` | 质量指数 (Mass Index, MASSI) |
| `natr` | `natr(self, length=20, scalar=100.0, mamode='ema', talib=True, drift=1, offset=0, **kwargs) -> IndSeries` | 标准化平均真实波幅 (Normalized Average True Range, NATR) |
| `pdist` | `pdist(self, drift=10, offset=0, **kwargs) -> IndSeries` | 价格距离指标 (Price Distance, PDIST) |
| `rvi` | `rvi(self, length=14, scalar=100.0, refined=False, thirds=False, mamode='ema', drift=1, offset=0, **kwargs) -> IndSeries` | 相对波动指数 (Relative Volatility Index, RVI) |
| `thermo` | `thermo(self, length=20, long=2.0, short=0.5, mamode='ema', drift=1, offset=0, **kwargs) -> IndFrame` | 埃尔德温度计 (Elder's Thermometer, THERMO) |
| `true_range` | `true_range(self, drift=1, offset=0, **kwargs) -> IndSeries` | 真实波幅 (True Range) |
| `ui` | `ui(self, length=14, scalar=100.0, offset=0, **kwargs) -> IndSeries` | 溃疡指数 (Ulcer Index, UI) |
| `ad` | `ad(self, open_=None, talib=True, offset=0, **kwargs) -> IndSeries` | 累积/派发线 (Accumulation/Distribution, AD) |
| `adosc` | `adosc(self, open_=None, fast=12, slow=26, talib=True, offset=0, **kwargs) -> IndSeries` | 累积/派发震荡指标或蔡金震荡指标 (Accumulation/Distribution Oscillator or Chaikin Oscillator) |
| `aobv` | `aobv(self, fast=4, slow=12, max_lookback=2, min_lookback=2, mamode='ema', offset=0, **kwargs) -> IndFrame` | 阿切尔能量潮指标 (Archer On Balance Volume, AOBV) |
| `cmf` | `cmf(self, open_=None, length=20, offset=0, **kwargs) -> IndSeries` | 蔡金资金流 (Chaikin Money Flow, CMF) |
| `efi` | `efi(self, length=13, mamode='ema', drift=1, offset=0, **kwargs) -> IndSeries` | 埃尔德力量指数 (Elder's Force Index, EFI) |
| `eom` | `eom(self, length=14, divisor=100, drift=1, offset=0, **kwargs) -> IndSeries` | 简易波动指标 (Ease of Movement, EOM) |
| `kvo` | `kvo(self, fast=34, slow=55, signal=13, mamode='ema', drift=1, offset=0, **kwargs) -> IndFrame` | 克林格成交量震荡指标 (Klinger Volume Oscillator, KVO) |
| `mfi` | `mfi(self, length=14, talib=True, drift=1, offset=0, **kwargs) -> IndSeries` | 资金流量指数 (Money Flow Index, MFI) |
| `nvi` | `nvi(self, length=13, initial=1000, offset=0, **kwargs) -> IndSeries` | 负成交量指数 (Negative Volume Index, NVI) |
| `obv` | `obv(self, talib=True, offset=0, **kwargs) -> IndSeries` | 能量潮指标 (On Balance Volume, OBV) |
| `pvi` | `pvi(self, length=13, initial=1000, offset=0, **kwargs) -> IndSeries` | 正成交量指数 (Positive Volume Index, PVI) |
| `pvol` | `pvol(self, offset=0, **kwargs) -> IndSeries` | 价格-成交量指标 (Price-Volume, PVOL) |
| `pvr` | `pvr(self, **kwargs) -> IndSeries` | 价格成交量排名 (Price Volume Rank) |
| `pvt` | `pvt(self, drift=1, offset=0, **kwargs) -> IndSeries` | 价量趋势指标 (Price-Volume Trend, PVT) |
| `vp` | `vp(self, width=10, **kwargs) -> IndFrame` | 成交量分布图 (Volume Profile, VP) |
| `line_trhend` | `line_trhend(self, period: int=1, **kwargs) -> IndSeries` | 指标线趋势判断 (Indicator Line Trend) |
| `insidebar` | `insidebar(self, length: int=10, **kwargs) -> IndFrame` | 内包线模式识别 (Inside Bar Pattern Recognition) |
---

## TaLib

## Ta-Lib技术指标计算类
    - 将目标数据转换为minibt内置指标数据，提供TA-Lib库中技术指标的Python接口。
    - 此类封装了TA-Lib的技术指标函数，使其能够与minibt框架无缝集成。

    ### 📘 **文档参考**:
    - API参考：https://www.minibt.cn/minibt_api_reference/talib/

    ### 主要特性：
    - 支持TA-Lib的所有技术指标类别
    - 自动处理数据格式转换
    - 提供统一的参数接口
    - 返回minibt兼容的IndSeries或IndFrame格式

    ### 使用示例：
    ```python
    # 从数据源创建TaLib实例
    ta = TaLib(data)

    # 从策略调用指标
    self.kline.talib

    # 计算希尔伯特变换-主导周期
    ht_period = ta.HT_DCPERIOD()
    ht_period = self.kline.close.talib.HT_DCPERIOD()
    ht_period = self.kline.close.HT_DCPERIOD()

    # 计算移动平均线
    sma = ta.SMA(length=20)
    sma = self.kline.close.talib.SMA(length=20)
    sma = self.kline.close.SMA(length=20)

    # 计算相对强弱指数
    rsi = ta.RSI(length=14)
    rsi = self.kline.close.talib.RSI(length=14)
    rsi = self.kline.close.RSI(length=14)
    ```

    ### 参数：
        data: 输入数据，可以是pandas Series或DataFrame格式

    ### 属性：
        _df: 存储输入数据的内部属性

    ### 方法：
    所有TA-Lib技术指标方法，按功能分类：
    - 周期指标 (Cycle Indicator Functions)
    - 价格变换 (Price Transform)
    - 动量指标 (Momentum Indicators)
    - 波动率指标 (Volatility Indicators)
    - 成交量指标 (Volume Indicators)
    - 趋势指标 (Trend Indicators)
    - 统计函数 (Statistic Functions)
    - 数学变换 (Math Transform)
        - 数学运算符 (Math Operators)

    ### 注意：
    - 使用前需要确保已安装TA-Lib库
    - 输入数据应包含所需的OHLCV列
    - 返回值会自动转换为minibt的IndSeries或IndFrame格式
    - 所有指标方法都支持**kwargs参数传递额外设置

    ### 版本要求：
    - Python 3.7+
    - TA-Lib 0.4.0+
    - minibt 兼容版本

### Cycle Indicator Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `HT_DCPERIOD` | `HT_DCPERIOD(self, **kwargs) -> IndSeries` | ## HT_DCPERIOD - Hilbert Transform - Dominant Cycle Period |
| `HT_DCPHASE` | `HT_DCPHASE(self, **kwargs) -> IndSeries` | ## HT_DCPHASE - Hilbert Transform - Dominant Cycle Phase |
| `HT_PHASOR` | `HT_PHASOR(self, **kwargs) -> IndFrame` | ## HT_PHASOR - Hilbert Transform - Phasor Components |
| `HT_SINE` | `HT_SINE(self, **kwargs) -> IndFrame` | ## HT_SINE - Hilbert Transform - Sine Wave |
| `HT_TRENDMODE` | `HT_TRENDMODE(self, **kwargs) -> IndSeries` | ## HT_TRENDMODE - Hilbert Transform - Trend vs Cycle Mode |

### Math Operator Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `ADD` | `ADD(self, **kwargs) -> IndSeries` | ADD - Vector Arithmetic Add |
| `DIV` | `DIV(self, **kwargs) -> IndSeries` | DIV - Vector Arithmetic Div |
| `MAX` | `MAX(self, timeperiod=30, **kwargs) -> IndSeries` | MAX - Highest value over a specified period |
| `MAXINDEX` | `MAXINDEX(self, timeperiod=30, **kwargs) -> IndSeries` | MAXINDEX - Index of highest value over a specified period |
| `MIN` | `MIN(self, timeperiod=30, **kwargs) -> IndSeries` | MIN - Lowest value over a specified period |
| `MININDEX` | `MININDEX(self, timeperiod=30, **kwargs) -> IndSeries` | MININDEX - Index of lowest value over a specified period |
| `MINMAX` | `MINMAX(self, timeperiod=30, **kwargs) -> IndFrame` | MINMAX - Lowest and highest values over a specified period |
| `MINMAXINDEX` | `MINMAXINDEX(self, timeperiod=30, **kwargs) -> IndFrame` | MINMAXINDEX - Indexes of lowest and highest values over a specified period |
| `MULT` | `MULT(self, **kwargs) -> IndSeries` | MULT - Vector Arithmetic Mult |
| `SUB` | `SUB(self, **kwargs) -> IndSeries` | SUB - Vector Arithmetic Substraction |
| `SUM` | `SUM(self, timeperiod=30, **kwargs) -> IndSeries` | SUM - Summation |

### Math Transform Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `ACOS` | `ACOS(self, **kwargs) -> IndSeries` | ACOS - Vector Trigonometric ACos |
| `ASIN` | `ASIN(self, **kwargs) -> IndSeries` | ASIN - Vector Trigonometric ASin |
| `ATAN` | `ATAN(self, **kwargs) -> IndSeries` | ATAN - Vector Trigonometric ATan |
| `CEIL` | `CEIL(self, **kwargs) -> IndSeries` | CEIL - Vector Ceil |
| `COS` | `COS(self, **kwargs) -> IndSeries` | COS - Vector Trigonometric Cos |
| `COSH` | `COSH(self, **kwargs) -> IndSeries` | COSH - Vector Trigonometric Cosh |
| `EXP` | `EXP(self, **kwargs) -> IndSeries` | EXP - Vector Arithmetic Exp |
| `FLOOR` | `FLOOR(self, **kwargs) -> IndSeries` | FLOOR - Vector Floor |
| `LN` | `LN(self, **kwargs) -> IndSeries` | LN - Vector Log Natural |
| `LOG10` | `LOG10(self, **kwargs) -> IndSeries` | LOG10 - Vector Log10 |
| `SIN` | `SIN(self, **kwargs) -> IndSeries` | SIN - Vector Trigonometric Sin |
| `SINH` | `SINH(self, **kwargs) -> IndSeries` | SINH - Vector Trigonometric Sinh |
| `SQRT` | `SQRT(self, **kwargs) -> IndSeries` | SQRT - Vector Square Root |
| `TAN` | `TAN(self, **kwargs) -> IndSeries` | TAN - Vector Trigonometric Tan |
| `TANH` | `TANH(self, **kwargs) -> IndSeries` | TANH - Vector Trigonometric Tanh |

### Momentum Indicator Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `ADX` | `ADX(self, timeperiod=14, **kwargs) -> IndSeries` | ADX - Average Directional Movement Index |
| `ADXR` | `ADXR(self, timeperiod=14, **kwargs) -> IndSeries` | ADXR- Average Directional Movement Index Rating |
| `APO` | `APO(self, fastperiod=12, slowperiod=26, matype=0, **kwargs) -> IndSeries` | APO - Absolute Price Oscillator |
| `AROON` | `AROON(self, timeperiod=14, **kwargs) -> IndFrame` | AROON - Aroon |
| `AROONOSC` | `AROONOSC(self, timeperiod=14, **kwargs) -> IndSeries` | AROONOSC - Aroon Oscillator |
| `BOP` | `BOP(self, **kwargs) -> IndSeries` | BOP - Balance Of Power |
| `CCI` | `CCI(self, timeperiod=14, **kwargs) -> IndSeries` | CCI - Commodity Channel Index |
| `CMO` | `CMO(self, timeperiod=14, **kwargs) -> IndSeries` | CMO - Chande Momentum Oscillator 钱德动量摆动指标 |
| `DX` | `DX(self, timeperiod=14, **kwargs) -> IndSeries` | DX - Directional Movement Index 动向指标 |
| `MACD` | `MACD(self, fastperiod=12, slowperiod=26, signalperiod=9, **kwargs) -> IndFrame` | MACD - Moving Average Convergence/Divergence 平滑异同移动平均线 |
| `MACDEXT` | `MACDEXT(self, fastperiod=12, fastmatype=0, slowperiod=26, slowmatype=0, signalperiod=9, signalmatype=0, **kwargs) -> IndFrame` | MACDEXT - MACD with controllable MA type 平滑异同移动平均线(可控制移动平均算法) |
| `MACDFIX` | `MACDFIX(self, signalperiod=9, **kwargs) -> IndFrame` | MACDFIX - Moving Average Convergence/Divergence Fix 12/26 平滑异同移动平均线(固定快慢均线周期为12/ |
| `MFI` | `MFI(self, timeperiod=14, **kwargs) -> IndSeries` | MFI - Money Flow Index 资金流量指标 |
| `MINUS_DI` | `MINUS_DI(self, timeperiod=14, **kwargs) -> IndSeries` | MINUS_DI - Minus Directional Indicator 下降动向值 |
| `MINUS_DM` | `MINUS_DM(self, timeperiod=14, **kwargs) -> IndSeries` | MINUS_DM - Minus Directional Movement 下降动向变动值 |
| `MOM` | `MOM(self, timeperiod=10, **kwargs) -> IndSeries` | MOM - Momentum 动量指标 |
| `PLUS_DI` | `PLUS_DI(self, timeperiod=14, **kwargs) -> IndSeries` | PLUS_DI - Plus Directional Indicator 上升动向值 |
| `PLUS_DM` | `PLUS_DM(self, timeperiod=14, **kwargs) -> IndSeries` | PLUS_DM - Plus Directional Movement 上升动向变动值 |
| `PPO` | `PPO(self, fastperiod=12, slowperiod=26, matype=0, **kwargs) -> IndSeries` | PPO - Percentage Price Oscillator 价格震荡百分比指数 |
| `ROC` | `ROC(self, timeperiod=10, **kwargs) -> IndSeries` | ROC - Rate of change 变动率指标 |
| `ROCP` | `ROCP(self, timeperiod=10, **kwargs) -> IndSeries` | ROCP - Rate of change Percentage 百分比变动率 |
| `ROCR` | `ROCR(self, timeperiod=10, **kwargs) -> IndSeries` | ROCR - Rate of change ratio 变动率比值 |
| `ROCR100` | `ROCR100(self, timeperiod=10, **kwargs) -> IndSeries` | ROCR100 - Rate of change ratio 100 scale 100倍变动率比值 |
| `RSI` | `RSI(self, timeperiod=14, **kwargs) -> IndSeries` | RSI - Relative Strength Index 相对强弱指数 |
| `STOCH` | `STOCH(self, fastk_period=5, slowk_period=3, slowk_matype=0, slowd_period=3, slowd_matype=0, **kwargs) -> IndFrame` | STOCH - Stochastic 随机指标(KD) |
| `STOCHF` | `STOCHF(self, fastk_period=5, fastd_period=3, fastd_matype=0, **kwargs) -> IndFrame` | STOCHF - Stochastic Fast 快速随机指标 |
| `STOCHRSI` | `STOCHRSI(self, timeperiod=14, fastk_period=5, fastd_period=3, fastd_matype=0, **kwargs) -> IndFrame` | STOCHRSI - Stochastic Relative Strength Index 随机相对强弱指数 |
| `TRIX` | `TRIX(self, timeperiod=30, **kwargs) -> IndSeries` | TRIX - 1-day Rate-Of-Change of a Triple Smooth EMA 三重平滑指数移动平均变动率 |
| `ULTOSC` | `ULTOSC(self, timeperiod1=7, timeperiod2=14, timeperiod3=28, **kwargs) -> IndSeries` | ULTOSC - Ultimate Oscillator 终极波动指标 |
| `WILLR` | `WILLR(self, timeperiod=14, **kwargs) -> IndSeries` | WILLR - Williams' %R 威廉指标 |

### Pattern Recognition Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `PatternRecognition` | `PatternRecognition(self, name: PRFNameTtype='CDL2CROWS', penetration=0, **kwargs) -> IndSeries` | Pattern Recognition Functions 形态识别指标 |

### Price Transform Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `AVGPRICE` | `AVGPRICE(self, **kwargs) -> IndSeries` | AVGPRICE - Average Price 平均价格指标 |
| `MEDPRICE` | `MEDPRICE(self, **kwargs) -> IndSeries` | MEDPRICE - Median Price 中位数价格指标 |
| `TYPPRICE` | `TYPPRICE(self, **kwargs) -> IndSeries` | TYPPRICE - Typical Price 代表性价格指标 |
| `WCLPRICE` | `WCLPRICE(self, **kwargs) -> IndSeries` | WCLPRICE - Weighted Close Price 加权收盘价指标 |
| `BETA` | `BETA(self, timeperiod=5, **kwargs) -> IndSeries` | BETA - Beta β系数 |
| `CORREL` | `CORREL(self, timeperiod=30, **kwargs) -> IndSeries` | CORREL - Pearson's Correlation Coefficient (r) 皮尔逊相关系数 |
| `LINEARREG` | `LINEARREG(self, timeperiod=14, **kwargs) -> IndSeries` | LINEARREG - Linear Regression 线性回归指标 |
| `LINEARREG_ANGLE` | `LINEARREG_ANGLE(self, timeperiod=14, **kwargs) -> IndSeries` | LINEARREG_ANGLE - Linear Regression Angle 线性回归角度指标 |
| `LINEARREG_INTERCEPT` | `LINEARREG_INTERCEPT(self, timeperiod=14, **kwargs) -> IndSeries` | LINEARREG_INTERCEPT - Linear Regression Intercept 线性回归截距指标 |
| `LINEARREG_SLOPE` | `LINEARREG_SLOPE(self, timeperiod=14, **kwargs) -> IndSeries` | LINEARREG_SLOPE - Linear Regression Slope 线性回归斜率指标 |
| `STDDEV` | `STDDEV(self, timeperiod=5, nbdev=1, **kwargs) -> IndSeries` | STDDEV - Standard Deviation 标准偏差指标 |
| `TSF` | `TSF(self, timeperiod=14, **kwargs) -> IndSeries` | TSF - Time Series Forecast 时间序列预测指标 |
| `VAR` | `VAR(self, timeperiod=5, nbdev=1, **kwargs) -> IndSeries` | VAR - VAR 方差指标 |

### Volatility Indicator Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `ATR` | `ATR(self, timeperiod=14, **kwargs) -> IndSeries` | ATR - Average True Range 真实波动幅度均值 |
| `NATR` | `NATR(self, timeperiod=14, **kwargs) -> IndSeries` | NATR - Normalized Average True Range 归一化波动幅度均值 |
| `TRANGE` | `TRANGE(self, **kwargs) -> IndSeries` | TRANGE - True Range 真实波动范围 |

### Volume Indicators Functions

| 方法 | 签名 | 说明 |
|------|------|------|
| `AD` | `AD(self, **kwargs) -> IndSeries` | AD - Chaikin A/D Line 累积/派发线 |
| `ADOSC` | `ADOSC(self, fastperiod=3, slowperiod=10, **kwargs) -> IndSeries` | ADOSC - Chaikin A/D Oscillator Chaikin震荡指标 |
| `OBV` | `OBV(self, **kwargs) -> IndSeries` | OBV - On Balance Volume 能量潮指标 |

### overlap

| 方法 | 签名 | 说明 |
|------|------|------|
| `BBANDS` | `BBANDS(self, timeperiod=5, nbdevup=2, nbdevdn=2, matype=0, **kwargs) -> IndFrame` | BBANDS - Bollinger Bands 布林线指标 |
| `DEMA` | `DEMA(self, timeperiod=30, **kwargs) -> IndSeries` | DEMA - Double Exponential Moving Average 双指数移动平均线 |
| `EMA` | `EMA(self, timeperiod=30, **kwargs) -> IndSeries` | EMA - Exponential Moving Average 指数移动平均线 |
| `HT_TRENDLINE` | `HT_TRENDLINE(self, **kwargs) -> IndSeries` | HT_TRENDLINE - Hilbert Transform - Instantaneous Trendline 希尔伯特瞬时趋势线 |
| `KAMA` | `KAMA(self, timeperiod=30, **kwargs) -> IndSeries` | KAMA - Kaufman Adaptive Moving Average 考夫曼自适应移动平均线 |
| `MA` | `MA(self, timeperiod=30, matype=0, **kwargs) -> IndSeries` | MA - Moving Average 移动平均线 |
| `MAMA` | `MAMA(self, fastlimit=0, slowlimit=0, **kwargs) -> IndFrame` | MAMA - MESA Adaptive Moving Average MESA自适应移动平均线 |
| `MAVP` | `MAVP(self, periods: float=14.0, minperiod: int=2, maxperiod: int=30, matype=0, **kwargs) -> IndSeries` | MAVP - Moving Average with Variable Period 可变周期移动平均线 |
| `MIDPOINT` | `MIDPOINT(self, timeperiod=14, **kwargs) -> IndSeries` | MIDPOINT - MidPoint over period 周期中点指标 |
| `MIDPRICE` | `MIDPRICE(self, timeperiod=14, **kwargs) -> IndSeries` | MIDPRICE - Midpoint Price over period 周期中点价格指标 |
| `SAR` | `SAR(self, acceleration=0, maximum=0, **kwargs) -> IndSeries` | SAR - Parabolic SAR 抛物线指标 |
| `SAREXT` | `SAREXT(self, startvalue=0, offsetonreverse=0, accelerationinitlong=0, accelerationlong=0, accelerationmaxlong=0, accelerationinitshort=0, accelerationshort=0, accelerationmaxshort=0, **kwargs) -> IndSeries` | SAREXT - Parabolic SAR - Extended 扩展抛物线指标 |
| `SMA` | `SMA(self, timeperiod=30, **kwargs) -> IndSeries` | SMA - Simple Moving Average 简单移动平均线 |
| `T3` | `T3(self, timeperiod=5, vfactor=0, **kwargs) -> IndSeries` | T3 - Triple Exponential Moving Average (T3) 三重指数移动平均线 |
| `TEMA` | `TEMA(self, timeperiod=30, **kwargs) -> IndSeries` | TEMA - Triple Exponential Moving Average 三重指数移动平均线 |
| `TRIMA` | `TRIMA(self, timeperiod=30, **kwargs) -> IndSeries` | TRIMA - Triangular Moving Average 三角形移动平均线 |
| `WMA` | `WMA(close, timeperiod=30, **kwargs) -> IndSeries` | WMA - Weighted Moving Average 加权移动平均线 |
---

## TqTa

## 天勤技术指标计算类
    - 基于天勤量化(TqSdk)的技术指标库封装，提供专业的技术分析指标计算。
    - 支持移动平均、振荡指标、趋势指标、量价指标等各类技术分析工具。

    ### 📘 **文档参考**:
    - API参考：https://www.minibt.cn/minibt_api_reference/tqfunc/
    - 天勤文档：https://tqsdk-python.readthedocs.io/en/latest/reference/tqsdk.ta.html

    ### 核心功能分类：
    - 趋势指标：MA, EMA, MACD, 布林带等
    - 振荡指标：RSI, KDJ, WR, CCI, BIAS等  
    - 量价指标：OBV, VWAP, 成交量比率等
    - 统计指标：标准差、相关系数、回归分析等
    - 形态识别：高低点、支撑阻力等

    ### 使用示例：
    >>> data = IndFrame  # 包含OHLCV数据的minibt数据对象
    >>> tqta = TqTa(data)   # data数据必须包含指标计算时用到的字段
    >>> self.kline.close.tqta
    >>> 
    >>> # 趋势指标
    >>> ma_20 = close.tqta.ma(20)     # 指定close列计算20周期简单移动平均
    >>> ema_12 = close.tqta.ema(12)   # 12周期指数移动平均
    >>> macd_diff, macd_dea, macd_hist = tqta.macd()  # MACD指标
    >>> 
    >>> # 振荡指标
    >>> rsi_14 = tqta.rsi(14)         # 14周期RSI
    >>> k, d, j = tqta.kdj()          # KDJ随机指标
    >>> 
    >>> # 量价指标
    >>> obv_line = tqta.obv()         # 能量潮指标

    ### 技术特点：
    - 专业准确：基于天勤官方指标算法，确保计算准确性
    - 性能优化：针对金融时间序列数据进行算法优化
    - 完整兼容：与minibt数据框架无缝集成
    - 边界处理：自动处理数据边界和缺失值
    - 多周期支持：支持不同时间周期的指标计算

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `ATR` | `ATR(self, n=14, **kwargs) -> IndFrame` | ## 平均真实波幅指标 - 衡量价格波动性的重要技术指标 |
| `BIAS` | `BIAS(self, n=6, **kwargs) -> IndSeries` | ## 乖离率指标 - 衡量价格与移动平均线偏离程度的动量指标 |
| `BOLL` | `BOLL(self, n=26, p=2, **kwargs) -> IndFrame` | ## 布林带指标 - 基于标准差的价格通道分析工具 |
| `DMI` | `DMI(self, n=14, m=6, **kwargs) -> IndFrame` | ## 动向指标系统 - 综合趋势强度和方向的分析工具 |
| `KDJ` | `KDJ(self, n=9, m1=3, m2=3, **kwargs) -> IndFrame` | ## 随机指标 - 动量振荡器，识别超买超卖和背离信号 |
| `MACD` | `MACD(self, short=12, long=26, m=9, **kwargs) -> IndFrame` | ## 指数平滑异同移动平均线 - 经典的趋势动量指标 |
| `SAR` | `SAR(self, n=4, step=0.02, max=0.2, **kwargs) -> IndSeries` | 抛物线停损指标 - 趋势跟踪和停损点设置工具 |
| `WR` | `WR(self, n=14, **kwargs) -> IndSeries` | ## 威廉指标 - 超买超卖振荡器，测量价格相对位置 |
| `RSI` | `RSI(self, n=7, **kwargs) -> IndSeries` | ## 相对强弱指标 - 动量振荡器，衡量价格变动速度和幅度 |
| `ASI` | `ASI(self, **kwargs) -> IndSeries` | ## 振动升降指标 - 精确定价指标，减少跳空缺口影响 |
| `VR` | `VR(self, n=26, **kwargs) -> IndSeries` | ## 容量比率指标 - 量价关系分析工具，衡量成交量与价格关系 |
| `ARBR` | `ARBR(self, n=26, **kwargs) -> IndFrame` | ## 人气意愿指标系统 - 综合反映市场多空力量对比 |
| `DMA` | `DMA(self, short=10, long=50, m=10, **kwargs) -> IndFrame` | ## 平行线差指标 - 基于移动平均线差值的趋势分析工具 |
| `EXPMA` | `EXPMA(self, p1=5, p2=10, **kwargs) -> IndFrame` | ## 指数加权移动平均线组合 - 对近期价格赋予更高权重的均线系统 |
| `CR` | `CR(self, n=26, m=5, **kwargs) -> IndFrame` | ## 能量指标 - 反映价格动量和市场人气的综合指标 |
| `CCI` | `CCI(self, n=14, **kwargs) -> IndSeries` | ## 顺势指标 - 测量价格偏离统计平均程度的振荡器 |
| `OBV` | `OBV(self, **kwargs) -> IndSeries` | ## 能量潮指标 - 通过成交量变动预测价格变动的先行指标 |
| `CDP` | `CDP(self, n=3, **kwargs) -> IndFrame` | ## 逆势操作指标 - 短线交易的反向操作工具 |
| `HCL` | `HCL(self, n=10, **kwargs) -> IndFrame` | ## 均线通道指标 - 基于高、低、收盘价的移动平均通道系统 |
| `ENV` | `ENV(self, n=14, k=6, **kwargs) -> IndFrame` | ## 包络线指标 - 基于移动平均线的动态通道系统 |
| `MIKE` | `MIKE(self, n=12, **kwargs) -> IndFrame` | ## 麦克指标 - 压力支撑分析系统，提供多级支撑阻力位 |
| `PUBU` | `PUBU(self, m=4, **kwargs) -> IndSeries` | ## 瀑布线指标 - 非线性移动平均系统，过滤价格噪音 |
| `BBI` | `BBI(self, n1=3, n2=6, n3=12, n4=24, **kwargs) -> IndSeries` | ## 多空指数 - 多周期移动平均综合指标 |
| `DKX` | `DKX(self, m=10, **kwargs) -> IndFrame` | ## 多空线指标 - 综合价格和成交量的多空力量分析 |
| `BBIBOLL` | `BBIBOLL(self, n=10, m=3, **kwargs) -> IndFrame` | ## 多空布林线 - BBI与布林带结合的趋势通道系统 |
| `ADTM` | `ADTM(self, n=23, m=8, **kwargs) -> IndFrame` | ## 动态买卖气指标 - 衡量市场动态买卖力量的振荡器 |
| `B3612` | `B3612(self, **kwargs) -> IndFrame` | ## 三减六日乖离率 - 短期均线乖离分析系统 |
| `DBCD` | `DBCD(self, n=5, m=16, t=76, **kwargs) -> IndFrame` | ## 异同离差乖离率 - 乖离率的优化版本，减少噪音干扰 |
| `DDI` | `DDI(self, n=13, n1=30, m=10, m1=5, **kwargs) -> IndFrame` | ## 方向标准离差指数 - 趋势方向和波动性综合指标 |
| `KD` | `KD(self, n=9, m1=3, m2=3, **kwargs) -> IndFrame` | ## 随机指标(KD) - KDJ指标的简化版本，去除J值 |
| `LWR` | `LWR(self, n=9, m=3, **kwargs) -> IndSeries` | ## 威廉指标(LWR) - 反向威廉指标，与WR指标计算方式相反 |
| `MASS` | `MASS(self, n1=9, n2=25, **kwargs) -> IndSeries` | ## 梅斯线指标 - 价格波动幅度和强度测量工具 |
| `MFI` | `MFI(self, n=14, **kwargs) -> IndSeries` | ## 资金流量指标 - 带成交量的相对强弱指标 |
| `MI` | `MI(self, n=12, **kwargs) -> IndFrame` | # 动量指标 - 价格变动速率和方向分析 |
| `MICD` | `MICD(self, n=3, n1=10, n2=20, **kwargs) -> IndFrame` | ## 异同离差动力指数 - 动量指标的MACD版本 |
| `MTM` | `MTM(self, n=6, n1=6, **kwargs) -> IndFrame` | ## 动量指标(MTM) - 经典的价格动量振荡器 |
| `PRICEOSC` | `PRICEOSC(self, long=26, short=12, **kwargs) -> IndSeries` | ## 价格震荡指数 - 长短周期移动平均离差指标 |
| `PSY` | `PSY(self, n=12, m=6, **kwargs) -> IndFrame` | ## 心理线指标 - 投资者情绪和心理状态测量工具 |
| `QHLSR` | `QHLSR(self, **kwargs) -> IndFrame` | ## 阻力指标 - 量价关系阻力分析系统 |
| `RC` | `RC(self, n=50, **kwargs) -> IndSeries` | ## 变化率指数 - 价格变动速率标准化指标 |
| `RCCD` | `RCCD(self, n=10, n1=21, n2=28, **kwargs) -> IndFrame` | ## 异同离差变化率指数 - RC指标的MACD版本 |
| `ROC` | `ROC(self, n=24, m=20, **kwargs) -> IndFrame` | ## 变动速率指标 - 价格变化百分比动量振荡器 |
| `SLOWKD` | `SLOWKD(self, n=9, m1=3, m2=3, m3=3, **kwargs) -> IndFrame` | ## 慢速随机指标 - KDJ指标的平滑版本，减少信号噪音 |
| `SRDM` | `SRDM(self, n=30, **kwargs) -> IndFrame` | ## 动向速度比率 - 价格变动速度和方向综合指标 |
| `SRMI` | `SRMI(self, n=9, **kwargs) -> IndFrame` | ## MI修正指标 - 动量指标的优化版本 |
| `ZDZB` | `ZDZB(self, n1=50, n2=5, n3=20, **kwargs) -> IndFrame` | ## 筑底指标 - 底部形成和反转识别工具 |
| `DPO` | `DPO(self, **kwargs) -> IndSeries` | ## 区间震荡线 - 价格与移动平均线的周期性偏离分析 |
| `LON` | `LON(self, **kwargs) -> IndFrame` | ## 长线指标 - 综合量价关系的长线趋势分析系统 |
| `SHORT` | `SHORT(self, **kwargs) -> IndFrame` | ## 短线指标 - 综合量价关系的短线交易系统 |
| `MV` | `MV(self, n=10, m=20, **kwargs) -> IndFrame` | ## 均量线指标 - 成交量移动平均分析系统 |
| `WAD` | `WAD(self, n=10, m=30, **kwargs) -> IndFrame` | ## 威廉多空力度线 - 威廉指标与量价结合的多空力量分析 |
| `AD` | `AD(self, **kwargs) -> IndSeries` | ## 累积/派发指标 - 资金流向和积累分布分析 |
| `CCL` | `CCL(self, close_oi=None, **kwargs) -> IndSeries` | ## 持仓异动指标 - 期货市场持仓变化分析 |
| `CJL` | `CJL(self, close_oi=None, **kwargs) -> IndFrame` | ## 成交持仓分析 - 期货市场成交和持仓量数据 |
| `PVT` | `PVT(self, **kwargs) -> IndSeries` | ## 价量趋势指数 - 价格与成交量的协同变化分析 |
| `VOSC` | `VOSC(self, short=12, long=26, **kwargs) -> IndSeries` | ## 成交量振荡器 - 成交量移动平均离差分析 |
| `VROC` | `VROC(self, n=12, **kwargs) -> IndSeries` | ## 成交量变动速率 - 成交量变化百分比分析 |
| `VRSI` | `VRSI(self, n=6, **kwargs) -> IndSeries` | ## 成交量相对强弱指标 - 成交量动量的RSI版本 |
| `WVAD` | `WVAD(self, **kwargs) -> IndSeries` | ## 威廉变异离散量 - 威廉指标与成交量结合的分析工具 |
| `MA` | `MA(self, n=30, **kwargs) -> IndSeries` | ## 简单移动平均线 - 最基础的价格趋势平滑工具 |
| `SMA` | `SMA(self, n=5, m=2, **kwargs) -> IndSeries` | ## 扩展指数加权移动平均 - 可调节权重的平滑移动平均 |
| `EMA` | `EMA(self, n=10, **kwargs) -> IndSeries` | ## 指数加权移动平均 - 对近期价格赋予更高权重的移动平均 |
| `EMA2` | `EMA2(self, n=10, **kwargs) -> IndSeries` | ## 线性加权移动平均 - 按时间线性加权的移动平均 |
| `TRMA` | `TRMA(self, n=10, **kwargs) -> IndSeries` | ## 三角移动平均线 - 双重平滑的移动平均变体 |
---

## TqFunc

## 天勤序列计算函数类
    - 封装天勤量化(TqSdk)的序列计算函数库，为技术指标和策略开发提供基础数学运算能力。

    ### 📘 **文档参考**:
    - API参考：https://www.minibt.cn/minibt_api_reference/tqfunc/
    - 天勤文档：https://tqsdk-python.readthedocs.io/en/latest/reference/tqsdk.tafunc.html

    ### 核心功能：
    - 序列位移计算：提供时间序列的滞后、超前等位移操作
    - 统计量计算：包含均值、标准差、极值等统计函数
    - 逻辑判断：支持交叉信号、条件计数等逻辑运算
    - 移动平均：多种类型的移动平均计算方法
    - 时间处理：时间格式转换和时间戳处理工具

    ### 使用说明：
    1. 初始化：传入minibt框架兼容的Series或DataFrame数据对象
    >>> # 类调用
        data = IndFrame(...)  # 包含OHLCV等基础字段的minibt数据对象
        tqfunc = TqFunc(data)
        # 通过指标调用
        self.kline.close.tqfunc

    2. 函数调用：直接调用对应函数方法，支持参数自定义
    >>> prev_close = close.tqfunc.ref(length=1)        # 获取前一期收盘价
        ma_20 = close.tqfunc.ma(length=20)             # 20周期简单移动平均


    ### 技术特点：
    - 天勤兼容：基于天勤官方函数库，确保计算准确性
    - 序列优化：针对金融时间序列数据特殊优化
    - 向量计算：支持批量数据处理，计算效率高
    - 边界处理：自动处理数据边界和缺失值情况
    - 类型安全：确保输入输出数据格式一致性

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `ref` | `ref(self, length=10, **kwargs) -> IndSeries` | ## 序列位移函数 - 计算序列的滞后值，获取指定周期前的数据 |
| `std` | `std(self, length: int=10, **kwargs) -> IndSeries` | ## 标准差计算 - 求序列每n个周期的标准差 |
| `ma` | `ma(self, length: int=10, **kwargs) -> IndSeries` | 简单移动平均函数 - 计算序列的简单移动平均值 |
| `sma` | `sma(self, n: int=10, m: int=2, **kwargs) -> IndSeries` | ## 扩展指数加权移动平均函数 - 计算序列的扩展指数加权移动平均值 |
| `ema` | `ema(self, length: int=10, **kwargs) -> IndSeries` | 指数加权移动平均函数 - 计算序列的指数加权移动平均值 |
| `ema2` | `ema2(self, length: int=10, **kwargs) -> IndSeries` | ## 线性加权移动平均函数 - 计算序列的线性加权移动平均值 |
| `crossup` | `crossup(self, b=None, **kwargs) -> IndSeries` | ## 向上穿越判断 - 判断序列a是否从下向上穿越序列b |
| `crossdown` | `crossdown(self, b=None, **kwargs) -> IndSeries` | ## 向下穿越判断 - 判断序列a是否从上向下穿越序列b |
| `count` | `count(self, length: int=10, **kwargs) -> IndSeries` | ## 条件计数统计 - 统计指定周期内满足条件的次数 |
| `trma` | `trma(self, length: int=10, **kwargs) -> IndSeries` | ## 三角移动平均 - 求序列的n周期三角移动平均值 |
| `harmean` | `harmean(self, length: int=10, **kwargs) -> IndSeries` | ## 调和平均值函数 - 计算序列在指定周期内的调和平均值 |
| `numpow` | `numpow(self, n: int=5, m: int=2, **kwargs) -> IndSeries` | ## 自然数幂方和函数 - 计算序列的自然数幂方加权和 |
| `abs` | `abs(self, **kwargs) -> IndSeries` | ## 绝对值函数 - 计算序列中每个元素的绝对值 |
| `min` | `min(self, b=None, **kwargs) -> IndSeries` | ## 最小值函数 - 获取两个序列中对应位置的最小值 |
| `max` | `max(self, b=None, **kwargs) -> IndSeries` | ## 最大值函数 - 获取两个序列中对应位置的最大值 |
| `median` | `median(self, length: int=10, **kwargs) -> IndSeries` | ## 中位数函数 - 计算序列在指定周期内的中位数值 |
| `exist` | `exist(self, length: int=10, **kwargs) -> IndSeries` | ## 条件存在判断 - 判断指定周期内是否存在满足条件的时点 |
| `every` | `every(self, length: int=3, **kwargs) -> IndSeries` | ## 持续满足判断 - 判断指定周期内是否持续满足条件 |
| `hhv` | `hhv(self, length: int=10, **kwargs) -> IndSeries` | ## 周期最高值 - 计算序列在指定周期内的最高值 |
| `llv` | `llv(self, length: int=10, **kwargs) -> IndSeries` | ## 周期最低值 - 计算序列在指定周期内的最低值 |
| `avedev` | `avedev(self, length: int=10, **kwargs) -> IndSeries` | ## 平均绝对偏差 - 计算序列在周期内的平均绝对偏差 |
| `barlast` | `barlast(self, **kwargs) -> IndSeries` | ## 条件间隔计数 - 计算从上一次条件成立到当前的周期数 |
| `cum_counts` | `cum_counts(self, **kwargs) -> IndSeries` | ## 连续条件计数 - 统计连续满足条件的周期数 |
| `time_to_ns_timestamp` | `time_to_ns_timestamp(self, **kwargs) -> IndSeries` | ## 纳秒时间戳转换 - 将时间转换为纳秒级时间戳 |
| `time_to_s_timestamp` | `time_to_s_timestamp(self, **kwargs) -> IndSeries` | ## 秒级时间戳转换 - 将时间转换为秒级时间戳 |
| `time_to_str` | `time_to_str(self, **kwargs) -> IndSeries` | ## 时间字符串转换 - 将时间转换为标准格式字符串 |
| `time_to_datetime` | `time_to_datetime(self, **kwargs) -> IndSeries` | ## datetime对象转换 - 将时间转换为datetime对象 |
---

## TuLip

## Tulip Indicators
    https://tulipindicators.org/

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `abs` | `abs(self, **kwargs) -> IndSeries` | ## Vector Absolute Value |
| `acos` | `acos(self, **kwargs) -> IndSeries` | ## Vector Arccosine |
| `ad` | `ad(self, **kwargs) -> IndSeries` | ## Accumulation/Distribution Line |
| `add` | `add(self, series=None, **kwargs) -> IndSeries` | ## Vector Addition |
| `adosc` | `adosc(self, short_period=10, long_period=10, **kwargs) -> IndSeries` | ## Accumulation/Distribution Oscillator |
| `adx` | `adx(self, period=10, **kwargs) -> IndSeries` | ## Average Directional Movement Index |
| `adxr` | `adxr(self, period=10, **kwargs) -> IndSeries` | ## Average Directional Movement Rating |
| `ao` | `ao(self, **kwargs) -> IndSeries` | ## Awesome Oscillator |
| `apo` | `apo(self, short_period=10, long_period=10, **kwargs) -> IndSeries` | ## Absolute Price Oscillator |
| `aroon` | `aroon(self, period=10, **kwargs) -> IndFrame` | ## Aroon |
| `aroonosc` | `aroonosc(self, period=10, **kwargs) -> IndSeries` | ## Aroon Oscillator |
| `asin` | `asin(self, **kwargs) -> IndSeries` | ## Vector Arcsine |
| `atan` | `atan(self, **kwargs) -> IndSeries` | ## Vector Arctangent |
| `atr` | `atr(self, period=10, **kwargs) -> IndSeries` | ## Average True Range |
| `avgprice` | `avgprice(self, **kwargs) -> IndSeries` | ## Average Price |
| `bbands` | `bbands(self, period=10, stddev=1.0, **kwargs) -> IndFrame` | ## Bollinger Bands |
| `bop` | `bop(self, **kwargs) -> IndSeries` | ## Balance of Power |
| `cci` | `cci(self, period=10, **kwargs) -> IndSeries` | ## Commodity Channel Index |
| `ceil` | `ceil(self, **kwargs) -> IndSeries` | ## Vector Ceiling |
| `cmo` | `cmo(self, period=10, **kwargs) -> IndSeries` | ## Chande Momentum Oscillator |
| `cos` | `cos(self, **kwargs) -> IndSeries` | ## Vector Cosine |
| `cosh` | `cosh(self, **kwargs) -> IndSeries` | ## Vector Hyperbolic Cosine |
| `crossany` | `crossany(self, series=None, **kwargs) -> IndSeries` | ## Crossany |
| `crossover` | `crossover(self, series=None, **kwargs) -> IndSeries` | ## Crossover |
| `cvi` | `cvi(self, period=10, **kwargs) -> IndSeries` | ## Chaikins Volatility |
| `decay` | `decay(self, period=10, **kwargs) -> IndSeries` | ## Linear Decay |
| `dema` | `dema(self, period=10, **kwargs) -> IndSeries` | ## Double Exponential Moving Average |
| `di` | `di(self, period=10, **kwargs) -> IndFrame` | ## Directional Indicator |
| `div` | `div(self, series=None, **kwargs) -> IndSeries` | ## Vector Division |
| `dm` | `dm(self, period=10, **kwargs) -> IndFrame` | ## Directional Movement |
| `dpo` | `dpo(self, period=10, **kwargs) -> IndSeries` | ## Detrended Price Oscillator |
| `dx` | `dx(self, period=10, **kwargs) -> IndSeries` | ## Directional Movement Index |
| `edecay` | `edecay(self, period=10, **kwargs) -> IndSeries` | ## Exponential Decay |
| `ema` | `ema(self, period=10, **kwargs) -> IndSeries` | ## Exponential Moving Average |
| `emv` | `emv(self, **kwargs) -> IndSeries` | ## Ease of Movement |
| `exp` | `exp(self, **kwargs) -> IndSeries` | ## Vector Exponential |
| `fisher` | `fisher(self, period=10, **kwargs) -> IndFrame` | ## Fisher Transform |
| `floor` | `floor(self, **kwargs) -> IndSeries` | ## Vector Floor |
| `fosc` | `fosc(self, period=10, **kwargs) -> IndSeries` | ## Forecast Oscillator |
| `hma` | `hma(self, period=10, **kwargs) -> IndSeries` | ## Hull Moving Average |
| `kama` | `kama(self, period=10, **kwargs) -> IndSeries` | ## Kaufman Adaptive Moving Average |
| `kvo` | `kvo(self, short_period=10, long_period=10, **kwargs) -> IndSeries` | ## Klinger Volume Oscillator |
| `lag` | `lag(self, period=10, **kwargs) -> IndSeries` | ## Lag |
| `linreg` | `linreg(self, period=10, **kwargs) -> IndSeries` | ## Linear Regression |
| `linregintercept` | `linregintercept(self, period=10, **kwargs) -> IndSeries` | ## Linear Regression Intercept |
| `linregslope` | `linregslope(self, period=10, **kwargs) -> IndSeries` | ## Linear Regression Slope |
| `ln` | `ln(self, **kwargs) -> IndSeries` | ## Vector Natural Log |
| `log10` | `log10(self, **kwargs) -> IndSeries` | ## Vector Base-10 Log |
| `macd` | `macd(self, short_period=12, long_period=26, signal_period=9, **kwargs) -> IndFrame` | ## Moving Average Convergence/Divergence |
| `marketfi` | `marketfi(self, **kwargs) -> IndSeries` | ## Market Facilitation Index |
| `mass` | `mass(self, period=10, **kwargs) -> IndSeries` | ## Mass Index |
| `max` | `max(self, period=10, **kwargs) -> IndSeries` | ## Maximum In Period |
| `md` | `md(self, period=10, **kwargs) -> IndSeries` | ## Mean Deviation Over Period |
| `medprice` | `medprice(self, **kwargs) -> IndSeries` | ## Median Price |
| `mfi` | `mfi(self, period=10, **kwargs) -> IndSeries` | ## Money Flow Index |
| `min` | `min(self, period=10, **kwargs) -> IndSeries` | ## Minimum In Period |
| `mom` | `mom(self, period=10, **kwargs) -> IndSeries` | ## Momentum |
| `msw` | `msw(self, period=10, **kwargs) -> IndFrame` | ## Mesa Sine Wave |
| `mul` | `mul(self, series=None, **kwargs) -> IndSeries` | ## Vector Multiplication |
| `natr` | `natr(self, period=10, **kwargs) -> IndSeries` | ## Normalized Average True Range |
| `nvi` | `nvi(self, **kwargs) -> IndSeries` | ## Negative Volume Index |
| `obv` | `obv(self, **kwargs) -> IndSeries` | ## On Balance Volume |
| `ppo` | `ppo(self, short_period=10, long_period=10, **kwargs) -> IndSeries` | ## Percentage Price Oscillator |
| `psar` | `psar(self, acceleration_factor_step=0.06185, acceleration_factor_maximum=0.6185, **kwargs)` | ## Parabolic SAR |
| `qstick` | `qstick(self, period=10, **kwargs) -> IndSeries` | ## Qstick |
| `roc` | `roc(self, period=10, **kwargs) -> IndSeries` | ## Rate of Change |
| `rocr` | `rocr(self, period=10, **kwargs) -> IndSeries` | ## Rate of Change Ratio |
| `round` | `round(self, **kwargs) -> IndSeries` | ## Vector Round |
| `rsi` | `rsi(self, period=10, **kwargs) -> IndSeries` | ## Relative Strength Index |
| `sin` | `sin(self, **kwargs) -> IndSeries` | ## Vector Sine |
| `sinh` | `sinh(self, **kwargs) -> IndSeries` | ## Vector Hyperbolic Sine |
| `sma` | `sma(self, period=10, **kwargs) -> IndSeries` | ## Simple Moving Average |
| `sqrt` | `sqrt(self, **kwargs) -> IndSeries` | ## Vector Square Root |
| `stddev` | `stddev(self, period=10, **kwargs) -> IndSeries` | ## Standard Deviation Over Period |
| `stderr` | `stderr(self, period=10, **kwargs) -> IndSeries` | ## Standard Error Over Period |
| `stoch` | `stoch(self, pct_k_period=5, pct_k_slowing_period=3, pct_d_period=3, **kwargs) -> IndFrame` | ## Stochastic Oscillator |
| `stochrsi` | `stochrsi(self, period=10, **kwargs) -> IndSeries` | ## Stochastic RSI |
| `sub` | `sub(self, series=None, **kwargs) -> IndSeries` | ## Vector Subtraction |
| `sum` | `sum(self, period=10, **kwargs) -> IndSeries` | ## Sum Over Period |
| `tan` | `tan(self, **kwargs) -> IndSeries` | ## Vector Tangent |
| `tanh` | `tanh(self, **kwargs) -> IndSeries` | ## Vector Hyperbolic Tangent |
| `tema` | `tema(self, period=10, **kwargs) -> IndSeries` | ## Triple Exponential Moving Average |
| `todeg` | `todeg(self, **kwargs) -> IndSeries` | ## Vector Degree Conversion |
| `torad` | `torad(self, **kwargs) -> IndSeries` | ## Vector Radian Conversion |
| `tr` | `tr(self, **kwargs) -> IndSeries` | ## True Range |
| `trima` | `trima(self, period=10, **kwargs) -> IndSeries` | ## Triangular Moving Average |
| `trix` | `trix(self, period=10, **kwargs) -> IndSeries` | ## Trix |
| `trunc` | `trunc(self, **kwargs) -> IndSeries` | ## Vector Truncate |
| `tsf` | `tsf(self, period=10, **kwargs) -> IndSeries` | ## Time Series Forecast |
| `typprice` | `typprice(self, **kwargs) -> IndSeries` | ## Typical Price |
| `ultosc` | `ultosc(self, short_period=2, medium_period=3, long_period=5, **kwargs) -> IndSeries` | ## Ultimate Oscillator |
| `var` | `var(self, period=10, **kwargs) -> IndSeries` | ## Variance Over Period |
| `vhf` | `vhf(self, period=10, **kwargs) -> IndSeries` | ## Vertical Horizontal Filter |
| `vidya` | `vidya(self, short_period=5, long_period=10, alpha=0.2, **kwargs) -> IndSeries` | ## Variable Index Dynamic Average |
| `volatility` | `volatility(self, period=10, **kwargs) -> IndSeries` | ## Annualized Historical Volatility |
| `vosc` | `vosc(self, short_period=2, long_period=5, **kwargs) -> IndSeries` | ## Volume Oscillator |
| `vwma` | `vwma(self, period=10, **kwargs) -> IndSeries` | ## Volume Weighted Moving Average |
| `wad` | `wad(self, **kwargs) -> IndSeries` | ## Williams Accumulation/Distribution |
| `wcprice` | `wcprice(self, **kwargs) -> IndSeries` | ## Weighted Close Price |
| `wilders` | `wilders(self, period=10, **kwargs) -> IndSeries` | ## Wilders Smoothing |
| `willr` | `willr(self, period=10, **kwargs) -> IndSeries` | ## Williams %R |
| `wma` | `wma(self, period=10, **kwargs) -> IndSeries` | ## Weighted Moving Average |
| `zlema` | `zlema(self, period=10, **kwargs) -> IndSeries` | ## Zero-Lag Exponential Moving Average |
---

## FinTa

finta指标指引

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `SMA` | `SMA(self, period: int=41, **kwargs) -> IndSeries` | 简单移动平均线 -  pandas中的滚动平均值，又称MA |
| `SMM` | `SMM(self, period: int=9, **kwargs) -> IndSeries` | 简单移动中位数 - 移动平均线的替代指标，对异常值更稳健 |
| `SSMA` | `SSMA(self, period: int=9, adjust: bool=True, **kwargs) -> IndSeries` | 平滑简单移动平均线 |
| `EMA` | `EMA(self, period: int=9, adjust: bool=True, **kwargs) -> IndSeries` | 指数加权移动平均线 - 适用于趋势市场，常与其他指标结合确认走势 |
| `DEMA` | `DEMA(self, period: int=9, adjust: bool=True, **kwargs) -> IndSeries` | 双指数移动平均线 - 通过对EMA二次处理减少滞后 |
| `TEMA` | `TEMA(self, period: int=9, adjust: bool=True, **kwargs) -> IndSeries` | 三重指数移动平均线 - 通过对EMA三次处理减少滞后 |
| `TRIMA` | `TRIMA(self, period: int=18, **kwargs) -> IndSeries` | 三角形移动平均线 - 对周期中间价格赋予更高权重 |
| `TRIX` | `TRIX(self, period: int=20, adjust: bool=True, **kwargs) -> IndSeries` | 三重指数移动平均变化率 - 围绕零轴波动，交叉零轴产生买卖信号 |
| `VAMA` | `VAMA(self, period: int=8, **kwargs) -> IndSeries` | 成交量调整移动平均线 |
| `ER` | `ER(self, period: int=10, **kwargs) -> IndSeries` | 考夫曼效率指标 - 震荡于+100至-100之间，指示趋势方向 |
| `KAMA` | `KAMA(self, er: int=10, ema_fast: int=2, ema_slow: int=30, period: int=20, **kwargs) -> IndSeries` | 考夫曼自适应移动平均线 - 结合方向与波动率，适应市场变化 |
| `ZLEMA` | `ZLEMA(self, period: int=26, adjust: bool=True, **kwargs) -> IndSeries` | 零滞后指数移动平均线 - 消除移动平均线固有的滞后性 |
| `WMA` | `WMA(self, period: int=9, **kwargs) -> IndSeries` | 加权移动平均线 - 比EMA更注重近期数据，帮助识别趋势 |
| `HMA` | `HMA(self, period: int=16, **kwargs) -> IndSeries` | 赫尔移动平均线 - 曲线更平滑，滞后性低，适用于中长期交易 |
| `EVWMA` | `EVWMA(self, period: int=20, **kwargs) -> IndSeries` | 弹性成交量加权移动平均线 - 近似近n期每股平均成交价 |
| `VWAP` | `VWAP(self, **kwargs) -> IndSeries` | 成交量加权平均价格 - 交易基准指标，计算当日总成交额/总成交量 |
| `SMMA` | `SMMA(self, period: int=42, adjust: bool=True, **kwargs) -> IndSeries` | 平滑移动平均线 - 近期价格与历史价格权重相等 |
| `FRAMA` | `FRAMA(self, period: int=16, batch: int=10, **kwargs) -> IndSeries` | 分形自适应移动平均线 |
| `MACD` | `MACD(self, period_fast: int=12, period_slow: int=26, signal: int=9, adjust: bool=True, **kwargs) -> IndFrame` | 指数平滑异同移动平均线 - 包含MACD线、信号线和MACD差 |
| `VW_MACD` | `VW_MACD(self, period_fast: int=12, period_slow: int=26, signal: int=9, adjust: bool=True, **kwargs) -> IndFrame` | 成交量加权MACD - 基于成交量加权移动平均计算的MACD |
| `EV_MACD` | `EV_MACD(self, period_fast: int=20, period_slow: int=40, signal: int=9, adjust: bool=True, **kwargs) -> IndFrame` | 弹性成交量加权MACD - 基于EVWMA计算的MACD变体 |
| `MOM` | `MOM(self, period: int=10, **kwargs) -> IndSeries` | 动量指标 - 固定时间间隔的价格差，围绕零轴波动 |
| `ROC` | `ROC(self, period: int=12, **kwargs) -> IndSeries` | 变化率指标 - 衡量价格较n期前的百分比变化 |
| `VBM` | `VBM(self, roc_period: int=12, atr_period: int=26, **kwargs) -> IndSeries` | 波动率基差动量 - 类似ROC，但除以ATR波动率 |
| `RSI` | `RSI(self, period: int=14, adjust: bool=True, **kwargs) -> IndSeries` | 相对强弱指数 - 震荡于0-100之间，70以上超买，30以下超卖 |
| `IFT_RSI` | `IFT_RSI(self, rsi_period: int=5, wma_period: int=9, **kwargs) -> IndSeries` | 改进型逆Fisher变换RSI - 交叉±0.5产生交易信号 |
| `DYMI` | `DYMI(self, adjust: bool=True, **kwargs) -> IndSeries` | 动态动量指数 - 可变周期RSI，3-30间波动，更早产生信号 |
| `TR` | `TR(self, **kwargs) -> IndSeries` | 真实波幅 - 取三个价格范围的最大值：当期最高价减当期最低价、当期最高价减前收盘价的绝对值、当期最低价减前收盘价的绝对值 |
| `ATR` | `ATR(self, period: int=14, **kwargs) -> IndSeries` | 平均真实波幅 - 真实波幅的移动平均值 |
| `SAR` | `SAR(self, af: int=0.02, amax: int=0.2, **kwargs) -> IndSeries` | 停损反转指标 - 随趋势延伸跟踪价格，上涨时在价格下方，下跌时在价格上方，价格突破指标时触发反转信号 |
| `PSAR` | `PSAR(self, iaf: int=0.02, maxaf: int=0.2, **kwargs) -> IndFrame` | 抛物线停损反转指标 - 用于判断趋势方向和潜在反转，通过跟踪止损点确定买卖点 |
| `BBANDS` | `BBANDS(self, period: int=20, MA: IndSeries=None, std_multiplier: float=2, **kwargs) -> IndFrame` | 布林带 - 移动平均线上下的波动率带，波动率基于标准差，波动率增大时带宽扩大，减小时缩小，支持传入自定义移动平均线 |
| `MOBO` | `MOBO(self, period: int=10, std_multiplier: float=0.8, **kwargs) -> IndFrame` | MOBO带 - 基于10期0.8倍标准差的波动带，价格突破带时可能预示趋势或价格波动，42%的价格波动（噪音）位于带内 |
| `BBWIDTH` | `BBWIDTH(self, period: int=20, MA: IndSeries=None, **kwargs) -> IndSeries` | 布林带带宽 - 标准化表示布林带的宽度 |
| `PERCENT_B` | `PERCENT_B(self, period: int=20, MA: IndSeries=None, **kwargs) -> IndSeries` | %b指标 - 基于随机指标公式，显示价格在布林带中的位置，上轨为1，下轨为0 |
| `KC` | `KC(self, period: int=20, atr_period: int=10, MA: IndSeries=None, kc_mult: float=2, **kwargs) -> IndFrame` | 肯特纳通道 - 基于指数移动平均线的波动率通道，用平均真实波幅（ATR）确定带宽，通常为20期EMA上下各2倍ATR，用于识别趋势反转和超买超卖 |
| `DO` | `DO(self, upper_period: int=20, lower_period: int=5, **kwargs) -> IndFrame` | 唐奇安通道 - 绘制过去一段时间内的最高价和最低价 |
| `DMI` | `DMI(self, period: int=14, adjust: bool=True, **kwargs) -> IndFrame` | 方向移动指数 - 评估价格方向和强度，帮助判断多空方向，对趋势交易策略尤其有用，能区分趋势强弱 |
| `ADX` | `ADX(self, period: int=14, adjust: bool=True, **kwargs) -> IndSeries` | 平均趋向指数 - 仅表示趋势强度，不指示方向，20以下为弱趋势，40以上为强趋势，50以上为极强趋势 |
| `PIVOT` | `PIVOT(self, **kwargs) -> IndFrame` | 枢轴点 - 重要的支撑和阻力位，通过最高价、最低价和收盘价计算，通常使用前一周期数据计算当前周期枢轴点 |
| `PIVOT_FIB` | `PIVOT_FIB(self, **kwargs) -> IndFrame` | 斐波那契枢轴点 - 先计算经典枢轴点，再结合前一周期波动范围与斐波那契比例计算支撑和阻力位 |
| `STOCH` | `STOCH(self, period: int=14, **kwargs) -> IndSeries` | 随机振荡器%K - 动量指标，比较证券收盘价与一定时期内价格范围的关系，可通过调整周期或取移动平均降低灵敏度 |
| `STOCHD` | `STOCHD(self, period: int=3, stoch_period: int=14, **kwargs) -> IndSeries` | 随机振荡器%D - %K的3期简单移动平均 |
| `STOCHRSI` | `STOCHRSI(self, rsi_period: int=14, stoch_period: int=14, **kwargs) -> IndSeries` | 随机相对强弱指数 - 将随机指标公式应用于RSI值，衡量RSI在一定时期高低范围内的水平，震荡于0-1之间 |
| `WILLIAMS` | `WILLIAMS(self, period: int=14, **kwargs) -> IndSeries` | 威廉指标%R - 显示当前收盘价相对于过去N天高低区间的位置，负值刻度，-100为最低，0为最高 |
| `UO` | `UO(self, **kwargs) -> IndSeries` | 终极振荡器 - 跨三个时间框架捕捉动量，避免单一时间框架振荡器的缺陷 |
| `AO` | `AO(self, slow_period: int=34, fast_period: int=5, **kwargs) -> IndSeries` | 真棒振荡器 - 衡量市场动量，计算34期与5期简单移动平均的差值（基于K线中点而非收盘价），用于确认趋势或预测反转 |
| `MI` | `MI(self, period: int=9, adjust: bool=True, **kwargs) -> IndSeries` | 质量指数 - 基于高低范围识别趋势反转，无方向偏差的波动率指标，通过范围扩张预示当前趋势反转 |
| `BOP` | `BOP(self, **kwargs) -> IndSeries` | 功率平衡指标 |
| `VORTEX` | `VORTEX(self, period: int=14, **kwargs) -> IndFrame` | 涡旋指标 - 两条震荡线分别识别正负趋势移动，基于近两期高低点距离计算，距离越长趋势越强 |
| `KST` | `KST(self, r1: int=10, r2: int=15, r3: int=20, r4: int=30, **kwargs) -> IndFrame` | 确然指标 - 基于四个时间框架的平滑变化率，可通过背离、超买超卖、信号线交叉等判断信号 |
| `TSI` | `TSI(self, long: int=25, short: int=13, signal: int=13, adjust: bool=True, **kwargs) -> IndSeries` | 真实强度指数 - 基于价格变化的双重平滑动量振荡器 |
| `TP` | `TP(self, **kwargs) -> IndSeries` | 典型价格 - 某一时期内最高价、最低价和收盘价的算术平均值 |
| `ADL` | `ADL(self, **kwargs) -> IndSeries` | 累积分布线 - 衡量资金流入流出，与涨跌线不同，用于判断买卖压力或确认趋势强度 |
| `CHAIKIN` | `CHAIKIN(self, adjust: bool=True, **kwargs) -> IndSeries` | 柴金振荡器 - 计算累积分布线的3期EMA与10期EMA的差值，凸显累积分布线的动量 |
| `MFI` | `MFI(self, period: int=14, **kwargs) -> IndSeries` | 资金流量指数 - 衡量资金流入流出的动量指标，可视为成交量调整后的RSI，超买超卖阈值为80和20 |
| `OBV` | `OBV(self, **kwargs) -> IndSeries` | 能量潮指标 - 累积指标，上涨日加成交量，下跌日减成交量，通过与价格背离预测走势或确认趋势 |
| `WOBV` | `WOBV(self, **kwargs) -> IndSeries` | 加权能量潮指标 - 考虑价格差异的OBV变体，避免常规OBV中价格小幅波动但成交量大时的剧烈变化 |
| `VZO` | `VZO(self, period: int=14, adjust: bool=True, **kwargs) -> IndSeries` | 成交量震荡指标 - 利用价格、前一期价格和移动平均线计算震荡值，领先指标，基于超买超卖计算买卖信号。5%-40%为上升趋势区，-40%-5%为下降趋势区；40% |
| `PZO` | `PZO(self, period: int=14, adjust: bool=True, **kwargs) -> IndSeries` | 价格震荡指标 - 仅基于一个条件：若当日收盘价高于昨日收盘价则为正值（看涨），否则为负值（看跌）。 |
| `EFI` | `EFI(self, period: int=13, adjust: bool=True, **kwargs) -> IndSeries` | 艾尔德力度指数 - 利用价格和成交量评估走势力度或识别潜在转折点。 |
| `CFI` | `CFI(self, adjust: bool=True, **kwargs) -> IndSeries` | 累积力度指数 - 基于艾尔德力度指数改进而来。 |
| `EBBP` | `EBBP(self, **kwargs) -> IndFrame` | 艾尔德多空力度指标 - 显示当日最高价和最低价相对于13日指数移动平均线（EMA）的位置。 |
| `EMV` | `EMV(self, period: int=14, **kwargs) -> IndSeries` | 简易波动指标 - 基于成交量的震荡指标，在零线上下波动，用于衡量价格移动的"难易程度"。指标为正时价格上涨较易，为负时价格下跌较易。 |
| `CCI` | `CCI(self, period: int=20, constant: float=0.015, **kwargs) -> IndSeries` | 商品通道指数 - 多功能指标，用于识别新趋势或警示极端情况，衡量当前价格相对于某段时间平均价格的位置。在零线上下震荡，常规范围为+100至-100；+100以上 |
| `COPP` | `COPP(self, adjust: bool=True, **kwargs) -> IndSeries` | 科派克曲线 - 动量指标，当指标从负值区间转为正值区间时，发出买入信号。 |
| `BASP` | `BASP(self, period: int=40, adjust: bool=True, **kwargs)` | 买卖压力指标 - 用于识别买入和卖出压力。 |
| `BASPN` | `BASPN(self, period: int=40, adjust: bool=True, **kwargs)` | 标准化买卖压力指标 |
| `CMO` | `CMO(self, period: int=9, factor: int=100, adjust: bool=True, **kwargs) -> IndSeries` | 钱德动量震荡指标 - 由技术分析师Tushar Chande发明的动量指标。通过计算近期上涨总和与下跌总和的差值，再除以该周期内价格总波动，结果在+100至-1 |
| `CHANDELIER` | `CHANDELIER(self, short_period: int=22, long_period: int=22, k: int=3, **kwargs) -> IndFrame` | 吊灯止损指标 - 基于平均真实波幅（ATR）设置跟踪止损。旨在让交易者紧跟趋势，在趋势延续时避免过早离场。通常在下跌趋势中位于价格上方，上涨趋势中位于价格下方。 |
| `QSTICK` | `QSTICK(self, period: int=14, **kwargs) -> IndSeries` | Qstick指标 - 通过过去N天的开盘价与收盘价平均差值，显示阴线（下跌）或阳线（上涨）的主导地位。 |
| `WTO` | `WTO(self, channel_length: int=10, average_length: int=21, adjust: bool=True, **kwargs)` | 波浪趋势震荡指标 |
| `FISH` | `FISH(self, period: int=10, adjust: bool=True, **kwargs) -> IndSeries` | 费雪变换指标 - 由John Ehlers提出，假设价格分布呈方波特性。 |
| `ICHIMOKU` | `ICHIMOKU(self, tenkan_period: int=9, kijun_period: int=26, senkou_period: int=52, chikou_period: int=26, **kwargs) -> IndFrame` | Ichimoku云图（一目均衡表） - 多功能指标，用于定义支撑位和阻力位、识别趋势方向、衡量动量并提供交易信号，意为"一眼看清的平衡图表"。 |
| `APZ` | `APZ(self, period: int=21, dev_factor: int=2, MA: IndSeries=None, adjust: bool=True, **kwargs) -> IndFrame` | 自适应价格带 - 由Lee Leibfarth开发的基于波动率的指标，以带状形式显示在价格图表上。在无趋势、震荡的市场中尤其有用，帮助交易者识别潜在的市场转折点 |
| `SQZMI` | `SQZMI(self, period: int=20, MA: IndSeries=None, **kwargs) -> IndSeries` | 挤压动量指标 - 用于识别市场盘整期。市场通常处于平静盘整或垂直价格发现状态，识别平静期有助于把握潜在的大波动交易机会。当市场进入"挤压"状态时，可通过整体动量 |
| `VPT` | `VPT(self, **kwargs) -> IndSeries` | 量价趋势指标 - 利用价格与前一期价格的差值结合成交量计算得出。若价格与VPT出现看涨背离（VPT上行、价格下行），则存在买入机会；若出现看跌背离（VPT下行、 |
| `FVE` | `FVE(self, period: int=22, factor: int=0.3, **kwargs) -> IndSeries` | 资金流量指标 - 有两项重要创新：一是同时考虑日内和日间价格行为，二是通过引入价格阈值纳入微小价格变化。 |
| `VFI` | `VFI(self, period: int=130, smoothing_factor: int=3, factor: int=0.2, vfactor: int=2.5, adjust: bool=True, **kwargs) -> IndSeries` | 成交量流量指标 - 基于价格移动方向跟踪成交量，类似能量潮指标（OBV）。 |
| `MSD` | `MSD(self, period: int=21, **kwargs) -> IndSeries` | 移动标准差 - 统计术语，衡量数据围绕平均值的离散程度，也是波动率的衡量指标。离散程度越大，标准差越高；价格剧烈变化时标准差显著上升，市场稳定时标准差较低。低标 |
| `STC` | `STC(self, period_fast: int=23, period_slow: int=50, k_period: int=10, d_period: int=3, adjust: bool=True, **kwargs) -> IndSeries` | 沙夫趋势周期指标 - 可视为MACD的双重平滑随机指标。计算步骤：1. 计算快速周期（23）和慢速周期（50）的EMA，两者差值为MACD；2. 计算MACD的 |
| `EVSTC` | `EVSTC(self, period_fast: int=12, period_slow: int=30, k_period: int=10, d_period: int=3, adjust: bool=True, **kwargs) -> IndSeries` | 改进型沙夫趋势周期指标 - 使用EVWMA MACD进行计算的沙夫趋势周期变体。 |
| `WILLIAMS_FRACTAL` | `WILLIAMS_FRACTAL(self, period: int=2, **kwargs) -> IndFrame` | 威廉姆斯分形指标 - 识别分形结构的指标。 |
| `VC` | `VC(self, period: int=5, **kwargs) -> IndSeries` | 计算价值图表（Value Chart）指标，用于标准化价格波动分析 |
| `WAVEPM` | `WAVEPM(self, period: int=14, lookback_period: int=100, **kwargs) -> IndSeries` | 计算WAVEPM（Wave Pattern Momentum）指标，用于分析价格波动模式的动量 |
---

## Pair

## 配对交易策略类

    - 配对交易是一种统计套利策略，通过识别具有长期均衡关系的两只或多只资产，
    - 当它们之间的价差偏离历史均值时，分别做多和做空，等待价差回归时平仓获利。

    ## 策略方法分类：

    ### 基础方法：
    - `bollinger_bands_strategy`: 布林带策略 - 使用布林带识别价差偏离
    - `percentage_deviation_strategy`: 百分比偏差策略 - 基于百分比偏离识别交易机会
    - `rolling_quantile_strategy`: 移动窗口分位数策略 - 使用分位数识别极端偏离
    - `z_score_strategy`: Z-score策略 - 基于标准分数识别统计套利机会

    ### 高级方法：
    - `hurst_filter_strategy`: Hurst指数过滤策略 - 使用Hurst指数过滤趋势性价差
    - `kalman_filter_strategy`: 卡尔曼滤波策略 - 动态估计对冲比率和价差
    - `garch_volatility_adjusted_signals`: GARCH模型波动率调整策略 - 考虑时变波动率
    - `vecm_based_signals`: VECM模型策略 - 基于向量误差修正模型识别长期均衡关系

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `bollinger_bands` | `bollinger_bands(self, window: int=60, num_std: float=2.0, **kwargs) -> IndFrame` | ## 布林带配对交易策略 |
| `percentage_deviation` | `percentage_deviation(self, window: int=60, threshold: float=0.1, **kwargs) -> IndFrame` | ## 百分比偏差配对交易策略 |
| `rolling_quantile` | `rolling_quantile(self, window: int=60, upper_quantile: float=0.95, lower_quantile: float=0.05, **kwargs) -> IndFrame` | ## 移动窗口分位数配对交易策略 |
| `z_score` | `z_score(self, window: int=60, z_threshold: float=2.0, **kwargs) -> IndFrame` | ## Z-score配对交易策略 |
| `hurst_filter` | `hurst_filter(self, hurst_threshold: float=0.5, z_threshold: float=2.0, **kwargs) -> IndFrame` | ## Hurst指数过滤策略 |
| `kalman_filter` | `kalman_filter(self, y_series=None, z_threshold: float=2.0, **kwargs) -> IndFrame` | ## 卡尔曼滤波配对交易策略 |
| `garch_volatility_adjusted` | `garch_volatility_adjusted(self, z_threshold: float=2.0, **kwargs) -> IndFrame` | ## GARCH波动率调整策略 |
| `vecm_based` | `vecm_based(self, y_series=None, window: int=60, lag: int=2, **kwargs) -> IndFrame` | ## 向量误差修正模型（VECM）策略 |
---

## Factors

## 多因子模型类

    - 该类提供了多种多因子建模和组合方法，用于将多个技术指标或特征因子
    - 融合为综合评分或趋势信号。

    ### 主要功能：
    - 1. 单资产多因子策略：基于IC（信息系数）动态加权多个因子
    - 2. PCA趋势指标：使用主成分分析降维提取核心趋势信号
    - 3. 自适应权重趋势：基于因子历史表现动态调整权重
    - 4. 因子优化器：通过优化算法寻找最优因子组合权重

    ### 核心概念：
    - **因子**：能够预测资产未来收益率的特征或指标
    - **IC（信息系数）**：因子值与未来收益率的Spearman秩相关系数
    - **IR（信息比率）**：IC均值与IC标准差的比值，衡量因子稳定性
    - **主成分分析**：通过正交变换将相关因子转换为不相关的主成分
    - **动态加权**：根据因子近期表现调整权重，适应市场环境变化

### 其他

| 方法 | 签名 | 说明 |
|------|------|------|
| `single_asset_multi_factor_strategy` | `single_asset_multi_factor_strategy(self, *factors: tuple[pd.DataFrame | pd.Series], window: int=10, top_pct: float=0.2, bottom_pct: float=0.2, isstand: bool=True, **kwargs)` | ## 单资产多因子策略 |
| `pca_trend_indicator` | `pca_trend_indicator(self, *factors: tuple[pd.DataFrame | pd.Series], n_components: int=2, dynamic_sign: bool=True, filter_low_variance: bool=True)` | ## PCA趋势指标 |
| `adaptive_weight_trend` | `adaptive_weight_trend(self, windows: list=[5, 20, 50], lookback: int=10, **kwargs)` | ## 自适应权重趋势指标 |
| `factor_optimizer` | `factor_optimizer(self, *factors: tuple[pd.DataFrame | pd.Series], max_weight: float=0.8, l2_reg: float=0.0001, min_ic_abs: float=0.03, n_init_points: int=10, optimization_model: str='scipy', **kwargs)` | ## 因子优化器 |
---

## TradingView

## TradingView 社区策略指标集合类

    - **TradingView 策略指标集合类**，用于将 TradingView 平台上广受欢迎的交易策略和指标转换为框架内置的指标数据类型（IndSeries/IndFrame）

    ### 📘 **API文档参考**:
    - https://www.minibt.cn/minibt_api_reference/tradingview/

    ### 核心功能：
    - 封装 TradingView 社区的优质策略指标，提供统一的调用接口
    - 通过 BtIndicator 基类自动处理指标参数校验、计算逻辑调用和返回值转换，确保输出为框架兼容的 IndSeries 或 IndFrame
    - 支持多维度交易策略场景，覆盖趋势跟踪、均值回归、波动率分析、动量交易等量化交易核心需求
    - 内置策略分类体系，便于按交易风格和策略类型快速定位和调用目标指标

    ### 策略分类与包含列表：
    该类支持的策略指标按功能划分为以下 8 大类，具体包含指标如下：

    #### **1. 趋势跟踪策略（Trend Following）**
       - 功能：识别和跟踪市场趋势方向，在趋势启动时入场，趋势结束时出场
       - 包含策略：Powertrend_Volume_Range_Filter_Strategy、Nadaraya_Watson_Envelope_Strategy、Adaptive_Trend_Filter、
       - Multi_Step_Vegas_SuperTrend_strategy、RJ_Trend_Engine、AlphaTrend、SuperTrend、SuperTrend_STRATEGY、Optimized_Trend_Tracker

    #### **2. 均值回归策略（Mean Reversion）**
       - 功能：在价格偏离均值时入场，预期价格回归均值时出场
       - 包含策略：DCA_Strategy_with_Mean_Reversion_and_Bollinger_Band、Bollinger_RSI_Double_Strategy、CM_Williams_Vix_Fix_Finds_Market_Bottoms

    #### **3. 突破策略（Breakout）**
       - 功能：在价格突破关键支撑阻力位时入场，捕捉趋势启动机会
       - 包含策略：Turtles_strategy、Turtle_Trade_Channels_Indicator_TUTCI、G_Channels、Twin_Range_Filter

    #### **4. 动量策略（Momentum）**
       - 功能：基于价格和成交量的动量变化识别交易机会
       - 包含策略：The_Flash_Strategy、WaveTrend_Oscillator、TonyUX_EMA_Scalper、Volume_Flow_Indicator

    #### **5. 波动率策略（Volatility）**
       - 功能：基于市场波动率变化调整交易参数和风险管理
       - 包含策略：STD_Filtered、PMax_Explorer、PMax_Explorer_STRATEGY、Chandelier_Exit、Pivot_Point_Supertrend

    #### **6. 机器学习策略（Machine Learning）**
       - 功能：基于自适应算法和AI技术优化策略参数
       - 包含策略：Quantum_Edge_Pro_Adaptive_AI、LOWESS

    #### **7. 信号处理策略（Signal Processing）**
       - 功能：基于信号处理理论分析价格数据
       - 包含策略：The_Price_Radio、ADX_and_DI

    #### **8. 风险管理策略（Risk Management）**
       - 功能：专注于头寸管理和风险控制的策略工具
       - 包含策略：Chandelier_Exit、Turtles_strategy

    ### 使用说明：
    #### 1. 初始化：
    - 传入框架支持的 KLine、IndFrame 或 IndSeries 数据对象（需包含策略计算所需的基础字段，如 open、high、low、close、volume 等）
    >>> data = IndFrame(...)  # 框架内置数据对象（含OHLCV等基础字段）
    >>> tv = TradingView(data)

    #### 2. 策略调用：
    - 直接调用对应策略方法，传入必要参数（默认参数已适配常见场景，可按需调整）
    >>> # 示例1：调用海龟交易策略
    >>> # 返回框架内置IndFrame，含多空信号和出场信号
    >>> turtle_signals = tv.Turtles_strategy(enter_fast=20, exit_fast=10, enter_slow=55, exit_slow=20)
    >>> # 示例2：调用超级趋势策略
    >>> supertrend_data = tv.SuperTrend_STRATEGY(Periods=10, Multiplier=3.0)
    >>> # 示例3：调用自适应AI策略
    >>> ai_scores = tv.Quantum_Edge_Pro_Adaptive_AI(LEARNING_PERIOD=40, ADAPTATION_SPEED=0.3)

    #### 3. 返回值特性：
    - 所有方法返回框架内置的 IndSeries 或 IndFrame 类型，可直接用于后续策略逻辑（如信号生成、风险控制），无需额外类型转换

    ### 策略集成示例：
    ```python
    class AdvancedStrategy(Strategy):
        def __init__(self):
            self.data = self.get_data(LocalDatas.test)
            self.tv = self.data.tradingview

            # 多重策略信号集成
            self.trend_signals = self.tv.SuperTrend_STRATEGY(Periods=10, Multiplier=3.0)
            self.momentum_signals = self.tv.WaveTrend_Oscillator(n1=10, n2=21, n3=9)
            self.volume_signals = self.tv.Volume_Flow_Indicator(length=130, coef=0.2)

        def next(self):
            if not self.data.position:
                # 趋势确认 + 动量确认 + 成交量确认
                long_condition = (self.trend_signals.long_signal.new & 
                                 (self.momentum_signals.wt1.new > 0) & 
                                 (self.volume_signals.vfi.new > 0))

                short_condition = (self.trend_signals.short_signal.new & 
                                  (self.momentum_signals.wt1.new < 0) & 
                                  (self.volume_signals.vfi.new < 0))

                # 执行交易逻辑
                if long_condition:
                    self.data.buy()
                elif short_condition:
                    self.data.sell()
    ```

    ### 注意事项：
    - 不同策略对基础数据字段要求不同，调用前确保输入数据包含所需字段（如成交量策略需要volume字段）
    - 策略参数对性能影响显著，建议通过回测优化确定最佳参数组合
    - 复杂策略（如AI自适应策略）需要足够的历史数据才能有效工作
    - 建议在模拟环境中充分测试策略表现后再实盘应用
    - 可结合框架的风险管理模块控制单策略和组合风险

    ### 性能优化建议：
    - 1. **参数调优**：使用框架的回测工具对策略参数进行优化
    - 2. **组合使用**：将不同策略信号组合使用，提高系统稳定性
    - 3. **风险分散**：在同一策略类别中选择多个不相关策略分散风险
    - 4. **市场适应**：根据不同市场环境动态调整策略权重
    - 5. **监控评估**：定期评估策略表现，及时调整或替换失效策略

### 方法

#### `def __init__(self, kline: KLine)`

#### `def Powertrend_Volume_Range_Filter_Strategy(self, l=200, lengthvwma=200, mult=3.0, lengthadx=200, lengthhl=14, useadx=False, usehl=False, usevwma=False, highlighting=True, **kwargs) -> IndFrame`

## 成交量范围过滤策略

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.1_powertrend_volume_range_filter/
        - ✈ https://cn.tradingview.com/script/45FlB2qH-Powertrend-Volume-Range-Filter-Strategy-wbburgin/

        Args:
            l: 平滑范围周期
            lengthvwma: 成交量加权移动平均周期
            mult: 范围乘数
            lengthadx: ADX指标周期
            lengthhl: 高低点周期
            useadx: 是否使用ADX过滤
            usehl: 是否使用高低点过滤
            usevwma: 是否使用VWMA过滤
            highlighting: 是否高亮显示
            **kwargs: 其他参数

        Returns:
            tuple: (volrng, hband, lowband, dir, long_signal, short_signal)
                - volrng: 成交量范围过滤线
                - hband: 上轨
                - lowband: 下轨
                - dir: 方向指标
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def Nadaraya_Watson_Envelope_Strategy(self, customLookbackWindow=8.0, customRelativeWeighting=8.0, customStartRegressionBar=25.0, length=60, customATRLength=60, customNearATRFactor=1.5, customFarATRFactor=2.0, **kwargs) -> IndFrame`

## Nadaraya-Watson包络线策略

        ### 📘 **文档参考**:
        - ✈ https://cn.tradingview.com/script/HrZicISx-Nadaraya-Watson-Envelope-Strategy-Non-Repainting-Log-Scale/

        Args:
            customLookbackWindow: 自定义回看窗口
            customRelativeWeighting: 自定义相对权重
            customStartRegressionBar: 自定义回归起始柱
            length: 周期长度
            customATRLength: ATR周期长度
            customNearATRFactor: 近端ATR因子
            customFarATRFactor: 远端ATR因子
            **kwargs: 其他参数

        Returns:
            tuple: (customEnvelopeClose, customEnvelopeHigh, customEnvelopeLow, customUpperNear,
                   customUpperFar, customUpperAvg, customLowerNear, customLowerFar, customLowerAvg,
                   long_signal, short_signal)

#### `def G_Channels(self, length=144.0, cycle=1, thresh=0.0, **kwargs) -> IndFrame`

## G通道指标 - 高效计算上下极值点

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.2_g_channels/
        - ✈ https://www.tradingview.com/script/fIvlS64B-G-Channels-Efficient-Calculation-Of-Upper-Lower-Extremities/

        Args:
            length: 通道长度
            cycle: 周期循环
            thresh: zig参数
            **kwargs: 其他参数

        Returns:
            G_Channels: 包含a(上轨), b(下轨), avg(中轨), zig(之字转向)线的指标对象

#### `def STD_Filtered(self, period=25, order=5, filterperiod=10, filter=1.0, **kwargs) -> IndFrame`

## STD过滤N极高斯滤波器

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.3_std_filtered_n_pole_gaussian_filter/
        - ✈ https://cn.tradingview.com/script/i4xZNAoy-STD-Filtered-N-Pole-Gaussian-Filter-Loxx/

        Args:
            period: 主周期
            order: 阶数
            filterperiod: 过滤周期
            filter: 过滤因子
            **kwargs: 其他参数

        Returns:
            tuple: (filt, long_signal, short_signal)
                - filt: 过滤后的信号线
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def Turtles_strategy(self, enter_fast=20, exit_fast=10, enter_slow=55, exit_slow=20, **kwargs) -> IndFrame`

## 海龟交易策略 - 历经20年验证的有效策略

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/Q1O23zJP-20-years-old-turtles-strategy-still-work/

        Args:
            enter_fast: 快速入场周期
            exit_fast: 快速出场周期
            enter_slow: 慢速入场周期
            exit_slow: 慢速出场周期
            **kwargs: 其他参数

        Returns:
            tuple: (long_signal, short_signal,
                    exitlong_signal, exitshort_signal)
                - long_signal: 多头入场信号
                - short_signal: 空头入场信号
                - exitlong_signal: 多头出场信号
                - exitshort_signal: 空头出场信号

#### `def Adaptive_Trend_Filter(self, alphaFilter=0.01, betaFilter=0.1, filterPeriod=21, supertrendFactor=1, supertrendAtrPeriod=7, **kwargs) -> IndFrame`

## 自适应趋势过滤器

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.4_adaptive_trend_filter/
        - ✈ https://cn.tradingview.com/script/PhSlALob-Adaptive-Trend-Filter-tradingbauhaus/

        Args:
            alphaFilter: Alpha过滤参数
            betaFilter: Beta过滤参数
            filterPeriod: 过滤周期
            supertrendFactor: 超级趋势因子
            supertrendAtrPeriod: 超级趋势ATR周期
            **kwargs: 其他参数

        Returns:
            IndFrame: (filteredValue, supertrendValue, trendDirection)
                - filteredValue: 过滤后的数值
                - supertrendValue: 超级趋势值
                - trendDirection: 趋势方向

#### `def DCA_Strategy_with_Mean_Reversion_and_Bollinger_Band(self, length=14, mult=2.0, **kwargs) -> IndFrame`

## 均值回归与布林带结合的DCA策略

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/uVaU9LVC-DCA-Strategy-with-Mean-Reversion-and-Bollinger-Band/

        Args:
            length: 布林带周期
            mult: 布林带乘数
            **kwargs: 其他参数

        Returns:
            tuple: (upper, lower, long_signal, short_signal)
                - upper: 布林带上轨
                - lower: 布林带下轨
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def Multi_Step_Vegas_SuperTrend_strategy(self, atrPeriod=10, vegasWindow=100, superTrendMultiplier=5, volatilityAdjustment=5, matype='jma', **kwargs) -> IndFrame`

## 多步维加斯超级趋势策略

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.5_multi_step_vegas_supertrend/
        - ✈ https://cn.tradingview.com/script/SXtas3lS-Multi-Step-Vegas-SuperTrend-strategy-presentTrading/

        Args:
            atrPeriod: ATR周期
            vegasWindow: 维加斯窗口
            superTrendMultiplier: 超级趋势乘数
            volatilityAdjustment: 波动率调整
            matype: 移动平均类型
            **kwargs: 其他参数

        Returns:
            tuple: (superTrend, marketTrend, long_signal, short_signal)
                - superTrend: 超级趋势线
                - marketTrend: 市场趋势
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def The_Flash_Strategy(self, length=10, mom_rsi_val=50, atrPeriod=10, factor=3.0, AP2=12, AF2=0.1618, **kwargs) -> IndFrame`

## Flash策略 - 动量RSI与EMA交叉结合ATR

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.6_the_flash_strategy/
        - ✈ https://cn.tradingview.com/script/XKgLfo15-The-Flash-Strategy-Momentum-RSI-EMA-crossover-ATR/

        Args:
            length: RSI周期
            mom_rsi_val: 动量RSI阈值
            atrPeriod: ATR周期
            factor: 超级趋势因子
            AP2: 自适应周期参数2
            AF2: 自适应因子2
            **kwargs: 其他参数

        Returns:
            tuple: (supertrend, Trail2, long_signal, short_signal)
                - supertrend: 超级趋势线
                - Trail2: 跟踪止损线2
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def Quantum_Edge_Pro_Adaptive_AI(self, TICK_SIZE=0.25, POINT_VALUE=2, DOLLAR_PER_POINT=2, LEARNING_PERIOD=40, ADAPTATION_SPEED=0.3, PERFORMANCE_MEMORY=200, BASE_MIN_SCORE=2, BASE_BARS_BETWEEN=9, MAX_DAILY_TRADES=50, **kwargs) -> IndFrame`

## 量子边缘专业自适应AI策略

        ✈ https://cn.tradingview.com/script/iGZZmHEo-Quantum-Edge-Pro-Adaptive-AI/

        Args:
            TICK_SIZE: 最小变动价位
            POINT_VALUE: 点值
            DOLLAR_PER_POINT: 每点美元价值
            LEARNING_PERIOD: 学习周期
            ADAPTATION_SPEED: 适应速度
            PERFORMANCE_MEMORY: 性能记忆周期
            BASE_MIN_SCORE: 基础最小分数
            BASE_BARS_BETWEEN: 基础间隔柱数
            MAX_DAILY_TRADES: 最大日交易次数
            **kwargs: 其他参数

        Returns:
            weighted_score: 加权评分信号

#### `def LOWESS(self, length=100, malen=100, **kwargs) -> IndFrame`

## LOWESS局部加权散点图平滑

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.8_lowess_locally_weighted_scatterplot_smoothing/
        - ✈ https://cn.tradingview.com/script/hyeoDyZn-LOWESS-Locally-Weighted-Scatterplot-Smoothing-ChartPrime/

        Args:
            length: 主周期长度
            malen: 移动平均长度
            **kwargs: 其他参数

        Returns:
            tuple: (GaussianMA, smoothed)
                - GaussianMA: 高斯移动平均
                - smoothed: 平滑后的信号

#### `def The_Price_Radio(self, length=60, period=14, **kwargs) -> IndFrame`

## John Ehlers价格收音机指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.9_john_ehlers_the_price_radio/
        - ✈ https://cn.tradingview.com/script/W5lBL0MV-John-Ehlers-The-Price-Radio/

        Args:
            length: 周期长度
            period: 变化周期
            **kwargs: 其他参数

        Returns:
            tuple: (deriv, amup, amdn, fm)
                - deriv: 价格导数
                - amup: AM上轨
                - amdn: AM下轨
                - fm: FM信号

#### `def PMax_Explorer(self, Periods=10, Multiplier=3, mav='ema', length=10, var_length=9, **kwargs) -> IndFrame`

## PMax探索者指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.10_pmax_explorer/
        - ✈ https://cn.tradingview.com/script/nHGK4Qtp/

        Args:
            Periods: ATR周期
            Multiplier: 乘数因子
            mav: 移动平均类型
            length: 移动平均长度
            var_length: 变异长度
            **kwargs: 其他参数

        Returns:
            pmax: PMax指标线

#### `def VMA_Win(self, length=15, **kwargs) -> IndFrame`

## VMA赢家仪表板 - 不同长度的VMA分析

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/09F2GICn-VMA-Win-Dashboard-for-Different-Lengths/

        Args:
            length: VMA周期长度
            **kwargs: 其他参数

        Returns:
            vma: 变异移动平均线

#### `def RJ_Trend_Engine(self, psarStart=0.02, psarIncrement=0.02, psarMax=0.2, stAtrPeriod=10, stFactor=3.0, adxLen=14, adxThreshold=20, bbLength=20, bbStdDev=3.0, **kwargs) -> IndFrame`

## RJ趋势引擎 - 最终版本

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.11_rj_trend_engine_final_version/
        - ✈ https://cn.tradingview.com/script/xZ9IlWfi-RJ-Trend-Engine-Final-Version/

        Args:
            psarStart: SAR起始值
            psarIncrement: SAR增量
            psarMax: SAR最大值
            stAtrPeriod: 超级趋势ATR周期
            stFactor: 超级趋势因子
            adxLen: ADX长度
            adxThreshold: ADX阈值
            bbLength: 布林带长度
            bbStdDev: 布林带标准差
            **kwargs: 其他参数

        Returns:
            tuple: (psar, supertrend, long_signal, short_signal)
                - psar: 抛物线转向指标
                - supertrend: 超级趋势线
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def Twin_Range_Filter(self, per1=127, mult1=1.6, per2=155, mult2=2.0, **kwargs) -> IndFrame`

## 双范围过滤器 - 买卖信号生成

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.12_twin_kange_filter/
        - ✈ https://cn.tradingview.com/script/57i9oK2t-Twin-Range-Filter-Buy-Sell-Signals/

        Args:
            per1: 第一个周期
            mult1: 第一个乘数
            per2: 第二个周期
            mult2: 第二个乘数
            **kwargs: 其他参数

        Returns:
            tuple: (filt, long_signal, short_signal)
                - filt: 过滤线
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def PMax_Explorer_STRATEGY(self, Periods=10, Multiplier=3.0, mav='ema', length=10, **kwargs) -> IndFrame`

## PMax探索者策略

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/nHGK4Qtp/

        Args:
            Periods: 周期参数
            Multiplier: 乘数因子
            mav: 移动平均类型
            length: 移动平均长度
            **kwargs: 其他参数

        Returns:
            tuple: (pmax, thrend, long_signal, short_signal)
                - pmax: PMax指标线
                - thrend: 趋势线
                - long_signal: 多头信号
                - short_signal: 空头信号

#### `def UT_Bot_Alerts(self, a=1.0, c=10, h=False, **kwargs) -> IndFrame`

## UT Bot 警报指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.13_ut_bot_alerts/
        - ✈ https://cn.tradingview.com/script/n8ss8BID-UT-Bot-Alerts/

        Args:
            a: 调整因子参数，默认 `1.0`
            c: 周期相关参数，默认 `10`
            h: 布尔值，控制是否启用高亮等额外显示逻辑，默认 `False`
            **kwargs: 其他扩展参数

        Returns:
            IndFrame:alerts, long_signal, short_signal
            UT Bot 警报相关的指标数据（如信号标记、警报触发状态等）

#### `def SuperTrend(self, Periods=10, Multiplier=3.0, changeATR=True, **kwargs) -> IndFrame`

## 超级趋势指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.14_supertrend/
        - ✈ https://cn.tradingview.com/script/r6dAP7yi/

        Args:
            Periods: ATR 计算周期，默认 `10`
            Multiplier: ATR 乘数（用于调整趋势带宽度），默认 `3.0`
            changeATR: 布尔值，控制是否采用特殊逻辑计算 ATR，默认 `True`
            **kwargs: 其他扩展参数

        Returns:
            超级趋势指标相关数据（如趋势线位置、多空趋势信号等）

#### `def CM_Williams_Vix_Fix_Finds_Market_Bottoms(self, hl=22, bbl=20, mult=2.0, lb=50, ph=0.85, pl=1.01, **kwargs) -> IndFrame`

## CM Williams Vix Fix 市场底部识别指标

        ### 📘 **文档参考**:
        - ✈ https://cn.tradingview.com/script/og7JPrRA-CM-Williams-Vix-Fix-Finds-Market-Bottoms/

        Args:
            hl: 高低点计算周期，默认 `22`
            bbl: 布林带周期，默认 `20`
            mult: 布林带乘数，默认 `2.0`
            lb: 历史范围统计周期，默认 `50`
            ph: 高点范围系数，默认 `0.85`
            pl: 低点范围系数，默认 `1.01`
            **kwargs: 其他扩展参数

        Returns:
            包含 `vwf`（波动率指标）、`lowerBand`（下轨）、`upperBand`（上轨）、`rangeHigh`（高范围）、`rangeLow`（低范围）的指标数据

#### `def WaveTrend_Oscillator(self, n1=10, n2=21, n3=9, **kwargs) -> IndFrame`

## WaveTrend 振荡器指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.15_wavetrend_oscillator/
        - ✈ https://cn.tradingview.com/script/2KE8wTuF-Indicator-WaveTrend-Oscillator-WT/

        Args:
            n1: 第一周期参数，默认 `10`
            n2: 第二周期参数，默认 `21`
            n3: 第三周期参数，默认 `9`
            **kwargs: 其他扩展参数

        Returns:
            包含 `signal`（信号值）、`wt1`（WaveTrend 核心值1）、`wt2`（WaveTrend 核心值2）的指标数据

#### `def ADX_and_DI(self, length=14, **kwargs) -> IndFrame`

## ADX 与 DI 指标（平均方向指数 + 方向指标）

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/VTPMMOrx-ADX-and-DI/

        Args:
            length: ADX 计算周期，默认 `14`
            **kwargs: 其他扩展参数

        Returns:
            包含 `ADX`（趋势强度）、`DIPlus`（正向方向指标）、`DIMinus`（负向方向指标）的指标数据

#### `def Bollinger_RSI_Double_Strategy(self, RSIlength=6, RSIoverSold=50.0, RSIoverBought=50.0, BBlength=200, BBmult=2.0, **kwargs) -> IndFrame`

## 布林带 + RSI 双重策略

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/uCV8I4xA-Bollinger-RSI-Double-Strategy-by-ChartArt-v1-1/

        Args:
            RSIlength: RSI 计算周期，默认 `6`
            RSIoverSold: RSI 超卖阈值，默认 `50.0`
            RSIoverBought: RSI 超买阈值，默认 `50.0`
            BBlength: 布林带计算周期，默认 `200`
            BBmult: 布林带乘数，默认 `2.0`
            **kwargs: 其他扩展参数

        Returns:
            包含 `BBupper`（布林带上轨）、`BBlower`（布林带下轨）、`long_signal`（多头信号）、`short_signal`（空头信号）的策略数据

#### `def Pivot_Point_Supertrend(self, prd=2, Factor=3, Pd=10, **kwargs) -> IndFrame`

## 枢轴点 + 超级趋势指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.16_pivot_point_supertrend/
        - ✈ https://cn.tradingview.com/script/L0AIiLvH-Pivot-Point-Supertrend/

        Args:
            prd: 枢轴点计算周期相关参数，默认 `2`
            Factor: 超级趋势乘数，默认 `3`
            Pd: ATR 计算周期，默认 `10`
            **kwargs: 其他扩展参数

        Returns:
            包含 `Trailingsl`（跟踪止损线）、`long_signal`（多头信号）、`short_signal`（空头信号）的指标数据

#### `def AlphaTrend(self, coeff=1.0, AP=14, novolumedata=False, **kwargs) -> IndFrame`

## Alpha 趋势指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.17_alphatrend/
        - ✈ https://cn.tradingview.com/script/o50NYLAZ-AlphaTrend/

        Args:
            coeff: 系数参数，默认 `1.0`
            AP: ATR 计算周期，默认 `14`
            novolumedata: 布尔值，控制是否禁用成交量数据，默认 `False`
            **kwargs: 其他扩展参数

        Returns:
            包含 `AlphaTrend`（趋势线）、`AlphaTrend2`（延迟趋势线）、`long_signal`（多头信号）、`short_signal`（空头信号）的指标数据

#### `def Volume_Flow_Indicator(self, length=130, coef=0.2, vcoef=2.5, signalLength=5, smoothVFI=False, **kwargs) -> IndFrame`

## 成交量流量指标

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/MhlDpfdS-Volume-Flow-Indicator-LazyBear/

        Args:
            length: 基础周期，默认 `130`
            coef: 系数参数，默认 `0.2`
            vcoef: 成交量系数，默认 `2.5`
            signalLength: 信号平滑周期，默认 `5`
            smoothVFI: 布尔值，控制是否平滑 VFI，默认 `False`
            **kwargs: 其他扩展参数

        Returns:
            包含 `vfima`（成交量流量指数移动平均）、`vfi`（成交量流量指标）的指标数据

#### `def Chandelier_Exit(self, length=22, mult=3.0, useClose=True, **kwargs) -> IndFrame`

## 吊灯出场指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.18_chandelier_exit/
        - ✈ https://cn.tradingview.com/script/AqXxNS7j-Chandelier-Exit/

        Args:
            length: 周期参数，默认 `22`
            mult: ATR 乘数，默认 `3.0`
            useClose: 布尔值，控制是否用收盘价计算，默认 `True`
            **kwargs: 其他扩展参数

        Returns:
            包含 `up`（上轨止损线）、`dn`（下轨止损线）、`long_signal`（多头信号）、`short_signal`（空头信号）的指标数据

#### `def SuperTrend_STRATEGY(self, Periods=10, Multiplier=3.0, changeATR=True, **kwargs) -> IndFrame`

## 超级趋势策略

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.19_supertrend_strategy/
        - ✈ https://cn.tradingview.com/script/P5Gu6F8k/

        Args:
            Periods: ATR 计算周期，默认 `10`
            Multiplier: ATR 乘数，默认 `3.0`
            changeATR: 布尔值，控制是否改变 ATR 计算方式，默认 `True`
            **kwargs: 其他扩展参数

        Returns:
            包含 `up`（上轨趋势线）、`dn`（下轨趋势线）、`long_signal`（多头信号）、`short_signal`（空头信号）的策略数据

#### `def Optimized_Trend_Tracker(self, length=2, var_length=9, percent=1.4, base=200, **kwargs) -> IndFrame`

## 优化的趋势跟踪指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.20_optimized_trend_tracker/
        - ✈ https://cn.tradingview.com/script/zVhoDQME/

        Args:
            length: 基础周期，默认 `2`
            var_length: 变异周期，默认 `9`
            percent: 百分比参数，默认 `1.4`
            base: 基础参考值，默认 `200`
            **kwargs: 其他扩展参数

        Returns:
            包含 `MT`（主趋势线）、`OTT`（优化趋势跟踪线）的指标数据

#### `def TonyUX_EMA_Scalper(self, length=20, period=8, **kwargs) -> IndFrame`

## TonyUX EMA 剥头皮策略

        ### 📘 **文档参考**:
        ✈ https://cn.tradingview.com/script/egfSfN1y-TonyUX-EMA-Scalper-Buy-Sell/

        Args:
            length: EMA 计算周期，默认 `20`
            period: 价格高低点统计周期，默认 `8`
            **kwargs: 其他扩展参数

        Returns:
            包含 `lasth`（近期高点）、`lastl`（近期低点）、`long_signal`（多头信号）、`short_signal`（空头信号）的策略数据

#### `def Turtle_Trade_Channels_Indicator_TUTCI(self, length=20, len2=10, **kwargs) -> IndFrame`

## 海龟交易通道指标

        ### 📘 **文档参考**:
        - ✈ https://www.minibt.cn/minibt_tradingview_indicators/3.21_turtle_trade_channels_indicator/
        - ✈ https://cn.tradingview.com/script/pB5nv16J/

        Args:
            length: 主通道周期，默认 `20`
            len2: 辅助通道周期，默认 `10`
            **kwargs: 其他扩展参数

        Returns:
            包含 `sup`（上通道）、`sdown`（下通道）、`K`（关键趋势线）、`long_signal`（多头信号）、`short_signal`（空头信号）的指标数据


---
