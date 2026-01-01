# tgsdk.tqta - 技术指标库

**tgsdk.tqta** 提供专业的技术指标计算功能，基于tqsdk.tafunc基础数学运算构建，为量化交易策略开发提供全面的技术分析工具。

## 核心功能

- **趋势指标**：识别市场趋势方向和多空转换
- **摆动指标**：衡量市场超买超卖状态
- **能量指标**：反映市场成交量动能
- **压力支撑指标**：识别价格关键支撑和压力位

## 指标分类说明

### 1. 趋势指标
**功能**：用于识别市场趋势方向和多空转换

| 函数                   | 说明                                         | 参数                                                                                   | 返回值                                |
| ---------------------- | -------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------- |
| `MACD(short, long, m)` | MACD指标：计算MACD指标，包括DIF、DEA、MACD柱 | `short`: 短周期(默认12)<br>`long`: 长周期(默认26)<br>`m`: 信号周期(默认9)              | (DIF序列, DEA序列, MACD柱序列)        |
| `DMI(n, m)`            | 趋向指标：计算+DI、-DI、ADX、ADXR            | `n`: 计算周期(默认14)<br>`m`: 平滑周期(默认6)                                          | (+DI序列, -DI序列, ADX序列, ADXR序列) |
| `DMA(n1, n2, m)`       | 平均差指标：计算DIF、DIFMA                   | `n1`: 短周期(默认10)<br>`n2`: 长周期(默认50)<br>`m`: 移动平均周期(默认10)              | (DIF序列, DIFMA序列)                  |
| `TRIX(n, m)`           | 三重指数平滑平均线：计算TRMA、MATRMA         | `n`: 计算周期(默认12)<br>`m`: 移动平均周期(默认9)                                      | (TRMA序列, MATRMA序列)                |
| `BBI(n1, n2, n3, n4)`  | 多空指标：计算不同周期移动平均的加权平均值   | `n1`: 周期1(默认3)<br>`n2`: 周期2(默认6)<br>`n3`: 周期3(默认12)<br>`n4`: 周期4(默认24) | BBI指标序列                           |

### 2. 摆动指标
**功能**：衡量市场超买超卖状态

| 函数               | 说明                                 | 参数                                                                         | 返回值                            |
| ------------------ | ------------------------------------ | ---------------------------------------------------------------------------- | --------------------------------- |
| `RSI(n)`           | 相对强弱指标：计算n周期RSI值         | `n`: 计算周期(默认14)                                                        | RSI序列                           |
| `KDJ(n, m1, m2)`   | 随机指标：计算K、D、J值              | `n`: 计算周期(默认9)<br>`m1`: K值平滑周期(默认3)<br>`m2`: D值平滑周期(默认3) | (K序列, D序列, J序列)             |
| `WR(n1, n2)`       | 威廉指标：计算威廉超买超卖指标       | `n1`: 周期1(默认10)<br>`n2`: 周期2(默认6)                                    | (WR1序列, WR2序列)                |
| `CCI(n)`           | 商品路径指标：计算顺势指标           | `n`: 计算周期(默认14)                                                        | CCI序列                           |
| `BIAS(n1, n2, n3)` | 乖离率：计算价格与移动平均的偏离程度 | `n1`: 周期1(默认6)<br>`n2`: 周期2(默认12)<br>`n3`: 周期3(默认24)             | (BIAS1序列, BIAS2序列, BIAS3序列) |

### 3. 能量指标
**功能**：反映市场成交量动能

| 函数    | 说明                       | 参数                  | 返回值  |
| ------- | -------------------------- | --------------------- | ------- |
| `OBV()` | 能量潮指标：计算成交量净额 | 无参数                | OBV序列 |
| `VR(n)` | 容量比率：计算成交量比率   | `n`: 计算周期(默认26) | VR序列  |

### 4. 压力支撑指标
**功能**：识别价格关键支撑和压力位

| 函数                  | 说明                                           | 参数                                                                                   | 返回值                                                       |
| --------------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `BOLL(n, p)`          | 布林带指标：计算布林带上轨、中轨、下轨         | `n`: 计算周期(默认20)<br>`p`: 宽度参数(默认2)                                          | (上轨序列, 中轨序列, 下轨序列)                               |
| `MIKE(n)`             | 麦克支撑压力指标：计算初级、中级、强力压力支撑 | `n`: 计算周期(默认12)                                                                  | (初级压力, 中级压力, 强力压力, 初级支撑, 中级支撑, 强力支撑) |
| `BBI(n1, n2, n3, n4)` | 多空指标：计算不同周期移动平均的加权平均值     | `n1`: 周期1(默认3)<br>`n2`: 周期2(默认6)<br>`n3`: 周期3(默认12)<br>`n4`: 周期4(默认24) | BBI指标序列                                                  |

## 使用示例

### 初始化

```python
# 框架内置数据对象（含OHLCV等基础字段）
data = IndFrame(...)
data = IndSeries(...)
tqta = TqTa(data)
# 或策略内使用内置指标数据进行调用
tqta = btindicator.tqta
```

### 趋势指标应用

```python
# 计算MACD指标
dif, dea, macd = tqta.MACD(12, 26, 9)

# 计算DMI趋向指标
pdi, mdi, adx, adxr = tqta.DMI(14, 6)

# 计算三重指数平滑平均线
trix, matrix = tqta.TRIX(12, 9)
```

### 摆动指标应用

```python
# 计算RSI相对强弱指标
rsi_14 = tqta.RSI(14)

# 计算KDJ随机指标
k, d, j = tqta.KDJ(9, 3, 3)

# 计算CCI商品路径指标
cci = tqta.CCI(20)
```

### 压力支撑指标应用

```python
# 计算布林带
upper, middle, lower = tqta.BOLL(20, 2)

# 判断价格是否突破布林带上轨
break_upper = close > upper

# 计算多空指标
bbi = tqta.BBI(3, 6, 12, 24)
```

### 能量指标应用

```python
# 计算能量潮指标
obv = tqta.OBV()

# 计算成交量比率
vr = tqta.VR(26)
```

### 综合策略示例

```python
# 金叉死叉策略
dif, dea, macd = tqta.MACD(12, 26, 9)
golden_cross = tqta.crossup(dif, dea)  # MACD金叉
death_cross = tqta.crossdown(dif, dea)  # MACD死叉

# 布林带突破策略
upper, middle, lower = tqta.BOLL(20, 2)
breakout_signal = close > upper  # 上轨突破
pullback_signal = close < lower  # 下轨跌破

# 多指标共振
rsi = tqta.RSI(14)
k, d, j = tqta.KDJ(9, 3, 3)
multi_signal = (golden_cross) & (rsi > 50) & (k > d)  # 多指标共振买入信号
```

## 技术特点

1. **专业指标**：涵盖主流技术分析指标
2. **参数灵活**：支持自定义指标参数
3. **向量计算**：基于tafunc的高性能序列计算
4. **实时更新**：支持实时数据流指标计算
5. **多市场适用**：适用于股票、期货、数字货币等市场

## 注意事项

- 所有指标计算需要足够的历史数据长度
- 不同指标对数据周期有不同要求
- 建议结合实际市场环境使用指标
- 多指标组合使用可提高信号可靠性
- 注意指标在震荡和趋势行情中的表现差异

## 指标参数建议

### 常用参数设置
- **短线交易**：使用较小周期参数（如5、10、20）
- **中线投资**：使用中等周期参数（如20、30、60）
- **长线投资**：使用较大周期参数（如60、120、250）

### 多时间框架分析
建议结合不同时间周期的指标进行分析，如：
- 日线判断趋势方向
- 小时线寻找入场时机
- 分钟线精确定位

注：技术指标仅供参考，投资决策需结合多方面因素综合分析

---

## 技术指标参考

### `ATR` - 平均真实波幅指标

```python
@tobtind(lib="tqta")
def ATR(self, n=14, **kwargs) -> IndFrame:
```
**功能**：衡量价格波动性的重要技术指标，反映市场波动剧烈程度

**应用场景**：

- 波动率测量和风险评估
- 止损止盈位设置参考
- 突破交易信号确认
- 仓位管理和风险控制

**计算原理**：

```
真实波幅(TR)取以下三者最大值：
1. 当日最高价 - 当日最低价
2. |当日最高价 - 前日收盘价|
3. |当日最低价 - 前日收盘价|
平均真实波幅(ATR) = TR的N周期简单移动平均
```

**参数**：
   - `n`：计算周期，默认14，常用周期为14
   - `**kwargs`：额外参数

**注意**：

- ATR值本身没有上下限，数值大小与价格和波动性相关
- 适用于不同时间周期的分析
- 可作为动态止损止盈的参考依据

**返回值**：IndFrame - 包含"tr"(真实波幅)和"atr"(平均真实波幅)两列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# 使用ATR设置动态止损
atr_data = data.tqta.ATR(n=14) # data所需数据字段:`high`, `low`, `close`
stop_loss = close - 2 * atr_data.atr
take_profit = close + 3 * atr_data.atr

# 波动率过滤
high_volatility = atr_data.atr > atr_data.atr.tqta.MA(length=20)

# ATR突破信号
atr_breakout = atr_data.atr > atr_data.atr.tqfunc.ref(1) * 1.5
```

---

### `BIAS` - 乖离率指标

```python
@tobtind(lib="tqta")
def BIAS(self, n=6, **kwargs) -> IndSeries:
```
**功能**：衡量价格与移动平均线偏离程度的动量指标，识别超买超卖状态

**应用场景**：

- 趋势反转预警
- 超买超卖区域识别
- 均值回归策略构建
- 价格极端状态判断

**计算原理**：
```
BIAS = (收盘价 - N周期移动平均价) / N周期移动平均价 × 100%
正值表示价格在均线上方，负值表示在均线下方
```

**参数**：

- `n`：移动平均周期，默认6，常用周期有6、12、24
- `**kwargs`：额外参数

**注意**：

- 不同市场、不同品种的乖离率阈值需要调整
- 在强势趋势中可能出现持续超买/超卖
- 建议结合其他指标共同使用

**返回值**：IndSeries - 乖离率值序列，单位为百分比

**所需数据字段**：`close`

**示例**：

```python
# 乖离率超买超卖判断
bias_6 = close.tqta.BIAS(n=6)
over_bought = bias_6 > 5    # 6日乖离率大于5%视为超买
over_sold = bias_6 < -5     # 6日乖离率小于-5%视为超卖

# 多周期乖离率组合
bias_short = close.tqta.BIAS(n=6)
bias_long = close.tqta.BIAS(n=24)
bias_divergence = bias_short - bias_long

# 乖离率回归策略
bias_signal = bias_6 < -8  # 过度偏离时准备回归
```

---

### `BOLL` - 布林带指标

```python
@tobtind(lib="tqta")
def BOLL(self, n=26, p=2, **kwargs) -> IndFrame:
```

**功能**：构建动态价格通道，识别价格相对位置和波动性变化

**应用场景**：

- 支撑阻力位识别
- 波动率突破信号
- 趋势强度和持续性判断
- 价格极端状态识别

**计算原理**：

```
中轨 = N周期简单移动平均
标准差 = N周期收盘价标准差
上轨 = 中轨 + P × 标准差
下轨 = 中轨 - P × 标准差
```

**参数**：

- `n`：计算周期，默认26
- `p`：标准差倍数，默认2，决定通道宽度
- `**kwargs`：额外参数

**注意**：

- 价格触及布林带上轨不一定卖出，触及下轨不一定买入
- 布林带收窄往往预示重大价格变动
- 结合价格与布林带相对位置判断趋势强度

**返回值**：IndFrame - 包含"mid"(中轨)、"top"(上轨)、"bottom"(下轨)三列

**所需数据字段**：`close`

**示例**：

```python
# 布林带突破策略
boll = close.tqta.BOLL(n=20, p=2)
upper_break = close > boll.top     # 上轨突破
lower_break = close < boll.bottom   # 下轨突破

# 布林带收窄识别
band_width = (boll.top- boll.bottom) / boll.mid
narrow_band = band_width < band_width.tqta.MA(length=20)

# 布林带 squeeze 策略
squeeze_signal = band_width == band_width.tqfunc.llv(length=20)
```

---

### `DMI` - 动向指标系统

```python
@tobtind(lib="tqta")
def DMI(self, n=14, m=6, **kwargs) -> IndFrame:
```

**功能**：综合趋势强度和方向的分析工具，通过多维度分析趋势

**应用场景**：

- 趋势方向确认
- 趋势强度量化
- 买卖信号生成
- 趋势转换预警

**计算原理**：

```
+DM = 当日最高价 - 前日最高价（正值）
-DM = 前日最低价 - 当日最低价（正值）
TR = 真实波幅
+DI = (+DM的N周期平滑 / TR的N周期平滑) × 100
-DI = (-DM的N周期平滑 / TR的N周期平滑) × 100
DX = |(+DI - -DI)| / (+DI + -DI) × 100
ADX = DX的M周期平滑移动平均
```

**参数**：

- `n`：主要计算周期，默认14
- `m`：ADX平滑周期，默认6
- `**kwargs`：额外参数

**注意**：

- +DI上穿-DI为买入信号，下穿为卖出信号
- ADX高于25表示趋势明显，低于20表示盘整
- ADXR用于评估ADX的可靠性

**返回值**：IndFrame - 包含"atr"、"pdi"、"mdi"、"adx"、"adxr"五列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# DMI趋势判断
dmi = data.tqta.DMI(n=14, m=6)
strong_trend = dmi.adx > 25          # 强趋势
weak_trend = dmi.adx < 20           # 弱趋势/盘整
buy_signal = dmi.pdi.tqta.crossup(dmi.mdi)  # 买入信号
sell_signal = dmi.pdi.tqta.crossdown(dmi.mdi) # 卖出信号

# 趋势强度过滤
valid_buy = buy_signal & strong_trend
```

---

### `KDJ` - 随机指标

```python
@tobtind(lib="tqta")
def KDJ(self, n=9, m1=3, m2=3, **kwargs) -> IndFrame:
```

**功能**：动量振荡器，识别超买超卖和背离信号，分析市场动量变化

**应用场景**：

- 超买超卖区域识别
- 背离分析
- 短线买卖时机把握
- 趋势转换预警

**计算原理**：

```
RSV = (收盘价 - N日内最低价) / (N日内最高价 - N日内最低价) × 100
K = RSV的M1周期简单移动平均
D = K的M2周期简单移动平均
J = 3 × K - 2 × D
```

**参数**：

- `n`：RSV计算周期，默认9
- `m1`：K值平滑周期，默认3
- `m2`：D值平滑周期，默认3
- `**kwargs`：额外参数

**注意**：

- K、D值在80以上为超买区，20以下为超卖区
- J值反应更敏感，可提前预警
- 金叉死叉结合位置判断更有效
- 背离信号具有较高可靠性

**返回值**：IndFrame - 包含"k"、"d"、"j"三列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# KDJ超买超卖判断
kdj = data.tqta.KDJ(n=9, m1=3, m2=3)
over_bought = (kdj.k > 80) & (kdj.d > 80)
over_sold = (kdj.k < 20) & (kdj.d < 20)

# KDJ金叉死叉
golden_cross = kdj.k.tqta.crossup(kdj.d)
death_cross = kdj.k.tqta.crossdown(kdj.d)

# J值极端信号
j_extreme = kdj.j > 100  # 极度超买
j_extreme_low = kdj.j < 0  # 极度超卖
```

---

### `MACD` - 指数平滑异同移动平均线

```python
@tobtind(lib="tqta", linestyle=dict(diff=LineStyle(line_dash=LineDash.vbar)))
def MACD(self, short=12, long=26, m=9, **kwargs) -> IndFrame:
```

**功能**：经典的趋势动量指标，通过快慢均线离差分析趋势方向和动量变化

**应用场景**：

- 趋势方向判断
- 买卖信号生成
- 背离分析
- 动量强度评估

**计算原理**：
```
DIF = 12日EMA - 26日EMA
DEA = DIF的9日EMA
MACD柱 = (DIF - DEA) × 2
```

**参数**：

- `short`：快线周期，默认12
- `long`：慢线周期，默认26
- `m`：信号线周期，默认9
- `**kwargs`：额外参数

**注意**：

- DIF上穿DEA为金叉买入信号
- DIF下穿DEA为死叉卖出信号
- 零轴上方为多头市场，下方为空头市场
- 柱状线颜色变化反映动量增减

**返回值**：IndFrame - 包含"diff"(DIF)、"dea"(DEA)、"bar"(MACD柱)三列

**所需数据字段**：`close`

**示例**：

```python
# MACD基础信号
macd = close.tqta.MACD(short=12, long=26, m=9)
bull_market = macd.diff > 0                    # 多头市场
golden_cross = macd.diff.tqta.crossup(macd.dea)  # 金叉
death_cross = macd.diff.tqta.crossdown(macd.dea) # 死叉

# MACD柱状线分析
momentum_increasing = macd.bar > macd.bar.tqfunc.ref(1)

# 零轴突破信号
zero_break = macd.diff.tqta.crossup(0)
```

---

### `SAR` - 抛物线停损指标

```python
@tobtind(lib="tqta")
def SAR(self, n=4, step=0.02, max=0.2, **kwargs) -> IndSeries:
```

**功能**：趋势跟踪和停损点设置工具，提供动态的停损点和趋势转换信号

**应用场景**：

- 趋势方向判断
- 动态止损位设置
- 趋势转换预警
- 长线持仓管理

**计算原理**：

```
基于极值点和加速因子动态计算停损点
上升趋势：SAR = 前日SAR + AF × (前日最高价 - 前日SAR)
下降趋势：SAR = 前日SAR + AF × (前日最低价 - 前日SAR)
AF从step开始，每创新高/新低增加step，直到达到max
```

**参数**：

- `n`：初始周期，默认4
- `step`：步长/加速因子，默认0.02
- `max`：最大加速因子，默认0.2
- `**kwargs`：额外参数

**注意**：

- 价格在SAR之上为上升趋势，之下为下降趋势
- SAR点翻转即为买卖信号
- 在震荡市中可能产生频繁假信号
- 适合趋势明显的市场环境

**返回值**：IndSeries - SAR值序列

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：

```python
# SAR趋势判断
sar = data.tqta.SAR(n=4, step=0.02, max=0.2)
uptrend = close > sar                    # 上升趋势
downtrend = close < sar                  # 下降趋势

# SAR翻转信号
buy_signal = (close.tqfunc.ref(1) < sar.tqfunc.ref(1)) & (close > sar)
sell_signal = (close.tqfunc.ref(1) > sar.tqfunc.ref(1)) & (close < sar)

# 动态止损应用
stop_loss = sar  # 使用SAR作为动态止损位
```

---

### `WR` - 威廉指标

```python
@tobtind(lib="tqta")
def WR(self, n=14, **kwargs) -> IndSeries:
```

**功能**：超买超卖振荡器，测量价格相对位置，识别极端状态

**应用场景**：

- 超买超卖区域识别
- 短期反转点预测
- 市场极端情绪判断
- 结合其他指标确认信号

**计算原理**：

```
WR = (N日内最高价 - 当日收盘价) / (N日内最高价 - N日内最低价) × (-100)
数值在0到-100之间，0为超卖，-100为超买
```

**参数**：

- `n`：计算周期，默认14
- `**kwargs`：额外参数

**注意**：

- 传统用法：低于-80超买，高于-20超卖
- 可结合价格行为过滤假信号
- 在强势趋势中可能出现指标钝化
- 多周期WR组合使用效果更好

**返回值**：IndSeries - WR值序列，范围为-100到0

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# WR超买超卖判断
wr = data.tqta.WR(n=14)
over_bought = wr < -80      # 超买区域
over_sold = wr > -20        # 超卖区域

# WR背离分析
price_new_high = close == close.tqfunc.hhv(20)
wr_new_low = wr == wr.tqfunc.llv(20)
bearish_divergence = price_new_high & wr_new_low  # 顶背离

# 多周期WR确认
wr_fast = data.tqta.WR(n=6)
wr_slow = data.tqta.WR(n=14)
confirmed_signal = (wr_fast < -80) & (wr_slow < -80)
```

---

### `RSI` - 相对强弱指标

```python
@tobtind(lib="tqta")
def RSI(self, n=7, **kwargs) -> IndSeries:
```

**功能**：动量振荡器，衡量价格变动速度和幅度，评估买卖力量对比

**应用场景**：

- 超买超卖状态识别
- 背离分析
- 趋势强度评估
- 买卖时机选择

**计算原理**：

```
RSI = 100 - 100 / (1 + RS)
RS = N日内上涨幅度平均值 / N日内下跌幅度平均值
```

**参数**：

- `n`：计算周期，默认7，常用周期有6、12、24
- `**kwargs`：额外参数

**注意**：

- 传统用法：70以上超买，30以下超卖
- 可调整阈值适应不同市场特性
- 背离信号具有较高预测价值
- 在强势趋势中可能长时间停留在超买/超卖区

**返回值**：IndSeries - RSI值序列，范围0-100

**所需数据字段**：`close`

**示例**：

```python
# RSI超买超卖判断
rsi = close.tqta.RSI(n=14)
over_bought = rsi > 70      # 超买
over_sold = rsi < 30        # 超卖

# RSI背离检测
price_lower_low = close < close.tqfunc.ref(1)
rsi_higher_low = rsi > rsi.tqfunc.ref(1)
bullish_divergence = price_lower_low & rsi_higher_low  # 底背离

# RSI趋势线突破
rsi_ma = rsi.tqta.MA(10)
rsi_break = rsi.tqta.crossup(rsi_ma)
```

---

### `ASI` - 振动升降指标

```python
@tobtind(lib="tqta")
def ASI(self, **kwargs) -> IndSeries:
```

**功能**：精确定价指标，通过复杂计算消除跳空影响，更准确反映价格真实走势

**应用场景**：

- 趋势方向精确认定
- 突破信号验证
- 价格真实性判断
- 结合其他指标提高准确性

**计算原理**：

```
ASI累计计算每个交易日的振动值
基于开盘、最高、最低、收盘价和前一交易日价格
通过复杂公式计算当日SI值并累计得到ASI
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- ASI领先或同步于价格走势
- 突破前高前低时ASI信号更可靠
- 与OBV类似但计算更复杂
- 适合判断价格走势的真实性

**返回值**：IndSeries - ASI值序列

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：

```python
# ASI突破信号
asi = data.tqta.ASI()
price_break_high = close > close.tqfunc.hhv(20)
asi_break_high = asi > asi.tqfunc.hhv(20)
valid_breakout = price_break_high & asi_break_high  # 有效突破

# ASI趋势确认
asi_uptrend = asi > asi.tqta.MA(20)
asi_downtrend = asi < asi.tqta.MA(20)

# ASI背离分析
price_down_asi_up = (close < close.tqfunc.ref(1)) & (asi > asi.tqfunc.ref(1))
```

---
### **`VR` - 容量比率指标**

```python
@tobtind(lib="tqta")
def VR(self, n=26, **kwargs) -> IndSeries:
```

**功能**：量价关系分析工具，衡量成交量与价格关系，通过成交量变化分析资金流向和市场情绪

**应用场景**：

- 量价背离分析
- 资金流向判断
- 趋势确认和反转预警
- 超买超卖区域识别

**计算原理**：

```
VR = (N日内上涨日成交量总和 + N日内平盘日成交量总和/2) / 
     (N日内下跌日成交量总和 + N日内平盘日成交量总和/2) × 100
反映多空双方力量对比
```

**参数**：

- `n`：计算周期，默认26
- `**kwargs`：额外参数

**注意**：
- VR在40-70为低价区，80-150为安全区，160-450为获利区，450以上为警戒区
- 低VR值配合价格底部往往是买入时机
- 高VR值配合价格顶部需警惕反转
- 与价格走势背离时信号更可靠

**返回值**：IndSeries - VR值序列

**所需数据字段**：`close`, `volume`

**示例**：

```python
# VR超买超卖判断
vr = data.tqta.VR(n=26)
oversold_area = vr < 70          # 低价区
safe_area = (vr >= 80) & (vr <= 150)  # 安全区
profit_area = (vr >= 160) & (vr <= 450) # 获利区
warning_area = vr > 450          # 警戒区

# VR与价格背离
price_new_high = close == close.tqfunc.hhv(20)
vr_divergence = vr < vr.tqfunc.ref(1)
top_divergence = price_new_high & vr_divergence

# VR趋势确认
vr_uptrend = vr > vr.tqta.MA(10)
vr_downtrend = vr < vr.tqta.MA(10)
```

---

### **`ARBR` - 人气意愿指标系统**

```python
@tobtind(lib="tqta")
def ARBR(self, n=26, **kwargs) -> IndFrame:
```

**功能**：综合反映市场多空力量对比，AR衡量市场人气，BR反映买卖意愿

**应用场景**：

- 市场情绪判断
- 多空力量对比分析
- 趋势转换预警
- 超买超卖识别

**计算原理**：

```
AR = (N日内(最高价 - 开盘价)之和 / N日内(开盘价 - 最低价)之和) × 100
BR = (N日内(当日最高价 - 前日收盘价)之和 / N日内(前日收盘价 - 当日最低价)之和) × 100
```

**参数**：

- `n`：计算周期，默认26
- `**kwargs`：额外参数

**注意**：

- AR在80-120为盘整区，150以上超买，70以下超卖
- BR在70-150为盘整区，300以上超买，50以下超卖
- AR、BR同时急升预示趋势强劲
- BR急剧下降而AR平稳时可能见底

**返回值**：IndFrame - 包含"ar"(人气指标)、"br"(意愿指标)两列

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：

```python
# ARBR超买超卖判断
arbr = data.tqta.ARBR(n=26)
ar_overbought = arbr.ar > 150
ar_oversold = arbr.ar < 70
br_overbought = arbr.br > 300
br_oversold = arbr.br < 50

# ARBR同步分析
strong_uptrend = (arbr.ar > 100) & (arbr.br > 100)
strong_downtrend = (arbr.ar < 100) & (arbr.br < 100)

# ARBR背离信号
price_high_ar_low = (close == close.tqfunc.hhv(20)) & (arbr.ar < arbr.ar.tqfunc.ref(1))
```

---

### **`DMA` - 平行线差指标**

```python
@tobtind(lib="tqta")
def DMA(self, short=10, long=50, m=10, **kwargs) -> IndFrame:
```

**功能**：基于移动平均线差值的趋势分析工具，通过长短周期均线差值分析趋势方向和强度

**应用场景**：

- 趋势方向判断
- 买卖信号生成
- 趋势强度量化
- 均线系统优化

**计算原理**：

```
DDD = 短期移动平均 - 长期移动平均
AMA = DDD的M周期移动平均
```

**参数**：

- `short`：短期周期，默认10
- `long`：长期周期，默认50
- `m`：平滑周期，默认10
- `**kwargs`：额外参数

**注意**：

- DDD上穿AMA为金叉买入信号
- DDD下穿AMA为死叉卖出信号
- DDD在零轴上方为多头市场
- 配合价格走势使用效果更好

**返回值**：IndFrame - 包含"ddd"(均线差值)、"ama"(差值均线)两列

**所需数据字段**：`close`

**示例**：

```python
# DMA基础信号
dma = close.tqta.DMA(short=10, long=50, m=10)
bull_market = dma.ddd > 0                    # 多头市场
golden_cross = dma.ddd.tqta.crossup(dma.ama)  # 金叉
death_cross = dma.ddd.tqta.crossdown(dma.ama) # 死叉

# DMA趋势强度
trend_strength = dma.ddd.abs() / close.tqta.MA(long)
strong_trend = trend_strength > 0.05

# 多周期DMA组合
dma_fast = close.tqta.DMA(short=5, long=20, m=5)
dma_slow = close.tqta.DMA(short=20, long=60, m=10)
multi_signal = (dma_fast.ddd > 0) & (dma_slow.ddd > 0)
```

---

### **`EXPMA` - 指数加权移动平均线组合**

```python
@tobtind(lib="tqta")
def EXPMA(self, p1=5, p2=10, **kwargs) -> IndFrame:
```

**功能**：对近期价格赋予更高权重的均线系统，提供对价格变化更敏感的移动平均线

**应用场景**：

- 趋势方向早期识别
- 短线交易信号
- 动态支撑阻力位
- 均线交叉策略

**计算原理**：

```
EMA = α × 当日收盘价 + (1 - α) × 前日EMA
α = 2 / (N + 1)
```

**参数**：

- `p1`：短期EMA周期，默认5
- `p2`：长期EMA周期，默认10
- `**kwargs`：额外参数

**注意**：

- 短期EMA上穿长期EMA为买入信号
- 对价格变化反应比SMA更敏感
- 在震荡市中可能产生较多假信号
- 适合趋势明显的市场环境

**返回值**：IndFrame - 包含"ma1"(短期EMA)、"ma2"(长期EMA)两列

**所需数据字段**：`close`

**示例**：

```python
# EXPMA交叉策略
expma = close.tqta.EXPMA(p1=5, p2=10)
fast_above_slow = expma.ma1 > expma.ma2      # 快线在慢线上方
buy_signal = expma.ma1.tqta.crossup(expma.ma2) # 金叉买入
sell_signal = expma.ma1.tqta.crossdown(expma.ma2) # 死叉卖出

# 价格与EXPMA关系
support_level = expma.ma1.tqta.min(expma.ma2)  # 支撑位
resistance_level = expma.ma1.tqta.max(expma.ma2) # 阻力位

# 多时间框架EXPMA
expma_short = close.tqta.EXPMA(p1=3, p2=6)
expma_long = close.tqta.EXPMA(p1=10, p2=20)
confirmed_trend = (expma_short.ma1 > expma_short.ma2) & (expma_long.ma1 > expma_long.ma2)
```

---

### **`CR` - 能量指标**

```python
@tobtind(lib="tqta")
def CR(self, n=26, m=5, **kwargs) -> IndFrame:
```

**功能**：反映价格动量和市场人气的综合指标，通过中间价与前一交易日比较分析多空力量对比

**应用场景**：

- 市场能量判断
- 趋势强度分析
- 买卖时机选择
- 价格动量评估

**计算原理**：

```
CR = (N日内(当日最高价+最低价)/2 - 前一日中间价的正值之和) / 
     (N日内(前一日中间价 - 当日最高价+最低价)/2的正值之和) × 100
CRMA = CR的M周期移动平均
```

**参数**：

- `n`：CR计算周期，默认26
- `m`：CRMA平滑周期，默认5
- `**kwargs`：额外参数

**注意**：

- CR在100附近表示多空平衡
- CR急升表示能量聚集，可能突破
- CR与价格顶背离是卖出信号
- 配合ARBR使用效果更好

**返回值**：IndFrame - 包含"cr"(能量指标)、"crma"(CR均线)两列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# CR能量分析
cr_data = data.tqta.CR(n=26, m=5)
energy_accumulation = cr_data.cr > 150          # 能量聚集
energy_dispersion = cr_data.cr < 50            # 能量分散
balance_area = (cr_data.cr >= 80) & (cr_data.cr <= 120) # 多空平衡

# CR与价格背离
price_high = close == close.tqfunc.hhv(20)
cr_low = cr_data.cr < cr_data.cr.tqfunc.ref(1)
bearish_divergence = price_high & cr_low

# CR趋势确认
cr_above_ma = cr_data.cr > cr_data.crma
cr_below_ma = cr_data.cr < cr_data.crma
```

---

### **`CCI` - 顺势指标**

```python
@tobtind(lib="tqta")
def CCI(self, n=14, **kwargs) -> IndSeries:
```

**功能**：测量价格偏离统计平均程度的振荡器，识别超买超卖状态和趋势转换点

**应用场景**：

- 超买超卖判断
- 趋势转换预警
- 极端价格状态识别
- 短线交易时机选择

**计算原理**：

```
典型价格 = (最高价 + 最低价 + 收盘价) / 3
CCI = (典型价格 - N期典型价格移动平均) / (0.015 × N期典型价格平均绝对偏差)
```

**参数**：

- `n`：计算周期，默认14
- `**kwargs`：额外参数

**注意**：

- CCI在+100以上为超买区，-100以下为超卖区
- +100以上回落为卖出信号，-100以下回升为买入信号
- 在强势趋势中可能长时间停留在超买/超卖区
- 适合短线交易和极端状态识别

**返回值**：IndSeries - CCI值序列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# CCI超买超卖信号
cci = data.tqta.CCI(n=14)
overbought = cci > 100                    # 超买区域
oversold = cci < -100                     # 超卖区域
buy_signal = cci.tqta.crossup(-100)        # 从超卖区回升
sell_signal = cci.tqta.crossdown(100)      # 从超买区回落

# CCI趋势强度
strong_uptrend = cci > 0
strong_downtrend = cci < 0

# CCI背离分析
price_new_low = close == close.tqfunc.llv(20)
cci_higher_low = cci > cci.tqfunc.llv(20)
bullish_divergence = price_new_low & cci_higher_low
```

---

### **`OBV` - 能量潮指标**

```python
@tobtind(lib="tqta")
def OBV(self, **kwargs) -> IndSeries:
```

**功能**：通过成交量变动预测价格变动的先行指标，将成交量数量化制成趋势线配合价格趋势判断

**应用场景**：

- 量价关系分析
- 趋势确认
- 背离分析
- 资金流向判断

**计算原理**：

```
如果当日收盘价 > 前日收盘价，则OBV = 前日OBV + 当日成交量
如果当日收盘价 < 前日收盘价，则OBV = 前日OBV - 当日成交量
如果当日收盘价 = 前日收盘价，则OBV = 前日OBV
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- OBV与价格同步上升为健康上涨
- OBV与价格顶背离是卖出信号
- OBV突破前高确认价格上涨
- 适合中长期趋势分析

**返回值**：IndSeries - OBV值序列

**所需数据字段**：`close`, `volume`

**示例**：

```python
# OBV趋势分析
obv = data.tqta.OBV()
obv_uptrend = obv > obv.tqta.MA(20)        # OBV上升趋势
obv_downtrend = obv < obv.tqta.MA(20)      # OBV下降趋势

# OBV背离检测
price_new_high = close == close.tqfunc.hhv(20)
obv_divergence = obv < obv.tqfunc.hhv(20)
top_divergence = price_new_high & obv_divergence  # 顶背离

# OBV突破确认
obv_breakout = obv > obv.tqfunc.hhv(20)      # OBV突破前高

# OBV与价格同步分析
healthy_uptrend = (close > close.tqta.MA(20)) & (obv > obv.tqta.MA(20))
```

---

### **`CDP` - 逆势操作指标**

```python
@tobtind(lib="tqta")
def CDP(self, n=3, **kwargs) -> IndFrame:
```

**功能**：短线交易的反向操作工具，为短线交易者提供支撑阻力位参考

**应用场景**：

- 短线支撑阻力位识别
- 日内交易点位选择
- 震荡市高抛低吸
- 突破交易确认

**计算原理**：

```
CDP = (前日最高 + 前日最低 + 前日收盘 × 2) / 4
AH = CDP + (前日最高 - 前日最低)
NH = CDP × 2 - 前日最低
NL = CDP × 2 - 前日最高
AL = CDP - (前日最高 - 前日最低)
```

**参数**：

- `n`：参考周期，默认3
- `**kwargs`：额外参数

**注意**：

- 价格在NL和NH之间震荡时适合反向操作
- 突破AH或AL可能形成趋势
- 适合短线日内交易
- 在趋势明显的市场中效果较差

**返回值**：IndFrame - 包含"ah"(最高值)、"al"(最低值)、"nh"(近高值)、"nl"(近低值)四列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# CDP交易区间判断
cdp = data.tqta.CDP(n=3)
in_trading_range = (close > cdp.nl) & (close < cdp.nh)  # 震荡区间
breakout_up = close > cdp.ah                              # 向上突破
breakout_down = close < cdp.al                            # 向下跌破

# CDP短线交易策略
buy_zone = close <= cdp.nl        # 买入区域
sell_zone = close >= cdp.nh       # 卖出区域
stop_loss_long = cdp.al          # 多头止损
stop_loss_short = cdp.ah         # 空头止损

# CDP与波动率结合
volatility = (cdp.ah - cdp.al) / close
high_volatility = volatility > 0.03
```

---

### **`HCL` - 均线通道指标**

```python
@tobtind(lib="tqta")
def HCL(self, n=10, **kwargs) -> IndFrame:
```

**功能**：基于高、低、收盘价的移动平均通道系统，构建价格波动通道识别趋势方向

**应用场景**：

- 趋势方向判断
- 波动范围测量
- 支撑阻力位构建
- 突破交易信号

**计算原理**：

```
MAH = 最高价的N周期移动平均
MAL = 最低价的N周期移动平均  
MAC = 收盘价的N周期移动平均
```

**参数**：

- `n`：移动平均周期，默认10
- `**kwargs`：额外参数

**注意**：

- 价格在MAH和MAL之间波动为震荡市
- 突破MAH为强势上涨信号
- 跌破MAL为强势下跌信号
- MAC代表趋势方向

**返回值**：IndFrame - 包含"mah"(最高价均线)、"mal"(最低价均线)、"mac"(收盘价均线)三列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# HCL通道分析
hcl = data.tqta.HCL(n=10)
in_channel = (close >= hcl.mal) & (close <= hcl.mah)  # 通道内震荡
breakout_up = close > hcl.mah                           # 向上突破
breakdown = close < hcl.mal                             # 向下跌破

# 趋势方向判断
uptrend = (hcl.mac > hcl.mac.tqfunc.ref(1)) & 
         (hcl.mah > hcl.mah.tqfunc.ref(1))
downtrend = (hcl.mac < hcl.mac.tqfunc.ref(1)) & 
           (hcl.mal < hcl.mal.tqfunc.ref(1))

# 通道宽度分析
channel_width = (hcl.mah - hcl.mal) / hcl.mac
narrow_channel = channel_width < channel_width.tqta.MA(10)
```

---

### **`ENV` - 包络线指标**

```python
@tobtind(lib="tqta")
def ENV(self, n=14, k=6, **kwargs) -> IndFrame:
```

**功能**：基于移动平均线的动态通道系统，在移动平均线上下构建固定百分比的通道

**应用场景**：

- 动态支撑阻力位
- 超买超卖识别
- 趋势跟踪
- 回归均值策略

**计算原理**：

```
中线 = 收盘价的N周期移动平均
上轨 = 中线 × (1 + K%)
下轨 = 中线 × (1 - K%)
```

**参数**：

- `n`：移动平均周期，默认14
- `k`：通道宽度参数，默认6，表示6%
- `**kwargs`：额外参数

**注意**：

- 价格触及上轨可能回调，触及下轨可能反弹
- 在趋势市中价格可能沿通道运行
- 通道宽度需要根据波动性调整
- 适合均值回归策略

**返回值**：IndFrame - 包含"upper"(上轨)、"lower"(下轨)两列

**所需数据字段**：`close`

**示例**：

```python
# ENV通道交易策略
env = close.tqta.ENV(n=14, k=6)
overbought = close > env.upper                  # 触及上轨超买
oversold = close < env.lower                    # 触及下轨超卖
middle_line = (env.upper + env.lower) / 2    # 通道中线

# 回归均值策略
buy_signal = (close < env.lower) & 
            (close.tqfunc.ref(1) >= env.lower.tqfunc.ref(1))
sell_signal = (close > env.upper) & 
             (close.tqfunc.ref(1) <= env.upper.tqfunc.ref(1))

# 通道突破策略
env_breakout = close > env.upper
env_breakdown = close < env.lower
```
<!-- # 自适应通道宽度
volatility = close.tqfunc.std(20) / close.tqta.MA(20)
adaptive_k = 6 * (1 + volatility * 10)
adaptive_env = close.tqta.ENV(n=14, k=adaptive_k)
``` -->

---

### **`MIKE` - 麦克指标**

```python
@tobtind(lib="tqta")
def MIKE(self, n=12, **kwargs) -> IndFrame:
```

**功能**：压力支撑分析系统，通过复杂计算提供六条不同级别的支撑阻力位

**应用场景**：

- 多级支撑阻力位识别
- 价格目标位预测
- 突破交易确认
- 区间震荡交易

**计算原理**：

```
基于典型价格和价格波动幅度计算六个不同级别的支撑阻力位：
WR(初级压力)、MR(中级压力)、SR(强力压力)
WS(初级支撑)、MS(中级支撑)、SS(强力支撑)
```

**参数**：

- `n`：计算周期，默认12
- `**kwargs`：额外参数

**注意**：

- 价格在WS-WR之间为正常波动区间
- 突破WR可能向MR、SR运行
- 跌破WS可能向MS、SS运行
- 适合中短线交易和仓位管理

**返回值**：IndFrame - 包含"wr"(初级压力)、"mr"(中级压力)、"sr"(强力压力)、"ws"(初级支撑)、"ms"(中级支撑)、"ss"(强力支撑)六列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# MIKE支撑阻力分析
mike = data.tqta.MIKE(n=12)
normal_range = (close >= mike.ws) & (close <= mike.wr)  # 正常区间
strong_resistance = close > mike.sr                       # 强力阻力区
strong_support = close < mike.ss                          # 强力支撑区

# 突破交易信号
break_resistance = (close.tqfunc.ref(1) <= mike.wr) & (close > mike.wr)
break_support = (close.tqfunc.ref(1) >= mike.ws) & (close < mike.ws)

# 多级支撑阻力应用
target_up1 = mike.wr  # 第一目标位
target_up2 = mike.mr  # 第二目标位
target_up3 = mike.sr  # 第三目标位
```

---

### **`PUBU` - 瀑布线指标**

```python
@tobtind(lib="tqta")
def PUBU(self, m=4, **kwargs) -> IndSeries:
```

**功能**：非线性移动平均系统，通过特殊的移动平均计算方法过滤价格噪音

**应用场景**：

- 趋势方向过滤
- 买卖信号生成
- 价格噪音消除
- 趋势跟踪策略

**计算原理**：

```
基于收盘价计算特殊的移动平均线，算法相对复杂，
旨在平滑价格波动，突出主要趋势方向
```

**参数**：

- `m`：计算周期，默认4
- `**kwargs`：额外参数

**注意**：

- 瀑布线上涨为多头趋势，下跌为空头趋势
- 价格在瀑布线上方运行为强势
- 适合趋势明显的市场环境
- 在震荡市中可能产生假信号

**返回值**：IndSeries - 瀑布线值序列

**所需数据字段**：`close`

**示例**：

```python
# 瀑布线趋势判断
pubu = close.tqta.PUBU(m=4)
uptrend = pubu > pubu.tqfunc.ref(1)          # 上升趋势
downtrend = pubu < pubu.tqfunc.ref(1)        # 下降趋势

# 价格与瀑布线关系
strong_bull = close > pubu                       # 强势多头
weak_bull = (close > pubu) & (close < close.tqfunc.ref(1))  # 弱势多头
price_breakout = (close.tqfunc.ref(1) <= pubu) & (close > pubu)  # 价格突破

# 瀑布线角度分析
pubu_angle = (pubu - pubu.tqfunc.ref(5)) / pubu.tqfunc.ref(5)
strong_trend = (pubu_angle).abs() > 0.03
```

---

### **`BBI` - 多空指数**

```python
@tobtind(lib="tqta")
def BBI(self, n1=3, n2=6, n3=12, n4=24, **kwargs) -> IndSeries:
```

**功能**：多周期移动平均综合指标，综合不同时间周期的移动平均线提供更全面的趋势判断

**应用场景**：

- 多周期趋势综合分析
- 买卖点确认
- 趋势强度评估
- 均线系统简化

**计算原理**：

```
BBI = (3日均价 + 6日均价 + 12日均价 + 24日均价) / 4
综合短、中、长期移动平均线的优势
```

**参数**：

- `n1`：短期周期，默认3
- `n2`：中短期周期，默认6
- `n3`：中期周期，默认12
- `n4`：长期周期，默认24
- `**kwargs`：额外参数

**注意**：

- 价格在BBI上方为多头市场
- BBI上升角度反映趋势强度
- 可作为其他指标的参考基准
- 适合各类时间周期的分析

**返回值**：IndSeries - BBI值序列

**所需数据字段**：`close`

**示例**：

```python
# BBI多空判断
bbi = close.tqta.BBI(n1=3, n2=6, n3=12, n4=24)
bull_market = close > bbi                         # 多头市场
bear_market = close < bbi                         # 空头市场

# BBI趋势强度
bbi_trend_strength = (bbi - bbi.tqfunc.ref(5)) / bbi.tqfunc.ref(5)
strong_trend = (bbi_trend_strength).abs() > 0.02     # 强势趋势

# BBI突破信号
break_bull = (close.tqfunc.ref(1) <= bbi) & (close > bbi)    # 向上突破
break_bear = (close.tqfunc.ref(1) >= bbi) & (close < bbi)    # 向下跌破

# 自适应BBI参数
volatility = close.tqfunc.std(20) / close.tqta.MA(20)
adaptive_bbi = close.tqta.BBI(n1=3, n2=int(6*(1+volatility)), n3=12, n4=24)
```

---

### **`DKX` - 多空线指标**

```python
@tobtind(lib="tqta")
def DKX(self, m=10, **kwargs) -> IndFrame:
```

**功能**：综合价格和成交量的多空力量分析，通过复杂算法判断多空力量对比

**应用场景**：

- 多空力量对比分析
- 趋势方向确认
- 买卖时机选择
- 量价关系验证

**计算原理**：

```
基于开盘、最高、最低、收盘价和中间价计算多空线，
再计算其移动平均作为参考线
```

**参数**：

- `m`：移动平均周期，默认10
- `**kwargs`：额外参数

**注意**：

- 多空线上穿其均线为买入信号
- 多空线下穿其均线为卖出信号
- 两者同步上升为强势多头
- 适合中短线交易

**返回值**：IndFrame - 包含"b"(多空线)、"d"(多空线均线)两列

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：

```python
# DKX多空信号
dkx = data.tqta.DKX(m=10)
bull_signal = tqta.crossup(dkx.b, dkx.d)      # 多头信号
bear_signal = tqta.crossdown(dkx.b, dkx.d)    # 空头信号

# 多空力量强度
strong_bull = (dkx.b > dkx.d) & (dkx.b > dkx.b.tqfunc.ref(1))
strong_bear = (dkx.b < dkx.d) & (dkx.b < dkx.b.tqfunc.ref(1))

# DKX与价格背离
price_high = close == close。tqfunc.hhv(20)
dkx_low = dkx.b < dkx.b.tqfunc.ref(1)
top_divergence = price_high & dkx_low

# DKX量价确认
volume_confirmation = (dkx.b > dkx.d) & (volume > volume。tqta.MA(20))
```

---

### **`BBIBOLL` - 多空布林线**

```python
@tobtind(lib="tqta")
def BBIBOLL(self, n=10, m=3, **kwargs) -> IndFrame:
```

**功能**：BBI与布林带结合的趋势通道系统，提供趋势和波动性双重分析

**应用场景**：

- 趋势通道分析
- 波动率测量
- 超买超卖判断
- 突破交易信号

**计算原理**：

```
BBIBOLL = BBI多空指数
UPR = BBIBOLL + M × BBIBOLL的N周期标准差
DWN = BBIBOLL - M × BBIBOLL的N周期标准差
```

**参数**：

- `n`：BBI计算周期参数，默认10
- `m`：标准差倍数，默认3
- `**kwargs`：额外参数

**注意**：

- 价格在通道内运行为震荡市
- 突破上轨可能继续上涨，跌破下轨可能继续下跌
- 通道收窄预示重大价格变动
- 适合趋势跟踪和突破策略

**返回值**：IndFrame - 包含"bbiboll"(多空布林线)、"upr"(压力线)、"dwn"(支撑线)三列

**所需数据字段**：`close`

**示例**：

```python
# BBIBOLL通道分析
bbiboll = close.tqta.BBIBOLL(n=10, m=3)
in_channel = (close >= bbiboll.dwn) & (close <= bbiboll.upr)  # 通道内
breakout_up = close > bbiboll.upr                               # 向上突破
breakdown = close < bbiboll.dwn                                 # 向下跌破

# 通道宽度分析
channel_width = (bbiboll.upr - bbiboll.dwn) / bbiboll.bbiboll
narrow_channel = channel_width < channel_width.tqta.MA(20)   # 通道收窄
wide_channel = channel_width > channel_width.tqta.MA(20)     # 通道扩张

# BBIBOLL与BBI关系
above_bbi = close > bbiboll.bbiboll                      # 价格在BBI上方
below_bbi = close < bbiboll.bbiboll                      # 价格在BBI下方
```

---

### **`ADTM` - 动态买卖气指标**

```python
@tobtind(lib="tqta")
def ADTM(self, n=23, m=8, **kwargs) -> IndFrame:
```

**功能**：衡量市场动态买卖力量的振荡器，通过价格在区间内的相对位置分析买卖力量动态变化

**应用场景**：

- 买卖力量对比
- 超买超卖判断
- 趋势转换预警
- 短线交易时机

**计算原理**：

```
基于开盘价与价格区间的关系计算动态买卖气，
再计算其移动平均作为参考
```

**参数**：

- `n`：主要计算周期，默认23
- `m`：移动平均周期，默认8
- `**kwargs`：额外参数

**注意**：

- ADTM在0轴上方为买方主导
- ADTM在0轴下方为卖方主导
- 上穿0轴为买入信号，下穿0轴为卖出信号
- 适合震荡市和反转交易

**返回值**：IndFrame - 包含"adtm"(动态买卖气)、"adtmma"(买卖气均线)两列

**所需数据字段**：`open`, `high`, `low`

**示例**：

```python
# ADTM多空判断
adtm = data.tqta.ADTM(n=23, m=8)
buyer_dominant = adtm.adtm > 0                 # 买方主导
seller_dominant = adtm.adtm < 0                # 卖方主导

# ADTM交易信号
buy_signal = adtm.adtm.tqta.crossup(0)          # 买入信号
sell_signal = adtm.adtm.tqta.crossdown(0)       # 卖出信号

# ADTM与均线关系
strong_buy = (adtm.adtm > adtm.adtmma) & (adtm.adtm > 0)
strong_sell = (adtm.adtm < adtm.adtmma) & (adtm.adtm < 0)

# ADTM极端值识别
extreme_buy = adtm.adtm > adtm.adtm.tqfunc.hhv(20) * 0.8
extreme_sell = adtm.adtm < adtm.adtm.tqfunc.llv(20) * 0.8
```

---

### **`B3612` - 三减六日乖离率**

```python
@tobtind(lib="tqta")
def B3612(self, **kwargs) -> IndFrame:
```

**功能**：短期均线乖离分析系统，通过不同周期移动平均线的乖离关系分析短期趋势动量

**应用场景**：

- 短期趋势动量分析
- 均线系统优化
- 买卖时机选择
- 趋势强度评估

**计算原理**：

```
B36 = 3日移动平均 - 6日移动平均
B612 = 6日移动平均 - 12日移动平均
反映不同周期均线之间的偏离程度
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- B36反映极短期动量变化
- B612反映短期趋势方向
- 两者同向为趋势确认
- 适合短线交易和趋势确认

**返回值**：IndFrame - 包含"b36"(3-6日乖离)、"b612"(6-12日乖离)两列

**所需数据字段**：`close`

**示例**：

```python
# B3612动量分析
b3612 = close.tqta.B3612()
short_momentum = b3612.b36 > 0                 # 短期动量向上
medium_trend = b3612.b612 > 0                  # 中期趋势向上

# 多周期协同
strong_uptrend = (b3612.b36 > 0) & (b3612.b612 > 0)  # 强势上涨
trend_reversal = (b3612.b36 > 0) & (b3612.b612 < 0)  # 趋势转换

# 乖离率极端值
extreme_bull = b3612.b36 > b3612.b36.tqfunc.hhv(20) * 0.8
extreme_bear = b3612.b36 < b3612.b36.tqfunc.llv(20) * 0.8

# B3612交叉信号
b36_cross = b3612.b36.tqta.crossup(0)           # B36上穿零轴
b612_cross = b3612.b612.tqta.crossup(0)         # B612上穿零轴
```

---

### **`DBCD` - 异同离差乖离率**

```python
@tobtind(lib="tqta")
def DBCD(self, n=5, m=16, t=76, **kwargs) -> IndFrame:
```

**功能**：乖离率的优化版本，通过复杂的乖离率计算和平滑处理减少噪音干扰

**应用场景**：

- 趋势方向过滤
- 买卖信号生成
- 价格偏离度分析
- 中长期趋势判断

**计算原理**：

```
基于BIAS乖离率进行多级计算和平滑处理，
得到更稳定的DBCD指标及其移动平均
```

**参数**：

- `n`：BIAS计算周期，默认5
- `m`：第一次平滑周期，默认16
- `t`：第二次平滑周期，默认76
- `**kwargs`：额外参数

**注意**：

- DBCD上穿其均线为买入信号
- DBCD下穿其均线为卖出信号
- 指标波动较小，信号相对稳定
- 适合中长线趋势跟踪

**返回值**：IndFrame - 包含"dbcd"(异同离差乖离率)、"mm"(乖离率均线)两列

**所需数据字段**：`close`

**示例**：

```python
# DBCD趋势信号
dbcd = close.tqta.DBCD(n=5, m=16, t=76)
buy_signal = dbcd.dbcd.tqta.crossup(dbcd.mm)  # 买入信号
sell_signal = dbcd.dbcd.tqta.crossdown(dbcd.mm) # 卖出信号

# DBCD趋势强度
uptrend_strength = dbcd.dbcd - dbcd.mm       # 上升趋势强度
downtrend_strength = dbcd.mm - dbcd.dbcd     # 下降趋势强度

# 零轴分析
above_zero = dbcd.dbcd > 0                      # 零轴上方
below_zero = dbcd.dbcd < 0                      # 零轴下方

# DBCD背离检测
price_new_low = close == close.tqfunc.llv(20)
dbcd_higher = dbcd.dbcd > dbcd.dbcd.tqfunc.llv(20)
bullish_divergence = price_new_low & dbcd_higher
```

---

### **`DDI` - 方向标准离差指数**

```python
@tobtind(lib="tqta")
def DDI(self, n=13, n1=30, m=10, m1=5, **kwargs) -> IndFrame:
```

**功能**：趋势方向和波动性综合指标，通过价格波动方向和幅度分析趋势强度和持续性

**应用场景**：

- 趋势方向确认
- 波动性分析
- 买卖信号生成
- 趋势强度量化

**计算原理**：

```
基于最高最低价计算方向离差，通过多级平滑得到DDI、ADDI、AD等指标
```

**参数**：

- `n`：方向计算周期，默认13
- `n1`：离差计算周期，默认30
- `m`：第一次平滑周期，默认10
- `m1`：第二次平滑周期，默认5
- `**kwargs`：额外参数

**注意**：

- DDI反映短期趋势方向
- ADDI反映中期趋势强度
- AD确认趋势持续性
- 三者同步为趋势确认

**返回值**：IndFrame - 包含"ddi"(方向离差)、"addi"(加权平均)、"ad"(移动平均)三列

**所需数据字段**：`high`, `low`

**示例**：

```python
# DDI趋势系统
ddi = data.tqta.DDI(n=13, n1=30, m=10, m1=5)
trend_confirmed = (ddi.ddi > 0) & (ddi.addi > 0) & (ddi.ad > 0)  # 趋势确认

# DDI强度分级
strong_uptrend = ddi.ddi > ddi.ddi.tqfunc.hhv(20) * 0.7
weak_uptrend = (ddi.ddi > 0) & (ddi.ddi < ddi.ddi.tqta.MA(10))

# 趋势转换信号
trend_turn_up = (ddi.ddi.tqfunc.ref(1) <= 0) & (ddi.ddi > 0)
trend_turn_down = (ddi.ddi.tqfunc.ref(1) >= 0) & (ddi.ddi < 0)

# DDI与价格波动
high_volatility = (high.tqfunc.hhv(20) - low.tqfunc.llv(20)) / close > 0.05
ddi_volatility_signal = (ddi.ddi > 0) & high_volatility
```

---

### **`KD` - 随机指标(KD)**

```python
@tobtind(lib="tqta")
def KD(self, n=9, m1=3, m2=3, **kwargs) -> IndFrame:
```

**功能**：KDJ指标的简化版本，去除J值，通过价格在周期内相对位置分析市场动量和超买超卖状态

**应用场景**：

- 超买超卖判断
- 短线买卖时机
- 背离分析
- 趋势转换预警

**计算原理**：

```
RSV = (收盘价 - N日内最低价) / (N日内最高价 - N日内最低价) × 100
K = RSV的M1周期简单移动平均
D = K的M2周期简单移动平均
```

**参数**：

- `n`：RSV计算周期，默认9
- `m1`：K值平滑周期，默认3
- `m2`：D值平滑周期，默认3
- `**kwargs`：额外参数

**注意**：

- K、D值在80以上为超买区，20以下为超卖区
- K线上穿D线为金叉买入信号
- K线下穿D线为死叉卖出信号
- 背离信号可靠性较高

**返回值**：IndFrame - 包含"k"(K值)、"d"(D值)两列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# KD超买超卖判断
kd = data.tqta.KD(n=9, m1=3, m2=3)
overbought = (kd.k > 80) & (kd.d > 80)      # 超买区域
oversold = (kd.k < 20) & (kd.d < 20)        # 超卖区域

# KD交易信号
golden_cross = kd.k.tqta.crossup(kd.d)       # 金叉买入
death_cross = kd.k.tqta.crossdown(kd.d)      # 死叉卖出

# KD位置分析
bull_zone = (kd.k > 50) & (kd.d > 50)       # 多头区域
bear_zone = (kd.k < 50) & (kd.d < 50)       # 空头区域

# KD背离策略
price_new_high = close == close.tqfunc.hhv(20)
kd_lower_high = (kd.k < kd.k.tqfunc.ref(1)) & (kd.d < kd.d.tqfunc.ref(1))
bearish_divergence = price_new_high & kd_lower_high
```

---
### **`LWR` - 威廉指标(LWR)**

```python
@tobtind(lib="tqta")
def LWR(self, n=9, m=3, **kwargs) -> IndSeries:
```

**功能**：反向威廉指标，与WR指标计算方式相反，通过价格在周期内相对位置分析市场动量和超买超卖状态

**应用场景**：

- 超买超卖判断
- 短线买卖时机
- 背离分析
- 趋势转换预警

**计算原理**：

```
LWR = (N日内最低价 - 当日收盘价) / (N日内最高价 - N日内最低价) × (-100)
数值在0到-100之间，但方向与WR指标相反
```

**参数**：

- `n`：计算周期，默认9
- `m`：平滑周期，默认3
- `**kwargs`：额外参数

**注意**：

- LWR在-20以下为超买区，-80以上为超卖区
- 与传统WR指标数值方向相反
- 可结合其他指标确认信号
- 在强势趋势中可能出现指标钝化

**返回值**：IndSeries - LWR值序列，范围为-100到0

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# LWR超买超卖判断
lwr = data.tqta.LWR(n=9, m=3)
overbought = lwr < -20      # 超买区域
oversold = lwr > -80        # 超卖区域

# LWR背离分析
price_new_high = close == close.tqfunc.hhv(20)
lwr_new_low = lwr < lwr.tqfunc.llv(20)
bearish_divergence = price_new_high & lwr_new_low  # 顶背离

# LWR与均线关系
lwr_ma = lwr.tqta.MA(10)
lwr_above_ma = lwr > lwr_ma  # LWR在均线上方
lwr_below_ma = lwr < lwr_ma  # LWR在均线下方
```

---

### **`MASS` - 梅斯线指标**

```python
@tobtind(lib="tqta")
def MASS(self, n1=9, n2=25, **kwargs) -> IndSeries:
```

**功能**：价格波动幅度和强度测量工具，通过高低价区间分析价格波动幅度

**应用场景**：

- 趋势转折预警
- 波动性爆发识别
- 突破信号确认
- 价格极端状态判断

**计算原理**：

```
基于最高最低价区间计算波动幅度，通过两次指数移动平均得到MASS线
反映价格波动的强度和频率
```

**参数**：

- `n1`：第一次EMA周期，默认9
- `n2`：第二次EMA周期，默认25
- `**kwargs`：额外参数

**注意**：

- MASS高于27后回落为趋势转折信号
- MASS线急剧上升预示波动性增加
- 适合识别价格波动的极端状态
- 常与其他趋势指标结合使用

**返回值**：IndSeries - MASS值序列

**所需数据字段**：`high`, `low`

**示例**：

```python
# MASS趋势转折信号
mass = data.tqta.MASS(n1=9, n2=25)
reversal_signal = (mass.tqfunc.ref(1) > 27) & (mass <= 27)  # 转折信号

# 波动性分析
high_volatility = mass > mass.tqta.MA(20)                # 高波动期
low_volatility = mass < mass.tqta.MA(20)                 # 低波动期

# MASS突破预警
mass_breakout = mass > mass.tqfunc.hhv(20)                 # 波动性爆发

# MASS与ATR结合
atr_data = data.tqta.ATR(14)
volatility_confirmed = (mass > 25) & (atr_data.atr > atr_data.atr.tqta.MA(20))
```

---

### **`MFI` - 资金流量指标**

```python
@tobtind(lib="tqta")
def MFI(self, n=14, **kwargs) -> IndSeries:
```

**功能**：带成交量的相对强弱指标，结合价格和成交量分析资金流向

**应用场景**：

- 资金流向分析
- 超买超卖判断
- 背离分析
- 量价关系验证

**计算原理**：

```
MFI计算方式类似RSI，但加入了成交量因素
典型价格 = (最高 + 最低 + 收盘) / 3
资金流 = 典型价格 × 成交量
通过正负资金流比率计算MFI
```

**参数**：

- `n`：计算周期，默认14
- `**kwargs`：额外参数

**注意**：

- MFI在80以上为超买区，20以下为超卖区
- 与价格背离时信号更可靠
- 反映资金的实际流入流出
- 适合中短线交易分析

**返回值**：IndSeries - MFI值序列，范围0-100

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：

```python
# MFI超买超卖判断
mfi = data.tqta.MFI(n=14)
overbought = mfi > 80                    # 超买
oversold = mfi < 20                      # 超卖

# MFI资金流向
money_inflow = mfi > 50                  # 资金流入
money_outflow = mfi < 50                 # 资金流出

# MFI与价格背离
price_high = close == close.tqfunc.hhv(20)
mfi_low = mfi < mfi.tqfunc.ref(1)
top_divergence = price_high & mfi_low    # 顶背离

# MFI与OBV确认
obv = tqta.OBV()
mfi_obv_confirmed = (mfi > 50) & (obv > obv.tqta.MA(20))
```

---

### **`MI` - 动量指标**

```python
@tobtind(lib="tqta")
def MI(self, n=12, **kwargs) -> IndFrame:
```

**功能**：价格变动速率和方向分析，测量价格变动速度和幅度

**应用场景**：

- 趋势动量分析
- 买卖时机选择
- 趋势强度评估
- 反转信号预警

**计算原理**：

```
A = 当日收盘价 - N日前收盘价
MI = A的平滑处理值
反映价格在N周期内的变动动量
```

**参数**：

- `n`：计算周期，默认12
- `**kwargs`：额外参数

**注意**：

- MI为正表示上升动量，为负表示下降动量
- MI上穿零轴为买入信号，下穿零轴为卖出信号
- 动量极值往往预示趋势转折
- 适合趋势跟踪和动量策略

**返回值**：IndFrame - 包含"a"(价格差值)、"mi"(动量指标)两列

**所需数据字段**：`close`

**示例**：

```python
# MI动量分析
mi_data = close.tqta.MI(n=12)
positive_momentum = mi_data.mi > 0                  # 正动量
negative_momentum = mi_data.mi < 0                  # 负动量

# MI交易信号
buy_signal = mi_data.mi.tqta.crossup(0)              # 上穿零轴买入
sell_signal = mi_data.mi.tqta.crossdown(0)           # 下穿零轴卖出

# 动量极值识别
momentum_extreme = (mi_data.mi).abs() > (mi_data.mi).abs().tqta.MA(20) * 2

# MI与价格差值关系
strong_momentum = (mi_data.mi > 0) & (mi_data.a > mi_data.a.tqta.MA(10))
```

---

### **`MICD` - 异同离差动力指数**

```python
@tobtind(lib="tqta")
def MICD(self, n=3, n1=10, n2=20, **kwargs) -> IndFrame:
```

**功能**：动量指标的MACD版本，在动量指标基础上进行离差分析

**应用场景**：

- 动量趋势分析
- 买卖信号生成
- 趋势转换预警
- 动量强度量化

**计算原理**：

```
基于动量指标进行多周期离差计算
DIF = 短期动量 - 长期动量
MICD = DIF的平滑移动平均
类似MACD但对动量指标进行计算
```

**参数**：

- `n`：动量计算周期，默认3
- `n1`：短期周期，默认10
- `n2`：长期周期，默认20
- `**kwargs`：额外参数

**注意**：

- DIF上穿MICD为金叉买入信号
- DIF下穿MICD为死叉卖出信号
- 零轴上方为多头动量，下方为空头动量
- 适合中短线动量交易

**返回值**：IndFrame - 包含"dif"(离差值)、"micd"(异同离差动力指数)两列

**所需数据字段**：`close`

**示例**：

```python
# MICD动量信号
micd_data = close.tqta.MICD(n=3, n1=10, n2=20)
bull_momentum = micd_data.dif > 0                    # 多头动量
golden_cross = micd_data.dif.tqta.crossup(micd_data.micd)  # 金叉
death_cross = micd_data.dif.tqta.crossdown(micd_data.micd) # 死叉

# 动量强度分析
momentum_strength = (micd_data.dif - micd_data.micd).abs()
strong_momentum = momentum_strength > momentum_strength.tqta.MA(20)

# MICD与价格关系
price_confirmation = (micd_data.dif > 0) & (close > close.tqta.MA(20))
```

---

### **`MTM` - 动量指标(MTM)**

```python
@tobtind(lib="tqta")
def MTM(self, n=6, n1=6, **kwargs) -> IndFrame:
```

**功能**：经典的价格动量振荡器，测量价格变化速率

**应用场景**：

- 趋势动量分析
- 超买超卖判断
- 背离分析
- 买卖时机选择

**计算原理**：

```
MTM = 当日收盘价 - N日前收盘价
MTMMA = MTM的M周期简单移动平均
反映价格在N周期内的变动动量
```

**参数**：

- `n`：动量计算周期，默认6
- `n1`：移动平均周期，默认6
- `**kwargs`：额外参数

**注意**：

- MTM上穿零轴为买入信号，下穿零轴为卖出信号
- MTM与价格顶背离是卖出信号
- MTM与价格底背离是买入信号
- 适合各类时间周期的分析

**返回值**：IndFrame - 包含"mtm"(动量值)、"mtmma"(动量均线)两列

**所需数据字段**：`close`

**示例**：

```python
# MTM动量分析
mtm_data = close.tqta.MTM(n=6, n1=6)
positive_momentum = mtm_data.mtm > 0                # 正动量
momentum_cross = mtm_data.mtm.tqta.crossup(mtm_data.mtmma)  # 动量金叉

# MTM背离分析
price_new_high = close == close.tqfunc.hhv(20)
mtm_lower_high = mtm_data.mtm < mtm_data.mtm.tqfunc.ref(1)
bearish_divergence = price_new_high & mtm_lower_high  # 顶背离

# MTM超买超卖
overbought = mtm_data.mtm > mtm_data.mtm.tqfunc.hhv(20) * 0.8
oversold = mtm_data.mtm < mtm_data.mtm.tqfunc.llv(20) * 0.8

# MTM与均线交叉
mtm_signal = mtm_data.mtm.tqta.crossup(mtm_data.mtmma)
```

---

### **`PRICEOSC` - 价格震荡指数**

```python
@tobtind(lib="tqta")
def PRICEOSC(self, long=26, short=12, **kwargs) -> IndSeries:
```

**功能**：长短周期移动平均离差指标，通过长短周期移动平均线的离差分析价格动量和趋势方向

**应用场景**：

- 趋势方向判断
- 动量强度分析
- 买卖信号生成
- 趋势转换预警

**计算原理**：

```
PRICEOSC = (短期移动平均 - 长期移动平均) / 长期移动平均 × 100
反映长短周期均线的相对位置关系
```

**参数**：

- `long`：长期周期，默认26
- `short`：短期周期，默认12
- `**kwargs`：额外参数

**注意**：

- PRICEOSC上穿零轴为买入信号
- PRICEOSC下穿零轴为卖出信号
- 数值大小反映趋势强度
- 适合趋势跟踪和动量策略

**返回值**：IndSeries - 价格震荡指数序列，单位为百分比

**所需数据字段**：`close`

**示例**：

```python
# PRICEOSC趋势判断
priceosc = close.tqta.PRICEOSC(long=26, short=12)
bull_market = priceosc > 0                        # 多头市场
bear_market = priceosc < 0                        # 空头市场

# PRICEOSC交易信号
buy_signal = priceosc.tqta.crossup(0)              # 上穿零轴买入
sell_signal = priceosc.tqta.crossdown(0)           # 下穿零轴卖出

# 趋势强度分析
trend_strength = (priceosc).abs()
strong_trend = trend_strength > trend_strength.tqta.MA(20)

# PRICEOSC与MACD结合
macd_data = close.tqta.MACD(12, 26, 9)
confirmed_signal = (priceosc > 0) & (macd_data.diff > 0)
```

---

### **`PSY` - 心理线指标**

```python
@tobtind(lib="tqta")
def PSY(self, n=12, m=6, **kwargs) -> IndFrame:
```

**功能**：投资者情绪和心理状态测量工具，通过上涨天数比率分析市场心理状态

**应用场景**：

- 市场情绪分析
- 超买超卖判断
- 趋势转换预警
- 投资者心理测量

**计算原理**：

```
PSY = (N日内上涨天数 / N) × 100
PSYMA = PSY的M周期简单移动平均
反映投资者在N周期内的心理状态
```

**参数**：

- `n`：计算周期，默认12
- `m`：移动平均周期，默认6
- `**kwargs`：额外参数

**注意**：

- PSY在75以上为超买区，25以下为超卖区
- PSY与价格背离时信号更可靠
- 反映市场集体心理状态
- 适合逆向投资策略

**返回值**：IndFrame - 包含"psy"(心理线)、"psyma"(心理线均线)两列

**所需数据字段**：`close`

**示例**：

```python
# PSY心理状态分析
psy_data = close.tqta.PSY(n=12, m=6)
over_optimistic = psy_data.psy > 75                 # 过度乐观
over_pessimistic = psy_data.psy < 25                # 过度悲观

# PSY交易信号
buy_zone = (psy_data.psy < 25) & (psy_data.psy.tqfunc.ref(1) >= 25)
sell_zone = (psy_data.psy > 75) & (psy_data.psy.tqfunc.ref(1) <= 75)

# PSY与均线关系
sentiment_improving = psy_data.psy > psy_data.psyma   # 情绪改善
sentiment_deteriorating = psy_data.psy < psy_data.psyma # 情绪恶化

# PSY极端情绪
extreme_fear = psy_data.psy < 20
extreme_greed = psy_data.psy > 80
```

---

### **`QHLSR` - 阻力指标**
```python
@tobtind(lib="tqta")
def QHLSR(self, **kwargs) -> IndFrame:
```

**功能**：量价关系阻力分析系统，通过价格和成交量关系分析市场阻力和支撑水平

**应用场景**：

- 阻力支撑位识别
- 量价关系分析
- 突破交易确认
- 市场强度评估

**计算原理**：

```
基于最高、最低、收盘价和成交量计算阻力系数
QHL5: 5日阻力系数
QHL10: 10日阻力系数
反映价格在成交量配合下的阻力程度
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- QHL值越高表示阻力越大
- QHL值接近1表示强阻力，接近0表示弱阻力
- 可结合价格位置判断阻力有效性
- 适合突破交易和区间交易

**返回值**：IndFrame - 包含"qhl5"(5日阻力)、"qhl10"(10日阻力)两列

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：

```python
# QHLSR阻力分析
qhlsr_data = data.tqta.QHLSR()
strong_resistance = qhlsr_data.qhl5 > 0.8           # 强阻力
weak_resistance = qhlsr_data.qhl5 < 0.2             # 弱阻力

# 阻力变化分析
resistance_increasing = qhlsr_data.qhl5 > qhlsr_data.qhl5.tqfunc.ref(1)
resistance_decreasing = qhlsr_data.qhl5 < qhlsr_data.qhl5.tqfunc.ref(1)

# 多周期阻力对比
short_term_stronger = qhlsr_data.qhl5 > qhlsr_data.qhl10  # 短期阻力更强

# 阻力与价格突破
breakout_confirmation = (close > close.tqfunc.hhv(20)) & (qhlsr_data.qhl5 < 0.3)
```

---

### **`RC` - 变化率指数**

```python
@tobtind(lib="tqta")
def RC(self, n=50, **kwargs) -> IndSeries:
```

**功能**：价格变动速率标准化指标，测量价格变化速率并进行标准化处理

**应用场景**：

- 价格变动速率分析
- 趋势强度比较
- 动量策略构建
- 跨品种分析

**计算原理**：

```
RC = 当日收盘价 / N日前收盘价
反映价格在N周期内的变化比率
```

**参数**：

- `n`：计算周期，默认50
- `**kwargs`：额外参数

**注意**：

- RC大于1表示上涨，小于1表示下跌
- RC值大小反映变动幅度
- 便于不同品种间的动量比较
- 适合动量投资和趋势跟踪

**返回值**：IndSeries - 变化率指数序列

**所需数据字段**：`close`

**示例**：

```python
# RC变化率分析
rc = close.tqta.RC(n=50)
price_up = rc > 1                                # 价格上涨
price_down = rc < 1                              # 价格下跌

# 变动幅度分析
strong_rise = rc > 1.1                           # 强势上涨
strong_fall = rc < 0.9                           # 强势下跌

# RC与移动平均结合
rc_ma = rc.tqta.MA(20)
momentum_above_average = rc > rc_ma
```

---

### **`RCCD` - 异同离差变化率指数**

```python
@tobtind(lib="tqta")
def RCCD(self, n=10, n1=21, n2=28, **kwargs) -> IndFrame:
```

**功能**：RC指标的MACD版本，在变化率指标基础上进行离差分析，提供更稳定的变化率信号

**应用场景**：

- 变化率趋势分析
- 买卖信号生成
- 动量转换预警
- 跨周期变化率比较

**计算原理**：

```
基于变化率指标进行多周期离差计算
DIF = 短期变化率 - 长期变化率
RCCD = DIF的平滑移动平均
类似MACD但对变化率指标进行计算
```

**参数**：

- `n`：基础变化率周期，默认10
- `n1`：短期周期，默认21
- `n2`：长期周期，默认28
- `**kwargs`：额外参数

**注意**：

- DIF上穿RCCD为金叉买入信号
- DIF下穿RCCD为死叉卖出信号
- 零轴上方为正向变化率，下方为负向变化率
- 适合中长线趋势分析

**返回值**：IndFrame - 包含"dif"(离差值)、"rccd"(异同离差变化率指数)两列

**所需数据字段**：`close`

**示例**：

```python
# RCCD变化率信号
rccd_data = close.tqta.RCCD(n=10, n1=21, n2=28)
positive_change = rccd_data.dif > 0                  # 正向变化
golden_cross = rccd_data.dif.tqta.crossup(rccd_data.rccd)  # 金叉
death_cross = rccd_data.dif.tqta.crossdown(rccd_data.rccd) # 死叉

# 变化率强度分析
change_strength = (rccd_data.dif - rccd_data.rccd).abs()
strong_change = change_strength > change_strength.tqta.MA(20)

# RCCD零轴分析
above_zero = rccd_data.dif > 0                      # 零轴上方
below_zero = rccd_data.dif < 0                      # 零轴下方
```

---

### **`ROC` - 变动速率指标**

```python
@tobtind(lib="tqta")
def ROC(self, n=24, m=20, **kwargs) -> IndFrame:
```

**功能**：价格变化百分比动量振荡器，测量价格变化的百分比速率

**应用场景**：

- 动量强度分析
- 超买超卖判断
- 趋势转换预警
- 买卖时机选择

**计算原理**：

```
ROC = (当日收盘价 - N日前收盘价) / N日前收盘价 × 100
ROCMA = ROC的M周期简单移动平均
反映价格在N周期内的百分比变化率
```

**参数**：

- `n`：计算周期，默认24
- `m`：移动平均周期，默认20
- `**kwargs`：额外参数

**注意**：

- ROC上穿零轴为买入信号，下穿零轴为卖出信号
- ROC极值往往预示趋势转折
- 与价格背离时信号更可靠
- 适合各类时间周期的动量分析

**返回值**：IndFrame - 包含"roc"(变动速率)、"rocma"(变动速率均线)两列

**所需数据字段**：`close`

**示例**：

```python
# ROC动量分析
roc_data = close.tqta.ROC(n=24, m=20)
positive_momentum = roc_data.roc > 0                # 正动量
momentum_cross = roc_data.roc.tqta.crossup(roc_data.rocma)  # 动量金叉

# ROC超买超卖
overbought = roc_data.roc > roc_data.roc.tqfunc.hhv(20) * 0.8
oversold = roc_data.roc < roc_data.roc.tqfunc.llv(20) * 0.8

# ROC背离分析
price_new_high = close == close.tqfunc.hhv(20)
roc_lower_high = roc_data.roc < roc_data.roc.tqfunc.ref(1)
bearish_divergence = price_new_high & roc_lower_high  # 顶背离

# ROC与价格确认
confirmed_uptrend = (roc_data.roc > 0) & (close > close.tqta.MA(20))
```

---

### **`SLOWKD` - 慢速随机指标**

```python
@tobtind(lib="tqta")
def SLOWKD(self, n=9, m1=3, m2=3, m3=3, **kwargs) -> IndFrame:
```

**功能**：KDJ指标的平滑版本，通过多次平滑处理减少KD指标的波动

**应用场景**：

- 超买超卖判断
- 趋势转换确认
- 买卖信号过滤
- 中长线交易时机

**计算原理**：

```
在标准KD计算基础上进行多次平滑处理
经过m1、m2、m3三次平滑得到最终的K、D值
信号更稳定但响应更慢
```

**参数**：

- `n`：RSV计算周期，默认9
- `m1`：第一次平滑周期，默认3
- `m2`：第二次平滑周期，默认3
- `m3`：第三次平滑周期，默认3
- `**kwargs`：额外参数

**注意**：

- K、D值在80以上为超买区，20以下为超卖区
- 信号比标准KD更稳定但滞后
- 适合中长线趋势跟踪
- 减少震荡市中的假信号

**返回值**：IndFrame - 包含"k"(慢速K值)、"d"(慢速D值)两列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# SLOWKD超买超卖判断
slowkd_data = data.tqta.SLOWKD(n=9, m1=3, m2=3, m3=3)
overbought = (slowkd_data.k > 80) & (slowkd_data.d > 80)  # 超买
oversold = (slowkd_data.k < 20) & (slowkd_data.d < 20)    # 超卖

# SLOWKD交易信号
golden_cross = slowkd_data.k.tqta.crossup(slowkd_data.d)   # 金叉
death_cross = slowkd_data.k.tqta.crossdown(slowkd_data.d)  # 死叉

# 趋势区域判断
bull_zone = (slowkd_data.k > 50) & (slowkd_data.d > 50)   # 多头区域
bear_zone = (slowkd_data.k < 50) & (slowkd_data.d < 50)   # 空头区域

# SLOWKD与标准KD比较
kd_data = data.tqta.KD(9, 3, 3)
slowkd_advantage = (slowkd_data.k - slowkd_data.d).abs() < (kd_data.k - kd_data.d).abs()
```

---

### **`SRDM` - 动向速度比率**

```python
@tobtind(lib="tqta")
def SRDM(self, n=30, **kwargs) -> IndFrame:
```

**功能**：价格变动速度和方向综合指标，综合分析价格变动速度和方向

**应用场景**：

- 趋势速度分析
- 买卖力量对比
- 趋势持续性判断
- 动量强度量化

**计算原理**：

```
基于价格变动计算动向速度比率
SRDM: 原始动向速度值
ASRDM: SRDM的加权移动平均
反映价格变动的速度和方向特征
```

**参数**：

- `n`：计算周期，默认30
- `**kwargs`：额外参数

**注意**：

- SRDM值反映变动速度，ASRDM反映速度趋势
- 两者同向为趋势确认
- 数值大小反映变动强度
- 适合趋势跟踪和动量策略

**返回值**：IndFrame - 包含"srdm"(动向速度比率)、"asrdm"(加权平均)两列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# SRDM趋势分析
srdm_data = data.tqta.SRDM(n=30)
fast_movement = srdm_data.srdm > srdm_data.srdm.tqta.MA(20)  # 快速变动
trend_confirmed = (srdm_data.srdm > 0) & (srdm_data.asrdm > 0)     # 上升趋势确认

# 速度变化分析
accelerating = srdm_data.srdm > srdm_data.srdm.tqfunc.ref(1)   # 加速
decelerating = srdm_data.srdm < srdm_data.srdm.tqfunc.ref(1)   # 减速

# SRDM动量分级
strong_momentum = srdm_data.srdm > srdm_data.srdm.tqfunc.hhv(20) * 0.7
weak_momentum = srdm_data.srdm < srdm_data.srdm.tqfunc.llv(20) * 0.7
```

---

### **`SRMI` - MI修正指标**

```python
@tobtind(lib="tqta")
def SRMI(self, n=9, **kwargs) -> IndFrame:
```

**功能**：动量指标的优化版本，对传统动量指标进行修正

**应用场景**：

- 动量趋势分析
- 买卖时机选择
- 趋势强度评估
- 反转信号预警

**计算原理**：

```
在传统动量指标基础上进行修正和平滑处理
A: 原始动量值
MI: 修正后的动量指标
减少噪音干扰，提高信号质量
```

**参数**：

- `n`：计算周期，默认9
- `**kwargs`：额外参数

**注意**：

- MI上穿零轴为买入信号，下穿零轴为卖出信号
- 比传统动量指标更平滑
- 适合中短线趋势分析
- 减少虚假信号

**返回值**：IndFrame - 包含"a"(原始动量值)、"mi"(修正动量指标)两列

**所需数据字段**：`close`

**示例**：

```python
# SRMI动量分析
srmi_data = close.tqta.SRMI(n=9)
positive_momentum = srmi_data.mi > 0                 # 正动量
momentum_turn = srmi_data.mi.tqta.crossup(0)          # 动量转正

# 动量强度分级
strong_momentum = srmi_data.mi > srmi_data.mi.tqta.MA(20)
weak_momentum = srmi_data.mi < srmi_data.mi.tqta.MA(20)

# 原始与修正对比
signal_improvement = (srmi_data.mi - srmi_data.a).abs() < 0.1  # 信号改善

# SRMI与价格确认
price_confirmation = (srmi_data.mi > 0) & (close > close.tqta.MA(10))
```

---

### **`ZDZB` - 筑底指标**

```python
@tobtind(lib="tqta")
def ZDZB(self, n1=50, n2=5, n3=20, **kwargs) -> IndFrame:
```

**功能**：底部形成和反转识别工具，识别价格底部形成过程

**应用场景**：

- 底部形态识别
- 趋势反转预警
- 买入时机选择
- 支撑位确认

**计算原理**：

```
基于价格相对位置计算筑底信号
B: 短期筑底信号
D: 长期筑底信号
反映价格在底部区域的相对强度
```

**参数**：

- `n1`：基础计算周期，默认50
- `n2`：短期信号周期，默认5
- `n3`：长期信号周期，默认20
- `**kwargs`：额外参数

**注意**：

- B上穿D为底部确认信号
- 指标值上升表示筑底过程
- 适合抄底和反转交易
- 需结合价格形态确认

**返回值**：IndFrame - 包含"b"(短期筑底信号)、"d"(长期筑底信号)两列

**所需数据字段**：`close`

**示例**：

```python
# ZDZB底部信号
zdzb_data = close.tqta.ZDZB(n1=50, n2=5, n3=20)
bottom_formation = zdzb_data.b > zdzb_data.b.tqfunc.ref(1)  # 筑底进行中
bottom_confirmed = zdzb_data.b.tqta.crossup(zdzb_data.d)         # 底部确认

# 筑底强度分析
strong_bottom = (zdzb_data.b > 1) & (zdzb_data.d > 1)           # 强势筑底
weak_bottom = (zdzb_data.b < 1) & (zdzb_data.d < 1)             # 弱势筑底

# ZDZB与价格底部结合
price_bottom = close == close.tqfunc.llv(20)
zdzb_bottom = (zdzb_data.b > 0.8) & (zdzb_data.d > 0.8)
confirmed_bottom = price_bottom & zdzb_bottom
```

---

### **`DPO` - 区间震荡线**

```python
@tobtind(lib="tqta")
def DPO(self, **kwargs) -> IndSeries:
```

**功能**：价格与移动平均线的周期性偏离分析，消除长期趋势影响

**应用场景**：

- 区间震荡识别
- 买卖时机选择
- 周期波动分析
- 趋势过滤

**计算原理**：

```
DPO = 收盘价 - (N/2+1)日前移动平均价
通过减去移动平均消除长期趋势，突出周期性波动
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- DPO上穿零轴为买入信号
- DPO下穿零轴为卖出信号
- 适合震荡市交易
- 在趋势市中效果有限

**返回值**：IndSeries - DPO值序列

**所需数据字段**：`close`

**示例**：

```python
# DPO震荡分析
dpo = close.tqta.DPO()
in_oscillation = dpo.abs() < dpo.tqfunc.std(20)          # 震荡区间
breakout_signal = dpo > dpo.tqfunc.hhv(20)              # 突破信号

# DPO交易信号
buy_oscillation = (dpo.tqfunc.ref(1) < 0) & (dpo > 0)   # 震荡买入
sell_oscillation = (dpo.tqfunc.ref(1) > 0) & (dpo < 0)  # 震荡卖出

# DPO周期分析
dpo_ma = dpo.tqta.MA(10)
dpo_trend = dpo > dpo_ma                             # DPO上升趋势
dpo_cycle = dpo.tqta.crossup(dpo_ma)                  # 周期转换
```

---

### **`LON` - 长线指标**

```python
@tobtind(lib="tqta")
def LON(self, **kwargs) -> IndFrame:
```

**功能**：综合量价关系的长线趋势分析系统，结合价格和成交量分析长线趋势

**应用场景**：

- 长线趋势判断
- 资金流向分析
- 趋势持续性评估
- 长线买卖时机

**计算原理**：

```
基于价格和成交量计算长线趋势指标
LON: 长线指标值
MA1: LON的10周期移动平均
反映长线资金流向和趋势强度
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- LON上穿MA1为长线买入信号
- LON下穿MA1为长线卖出信号
- 适合长线投资和趋势跟踪
- 信号稳定但响应较慢

**返回值**：IndFrame - 包含"lon"(长线指标)、"ma1"(指标均线)两列

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：

```python
# LON长线趋势
lon_data = data.tqta.LON()
long_term_bull = lon_data.lon > lon_data.ma1                    # 长线多头
golden_cross_long = lon_data.lon。tqta.crossup(lon_data.ma1)      # 长线金叉

# 长线趋势强度
strong_uptrend = (lon_data.lon > 0) & (lon_data.ma1 > 0)        # 强势上涨
trend_strength = (lon_data.lon - lon_data.ma1) / lon_data.ma1.abs()

# LON与价格趋势确认
price_uptrend = close > close.tqta.MA(60)
lon_uptrend = lon_data.lon > lon_data.ma1
confirmed_uptrend = price_uptrend & lon_uptrend
```

---

### **`SHORT` - 短线指标**

```python
@tobtind(lib="tqta")
def SHORT(self, **kwargs) -> IndFrame:
```

**功能**：综合量价关系的短线交易系统，结合价格和成交量分析短线交易机会

**应用场景**：

- 短线交易信号
- 日内买卖时机
- 资金短期流向
- 短线趋势判断

**计算原理**：

```
基于价格和成交量计算短线交易指标
SHORT: 短线指标值
MA1: SHORT的10周期移动平均
反映短线资金流向和交易机会
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- SHORT上穿MA1为短线买入信号
- SHORT下穿MA1为短线卖出信号
- 适合短线交易和日内操作
- 信号敏感但可能有噪音

**返回值**：IndFrame - 包含"short"(短线指标)、"ma1"(指标均线)两列

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：

```python
# SHORT短线交易
short_data = data.tqta.SHORT()
short_term_bull = short_data.short > short_data.ma1             # 短线多头
golden_cross_short = short_data.short.tqta.crossup(short_data.ma1) # 短线金叉

# 短线交易信号过滤
strong_signal = (short_data.short - short_data.ma1).abs() > short_data.short.tqfunc.std(20)
weak_signal = (short_data.short - short_data.ma1).abs() < short_data.short.tqfunc.std(20)

# SHORT与价格短线趋势
price_short_up = close > close.tqta.MA(10)
short_signal = short_data.short > short_data.ma1
confirmed_short = price_short_up & short_signal
```

---

### **`MV` - 均量线指标**

```python
@tobtind(lib="tqta")
def MV(self, n=10, m=20, **kwargs) -> IndFrame:
```

**功能**：成交量移动平均分析系统，通过成交量的移动平均分析资金流向

**应用场景**：

- 成交量趋势分析
- 资金活跃度判断
- 量价关系验证
- 突破确认

**计算原理**：

```
MV1 = 成交量的N周期简单移动平均
MV2 = 成交量的M周期简单移动平均
反映不同周期下的平均成交量水平
```

**参数**：

- `n`：短期均量周期，默认10
- `m`：长期均量周期，默认20
- `**kwargs`：额外参数

**注意**：

- MV1上穿MV2为量能金叉
- MV1下穿MV2为量能死叉
- 量价配合时信号更可靠
- 适合各类时间周期的量能分析

**返回值**：IndFrame - 包含"mv1"(短期均量)、"mv2"(长期均量)两列

**所需数据字段**：`volume`

**示例**：

```python
# MV量能分析
mv_data = volume.tqta.MV(n=10, m=20)
volume_increasing = mv_data.mv1 > mv_data.mv2                   # 量能增加
golden_cross_volume = mv_data.mv1.tqta.crossup(mv_data.mv2)      # 量能金叉

# 量价配合分析
price_up_volume_up = (close > close.tqfunc.ref(1)) & (mv_data.mv1 > mv_data.mv1.tqfunc.ref(1))
price_up_volume_down = (close > close.tqfunc.ref(1)) & (mv_data.mv1 < mv_data.mv1.tqfunc.ref(1))

# MV与价格突破
volume_breakout = mv_data.mv1 > mv_data.mv1.tqfunc.hhv(20)
price_breakout = close > close.tqfunc.hhv(20)
breakout_confirmed = volume_breakout & price_breakout
```

---

### **`WAD` - 威廉多空力度线**

```python
@tobtind(lib="tqta")
def WAD(self, n=10, m=30, **kwargs) -> IndFrame:
```

**功能**：威廉指标与量价结合的多空力量分析，结合价格位置和量价关系分析多空双方力量对比

**应用场景**：

- 多空力量对比分析
- 趋势方向确认
- 买卖信号生成
- 量价关系验证

**计算原理**：

```
基于威廉指标和量价关系计算多空力度
A/D: 原始多空力度值
B: A/D的N周期加权移动平均
E: A/D的M周期加权移动平均
综合反映多空力量变化
```

**参数**：

- `n`：短期平滑周期，默认10
- `m`：长期平滑周期，默认30
- `**kwargs`：额外参数

**注意**：

- A/D值反映当日多空力度
- B上穿E为多头信号
- B下穿E为空头信号
- 适合趋势确认和力量分析

**返回值**：IndFrame - 包含"a"(多空力度)、"b"(短期均线)、"e"(长期均线)三列

**所需数据字段**：`high`, `low`, `close`

**示例**：

```python
# WAD多空分析
wad_data = data.tqta.WAD(n=10, m=30)
bull_power = wad_data.a > 0                          # 多头力量
golden_cross_wad = wad_data.b.tqta.crossup(wad_data.e)  # 多空金叉
death_cross_wad = wad_data.b.tqta.crossdown(wad_data.e) # 多空死叉

# 多空力量强度
strong_bull = (wad_data.b > wad_data.e) & (wad_data.a > wad_data.a.tqta.MA(10))
strong_bear = (wad_data.b < wad_data.e) & (wad_data.a < wad_data.a.tqta.MA(10))

# WAD与价格趋势
price_trend_confirmation = (close > close.tqta.MA(20)) & (wad_data.b > wad_data.e)
```

---

### **`AD` - 累积/派发指标**

```python
@tobtind(lib="tqta")
def AD(self, **kwargs) -> IndSeries:
```

**功能**：资金流向和积累分布分析，通过价格和成交量关系分析资金累积和派发过程

**应用场景**：

- 资金流向分析
- 趋势确认
- 背离分析
- 机构资金动向

**计算原理**：

```
AD = 前日AD + 当日资金流
当日资金流 = [(收盘价-最低价)-(最高价-收盘价)] / (最高价-最低价) × 成交量
反映资金的累积和派发过程
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- AD上升表示资金累积，下降表示资金派发
- 与价格背离时信号更可靠
- 适合中长线资金流向分析
- 反映机构资金动向

**返回值**：IndSeries - AD值序列

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：

```python
# AD资金流向分析
ad = data.tqta.AD()
accumulation = ad > ad.tqfunc.ref(1)           # 资金累积
distribution = ad < ad.tqfunc.ref(1)           # 资金派发

# AD与价格背离
price_new_high = close == close.tqfunc.hhv(20)
ad_lower_high = ad < ad.tqfunc.ref(1)
bearish_divergence = price_new_high & ad_lower_high  # 顶背离

# AD趋势确认
ad_uptrend = ad > ad.tqta.MA(20)                      # 资金持续流入
ad_downtrend = ad < ad.tqta.MA(20)                    # 资金持续流出
```

---

### **`CCL` - 持仓异动指标**

```python
@tobtind(lib="tqta")
def CCL(self, close_oi=None, **kwargs) -> IndSeries:
```

**功能**：期货市场持仓变化分析，分析期货合约持仓量变化识别主力资金动向

**应用场景**：

- 期货持仓分析
- 主力资金动向
- 多空力量判断
- 趋势确认

**计算原理**：

```
基于持仓量变化计算持仓异动
返回字符串标识：'多头增仓'、'多头减仓'、'空头增仓'、'空头减仓'等
反映期货市场的资金流向
```

**参数**：

- `close_oi`：收盘持仓量数据
- `**kwargs`：额外参数

**注意**：

- 需要持仓量数据支持
- 反映期货市场特有信息
- 适合期货品种分析
- 结合价格走势更有效

**返回值**：IndSeries - 持仓异动标识序列

**所需数据字段**：`close` (需要持仓量数据配合)

**示例**：

```python
# CCL持仓分析
ccl = tqta.CCL()
long_increase = ccl == '多头增仓'                   # 多头增仓
short_increase = ccl == '空头增仓'                  # 空头增仓
long_decrease = ccl == '多头减仓'                   # 多头减仓
short_decrease = ccl == '空头减仓'                  # 空头减仓

# CCL与价格关系
bullish_oi = (ccl == '多头增仓') & (close > close。tqta.MA(10))
bearish_oi = (ccl == '空头增仓') & (close < close。tqta.MA(10))
```

---

### **`CJL` - 成交持仓分析**

```python
@tobtind(lib="tqta")
def CJL(self, close_oi=None, **kwargs) -> IndFrame:
```

**功能**：期货市场成交和持仓量数据，提供期货市场的成交量和持仓量基础数据

**应用场景**：

- 成交量分析
- 持仓量分析
- 量价关系研究
- 市场活跃度判断

**计算原理**：

```
VOL: 当日成交量
OPID: 当日持仓量
提供期货市场的基础成交持仓数据
```

**参数**：

- `close_oi`：收盘持仓量数据
- `**kwargs`：额外参数

**注意**：

- 需要期货合约的成交持仓数据
- 成交量反映市场活跃度
- 持仓量反映资金沉淀
- 适合期货市场分析

**返回值**：IndFrame - 包含"vol"(成交量)、"opid"(持仓量)两列

**所需数据字段**：`volume` (需要持仓量数据配合)

**示例**：

```python
# CJL量仓分析
cjl_data = volume.tqta.CJL()
high_volume = cjl_data.vol > cjl_data.vol.tqta.MA(20)  # 高成交量
oi_increase = cjl_data.opid > cjl_data.opid.tqfunc.ref(1) # 持仓增加

# 量仓配合分析
volume_oi_rise = (cjl_data.vol > cjl_data.vol.tqfunc.ref(1)) & (cjl_data.opid > cjl_data.opid.tqfunc.ref(1))

# CJL与价格突破
volume_breakout = cjl_data.vol > cjl_data.vol.tqfunc.hhv(20)
oi_breakout = cjl_data.opid > cjl_data.opid.tqfunc.hhv(20)
breakout_confirmed = volume_breakout & oi_breakout
```

---

### **`OPI` - 持仓量指标**

```python
@tobtind(lib="tqta")
def OPI(self, close_oi=None, **kwargs) -> IndSeries:
```

**功能**：期货市场未平仓合约数量，分析期货市场持仓量变化反映资金沉淀和市场情绪

**应用场景**：

- 资金流向分析
- 市场情绪判断
- 趋势强度评估
- 风险控制

**计算原理**：

```
OPI = 当日未平仓合约数量
反映期货市场的资金沉淀和投资者持仓情况
```

**参数**：

- `close_oi`：收盘持仓量数据
- `**kwargs`：额外参数

**注意**：

- 需要期货合约持仓量数据
- 持仓量增加表示资金流入
- 持仓量减少表示资金流出
- 反映市场参与度

**返回值**：IndSeries - 持仓量序列

**所需数据字段**：(需要持仓量数据)

**示例**：

```python
# OPI持仓分析
opi = IndSeries.tqta.OPI(close_oi)
oi_uptrend = opi > opi.tqta.MA(10)           # 持仓上升趋势
new_high_oi = opi == opi.tqfunc.hhv(20)        # 持仓创新高
capital_inflow = opi > opi.tqfunc.ref(1)       # 资金流入

# OPI与价格趋势
bullish_oi_trend = (opi > opi.tqta.MA(10)) & (close > close.tqta.MA(10))
bearish_oi_trend = (opi < opi.tqta.MA(10)) & (close < close.tqta.MA(10))
```

---

### **`PVT` - 价量趋势指数**

```python
@tobtind(lib="tqta")
def PVT(self, **kwargs) -> IndSeries:
```

**功能**：价格与成交量的协同变化分析，通过价格变化与成交量的乘积分析趋势强度

**应用场景**：

- 量价关系分析
- 趋势确认
- 买卖信号生成
- 资金流向判断

**计算原理**：

```
PVT = 前日PVT + (当日收盘价-前日收盘价)/前日收盘价 × 当日成交量
反映价格变动与成交量的协同变化
```

**参数**：

- `**kwargs`：额外参数

**注意**：

- PVT上升表示量价配合良好
- 与价格背离时预警趋势转换
- 适合趋势确认分析
- 反映资金推动力度

**返回值**：IndSeries - PVT值序列

**所需数据字段**：`close`, `volume`

**示例**：

```python
# PVT量价分析
pvt = data.tqta.PVT()
healthy_uptrend = (close > close.tqfunc.ref(1)) & (pvt > pvt.tqfunc.ref(1))
weak_uptrend = (close > close.tqfunc.ref(1)) & (pvt < pvt.tqfunc.ref(1))

# PVT趋势信号
pvt_breakout = pvt > pvt.tqfunc.hhv(20)        # PVT突破
pvt_breakdown = pvt < pvt.tqfunc.llv(20)       # PVT跌破

# PVT背离分析
price_new_high = close == tqfunc.hhv(close.tqfunc.hhv(20)
pvt_lower_high = pvt < pvt.tqfunc.ref(1)
pvt_divergence = price_new_high & pvt_lower_high
```

---

### **`VOSC` - 成交量振荡器**

```python
@tobtind(lib="tqta")
def VOSC(self, short=12, long=26, **kwargs) -> IndSeries:
```

**功能**：成交量移动平均离差分析，通过长短周期成交量均线离差分析量能变化

**应用场景**：

- 量能变化分析
- 买卖信号确认
- 突破有效性验证
- 资金活跃度判断

**计算原理**：

```
VOSC = (短期成交量均线 - 长期成交量均线) / 长期成交量均线 × 100
反映成交量能的变化幅度
```

**参数**：

- `short`：短期周期，默认12
- `long`：长期周期，默认26
- `**kwargs`：额外参数

**注意**：

- VOSC上穿零轴为量能金叉
- VOSC下穿零轴为量能死叉
- 数值大小反映量能变化强度
- 适合量价配合分析

**返回值**：IndSeries - VOSC值序列，单位为百分比

**所需数据字段**：`volume`

**示例**：

```python
# VOSC量能分析
vosc = volume.tqta.VOSC(short=12, long=26)
volume_increase = vosc > 0                         # 量能增加
volume_surge = vosc > vosc.tqfunc.hhv(20)      # 量能激增

# 量价配合
price_volume_confirmation = (close > close.tqfunc.ref(1)) & (vosc > 0)
price_volume_divergence = (close > close.tqfunc.ref(1)) & (vosc < 0)

# VOSC交易信号
vosc_buy = vosc.tqta.crossup(0)                     # 量能金叉买入
vosc_sell = vosc.tqta.crossdown(0)                  # 量能死叉卖出
```

---

### **`VROC` - 成交量变动速率**

```python
@tobtind(lib="tqta")
def VROC(self, n=12, **kwargs) -> IndSeries:
```

**功能**：成交量变化百分比分析，测量成交量变化的百分比速率分析量能动量

**应用场景**：

- 量能动量分析
- 突破确认
- 资金流入流出判断
- 市场活跃度变化

**计算原理**：

```
VROC = (当日成交量 - N日前成交量) / N日前成交量 × 100
反映成交量在N周期内的百分比变化率
```

**参数**：

- `n`：计算周期，默认12
- `**kwargs`：额外参数

**注意**：

- VROC上穿零轴为量能转强
- VROC下穿零轴为量能转弱
- 极值往往预示重大变化
- 适合各类时间周期的量能分析

**返回值**：IndSeries - VROC值序列，单位为百分比

**所需数据字段**：`volume`

**示例**：

```python
# VROC量能动量
vroc = volume.tqta.VROC(n=12)
volume_momentum_up = vroc > 0                      # 量能动量向上
volume_surge_signal = vroc > vroc.tqfunc.hhv(20) * 0.8  # 量能激增

# 量能转换信号
volume_turn_positive = (vroc.tqfunc.ref(1) <= 0) & (vroc > 0)
volume_turn_negative = (vroc.tqfunc.ref(1) >= 0) & (vroc < 0)

# VROC与价格动量
price_momentum = close.tqta.ROC(12)
volume_price_confirmation = (price_momentum > 0) & (vroc > 0)
```

---

### **`VRSI` - 成交量相对强弱指标**

```python
@tobtind(lib="tqta")
def VRSI(self, n=6, **kwargs) -> IndSeries:
```

**功能**：成交量动量的RSI版本，通过成交量变化分析量能动量的强弱状态

**应用场景**：

- 量能动量分析
- 超买超卖判断
- 背离分析
- 量价关系验证

**计算原理**：

```
计算方式类似RSI，但基于成交量数据
VRSI = 100 - 100 / (1 + RS)
RS = N日内成交量上涨平均值 / N日内成交量下跌平均值
```

**参数**：

- `n`：计算周期，默认6
- `**kwargs`：额外参数

**注意**：

- VRSI在70以上为量能超买
- VRSI在30以下为量能超卖
- 与价格RSI结合使用效果更好
- 适合量能动量分析

**返回值**：IndSeries - VRSI值序列，范围0-100

**所需数据字段**：`volume`

**示例**：

```python
# VRSI量能分析
vrsi = volume.tqta.VRSI(n=6)
volume_overbought = vrsi > 70                     # 量能超买
volume_oversold = vrsi < 30                       # 量能超卖

# 量价RSI配合
price_rsi = close.tqta.RSI(n=6)
healthy_volume = (price_rsi > 50) & (vrsi > 50)   # 健康量价
weak_volume = (price_rsi > 50) & (vrsi < 50)      # 量价背离

# VRSI趋势确认
vrsi_uptrend = vrsi > vrsi.tqta.MA(10)             # 量能上升趋势
vrsi_downtrend = vrsi < vrsi.tqta.MA(10)           # 量能下降趋势
```

---

### **`WVAD` - 威廉变异离散量**

```python
@tobtind(lib="tqta")
def WVAD(self, **kwargs) -> IndSeries:
```

**功能**：威廉指标与成交量结合的分析工具，结合威廉指标和成交量分析资金流向和市场强度

**应用场景**：

- 资金流向分析
- 市场强度判断
- 买卖信号生成
- 趋势确认

**计算原理**：

```
基于开盘、最高、最低、收盘价和成交量计算
WVAD = (收盘价-开盘价) / (最高价-最低价) × 成交量
综合反映价格位置和成交量信息
```

**参数**：

- `**kwargs`：额外参数

**注意**：
- WVAD为正表示资金流入
- WVAD为负表示资金流出
- 数值大小反映资金流向强度
- 适合短线资金流向分析

**返回值**：IndSeries - WVAD值序列

**所需数据字段**：`open`, `high`, `low`, `close`, `volume`

**示例**：

```python
# WVAD资金流向
wvad = data.tqta.WVAD()
capital_inflow = wvad > 0                         # 资金流入
capital_outflow = wvad < 0                        # 资金流出

# 资金流向强度
strong_inflow = wvad > wvad.tqta.MA(20)     # 强势流入
strong_outflow = wvad < wvad.tqta.MA(20)    # 强势流出

# WVAD突破信号
wvad_breakout = wvad > tqfunc.hhv(wvad, 20)    # 资金流入突破

# WVAD与价格关系
price_volume_health = (close > close.tqta.MA(10)) & (wvad > 0)
price_volume_warning = (close > close.tqta.MA(10)) & (wvad < 0)
```

---

### **`MA` - 简单移动平均线**

```python
@tobtind(lib="tqta")
def MA(self, n=30, **kwargs) -> IndSeries:
```

**功能**：最基础的价格趋势平滑工具，计算指定周期内收盘价的算术平均值，消除短期波动

**应用场景**：

- 趋势方向识别
- 支撑阻力位构建
- 均线交叉策略
- 价格与均线关系分析

**计算原理**：

```
MA = (P₁ + P₂ + ... + Pₙ) / n
其中P为收盘价，n为计算周期
所有历史数据权重相等
```

**参数**：

- `n`：移动平均周期，默认30
- `**kwargs`：额外参数

**注意**：

- 对价格变化的反应相对滞后
- 周期越长，平滑效果越明显但滞后性越大
- 适合趋势明显的市场环境
- 常作为其他技术指标的基础

**返回值**：IndSeries - 简单移动平均值序列

**所需数据字段**：`close`

**示例**：

```python
# MA趋势分析
ma = close.tqta.MA(n=30)
price_above_ma = close > ma                        # 价格在均线上方
price_below_ma = close < ma                        # 价格在均线下方
ma_uptrend = ma > ma.tqfunc.ref(1)                   # 均线上升趋势

# 多周期MA系统
ma_short = close.tqta.MA(n=10)
ma_long = close.tqta.MA(n=30)
golden_cross = ma_short.tqta.crossup(ma_long)       # 金叉信号
death_cross = ma_short.tqta.crossdown(ma_long)      # 死叉信号

# MA通道策略
upper_band = close.tqta.MA(n=20) + 2 * close.tqfunc.std(20)
lower_band = close.tqta.MA(n=20) - 2 * close.tqfunc.std(20)
```

---

### **`SMA` - 扩展指数加权移动平均**

```python
@tobtind(lib="tqta")
def SMA(self, n=5, m=2, **kwargs) -> IndSeries:
```

**功能**：可调节权重的平滑移动平均，提供可自定义权重的指数加权移动平均

**应用场景**：

- 自定义平滑程度的需求
- 特定权重模式的趋势分析
- 交易系统优化
- 技术指标定制

**计算原理**：

```
SMA = (Pₙ × m + 前日SMA × (n - m)) / n
其中m为权重系数，n为周期
允许调节近期数据的权重比例
```

**参数**：

- `n`：计算周期，默认5
- `m`：权重系数，默认2
- `**kwargs`：额外参数

**注意**：

- m值越大，近期数据权重越高
- 当m=1时退化为简单移动平均
- 适合需要定制化平滑程度的场景
- 平衡响应速度和平滑效果

**返回值**：IndSeries - 扩展指数加权移动平均值序列

**所需数据字段**：`close`

**示例**：

```python
# SMA定制化分析
sma_fast = close.tqta.SMA(n=5, m=3)                       # 快速SMA
sma_slow = close.tqta.SMA(n=10, m=2)                      # 慢速SMA
custom_signal = sma_fast.tqta.crossup(sma_slow)    # 定制信号

# 权重优化
high_weight = close.tqta.SMA(n=5, m=4)                    # 高权重近期数据
low_weight = close.tqta.SMA(n=5, m=1)                     # 低权重近期数据
weight_effect = high_weight - low_weight          # 权重影响
```
<!-- # SMA自适应参数
volatility = close.tqfunc.std(20) / close.tqta.MA(20)
adaptive_m = 2 + (volatility * 10).astype(np.int16)
adaptive_sma = close.tqta.SMA(n=10, m=adaptive_m)
``` -->

---

### **`EMA` - 指数加权移动平均**

```python
@tobtind(lib="tqta")
def EMA(self, n=10, **kwargs) -> IndSeries:
```

**功能**：对近期价格赋予更高权重的移动平均，通过指数加权方式强调近期价格

**应用场景**：

- 快速趋势识别
- 短线交易信号
- 动态支撑阻力
- 与其他指标配合使用

**计算原理**：

```
EMA = α × 当日收盘价 + (1 - α) × 前日EMA
α = 2 / (n + 1)
近期价格权重较高，远期价格权重指数衰减
```

**参数**：

- `n`：计算周期，默认10
- `**kwargs`：额外参数

**注意**：

- 对价格变化比SMA更敏感
- 在震荡市中可能产生较多假信号
- 适合趋势跟踪策略
- 常作为MACD等指标的计算基础

**返回值**：IndSeries - 指数加权移动平均值序列

**所需数据字段**：`close`

**示例**：

```python
# EMA趋势系统
ema_fast = close.tqta.EMA(n=12)                           # 快速EMA
ema_slow = close.tqta.EMA(n=26)                           # 慢速EMA
ema_golden_cross = ema_fast.tqta.crossup(ema_slow) # EMA金叉
ema_death_cross = ema_fast.tqta.crossdown(ema_slow) # EMA死叉

# EMA支撑阻力
dynamic_support = close.tqta.EMA(n=20)                    # 动态支撑
dynamic_resistance = close.tqta.EMA(n=50)                 # 动态阻力
support_test = close <= dynamic_support           # 测试支撑

# EMA多时间框架
ema_daily = close.tqta.EMA(n=20)
ema_hourly = close.tqta.EMA(n=20)
multi_timeframe = (ema_daily > ema_daily.tqfunc.ref(1)) & (ema_hourly > ema_hourly.tqfunc.ref(1))
```

---

### **`EMA2` - 线性加权移动平均**

```python
@tobtind(lib="tqta")
def EMA2(self, n=10, **kwargs) -> IndSeries:
```

**功能**：按时间线性加权的移动平均，采用线性递减权重平衡响应和平滑效果

**应用场景**：

- 平衡型的趋势分析
- 需要线性权重的交易系统
- 技术指标优化
- 多时间框架分析

**计算原理**：

```
WMA = (P₁ × 1 + P₂ × 2 + ... + Pₙ × n) / (1 + 2 + ... + n)
权重随时间线性递增，近期数据权重更高
```

**参数**：

- `n`：计算周期，默认10
- `**kwargs`：额外参数

**注意**：

- 权重线性递增，比EMA更平缓
- 滞后性介于SMA和EMA之间
- 适合需要平衡响应的场景
- 在趋势转换时表现稳定

**返回值**：IndSeries - 线性加权移动平均值序列

**所需数据字段**：`close`

**示例**：

```python
# WMA多周期分析
wma_short = close.tqta.EMA2(n=10)                         # 短期WMA
wma_long = close.tqta.EMA2(n=30)                          # 长期WMA
wma_cross = wma_short.tqta.crossup(wma_long)       # WMA金叉

# 不同MA类型比较
sma_20 = close.tqta.MA(n=20)
ema_20 = close.tqta.EMA(n=20)
wma_20 = close.tqta.EMA2(n=20)
ma_comparison = (wma_20 - sma_20) / sma_20        # MA差异比较
```
<!-- # WMA自适应策略
market_regime = close.tqta.ATR(14) / close.tqta.MA(14)
adaptive_n = 10 + int(market_regime * 20)
adaptive_wma = tqta.EMA2(n=adaptive_n)
``` -->

---

### **`TRMA` - 三角移动平均线**

```python
@tobtind(lib="tqta")
def TRMA(self, n=10, **kwargs) -> IndSeries:
```

**功能**：双重平滑的移动平均变体，通过两次平均计算提供更平滑的趋势线

**应用场景**：

- 极平滑趋势识别
- 长期投资分析
- 过滤市场噪音
- 重大趋势确认

**计算原理**：

```
先计算n周期简单移动平均
再对SMA结果进行n/2周期简单移动平均
实现双重平滑效果
```

**参数**：

- `n`：计算周期，默认10
- `**kwargs`：额外参数

**注意**：

- 滞后性明显大于其他移动平均
- 适合长期趋势分析
- 几乎完全过滤短期波动
- 在趋势明显的市场中效果最佳

**返回值**：IndSeries - 三角移动平均值序列

**所需数据字段**：`close`

**示例**：

```python
# TRMA长期趋势
trma = close.tqta.TRMA(n=20)                              # 三角移动平均
long_term_trend = trma > trma.tqfunc.ref(5)         # 长期趋势向上
major_turn = (trma.tqfunc.ref(2) < trma.tqfunc.ref(1)) & (trma < trma.tqfunc.ref(1))

# TRMA与其他MA对比
trma_smooth = close.tqta.TRMA(n=20)
sma_smooth = close.tqta.MA(n=20)
smoothness_advantage = (trma_smooth - trma_smooth.tqfunc.ref(1)).abs() < (sma_smooth - sma_smooth.tqfunc.ref(1)).abs()

# TRMA趋势过滤
price_trend = close > close.tqta.MA(50)
trma_trend = trma > trma.tqfunc.ref(10)
filtered_signal = price_trend & trma_trend
```

---

至此，我们已经完成了tqta技术指标库所有指标的参考文档编写。这个完整的指标库涵盖了：

## 技术指标库总结

### 趋势指标类
- `MACD`, `DMI`, `DMA`, `TRIX`, `BBI` - 趋势方向和强度分析
- `MA`, `EMA`, `SMA`, `EMA2`, `TRMA` - 各种移动平均线
- `SAR`, `PUBU` - 趋势跟踪和停损系统

### 动量指标类  
- `RSI`, `KDJ`, `WR`, `CCI`, `BIAS` - 超买超卖和动量振荡器
- `MTM`, `MI`, `MICD`, `ROC`, `RC` - 价格变动速率分析
- `SLOWKD`, `RCCD`, `DBCD` - 平滑和优化版本

### 波动率指标类
- `ATR`, `BOLL`, `ENV`, `BBIBOLL` - 波动率测量和通道分析
- `MIKE`, `HCL`, `CDP` - 支撑阻力位识别

### 成交量指标类
- `OBV`, `VR`, `PVT`, `VOSC`, `VROC` - 量价关系分析
- `MFI`, `VRSI`, `WVAD`, `AD` - 资金流向判断
- `MV`, `CJL`, `OPI`, `CCL` - 成交持仓分析（期货专用）

### 其他专业指标
- `ARBR`, `CR`, `DDI`, `ZDZB`, `DPO` - 多空力量和情绪分析
- `ADTM`, `SRDM`, `SRMI`, `B3612` - 专业动量系统
- `LON`, `SHORT`, `WAD`, `ASI` - 长短线综合系统

每个指标都提供了详细的功能说明、应用场景、计算原理、参数说明、注意事项和实用示例，为量化交易策略开发提供了全面的技术分析工具支持。