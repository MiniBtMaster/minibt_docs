# PandasTa 类 API 参考



## 类定义

```python
class PandasTa:
    _df: IndSeries | IndFrame

    def __init__(self, data):
        self._df = data
```

## 类功能说明

**pandas_ta 指标适配类**，用于将 pandas_ta 库中的技术指标计算结果转换为框架内置的指标数据类型（IndSeries/IndFrame）

### 核心功能
- 封装 pandas_ta 库的各类技术指标，提供统一的调用接口
- 通过 @tobtind 装饰器自动处理指标参数校验、计算逻辑调用和返回值转换，确保输出为框架兼容的 IndSeries 或 IndFrame
- 支持多维度技术分析场景，覆盖蜡烛图形态、趋势跟踪、动量判断、波动率计算等量化交易核心需求
- 内置指标分类体系，便于按业务场景快速定位和调用目标指标

### 指标分类体系

该类支持的指标按功能划分为以下 9 大类：

#### 1. 蜡烛图分析（Candles）
**功能**：蜡烛图形态识别、特殊蜡烛图转换（如布林带K线、Z评分标准化蜡烛图）
**包含指标**：`cdl_pattern`（蜡烛图形态识别）、`cdl_z`（Z评分标准化蜡烛图）、`ha`（Heikin-Ashi布林带K线）

#### 2. 周期分析（Cycles）
**功能**：识别市场价格的周期性规律，辅助判断趋势转折节点
**包含指标**：`ebsw`（周期检测指标）

#### 3. 动量指标（Momentum）
**功能**：衡量价格变化的速度和力度，判断趋势强度与潜在反转
**包含指标**：`ao`、`apo`、`bias`、`bop`、`brar`、`cci`、`cfo`、`cg`、`cmo`、`coppock`、`cti`、`er`、`eri`、`fisher`、`inertia`、`kdj`、`kst`、`macd`、`mom`、`pgo`、`ppo`、`psl`、`pvo`、`qqe`、`roc`、`rsi`、`rsx`、`rvgi`、`slope`、`smi`、`squeeze`、`squeeze_pro`、`stc`、`stoch`、`stochrsi`、`td_seq`、`trix`、`tsi`、`uo`、`willr`

#### 4. 重叠指标（Overlap）
**功能**：通过价格平滑、均线拟合等方式，凸显价格趋势方向
**包含指标**：`alma`、`dema`、`ema`、`fwma`、`hilo`、`hl2`、`hlc3`、`hma`、`ichimoku`、`jma`、`kama`、`linreg`、`mcgd`、`midpoint`、`midprice`、`ohlc4`、`pwma`、`rma`、`sinwma`、`sma`、`ssf`、`supertrend`、`swma`、`t3`、`tema`、`trima`、`vidya`、`vwap`、`vwma`、`wcp`、`wma`、`zlma`

#### 5. 收益指标（Performance）
**功能**：计算资产的收益情况，量化投资回报表现
**包含指标**：`log_return`（对数收益）、`percent_return`（百分比收益）

#### 6. 统计指标（Statistics）
**功能**：基于统计方法分析价格分布特征、离散程度等
**包含指标**：`entropy`（熵值）、`kurtosis`（峰度）、`mad`（平均绝对偏差）、`median`（中位数）、`quantile`（分位数）、`skew`（偏度）、`stdev`（标准差）、`tos_stdevall`（全维度标准差）、`variance`（方差）、`zscore`（Z评分）

#### 7. 趋势指标（Trend）
**功能**：识别和确认价格趋势方向、强度及持续时间
**包含指标**：`adx`、`amat`、`aroon`、`chop`、`cksp`、`decay`、`decreasing`（下跌趋势）、`dpo`、`increasing`（上涨趋势）、`long_run`（长期趋势）、`psar`、`qstick`、`short_run`（短期趋势）、`tsignals`（趋势信号）、`ttm_trend`、`vhf`、`vortex`、`xsignals`（扩展趋势信号）

#### 8. 波动率指标（Volatility）
**功能**：衡量价格波动的剧烈程度，评估市场风险
**包含指标**：`aberration`、`accbands`、`atr`（平均真实波幅）、`bbands`（布林带）、`donchian`（唐奇安通道）、`hwc`、`kc`（肯特纳通道）、`massi`、`natr`（归一化平均真实波幅）、`pdist`、`rvi`、`thermo`、`true_range`（真实波幅）、`ui`

#### 9. 成交量指标（Volume）
**功能**：结合成交量数据分析资金流向，辅助判断价格走势的有效性
**包含指标**：`ad`（积累/派发指标）、`adosc`（震荡指标）、`aobv`（绝对OBV）、`cmf`（资金流向指数）、`efi`（资金效率指标）、`eom`（资金流动指数）、`kvo`（成交量震荡指标）、`mfi`（资金流量指标）、`nvi`（负成交量指数）、`obv`（能量潮指标）、`pvi`（正成交量指数）、`pvol`（价格成交量指标）、`pvr`（价格成交量比率）、`pvt`（价格成交量趋势）

### 使用说明

#### 1. 初始化
传入框架支持的 IndSeries 或 IndFrame 数据对象（需包含指标计算所需的基础字段，如 open、high、low、close、volume 等）

```python
data = IndFrame(...)  # 框架内置数据对象（含OHLCV等基础字段）
ta = PandasTa(data)
```

#### 2. 指标调用
直接调用对应指标方法，传入必要参数（默认参数已适配常见场景，可按需调整）

```python
# 示例1：识别十字星蜡烛图形态
# 返回框架内置IndFrame，含十字星形态识别结果
doji_result = ta.cdl_pattern(name="doji")

# 示例2：计算Heikin-Ashi布林带K线
ha_candles = ta.ha()  # 返回框架内置IndFrame，含HA蜡烛图的open、high、low、close字段

# 示例3：计算14期RSI动量指标
rsi_14 = ta.rsi(length=14)  # 返回框架内置IndSeries，含14期RSI值
```

#### 3. 返回值特性
所有方法返回框架内置的 IndSeries 或 IndFrame 类型，可直接用于后续策略逻辑（如信号生成、风险控制），无需额外类型转换

### 注意事项

- 部分指标需特定基础字段（如成交量指标需 volume 字段），调用前确保输入数据包含所需字段
- 指标参数（如 length 周期）可通过方法参数调整，未指定时使用 pandas_ta 默认值
- 可通过 @tobtind 装饰器的 kwargs 参数配置填充缺失值（fillna）、数据偏移（offset）等辅助功能

---

## 1. 蜡烛图分析指标 (Candles)

### **`cdl_pattern` - 蜡烛图形态识别**

```python
@tobtind(lib='pta')
def cdl_pattern(self, name="all", offset=0, **kwargs) -> IndFrame:
```

**功能**：识别多种蜡烛图形态模式，包括十字星、锤头线、吞没形态等常见K线形态

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `name`：形态名称或名称列表，"all" 返回所有形态
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如scalar（放大系数，默认100）、fillna（填充缺失值）

**返回值**：IndFrame，每列对应一种蜡烛图形态的识别结果

**支持的形态列表**：
`cdl_2crows`, `cdl_3blackcrows`, `cdl_3inside`, `cdl_3linestrike`, `cdl_3outside`, `cdl_3starsinsouth`, `cdl_3whitesoldiers`, `cdl_abandonedbaby`, `cdl_advanceblock`, `cdl_belthold`, `cdl_breakaway`, `cdl_closingmarubozu`, `cdl_concealbabyswall`, `cdl_counterattack`, `cdl_darkcloudcover`, `cdl_doji`, `cdl_dojistar`, `cdl_dragonflydoji`, `cdl_engulfing`, `cdl_eveningdojistar`, `cdl_eveningstar`, `cdl_gapsidesidewhite`, `cdl_gravestonedoji`, `cdl_hammer`, `cdl_hangingman`, `cdl_harami`, `cdl_haramicross`, `cdl_highwave`, `cdl_hikkake`, `cdl_hikkakemod`, `cdl_homingpigeon`, `cdl_identical3crows`, `cdl_inneck`, `cdl_inside`, `cdl_invertedhammer`, `cdl_kicking`, `cdl_kickingbylength`, `cdl_ladderbottom`, `cdl_longleggeddoji`, `cdl_longline`, `cdl_marubozu`, `cdl_matchinglow`, `cdl_mathold`, `cdl_morningdojistar`, `cdl_morningstar`, `cdl_onneck`, `cdl_piercing`, `cdl_rickshawman`, `cdl_risefall3methods`, `cdl_separatinglines`, `cdl_shootingstar`, `cdl_shortline`, `cdl_spinningtop`, `cdl_stalledpattern`, `cdl_sticksandwich`, `cdl_takuri`, `cdl_tasukigap`, `cdl_thrusting`, `cdl_tristar`, `cdl_unique3river`, `cdl_upsidegap2crows`, `cdl_xsidegap3methods`

**示例**：
```python
# 识别所有蜡烛图形态
patterns = ta.cdl_pattern(name="all")

# 只识别十字星形态
doji_pattern = ta.cdl_pattern(name="doji")

# 识别多种特定形态
selected_patterns = ta.cdl_pattern(name=["doji", "hammer", "engulfing"])
```

---

### **`cdl_z` - Z评分标准化蜡烛图**

```python
@tobtind(lines=['open_z', 'high_z', 'low_z', 'close_z'], lib='pta')
def cdl_z(self, full=None, offset=0, **kwargs) -> IndFrame:
```

**功能**：使用滚动Z分数对OHLC蜡烛图进行标准化处理，消除价格尺度影响，便于不同价格水平的比较

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `full`：完整模式参数
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如length（周期，默认30）、naive（预处理模式）、fillna（填充缺失值）

**返回值**：IndFrame，包含标准化后的open_z、high_z、low_z、close_z列

**计算公式**：

```
Z = ZSCORE
open = Z(open, length, ddof)
high = Z(high, length, ddof)
low = Z(low, length, ddof)
close = Z(close, length, ddof)
```

**示例**：
```python
# 计算标准化蜡烛图
normalized_candles = ta.cdl_z(length=20)

# 使用预处理模式
normalized_naive = ta.cdl_z(length=20, naive=True)

# 分析标准化后的价格分布
z_score_extreme = normalized_candles.close_z.abs() > 2  # Z分数大于2的极端值
```

---

### **`ha` - Heikin-Ashi 蜡烛图**

```python
@tobtind(lines=['open', 'high', 'low', 'close'], overlap=True, lib='pta')
def ha(self, length=0, offset=0, **kwargs) -> IndFrame:
```

**功能**：计算Heikin-Ashi蜡烛图，通过平均价格数据过滤市场噪音，更清晰地显示趋势方向

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `length`：长度参数
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含HA蜡烛图的open、high、low、close字段

**计算公式**：
```
HA_OPEN[0] = (open[0] + close[0]) / 2
HA_CLOSE = (open[0] + high[0] + low[0] + close[0]) / 4
for i > 1 in df.index:
    HA_OPEN = (HA_OPEN[i−1] + HA_CLOSE[i−1]) / 2
HA_HIGH = MAX(HA_OPEN, HA_HIGH, HA_CLOSE)
HA_LOW = MIN(HA_OPEN, HA_LOW, HA_CLOSE)
```

**示例**：
```python
# 计算Heikin-Ashi蜡烛图
ha_candles = ta.ha()

# 使用HA蜡烛图进行趋势分析
ha_trend_up = (ha_candles.close > ha_candles.open)
ha_trend_down = (ha_candles.close < ha_candles.open)

# HA连续上涨/下跌趋势
ha_uptrend = (ha_candles.close > ha_candles.open).rolling(3).sum() == 3
ha_downtrend = (ha_candles.close < ha_candles.open).rolling(3).sum() == 3
```

---

### **`lrc` - 线性回归蜡烛图**

```python
@tobtind(lines=['open', 'high', 'low', 'close'], overlap=True, lib='pta')
def lrc(self, length=11, **kwargs) -> IndFrame:
```

**功能**：利用线性回归技术重新校准标准蜡烛图数据，创建更能反映基础趋势方向的蜡烛图

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `length`：线性回归周期，默认11
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含线性回归调整后的open、high、low、close字段

**应用场景**：

- 趋势跟踪：确认强势趋势存在并沿趋势方向交易
- 反转检测：蜡烛图与信号线交叉指示潜在趋势反转
- 风险管理：基于趋势强度和方向设置更明智的止损止盈水平

**示例**：
```python
# 计算线性回归蜡烛图
lrc_candles = ta.lrc(length=11)

# 使用LRC进行趋势识别
lrc_trend_strength = lrc_candles.close - lrc_candles.open

# LRC趋势信号
strong_uptrend = lrc_trend_strength > 0
strong_downtrend = lrc_trend_strength < 0
```

---

## 2. 周期分析指标 (Cycles)

### **`ebsw` - 改进正弦波周期检测**

```python
@tobtind(lines=None, lib='pta')
def ebsw(self, length=40, bars=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：改进的正弦波周期检测指标，使用低通滤波器消除噪音，识别市场价格周期规律

**所需数据字段**：`close`

**参数**：

  - `length`：最大周期/趋势周期，默认40（有效值39-48）
  - `bars`：低通滤波周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如drift（差分周期，默认1）、fillna（填充缺失值）

**返回值**：IndSeries，周期检测信号序列，范围在-1到1之间

**示例**：
```python
# 计算周期检测指标
cycle_signal = ta.ebsw(length=40)

# 识别周期转折点
cycle_high = cycle_signal > 0.8
cycle_low = cycle_signal < -0.8

# 周期相位分析
cycle_upward = cycle_signal.diff() > 0
cycle_downward = cycle_signal.diff() < 0
```

---

## 3. 动量指标 (Momentum)

### **`ao` - 动量震荡指标**

```python
@tobtind(lines=None, lib='pta')
def ao(self, fast=5, slow=34, offset=0, **kwargs) -> IndSeries:
```

**功能**：动量震荡指标，通过快慢周期中位数移动平均差值衡量市场动量，用于确认趋势或预期反转

**所需数据字段**：`high`, `low`

**参数**：

  - `fast`：快线周期，默认5
  - `slow`：慢线周期，默认34
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，AO指标值序列

**计算公式**：
```
median = (high + low) / 2
AO = SMA(median, fast) - SMA(median, slow)
```

**示例**：
```python
# 计算标准AO指标
ao_values = ta.ao(fast=5, slow=34)

# 识别AO指标信号
ao_saucer = (ao_values > 0) & (ao_values.shift() < 0)  # 碟形买入信号
ao_twin_peaks = (ao_values < 0) & (ao_values.shift() > 0)  # 双峰卖出信号
ao_zero_cross = (ao_values > 0) & (ao_values.shift() <= 0)  # 零轴上方金叉
```

---

### **`apo` - 绝对价格震荡指标**

```python
@tobtind(lines=None, lib='pta')
def apo(self, fast=12, slow=26, mamode='sma', offset=0, **kwargs) -> IndSeries:
```

**功能**：绝对价格震荡指标，计算两个不同周期移动平均线的差值，与MACD线计算逻辑相同

**所需数据字段**：`close`

**参数**：

  - `fast`：快线周期，默认12
  - `slow`：慢线周期，默认26
  - `mamode`：移动平均类型，默认'sma'
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如talib（使用TA-Lib实现，默认True）、fillna（填充缺失值）

**返回值**：IndSeries，APO指标值序列

**计算公式**：
```
APO = SMA(close, fast) - SMA(close, slow)
```

**示例**：
```python
# 计算APO指标
apo_values = ta.apo(fast=12, slow=26)

# APO零轴交叉信号
apo_bullish = (apo_values > 0) & (apo_values.shift() <= 0)
apo_bearish = (apo_values < 0) & (apo_values.shift() >= 0)

# APO动量强度
strong_momentum = apo_values.abs() > apo_values.rolling(20).mean()
```

---

### **`bias` - 乖离率指标**

```python
@tobtind(lines=None, lib='pta')
def bias(self, length=26, mamode="sma", offset=0, **kwargs) -> IndSeries:
```

**功能**：乖离率指标，计算价格与移动平均线的偏离程度，衡量价格回归均值的可能性

**所需数据字段**：`close`

**参数**：

  - `length`：移动平均周期，默认26
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如drift（差分周期，默认1）、fillna（填充缺失值）

**返回值**：IndSeries，乖离率值序列（百分比形式）

**计算公式**：
```
BIAS = (close - MA(close, length)) / MA(close, length)
    = (close / MA(close, length)) - 1
```

**示例**：
```python
# 计算乖离率
bias_values = ta.bias(length=20)

# 识别超买超卖区域
overbought_bias = bias_values > 10  # 乖离率大于10%
oversold_bias = bias_values < -10   # 乖离率小于-10%

# 乖离率回归信号
bias_reversion = (bias_values > 15) | (bias_values < -15)  # 极端偏离可能回归
```

---

### **`bop` - 多空平衡指标**

```python
@tobtind(lines=None, lib='pta')
def bop(self, scalar=1, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：多空平衡指标，衡量市场中买方与卖方的力量对比

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `scalar`：放大系数，默认1
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，BOP指标值序列，范围在-1到1之间

**计算公式**：
```
BOP = scalar * (close - open) / (high - low)
```

**示例**：
```python
# 计算BOP指标
bop_values = ta.bop()

# 识别多空力量对比
bull_power = bop_values > 0.5    # 多头强势
bear_power = bop_values < -0.5   # 空头强势
balance_market = (bop_values >= -0.3) & (bop_values <= 0.3)  # 多空平衡

# BOP极端值信号
extreme_bull = bop_values > 0.8
extreme_bear = bop_values < -0.8
```

---

### **`brar` - 情绪指标**

```python
@tobtind(lines=['ar', 'br'], lib='pta')
def brar(self, length=26, scalar=100, drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：BRAR情绪指标，包含BR（意愿指标）和AR（人气指标），衡量市场情绪和买卖意愿

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认26
  - `scalar`：放大系数，默认100
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含ar（人气指标）和br（意愿指标）列

**计算公式**：

```
HO_Diff = high - open
OL_Diff = open - low
HCY = high - close[-1]
CYL = close[-1] - low
HCY[HCY < 0] = 0
CYL[CYL < 0] = 0
AR = scalar * SUM(HO, length) / SUM(OL, length)
BR = scalar * SUM(HCY, length) / SUM(CYL, length)
```

**示例**：
```python
# 计算BRAR指标
brar_data = ta.brar(length=26)

# 分析市场情绪
ar_values = brar_data.ar  # 人气指标
br_values = brar_data.br  # 意愿指标

# 情绪指标信号
high_sentiment = (ar_values > 180) & (br_values > 300)  # 情绪过热
low_sentiment = (ar_values < 40) & (br_values < 50)     # 情绪过冷
normal_sentiment = (ar_values.between(80, 150)) & (br_values.between(50, 150))  # 正常情绪

# ARBR背离分析
price_high = close == close.rolling(20).max()
ar_low = ar_values < ar_values.rolling(20).max()
bear_divergence = price_high & ar_low  # 顶背离
```

### **`cci` - 商品通道指数**

```python
@tobtind(lines=None, lib='pta')
def cci(self, length=14, c=0.015, offset=0, **kwargs) -> IndSeries:
```

**功能**：商品通道指数是一种动量振荡器，主要用于识别相对于均值的超买和超卖水平

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `c`：缩放常数，默认0.015
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如talib（使用TA-Lib实现，默认True）、fillna（填充缺失值）

**返回值**：IndSeries，CCI指标值序列

**计算公式**：
```
tp = typical_price = hlc3 = (high + low + close) / 3
mean_tp = SMA(tp, length)
mad_tp = MAD(tp, length)
CCI = (tp - mean_tp) / (c * mad_tp)
```

**示例**：
```python
# 计算CCI指标
cci_values = ta.cci(length=14)

# 识别超买超卖
overbought_cci = cci_values > 100
oversold_cci = cci_values < -100

# CCI趋势反转信号
cci_turn_up = (cci_values > -100) & (cci_values.shift() <= -100)
cci_turn_down = (cci_values < 100) & (cci_values.shift() >= 100)
```

---

### **`cfo` - Chande预测振荡器**

```python
@tobtind(lines=None, lib='pta')
def cfo(self, length=9, scalar=100., drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：预测振荡器计算实际价格与时间序列预测（线性回归线的端点）之间的百分比差异

**所需数据字段**：`close`

**参数**：

  - `length`：线性回归周期，默认9
  - `scalar`：放大系数，默认100.0
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，CFO指标值序列

**计算公式**：
```
CFO = scalar * (close - LINREG(length, tdf=True)) / close
```

**示例**：
```python
# 计算CFO指标
cfo_values = ta.cfo(length=9)

# CFO零轴交叉信号
cfo_bullish = (cfo_values > 0) & (cfo_values.shift() <= 0)
cfo_bearish = (cfo_values < 0) & (cfo_values.shift() >= 0)

# CFO极端值
cfo_extreme_high = cfo_values > 10
cfo_extreme_low = cfo_values < -10
```

---

### **`cg` - 重心指标**

```python
@tobtind(lines=None, lib='pta')
def cg(self, length=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：John Ehlers的重心指标试图在显示零滞后和平滑的同时识别转折点

**所需数据字段**：`close`

**参数**：

  - `length`：周期长度，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，CG指标值序列

**示例**：
```python
# 计算重心指标
cg_values = ta.cg(length=10)

# 重心指标转折点
cg_turning_up = cg_values > cg_values.shift()
cg_turning_down = cg_values < cg_values.shift()

# 重心指标零轴交叉
cg_above_zero = cg_values > 0
cg_below_zero = cg_values < 0
```

---

### **`cmo` - Chande动量振荡器**

```python
@tobtind(lines=None, lib='pta')
def cmo(self, length=14, scalar=100., talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：试图捕捉资产的动量，超买在50，超卖在-50

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认14
  - `scalar`：放大系数，默认100.0
  - `talib`：是否使用TA-Lib实现，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，CMO指标值序列

**计算公式**：
```
CMO = scalar * (PSUM - NSUM) / (PSUM + NSUM)
```

**示例**：
```python
# 计算CMO指标
cmo_values = ta.cmo(length=14)

# 超买超卖信号
cmo_overbought = cmo_values > 50
cmo_oversold = cmo_values < -50

# CMO动量方向
cmo_momentum_up = cmo_values > 0
cmo_momentum_down = cmo_values < 0
```

---

### **`coppock` - Coppock曲线**

```python
@tobtind(lines=None, lib='pta')
def coppock(self, length=10, fast=11, slow=14, offset=0, **kwargs) -> IndSeries:
```

**功能**：Coppock曲线（最初称为"Trendex模型"）是一种动量指标，设计用于月线时间尺度

**所需数据字段**：`close`

**参数**：

  - `length`：WMA周期，默认10
  - `fast`：快速ROC周期，默认11
  - `slow`：慢速ROC周期，默认14
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，Coppock曲线值序列

**示例**：
```python
# 计算Coppock曲线
coppock_values = ta.coppock(length=10)

# Coppock曲线信号
coppock_rising = coppock_values > coppock_values.shift()
coppock_falling = coppock_values < coppock_values.shift()

# Coppock曲线零轴交叉
coppock_above_zero = coppock_values > 0
coppock_below_zero = coppock_values < 0
```

---

### **`cti` - 相关趋势指标**

```python
@tobtind(lines=None, lib='pta')
def cti(self, length=12, offset=0, **kwargs) -> IndSeries:
```

**功能**：相关趋势指标是John Ehler在2020年创建的一种振荡器，根据价格在特定范围内跟随正斜率或负斜率直线的接近程度分配值

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认12
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，CTI指标值序列，范围从-1到1

**示例**：
```python
# 计算CTI指标
cti_values = ta.cti(length=12)

# 趋势强度
strong_trend = cti_values.abs() > 0.5
weak_trend = cti_values.abs() < 0.2

# 趋势方向
uptrend = cti_values > 0
downtrend = cti_values < 0
```

---

### **`dm` - 定向运动**

```python
@tobtind(lines=['dmp', 'dmn'], lib='pta')
def dm(self, length=14, mamode="rma", talib=True, drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：定向运动由J. Welles Wilder在1978年开发，试图确定资产价格的移动方向，比较先前的高点和低点

**所需数据字段**：`high`, `low`

**参数**：

  - `length`：计算周期，默认14
  - `mamode`：移动平均模式，默认"rma"
  - `talib`：是否使用TA-Lib实现，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含dmp（+DM）和dmn（-DM）列

**计算公式**：
```
up = high - high.shift(drift)
dn = low.shift(drift) - low
pos_ = ((up > dn) & (up > 0)) * up
neg_ = ((dn > up) & (dn > 0)) * dn
pos = ma(mamode, pos_, length=length)
neg = ma(mamode, neg_, length=length)
```

**示例**：
```python
# 计算定向运动指标
dm_data = ta.dm(length=14)

# 提取正负定向运动
plus_dm = dm_data.dmp
minus_dm = dm_data.dmn

# 定向运动趋势
dm_uptrend = plus_dm > minus_dm
dm_downtrend = plus_dm < minus_dm

# DM强度变化
dm_strengthening = plus_dm > plus_dm.shift()
dm_weakening = minus_dm > minus_dm.shift()
```

---

### **`er` - 效率比率**

```python
@tobtind(lines=None, lib='pta')
def er(self, length=14, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：效率比率由Perry J. Kaufman发明，旨在考虑市场噪音或波动性

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认14
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，ER指标值序列

**计算公式**：
```
abs_diff = ABS(close.diff(length))
volatility = ABS(close.diff(1))
ER = abs_diff / SUM(volatility, length)
```

**示例**：
```python
# 计算效率比率
er_values = ta.er(length=14)

# 市场效率状态
high_efficiency = er_values > 0.5
low_efficiency = er_values < 0.2

# 效率比率变化
er_improving = er_values > er_values.shift()
er_worsening = er_values < er_values.shift()
```

---

### **`eri` - Elder射线指数**

```python
@tobtind(lines=['bullp', 'bearp'], lib='pta')
def eri(self, length=14, offset=0, **kwargs) -> IndFrame:
```

**功能**：Elder的牛熊射线指数包含牛力和熊力，观察价格并了解市场背后力量

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：EMA周期，默认14
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含bullp（牛力）和bearp（熊力）列

**计算公式**：
```
BULLPOWER = high - EMA(close, length)
BEARPOWER = low - EMA(close, length)
```

**示例**：
```python
# 计算Elder射线指数
eri_data = ta.eri(length=14)

# 提取牛力和熊力
bull_power = eri_data.bullp
bear_power = eri_data.bearp

# 牛熊力量对比
bull_dominant = bull_power > 0
bear_dominant = bear_power < 0

# 极端力量
extreme_bull = bull_power > bull_power.rolling(20).quantile(0.8)
extreme_bear = bear_power < bear_power.rolling(20).quantile(0.2)
```

---

### **`fisher` - Fisher变换**

```python
@tobtind(lines=['fisher', 'fishers'], lib='pta')
def fisher(self, length=9, signal=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：通过在一定周期内归一化价格来识别显著的价格反转，当两条线交叉时提示反转信号

**所需数据字段**：`high`, `low`

**参数**：

  - `length`：Fisher周期，默认9
  - `signal`：信号线周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含fisher（Fisher值）和fishers（信号线值）列

**示例**：
```python
# 计算Fisher变换
fisher_data = ta.fisher(length=9)

# 提取Fisher线和信号线
fisher_line = fisher_data.fisher
fisher_signal = fisher_data.fishers

# Fisher交叉信号
fisher_cross_bullish = (fisher_line > fisher_signal) & (fisher_line.shift() <= fisher_signal.shift())
fisher_cross_bearish = (fisher_line < fisher_signal) & (fisher_line.shift() >= fisher_signal.shift())

# Fisher极端值
fisher_overbought = fisher_line > 2
fisher_oversold = fisher_line < -2
```

### **`inertia` - 惯性指标**

```python
@tobtind(lines=None, lib='pta')
def inertia(self, length=20, rvi_length=14, scalar=100., refined=False, thirds=False, mamode="ema", drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：惯性指标由Donald Dorsey开发，将相对活力指数（RVI）通过最小二乘移动平均进行平滑处理，用于识别趋势方向和动量强度

**所需数据字段**：`close`, `high`, `low`

**参数**：

  - `length`：最小二乘移动平均周期，默认20
  - `rvi_length`：相对活力指数周期，默认14
  - `scalar`：放大系数，默认100.0
  - `refined`：使用精炼计算方法，默认False
  - `thirds`：使用三分法计算，默认False
  - `mamode`：移动平均类型，默认"ema"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，惯性指标值序列

**计算公式**：
```
INERTIA = LSQRMA(RVI(length), ma_length)
```

**示例**：
```python
# 计算标准惯性指标
inertia_values = ta.inertia()

# 计算自定义周期的惯性指标，使用精炼计算方法
inertia_custom = ta.inertia(length=25, rvi_length=10, refined=True)

# 识别惯性指标信号
positive_inertia = inertia_values > 50    # 正向惯性
negative_inertia = inertia_values < 50    # 负向惯性
strong_momentum = inertia_values > 70     # 强动量信号
```

---

### **`kdj` - KDJ指标**

```python
@tobtind(lines=['k', 'd', 'j'], lib='pta')
def kdj(self, length=9, signal=3, offset=0, **kwargs) -> IndFrame:
```

**功能**：KDJ指标实际上是慢速随机指标的一种派生形式，主要区别在于多了一条称为J线的线，J线代表%D值与%K值的背离

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认9
  - `signal`：信号周期，默认3
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含k、d和j列

**计算公式**：
```
LL = low for last 9 periods
HH = high for last 9 periods
FAST_K = 100 * (close - LL) / (HH - LL)
K = RMA(FAST_K, signal)
D = RMA(K, signal)
J = 3K - 2D
```

**示例**：
```python
# 计算KDJ指标
kdj_data = ta.kdj(length=9)

# 提取KDJ各线
k_line = kdj_data.k
d_line = kdj_data.d
j_line = kdj_data.j

# KDJ超买超卖信号
kdj_overbought = k_line > 80
kdj_oversold = k_line < 20

# KDJ金叉死叉
kdj_golden_cross = (k_line > d_line) & (k_line.shift() <= d_line.shift())
kdj_death_cross = (k_line < d_line) & (k_line.shift() >= d_line.shift())
```

---

### **`kst` - 确知指标**

```python
@tobtind(lines=['kst', 'ksts'], lib='pta')
def kst(self, roc1=10, roc2=15, roc3=20, roc4=30, sma1=10, sma2=10, sma3=10, sma4=15, signal=9, drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：'确知指标'是基于动量的振荡器，基于ROC（变动率）计算

**所需数据字段**：`close`

**参数**：

  - `roc1`：ROC1周期，默认10
  - `roc2`：ROC2周期，默认15
  - `roc3`：ROC3周期，默认20
  - `roc4`：ROC4周期，默认30
  - `sma1`：SMA1周期，默认10
  - `sma2`：SMA2周期，默认10
  - `sma3`：SMA3周期，默认10
  - `sma4`：SMA4周期，默认15
  - `signal`：信号周期，默认9
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含kst和ksts列

**计算公式**：
```
rocsma1 = SMA(ROC(close, roc1), sma1)
rocsma2 = SMA(ROC(close, roc2), sma2)
rocsma3 = SMA(ROC(close, roc3), sma3)
rocsma4 = SMA(ROC(close, roc4), sma4)
KST = 100 * (rocsma1 + 2 * rocsma2 + 3 * rocsma3 + 4 * rocsma4)
KST_Signal = SMA(KST, signal)
```

**示例**：
```python
# 计算确知指标
kst_data = ta.kst()

# 提取KST线和信号线
kst_line = kst_data.kst
kst_signal = kst_data.ksts

# KST交叉信号
kst_bullish = (kst_line > kst_signal) & (kst_line.shift() <= kst_signal.shift())
kst_bearish = (kst_line < kst_signal) & (kst_line.shift() >= kst_signal.shift())

# KST趋势强度
kst_rising = kst_line > kst_line.shift()
kst_falling = kst_line < kst_line.shift()
```

---

### **`macd` - 指数平滑异同平均线**

```python
@tobtind(lines=['macdx', 'macdh', 'macds'], lib='pta', linestyle=dict(macdh=LineStyle(line_dash=LineDash.vbar)))
def macd(self, fast=12, slow=26, signal=9, talib=True, offset=0, **kwargs) -> IndFrame:
```

**功能**：MACD是一种流行的指标，用于识别证券的趋势，MACD还返回另外两个系列：信号线和直方图

**所需数据字段**：`close`

**参数**：

  - `fast`：快线周期，默认12
  - `slow`：慢线周期，默认26
  - `signal`：信号线周期，默认9
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如asmode（启用AS版本MACD，默认False）、fillna（填充缺失值）

**返回值**：IndFrame，包含macdx（MACD线）、macdh（直方图）、macds（信号线）列

**计算公式**：
```
MACD = EMA(close, fast) - EMA(close, slow)
Signal = EMA(MACD, signal)
Histogram = MACD - Signal
```

**示例**：
```python
# 计算标准MACD
macd_data = ta.macd(fast=12, slow=26, signal=9)

# 提取MACD各组件
macd_line = macd_data.macdx
macd_signal = macd_data.macds
macd_histogram = macd_data.macdh

# MACD金叉死叉
macd_golden_cross = (macd_line > macd_signal) & (macd_line.shift() <= macd_signal.shift())
macd_death_cross = (macd_line < macd_signal) & (macd_line.shift() >= macd_signal.shift())

# MACD零轴交叉
macd_above_zero = macd_line > 0
macd_below_zero = macd_line < 0
```

---

### **`mom` - 动量指标**

```python
@tobtind(lines=None, lib='pta')
def mom(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：动量指标用于衡量证券移动的速度（或强度），或简单地说就是价格的变化

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，动量指标值序列

**计算公式**：
```
MOM = close.diff(length)
```

**示例**：
```python
# 计算动量指标
mom_values = ta.mom(length=10)

# 动量方向
momentum_up = mom_values > 0
momentum_down = mom_values < 0

# 动量加速减速
momentum_accelerating = mom_values > mom_values.shift()
momentum_decelerating = mom_values < mom_values.shift()

# 动量极端值
strong_momentum = mom_values > mom_values.rolling(20).quantile(0.8)
weak_momentum = mom_values < mom_values.rolling(20).quantile(0.2)
```

---

### **`pgo` - 相当好振荡器**

```python
@tobtind(lines=None, lib='pta')
def pgo(self, length=14, offset=0, **kwargs) -> IndSeries:
```

**功能**：相当好振荡器指标由Mark Johnson创建，用于衡量当前收盘价与其N日简单移动平均线的距离

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，PGO指标值序列

**计算公式**：
```
PGO = (close - SMA(close, length)) / EMA(ATR(high, low, close, length), length)
```

**示例**：
```python
# 计算PGO指标
pgo_values = ta.pgo(length=14)

# PGO突破信号
pgo_long_signal = pgo_values > 3.0
pgo_short_signal = pgo_values < -3.0

# PGO趋势强度
pgo_strengthening = pgo_values > pgo_values.shift()
pgo_weakening = pgo_values < pgo_values.shift()

# PGO零轴回归
pgo_return_to_zero = (pgo_values.abs() < 1.0) & (pgo_values.shift().abs() >= 1.0)
```

---

### **`ppo` - 百分比价格振荡器**

```python
@tobtind(lines=['ppo', 'ppoh', 'ppos'], lib='pta')
def ppo(self, fast=12, slow=26, signal=9, scalar=100., mamode="sma", talib=True, **kwargs) -> IndFrame:
```

**功能**：百分比价格振荡器在衡量动量方面与MACD类似

**所需数据字段**：`close`

**参数**：

  - `fast`：快线周期，默认12
  - `slow`：慢线周期，默认26
  - `signal`：信号线周期，默认9
  - `scalar`：放大系数，默认100.0
  - `mamode`：移动平均类型，默认"sma"
  - `talib`：是否使用TA-Lib实现，默认True
  - `**kwargs`：可选参数，如offset（偏移周期）、fillna（填充缺失值）

**返回值**：IndFrame，包含ppo、ppoh（直方图）、ppos（信号线）列

**计算公式**：
```
fast_sma = SMA(close, fast)
slow_sma = SMA(close, slow)
PPO = 100 * (fast_sma - slow_sma) / slow_sma
Signal = EMA(PPO, signal)
Histogram = PPO - Signal
```

**示例**：
```python
# 计算PPO指标
ppo_data = ta.ppo(fast=12, slow=26)

# 提取PPO各组件
ppo_line = ppo_data.ppo
ppo_signal = ppo_data.ppos
ppo_histogram = ppo_data.ppoh

# PPO交叉信号
ppo_golden_cross = (ppo_line > ppo_signal) & (ppo_line.shift() <= ppo_signal.shift())
ppo_death_cross = (ppo_line < ppo_signal) & (ppo_line.shift() >= ppo_signal.shift())

# PPO零轴位置
ppo_above_zero = ppo_line > 0
ppo_below_zero = ppo_line < 0
```

---

### **`psl` - 心理线**

```python
@tobtind(lines=None, lib='pta')
def psl(self, length=12, scalar=100., drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：心理线是一种振荡器类型的指标，比较上涨期间的数量与总期间数量的比例

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认12
  - `scalar`：放大系数，默认100.0
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如open_（开盘价）、fillna（填充缺失值）

**返回值**：IndSeries，PSL指标值序列

**计算公式**：
```
DIFF = SIGN(close - close[drift])
DIFF[DIFF <= 0] = 0
PSL = scalar * SUM(DIFF, length) / length
```

**示例**：
```python
# 计算心理线
psl_values = ta.psl(length=12)

# 心理线超买超卖
psl_overbought = psl_values > 75
psl_oversold = psl_values < 25

# 心理线趋势
psl_rising = psl_values > psl_values.shift()
psl_falling = psl_values < psl_values.shift()

# 心理线极端情绪
extreme_optimism = psl_values > 90
extreme_pessimism = psl_values < 10
```

---

### **`pvo` - 百分比成交量振荡器**

```python
@tobtind(lines=['pvo', 'pvoh', 'pvos'], overlap=False, lib='pta')
def pvo(self, fast=12, slow=26, signal=9, scalar=100., offset=0, **kwargs) -> IndFrame:
```

**功能**：百分比成交量振荡器是成交量的动量振荡器

**所需数据字段**：`volume`

**参数**：

  - `fast`：快线周期，默认12
  - `slow`：慢线周期，默认26
  - `signal`：信号线周期，默认9
  - `scalar`：放大系数，默认100.0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含pvo、pvoh（直方图）、pvos（信号线）列

**计算公式**：
```
PVO = (EMA(volume, fast) - EMA(volume, slow)) / EMA(volume, slow)
Signal = EMA(PVO, signal)
Histogram = PVO - Signal
```

**示例**：
```python
# 计算PVO指标
pvo_data = ta.pvo(fast=12, slow=26)

# 提取PVO各组件
pvo_line = pvo_data.pvo
pvo_signal = pvo_data.pvos
pvo_histogram = pvo_data.pvoh

# PVO交叉信号
pvo_golden_cross = (pvo_line > pvo_signal) & (pvo_line.shift() <= pvo_signal.shift())
pvo_death_cross = (pvo_line < pvo_signal) & (pvo_line.shift() >= pvo_signal.shift())

# 成交量动量分析
volume_momentum_up = pvo_line > 0
volume_momentum_down = pvo_line < 0
```

---

### **`qqe` - 定量定性估计**

```python
@tobtind(lines=['qqe', 'rsi_ma' 'qqel', 'qqes'], lib='pta')
def qqe(self, length=14, smooth=5, factor=4.236, mamode="sma", drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：定量定性估计（QQE）类似于超级趋势，但使用平滑的RSI和上下带

**所需数据字段**：`close`

**参数**：

  - `length`：RSI周期，默认14
  - `smooth`：RSI平滑周期，默认5
  - `factor`：QQE因子，默认4.236
  - `mamode`：移动平均类型，默认"sma"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含qqe、rsi_ma（基础）、qqel（长线）、qqes（短线）列

**示例**：
```python
# 计算QQE指标
qqe_data = ta.qqe(length=14)

# 提取QQE各组件
qqe_line = qqe_data.qqe
rsi_ma = qqe_data.rsi_ma
qqe_long = qqe_data.qqel
qqe_short = qqe_data.qqes

# QQE趋势信号
qqe_uptrend = qqe_line > qqe_long
qqe_downtrend = qqe_line < qqe_short

# QQE交叉信号
qqe_bullish_cross = (qqe_line > qqe_long) & (qqe_line.shift() <= qqe_long.shift())
qqe_bearish_cross = (qqe_line < qqe_short) & (qqe_line.shift() >= qqe_short.shift())
```

### **`roc` - 变动率指标**

```python
@tobtind(lines=None, lib='pta')
def roc(self, length=10, scalar=100., talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：变动率指标也称为动量指标，是一个纯粹的动量振荡器，衡量当前价格与'n'个周期前价格的百分比变化

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `scalar`：放大系数，默认100.0
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，ROC指标值序列

**计算公式**：
```
ROC = 100 * MOM(close, length) / close.shift(length)
```

**示例**：
```python
# 计算ROC指标
roc_values = ta.roc(length=10)

# ROC零轴交叉信号
roc_above_zero = roc_values > 0
roc_below_zero = roc_values < 0

# ROC极端值
roc_extreme_high = roc_values > 20
roc_extreme_low = roc_values < -20

# ROC动量加速
roc_accelerating = roc_values > roc_values.shift()
```

---

### **`rsi` - 相对强弱指数**

```python
@tobtind(lines=None, lib='pta')
def rsi(self, length=14, scalar=100., talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：相对强弱指数是流行的动量振荡器，用于衡量定向价格运动的速度和幅度

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认14
  - `scalar`：放大系数，默认100.0
  - `talib`：是否使用TA-Lib实现，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，RSI指标值序列，范围0-100

**计算公式**：
```
diff = close.diff(drift)
positive = diff if diff > 0 else 0
negative = diff if diff < 0 else 0
pos_avg = RMA(positive, length)
neg_avg = ABS(RMA(negative, length))
RSI = scalar * pos_avg / (pos_avg + neg_avg)
```

**示例**：
```python
# 计算RSI指标
rsi_values = ta.rsi(length=14)

# RSI超买超卖信号
rsi_overbought = rsi_values > 70
rsi_oversold = rsi_values < 30

# RSI背离分析
price_high = close == close.rolling(20).max()
rsi_low = rsi_values < rsi_values.rolling(20).max()
bearish_divergence = price_high & rsi_low

# RSI趋势强度
rsi_rising = rsi_values > rsi_values.shift()
```

---

### **`rsx` - 相对强弱扩展指标**

```python
@tobtind(lines=None, lib='pta')
def rsx(self, length=14, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：相对强弱扩展指标基于流行的RSI指标，并受到Jurik Research工作的启发，此增强版本的RSI减少了噪音

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认14
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，RSX指标值序列

**示例**：
```python
# 计算RSX指标
rsx_values = ta.rsx(length=14)

# RSX超买超卖
rsx_overbought = rsx_values > 80
rsx_oversold = rsx_values < 20

# RSX趋势信号
rsx_uptrend = rsx_values > 50
rsx_downtrend = rsx_values < 50

# RSX动量变化
rsx_momentum_up = rsx_values > rsx_values.shift()
```

---

### **`rvgi` - 相对活力指数**

```python
@tobtind(lines=['rvgi', 'rvgs'], lib='pta')
def rvgi(self, length=14, swma_length=4, offset=0, **kwargs) -> IndFrame:
```

**功能**：相对活力指数试图衡量趋势相对于其收盘价在其交易范围内的强度

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `swma_length`：对称加权移动平均周期，默认4
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含rvgi和rvgs列

**计算公式**：
```
numerator = SUM(SWMA(close - open, swma_length), length)
denominator = SUM(SWMA(high - low, swma_length), length)
RVGI = numerator / denominator
```

**示例**：
```python
# 计算RVGI指标
rvgi_data = ta.rvgi(length=14)

# 提取RVGI线和信号线
rvgi_line = rvgi_data.rvgi
rvgi_signal = rvgi_data.rvgs

# RVGI交叉信号
rvgi_bullish = (rvgi_line > rvgi_signal) & (rvgi_line.shift() <= rvgi_signal.shift())
rvgi_bearish = (rvgi_line < rvgi_signal) & (rvgi_line.shift() >= rvgi_signal.shift())

# RVGI趋势强度
rvgi_strong_trend = rvgi_line.abs() > 0.5
```

---

### **`slope` - 斜率指标**

```python
@tobtind(lines=None, lib='pta')
def slope(self, length=10, as_angle=False, to_degrees=False, vertical=None, offset=0, **kwargs) -> IndSeries:
```

**功能**：返回长度为n的序列的斜率，可以将斜率转换为角度

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `as_angle`：将斜率转换为角度，默认False
  - `to_degrees`：将斜率角度转换为度数，默认False
  - `vertical`：垂直参数
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，斜率值序列

**计算公式**：
```
slope = close.diff(length) / length
if as_angle:
    slope = slope.apply(atan)
    if to_degrees:
        slope *= 180 / PI
```

**示例**：
```python
# 计算斜率指标
slope_values = ta.slope(length=10)

# 斜率角度转换
slope_angle = ta.slope(length=10, as_angle=True, to_degrees=True)

# 斜率趋势分析
positive_slope = slope_values > 0
negative_slope = slope_values < 0

# 斜率加速减速
slope_accelerating = slope_values > slope_values.shift()
slope_decelerating = slope_values < slope_values.shift()
```

---

### **`smi` - SMI遍历指标**

```python
@tobtind(lines=['smi', 'smis', 'smios'], lib='pta')
def smi(self, fast=5, slow=20, signal=5, scalar=1., offset=0, **kwargs) -> IndFrame:
```

**功能**：SMI遍历指标与William Blau开发的真强度指数（TSI）相同，不同之处在于SMI包含信号线

**所需数据字段**：`close`

**参数**：

  - `fast`：快线周期，默认5
  - `slow`：慢线周期，默认20
  - `signal`：信号线周期，默认5
  - `scalar`：放大系数，默认1.0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含smi、smis、smios列

**计算公式**：
```
ERG = TSI(close, fast, slow)
Signal = EMA(ERG, signal)
OSC = ERG - Signal
```

**示例**：
```python
# 计算SMI指标
smi_data = ta.smi(fast=5, slow=20)

# 提取SMI各组件
smi_line = smi_data.smi
smi_signal = smi_data.smis
smi_oscillator = smi_data.smios

# SMI零轴交叉
smi_above_zero = smi_line > 0
smi_below_zero = smi_line < 0

# SMI交叉信号
smi_golden_cross = (smi_line > smi_signal) & (smi_line.shift() <= smi_signal.shift())
smi_death_cross = (smi_line < smi_signal) & (smi_line.shift() >= smi_signal.shift())
```

---

### **`squeeze` - 挤压指标**

```python
@tobtind(lines=['sqz_on', 'sqz_off', 'sqz_no'], lib = "pta")
def squeeze(self, bb_length=20, bb_std=2., kc_length=20, kc_scalar=1.5,
            mom_length=12, mom_smooth=6, use_tr=True, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：挤压指标试图捕捉布林带和肯特纳通道两个研究之间的关系，当波动性增加时，带之间的距离也会增加

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `bb_length`：布林带周期，默认20
  - `bb_std`：布林带标准差，默认2.0
  - `kc_length`：肯特纳通道周期，默认20
  - `kc_scalar`：肯特纳通道系数，默认1.5
  - `mom_length`：动量周期，默认12
  - `mom_smooth`：动量平滑周期，默认6
  - `use_tr`：使用真实波幅，默认True
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如detailed（详细模式）、fillna（填充缺失值）

**返回值**：IndFrame，包含挤压状态列

**示例**：
```python
# 计算挤压指标
squeeze_data = ta.squeeze(bb_length=20, kc_length=20)

# 提取挤压状态
squeeze_on = squeeze_data.sqz_on
squeeze_off = squeeze_data.sqz_off
squeeze_no = squeeze_data.sqz_no

# 挤压突破信号
squeeze_breakout = (squeeze_on.shift() == 1) & (squeeze_off == 1)

# 挤压状态变化
squeeze_entering = (squeeze_on == 1) & (squeeze_on.shift() == 0)
squeeze_exiting = (squeeze_off == 1) & (squeeze_off.shift() == 0)
```

---

### **`squeeze_pro` - 专业挤压指标**

```python
@tobtind(lines=['sqzpro', 'sqz_onwide', 'sqz_onnormal', 'sqz_onnarrow', 'sqzpro_off', 'sqzpro_no'], lib = "pta")
def squeeze_pro(self, bb_length=20, bb_std=2., kc_length=20,
                kc_scalar_wide=2., kc_scalar_normal=1.5,
                kc_scalar_narrow=1., mom_length=12, mom_smooth=6,
                use_tr=True, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：专业挤压指标基于John Carter的"TTM Squeeze"指标，捕捉布林带和肯特纳通道的关系

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `bb_length`：布林带周期，默认20
  - `bb_std`：布林带标准差，默认2.0
  - `kc_length`：肯特纳通道周期，默认20
  - `kc_scalar_wide`：宽肯特纳通道系数，默认2.0
  - `kc_scalar_normal`：正常肯特纳通道系数，默认1.5
  - `kc_scalar_narrow`：窄肯特纳通道系数，默认1.0
  - `mom_length`：动量周期，默认12
  - `mom_smooth`：动量平滑周期，默认6
  - `use_tr`：使用真实波幅，默认True
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如detailed（详细模式）、fillna（填充缺失值）

**返回值**：IndFrame，包含专业挤压状态列

**示例**：
```python
# 计算专业挤压指标
squeeze_pro_data = ta.squeeze_pro()

# 提取不同级别的挤压状态
squeeze_wide = squeeze_pro_data.sqz_onwide
squeeze_normal = squeeze_pro_data.sqz_onnormal
squeeze_narrow = squeeze_pro_data.sqz_onnarrow

# 专业挤压动量
squeeze_momentum = squeeze_pro_data.sqzpro

# 多级别挤压分析
tight_squeeze = squeeze_narrow == 1
moderate_squeeze = (squeeze_normal == 1) & (squeeze_narrow == 0)
loose_squeeze = (squeeze_wide == 1) & (squeeze_normal == 0)
```

---

### **`stc` - Schaff趋势周期**

```python
@tobtind(lines=['stc', 'stcmacd', 'stcstoch'], lib='pta')
def stc(self, tclength=10, fast=12, slow=26, factor=0.5, offset=0, **kwargs) -> IndFrame:
```

**功能**：Schaff趋势周期是流行MACD的演进，包含两个级联的随机计算和额外的平滑

**所需数据字段**：`close`

**参数**：

  - `tclength`：趋势周期信号线长度，默认10
  - `fast`：快线周期，默认12
  - `slow`：慢线周期，默认26
  - `factor`：最后随机计算的平滑因子，默认0.5
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如ma1、ma2、osc（外部指标）、fillna（填充缺失值）

**返回值**：IndFrame，包含stc、stcmacd、stcstoch列

**示例**：
```python
# 计算STC指标
stc_data = ta.stc(tclength=10, fast=12, slow=26)

# 提取STC各组件
stc_line = stc_data.stc
stc_macd = stc_data.stcmacd
stc_stoch = stc_data.stcstoch

# STC超买超卖
stc_overbought = stc_line > 75
stc_oversold = stc_line < 25

# STC趋势信号
stc_uptrend = stc_line > 50
stc_downtrend = stc_line < 50

# STC交叉分析
stc_turning_up = (stc_line > stc_line.shift()) & (stc_line.shift() <= stc_line.shift(2))
```

---

### **`stoch` - 随机指标**

```python
@tobtind(lines=['stochs', 'stoch_k', 'stoch_d'], lib='pta')
def stoch(self, k=14, d=3, smooth_k=3, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：随机振荡器由George Lane在1950年代开发，是一个范围限制的振荡器，有两条在0和100之间移动的线

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `k`：快速%K周期，默认14
  - `d`：慢速%K周期，默认3
  - `smooth_k`：慢速%D周期，默认3
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含stochs、stoch_k、stoch_d列

**计算公式**：
```
LL = low for last k periods
HH = high for last k periods
STOCH = 100 * (close - LL) / (HH - LL)
STOCHk = SMA(STOCH, smooth_k)
STOCHd = SMA(FASTK, d)
```

**示例**：
```python
# 计算随机指标
stoch_data = ta.stoch(k=14, d=3)

# 提取随机指标各线
stoch_slow = stoch_data.stochs
stoch_k = stoch_data.stoch_k
stoch_d = stoch_data.stoch_d

# 随机指标超买超卖
stoch_overbought = stoch_k > 80
stoch_oversold = stoch_k < 20

# 随机指标金叉死叉
stoch_golden_cross = (stoch_k > stoch_d) & (stoch_k.shift() <= stoch_d.shift())
stoch_death_cross = (stoch_k < stoch_d) & (stoch_k.shift() >= stoch_d.shift())

# 随机指标背离
price_low = close == close.rolling(20).min()
stoch_high = stoch_k > stoch_k.rolling(20).min()
bullish_divergence = price_low & stoch_high
```

### **`stochrsi` - 随机相对强弱指数**

```python
@tobtind(lines=['stochrsi_k', 'stochrsi_d'], lib='pta')
def stochrsi(self, length=14, rsi_length=14, k=3, d=3, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：随机RSI是一个范围限制的振荡器，有两条在0和100之间移动的线，显示当前RSI在周期高低范围内的位置

**所需数据字段**：`close`

**参数**：

  - `length`：随机RSI周期，默认14
  - `rsi_length`：RSI周期，默认14
  - `k`：快速%K周期，默认3
  - `d`：慢速%K周期，默认3
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含stochrsi_k、stochrsi_d列

**计算公式**：
```
RSI = RSI(high, low, close, rsi_length)
LL = lowest RSI for last rsi_length periods
HH = highest RSI for last rsi_length periods
STOCHRSI = 100 * (RSI - LL) / (HH - LL)
STOCHRSIk = SMA(STOCHRSI, k)
STOCHRSId = SMA(STOCHRSIk, d)
```

**示例**：
```python
# 计算随机RSI指标
stochrsi_data = ta.stochrsi(length=14, rsi_length=14)

# 提取随机RSI各线
stochrsi_k = stochrsi_data.stochrsi_k
stochrsi_d = stochrsi_data.stochrsi_d

# 随机RSI超买超卖
stochrsi_overbought = stochrsi_k > 80
stochrsi_oversold = stochrsi_k < 20

# 随机RSI交叉信号
stochrsi_golden_cross = (stochrsi_k > stochrsi_d) & (stochrsi_k.shift() <= stochrsi_d.shift())
stochrsi_death_cross = (stochrsi_k < stochrsi_d) & (stochrsi_k.shift() >= stochrsi_d.shift())
```

---

### **`td_seq` - TD序列指标**

```python
@tobtind(lines=['td_seq_up', 'td_seq_dn'], lib='pta')
def td_seq(self, asint=False, offset=0, show_all=True, **kwargs) -> IndFrame:
```

**功能**：Tom DeMark的序列指标试图识别上升趋势或下降趋势耗尽并反转的价格点

**所需数据字段**：`close`

**参数**：

  - `asint`：如果为True，用0填充缺失值并转换为整数类型，默认False
  - `offset`：结果偏移周期数，默认0
  - `show_all`：显示1-13，如果设置为False，显示6-9，默认True
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含td_seq_up、td_seq_dn列

**示例**：
```python
# 计算TD序列指标
td_seq_data = ta.td_seq(show_all=True)

# 提取TD序列上下计数
td_seq_up = td_seq_data.td_seq_up
td_seq_dn = td_seq_data.td_seq_dn

# TD序列买入信号（计数9）
td_buy_signal = td_seq_up == 9
td_sell_signal = td_seq_dn == 9

# TD序列设置完成
td_setup_complete = (td_seq_up >= 9) | (td_seq_dn >= 9)
```

---

### **`trix` - 三重指数平滑平均线**

```python
@tobtind(lines=['trix ', 'trixs'], lib='pta')
def trix(self, length=18, signal=9, scalar=100., drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：TRIX是一个动量振荡器，用于识别背离

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认18
  - `signal`：信号线周期，默认9
  - `scalar`：放大系数，默认100.0
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含trix、trixs列

**计算公式**：
```
ema1 = EMA(close, length)
ema2 = EMA(ema1, length)
ema3 = EMA(ema2, length)
TRIX = 100 * ROC(ema3, drift)
```

**示例**：
```python
# 计算TRIX指标
trix_data = ta.trix(length=18, signal=9)

# 提取TRIX线和信号线
trix_line = trix_data.trix
trix_signal = trix_data.trixs

# TRIX零轴交叉
trix_above_zero = trix_line > 0
trix_below_zero = trix_line < 0

# TRIX交叉信号
trix_golden_cross = (trix_line > trix_signal) & (trix_line.shift() <= trix_signal.shift())
trix_death_cross = (trix_line < trix_signal) & (trix_line.shift() >= trix_signal.shift())
```

---

### **`tsi` - 真强度指数**

```python
@tobtind(lines=['tsir', 'tsis'], lib='pta')
def tsi(self, fast=13, slow=25, signal=13, scalar=100., mamode="ema", drift=1,  offset=0, **kwargs) -> IndFrame:
```

**功能**：真强度指数是一个动量指标，用于识别趋势方向上的短期波动以及确定超买和超卖条件

**所需数据字段**：`close`

**参数**：

  - `fast`：快线周期，默认13
  - `slow`：慢线周期，默认25
  - `signal`：信号线周期，默认13
  - `scalar`：放大系数，默认100.0
  - `mamode`：移动平均类型，默认"ema"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含tsir、tsis列

**计算公式**：
```
diff = close.diff(drift)
slow_ema = EMA(diff, slow)
fast_slow_ema = EMA(slow_ema, slow)
abs_diff_slow_ema = EMA(ABS(diff), slow)
abema = EMA(abs_diff_slow_ema, fast)
TSI = scalar * fast_slow_ema / abema
Signal = EMA(TSI, signal)
```

**示例**：
```python
# 计算TSI指标
tsi_data = ta.tsi(fast=13, slow=25)

# 提取TSI线和信号线
tsi_line = tsi_data.tsir
tsi_signal = tsi_data.tsis

# TSI零轴交叉
tsi_above_zero = tsi_line > 0
tsi_below_zero = tsi_line < 0

# TSI交叉信号
tsi_bullish = (tsi_line > tsi_signal) & (tsi_line.shift() <= tsi_signal.shift())
tsi_bearish = (tsi_line < tsi_signal) & (tsi_line.shift() >= tsi_signal.shift())
```

---

### **`uo` - 终极振荡器**

```python
@tobtind(lines=None, lib='pta')
def uo(self, fast=7, medium=14, slow=28, fast_w=4., medium_w=2.,
       slow_w=1., talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：终极振荡器是三个不同周期的动量指标，试图纠正错误的背离交易信号

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `fast`：快速周期，默认7
  - `medium`：中速周期，默认14
  - `slow`：慢速周期，默认28
  - `fast_w`：快速权重，默认4.0
  - `medium_w`：中速权重，默认2.0
  - `slow_w`：慢速权重，默认1.0
  - `talib`：是否使用TA-Lib实现，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，UO指标值序列

**计算公式**：
```
min_low_or_pc = close.shift(drift).combine(low, min)
max_high_or_pc = close.shift(drift).combine(high, max)
bp = close - min_low_or_pc
tr = max_high_or_pc - min_low_or_pc
fast_avg = SUM(bp, fast) / SUM(tr, fast)
medium_avg = SUM(bp, medium) / SUM(tr, medium)
slow_avg = SUM(bp, slow) / SUM(tr, slow)
total_weight = fast_w + medium_w + slow_w
weights = (fast_w * fast_avg) + (medium_w * medium_avg) + (slow_w * slow_avg)
UO = 100 * weights / total_weight
```

**示例**：
```python
# 计算终极振荡器
uo_values = ta.uo(fast=7, medium=14, slow=28)

# UO超买超卖
uo_overbought = uo_values > 70
uo_oversold = uo_values < 30

# UO趋势强度
uo_rising = uo_values > uo_values.shift()
uo_falling = uo_values < uo_values.shift()

# UO背离分析
price_high = close == close.rolling(20).max()
uo_low = uo_values < uo_values.rolling(20).max()
bearish_divergence = price_high & uo_low
```

---

### **`willr` - 威廉百分比R**

```python
@tobtind(lines=None, lib='pta')
def willr(self, length=14, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：威廉百分比R是一个类似于RSI的动量振荡器，试图识别超买和超卖条件

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，WILLR指标值序列

**计算公式**：
```
LL = low.rolling(length).min()
HH = high.rolling(length).max()
WILLR = 100 * ((close - LL) / (HH - LL) - 1)
```

**示例**：
```python
# 计算威廉百分比R
willr_values = ta.willr(length=14)

# 威廉指标超买超卖
willr_overbought = willr_values > -20
willr_oversold = willr_values < -80

# 威廉指标极端值
willr_extreme_overbought = willr_values > -10
willr_extreme_oversold = willr_values < -90

# 威廉指标反转信号
willr_reversal_up = (willr_values < -80) & (willr_values.shift() >= -80)
willr_reversal_down = (willr_values > -20) & (willr_values.shift() <= -20)
```

---

## 4. 重叠指标（Overlap）

### **`alma` - Arnaud Legoux移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def alma(self, length=10, sigma=6., distribution_offset=0.85, offset=0, **kwargs) -> IndSeries:
```

**功能**：ALMA移动平均线使用正态分布曲线，可以从0移动到1，减少数据滞后的同时平滑以减少噪音

**所需数据字段**：`close`

**参数**：

  - `length`：周期长度，默认10
  - `sigma`：平滑值，默认6.0
  - `distribution_offset`：分布偏移值，最小0（更平滑），最大1（更敏感），默认0.85
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，ALMA移动平均值序列

**示例**：
```python
# 计算ALMA移动平均线
alma_values = ta.alma(length=10, sigma=6.0)

# ALMA趋势方向
alma_uptrend = alma_values > alma_values.shift()
alma_downtrend = alma_values < alma_values.shift()

# ALMA与价格关系
price_above_alma = close > alma_values
price_below_alma = close < alma_values

# ALMA交叉信号
alma_golden_cross = (close > alma_values) & (close.shift() <= alma_values.shift())
alma_death_cross = (close < alma_values) & (close.shift() >= alma_values.shift())
```

---

### **`dema` - 双指数移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def dema(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：双指数移动平均线试图提供比普通指数移动平均线更平滑且滞后更少的平均值

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，DEMA移动平均值序列

**计算公式**：
```
ema1 = EMA(close, length)
ema2 = EMA(ema1, length)
DEMA = 2 * ema1 - ema2
```

**示例**：
```python
# 计算DEMA移动平均线
dema_values = ta.dema(length=10)

# DEMA趋势分析
dema_rising = dema_values > dema_values.shift()
dema_falling = dema_values < dema_values.shift()

# DEMA与价格关系
price_above_dema = close > dema_values
price_below_dema = close < dema_values

# DEMA交叉策略
dema_cross_up = (close > dema_values) & (close.shift() <= dema_values.shift())
dema_cross_down = (close < dema_values) & (close.shift() >= dema_values.shift())
```

---

### **`ema` - 指数移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def ema(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：指数移动平均线相比简单移动平均线更具响应性，权重由与其长度成正比的alpha决定

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust（调整）、sma（使用SMA初始值）、fillna（填充缺失值）

**返回值**：IndSeries，EMA移动平均值序列

**计算公式**：
```
EMA = close.ewm(span=length, adjust=adjust).mean()
```

**示例**：
```python
# 计算EMA移动平均线
ema_values = ta.ema(length=10)

# 多周期EMA组合
ema_fast = ta.ema(length=5)
ema_slow = ta.ema(length=20)

# EMA金叉死叉
ema_golden_cross = (ema_fast > ema_slow) & (ema_fast.shift() <= ema_slow.shift())
ema_death_cross = (ema_fast < ema_slow) & (ema_fast.shift() >= ema_slow.shift())

# EMA支撑阻力
ema_support = close > ema_values
ema_resistance = close < ema_values
```

---

### **`fwma` - 斐波那契加权移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def fwma(self, length=10, asc=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：斐波那契加权移动平均线类似于加权移动平均线，但权重基于斐波那契序列

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `asc`：近期值权重更大，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，FWMA移动平均值序列

**示例**：
```python
# 计算FWMA移动平均线
fwma_values = ta.fwma(length=10)

# FWMA趋势分析
fwma_uptrend = fwma_values > fwma_values.shift()
fwma_downtrend = fwma_values < fwma_values.shift()

# FWMA与价格关系
price_above_fwma = close > fwma_values
price_below_fwma = close < fwma_values

# FWMA交叉信号
fwma_cross_up = (close > fwma_values) & (close.shift() <= fwma_values.shift())
fwma_cross_down = (close < fwma_values) & (close.shift() >= fwma_values.shift())
```

---

### **`hilo` - Gann高低激活器**

```python
@tobtind(lines=['hilo', 'hilol', 'hilos'], overlap=True, lib='pta')
def hilo(self, high_length=13, low_length=21, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：Gann高低激活器指标基于两个不同的简单移动平均线，跟踪高点和低点两条曲线，根据收盘价决定绘制哪条线

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `high_length`：高点周期，默认13
  - `low_length`：低点周期，默认21
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust、presma、fillna（填充缺失值）

**返回值**：IndFrame，包含hilo、hilol（长线）、hilos（短线）列

**计算公式**：
```
high_ma = SMA(high, high_length)
low_ma = SMA(low, low_length)
for i in range(1, m):
    if close.iloc[i] > high_ma.iloc[i - 1]:
        hilo.iloc[i] = low_ma.iloc[i]
    elif close.iloc[i] < low_ma.iloc[i - 1]:
        hilo.iloc[i] = high_ma.iloc[i]
    else:
        hilo.iloc[i] = hilo.iloc[i - 1]
```

**示例**：
```python
# 计算Gann高低激活器
hilo_data = ta.hilo(high_length=13, low_length=21)

# 提取HILO各组件
hilo_line = hilo_data.hilo
hilo_long = hilo_data.hilol
hilo_short = hilo_data.hilos

# HILO趋势信号
hilo_uptrend = hilo_line == hilo_short
hilo_downtrend = hilo_line == hilo_long

# HILO交叉信号
hilo_turn_up = (hilo_line == hilo_short) & (hilo_line.shift() == hilo_long)
hilo_turn_down = (hilo_line == hilo_long) & (hilo_line.shift() == hilo_short)
```

---

### **`hl2` - 高低平均价**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def hl2(self, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算最高价和最低价的简单平均值，作为价格的代表性中间值

**所需数据字段**：`high`, `low`

**参数**：

  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，高低平均价序列

**计算公式**：
```
HL2 = (high + low) / 2
```

**示例**：
```python
# 计算高低平均价
hl2_values = ta.hl2()

# HL2作为价格基准
price_above_hl2 = close > hl2_values
price_below_hl2 = close < hl2_values

# HL2趋势分析
hl2_rising = hl2_values > hl2_values.shift()
hl2_falling = hl2_values < hl2_values.shift()
```

---

### **`hlc3` - 高中低三价平均**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def hlc3(self, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算最高价、最低价和收盘价的平均值，提供更全面的价格代表性

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，高中低三价平均序列

**计算公式**：
```
HLC3 = (high + low + close) / 3
```

**示例**：
```python
# 计算三价平均
hlc3_values = ta.hlc3()

# HLC3作为典型价格
typical_price = hlc3_values

# HLC3支撑阻力
support_break = close < hlc3_values
resistance_break = close > hlc3_values

# HLC3动量分析
hlc3_momentum = hlc3_values.diff()
```

---

### **`hma` - 赫尔移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def hma(self, length=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：赫尔移动平均线试图减少或消除移动平均线中的滞后

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，HMA移动平均值序列

**计算公式**：
```
half_length = int(0.5 * length)
sqrt_length = int(sqrt(length))
wmaf = WMA(close, half_length)
wmas = WMA(close, length)
HMA = WMA(2 * wmaf - wmas, sqrt_length)
```

**示例**：
```python
# 计算赫尔移动平均线
hma_values = ta.hma(length=10)

# HMA趋势方向
hma_uptrend = hma_values > hma_values.shift()
hma_downtrend = hma_values < hma_values.shift()

# HMA与价格关系
price_above_hma = close > hma_values
price_below_hma = close < hma_values

# HMA交叉信号
hma_golden_cross = (close > hma_values) & (close.shift() <= hma_values.shift())
hma_death_cross = (close < hma_values) & (close.shift() >= hma_values.shift())
```

---

### **`hwma` - Holt-Winter移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def hwma(self, na=0.2, nb=0.1, nc=0.1, offset=0, **kwargs) -> IndSeries:
```

**功能**：HWMA是通过Holt-Winter方法的三参数移动平均线，三个参数应选择以获得预测

**所需数据字段**：`close`

**参数**：

  - `na`：平滑序列参数（0到1），默认0.2
  - `nb`：趋势参数（0到1），默认0.1
  - `nc`：季节性参数（0到1），默认0.1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，HWMA移动平均值序列

**计算公式**：
```
F[i] = (1-na) * (F[i-1] + V[i-1] + 0.5 * A[i-1]) + na * Price[i]
V[i] = (1-nb) * (V[i-1] + A[i-1]) + nb * (F[i] - F[i-1])
A[i] = (1-nc) * A[i-1] + nc * (V[i] - V[i-1])
HWMA[i] = F[i] + V[i] + 0.5 * A[i]
```

**示例**：
```python
# 计算HWMA移动平均线
hwma_values = ta.hwma(na=0.2, nb=0.1, nc=0.1)

# HWMA趋势分析
hwma_rising = hwma_values > hwma_values.shift()
hwma_falling = hwma_values < hwma_values.shift()

# HWMA预测能力
hwma_accuracy = (hwma_values.shift() - close).abs().rolling(10).mean()

# HWMA参数优化
hwma_fast = ta.hwma(na=0.3, nb=0.2, nc=0.1)
hwma_slow = ta.hwma(na=0.1, nb=0.05, nc=0.05)
```

---

### **`jma` - Jurik移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def jma(self, length=7, phase=0., offset=0, **kwargs) -> IndSeries:
```

**功能**：Mark Jurik的移动平均线试图消除噪音以查看"真实"的基础活动，具有极低的滞后、非常平滑且对市场缺口响应迅速

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认7
  - `phase`：平均值的轻重程度[-100, 100]，默认0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，JMA移动平均值序列

**示例**：
```python
# 计算Jurik移动平均线
jma_values = ta.jma(length=7, phase=0)

# JMA趋势识别
jma_uptrend = jma_values > jma_values.shift()
jma_downtrend = jma_values < jma_values.shift()

# JMA相位调整
jma_light = ta.jma(length=7, phase=50)   # 更轻快的响应
jma_heavy = ta.jma(length=7, phase=-50)  # 更平滑的响应

# JMA支撑阻力
jma_support = close > jma_values
jma_resistance = close < jma_values
```

---

### **`kama` - Kaufman自适应移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def kama(self, length=10, fast=2, slow=30, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：Kaufman自适应移动平均线旨在考虑市场噪音或波动性，在价格波动相对较小且噪音较低时紧密跟随价格

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `fast`：快速MA周期，默认2
  - `slow`：慢速MA周期，默认30
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，KAMA移动平均值序列

**示例**：
```python
# 计算KAMA移动平均线
kama_values = ta.kama(length=10, fast=2, slow=30)

# KAMA趋势分析
kama_rising = kama_values > kama_values.shift()
kama_falling = kama_values < kama_values.shift()

# KAMA自适应特性
kama_volatility = kama_values.diff().abs().rolling(10).mean()

# KAMA交叉策略
kama_cross_up = (close > kama_values) & (close.shift() <= kama_values.shift())
kama_cross_down = (close < kama_values) & (close.shift() >= kama_values.shift())
```

---

### **`ichimoku` - 一目均衡表**

```python
@tobtind(lines=['spana', 'spanb', 'tenkan_sen', 'kijun_sen', 'chikou_span'], overlap=True, lib="pta")
def ichimoku(self, tenkan=9, kijun=26, senkou=52, include_chikou=True, offset=0, **kwargs) -> IndFrame:
```

**功能**：一目均衡表作为金融市场的预测模型开发，包含五个主要组件，提供全面的趋势分析

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `tenkan`：转换线周期，默认9
  - `kijun`：基准线周期，默认26
  - `senkou`：先行跨度周期，默认52
  - `include_chikou`：是否包含迟行线组件，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含spana、spanb、tenkan_sen、kijun_sen、chikou_span列

**计算公式**：
```
TENKAN_SEN = (highest_high + lowest_low) / 2  # 转换线
KIJUN_SEN = (highest_high + lowest_low) / 2   # 基准线
CHIKOU_SPAN = close.shift(-kijun)             # 迟行线
SPAN_A = (TENKAN_SEN + KIJUN_SEN) / 2         # 先行跨度A
SPAN_B = (highest_high + lowest_low) / 2      # 先行跨度B
```

**示例**：
```python
# 计算一目均衡表
ichimoku_data = ta.ichimoku(tenkan=9, kijun=26, senkou=52)

# 提取各组件
tenkan_sen = ichimoku_data.tenkan_sen
kijun_sen = ichimoku_data.kijun_sen
span_a = ichimoku_data.spana
span_b = ichimoku_data.spanb
chikou_span = ichimoku_data.chikou_span

# 云层分析
above_cloud = close > span_a.max(span_b)
below_cloud = close < span_a.min(span_b)

# 转换线基准线交叉
tk_cross_up = (tenkan_sen > kijun_sen) & (tenkan_sen.shift() <= kijun_sen.shift())
tk_cross_down = (tenkan_sen < kijun_sen) & (tenkan_sen.shift() >= kijun_sen.shift())
```

---

### **`linreg` - 线性回归移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def linreg(self, length=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：线性回归移动平均线是标准线性回归的简化版本，对单个变量进行滚动回归

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如angle（斜率角度）、degrees（角度度数）、intercept（截距）、r（相关系数）、slope（斜率）、tsf（时间序列预测值）、fillna（填充缺失值）

**返回值**：IndSeries，线性回归移动平均值序列

**计算公式**：
```
x = [1, 2, ..., n]
x_sum = 0.5 * length * (length + 1)
x2_sum = length * (length + 1) * (2 * length + 1) / 6
divisor = length * x2_sum - x_sum * x_sum
y_sum = IndSeries.sum()
xy_sum = (x * IndSeries).sum()
m = (length * xy_sum - x_sum * y_sum) / divisor
b = (y_sum * x2_sum - x_sum * xy_sum) / divisor
linreg = m * (length - 1) + b
```

**示例**：
```python
# 计算线性回归移动平均线
linreg_values = ta.linreg(length=10)

# 线性回归斜率
linreg_slope = ta.linreg(length=10, slope=True)

# 线性回归角度
linreg_angle = ta.linreg(length=10, angle=True, degrees=True)

# 趋势强度分析
strong_trend = linreg_slope.abs() > linreg_slope.rolling(20).quantile(0.8)

# 线性回归预测
linreg_forecast = ta.linreg(length=10, tsf=True)
```

---

### **`mcgd` - McGinley动态指标**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def mcgd(self, length=10, offset=0, c=1., **kwargs) -> IndSeries:
```

**功能**：McGinley动态指标看起来像移动平均线，但实际上是一种价格平滑机制，最小化价格分离和价格锯齿

**所需数据字段**：`close`

**参数**：

  - `length`：指标周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `c`：分母乘数，有时设置为0.6，默认1
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，McGinley动态指标值序列

**计算公式**：
```
denom = (constant * length * (IndSeries.iloc[1] / IndSeries.iloc[0]) ** 4)
IndSeries.iloc[1] = (IndSeries.iloc[0] + ((IndSeries.iloc[1] - IndSeries.iloc[0]) / denom))
```

**示例**：
```python
# 计算McGinley动态指标
mcgd_values = ta.mcgd(length=10, c=1.0)

# McGinley趋势分析
mcgd_uptrend = mcgd_values > mcgd_values.shift()
mcgd_downtrend = mcgd_values < mcgd_values.shift()

# McGinley自适应特性
mcgd_fast = ta.mcgd(length=5, c=0.6)
mcgd_slow = ta.mcgd(length=20, c=1.0)

# McGinley与价格关系
price_above_mcgd = close > mcgd_values
price_below_mcgd = close < mcgd_values
```

---

### **`midpoint` - 中点指标**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def midpoint(self, length=2, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算指定周期内价格的中点值，用于识别价格的平均水平

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认2
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，中点值序列

**示例**：
```python
# 计算中点指标
midpoint_values = ta.midpoint(length=2)

# 中点趋势分析
midpoint_rising = midpoint_values > midpoint_values.shift()
midpoint_falling = midpoint_values < midpoint_values.shift()

# 中点支撑阻力
support_level = midpoint_values.rolling(20).min()
resistance_level = midpoint_values.rolling(20).max()
```

---

### **`midprice` - 中间价格指标**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def midprice(self, length=2, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算指定周期内最高价和最低价的中间点，反映价格区间的中心位置

**所需数据字段**：`high`, `low`

**参数**：

  - `length`：计算周期，默认2
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，中间价格序列

**示例**：
```python
# 计算中间价格指标
midprice_values = ta.midprice(length=2)

# 中间价格通道
midprice_upper = midprice_values + (high - low).rolling(10).mean()
midprice_lower = midprice_values - (high - low).rolling(10).mean()

# 价格与中间价格关系
above_midprice = close > midprice_values
below_midprice = close < midprice_values
```

---

### **`ohlc4` - 四价平均指标**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def ohlc4(self, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算开盘价、最高价、最低价和收盘价的平均值，提供综合价格代表性

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，四价平均值序列

**计算公式**：
```
OHLC4 = (open + high + low + close) / 4
```

**示例**：
```python
# 计算四价平均指标
ohlc4_values = ta.ohlc4()

# OHLC4作为典型价格
typical_price = ohlc4_values

# OHLC4趋势分析
ohlc4_uptrend = ohlc4_values > ohlc4_values.shift()
ohlc4_downtrend = ohlc4_values < ohlc4_values.shift()

# OHLC4支撑阻力
ohlc4_support = ohlc4_values.rolling(20).min()
ohlc4_resistance = ohlc4_values.rolling(20).max()
```

---

### **`pwma` - 帕斯卡加权移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def pwma(self, length=10, asc=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：帕斯卡加权移动平均线类似于对称三角窗口，但PWMA的权重基于帕斯卡三角形

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `asc`：近期值权重更大，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，PWMA移动平均值序列

**示例**：
```python
# 计算帕斯卡加权移动平均线
pwma_values = ta.pwma(length=10)

# PWMA趋势方向
pwma_uptrend = pwma_values > pwma_values.shift()
pwma_downtrend = pwma_values < pwma_values.shift()

# PWMA与价格关系
price_above_pwma = close > pwma_values
price_below_pwma = close < pwma_values

# PWMA交叉信号
pwma_golden_cross = (close > pwma_values) & (close.shift() <= pwma_values.shift())
pwma_death_cross = (close < pwma_values) & (close.shift() >= pwma_values.shift())
```

---

### **`ma` - 移动平均工具函数**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def ma(self, name: str = "sma", length: int = 10, **kwargs) -> IndSeries:
```

**功能**：简化移动平均选择的工具函数，支持多种移动平均类型

**所需数据字段**：`close`

**参数**：

  - `name`：移动平均类型名称，默认"sma"
  - `length`：计算周期，默认10
  - `**kwargs`：移动平均特定参数

**支持的移动平均类型**：
`dema`, `ema`, `fwma`, `hma`, `linreg`, `midpoint`, `pwma`, `rma`, `sinwma`, `sma`, `swma`, `t3`, `tema`, `trima`, `vidya`, `wma`, `zlma`

**返回值**：IndSeries，移动平均值序列

**示例**：
```python
# 使用工具函数计算不同移动平均线
ema_8 = ta.ma("ema", length=8)
sma_20 = ta.ma("sma", length=20)
hma_14 = ta.ma("hma", length=14)

# 移动平均组合策略
fast_ma = ta.ma("ema", length=5)
slow_ma = ta.ma("ema", length=20)
golden_cross = (fast_ma > slow_ma) & (fast_ma.shift() <= slow_ma.shift())

# 多移动平均系统
short_ma = ta.ma("sma", length=5)
medium_ma = ta.ma("sma", length=10)
long_ma = ta.ma("sma", length=20)
aligned_uptrend = (short_ma > medium_ma) & (medium_ma > long_ma)
```

---

### **`rma` - Wilder平滑移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def rma(self, length=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：Wilder平滑移动平均线是具有修改alpha = 1 / length的指数移动平均线

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，RMA移动平均值序列

**计算公式**：
```
alpha = 1 / length
RMA = EMA(close, alpha=alpha)
```

**示例**：
```python
# 计算Wilder平滑移动平均线
rma_values = ta.rma(length=10)

# RMA趋势分析
rma_uptrend = rma_values > rma_values.shift()
rma_downtrend = rma_values < rma_values.shift()

# RMA支撑阻力
rma_support = close > rma_values
rma_resistance = close < rma_values

# RMA参数优化
rma_fast = ta.rma(length=5)
rma_slow = ta.rma(length=20)
rma_cross = (rma_fast > rma_slow) & (rma_fast.shift() <= rma_slow.shift())
```

---

### **`sinwma` - 正弦加权移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def sinwma(self, length=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：使用正弦周期的加权平均，平均值的中项具有最高权重

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，正弦加权移动平均值序列

**示例**：
```python
# 计算正弦加权移动平均线
sinwma_values = ta.sinwma(length=10)

# SINWMA趋势识别
sinwma_rising = sinwma_values > sinwma_values.shift()
sinwma_falling = sinwma_values < sinwma_values.shift()

# SINWMA与价格关系
price_above_sinwma = close > sinwma_values
price_below_sinwma = close < sinwma_values

# SINWMA交叉策略
sinwma_cross_up = (close > sinwma_values) & (close.shift() <= sinwma_values.shift())
sinwma_cross_down = (close < sinwma_values) & (close.shift() >= sinwma_values.shift())
```

---

### **`sma` - 简单移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def sma(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：经典移动平均线，是n个周期内等权重的平均值

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust、presma、fillna（填充缺失值）

**返回值**：IndSeries，SMA移动平均值序列

**计算公式**：
```
SMA = SUM(close, length) / length
```

**示例**：
```python
# 计算简单移动平均线
sma_values = ta.sma(length=10)

# 多周期SMA组合
sma_fast = ta.sma(length=5)
sma_slow = ta.sma(length=20)
sma_signal = (sma_fast > sma_slow) & (sma_fast.shift() <= sma_slow.shift())

# SMA支撑阻力
sma_support = close > sma_values
sma_resistance = close < sma_values

# SMA包络线
sma_upper = sma_values * 1.02
sma_lower = sma_values * 0.98
price_in_envelope = (close <= sma_upper) & (close >= sma_lower)
```

---

### **`ssf` - Ehler超级平滑滤波器**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def ssf(self, length=10, poles=2, offset=0, **kwargs) -> IndSeries:
```

**功能**：John F. Ehlers的解决方案，通过航空航天模拟滤波器设计研究减少滞后和消除混叠噪声

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `poles`：使用的极点数，2或3，默认2
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，SSF滤波值序列

**示例**：
```python
# 计算超级平滑滤波器
ssf_values = ta.ssf(length=10, poles=2)

# SSF趋势分析
ssf_uptrend = ssf_values > ssf_values.shift()
ssf_downtrend = ssf_values < ssf_values.shift()

# 不同极点设置比较
ssf_2pole = ta.ssf(length=10, poles=2)
ssf_3pole = ta.ssf(length=10, poles=3)
ssf_difference = ssf_2pole - ssf_3pole

# SSF平滑效果
price_volatility = close.diff().abs().rolling(10).mean()
ssf_smoothness = ssf_values.diff().abs().rolling(10).mean()
smoothing_ratio = ssf_smoothness / price_volatility
```

---

### **`supertrend` - 超级趋势指标**

```python
@tobtind(lines=['trend', 'dir', 'long', 'short'], overlap=True, lib='pta')
def supertrend(self, length=7, multiplier=3., offset=0, **kwargs) -> IndFrame:
```

**功能**：超级趋势是重叠指标，用于帮助识别趋势方向、设置止损、识别支撑和阻力以及生成买卖信号

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：ATR计算周期，默认7
  - `multiplier`：上下带距离中点的系数，默认3.0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含trend、dir、long、short列

**计算公式**：
```
MID = multiplier * ATR
LOWERBAND = HL2 - MID
UPPERBAND = HL2 + MID
根据价格与上下带的关系确定超级趋势值
```

**示例**：
```python
# 计算超级趋势指标
supertrend_data = ta.supertrend(length=7, multiplier=3.0)

# 提取超级趋势各组件
supertrend_line = supertrend_data.trend
supertrend_direction = supertrend_data.dir
supertrend_long = supertrend_data.long
supertrend_short = supertrend_data.short

# 超级趋势方向信号
uptrend_signal = supertrend_direction == 1
downtrend_signal = supertrend_direction == -1

# 超级趋势反转信号
trend_reversal_up = (supertrend_direction == 1) & (supertrend_direction.shift() == -1)
trend_reversal_down = (supertrend_direction == -1) & (supertrend_direction.shift() == 1)

# 超级趋势止损
stop_loss_long = supertrend_short
stop_loss_short = supertrend_long
```

---

### **`swma` - 对称加权移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def swma(self, length=10, asc=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：对称加权移动平均线，权重基于对称三角形分布，中间值权重最高

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `asc`：近期值权重更大，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，SWMA移动平均值序列

**示例**：
```python
# 计算对称加权移动平均线
swma_values = ta.swma(length=10)

# SWMA趋势分析
swma_uptrend = swma_values > swma_values.shift()
swma_downtrend = swma_values < swma_values.shift()

# SWMA与价格关系
price_above_swma = close > swma_values
price_below_swma = close < swma_values

# SWMA交叉信号
swma_golden_cross = (close > swma_values) & (close.shift() <= swma_values.shift())
swma_death_cross = (close < swma_values) & (close.shift() >= swma_values.shift())
```

---

### **`t3` - Tillson T3移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def t3(self, length=10, a=0.7, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：Tim Tillson的T3移动平均线被认为是相对于其他移动平均线更平滑且更具响应性的移动平均线

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `a`：平滑参数，0 < a < 1，默认0.7
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust、presma、fillna（填充缺失值）

**返回值**：IndSeries，T3移动平均值序列

**计算公式**：
```
c1 = -a^3
c2 = 3a^2 + 3a^3
c3 = -6a^2 - 3a - 3a^3
c4 = a^3 + 3a^2 + 3a + 1
ema1 = EMA(close, length)
ema2 = EMA(ema1, length)
...
T3 = c1 * ema6 + c2 * ema5 + c3 * ema4 + c4 * ema3
```

**示例**：
```python
# 计算T3移动平均线
t3_values = ta.t3(length=10, a=0.7)

# T3趋势识别
t3_rising = t3_values > t3_values.shift()
t3_falling = t3_values < t3_values.shift()

# T3参数优化
t3_fast = ta.t3(length=5, a=0.5)
t3_slow = ta.t3(length=20, a=0.8)
t3_cross = (t3_fast > t3_slow) & (t3_fast.shift() <= t3_slow.shift())

# T3支撑阻力
t3_support = close > t3_values
t3_resistance = close < t3_values
```

---

### **`tema` - 三重指数移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def tema(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：滞后较小的指数移动平均线，通过三重平滑减少滞后

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust、presma、fillna（填充缺失值）

**返回值**：IndSeries，TEMA移动平均值序列

**计算公式**：
```
ema1 = EMA(close, length)
ema2 = EMA(ema1, length)
ema3 = EMA(ema2, length)
TEMA = 3 * (ema1 - ema2) + ema3
```

**示例**：
```python
# 计算三重指数移动平均线
tema_values = ta.tema(length=10)

# TEMA趋势分析
tema_uptrend = tema_values > tema_values.shift()
tema_downtrend = tema_values < tema_values.shift()

# TEMA与EMA比较
ema_values = ta.ema(length=10)
tema_vs_ema = tema_values - ema_values

# TEMA交叉策略
tema_cross_up = (close > tema_values) & (close.shift() <= tema_values.shift())
tema_cross_down = (close < tema_values) & (close.shift() >= tema_values.shift())
```

---

### **`trima` - 三角移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def trima(self, length=10, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：权重形状为三角形的加权移动平均线，周期中间的权重最大

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust、fillna（填充缺失值）

**返回值**：IndSeries，TRIMA移动平均值序列

**计算公式**：
```
half_length = round(0.5 * (length + 1))
SMA1 = SMA(close, half_length)
TRIMA = SMA(SMA1, half_length)
```

**示例**：
```python
# 计算三角移动平均线
trima_values = ta.trima(length=10)

# TRIMA趋势方向
trima_rising = trima_values > trima_values.shift()
trima_falling = trima_values < trima_values.shift()

# TRIMA与SMA比较
sma_values = ta.sma(length=10)
trima_smoothness = trima_values.diff().abs().mean()
sma_smoothness = sma_values.diff().abs().mean()

# TRIMA支撑阻力
trima_support = close > trima_values
trima_resistance = close < trima_values
```

---

### **`vidya` - 可变指数动态平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def vidya(self, length=14, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：由Tushar Chande开发的可变指数动态平均线，根据相对价格波动性动态调整回溯周期

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认14
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如adjust、sma、talib、fillna（填充缺失值）

**返回值**：IndSeries，VIDYA移动平均值序列

**示例**：
```python
# 计算VIDYA移动平均线
vidya_values = ta.vidya(length=14)

# VIDYA自适应特性
vidya_volatility = vidya_values.diff().abs().rolling(10).mean()

# VIDYA趋势识别
vidya_uptrend = vidya_values > vidya_values.shift()
vidya_downtrend = vidya_values < vidya_values.shift()

# VIDYA参数优化
vidya_fast = ta.vidya(length=7)
vidya_slow = ta.vidya(length=21)
vidya_cross = (vidya_fast > vidya_slow) & (vidya_fast.shift() <= vidya_slow.shift())
```

---

### **`vwap` - 成交量加权平均价格**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def vwap(self, anchor="D", offset=0, **kwargs) -> IndSeries:
```

**功能**：成交量加权平均价格，衡量按成交量加权的平均典型价格，通常用于日内图表识别一般方向

**所需数据字段**：`high`, `low`, `close`, `volume`

**参数**：

  - `anchor`：VWAP锚定方式，默认"D"（日线）
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，VWAP值序列

**计算公式**：
```
tp = typical_price = (high + low + close) / 3
tpv = tp * volume
VWAP = tpv.cumsum() / volume.cumsum()
```

**示例**：
```python
# 计算VWAP指标
vwap_values = ta.vwap(anchor="D")

# VWAP支撑阻力
above_vwap = close > vwap_values
below_vwap = close < vwap_values

# VWAP趋势分析
vwap_rising = vwap_values > vwap_values.shift()
vwap_falling = vwap_values < vwap_values.shift()

# VWAP交易信号
vwap_buy_signal = (close > vwap_values) & (close.shift() <= vwap_values.shift())
vwap_sell_signal = (close < vwap_values) & (close.shift() >= vwap_values.shift())
```

---

### **`vwma` - 成交量加权移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def vwma(self, length=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：成交量加权移动平均线，结合价格和成交量信息

**所需数据字段**：`close`, `volume`

**参数**：

  - `length`：计算周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，VWMA移动平均值序列

**计算公式**：
```
pv = close * volume
VWMA = SMA(pv, length) / SMA(volume, length)
```

**示例**：
```python
# 计算成交量加权移动平均线
vwma_values = ta.vwma(length=10)

# VWMA趋势分析
vwma_uptrend = vwma_values > vwma_values.shift()
vwma_downtrend = vwma_values < vwma_values.shift()

# VWMA与价格关系
price_above_vwma = close > vwma_values
price_below_vwma = close < vwma_values

# VWMA成交量确认
volume_confirmation = (volume > volume.rolling(20).mean()) & (close > vwma_values)
```

---

### **`wcp` - 加权收盘价**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def wcp(self, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：加权收盘价，给予收盘价双倍权重的加权价格计算

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，加权收盘价序列

**计算公式**：
```
WCP = (2 * close + high + low) / 4
```

**示例**：
```python
# 计算加权收盘价
wcp_values = ta.wcp()

# 加权收盘价分析
wcp_above_close = wcp_values > close
wcp_below_close = wcp_values < close

# WCP趋势识别
wcp_rising = wcp_values > wcp_values.shift()
wcp_falling = wcp_values < wcp_values.shift()

# WCP作为典型价格
typical_price_wcp = wcp_values
```

---

### **`wma` - 加权移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def wma(self, length=10, asc=True, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：权重线性增加的加权移动平均线，最近的数据具有最重的权重

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `asc`：近期值权重更大，默认True
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，WMA移动平均值序列

**示例**：
```python
# 计算加权移动平均线
wma_values = ta.wma(length=10)

# WMA趋势分析
wma_uptrend = wma_values > wma_values.shift()
wma_downtrend = wma_values < wma_values.shift()

# WMA与SMA比较
sma_values = ta.sma(length=10)
wma_responsiveness = (wma_values - close).abs().mean()
sma_responsiveness = (sma_values - close).abs().mean()

# WMA交叉策略
wma_cross_up = (close > wma_values) & (close.shift() <= wma_values.shift())
wma_cross_down = (close < wma_values) & (close.shift() >= wma_values.shift())
```

---

### **`zlma` - 零滞后移动平均线**

```python
@tobtind(lines=None, overlap=True, lib='pta')
def zlma(self, length=10, mamode="ema", offset=0, **kwargs) -> IndSeries:
```

**功能**：零滞后移动平均线试图消除与移动平均线相关的滞后，由John Ehler和Ric Way创建

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `mamode`：移动平均类型，支持'ema', 'hma', 'sma', 'wma'，默认'ema'
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，ZLMA移动平均值序列

**计算公式**：
```
lag = int(0.5 * (length - 1))
SOURCE = 2 * close - close.shift(lag)
ZLMA = MA(kind=mamode, SOURCE, length)
```

**示例**：
```python
# 计算零滞后移动平均线
zlma_values = ta.zlma(length=10, mamode="ema")

# ZLMA滞后分析
zlma_lag = (zlma_values - close).abs().mean()
ema_lag = (ta.ema(length=10) - close).abs().mean()

# ZLMA趋势识别
zlma_uptrend = zlma_values > zlma_values.shift()
zlma_downtrend = zlma_values < zlma_values.shift()

# ZLMA交叉信号
zlma_golden_cross = (close > zlma_values) & (close.shift() <= zlma_values.shift())
zlma_death_cross = (close < zlma_values) & (close.shift() >= zlma_values.shift())
```

---

## 5. 收益指标（Performance）

### **`log_return` - 对数收益率**

```python
@tobtind(lines=None, lib='pta')
def log_return(self, length=20, cumulative=False, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算序列的对数收益率，用于衡量资产价格的相对变化，适用于连续复利计算

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认20
  - `cumulative`：是否返回累计收益率，默认False
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，对数收益率序列

**计算公式**：
```
LOGRET = log(close.diff(periods=length))
CUMLOGRET = LOGRET.cumsum() # 如果cumulative=True
```

**示例**：
```python
# 计算日对数收益率
daily_log_return = ta.log_return(length=1)

# 计算累计对数收益率
cumulative_log_return = ta.log_return(length=1, cumulative=True)

# 收益率分析
positive_returns = daily_log_return > 0
negative_returns = daily_log_return < 0

# 收益率波动性
return_volatility = daily_log_return.rolling(20).std()

# 极端收益率
extreme_positive = daily_log_return > daily_log_return.quantile(0.9)
extreme_negative = daily_log_return < daily_log_return.quantile(0.1)
```

---

### **`percent_return` - 百分比收益率**

```python
@tobtind(lines=None, lib='pta')
def percent_return(self, length=20, cumulative=False, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算序列的百分比收益率，衡量资产价格的百分比变化，直观反映投资回报

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认20
  - `cumulative`：是否返回累计收益率，默认False
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，百分比收益率序列

**计算公式**：
```
PCTRET = close.pct_change(length)
CUMPCTRET = PCTRET.cumsum() # 如果cumulative=True
```

**示例**：
```python
# 计算日百分比收益率
daily_pct_return = ta.percent_return(length=1)

# 计算累计百分比收益率
cumulative_pct_return = ta.percent_return(length=1, cumulative=True)

# 收益率统计分析
mean_return = daily_pct_return.rolling(30).mean()
std_return = daily_pct_return.rolling(30).std()

# 收益率阈值分析
high_return = daily_pct_return > 0.02
low_return = daily_pct_return < -0.02

# 多周期收益率比较
weekly_return = ta.percent_return(length=5)
monthly_return = ta.percent_return(length=20)
```

---

## 6. 统计指标（Statistics）

### **`entropy` - 熵值指标**

```python
@tobtind(lines=None, lib='pta')
def entropy(self, length=10, base=2., offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量数据的不可预测性或平均信息量，熵值越高表示价格波动越随机

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `base`：对数基数，默认2
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，熵值序列

**计算公式**：
```
P = close / SUM(close, length)
E = SUM(-P * npLog(P) / npLog(base), length)
```

**示例**：
```python
# 计算价格熵值
entropy_values = ta.entropy(length=10)

# 市场随机性分析
high_entropy = entropy_values > entropy_values.rolling(50).quantile(0.7)
low_entropy = entropy_values < entropy_values.rolling(50).quantile(0.3)

# 熵值与波动率关系
volatility = close.pct_change().rolling(10).std()
entropy_vol_correlation = entropy_values.rolling(20).corr(volatility)

# 不同基数熵值比较
entropy_base2 = ta.entropy(base=2)
entropy_base_e = ta.entropy(base=2.718)
```

---

### **`kurtosis_` - 滚动峰度**

```python
@tobtind(lines=None, lib='pta')
def kurtosis_(self, length=30, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格分布的尖峭程度，高峰度表示极端价格波动更频繁

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，峰度值序列

**计算公式**：
```
KURTOSIS = close.rolling(length).kurt()
```

**示例**：
```python
# 计算价格峰度
kurtosis_values = ta.kurtosis_(length=30)

# 峰度分析
leptokurtic = kurtosis_values > 3  # 尖峰分布
platykurtic = kurtosis_values < 3  # 平峰分布

# 极端波动预警
high_kurtosis = kurtosis_values > kurtosis_values.rolling(100).quantile(0.9)

# 峰度与市场状态
kurtosis_rising = kurtosis_values > kurtosis_values.shift()
```

---

### **`mad` - 滚动平均绝对偏差**

```python
@tobtind(lines=None, lib='pta')
def mad(self, length=30, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格相对于均值的平均偏离程度，对异常值比标准差更稳健

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，平均绝对偏差序列

**计算公式**：
```
mad = close.rolling(length).mad()
```

**示例**：
```python
# 计算平均绝对偏差
mad_values = ta.mad(length=30)

# 价格离散度分析
high_dispersion = mad_values > mad_values.rolling(50).quantile(0.7)
low_dispersion = mad_values < mad_values.rolling(50).quantile(0.3)

# MAD与价格波动
price_range = (high - low).rolling(30).mean()
mad_vs_range = mad_values / price_range

# 离散度变化趋势
dispersion_increasing = mad_values > mad_values.shift()
dispersion_decreasing = mad_values < mad_values.shift()
```

---

### **`median` - 滚动中位数**

```python
@tobtind(lines=None, lib='pta')
def median(self, length=30, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算滚动中位数，对异常值比简单移动平均更稳健

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，中位数值序列

**计算公式**：
```
MEDIAN = close.rolling(length).median()
```

**示例**：
```python
# 计算价格中位数
median_values = ta.median(length=30)

# 中位数趋势分析
median_uptrend = median_values > median_values.shift()
median_downtrend = median_values < median_values.shift()

# 中位数与移动平均比较
sma_values = ta.sma(length=30)
median_vs_sma = median_values - sma_values

# 中位数支撑阻力
above_median = close > median_values
below_median = close < median_values
```

---

### **`quantile_` - 滚动分位数**

```python
@tobtind(lines=None, lib='pta')
def quantile_(self, length=30, q=0.5, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算指定分位数的滚动值，用于识别价格分布的特定位置

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `q`：分位数，默认0.5（中位数）
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，分位数值序列

**计算公式**：
```
QUANTILE = close.rolling(length).quantile(q)
```

**示例**：
```python
# 计算不同分位数
median = ta.quantile_(q=0.5)        # 中位数
quartile_25 = ta.quantile_(q=0.25)  # 下四分位数
quartile_75 = ta.quantile_(q=0.75)  # 上四分位数

# 价格分位数分析
price_in_lower_quartile = close < quartile_25
price_in_upper_quartile = close > quartile_75

# 分位数区间
interquartile_range = quartile_75 - quartile_25

# 极端价格识别
extreme_low = close < ta.quantile_(q=0.05)
extreme_high = close > ta.quantile_(q=0.95)
```

---

### **`skew_` - 滚动偏度**

```python
@tobtind(lines=None, lib='pta')
def skew_(self, length=30, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格分布的不对称性，正偏度表示右偏，负偏度表示左偏

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，偏度值序列

**计算公式**：
```
SKEW = close.rolling(length).skew()
```

**示例**：
```python
# 计算价格偏度
skew_values = ta.skew_(length=30)

# 偏度分析
positive_skew = skew_values > 0    # 右偏分布
negative_skew = skew_values < 0    # 左偏分布

# 偏度极端值
high_positive_skew = skew_values > 1
high_negative_skew = skew_values < -1

# 偏度与市场情绪
skew_increasing = skew_values > skew_values.shift()
skew_decreasing = skew_values < skew_values.shift()
```

---

### **`stdev` - 滚动标准差**

```python
@tobtind(lines=None, lib='pta')
def stdev(self, length=30, ddof=1, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格波动的离散程度，标准差越大表示价格波动越剧烈

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `ddof`：自由度调整，默认1
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，标准差序列

**计算公式**：
```
STDEV = variance(close, length).apply(np.sqrt)
```

**示例**：
```python
# 计算价格标准差
stdev_values = ta.stdev(length=30)

# 波动率分析
high_volatility = stdev_values > stdev_values.rolling(100).quantile(0.7)
low_volatility = stdev_values < stdev_values.rolling(100).quantile(0.3)

# 波动率变化
volatility_rising = stdev_values > stdev_values.shift()
volatility_falling = stdev_values < stdev_values.shift()

# 相对波动率
price_level = close.rolling(30).mean()
relative_volatility = stdev_values / price_level
```

---

### **`tos_stdevall` - TD Ameritrade全标准差**

```python
@tobtind(lines=['toslr', 'tosl1', 'tosu1', 'tosl2', 'tosu2', 'tosl3', 'tosu3'], lib='pta')
def tos_stdevall(self, length=30, stds=[1, 2, 3], ddof=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：TD Ameritrade Think or Swim全标准差指标，基于线性回归和标准差构建多个标准差通道

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `stds`：标准差倍数列表，默认[1,2,3]
  - `ddof`：自由度调整，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含线性回归线和多个标准差通道列

**计算公式**：
```
LR = Linear Regression(close, length)
STDEV = Standard Deviation(close, length, ddof)
for level in stds:
    LOWER = LR - level * STDEV
    UPPER = LR + level * STDEV
```

**示例**：
```python
# 计算全标准差通道
stdevall_data = ta.tos_stdevall(length=30, stds=[1, 2, 3])

# 提取各通道组件
lr_line = stdevall_data.toslr        # 线性回归线
lower_1std = stdevall_data.tosl1     # -1标准差
upper_1std = stdevall_data.tosu1     # +1标准差
lower_2std = stdevall_data.tosl2     # -2标准差
upper_2std = stdevall_data.tosu2     # +2标准差

# 价格通道位置分析
price_in_1std = (close >= lower_1std) & (close <= upper_1std)
price_in_2std = (close >= lower_2std) & (close <= upper_2std)
price_extreme = (close < lower_2std) | (close > upper_2std)

# 通道突破信号
breakout_upper_1std = (close > upper_1std) & (close.shift() <= upper_1std.shift())
breakout_lower_1std = (close < lower_1std) & (close.shift() >= lower_1std.shift())
```

---


### **`variance` - 滚动方差**

```python
@tobtind(lines=None, lib='pta')
def variance(self, length=30, ddof=1, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格波动的离散程度，方差越大表示价格波动越剧烈

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `ddof`：自由度调整，默认1
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，方差值序列

**计算公式**：
```
VARIANCE = close.rolling(length).var()
```

**示例**：
```python
# 计算价格方差
variance_values = ta.variance(length=30)

# 方差分析
high_variance = variance_values > variance_values.rolling(100).quantile(0.7)
low_variance = variance_values < variance_values.rolling(100).quantile(0.3)

# 方差变化趋势
variance_increasing = variance_values > variance_values.shift()
variance_decreasing = variance_values < variance_values.shift()

# 方差与标准差关系
stdev_values = ta.stdev(length=30)
variance_vs_stdev = variance_values - stdev_values**2
```

---

### **`zscore` - 滚动Z分数**

```python
@tobtind(lines=None, lib='pta')
def zscore(self, length=30, std=1., offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格相对于均值的标准化偏离程度，用于识别极端价格水平

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认30
  - `std`：标准差倍数，默认1.0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，Z分数序列

**计算公式**：
```
mean = SMA(close, length)
std = std * STDEV(close, length)
ZSCORE = (close - mean) / std
```

**示例**：
```python
# 计算Z分数
zscore_values = ta.zscore(length=30)

# 极端价格识别
extreme_high = zscore_values > 2    # 超过2个标准差
extreme_low = zscore_values < -2   # 低于2个标准差

# Z分数回归分析
zscore_reversion = (zscore_values > 2) | (zscore_values < -2)

# 不同标准差阈值
zscore_1std = ta.zscore(std=1.0)
zscore_2std = ta.zscore(std=2.0)
```

---

## 7. 趋势指标（Trend）

### **`adx` - 平均定向运动指数**

```python
@tobtind(lines=['adxx', 'dmp', 'dmn'], lib='pta')
def adx(self, length=14, lensig=14, scalar=100, mamode="rma", drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：量化趋势强度，通过测量单一方向的运动量来识别趋势的强弱

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `lensig`：信号长度，默认14
  - `scalar`：放大系数，默认100
  - `mamode`：移动平均类型，默认"rma"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含adxx（ADX线）、dmp（+DI）、dmn（-DI）列

**示例**：
```python
# 计算ADX指标
adx_data = ta.adx(length=14)

# 提取ADX各组件
adx_line = adx_data.adxx
plus_di = adx_data.dmp
minus_di = adx_data.dmn

# 趋势强度分析
strong_trend = adx_line > 25
weak_trend = adx_line < 20

# DI交叉信号
di_bullish = (plus_di > minus_di) & (plus_di.shift() <= minus_di.shift())
di_bearish = (plus_di < minus_di) & (plus_di.shift() >= minus_di.shift())

# ADX极端值
extreme_trend = adx_line > 50
```

---

### **`amat` - Archer移动平均趋势**

```python
@tobtind(lines=['amatl', 'amats'], lib='pta')
def amat(self, fast=8, slow=21, lookback=2, mamode="ema", offset=0, **kwargs) -> IndFrame:
```

**功能**：Archer移动平均趋势指标，通过快速和慢速移动平均线的组合识别趋势方向

**所需数据字段**：`close`

**参数**：

  - `fast`：快线周期，默认8
  - `slow`：慢线周期，默认21
  - `lookback`：回看周期，默认2
  - `mamode`：移动平均类型，默认"ema"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含amatl（长线）、amats（短线）列

**示例**：
```python
# 计算AMAT指标
amat_data = ta.amat(fast=8, slow=21)

# 提取AMAT各组件
amat_long = ta.amatl
amat_short = ta.amats

# AMAT趋势信号
amat_uptrend = amat_long > amat_short
amat_downtrend = amat_long < amat_short

# AMAT交叉信号
amat_golden_cross = (amat_long > amat_short) & (amat_long.shift() <= amat_short.shift())
amat_death_cross = (amat_long < amat_short) & (amat_long.shift() >= amat_short.shift())
```

---

### **`aroon` - Aroon指标**

```python
@tobtind(lines=['aroon_up', 'aroon_down', 'aroon_osc'], lib='pta')
def aroon(self, length=14, scalar=100, talib=True, offset=0, **kwargs) -> IndFrame:
```

**功能**：Aroon指标试图识别证券是否在趋势中以及趋势的强度

**所需数据字段**：`high`, `low`

**参数**：

  - `length`：计算周期，默认14
  - `scalar`：放大系数，默认100
  - `talib`：是否使用TA-Lib实现，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含aroon_up（上线）、aroon_down（下线）、aroon_osc（振荡器）列

**计算公式**：
```
periods_from_hh = high.rolling(length + 1).apply(recent_maximum_index)
AROON_UP = scalar * (1 - (periods_from_hh / length))
periods_from_ll = low.rolling(length + 1).apply(recent_minimum_index)
AROON_DN = scalar * (1 - (periods_from_ll / length))
AROON_OSC = AROON_UP - AROON_DN
```

**示例**：
```python
# 计算Aroon指标
aroon_data = ta.aroon(length=14)

# 提取Aroon各组件
aroon_up = aroon_data.aroon_up
aroon_down = aroon_data.aroon_down
aroon_osc = aroon_data.aroon_osc

# Aroon趋势分析
uptrend_strong = (aroon_up > 70) & (aroon_down < 30)
downtrend_strong = (aroon_up < 30) & (aroon_down > 70)

# Aroon交叉信号
aroon_crossover = (aroon_up > aroon_down) & (aroon_up.shift() <= aroon_down.shift())
aroon_crossunder = (aroon_up < aroon_down) & (aroon_up.shift() >= aroon_down.shift())
```

---

### **`chop` - 波动指数**

```python
@tobtind(lines=None, lib='pta')
def chop(self, length=14, atr_length=1., ln=False, scalar=100, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：波动指数旨在确定市场是否处于震荡（横盘交易）或非震荡（任一方向的趋势交易）

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `atr_length`：ATR长度，默认1
  - `ln`：使用自然对数，默认False
  - `scalar`：放大系数，默认100
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，波动指数序列

**计算公式**：
```
HH = high.rolling(length).max()
LL = low.rolling(length).min()
ATR_SUM = SUM(ATR(drift), length)
CHOP = scalar * (LOG10(ATR_SUM) - LOG10(HH - LL)) / LOG10(length)
```

**示例**：
```python
# 计算波动指数
chop_values = ta.chop(length=14)

# 市场状态分析
choppy_market = chop_values > 61.8
trending_market = chop_values < 38.2

# 波动指数极端值
extreme_choppy = chop_values > 80
extreme_trending = chop_values < 20

# 波动指数变化
chop_rising = chop_values > chop_values.shift()
chop_falling = chop_values < chop_values.shift()
```

---

### **`cksp` - Chande Kroll停止指标**

```python
@tobtind(lines=['cksp_long', 'cksp_short'], lib='pta')
def cksp(self, p=10, x=3, q=20, tvmode=True, offset=0, **kwargs) -> IndFrame:
```

**功能**：趋势跟踪指标，通过计算近期市场波动性的平均真实波幅来识别止损位

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `p`：ATR和第一个止损周期，默认10
  - `x`：ATR乘数，默认3
  - `q`：第二个止损周期，默认20
  - `tvmode`：Trading View或书籍实现模式，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含cksp_long（多头止损）、cksp_short（空头止损）列

**计算公式**：
```
LS0 = high.rolling(p).max() - x * ATR(length=p)
LS = LS0.rolling(q).max()
SS0 = high.rolling(p).min() + x * ATR(length=p)
SS = SS0.rolling(q).min()
```

**示例**：
```python
# 计算Chande Kroll停止指标
cksp_data = ta.cksp(p=10, x=3, q=20)

# 提取止损位
long_stop = cksp_data.cksp_long
short_stop = cksp_data.cksp_short

# 止损突破信号
stop_loss_long = close < long_stop
stop_loss_short = close > short_stop

# 止损位更新
stop_updated_long = long_stop != long_stop.shift()
stop_updated_short = short_stop != short_stop.shift()
```

---

### **`decay` - 衰减指标**

```python
@tobtind(lines=None, lib='pta')
def decay(self, kind="exponential", length=5, mode="linear", offset=0, **kwargs) -> IndSeries:
```

**功能**：从先前的信号（如交叉）向前创建衰减，默认是"线性"，可选指数衰减

**所需数据字段**：`close`

**参数**：

  - `kind`：衰减类型，默认"exponential"
  - `length`：衰减周期，默认5
  - `mode`：衰减模式，默认"linear"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，衰减值序列

**计算公式**：
```
if mode == "exponential" or mode == "exp":
    max(close, close[-1] - exp(-length), 0)
else:
    max(close, close[-1] - (1 / length), 0)
```

**示例**：
```python
# 计算线性衰减
linear_decay = ta.decay(kind="linear", length=5)

# 计算指数衰减
exp_decay = ta.decay(kind="exponential", length=5)

# 衰减信号应用
signal_cross = (close > ta.sma(length=20)) & (close.shift() <= ta.sma(length=20).shift())
decay_signal = signal_cross * close
decay_trailing = decay_signal.replace(0, method='ffill') * exp_decay

# 衰减强度分析
decay_strength = decay_values / close
```

---

### **`decreasing` - 递减指标**

```python
@tobtind(lines=None, lib='pta')
def decreasing(self, length=1, strict=False, asint=True, percent=None, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：如果序列在一个周期内递减则返回True，否则返回False，用于识别下降趋势

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认1
  - `strict`：是否严格连续递减，默认False
  - `asint`：返回二进制结果，默认True
  - `percent`：百分比阈值，默认None
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，递减状态序列

**计算公式**：
```
if strict:
    decreasing = all(i > j for i, j in zip(close[-length:], close[1:]))
else:
    decreasing = close.diff(length) < 0
```

**示例**：
```python
# 计算递减指标
decreasing_values = ta.decreasing(length=5)

# 严格递减检测
strict_decreasing = ta.decreasing(length=5, strict=True)

# 递减趋势分析
decreasing_trend = decreasing_values.rolling(3).sum() == 3

# 递减百分比阈值
decreasing_1pct = ta.decreasing(percent=1.0)

# 趋势转换
trend_turning_down = (decreasing_values == 1) & (decreasing_values.shift() == 0)
```

---

### **`dpo` - 去趋势价格振荡器**

```python
@tobtind(lines=None, lib='pta')
def dpo(self, length=20, centered=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：旨在从价格中去除趋势，使其更容易识别周期

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认20
  - `centered`：是否居中显示，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，DPO值序列

**计算公式**：
```
t = int(0.5 * length) + 1
DPO = close.shift(t) - SMA(close, length)
if centered:
    DPO = DPO.shift(-t)
```

**示例**：
```python
# 计算DPO指标
dpo_values = ta.dpo(length=20)

# DPO周期分析
dpo_above_zero = dpo_values > 0
dpo_below_zero = dpo_values < 0

# DPO极端值
dpo_extreme_high = dpo_values > dpo_values.rolling(50).quantile(0.9)
dpo_extreme_low = dpo_values < dpo_values.rolling(50).quantile(0.1)

# DPO周期转折
dpo_turning_up = (dpo_values > dpo_values.shift()) & (dpo_values.shift() <= dpo_values.shift(2))
dpo_turning_down = (dpo_values < dpo_values.shift()) & (dpo_values.shift() >= dpo_values.shift(2))
```

---

继续为您编写接下来的十个指标参考：

---

### **`increasing` - 递增指标**

```python
@tobtind(lines=None, lib='pta')
def increasing(self, length=1, strict=False, asint=True, percent=None, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：如果序列在一个周期内递增则返回True，否则返回False，用于识别上升趋势

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认1
  - `strict`：是否严格连续递增，默认False
  - `asint`：返回二进制结果，默认True
  - `percent`：百分比阈值，默认None
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，递增状态序列

**计算公式**：
```
if strict:
    increasing = all(i < j for i, j in zip(close[-length:], close[1:]))
else:
    increasing = close.diff(length) > 0

if asint:
    increasing = increasing.astype(int)
```

**示例**：
```python
# 计算递增指标
increasing_values = ta.increasing(length=5)

# 严格递增检测
strict_increasing = ta.increasing(length=5, strict=True)

# 递增趋势分析
increasing_trend = increasing_values.rolling(3).sum() == 3

# 递增百分比阈值
increasing_1pct = ta.increasing(percent=1.0)

# 趋势转换
trend_turning_up = (increasing_values == 1) & (increasing_values.shift() == 0)
```

---

### **`long_run` - 长期运行指标**

```python
@tobtind(lines=None, lib='pta')
def long_run(self, fast=None, slow=None, length=2, offset=0, **kwargs) -> IndSeries:
```

**功能**：识别长期趋势运行状态，用于判断多头市场持续时间

**所需数据字段**：`self`（价格序列）

**参数**：

  - `fast`：快速移动平均周期，默认None
  - `slow`：慢速移动平均周期，默认None
  - `length`：确认周期，默认2
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，长期运行状态序列

**计算公式**：
```
# 基于移动平均交叉的长期趋势确认
long_condition = (fast_ma > slow_ma) & (fast_ma.shift() > slow_ma.shift())
long_run = long_condition.rolling(length).sum() == length
```

**示例**：
```python
# 计算长期运行指标
long_run_status = ta.long_run(fast=10, slow=30, length=3)

# 长期多头确认
confirmed_long = long_run_status == 1

# 长期趋势强度
long_run_strength = long_run_status.rolling(20).sum()

# 长期运行周期计数
long_run_duration = long_run_status.groupby((long_run_status != long_run_status.shift()).cumsum()).cumcount() + 1
```

---

### **`psar` - 抛物线停损点转向指标**

```python
@tobtind(lines=['psarl', 'psars', 'psaraf', 'psarr'], lib='pta')
def psar(self, af0=0.02, af=0.02, max_af=0.2, offset=0, **kwargs) -> IndFrame:
```

**功能**：抛物线停损点转向指标，用于确定趋势方向和潜在的价格反转点

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `af0`：初始加速因子，默认0.02
  - `af`：加速因子，默认0.02
  - `max_af`：最大加速因子，默认0.2
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含psarl（多头SAR）、psars（空头SAR）、psaraf（加速因子）、psarr（反转信号）

**计算公式**：
```
# 经典PSAR计算逻辑
trend = 1  # 初始趋势向上
ep = high[0]  # 极值点
sar = low[0]  # SAR值
af = af0  # 加速因子

for i in range(1, len(close)):
    if trend == 1:
        sar = sar + af * (ep - sar)
        if high[i] > ep:
            ep = high[i]
            af = min(af + af0, max_af)
        if low[i] < sar:
            trend = -1
            sar = ep
            ep = low[i]
            af = af0
    else:
        sar = sar + af * (ep - sar)
        if low[i] < ep:
            ep = low[i]
            af = min(af + af0, max_af)
        if high[i] > sar:
            trend = 1
            sar = ep
            ep = high[i]
            af = af0
```

**示例**：
```python
# 计算PSAR指标
psar_df = ta.psar(af0=0.02, af=0.02, max_af=0.2)

# 多头信号
long_signals = psar_df['psarr'] == 1

# 空头信号
short_signals = psar_df['psarr'] == -1

# PSAR趋势跟踪
psar_trend = np.where(psar_df['psarl'].notna(), 1, 
                     np.where(psar_df['psars'].notna(), -1, 0))

# 加速因子分析
af_values = psar_df['psaraf']
high_af_momentum = af_values > 0.1
```

---

### **`qstick` - Q棒指标**

```python
@tobtind(lines=None, lib='pta')
def qstick(self, length=10, ma="sma", offset=0, **kwargs) -> IndSeries:
```

**功能**：量化烛台图表中的趋势，通过开盘价与收盘价的关系识别买卖压力

**所需数据字段**：`open`, `close`

**参数**：

  - `length`：计算周期，默认10
  - `ma`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，Q棒值序列

**计算公式**：
```
qstick = xMA(close - open, length)
# 其中xMA为指定的移动平均类型
```

**示例**：
```python
# 计算Q棒指标
qstick_values = ta.qstick(length=10, ma="sma")

# 买入压力识别
buying_pressure = qstick_values > 0

# 卖出压力识别
selling_pressure = qstick_values < 0

# Q棒极端值
qstick_extreme_high = qstick_values > qstick_values.rolling(50).quantile(0.8)
qstick_extreme_low = qstick_values < qstick_values.rolling(50).quantile(0.2)

# 趋势确认
qstick_trend_confirmation = (qstick_values > 0) & (qstick_values.shift() > 0)
```

---

### **`short_run` - 短期运行指标**

```python
@tobtind(lines=None, lib='pta')
def short_run(self, fast=None, slow=None, length=None, offset=0, **kwargs) -> IndSeries:
```

**功能**：识别短期趋势运行状态，用于判断空头市场持续时间

**所需数据字段**：`self`（价格序列）

**参数**：

  - `fast`：快速移动平均周期，默认None
  - `slow`：慢速移动平均周期，默认None
  - `length`：确认周期，默认None
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，短期运行状态序列

**计算公式**：
```
# 基于移动平均交叉的短期趋势确认
short_condition = (fast_ma < slow_ma) & (fast_ma.shift() < slow_ma.shift())
short_run = short_condition.rolling(length).sum() == length
```

**示例**：
```python
# 计算短期运行指标
short_run_status = ta.short_run(fast=5, slow=20, length=2)

# 短期空头确认
confirmed_short = short_run_status == 1

# 短期趋势强度
short_run_strength = short_run_status.rolling(10).sum()

# 短期运行周期计数
short_run_duration = short_run_status.groupby((short_run_status != short_run_status.shift()).cumsum()).cumcount() + 1

# 长短运行对比
trend_conflict = (long_run_status == 1) & (short_run_status == 1)
```

---

### **`tsignals` - 趋势信号指标**

```python
@tobtind(lines=['ts_trends', 'ts_trades', 'ts_entries', 'ts_exits'], lib='pta')
def tsignals(self, trend=None, asbool=None, trend_reset=None, trend_offset=0, offset=0, **kwargs) -> IndFrame:
```

**功能**：基于趋势生成交易信号，包括趋势、交易、入场和出场信号

**所需数据字段**：`self`（价格序列）

**参数**：

  - `trend`：趋势序列，默认None
  - `asbool`：是否返回布尔值，默认None
  - `trend_reset`：趋势重置值，默认None
  - `trend_offset`：趋势偏移，默认0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含ts_trends（趋势）、ts_trades（交易）、ts_entries（入场）、ts_exits（出场）

**计算公式**：
```
trades = trends.diff().shift(trade_offset).fillna(0).astype(int)
entries = (trades > 0).astype(int)
exits = (trades < 0).abs().astype(int)
```

**示例**：
```python
# 生成趋势信号
tsignals_df = ta.tsignals(trend=close > ta.sma(close, 50))

# 提取各信号
trends = tsignals_df['ts_trends']
trades = tsignals_df['ts_trades']
entries = tsignals_df['ts_entries']
exits = tsignals_df['ts_exits']

# 交易信号分析
buy_signals = entries == 1
sell_signals = exits == 1

# 趋势持续时间
trend_duration = trends.groupby((trends != trends.shift()).cumsum()).cumcount() + 1

# 交易绩效分析
trade_returns = (close - close.shift()) * trades.shift()
```

---

### **`ttm_trend` - TTM趋势指标**

```python
@tobtind(lines=['ttm_trend',], lib='pta')
def ttm_trend(self, length=6, offset=0, **kwargs) -> IndFrame:
```

**功能**：基于价格与平均价格的比较识别趋势方向，用于判断市场多空状态

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认6
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，ttm_trend趋势序列

**计算公式**：
```
averageprice = (((high[5]+low[5])/2)+((high[4]+low[4])/2)+((high[3]+low[3])/2)+(
    (high[2]+low[2])/2)+((high[1]+low[1])/2)+((high[6]+low[6])/2)) / 6

if close > averageprice:
    ttm_trend = 1  # 上升趋势
else:
    ttm_trend = -1  # 下降趋势
```

**示例**：
```python
# 计算TTM趋势
ttm_df = ta.ttm_trend(length=6)

# 趋势方向判断
uptrend = ttm_df['ttm_trend'] == 1
downtrend = ttm_df['ttm_trend'] == -1

# 趋势转换信号
trend_change = ttm_df['ttm_trend'] != ttm_df['ttm_trend'].shift()

# 趋势确认
confirmed_uptrend = (uptrend == True) & (uptrend.shift() == True)
confirmed_downtrend = (downtrend == True) & (downtrend.shift() == True)

# 趋势强度分析
trend_strength = ttm_df['ttm_trend'].rolling(10).sum()
```

---

### **`vhf` - 垂直水平过滤器**

```python
@tobtind(lines=None, lib='pta')
def vhf(self, length=28, drift=None, offset=0, **kwargs) -> IndSeries:
```

**功能**：识别趋势市场和区间震荡市场，帮助判断市场状态

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认28
  - `drift`：差分周期，默认None
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndSeries，VHF值序列

**计算公式**：
```
HCP = Highest Close Price in Period
LCP = Lowest Close Price in Period
Change = abs(Ct - Ct-1)
VHF = (HCP - LCP) / RollingSum[length] of Change
```

**示例**：
```python
# 计算VHF指标
vhf_values = ta.vhf(length=28)

# 市场状态判断
trending_market = vhf_values > 0.4
ranging_market = vhf_values < 0.2

# VHF极端值
vhf_extreme_high = vhf_values > vhf_values.rolling(100).quantile(0.9)
vhf_extreme_low = vhf_values < vhf_values.rolling(100).quantile(0.1)

# 市场状态转换
market_trending = (trending_market == True) & (trending_market.shift() == False)
market_ranging = (ranging_market == True) & (ranging_market.shift() == False)

# VHF趋势分析
vhf_rising = vhf_values > vhf_values.shift()
vhf_falling = vhf_values < vhf_values.shift()
```

---

### **`vortex` - 涡旋指标**

```python
@tobtind(lines=['vip', 'vim'], lib='pta')
def vortex(self, length=14, drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：捕捉正向和负向趋势运动的两个振荡器，用于识别趋势方向和强度

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含vip（正向趋势）、vim（负向趋势）

**计算公式**：
```
TR = True Range
SMA = Simple Moving Average
tr = TR(high, low, close)
tr_sum = tr.rolling(length).sum()
vmp = (high - low.shift(drift)).abs()
vmn = (low - high.shift(drift)).abs()
VIP = vmp.rolling(length).sum() / tr_sum
VIM = vmn.rolling(length).sum() / tr_sum
```

**示例**：
```python
# 计算涡旋指标
vortex_df = ta.vortex(length=14)

# 提取正向和负向趋势
vip = vortex_df['vip']
vim = vortex_df['vim']

# 趋势方向判断
bullish_trend = vip > vim
bearish_trend = vip < vim

# 趋势强度分析
trend_strength = vip - vim
strong_bullish = (vip > vim) & (trend_strength > trend_strength.rolling(20).mean())
strong_bearish = (vip < vim) & (trend_strength < trend_strength.rolling(20).mean())

# 趋势转换信号
trend_reversal = (bullish_trend == True) & (bullish_trend.shift() == False)
```

---

### **`xsignals` - 交叉信号指标**

```python
@tobtind(lines=['xs_long', 'xs_short'], lib='pta')
def xsignals(self, signal=None, xa=None, xb=None, above=None, long=None, asbool=None, trend_reset=None,
             trend_offset=0, offset=0, **kwargs) -> IndFrame:
```

**功能**：基于信号交叉生成交易信号，适用于RSI、ZSCORE等指标的交叉分析

**所需数据字段**：`self`（价格序列）

**参数**：

  - `signal`：信号序列，默认None
  - `xa`：第一个交叉阈值，默认None
  - `xb`：第二个交叉阈值，默认None
  - `above`：是否向上交叉，默认None
  - `long`：是否多头趋势，默认None
  - `asbool`：是否返回布尔值，默认None
  - `trend_reset`：趋势重置值，默认None
  - `trend_offset`：趋势偏移，默认0
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数，如fillna（填充缺失值）

**返回值**：IndFrame，包含xs_long（多头信号）、xs_short（空头信号）

**计算公式**：
```
# 基于交叉逻辑生成趋势信号
if above:
    trend = (signal > xa) & (signal.shift() <= xa)
else:
    trend = (signal < xa) & (signal.shift() >= xa)

# 应用tsignals逻辑生成交易信号
```

**示例**：
```python
# 计算RSI交叉信号
rsi = ta.rsi(close, length=14)
xsignals_df = ta.xsignals(signal=rsi, xa=30, xb=70, above=True)

# 提取多头和空头信号
long_signals = xsignals_df['xs_long']
short_signals = xsignals_df['xs_short']

# 信号确认
confirmed_long = (long_signals == 1) & (long_signals.shift() == 0)
confirmed_short = (short_signals == 1) & (short_signals.shift() == 0)

# 交叉信号绩效分析
long_returns = (close - close.shift()) * long_signals.shift()
short_returns = (close.shift() - close) * short_signals.shift()

# 信号过滤
filtered_long = long_signals & (rsi < 80)  # 避免超买区买入
filtered_short = short_signals & (rsi > 20)  # 避免超卖区卖出
```

---

继续为您编写接下来的十个指标参考：

---

### **`above` - 上方比较指标**

```python
@tobtind(lib='pta')
def above(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否大于或等于序列b或数值，用于生成布尔信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：比较对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，比较结果序列

**计算公式**：
```
result = self >= b
if asint:
    result = result.astype(int)
```

**示例**：
```python
# 价格是否在均线之上
above_ma = ta.above(ta.sma(close, 20))

# 价格是否在固定数值之上
above_100 = ta.above(100)

# 指标交叉确认
rsi_above_50 = ta.above(ta.rsi(close, 14), 50)

# 多条件组合
strong_uptrend = above_ma & (close > close.shift()) & (volume > volume.rolling(20).mean())
```

---

### **`below` - 下方比较指标**

```python
@tobtind(lib='pta')
def below(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否小于或等于序列b或数值，用于生成布尔信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：比较对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，比较结果序列

**计算公式**：
```
result = self <= b
if asint:
    result = result.astype(int)
```

**示例**：
```python
# 价格是否在均线之下
below_ma = ta.below(ta.sma(close, 20))

# 价格是否在固定数值之下
below_100 = ta.below(100)

# 指标超卖确认
rsi_below_30 = ta.below(ta.rsi(close, 14), 30)

# 多条件组合
strong_downtrend = below_ma & (close < close.shift()) & (volume > volume.rolling(20).mean())
```

---

### **`cross` - 交叉指标**

```python
@tobtind(lib='pta')
def cross(self, b=None, above=True, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否上穿或下穿序列b或数值，用于识别趋势转换点

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：交叉对象，可以是序列或数值，默认None
  - `above`：是否上穿，默认True
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，交叉信号序列

**计算公式**：
```
if above:
    # 上穿：当前a>=b且前一刻a<b
    cross_signal = (self >= b) & (self.shift() < b.shift())
else:
    # 下穿：当前a<=b且前一刻a>b
    cross_signal = (self <= b) & (self.shift() > b.shift())

if asint:
    cross_signal = cross_signal.astype(int)
```

**示例**：
```python
# 价格上穿均线
cross_above_ma = close.cross(close.sma(20), above=True)

# 价格下穿均线
cross_below_ma = close.cross(close.sma(20), above=False)

# RSI上穿超卖线
rsi=close.rsi(14)
rsi_cross_above_30 = rsi.cross(30, above=True)

# 交叉信号过滤
filtered_cross = cross_above_ma & (volume > volume.rolling(10).mean())
```

---

### **`cross_up` - 上穿指标**

```python
@tobtind(lib='pta')
def cross_up(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否上穿序列b或数值，专门用于识别向上突破信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：上穿对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，上穿信号序列

**计算公式**：
```
# 上穿：当前a>=b且前一刻a<b
cross_up_signal = (self >= b) & (self.shift() < b.shift())

if asint:
    cross_up_signal = cross_up_signal.astype(int)
```

**示例**：
```python
# 价格上穿移动平均线
price_cross_up_ma = close.cross_up(close.sma(20))

# 快线上穿慢线
fast_ma = close.sma(10)
slow_ma = close.sma(30)
ma_cross_up = fast_ma.cross_up(slow_ma)

# 上穿固定阻力位
resistance_level = 100
cross_resistance = close.cross_up(resistance_level)

# 上穿确认
confirmed_cross = cross_up_signal & (volume > volume.rolling(5).mean())
```

---

### **`cross_down` - 下穿指标**

```python
@tobtind(lib='pta')
def cross_down(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否下穿序列b或数值，专门用于识别向下跌破信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：下穿对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，下穿信号序列

**计算公式**：
```
# 下穿：当前a<=b且前一刻a>b
cross_down_signal = (self <= b) & (self.shift() > b.shift())

if asint:
    cross_down_signal = cross_down_signal.astype(int)
```

**示例**：
```python
# 价格下穿移动平均线
price_cross_down_ma = close.cross_down(close.sma(20))

# 快线下穿慢线
fast_ma = ta.sma(close, 10)
slow_ma = ta.sma(close, 30)
ma_cross_down = fast_ma.cross_down(slow_ma)

# 下穿固定支撑位
support_level = 50
cross_support = close.cross_down(support_level)

# 下穿确认
confirmed_cross = cross_down_signal & (volume > volume.rolling(5).mean())

# 止损信号
stop_loss_signal = cross_down_signal & (close < entry_price * 0.95)
```

---

## 8. 波动率指标（Volatility）

### **`aberration` - 偏离指标**

```python
@tobtind(lines=['aber_zg', 'aber_sg', 'aber_xg', 'aber_atr'], lib='pta')
def aberration(self, length=5, atr_length=15, offset=0, **kwargs) -> IndFrame:
```

**功能**：类似Keltner通道的波动率指标，用于识别价格异常波动和潜在反转点

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认5
  - `atr_length`：ATR周期，默认15
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含aber_zg（中轨）、aber_sg（上轨）、aber_xg（下轨）、aber_atr（ATR值）

**计算公式**：
```
ATR = ATR(length=atr_length)
JG = TP = HLC3(high, low, close)
ZG = SMA(JG, length)
SG = ZG + ATR
XG = ZG - ATR
```

**示例**：
```python
# 计算偏离指标
aber_df = ta.aberration(length=5, atr_length=15)

# 提取各轨道线
zg = aber_df['aber_zg']  # 中轨
sg = aber_df['aber_sg']  # 上轨
xg = aber_df['aber_xg']  # 下轨
atr_val = aber_df['aber_atr']  # ATR值

# 突破信号
breakout_upper = close > sg
breakout_lower = close < xg

# 通道内交易
within_channel = (close <= sg) & (close >= xg)

# 波动率分析
high_volatility = atr_val > atr_val.rolling(20).mean()
low_volatility = atr_val < atr_val.rolling(20).mean()

# 均值回归信号
mean_reversion_short = (close > sg) & (close.shift() <= sg.shift())
mean_reversion_long = (close < xg) & (close.shift() >= xg.shift())
```

---

### **`accbands` - 加速带指标**

```python
@tobtind(lines=['acc_lower', 'acc_mid', 'acc_upper'], lib='pta')
def accbands(self, length=10, c=4, drift=1, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：基于价格高低范围构建的加速带，用于识别趋势加速和支撑阻力位

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认10
  - `c`：乘数，默认4
  - `drift`：差分周期，默认1
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含acc_lower（下轨）、acc_mid（中轨）、acc_upper（上轨）

**计算公式**：
```
HL_RATIO = c * (high - low) / (high + low)
LOW = low * (1 - HL_RATIO)
HIGH = high * (1 + HL_RATIO)

if mamode == 'ema':
    LOWER = EMA(LOW, length)
    MID = EMA(close, length)
    UPPER = EMA(HIGH, length)
else:
    LOWER = SMA(LOW, length)
    MID = SMA(close, length)
    UPPER = SMA(HIGH, length)
```

**示例**：
```python
# 计算加速带
accbands_df = ta.accbands(length=10, c=4, mamode="sma")

# 提取轨道线
lower_band = accbands_df['acc_lower']
middle_band = accbands_df['acc_mid']
upper_band = accbands_df['acc_upper']

# 趋势判断
uptrend = close > middle_band
downtrend = close < middle_band

# 突破交易信号
buy_signal = (close > upper_band) & (close.shift() <= upper_band.shift())
sell_signal = (close < lower_band) & (close.shift() >= lower_band.shift())

# 通道宽度分析
band_width = (upper_band - lower_band) / middle_band
expanding_bands = band_width > band_width.shift()
contracting_bands = band_width < band_width.shift()

# 支撑阻力测试
support_test = (close <= lower_band) & (close.shift() > lower_band.shift())
resistance_test = (close >= upper_band) & (close.shift() < upper_band.shift())
```

---

### **`atr` - 平均真实波幅指标**

```python
@tobtind(lines=None, lib='pta')
def atr(self, length=14, mamode="rma", talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格波动率，特别关注由跳空或涨跌停造成的波动

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `mamode`：移动平均类型，默认"rma"
  - `talib`：是否使用TA-Lib版本，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，ATR值序列

**计算公式**：
```
TR = True Range
tr = TR(high, low, close, drift)

if mamode == 'ema':
    ATR = EMA(tr, length)
elif mamode == 'sma':
    ATR = SMA(tr, length)
elif mamode == 'wma':
    ATR = WMA(tr, length)
else:
    ATR = RMA(tr, length)
```

**示例**：
```python
# 计算ATR
atr_values = ta.atr(length=14, mamode="rma")

# 波动率分析
high_volatility = atr_values > atr_values.rolling(50).quantile(0.7)
low_volatility = atr_values < atr_values.rolling(50).quantile(0.3)

# ATR百分比（相对波动率）
atr_percent = atr_values / close

# 止损设置（基于ATR）
atr_stop_long = close - 2 * atr_values
atr_stop_short = close + 2 * atr_values

# 波动率突破
volatility_breakout = (high - low) > 2 * atr_values

# ATR趋势
atr_rising = atr_values > atr_values.shift()
atr_falling = atr_values < atr_values.shift()
```

---

### **`bbands` - 布林带指标**

```python
@tobtind(lines=['bb_lower', 'bb_mid', 'bb_upper', 'bb_width', 'bb_percent'], overlap=True, lib='pta')
def bbands(self, length=10, std=2., ddof=0, mamode="sma", talib=True, offset=0, **kwargs) -> IndFrame:
```

**功能**：约翰·布林格开发的经典波动率指标，用于识别价格相对位置和波动状态

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `std`：标准差倍数，默认2.0
  - `ddof`：自由度调整，默认0
  - `mamode`：移动平均类型，默认"sma"
  - `talib`：是否使用TA-Lib版本，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含bb_lower（下轨）、bb_mid（中轨）、bb_upper（上轨）、bb_width（带宽）、bb_percent（百分比位置）

**计算公式**：
```
stdev = STDEV(close, length, ddof)

if mamode == "ema":
    MID = EMA(close, length)
else:
    MID = SMA(close, length)

LOWER = MID - std * stdev
UPPER = MID + std * stdev
BANDWIDTH = 100 * (UPPER - LOWER) / MID
PERCENT = (close - LOWER) / (UPPER - LOWER)
```

**示例**：
```python
# 计算布林带
bb_df = ta.bbands(length=20, std=2, mamode="sma")

# 提取各组件
lower_band = bb_df['bb_lower']
middle_band = bb_df['bb_mid']
upper_band = bb_df['bb_upper']
bandwidth = bb_df['bb_width']
percent_b = bb_df['bb_percent']

# 超买超卖判断
overbought = percent_b > 0.8
oversold = percent_b < 0.2

# 带宽分析（波动率）
high_volatility = bandwidth > bandwidth.rolling(50).quantile(0.7)
low_volatility = bandwidth < bandwidth.rolling(50).quantile(0.3)

# 布林带挤压
squeeze = bandwidth < bandwidth.rolling(20).mean()

# 趋势交易信号
bb_uptrend = (close > middle_band) & (close.shift() <= middle_band.shift())
bb_downtrend = (close < middle_band) & (close.shift() >= middle_band.shift())

# 反转交易信号
reversal_long = (close < lower_band) & (close.shift() >= lower_band.shift())
reversal_short = (close > upper_band) & (close.shift() <= upper_band.shift())
```

---

### **`donchian` - 唐奇安通道指标**

```python
@tobtind(lines=['dc_lower', 'dc_mid', 'dc_upper'], lib='pta')
def donchian(self, lower_length=20, upper_length=20, offset=0, **kwargs) -> IndFrame:
```

**功能**：基于周期内最高价和最低价构建的通道指标，用于识别支撑阻力位和突破信号

**所需数据字段**：`high`, `low`

**参数**：

  - `lower_length`：下轨计算周期，默认20
  - `upper_length`：上轨计算周期，默认20
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含dc_lower（下轨）、dc_mid（中轨）、dc_upper（上轨）

**计算公式**：
```
LOWER = low.rolling(lower_length).min()
UPPER = high.rolling(upper_length).max()
MID = 0.5 * (LOWER + UPPER)
```

**示例**：
```python
# 计算唐奇安通道
donchian_df = ta.donchian(lower_length=20, upper_length=20)

# 提取轨道线
dc_lower = donchian_df['dc_lower']
dc_mid = donchian_df['dc_mid']
dc_upper = donchian_df['dc_upper']

# 突破交易系统（海龟交易法则）
breakout_long = close > dc_upper
breakout_short = close < dc_lower

# 通道位置分析
in_upper_half = close > dc_mid
in_lower_half = close < dc_mid

# 通道宽度
channel_width = dc_upper - dc_lower
expanding_channel = channel_width > channel_width.shift()
contracting_channel = channel_width < channel_width.shift()

# 支撑阻力测试
support_hold = (low <= dc_lower) & (close > dc_lower)
resistance_hold = (high >= dc_upper) & (close < dc_upper)

# 唐奇安周期分析
donchian_period_high = high.rolling(20).max()
donchian_period_low = low.rolling(20).min()
range_breakout = (high > donchian_period_high.shift()) | (low < donchian_period_low.shift())
```

---

继续为您编写接下来的十个指标参考：

---

### **`above` - 上方比较指标**

```python
@tobtind(lib='pta')
def above(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否大于或等于序列b或数值，用于生成布尔信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：比较对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，比较结果序列

**计算公式**：
```
result = self >= b
if asint:
    result = result.astype(int)
```

**示例**：
```python
# 价格是否在均线之上
above_ma = ta.above(ta.sma(close, 20))

# 价格是否在固定数值之上
above_100 = ta.above(100)

# 指标交叉确认
rsi_above_50 = ta.above(ta.rsi(close, 14), 50)

# 多条件组合
strong_uptrend = above_ma & (close > close.shift()) & (volume > volume.rolling(20).mean())
```

---

### **`below` - 下方比较指标**

```python
@tobtind(lib='pta')
def below(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否小于或等于序列b或数值，用于生成布尔信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：比较对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，比较结果序列

**计算公式**：
```
result = self <= b
if asint:
    result = result.astype(int)
```

**示例**：
```python
# 价格是否在均线之下
below_ma = ta.below(ta.sma(close, 20))

# 价格是否在固定数值之下
below_100 = ta.below(100)

# 指标超卖确认
rsi_below_30 = ta.below(ta.rsi(close, 14), 30)

# 多条件组合
strong_downtrend = below_ma & (close < close.shift()) & (volume > volume.rolling(20).mean())
```

---

### **`cross` - 交叉指标**

```python
@tobtind(lib='pta')
def cross(self, b=None, above=True, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否上穿或下穿序列b或数值，用于识别趋势转换点

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：交叉对象，可以是序列或数值，默认None
  - `above`：是否上穿，默认True
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，交叉信号序列

**计算公式**：
```
if above:
    # 上穿：当前a>=b且前一刻a<b
    cross_signal = (self >= b) & (self.shift() < b.shift())
else:
    # 下穿：当前a<=b且前一刻a>b
    cross_signal = (self <= b) & (self.shift() > b.shift())

if asint:
    cross_signal = cross_signal.astype(int)
```

**示例**：
```python
close_ma = close.sma(20)
# 价格上穿均线
cross_above_ma = close.cross(close_ma, above=True)

# 价格下穿均线
cross_below_ma = close.cross(close_ma, above=False)

# RSI上穿超卖线
rsi=close.rsi(14)
rsi_cross_above_30 = rsi.cross(30, above=True)

# 交叉信号过滤
filtered_cross = cross_above_ma & (volume > volume.rolling(10).mean())
```

---

### **`cross_up` - 上穿指标**

```python
@tobtind(lib='pta')
def cross_up(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否上穿序列b或数值，专门用于识别向上突破信号

**所需数据字段**：`self`（序列a）

**参数**：

  - `b`：上穿对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，上穿信号序列

**计算公式**：
```
# 上穿：当前a>=b且前一刻a<b
cross_up_signal = (self >= b) & (self.shift() < b.shift())

if asint:
    cross_up_signal = cross_up_signal.astype(int)
```

**示例**：
```python
# 价格上穿移动平均线
price_cross_up_ma = close.cross_up(close.sma(20))

# 快线上穿慢线
fast_ma = close.sma(10)
slow_ma = close.sma(30)
ma_cross_up = fast_ma.cross_up(slow_ma)

# 上穿固定阻力位
resistance_level = 100
cross_resistance = close.cross_up(resistance_level)

# 上穿确认
confirmed_cross = cross_up_signal & (volume > volume.rolling(5).mean())
```

---

### **`cross_down` - 下穿指标**

```python
@tobtind(lib='pta')
def cross_down(self, b=None, asint=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：判断序列a是否下穿序列b或数值，专门用于识别向下跌破信号

**所需数据字段**：`self`（序列a）

**参数**

  - `b`：下穿对象，可以是序列或数值，默认None
  - `asint`：是否转为整数，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，下穿信号序列

**计算公式**：
```
# 下穿：当前a<=b且前一刻a>b
cross_down_signal = (self <= b) & (self.shift() > b.shift())

if asint:
    cross_down_signal = cross_down_signal.astype(int)
```

**示例**：
```python
# 价格下穿移动平均线
price_cross_down_ma = close.cross_down(close.sma(20))

# 快线下穿慢线
fast_ma = close.sma(10)
slow_ma = close.sma(30)
ma_cross_down = fast_ma.cross_down(slow_ma)

# 下穿固定支撑位
support_level = 50
cross_support = close.cross_down(support_level)

# 下穿确认
confirmed_cross = cross_down_signal & (volume > volume.rolling(5).mean())

# 止损信号
stop_loss_signal = cross_down_signal & (close < entry_price * 0.95)
```

---

### **`aberration` - 偏离指标**

```python
@tobtind(lines=['aber_zg', 'aber_sg', 'aber_xg', 'aber_atr'], lib='pta')
def aberration(self, length=5, atr_length=15, offset=0, **kwargs) -> IndFrame:
```

**功能**：类似Keltner通道的波动率指标，用于识别价格异常波动和潜在反转点

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认5
  - `atr_length`：ATR周期，默认15
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含aber_zg（中轨）、aber_sg（上轨）、aber_xg（下轨）、aber_atr（ATR值）

**计算公式**：
```
ATR = ATR(length=atr_length)
JG = TP = HLC3(high, low, close)
ZG = SMA(JG, length)
SG = ZG + ATR
XG = ZG - ATR
```

**示例**：
```python
# 计算偏离指标
aber_df = ta.aberration(length=5, atr_length=15)

# 提取各轨道线
zg = aber_df['aber_zg']  # 中轨
sg = aber_df['aber_sg']  # 上轨
xg = aber_df['aber_xg']  # 下轨
atr_val = aber_df['aber_atr']  # ATR值

# 突破信号
breakout_upper = close > sg
breakout_lower = close < xg

# 通道内交易
within_channel = (close <= sg) & (close >= xg)

# 波动率分析
high_volatility = atr_val > atr_val.rolling(20).mean()
low_volatility = atr_val < atr_val.rolling(20).mean()

# 均值回归信号
mean_reversion_short = (close > sg) & (close.shift() <= sg.shift())
mean_reversion_long = (close < xg) & (close.shift() >= xg.shift())
```

---

### **`accbands` - 加速带指标**

```python
@tobtind(lines=['acc_lower', 'acc_mid', 'acc_upper'], lib='pta')
def accbands(self, length=10, c=4, drift=1, mamode="sma", offset=0, **kwargs) -> IndFrame:
```

**功能**：基于价格高低范围构建的加速带，用于识别趋势加速和支撑阻力位

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认10
  - `c`：乘数，默认4
  - `drift`：差分周期，默认1
  - `mamode`：移动平均类型，默认"sma"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含acc_lower（下轨）、acc_mid（中轨）、acc_upper（上轨）

**计算公式**：
```
HL_RATIO = c * (high - low) / (high + low)
LOW = low * (1 - HL_RATIO)
HIGH = high * (1 + HL_RATIO)

if mamode == 'ema':
    LOWER = EMA(LOW, length)
    MID = EMA(close, length)
    UPPER = EMA(HIGH, length)
else:
    LOWER = SMA(LOW, length)
    MID = SMA(close, length)
    UPPER = SMA(HIGH, length)
```

**示例**：
```python
# 计算加速带
accbands_df = ta.accbands(length=10, c=4, mamode="sma")

# 提取轨道线
lower_band = accbands_df['acc_lower']
middle_band = accbands_df['acc_mid']
upper_band = accbands_df['acc_upper']

# 趋势判断
uptrend = close > middle_band
downtrend = close < middle_band

# 突破交易信号
buy_signal = (close > upper_band) & (close.shift() <= upper_band.shift())
sell_signal = (close < lower_band) & (close.shift() >= lower_band.shift())

# 通道宽度分析
band_width = (upper_band - lower_band) / middle_band
expanding_bands = band_width > band_width.shift()
contracting_bands = band_width < band_width.shift()

# 支撑阻力测试
support_test = (close <= lower_band) & (close.shift() > lower_band.shift())
resistance_test = (close >= upper_band) & (close.shift() < upper_band.shift())
```

---

### **`atr` - 平均真实波幅指标**

```python
@tobtind(lines=None, lib='pta')
def atr(self, length=14, mamode="rma", talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格波动率，特别关注由跳空或涨跌停造成的波动

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `mamode`：移动平均类型，默认"rma"
  - `talib`：是否使用TA-Lib版本，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，ATR值序列

**计算公式**：
```
TR = True Range
tr = TR(high, low, close, drift)

if mamode == 'ema':
    ATR = EMA(tr, length)
elif mamode == 'sma':
    ATR = SMA(tr, length)
elif mamode == 'wma':
    ATR = WMA(tr, length)
else:
    ATR = RMA(tr, length)
```

**示例**：
```python
# 计算ATR
atr_values = ta.atr(length=14, mamode="rma")

# 波动率分析
high_volatility = atr_values > atr_values.rolling(50).quantile(0.7)
low_volatility = atr_values < atr_values.rolling(50).quantile(0.3)

# ATR百分比（相对波动率）
atr_percent = atr_values / close

# 止损设置（基于ATR）
atr_stop_long = close - 2 * atr_values
atr_stop_short = close + 2 * atr_values

# 波动率突破
volatility_breakout = (high - low) > 2 * atr_values

# ATR趋势
atr_rising = atr_values > atr_values.shift()
atr_falling = atr_values < atr_values.shift()
```

---

### **`bbands` - 布林带指标**

```python
@tobtind(lines=['bb_lower', 'bb_mid', 'bb_upper', 'bb_width', 'bb_percent'], overlap=True, lib='pta')
def bbands(self, length=10, std=2., ddof=0, mamode="sma", talib=True, offset=0, **kwargs) -> IndFrame:
```

**功能**：约翰·布林格开发的经典波动率指标，用于识别价格相对位置和波动状态

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认10
  - `std`：标准差倍数，默认2.0
  - `ddof`：自由度调整，默认0
  - `mamode`：移动平均类型，默认"sma"
  - `talib`：是否使用TA-Lib版本，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含bb_lower（下轨）、bb_mid（中轨）、bb_upper（上轨）、bb_width（带宽）、bb_percent（百分比位置）

**计算公式**：
```
stdev = STDEV(close, length, ddof)

if mamode == "ema":
    MID = EMA(close, length)
else:
    MID = SMA(close, length)

LOWER = MID - std * stdev
UPPER = MID + std * stdev
BANDWIDTH = 100 * (UPPER - LOWER) / MID
PERCENT = (close - LOWER) / (UPPER - LOWER)
```

**示例**：
```python
# 计算布林带
bb_df = ta.bbands(length=20, std=2, mamode="sma")

# 提取各组件
lower_band = bb_df['bb_lower']
middle_band = bb_df['bb_mid']
upper_band = bb_df['bb_upper']
bandwidth = bb_df['bb_width']
percent_b = bb_df['bb_percent']

# 超买超卖判断
overbought = percent_b > 0.8
oversold = percent_b < 0.2

# 带宽分析（波动率）
high_volatility = bandwidth > bandwidth.rolling(50).quantile(0.7)
low_volatility = bandwidth < bandwidth.rolling(50).quantile(0.3)

# 布林带挤压
squeeze = bandwidth < bandwidth.rolling(20).mean()

# 趋势交易信号
bb_uptrend = (close > middle_band) & (close.shift() <= middle_band.shift())
bb_downtrend = (close < middle_band) & (close.shift() >= middle_band.shift())

# 反转交易信号
reversal_long = (close < lower_band) & (close.shift() >= lower_band.shift())
reversal_short = (close > upper_band) & (close.shift() <= upper_band.shift())
```

---

### **`donchian` - 唐奇安通道指标**

```python
@tobtind(lines=['dc_lower', 'dc_mid', 'dc_upper'], lib='pta')
def donchian(self, lower_length=20, upper_length=20, offset=0, **kwargs) -> IndFrame:
```

**功能**：基于周期内最高价和最低价构建的通道指标，用于识别支撑阻力位和突破信号

**所需数据字段**：`high`, `low`

**参数**：

  - `lower_length`：下轨计算周期，默认20
  - `upper_length`：上轨计算周期，默认20
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含dc_lower（下轨）、dc_mid（中轨）、dc_upper（上轨）

**计算公式**：
```
LOWER = low.rolling(lower_length).min()
UPPER = high.rolling(upper_length).max()
MID = 0.5 * (LOWER + UPPER)
```

**示例**：
```python
# 计算唐奇安通道
donchian_df = ta.donchian(lower_length=20, upper_length=20)

# 提取轨道线
dc_lower = donchian_df['dc_lower']
dc_mid = donchian_df['dc_mid']
dc_upper = donchian_df['dc_upper']

# 突破交易系统（海龟交易法则）
breakout_long = close > dc_upper
breakout_short = close < dc_lower

# 通道位置分析
in_upper_half = close > dc_mid
in_lower_half = close < dc_mid

# 通道宽度
channel_width = dc_upper - dc_lower
expanding_channel = channel_width > channel_width.shift()
contracting_channel = channel_width < channel_width.shift()

# 支撑阻力测试
support_hold = (low <= dc_lower) & (close > dc_lower)
resistance_hold = (high >= dc_upper) & (close < dc_upper)

# 唐奇安周期分析
donchian_period_high = high.rolling(20).max()
donchian_period_low = low.rolling(20).min()
range_breakout = (high > donchian_period_high.shift()) | (low < donchian_period_low.shift())
```

---

### **`hwc` - Holt-Winter通道指标**

```python
@tobtind(lines=['hwc', 'hwc_upper', 'hwc_lower'], lib='pta')
def hwc(self, na=0.2, nb=0.1, nc=0.1, nd=0.1, scalar=1., channel_eval=False, offset=0, **kwargs) -> IndFrame:
```

**功能**：基于Holt-Winters三参数移动平均的通道指标，结合趋势和季节性分析

**所需数据字段**：`close`

**参数**：

  - `na`：平滑序列参数（0-1），默认0.2
  - `nb`：趋势评估参数（0-1），默认0.1
  - `nc`：季节性评估参数（0-1），默认0.1
  - `nd`：通道方程参数（0-1），默认0.1
  - `scalar`：通道宽度乘数，默认1.0
  - `channel_eval`：是否返回宽度和百分比位置，默认False
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含hwc（中轨）、hwc_upper（上轨）、hwc_lower（下轨），当channel_eval为True时还包含hwc_width（宽度）、hwc_pctwidth（百分比宽度）

**计算公式**：
```
HWMA[i] = F[i] + V[i] + 0.5 * A[i]
其中：
F[i] = (1-na) * (F[i-1] + V[i-1] + 0.5 * A[i-1]) + na * Price[i]
V[i] = (1-nb) * (V[i-1] + A[i-1]) + nb * (F[i] - F[i-1])
A[i] = (1-nc) * A[i-1] + nc * (V[i] - V[i-1])

上轨 = HWMA + 乘数 * 标准差
下轨 = HWMA - 乘数 * 标准差
```

**示例**：
```python
# 计算HWC指标
hwc_df = ta.hwc(na=0.2, nb=0.1, nc=0.1, nd=0.1, scalar=1.0)

# 提取通道线
hwc_mid = hwc_df['hwc']        # 中轨
hwc_upper = hwc_df['hwc_upper'] # 上轨
hwc_lower = hwc_df['hwc_lower'] # 下轨

# 趋势判断
hwc_uptrend = close > hwc_mid
hwc_downtrend = close < hwc_mid

# 通道突破信号
breakout_up = (close > hwc_upper) & (close.shift() <= hwc_upper.shift())
breakout_down = (close < hwc_lower) & (close.shift() >= hwc_lower.shift())

# 均值回归信号
mean_reversion_buy = (close < hwc_lower) & (close.shift() >= hwc_lower.shift())
mean_reversion_sell = (close > hwc_upper) & (close.shift() <= hwc_upper.shift())

# 通道评估模式
hwc_eval_df = ta.hwc(channel_eval=True)
channel_width = hwc_eval_df['hwc_width']
width_percent = hwc_eval_df['hwc_pctwidth']
```

---

### **`kc` - 肯特纳通道指标**

```python
@tobtind(lines=['kc_lower', 'kc_basis', 'kc_upper'], lib='pta')
def kc(self, length=20, scalar=2., mamode="ema", offset=0, **kwargs) -> IndFrame:
```

**功能**：基于平均真实波幅的波动率通道指标，用于识别趋势和超买超卖区域

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认20
  - `scalar`：通道宽度乘数，默认2.0
  - `mamode`：移动平均类型，默认"ema"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含kc_lower（下轨）、kc_basis（中轨）、kc_upper（上轨）

**计算公式**：
```
if tr:
    RANGE = TR(high, low, close)
else:
    RANGE = high - low

if mamode == "ema":
    BASIS = ema(close, length)
    BAND = ema(RANGE, length)
else:
    BASIS = sma(close, length)
    BAND = sma(RANGE, length)

LOWER = BASIS - scalar * BAND
UPPER = BASIS + scalar * BAND
```

**示例**：
```python
# 计算肯特纳通道
kc_df = ta.kc(length=20, scalar=2, mamode="ema")

# 提取通道线
kc_lower = kc_df['kc_lower']
kc_basis = kc_df['kc_basis']
kc_upper = kc_df['kc_upper']

# 趋势强度分析
strong_uptrend = (close > kc_upper) & (kc_basis > kc_basis.shift())
strong_downtrend = (close < kc_lower) & (kc_basis < kc_basis.shift())

# 通道挤压
kc_width = kc_upper - kc_lower
squeeze = kc_width < kc_width.rolling(20).mean()

# 突破交易信号
kc_breakout_long = (close > kc_upper) & (close.shift() <= kc_upper.shift())
kc_breakout_short = (close < kc_lower) & (close.shift() >= kc_lower.shift())

# 与布林带结合分析
bb_df = ta.bbands(length=20, std=2)
bb_squeeze = (bb_df['bb_upper'] - bb_df['bb_lower']) < kc_width
```

---

### **`massi` - 质量指数指标**

```python
@tobtind(lines=None, lib='pta')
def massi(self, fast=9, slow=25, offset=0, **kwargs) -> IndSeries:
```

**功能**：非定向波动率指标，利用高低价范围识别基于范围扩张的趋势反转

**所需数据字段**：`high`, `low`

**参数**：

  - `fast`：快速周期，默认9
  - `slow`：慢速周期，默认25
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，MASSI值序列

**计算公式**：
```
hl = high - low
hl_ema1 = EMA(hl, fast)
hl_ema2 = EMA(hl_ema1, fast)
hl_ratio = hl_ema1 / hl_ema2
MASSI = SUM(hl_ratio, slow)
```

**示例**：
```python
# 计算质量指数
massi_values = ta.massi(fast=9, slow=25)

# 反转信号识别（经典用法）
massi_reversal = massi_values > 27  # 传统阈值

# 波动率爆发
volatility_surge = massi_values > massi_values.rolling(50).quantile(0.8)

# 趋势转换预警
trend_change_warning = (massi_values > 25) & (massi_values.shift() <= 25)

# 与价格背离分析
price_high = high.rolling(10).max()
massi_high = massi_values.rolling(10).max()
bearish_divergence = (price_high > price_high.shift(10)) & (massi_high < massi_high.shift(10))
```

---

### **`natr` - 标准化平均真实波幅指标**

```python
@tobtind(lines=None, lib='pta')
def natr(self, length=20, scalar=100., mamode="ema", talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：标准化的平均真实波幅，便于在不同价格水平的资产间比较波动率

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认20
  - `scalar`：放大倍数，默认100
  - `mamode`：移动平均类型，默认"ema"
  - `talib`：是否使用TA-Lib版本，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，NATR值序列

**计算公式**：
```
NATR = (scalar / close) * ATR(high, low, close)
```

**示例**：
```python
# 计算标准化ATR
natr_values = ta.natr(length=20, scalar=100, mamode="ema")

# 跨资产波动率比较
high_volatility_asset = natr_values > 5  # 5%以上为高波动
low_volatility_asset = natr_values < 2   # 2%以下为低波动

# 波动率regime分析
volatility_regime = pd.cut(natr_values, 
                          bins=[0, 2, 5, 10, float('inf')], 
                          labels=['极低', '低', '中', '高'])

# 动态止损设置
dynamic_stop_loss = natr_values * 2  # 2倍NATR作为止损幅度

# 波动率突破过滤
significant_move = (high - low) / close > natr_values / 100
```

---

### **`pdist` - 价格距离指标**

```python
@tobtind(lines=None, lib='pta')
def pdist(self, drift=10, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量价格运动覆盖的"距离"，综合考虑日内波动和隔夜跳空

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `drift`：差分周期，默认10
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，价格距离值序列

**计算公式**：
```
PDIST = 2 * (high - low) - ABS(close - open) + ABS(open - close[drift])
```

**示例**：
```python
# 计算价格距离
pdist_values = ta.pdist(drift=10)

# 价格运动强度分析
strong_movement = pdist_values > pdist_values.rolling(20).quantile(0.7)
weak_movement = pdist_values < pdist_values.rolling(20).quantile(0.3)

# 趋势延续概率
trend_continuation = (pdist_values > pdist_values.rolling(5).mean()) & (close > close.shift())

# 与成交量结合分析
volume_confirmation = (pdist_values > pdist_values.rolling(10).mean()) & (volume > volume.rolling(10).mean())

# 价格距离比率
pdist_ratio = pdist_values / close

# 异常价格运动检测
abnormal_move = pdist_values > pdist_values.rolling(50).mean() + 2 * pdist_values.rolling(50).std()
```

---

### **`rvi` - 相对波动率指数指标**

```python
@tobtind(lines=None, lib='pta')
def rvi(self, length=14, scalar=100., refined=False, thirds=False, mamode="ema", drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：基于价格方向的标准差累积的相对波动率指数，类似RSI但关注波动率

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认14
  - `scalar`：缩放倍数，默认100
  - `refined`：是否使用精炼计算，默认False
  - `thirds`：是否使用三平均，默认False
  - `mamode`：移动平均类型，默认"ema"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，RVI值序列

**计算公式**：
```
UP = STDEV(src, length) IF src.diff() > 0 ELSE 0
DOWN = STDEV(src, length) IF src.diff() <= 0 ELSE 0
UPSUM = EMA(UP, length)
DOWNSUM = EMA(DOWN, length)
RVI = scalar * (UPSUM / (UPSUM + DOWNSUM))
```

**示例**：
```python
# 计算相对波动率指数
rvi_values = ta.rvi(length=14, scalar=100)

# 精炼版本（高低价平均）
rvi_refined = ta.rvi(refined=True)

# 三平均版本
rvi_thirds = ta.rvi(thirds=True)

# 超买超卖判断
rvi_overbought = rvi_values > 60
rvi_oversold = rvi_values < 40

# 趋势强度确认
strong_uptrend_rvi = (rvi_values > 50) & (rvi_values > rvi_values.shift())
strong_downtrend_rvi = (rvi_values < 50) & (rvi_values < rvi_values.shift())

# 与价格背离
price_higher = close > close.shift(10)
rvi_lower = rvi_values < rvi_values.shift(10)
bearish_divergence_rvi = price_higher & rvi_lower
```

---

### **`thermo` - 埃尔达温度计指标**

```python
@tobtind(lines=['thermo', 'thermo_ma', 'thermo_long', 'thermo_short'], lib='pta')
def thermo(self, length=20, long=2., short=0.5, mamode="ema", drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：埃尔达温度计测量价格波动率，提供长短仓信号

**所需数据字段**：`high`, `low`

**参数**：

  - `length`：计算周期，默认20
  - `long`：多头因子，默认2.0
  - `short`：空头因子，默认0.5
  - `mamode`：移动平均类型，默认"ema"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含thermo（温度值）、thermo_ma（移动平均）、thermo_long（多头信号）、thermo_short（空头信号）

**计算公式**：
```
thermoL = (low.shift(drift) - low).abs()
thermoH = (high - high.shift(drift)).abs()
thermo = np.where(thermoH > thermoL, thermoH, thermoL)
thermo_ma = ema(thermo, length)
thermo_long = thermo < (thermo_ma * long)
thermo_short = thermo > (thermo_ma * short)
```

**示例**：
```python
# 计算埃尔达温度计
thermo_df = ta.thermo(length=20, long=2.0, short=0.5)

# 提取各组件
thermo_val = thermo_df['thermo']           # 温度值
thermo_ma = thermo_df['thermo_ma']         # 移动平均
thermo_long = thermo_df['thermo_long']     # 多头信号
thermo_short = thermo_df['thermo_short']   # 空头信号

# 交易信号
buy_signal = thermo_long == 1
sell_signal = thermo_short == 1

# 市场状态分析
low_volatility_market = thermo_val < thermo_ma
high_volatility_market = thermo_val > thermo_ma

# 温度极端值
extreme_cold = thermo_val < thermo_ma * 0.3
extreme_hot = thermo_val > thermo_ma * 3

# 与趋势结合
uptrend_thermo = (close > close.shift(10)) & buy_signal
downtrend_thermo = (close < close.shift(10)) & sell_signal
```

---

### **`true_range` - 真实波幅指标**

```python
@tobtind(lines=None, lib='pta')
def true_range(self, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：扩展经典范围（最高减最低）以包含可能的跳空情景

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `drift`：偏移周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，真实波幅值序列

**计算公式**：
```
prev_close = close.shift(drift)
TRUE_RANGE = max([high - low, 
                 abs(high - prev_close), 
                 abs(low - prev_close)])
```

**示例**：
```python
# 计算真实波幅
tr_values = ta.true_range(drift=1)

# 波动率分析
high_volatility_day = tr_values > tr_values.rolling(20).quantile(0.8)
low_volatility_day = tr_values < tr_values.rolling(20).quantile(0.2)

# 跳空分析
gap_up = (low - high.shift()) > 0
gap_down = (high - low.shift()) < 0
significant_gap = abs(close.shift() - open) > tr_values.rolling(10).mean()

# 真实波幅比率
tr_ratio = tr_values / close
normalized_tr = tr_values / tr_values.rolling(20).mean()

# 波动率突破
volatility_breakout = tr_values > tr_values.rolling(10).mean() * 1.5
```

---

### **`ui` - 溃疡指数指标**

```python
@tobtind(lines=None, lib='pta')
def ui(self, length=14, scalar=100., offset=0, **kwargs) -> IndSeries:
```

**功能**：彼得·马丁开发的溃疡指数，使用二次均值衡量下行波动率，强调大幅回撤

**所需数据字段**：`close`

**参数**：

  - `length`：计算周期，默认14
  - `scalar`：缩放倍数，默认100
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，溃疡指数值序列

**计算公式**：
```
HCN = 最高收盘价(close, length)
DOWNSIDE = scalar * (close - HCN) / HCN
UI = SQRT(SUM(DOWNSIDE^2, length) / length)
```

**示例**：
```python
# 计算溃疡指数
ui_values = ta.ui(length=14, scalar=100)

# 风险等级评估
low_risk = ui_values < 5
medium_risk = (ui_values >= 5) & (ui_values < 10)
high_risk = ui_values >= 10

# 回撤分析
drawdown_analysis = ui_values > ui_values.rolling(50).quantile(0.8)

# 组合风险管理
portfolio_risk = ui_values.rolling(10).mean()

# 与夏普比率结合
risk_adjusted_performance = returns / ui_values

# 溃疡指数趋势
ui_rising = ui_values > ui_values.shift(5)  # 风险增加
ui_falling = ui_values < ui_values.shift(5)  # 风险减少
```

---

## 9. 成交量指标（Volume）

### **`ad` - 累积/派发指标**

```python
@tobtind(lines=None, lib='pta')
def ad(self, open_=None, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：利用收盘价在高低范围内的相对位置结合成交量的累积/派发指标

**所需数据字段**：`open`, `high`, `low`, `close`, `volume`

**参数**：

  - `open_`：开盘价序列，默认None
  - `talib`：是否使用TA-Lib版本，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，AD值序列

**计算公式**：
```
if 使用开盘价:
    AD = close - open
else:
    AD = 2 * close - high - low

hl_range = high - low
AD = AD * volume / hl_range
AD = 累积和(AD)
```

**示例**：
```python
# 计算累积/派发线
ad_line = ta.ad()

# 使用开盘价版本
ad_with_open = ta.ad(open_=open)

# 趋势确认
price_rising_ad_rising = (close > close.shift()) & (ad_line > ad_line.shift())
price_falling_ad_falling = (close < close.shift()) & (ad_line < ad_line.shift())

# 背离分析
bearish_divergence_ad = (close > close.shift(10)) & (ad_line < ad_line.shift(10))
bullish_divergence_ad = (close < close.shift(10)) & (ad_line > ad_line.shift(10))

# 资金流强度
money_flow_strength = ad_line.diff()
strong_accumulation = money_flow_strength > money_flow_strength.rolling(20).quantile(0.7)
strong_distribution = money_flow_strength < money_flow_strength.rolling(20).quantile(0.3)

# 与OBV结合分析
obv_values = ta.obv(close, volume)
correlation_ad_obv = ad_line.rolling(20).corr(obv_values)
```

---

### **`adosc` - 累积/派发振荡器（蔡金振荡器）**

```python
@tobtind(lines=None, lib='pta')
def adosc(self, open_=None, fast=12, slow=26, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：基于累积/派发线的振荡器，类似MACD的处理方式，用于识别资金流向的变化

**所需数据字段**：`open`, `high`, `low`, `close`, `volume`

**参数**：

  - `open_`：开盘价序列，默认None
  - `fast`：快速周期，默认12
  - `slow`：慢速周期，默认26
  - `talib`：是否使用TA-Lib版本，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，ADOSC值序列

**计算公式**：
```
AD = 累积/派发线(high, low, close, open)
fast_ad = EMA(AD, fast)
slow_ad = EMA(AD, slow)
ADOSC = fast_ad - slow_ad
```

**示例**：
```python
# 计算蔡金振荡器
adosc_values = ta.adosc(fast=12, slow=26)

# 零轴交叉信号
adosc_bullish = (adosc_values > 0) & (adosc_values.shift() <= 0)
adosc_bearish = (adosc_values < 0) & (adosc_values.shift() >= 0)

# 动量确认
strong_momentum = adosc_values > adosc_values.rolling(20).quantile(0.7)
weak_momentum = adosc_values < adosc_values.rolling(20).quantile(0.3)

# 与价格背离分析
price_higher = close > close.shift(10)
adosc_lower = adosc_values < adosc_values.shift(10)
bearish_divergence_adosc = price_higher & adosc_lower

# 多时间框架分析
adosc_short = ta.adosc(fast=5, slow=13)
adosc_long = ta.adosc(fast=12, slow=26)
alignment = (adosc_short > 0) & (adosc_long > 0)
```

---

### **`aobv` - 阿切尔能量潮指标**

```python
@tobtind(lines=['obv_min', 'obv_max', 'obv_maf', 'obv_mas', 'obv_long', 'obv_short'], lib='pta')
def aobv(self, fast=4, slow=12, max_lookback=2, min_lookback=2, mamode="ema", offset=0, **kwargs) -> IndFrame:
```

**功能**：增强版能量潮指标，结合移动平均和极值分析，提供更精确的交易信号

**所需数据字段**：`close`, `volume`

**参数**：

  - `fast`：快速移动平均周期，默认4
  - `slow`：慢速移动平均周期，默认12
  - `max_lookback`：最大值回溯周期，默认2
  - `min_lookback`：最小值回溯周期，默认2
  - `mamode`：移动平均类型，默认"ema"
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含obv_min（最小值）、obv_max（最大值）、obv_maf（快速MA）、obv_mas（慢速MA）、obv_long（多头信号）、obv_short（空头信号）

**计算公式**：
```
OBV = 标准能量潮计算
obv_maf = MA(OBV, fast)
obv_mas = MA(OBV, slow)
obv_min = OBV的min_lookback周期最小值
obv_max = OBV的max_lookback周期最大值
基于极值和移动平均交叉生成交易信号
```

**示例**：
```python
# 计算阿切尔能量潮
aobv_df = ta.aobv(fast=4, slow=12, max_lookback=2, min_lookback=2)

# 提取各信号
obv_min = aobv_df['obv_min']
obv_max = aobv_df['obv_max']
obv_maf = aobv_df['obv_maf']
obv_mas = aobv_df['obv_mas']
long_signals = aobv_df['obv_long']
short_signals = aobv_df['obv_short']

# 趋势确认
obv_uptrend = (obv_maf > obv_mas) & (long_signals == 1)
obv_downtrend = (obv_maf < obv_mas) & (short_signals == 1)

# 突破信号
obv_breakout = obv_maf > obv_max
obv_breakdown = obv_maf < obv_min

# 多时间框架过滤
strong_buy = long_signals & (close > close.rolling(20).mean())
strong_sell = short_signals & (close < close.rolling(20).mean())
```

---

### **`cmf` - 蔡金资金流指标**

```python
@tobtind(lines=None, lib='pta')
def cmf(self, open_=None, length=20, offset=0, **kwargs) -> IndSeries:
```

**功能**：衡量特定时期内资金流量的强度，结合累积/派发和成交量分析

**所需数据字段**：`open`, `high`, `low`, `close`, `volume`

**参数**：

  - `open_`：开盘价序列，默认None
  - `length`：计算周期，默认20
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，CMF值序列

**计算公式**：
```
if 使用开盘价:
    ad = close - open
else:
    ad = 2 * close - high - low

hl_range = high - low
ad = ad * volume / hl_range
CMF = SUM(ad, length) / SUM(volume, length)
```

**示例**：
```python
# 计算蔡金资金流
cmf_values = ta.cmf(length=20)

# 资金流向分析
money_inflow = cmf_values > 0
money_outflow = cmf_values < 0

# 强度阈值
strong_inflow = cmf_values > 0.1
strong_outflow = cmf_values < -0.1

# 与价格背离
price_rising_cmf_falling = (close > close.shift(10)) & (cmf_values < cmf_values.shift(10))
price_falling_cmf_rising = (close < close.shift(10)) & (cmf_values > cmf_values.shift(10))

# 确认突破
breakout_confirmation = (close > close.rolling(20).max()) & (cmf_values > 0)
breakdown_confirmation = (close < close.rolling(20).min()) & (cmf_values < 0)

# 多周期CMF分析
cmf_short = ta.cmf(length=10)
cmf_long = ta.cmf(length=50)
alignment_bullish = (cmf_short > 0) & (cmf_long > 0)
```

---

### **`efi` - 埃尔达力量指数指标**

```python
@tobtind(lines=None, lib='pta')
def efi(self, length=13, mamode="ema", drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：使用价格和成交量衡量价格运动背后的力量，识别潜在反转和价格修正

**所需数据字段**：`close`, `volume`

**参数**：

  - `length`：计算周期，默认13
  - `mamode`：移动平均类型，默认"ema"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，EFI值序列

**计算公式**：
```
pv_diff = close.diff(drift) * volume
if mamode == 'sma':
    EFI = SMA(pv_diff, length)
else:
    EFI = EMA(pv_diff, length)
```

**示例**：
```python
# 计算埃尔达力量指数
efi_values = ta.efi(length=13, mamode="ema")

# 力量方向
bullish_power = efi_values > 0
bearish_power = efi_values < 0

# 力量强度
strong_bullish_power = efi_values > efi_values.rolling(20).quantile(0.7)
strong_bearish_power = efi_values < efi_values.rolling(20).quantile(0.3)

# 零轴交叉
efi_turning_bullish = (efi_values > 0) & (efi_values.shift() <= 0)
efi_turning_bearish = (efi_values < 0) & (efi_values.shift() >= 0)

# 与价格动量结合
price_momentum = close.diff(5)
confirmed_move = (efi_values > 0) & (price_momentum > 0)
false_breakout = (efi_values < 0) & (price_momentum > 0)

# 多时间框架EFI
efi_fast = ta.efi(length=5)
efi_slow = ta.efi(length=21)
momentum_alignment = (efi_fast > 0) & (efi_slow > 0)
```

---

### **`eom` - 简易移动指标**

```python
@tobtind(lines=None, lib='pta')
def eom(self, length=14, divisor=100, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：基于成交量的振荡器，设计用于衡量价格和成交量在零线附近波动的关系

**所需数据字段**：`high`, `low`, `close`, `volume`

**参数**：

  - `length`：计算周期，默认14
  - `divisor`：除数，默认100
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，EOM值序列

**计算公式**：
```
hl_range = high - low
distance = 0.5 * (high.diff(drift) + low.diff(drift))
box_ratio = (volume / divisor) / hl_range
eom = distance / box_ratio
EOM = SMA(eom, length)
```

**示例**：
```python
# 计算简易移动指标
eom_values = ta.eom(length=14, divisor=100000000)

# 市场状态判断
easy_movement = eom_values > 0  # 价格轻松移动
hard_movement = eom_values < 0  # 价格移动困难

# 极端值识别
extreme_easy = eom_values > eom_values.rolling(50).quantile(0.9)
extreme_hard = eom_values < eom_values.rolling(50).quantile(0.1)

# 趋势确认
confirmed_uptrend = (eom_values > 0) & (close > close.shift())
confirmed_downtrend = (eom_values < 0) & (close < close.shift())

# 反转信号
reversal_warning = (eom_values > 0) & (eom_values.shift() < 0)  # 从困难转为轻松
consolidation_warning = (eom_values < 0) & (eom_values.shift() > 0)  # 从轻松转为困难

# 与波动率结合分析
atr_values = ta.atr(length=14)
high_volatility_easy = (eom_values > 0) & (atr_values > atr_values.rolling(20).mean())
```

---

### **`kvo` - 克林格成交量振荡器**

```python
@tobtind(lines=['kvo', 'kvos'], lib='pta')
def kvo(self, fast=34, slow=55, signal=13, mamode="ema", drift=1, offset=0, **kwargs) -> IndFrame:
```

**功能**：通过比较成交量和价格来预测市场反转，识别聪明资金的动向

**所需数据字段**：`high`, `low`, `close`, `volume`

**参数**：

  - `fast`：快速周期，默认34
  - `slow`：慢速周期，默认55
  - `signal`：信号周期，默认13
  - `mamode`：移动平均类型，默认"ema"
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含kvo（KVO值）、kvos（信号线）

**计算公式**：
```
SV = volume * signed_IndSeries(HLC3, 1)
KVO = EMA(SV, fast) - EMA(SV, slow)
Signal = EMA(KVO, signal)
```

**示例**：
```python
# 计算克林格成交量振荡器
kvo_df = ta.kvo(fast=34, slow=55, signal=13)

# 提取主线和信号线
kvo_line = kvo_df['kvo']
kvo_signal = kvo_df['kvos']

# 交叉信号
kvo_bullish_cross = (kvo_line > kvo_signal) & (kvo_line.shift() <= kvo_signal.shift())
kvo_bearish_cross = (kvo_line < kvo_signal) & (kvo_line.shift() >= kvo_signal.shift())

# 零轴分析
kvo_positive = kvo_line > 0
kvo_negative = kvo_line < 0

# 动量背离
price_higher = close > close.shift(10)
kvo_lower = kvo_line < kvo_line.shift(10)
bearish_divergence_kvo = price_higher & kvo_lower

# 多时间框架确认
kvo_short = ta.kvo(fast=13, slow=21, signal=8)['kvo']
kvo_long = ta.kvo(fast=55, slow=89, signal=21)['kvo']
bullish_alignment = (kvo_short > 0) & (kvo_long > 0)
```

---

### **`mfi` - 资金流量指数指标**

```python
@tobtind(lines=None, lib='pta')
def mfi(self, length=14, talib=True, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：使用价格和成交量衡量买卖压力的振荡器指标，类似RSI但包含成交量

**所需数据字段**：`high`, `low`, `close`, `volume`

**参数**：

  - `length`：计算周期，默认14
  - `talib`：是否使用TA-Lib版本，默认True
  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，MFI值序列

**计算公式**：
```
tp = typical_price = (high + low + close) / 3
rmf = raw_money_flow = tp * volume
pmf = pos_money_flow = SUM(rmf, length) if tp.diff(drift) > 0 else 0
nmf = neg_money_flow = SUM(rmf, length) if tp.diff(drift) < 0 else 0
MFR = money_flow_ratio = pmf / nmf
MFI = money_flow_index = 100 * pmf / (pmf + nmf)
```

**示例**：
```python
# 计算资金流量指数
mfi_values = ta.mfi(length=14)

# 超买超卖判断
mfi_overbought = mfi_values > 80
mfi_oversold = mfi_values < 20

# 趋势确认
mfi_bullish = (mfi_values > 50) & (mfi_values > mfi_values.shift())
mfi_bearish = (mfi_values < 50) & (mfi_values < mfi_values.shift())

# 背离分析
price_higher = close > close.shift(10)
mfi_lower = mfi_values < mfi_values.shift(10)
bearish_divergence_mfi = price_higher & mfi_lower

# 与RSI结合
rsi_values = ta.rsi(close, length=14)
confirmed_overbought = mfi_overbought & (rsi_values > 70)
confirmed_oversold = mfi_oversold & (rsi_values < 30)

# 突破确认
breakout_with_volume = (close > close.rolling(20).max()) & (mfi_values > 50)
```

---

### **`nvi` - 负成交量指数指标**

```python
@tobtind(lines=None, lib='pta')
def nvi(self, length=13, initial=1000, offset=0, **kwargs) -> IndSeries:
```

**功能**：累积指标，使用成交量变化识别聪明资金活跃的位置，关注下跌日表现

**所需数据字段**：`close`, `volume`

**参数**：

  - `length`：计算周期，默认13
  - `initial`：初始值，默认1000
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，NVI值序列

**计算公式**：
```
roc = ROC(close, length)
signed_volume = signed_IndSeries(volume, initial=1)
nvi = signed_volume[signed_volume < 0].abs() * roc
nvi.fillna(0, inplace=True)
nvi.iloc[0] = initial
nvi = nvi.cumsum()
```

**示例**：
```python
# 计算负成交量指数
nvi_values = ta.nvi(length=13, initial=1000)

# 聪明资金识别
smart_money_accumulation = nvi_values > nvi_values.shift(20)
smart_money_distribution = nvi_values < nvi_values.shift(20)

# 与PVI结合分析
pvi_values = ta.pvi(length=13, initial=1000)
nvi_pvi_ratio = nvi_values / pvi_values

# 趋势确认
confirmed_uptrend_nvi = (nvi_values > nvi_values.shift()) & (close > close.shift())
confirmed_downtrend_nvi = (nvi_values < nvi_values.shift()) & (close < close.shift())

# 背离信号
price_lower = close < close.shift(10)
nvi_higher = nvi_values > nvi_values.shift(10)
bullish_divergence_nvi = price_lower & nvi_higher

# 多时间框架NVI
nvi_short = ta.nvi(length=5)
nvi_long = ta.nvi(length=21)
bullish_alignment_nvi = (nvi_short > nvi_short.shift()) & (nvi_long > nvi_long.shift())
```

---

### **`obv` - 能量潮指标**

```python
@tobtind(lines=None, lib='pta')
def obv(self, talib=True, offset=0, **kwargs) -> IndSeries:
```

**功能**：累积指标，用于衡量买卖压力，是最经典的成交量指标之一

**所需数据字段**：`close`, `volume`

**参数**：

  - `talib`：是否使用TA-Lib版本，默认True
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，OBV值序列

**计算公式**：
```
signed_volume = signed_IndSeries(close, initial=1) * volume
obv = signed_volume.cumsum()
```

**示例**：
```python
# 计算能量潮
obv_values = ta.obv()

# 趋势分析
obv_uptrend = obv_values > obv_values.rolling(20).mean()
obv_downtrend = obv_values < obv_values.rolling(20).mean()

# 突破确认
price_breakout_obv_confirmation = (close > close.rolling(20).max()) & (obv_values > obv_values.rolling(20).max())
price_breakdown_obv_confirmation = (close < close.rolling(20).min()) & (obv_values < obv_values.rolling(20).min())

# 背离分析
price_higher = close > close.shift(10)
obv_lower = obv_values < obv_values.shift(10)
bearish_divergence_obv = price_higher & obv_lower

# OBV移动平均
obv_ma = obv_values.rolling(20).mean()
obv_above_ma = obv_values > obv_ma

# 多时间框架OBV
obv_daily = obv_values
obv_weekly = obv_values.resample('W').last()
bullish_alignment_obv = (obv_daily > obv_daily.shift(5)) & (obv_weekly > obv_weekly.shift())
```

---

### **`pvi` - 正成交量指数指标**

```python
@tobtind(lines=None, lib='pta')
def pvi(self, length=13, initial=1000, offset=0, **kwargs) -> IndSeries:
```

**功能**：累积指标，使用成交量变化识别聪明资金活跃的位置，关注上涨日表现，与NVI配合使用

**所需数据字段**：`close`, `volume`

**参数**：

  - `length`：计算周期，默认13
  - `initial`：初始值，默认1000
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，PVI值序列

**计算公式**：
```
roc = ROC(close, length)
signed_volume = signed_IndSeries(volume, initial=1)
pvi = signed_volume[signed_volume > 0].abs() * roc
pvi.fillna(0, inplace=True)
pvi.iloc[0] = initial
pvi = pvi.cumsum()
```

**示例**：
```python
# 计算正成交量指数
pvi_values = ta.pvi(length=13, initial=1000)

# 散户资金流向
retail_money_flow = pvi_values > pvi_values.shift(20)
retail_money_outflow = pvi_values < pvi_values.shift(20)

# 与NVI结合分析（聪明资金 vs 散户资金）
nvi_values = ta.nvi(length=13, initial=1000)
smart_money_dominance = nvi_values > pvi_values
retail_money_dominance = nvi_values < pvi_values

# 趋势确认
confirmed_uptrend_pvi = (pvi_values > pvi_values.shift()) & (close > close.shift())
confirmed_downtrend_pvi = (pvi_values < pvi_values.shift()) & (close < close.shift())

# 背离信号
price_lower = close < close.shift(10)
pvi_higher = pvi_values > pvi_values.shift(10)
bullish_divergence_pvi = price_lower & pvi_higher

# PVI/NVI交叉分析
pvi_nvi_cross = (nvi_values > pvi_values) & (nvi_values.shift() <= pvi_values.shift())
```

---

### **`pvol` - 价格成交量指标**

```python
@tobtind(lines=None, lib='pta')
def pvol(self, offset=0, **kwargs) -> IndSeries:
```

**功能**：计算价格与成交量的乘积，用于分析价格变动与成交量关系的强度

**所需数据字段**：`close`, `volume`

**参数**：

  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，价格成交量值序列

**计算公式**：
```
if signed:
    pvol = signed_IndSeries(close, 1) * close * volume
else:
    pvol = close * volume
```

**示例**：
```python
# 计算价格成交量
pvol_values = ta.pvol()

# 计算无符号版本
pvol_unsigned = ta.pvol(signed=False)

# 成交量加权价格分析
weighted_price = pvol_values / volume

# 异常成交量检测
abnormal_pvol = pvol_values > pvol_values.rolling(20).mean() + 2 * pvol_values.rolling(20).std()

# 价格成交量趋势
pvol_uptrend = pvol_values > pvol_values.rolling(10).mean()
pvol_downtrend = pvol_values < pvol_values.rolling(10).mean()

# 突破确认
breakout_confirmation = (close > close.rolling(20).max()) & (pvol_values > pvol_values.rolling(20).mean())
breakdown_confirmation = (close < close.rolling(20).min()) & (pvol_values > pvol_values.rolling(20).mean())

# 多时间框架PVOL分析
pvol_short = pvol_values.rolling(5).mean()
pvol_long = pvol_values.rolling(20).mean()
momentum_alignment = (pvol_short > pvol_long) & (pvol_short > pvol_short.shift())
```

---

### **`pvr` - 价格成交量排名指标**

```python
@tobtind(lines=None, lib='pta')
def pvr(self, **kwargs) -> IndSeries:
```

**功能**：安东尼·J·马塞克开发的价格成交量排名，通过价格变化和成交量变化的组合生成1-4的排名

**所需数据字段**：`close`, `volume`

**参数**：

  - `**kwargs`：可选参数

**返回值**：IndSeries，PVR排名序列（1-4）

**计算公式**：
```
价格变化 = close.diff()
成交量变化 = volume.diff()

if 价格变化 >= 0 and 成交量变化 >= 0:
    return 1
elif 价格变化 >= 0 and 成交量变化 < 0:
    return 2
elif 价格变化 < 0 and 成交量变化 >= 0:
    return 3
else:  # 价格变化 < 0 and 成交量变化 < 0
    return 4
```

**示例**：
```python
# 计算价格成交量排名
pvr_rank = ta.pvr()

# 基础交易信号（原始策略）
pvr_buy_signal = pvr_rank < 2.5  # 排名低于2.5时买入
pvr_sell_signal = pvr_rank > 2.5  # 排名高于2.5时卖出

# 各排名状态分析
bullish_confirmation = pvr_rank == 1  # 价涨量增 - 最强看涨
bullish_divergence = pvr_rank == 2    # 价涨量缩 - 看涨但需谨慎
bearish_confirmation = pvr_rank == 3  # 价跌量增 - 看跌
bearish_divergence = pvr_rank == 4    # 价跌量缩 - 可能见底

# 排名持续性分析
consistent_bullish = (pvr_rank == 1).rolling(3).sum() == 3
consistent_bearish = (pvr_rank == 3).rolling(3).sum() == 3

# 排名转换信号
improving_rank = pvr_rank < pvr_rank.shift()  # 排名改善
deteriorating_rank = pvr_rank > pvr_rank.shift()  # 排名恶化

# 与移动平均结合
price_above_ma = close > close.rolling(20).mean()
filtered_buy = pvr_buy_signal & price_above_ma
filtered_sell = pvr_sell_signal & (~price_above_ma)

# 多周期排名确认
pvr_short = ta.pvr().rolling(3).mean()
pvr_long = ta.pvr().rolling(10).mean()
confirmed_signal = (pvr_short < 2.5) & (pvr_long < 2.5)
```

---

### **`pvt` - 价格成交量趋势指标**

```python
@tobtind(lines=None, lib='pta')
def pvt(self, drift=1, offset=0, **kwargs) -> IndSeries:
```

**功能**：利用价格变化率与成交量的乘积及其累积值来确定资金流向

**所需数据字段**：`close`, `volume`

**参数**：

  - `drift`：差分周期，默认1
  - `offset`：结果偏移周期数，默认0
  - `**kwargs`：可选参数

**返回值**：IndSeries，PVT值序列

**计算公式**：
```
pv = ROC(close, drift) * volume
PVT = pv.cumsum()
```

**示例**：
```python
# 计算价格成交量趋势
pvt_values = ta.pvt(drift=1)

# 趋势方向判断
pvt_uptrend = pvt_values > pvt_values.rolling(20).mean()
pvt_downtrend = pvt_values < pvt_values.rolling(20).mean()

# 零轴分析
pvt_above_zero = pvt_values > 0
pvt_below_zero = pvt_values < 0

# 背离分析
price_higher = close > close.shift(10)
pvt_lower = pvt_values < pvt_values.shift(10)
bearish_divergence_pvt = price_higher & pvt_lower

price_lower = close < close.shift(10)
pvt_higher = pvt_values > pvt_values.shift(10)
bullish_divergence_pvt = price_lower & pvt_higher

# 突破确认
breakout_with_pvt = (close > close.rolling(20).max()) & (pvt_values > pvt_values.rolling(20).max())
breakdown_with_pvt = (close < close.rolling(20).min()) & (pvt_values < pvt_values.rolling(20).min())

# PVT动量分析
pvt_momentum = pvt_values.diff(5)
strong_momentum = pvt_momentum > pvt_momentum.rolling(20).quantile(0.7)
weak_momentum = pvt_momentum < pvt_momentum.rolling(20).quantile(0.3)

# 多时间框架PVT
pvt_fast = ta.pvt(drift=1)
pvt_slow = ta.pvt(drift=5)
alignment_bullish = (pvt_fast > pvt_fast.rolling(10).mean()) & (pvt_slow > pvt_slow.rolling(10).mean())

# 与OBV比较
obv_values = ta.obv()
pvt_obv_correlation = pvt_values.rolling(20).corr(obv_values)
high_correlation = abs(pvt_obv_correlation) > 0.7
```

---

### **`vp` - 成交量分布指标**

```python
@tobtind(lines=['low_price', 'mean_price', 'high_price', 'pos_volume', 'neg_volume', 'total_volume'], lib='pta')
def vp(self, width=10, **kwargs) -> IndFrame:
```

**功能**：通过将价格切片到不同范围来计算成交量分布，显示各价格区间的成交量集中情况

**所需数据字段**：`close`, `volume`

**参数**：

  - `width`：价格区间数量，默认10
  - `**kwargs`：可选参数

**返回值**：IndFrame，包含low_price（区间低价）、mean_price（区间平均价）、high_price（区间高价）、pos_volume（正成交量）、neg_volume（负成交量）、total_volume（总成交量）

**计算公式**：
```
将价格数据分成width个区间
对于每个区间：
    low_price = 区间最低价
    mean_price = 区间平均价  
    high_price = 区间最高价
    pos_volume = 价格上涨日的成交量总和
    neg_volume = 价格下跌日的成交量总和
    total_volume = pos_volume + neg_volume
```

**示例**：
```python
# 计算成交量分布
vp_df = ta.vp(width=10)

# 提取各价格区间的成交量数据
low_prices = vp_df['low_price']
mean_prices = vp_df['mean_price'] 
high_prices = vp_df['high_price']
pos_volumes = vp_df['pos_volume']
neg_volumes = vp_df['neg_volume']
total_volumes = vp_df['total_volume']

# 高成交量区域识别（支撑阻力）
high_volume_zones = total_volumes.nlargest(3)  # 前3个高成交量区域
support_zones = high_volume_zones[high_volume_zones.index < close.iloc[-1]]
resistance_zones = high_volume_zones[high_volume_zones.index > close.iloc[-1]]

# 成交量失衡分析
volume_imbalance = (pos_volumes - neg_volumes) / total_volumes
strong_buying_pressure = volume_imbalance > 0.3
strong_selling_pressure = volume_imbalance < -0.3

# 价值区域计算（传统VP概念）
total_volume_all = total_volumes.sum()
sorted_volumes = total_volumes.sort_values(ascending=False)
cumulative_volume = sorted_volumes.cumsum()
value_area_threshold = total_volume_all * 0.7  # 70%成交量集中区域
value_area = cumulative_volume[cumulative_volume <= value_area_threshold]

# POC（控制点）识别
poc_price = mean_prices[total_volumes.idxmax()]  # 最高成交量对应的价格

# 当前价格在VP中的位置
current_price = close.iloc[-1]
current_volume_bin = total_volumes[(
    mean_prices >= current_price * 0.99) & (
    mean_prices <= current_price * 1.01)].iloc[0] if not total_volumes[(
    mean_prices >= current_price * 0.99) & (
    mean_prices <= current_price * 1.01)].empty else 0

# VP形态分析
single_peaked = len(total_volumes.nlargest(2)) == 1  # 单峰分布
double_peaked = len(total_volumes.nlargest(2)) == 2 and \
                total_volumes.nlargest(2).iloc[0] / total_volumes.nlargest(2).iloc[1] < 2  # 双峰分布

# 动态VP分析（滚动窗口）
def rolling_vp(close, volume, window=100, width=10):
    vp_data = []
    for i in range(len(close) - window + 1):
        vp_slice = ta.vp(close.iloc[i:i+window], volume.iloc[i:i+window], width=width)
        vp_data.append(vp_slice)
    return vp_data

# VP突破分析
if current_volume_bin < total_volumes.quantile(0.3):
    # 当前处于低成交量区域，可能突破
    if close.iloc[-1] > poc_price:
        potential_breakout_up = True
    else:
        potential_breakout_down = True
```

---

## 10、通用工具函数（补充）

### **`Any` - 逻辑或运算函数**

```python
@tobtind(lines=None, lib="pta")
def Any(self, *args, keep=True, **kwargs) -> IndSeries:
```

**功能**：对多个序列进行逻辑或运算，返回任一条件为真时的结果

**参数**：

  - `*args`：多个序列参数（numpy数组、IndSeries或pandas Series）
  - `keep`：是否包含自身数据参与运算，默认True
  - `**kwargs`：其他参数

**返回值**：IndSeries，逻辑或运算结果序列

**计算公式**：
```
result = args[0] | args[1] | ... | args[n]
```

**示例**：
```python
# 多条件逻辑或运算
condition1 = close > ta.sma(close, 20)
condition2 = ta.rsi(close, 14) > 70
condition3 = volume > volume.rolling(20).mean() * 1.5

# 任一条件满足即返回True
any_signal = ta.Any(condition1, condition2, condition3)

# 复杂条件组合
breakout_condition = (high > high.rolling(20).max())
volume_condition = (volume > volume.rolling(10).mean() * 2)
rsi_condition = (ta.rsi(close, 14) > 60)

# 任一突破信号
any_breakout = ta.Any(breakout_condition, volume_condition, rsi_condition)

# 排除自身数据
external_conditions_only = ta.Any(condition1, condition2, keep=False)
```

---

### **`All` - 逻辑与运算函数**

```python
@tobtind(lines=None, lib="pta")
def All(self, *args, **kwargs) -> IndSeries:
```

**功能**：对多个序列进行逻辑与运算，返回所有条件同时为真时的结果

**参数**：

  - `*args`：多个序列参数（numpy数组、IndSeries或pandas Series）
  - `**kwargs`：其他参数

**返回值**：IndSeries，逻辑与运算结果序列

**计算公式**：
```
result = args[0] & args[1] & ... & args[n]
```

**示例**：
```python
# 多条件逻辑与运算
price_condition = close > ta.sma(close, 20)
volume_condition = volume > volume.rolling(10).mean()
rsi_condition = (ta.rsi(close, 14) > 50) & (ta.rsi(close, 14) < 70)

# 所有条件同时满足
all_conditions = ta.All(price_condition, volume_condition, rsi_condition)

# 趋势确认策略
uptrend = close > close.rolling(50).mean()
momentum = ta.macd(close).hist > 0
volume_confirmation = volume > volume.rolling(20).mean()

# 多重确认买入信号
confirmed_buy = ta.All(uptrend, momentum, volume_confirmation)

# 风险控制条件
stop_loss = close > close.rolling(10).min() * 0.95
position_size = volume < volume.rolling(50).quantile(0.8)

# 安全交易条件
safe_trade = ta.All(confirmed_buy, stop_loss, position_size)
```

---

### **`Where` - 条件选择函数**

```python
@tobtind(lines=None, lib="pta")
def Where(self, cond, x=None, y=0.0, **kwargs) -> IndSeries:
```

**功能**：根据条件选择返回值，类似numpy.where的功能

**参数**：

  - `cond`：条件序列
  - `x`：条件为真时的返回值，默认None（返回自身数据）
  - `y`：条件为假时的返回值，默认0.0
  - `**kwargs`：其他参数

**返回值**：IndSeries，条件选择结果序列

**计算公式**：
```
if x is None:
    result = self.where(cond, y)  # 条件为真时返回自身，为假时返回y
else:
    result = cond.where(cond, x, y)  # 条件为真时返回x，为假时返回y
```

**示例**：
```python
# 基础条件选择
rsi = ta.rsi(close, 14)
overbought = rsi > 70
oversold = rsi < 30

# 条件为真时返回1，为假时返回0
overbought_signal = ta.Where(overbought, 1, 0)
oversold_signal = ta.Where(oversold, 1, 0)

# 条件为真时返回自身数据（价格），为假时返回0
price_only_when_overbought = ta.Where(overbought, y=0)

# 复杂条件赋值
trend = ta.sma(close, 20)
above_trend = close > trend
# 在趋势上方时返回价格变化，否则返回0
momentum_above_trend = ta.Where(above_trend, close.diff(), 0)

# 多级条件选择
def custom_signal(close, volume):
    rsi = ta.rsi(close, 14)
    vol_ma = volume.rolling(10).mean()
    
    strong_buy = (rsi < 30) & (volume > vol_ma * 1.5)
    weak_buy = (rsi < 40) & (volume > vol_ma)
    sell = rsi > 70
    
    signal = ta.Where(strong_buy, 2, 
              ta.Where(weak_buy, 1,
              ta.Where(sell, -1, 0)))
    return signal

custom_signals = custom_signal(close, volume)
```

---

### **`line_trhend` - 指标线趋势函数**

```python
@tobtind(lines=None, lib="pta")
def line_trhend(self, period=1, **kwargs) -> IndSeries:
```

**功能**：判断指标线趋势方向，与前period期数据对比

**参数**：

  - `period`：对比周期，默认1
  - `**kwargs`：其他参数

**返回值**：IndSeries，趋势方向序列（1：上升，0：持平，-1：下降）

**计算公式**：
```
current = self
previous = self.shift(period)

if current > previous:
    return 1.0
elif current == previous:
    return 0.0
else:
    return -1.0
```

**示例**：
```python
# 计算价格趋势
price_trend = ta.line_trhend(close, period=1)

# 计算指标趋势
rsi_trend = ta.line_trhend(ta.rsi(close, 14), period=2)
macd_trend = ta.line_trhend(ta.macd(close).hist, period=1)

# 趋势强度分析
uptrend_strength = (price_trend == 1).rolling(5).sum()
downtrend_strength = (price_trend == -1).rolling(5).sum()

# 趋势转换信号
trend_turning_up = (price_trend == 1) & (price_trend.shift() != 1)
trend_turning_down = (price_trend == -1) & (price_trend.shift() != -1)

# 多时间框架趋势分析
short_trend = ta.line_trhend(close, period=3)
medium_trend = ta.line_trhend(close, period=10)
long_trend = ta.line_trhend(close, period=20)

# 趋势一致性
trend_alignment = (short_trend == medium_trend) & (medium_trend == long_trend)
```

---

### **`abc` - ABC模式识别函数**

```python
@tobtind(lines=['open', 'high', 'low', 'close'], category='candles')
def abc(self, lim=5.0, **kwargs) -> IndFrame:
```

**功能**：识别ABC价格模式，常用于谐波模式和波浪分析

**所需数据字段**：`open`, `high`, `low`, `close`

**参数**：

  - `lim`：限制参数，默认5.0
  - `**kwargs`：其他参数

**返回值**：IndFrame，包含open、high、low、close列

**示例**：
```python
# 识别ABC模式
abc_pattern = ta.abc(lim=5.0)

# 提取模式组件
pattern_open = abc_pattern['open']
pattern_high = abc_pattern['high'] 
pattern_low = abc_pattern['low']
pattern_close = abc_pattern['close']

# 模式确认
bullish_abc = (pattern_low < pattern_low.shift()) & (pattern_high > pattern_high.shift())
bearish_abc = (pattern_high > pattern_high.shift()) & (pattern_low < pattern_low.shift())

# 与斐波那契结合
def fibonacci_abc_analysis(high, low, close):
    abc_data = ta.abc(lim=5.0)
    # 计算斐波那契回撤水平
    swing_high = abc_data['high'].rolling(3).max()
    swing_low = abc_data['low'].rolling(3).min()
    range_ = swing_high - swing_low
    
    fib_382 = swing_high - range_ * 0.382
    fib_618 = swing_high - range_ * 0.618
    
    return fib_382, fib_618

fib_levels = fibonacci_abc_analysis(high, low, close)
```

---

### **`insidebar` - 内包线识别函数**

```python
@tobtind(lines=['thrend', 'line'])
def insidebar(self, length=10, **kwargs) -> IndFrame:
```

**功能**：识别内包线模式（Inside Bar），当前K线完全包含在前一根K线范围内

**所需数据字段**：`high`, `low`, `close`

**参数**：

  - `length`：计算周期，默认10
  - `**kwargs`：其他参数

**返回值**：IndFrame，包含thrend（趋势）、line（线）列

**计算公式**：
```
当前高点 <= 前一根高点 and 当前低点 >= 前一根低点
```

**示例**：
```python
# 识别内包线模式
inside_bar_data = ta.insidebar(length=10)

# 提取内包线信号
trend_direction = inside_bar_data['thrend']
inside_bar_line = inside_bar_data['line']

# 内包线出现
inside_bar_occurrence = inside_bar_line == 1

# 趋势上下文中的内包线
uptrend_inside_bar = inside_bar_occurrence & (trend_direction == 1)
downtrend_inside_bar = inside_bar_occurrence & (trend_direction == -1)

# 内包线突破交易
def inside_bar_breakout(high, low, close, length=10):
    inside_data = ta.insidebar(length=length)
    inside_bars = inside_data['line'] == 1
    
    # 内包线后的突破
    next_bar_break_high = (high > high.shift()) & inside_bars.shift()
    next_bar_break_low = (low < low.shift()) & inside_bars.shift()
    
    return next_bar_break_high, next_bar_break_low

breakout_high, breakout_low = inside_bar_breakout(high, low, close)

# 内包线集群分析
inside_bar_cluster = inside_bar_occurrence.rolling(5).sum()
high_compression = inside_bar_cluster >= 3  # 连续3根内包线表示高压缩
```

---

### **`cum` - 累积求和函数**

```python
@tobtind(lines=None, lib='pta')
def cum(self, length=10, **kwargs) -> IndSeries:
```

**功能**：计算滚动窗口内的累积和，类似pandas的rolling sum

**参数**：

  - `length`：滚动窗口长度，默认10
  - `**kwargs`：其他参数

**返回值**：IndSeries，累积和序列

**计算公式**：
```
result = self.rolling(length).sum()
```

**示例**：
```python
# 计算价格累积和
price_cumulative = ta.cum(close, length=10)

# 成交量累积
volume_cumulative = ta.cum(volume, length=5)

# 指标累积分析
rsi_cumulative = ta.cum(ta.rsi(close, 14), length=8)

# 累积突破分析
def cumulative_breakout(price, length=20):
    cum_sum = ta.cum(price, length=length)
    # 累积和突破前高
    cum_breakout = cum_sum > cum_sum.rolling(length).max().shift()
    return cum_breakout

price_cum_breakout = cumulative_breakout(close, 20)

# 多周期累积比较
short_cum = ta.cum(close, length=5)
long_cum = ta.cum(close, length=20)
cum_momentum = short_cum / long_cum
```

---

### **`ZeroDivision` - 零除安全处理函数**

```python
@tobtind(lines=None, lib='pta')
def ZeroDivision(self, b=1.0, **kwargs) -> IndSeries | IndFrame:
```

**功能**：安全的浮点数除法处理，避免除以零的错误

**参数**：

  - `b`：除数，默认1.0
  - `**kwargs`：其他参数

**返回值**：IndSeries或IndFrame，安全除法结果

**计算公式**：
```
if b == 0:
    result = self / 1.0  # 或其他默认值
else:
    result = self / b
```

**示例**：
```python
# 安全的价格比率计算
price_ratio = ta.ZeroDivision(close, close.shift())

# 指标安全计算
def safe_rsi_ratio(rsi1, rsi2):
    return ta.ZeroDivision(rsi1, rsi2)

rsi_relative = safe_rsi_ratio(ta.rsi(close, 14), ta.rsi(close, 28))

# 成交量比率安全计算
volume_ratio = ta.ZeroDivision(volume, volume.rolling(20).mean())

# 自定义零处理
def custom_division(a, b, default=1.0):
    result = ta.ZeroDivision(a, b)
    # 可以进一步处理无穷大或NaN值
    result = result.replace([np.inf, -np.inf], default)
    return result

safe_momentum = custom_division(close.diff(5), close.shift(5), default=0)
```

---

### **`strategy` - 策略函数（不可用）**

```python
@tobtind(lines=None, lib='pta')
def strategy(self, *args, **kwargs):
```

**功能**：策略函数（当前不可用），预留用于复杂策略组合

**参数**：

  - `*args`：可变参数
  - `**kwargs`：关键字参数

**返回值**：未实现

**说明**：此函数当前标记为不可用，可能用于未来的策略组合功能

---
