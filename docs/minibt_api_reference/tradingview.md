# TradingView 类 API 参考

## 类定义

```python
class TradingView:
    _kline: Union[IndFrame, IndSeries]

    def __init__(self, data):
        self._kline = data
```

## 类功能说明

**TradingView 社区策略指标集合类**，用于将 TradingView 平台上广受欢迎的交易策略和指标转换为框架内置的指标数据类型（IndSeries/IndFrame）

### 核心功能
- 封装 TradingView 社区的优质策略指标，提供统一的调用接口
- 通过 BtIndicator 基类自动处理指标参数校验、计算逻辑调用和返回值转换，确保输出为框架兼容的 IndSeries 或 IndFrame
- 支持多维度交易策略场景，覆盖趋势跟踪、均值回归、波动率分析、动量交易等量化交易核心需求
- 内置策略分类体系，便于按交易风格和策略类型快速定位和调用目标指标

### 策略分类体系

该类支持的策略指标按功能划分为以下 8 大类：

#### 1. 趋势跟踪策略（Trend Following）
**功能**：识别和跟踪市场趋势方向，在趋势启动时入场，趋势结束时出场
**包含策略**：

- `Powertrend_Volume_Range_Filter_Strategy` - 成交量范围过滤策略
- `Nadaraya_Watson_Envelope_Strategy` - 核回归包络线策略
- `Adaptive_Trend_Filter` - 自适应趋势过滤器
- `Multi_Step_Vegas_SuperTrend_strategy` - 多步维加斯超级趋势策略
- `RJ_Trend_Engine` - RJ趋势引擎
- `AlphaTrend` - Alpha趋势指标
- `SuperTrend` - 超级趋势指标
- `SuperTrend_STRATEGY` - 超级趋势策略
- `Optimized_Trend_Tracker` - 优化的趋势跟踪指标

#### 2. 均值回归策略（Mean Reversion）
**功能**：在价格偏离均值时入场，预期价格回归均值时出场
**包含策略**：

- `DCA_Strategy_with_Mean_Reversion_and_Bollinger_Band` - 布林带均值回归DCA策略
- `Bollinger_RSI_Double_Strategy` - 布林带RSI双重策略
- `CM_Williams_Vix_Fix_Finds_Market_Bottoms` - 市场底部识别指标

#### 3. 突破策略（Breakout）
**功能**：在价格突破关键支撑阻力位时入场，捕捉趋势启动机会
**包含策略**：

- `Turtles_strategy` - 海龟交易策略
- `Turtle_Trade_Channels_Indicator_TUTCI` - 海龟交易通道指标
- `G_Channels` - G通道指标
- `Twin_Range_Filter` - 双范围过滤器

#### 4. 动量策略（Momentum）
**功能**：基于价格和成交量的动量变化识别交易机会
**包含策略**：

- `The_Flash_Strategy` - Flash动量策略
- `WaveTrend_Oscillator` - WaveTrend振荡器
- `TonyUX_EMA_Scalper` - EMA剥头皮策略
- `Volume_Flow_Indicator` - 成交量流量指标

#### 5. 波动率策略（Volatility）
**功能**：基于市场波动率变化调整交易参数和风险管理
**包含策略**：

- `STD_Filtered` - STD过滤高斯滤波器
- `PMax_Explorer` - PMax探索者指标
- `PMax_Explorer_STRATEGY` - PMax探索者策略
- `Chandelier_Exit` - 吊灯出场指标
- `Pivot_Point_Supertrend` - 枢轴点超级趋势

#### 6. 机器学习策略（Machine Learning）
**功能**：基于自适应算法和AI技术优化策略参数
**包含策略**：

- `Quantum_Edge_Pro_Adaptive_AI` - 量子边缘自适应AI策略
- `LOWESS` - 局部加权散点图平滑

#### 7. 信号处理策略（Signal Processing）
**功能**：基于信号处理理论分析价格数据
**包含策略**：

- `The_Price_Radio` - John Ehlers价格收音机指标
- `ADX_and_DI` - ADX与方向指标

#### 8. 风险管理策略（Risk Management）
**功能**：专注于头寸管理和风险控制的策略工具
**包含策略**：

- `Chandelier_Exit` - 动态止损管理
- `Turtles_strategy` - 包含完整风险管理的经典策略

### 使用说明

#### 1. 初始化
传入框架支持的 IndSeries 或 IndFrame 数据对象（需包含策略计算所需的基础字段，如 open、high、low、close、volume 等）

```python
data = IndFrame(...)  # 框架内置数据对象（含OHLCV等基础字段）
tv = TradingView(data)
```

#### 2. 策略调用
直接调用对应策略方法，传入必要参数（默认参数已适配常见场景，可按需调整）

```python
# 示例1：调用海龟交易策略
# 返回框架内置IndFrame，含多空信号和出场信号
turtle_signals = tv.Turtles_strategy(enter_fast=20, exit_fast=10, enter_slow=55, exit_slow=20)

# 示例2：调用超级趋势策略
supertrend_data = tv.SuperTrend_STRATEGY(Periods=10, Multiplier=3.0)

# 示例3：调用自适应AI策略
ai_scores = tv.Quantum_Edge_Pro_Adaptive_AI(LEARNING_PERIOD=40, ADAPTATION_SPEED=0.3)
```

#### 3. 返回值特性
所有方法返回框架内置的 IndSeries 或 IndFrame 类型，可直接用于后续策略逻辑（如信号生成、风险控制），无需额外类型转换

### 策略集成示例

```python
class AdvancedStrategy(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
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

### 注意事项
- 不同策略对基础数据字段要求不同，调用前确保输入数据包含所需字段（如成交量策略需要volume字段）
- 策略参数对性能影响显著，建议通过回测优化确定最佳参数组合
- 复杂策略（如AI自适应策略）需要足够的历史数据才能有效工作
- 建议在模拟环境中充分测试策略表现后再实盘应用
- 可结合框架的风险管理模块控制单策略和组合风险

### 性能优化建议

1. **参数调优**：使用框架的回测工具对策略参数进行优化
2. **组合使用**：将不同策略信号组合使用，提高系统稳定性
3. **风险分散**：在同一策略类别中选择多个不相关策略分散风险
4. **市场适应**：根据不同市场环境动态调整策略权重
5. **监控评估**：定期评估策略表现，及时调整或替换失效策略

---

## TradingView技术指标参考

### `Powertrend_Volume_Range_Filter_Strategy` - 成交量范围过滤策略
```python
def Powertrend_Volume_Range_Filter_Strategy(self, l=200, lengthvwma=200, mult=3.,
    lengthadx=200, lengthhl=14, useadx=False, usehl=False, usevwma=False,
    highlighting=True, **kwargs) -> IndFrame:
```
**功能**：基于成交量加权的动态范围过滤策略，结合多重技术指标过滤，提供精准的趋势跟踪信号

**应用场景**：

- 趋势方向识别和跟踪
- 突破交易信号生成
- 成交量确认趋势强度
- 多维度信号过滤验证
- 动态支撑阻力位构建

**计算原理**：
```
1. 平滑范围计算：基于价格变动的绝对值进行双重指数平滑
   smoothrng = mult × EMA(EMA(|close - close.shift()|, t), t×2-1)

2. 成交量调整范围过滤：根据成交量方向动态调整过滤线
   - 成交量上升：volrng = max(前值, close - smoothrng)
   - 成交量下降：volrng = min(前值, close + smoothrng)

3. 动态轨道构建：
   hband = volrng + smoothrng    # 上轨阻力
   lowband = volrng - smoothrng  # 下轨支撑

4. 多重信号过滤：
   - ADX趋势强度过滤
   - 高低点突破过滤
   - VWMA成交量确认过滤
```

**参数**：

- `l`：平滑范围周期，默认200，控制趋势平滑度
- `lengthvwma`：成交量加权移动平均周期，默认200，确认成交量趋势
- `mult`：范围乘数，默认3.0，调整轨道宽度
- `lengthadx`：ADX指标周期，默认200，衡量趋势强度
- `lengthhl`：高低点周期，默认14，识别关键突破位
- `useadx`：是否启用ADX过滤，默认False
- `usehl`：是否启用高低点过滤，默认False
- `usevwma`：是否启用VWMA过滤，默认False
- `highlighting`：是否高亮显示信号，默认True
- `**kwargs`：额外参数

**注意**：

- 策略在趋势明显的市场中表现最佳，震荡市可能产生假信号
- 多重过滤条件可有效提高信号质量，但可能减少交易机会
- 轨道宽度由mult参数控制，需根据市场波动率调整
- ADX过滤可避免在无趋势行情中交易
- 建议结合其他指标确认信号可靠性

**返回值**：IndFrame - 包含以下列：

- `volrng`：成交量调整范围过滤线，动态支撑阻力
- `hband`：上轨阻力线
- `lowband`：下轨支撑线  
- `dir`：方向指标(1:多头, -1:空头)
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`close`, `volume`

**示例**：
```python
class Example(Strategy):

    def __init__(self)
        self.data = self.get_kline(LocalDatas.test)
        # 直接调用指标
        self.filter=self.data.tradingview.Powertrend_Volume_Range_Filter_Strategy()
        # 趋势方向判断
        uptrend = self.filter.dir > 0.
        downtrend = self.filter.dir < 0.

        # 轨道突破交易
        long_breakout = self.data.close.cross_up(self.filter.hband)
        short_breakout = self.data.close.cross_down(self.filter.lowband)

        adx = self.data.adx()
        # 多重过滤条件
        filtered_long = self.filter.long_signal & (adx > 20)  # 结合趋势强度
        filtered_short = self.filter.short_signal & (adx > 20)

        # 动态支撑阻力应用
        resistance = self.filter.hband
        support = self.filter.lowband
```

---

### `Nadaraya_Watson_Envelope_Strategy` - Nadaraya-Watson包络线策略
```python
def Nadaraya_Watson_Envelope_Strategy(self, customLookbackWindow=8.,
    customRelativeWeighting=8., customStartRegressionBar=25., length=60,
    customATRLength=60, customNearATRFactor=1.5, customFarATRFactor=2.,
     **kwargs) -> IndFrame:
```
**功能**：基于核回归的非重绘包络线策略，使用Nadaraya-Watson估计器构建动态支撑阻力系统，结合ATR波动率调整

**应用场景**：

- 对数尺度下的动态支撑阻力识别
- 非重绘趋势跟踪信号
- 波动率自适应通道交易
- 均值回归和趋势突破策略

**计算原理**：
```
1. Nadaraya-Watson核回归估计：
   权重计算：w(i) = [1 + (x-i)²/(2×α×h²)]^(-α)
   核回归值：exp(∑[w(i)×ln(price_i)] / ∑w(i))

2. 三重包络线构建：
   - 收盘价包络线(customEnvelopeClose)
   - 最高价包络线(customEnvelopeHigh) 
   - 最低价包络线(customEnvelopeLow)

3. ATR波动率调整轨道：
   - 近端轨道：包络线 ± NearATRFactor × ATR
   - 远端轨道：包络线 ± FarATRFactor × ATR
   - 平均轨道：近端和远端轨道的平均值
```

**参数**：

- `customLookbackWindow`：回看窗口大小，默认8.0，控制核回归的观察范围
- `customRelativeWeighting`：相对权重参数，默认8.0，调整核函数的衰减速度
- `customStartRegressionBar`：回归起始柱，默认25.0，确定计算起点
- `length`：计算周期长度，默认60
- `customATRLength`：ATR计算周期，默认60，衡量波动率
- `customNearATRFactor`：近端ATR因子，默认1.5，控制内轨道宽度
- `customFarATRFactor`：远端ATR因子，默认2.0，控制外轨道宽度
- `**kwargs`：额外参数

**注意**：

- 策略使用对数尺度计算，更适合长期趋势分析
- 核回归方法产生非重绘信号，避免信号闪烁
- 多重轨道设计提供不同强度的支撑阻力位
- 在趋势明显的市场中表现更佳
- 建议结合成交量确认突破有效性

**返回值**：IndFrame - 包含以下列：

- `customEnvelopeClose`：收盘价核回归包络线
- `customEnvelopeHigh`：最高价核回归包络线
- `customEnvelopeLow`：最低价核回归包络线
- `customUpperNear`：近端上轨阻力
- `customUpperFar`：远端上轨阻力
- `customUpperAvg`：平均上轨阻力
- `customLowerNear`：近端下轨支撑
- `customLowerFar`：远端下轨支撑
- `customLowerAvg`：平均下轨支撑
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`close`, `high`, `low`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用Nadaraya-Watson包络线策略
        self.nwe = self.data.tradingview.Nadaraya_Watson_Envelope_Strategy()
        
        # 轨道突破信号
        long_breakout = self.data.close.cross_up(self.nwe.customEnvelopeLow)
        short_breakout = self.data.close.cross_down(self.nwe.customEnvelopeHigh)
        
        # 多重支撑阻力应用
        strong_resistance = self.nwe.customUpperFar  # 强阻力位
        weak_resistance = self.nwe.customUpperNear   # 弱阻力位
        strong_support = self.nwe.customLowerFar     # 强支撑位
        weak_support = self.nwe.customLowerNear      # 弱支撑位
        
        # 策略信号过滤
        filtered_long = self.nwe.long_signal & (self.nwe.customEnvelopeClose > self.nwe.customEnvelopeClose.shift())
        filtered_short = self.nwe.short_signal & (self.nwe.customEnvelopeClose < self.nwe.customEnvelopeClose.shift())
        
        # 轨道宽度分析（波动率指标）
        channel_width = self.nwe.customUpperFar - self.nwe.customLowerFar
        high_volatility = channel_width > channel_width.rolling(20).mean()
```

---

### `G_Channels` - G通道指标
```python
def G_Channels(self, length=144., cycle=1, thresh=0., **kwargs) -> IndFrame:
```
**功能**：高效计算上下极值点的动态通道指标，通过周期循环机制优化极值点识别，结合之字转向过滤噪音

**应用场景**：

- 动态支撑阻力位识别
- 趋势通道边界确定
- 极值点高效计算
- 通道突破交易信号
- 均值回归策略

**计算原理**：
```
1. 周期循环极值更新：
   - 每cycle个周期更新一次通道边界
   - 上轨a = max(当前收盘价, 前上轨) - (前上轨-前下轨)/length
   - 下轨b = min(当前收盘价, 前下轨) + (前上轨-前下轨)/length

2. 线性插值平滑：
   - 当cycle>1时，在更新点之间进行线性插值
   - 确保通道线的连续性

3. 中轨计算：
   - 中轨avg = (上轨a + 下轨b) / 2

4. 之字转向过滤（可选）：
   - 当thresh在(0,1)范围内时启用zigzag过滤
   - 识别重要的价格转折点
```

**参数**：

- `length`：通道长度参数，默认144.0，控制通道的收敛速度
- `cycle`：周期循环参数，默认1，控制通道更新频率（≥1的整数）
- `thresh`：之字转向阈值，默认0.0，在(0,1)范围内启用zigzag过滤
- `**kwargs`：额外参数

**注意**：

- 通道在趋势市场中表现最佳，震荡市可能产生假突破
- cycle参数越大，通道更新越平滑但响应越滞后
- length参数影响通道宽度，值越大通道越窄
- zigzag过滤可帮助识别重要转折点，减少噪音干扰
- 建议结合成交量确认通道突破的有效性

**返回值**：IndFrame - 包含以下列：

- `a`：上轨阻力线
- `b`：下轨支撑线
- `avg`：中轨平衡线
- `zig`：之字转向线（当thresh在0-1之间时有效）

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用G通道指标
        self.gch = self.data.tradingview.G_Channels(length=144, cycle=1, thresh=0.1)
        
        # 通道突破信号
        long_breakout = self.data.close.cross_up(self.gch.a)
        short_breakout = self.data.close.cross_down(self.gch.b)
        
        # 通道内均值回归
        long_reversion = self.data.close.cross_down(self.gch.b) & (self.data.close < self.gch.avg)
        short_reversion = self.data.close.cross_up(self.gch.a) & (self.data.close > self.gch.avg)
        
        # 中轨趋势判断
        uptrend = self.data.close > self.gch.avg
        downtrend = self.data.close < self.gch.avg
        
        # 通道宽度分析
        channel_width = self.gch.a - self.gch.b
        narrow_channel = channel_width < channel_width.rolling(20).mean()
        
        # zigzag重要转折点
        if hasattr(self.gch, 'zig'):
            zig_turning_points = self.gch.zig.notna() & (self.gch.zig != 0)
```

---

### `STD_Filtered` - STD过滤N极高斯滤波器
```python
def STD_Filtered(self, period=25, order=5, filterperiod=10, filter=1., **kwargs) -> IndFrame:
```
**功能**：基于标准差过滤的多极高斯滤波器，通过数学优化算法平滑价格数据，有效过滤市场噪音，识别纯净趋势信号

**应用场景**：

- 价格数据降噪和平滑处理
- 趋势方向精确识别
- 减少假信号干扰
- 高频数据滤波分析
- 趋势转换点检测

**计算原理**：
```
1. 多极高斯滤波计算：
   - 基于阶乘和alpha系数构建高斯滤波器系数
   - alpha = -b + sqrt(b² + 2b)，其中b = (1-cos(2π/period)) / (2^(1/poles) - 1)
   - 使用递归滤波算法计算N极高斯滤波值

2. 标准差动态过滤：
   - 计算价格数据的移动标准差
   - 设置过滤阈值 = filter × 标准差
   - 当价格变动小于阈值时保持前值，有效过滤微小波动

3. 信号生成机制：
   - 基于滤波线的交叉和方向变化生成交易信号
   - 使用状态机确保信号连续性
   - 避免频繁的信号翻转
```

**参数**：

- `period`：主周期参数，默认25，控制高斯滤波的响应速度
- `order`：滤波阶数，默认5，决定滤波器的平滑程度（阶数越高越平滑）
- `filterperiod`：过滤周期，默认10，计算标准差的窗口大小
- `filter`：过滤因子，默认1.0，调整标准差过滤的敏感度
- `**kwargs`：额外参数

**注意**：

- 高阶滤波器响应较慢但信号更稳定，适合长线交易
- 过滤因子越大，过滤越严格，可能错过小幅波动机会
- 在趋势明显的市场中表现最佳，震荡市可能产生滞后
- 建议结合其他指标确认信号可靠性
- 滤波器使用Heikin Ashi收盘价作为输入，减少噪音干扰

**返回值**：IndFrame - 包含以下列：

- `filt`：过滤后的高斯滤波信号线
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用STD过滤高斯滤波器
        self.stdf = self.data.tradingview.STD_Filtered(period=25, order=5, filterperiod=10, filter=1.0)
        
        # 基础信号应用
        long_entry = self.stdf.long_signal
        short_entry = self.stdf.short_signal
        
        # 滤波线趋势判断
        uptrend = self.stdf.filt > self.stdf.filt.shift()
        downtrend = self.stdf.filt < self.stdf.filt.shift()
        
        # 滤波线突破信号
        breakout_up = self.stdf.filt.cross_up(self.stdf.filt.rolling(20).mean())
        breakout_down = self.stdf.filt.cross_down(self.stdf.filt.rolling(20).mean())
        
        # 多时间框架确认
        fast_filter = self.data.tradingview.STD_Filtered(period=10, order=3, filterperiod=5, filter=0.8)
        slow_filter = self.data.tradingview.STD_Filtered(period=50, order=7, filterperiod=20, filter=1.2)
        
        # 双重确认策略
        confirmed_long = self.stdf.long_signal & (fast_filter.filt > slow_filter.filt)
        confirmed_short = self.stdf.short_signal & (fast_filter.filt < slow_filter.filt)
        
        # 滤波线斜率分析
        filter_slope = self.stdf.filt - self.stdf.filt.shift(3)
        strong_trend = abs(filter_slope) > filter_slope.rolling(10).std()
```

---

### `Turtles_strategy` - 海龟交易策略
```python
def Turtles_strategy(self, enter_fast=20, exit_fast=10, enter_slow=55, exit_slow=20, **kwargs) -> IndFrame:
```
**功能**：经典的海龟交易系统实现，通过双时间框架突破机制捕捉大趋势行情，历经市场验证的长效趋势跟踪策略

**应用场景**：

- 大趋势行情捕捉
- 长线趋势跟踪交易
- 突破式入场策略
- 系统化交易执行
- 风险管理与头寸规模控制

**计算原理**：
```
1. 快速通道系统（20/10日）：
   - 入场：突破20日最高点做多，跌破20日最低点做空
   - 出场：跌破10日最低点多头平仓，突破10日最高点空头平仓

2. 慢速通道系统（55/20日）：
   - 入场：突破55日最高点做多，跌破55日最低点做空  
   - 出场：跌破20日最低点多头平仓，突破20日最高点空头平仓

3. 双系统融合：
   - 任一通道产生信号即执行
   - 提供不同时间框架的入场机会
   - 增加策略的适应性和信号频率
```

**参数**：

- `enter_fast`：快速入场周期，默认20，对应原版海龟的20日突破
- `exit_fast`：快速出场周期，默认10，对应原版海龟的10日退出
- `enter_slow`：慢速入场周期，默认55，提供更大时间框架的突破信号
- `exit_slow`：慢速出场周期，默认20，对应慢速系统的退出机制
- `**kwargs`：额外参数

**注意**：

- 策略在趋势明显的单边市场中表现最佳
- 震荡市可能产生多次假突破导致连续亏损
- 需要严格的风险管理和头寸规模控制
- 建议配合ATR进行动态止损设置
- 策略信号相对简单，适合系统化执行
- 长期坚持才能体现策略优势

**返回值**：IndFrame - 包含以下列：

- `long_signal`：多头入场信号
- `short_signal`：空头入场信号  
- `exitlong_signal`：多头出场信号
- `exitshort_signal`：空头出场信号

**所需数据字段**：`high`, `low`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用海龟交易策略
        self.turtle = self.data.tradingview.Turtles_strategy(enter_fast=20, exit_fast=10, enter_slow=55, exit_slow=20)
        
        # 基础信号应用
        long_entry = self.turtle.long_signal
        short_entry = self.turtle.short_signal
        long_exit = self.turtle.exitlong_signal
        short_exit = self.turtle.exitshort_signal
        
        # 通道计算（用于可视化）
        fast_upper = self.data.high.rolling(20).max().shift()  # 快速上轨
        fast_lower = self.data.low.rolling(20).min().shift()   # 快速下轨
        slow_upper = self.data.high.rolling(55).max().shift()  # 慢速上轨
        slow_lower = self.data.low.rolling(55).min().shift()   # 慢速下轨
        
        # 出场通道
        fast_exit_upper = self.data.high.rolling(10).max().shift()  # 快速出场上轨
        fast_exit_lower = self.data.low.rolling(10).min().shift()   # 快速出场下轨
        
        # 信号分类
        fast_long = self.data.high > fast_upper
        slow_long = self.data.high > slow_upper
        fast_short = self.data.low < fast_lower
        slow_short = self.data.low < slow_lower
        
        # 海龟式风险管理（ATR止损）
        atr = self.data.atr(20)
        long_stop = self.data.low - 2 * atr  # 多头止损
        short_stop = self.data.high + 2 * atr  # 空头止损
        
        # 头寸规模计算（海龟核心）
        volatility_unit = atr * self.data.close / 100
        position_size = (self.capital * 0.01) / volatility_unit  # 1%风险对应的头寸规模
```

---

### `Adaptive_Trend_Filter` - 自适应趋势过滤器
```python
def Adaptive_Trend_Filter(self, alphaFilter=0.01, betaFilter=0.1, filterPeriod=21, supertrendFactor=1, supertrendAtrPeriod=7, **kwargs) -> IndFrame:
```
**功能**：结合自适应卡尔曼滤波和超级趋势的动态趋势识别系统，通过双重过滤机制精准捕捉趋势转换点，减少市场噪音干扰

**应用场景**：

- 趋势方向和强度识别
- 动态支撑阻力位构建
- 趋势转换点精确捕捉
- 多时间框架趋势分析
- 过滤震荡行情假信号

**计算原理**：
```
1. 自适应卡尔曼滤波：
   - 基于增益系数动态调整滤波强度
   - 估计值 = 前估计值 + 增益 × (当前价格 - 前估计值)
   - 方差 = (1 - 增益) × 前方差 + beta/周期
   - 增益 = 方差 / (方差 + alpha × 周期)

2. 超级趋势轨道构建：
   - 上轨 = 滤波值 + 因子 × ATR
   - 下轨 = 滤波值 - 因子 × ATR
   - 动态调整轨道位置，确保趋势连续性

3. 趋势方向判定：
   - 多头趋势：价格在上轨上方或突破上轨
   - 空头趋势：价格在下轨下方或跌破下轨
   - 基于轨道突破和价格位置综合判断
```

**参数**：

- `alphaFilter`：Alpha滤波参数，默认0.01，控制滤波器的响应速度
- `betaFilter`：Beta滤波参数，默认0.1，调整滤波器的稳定性
- `filterPeriod`：滤波周期，默认21，决定滤波器的观察窗口
- `supertrendFactor`：超级趋势因子，默认1，控制轨道宽度
- `supertrendAtrPeriod`：超级趋势ATR周期，默认7，计算波动率的窗口
- `**kwargs`：额外参数

**注意**：

- 自适应滤波器在波动率变化大的市场中表现优异
- alpha参数越小，滤波越平滑但响应越慢
- beta参数影响滤波器的稳定性，值越大适应性越强
- 超级趋势因子需根据市场波动率调整，高波动市场建议增大
- 策略在趋势明显的单边市中效果最佳，震荡市可能产生假信号

**返回值**：IndFrame - 包含以下列：

- `filteredValue`：自适应滤波后的价格序列
- `supertrendValue`：超级趋势轨道值
- `trendDirection`：趋势方向（1: 多头, -1: 空头）
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用自适应趋势过滤器
        self.atf = self.data.tradingview.Adaptive_Trend_Filter(
            alphaFilter=0.01, betaFilter=0.1, filterPeriod=21, 
            supertrendFactor=1, supertrendAtrPeriod=7
        )
        
        # 趋势方向判断
        uptrend = self.atf.trendDirection == 1
        downtrend = self.atf.trendDirection == -1
        
        # 基础信号应用
        long_entry = self.atf.long_signal
        short_entry = self.atf.short_signal
        
        # 滤波线与价格关系
        price_above_filter = self.data.close > self.atf.filteredValue
        price_below_filter = self.data.close < self.atf.filteredValue
        
        # 趋势强度分析
        filter_slope = self.atf.filteredValue - self.atf.filteredValue.shift(5)
        strong_uptrend = uptrend & (filter_slope > 0)
        strong_downtrend = downtrend & (filter_slope < 0)
        
        # 多时间框架确认
        fast_atf = self.data.tradingview.Adaptive_Trend_Filter(
            alphaFilter=0.05, betaFilter=0.2, filterPeriod=10, 
            supertrendFactor=0.8, supertrendAtrPeriod=5
        )
        
        # 双重趋势确认
        confirmed_uptrend = (self.atf.trendDirection == 1) & (fast_atf.trendDirection == 1)
        confirmed_downtrend = (self.atf.trendDirection == -1) & (fast_atf.trendDirection == -1)
        
        # 滤波收敛判断（趋势可能结束）
        filter_convergence = (self.data.close - self.atf.filteredValue).abs() < self.data.atr(14) * 0.5
```

---

### `DCA_Strategy_with_Mean_Reversion_and_Bollinger_Band` - 均值回归与布林带结合的DCA策略
```python
def DCA_Strategy_with_Mean_Reversion_and_Bollinger_Band(self, length=14, mult=2., **kwargs) -> IndFrame:
```
**功能**：结合美元成本平均法与均值回归原理的布林带策略，通过三重指数平滑优化轨道计算，在极端位置进行分批建仓，实现风险分散和成本优化

**应用场景**：

- 震荡市场中的均值回归交易
- 分批建仓的成本优化策略
- 布林带极端位置的反转交易
- 美元成本平均法执行
- 风险分散的头寸管理

**计算原理**：
```
1. 三重指数平滑布林带：
   - 中轨basis = T3(close, length)  # 三重指数平滑移动平均
   - 标准差bb_dev = mult × stdev(close, length)
   - 上轨upper = basis + bb_dev
   - 下轨lower = basis - bb_dev

2. 均值回归信号生成：
   - 多头信号：价格上穿布林带下轨且当前价格高于前一根K线
   - 空头信号：价格下穿布林带上轨且当前价格低于前一根K线

3. DCA分批逻辑：
   - 在布林带下轨附近分批建立多头头寸
   - 在布林带上轨附近分批建立空头头寸
   - 通过价格动量过滤提高信号质量
```

**参数**：

- `length`：布林带周期，默认14，控制轨道计算的观察窗口
- `mult`：布林带乘数，默认2.0，调整轨道宽度和信号敏感度
- `**kwargs`：额外参数

**注意**：

- 策略在震荡市中表现最佳，单边趋势市可能产生较大回撤
- 使用T3均线相比传统SMA/EMA具有更好的平滑效果
- 价格动量过滤可避免在强烈下跌趋势中盲目抄底
- 建议结合仓位管理实现真正的DCA分批建仓
- 乘数参数需根据市场波动率调整，高波动市场建议增大
- 适合长期投资和定投策略，不适合短线频繁交易

**返回值**：IndFrame - 包含以下列：

- `upper`：布林带上轨阻力线
- `lower`：布林带下轨支撑线
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用DCA布林带策略
        self.dca_bb = self.data.tradingview.DCA_Strategy_with_Mean_Reversion_and_Bollinger_Band(length=14, mult=2.0)
        
        # 基础信号应用
        long_entry = self.dca_bb.long_signal
        short_entry = self.dca_bb.short_signal
        
        # 布林带位置分析
        bb_position = (self.data.close - self.dca_bb.lower) / (self.dca_bb.upper - self.dca_bb.lower)
        oversold_zone = bb_position < 0.2    # 超卖区域
        overbought_zone = bb_position > 0.8  # 超买区域
        
        # DCA分批建仓逻辑
        dca_levels = 5  # 分批层级
        dca_long_signals = []
        dca_short_signals = []
        
        for i in range(dca_levels):
            # 多头：价格越低，仓位越重
            long_threshold = self.dca_bb.lower + (self.dca_bb.upper - self.dca_bb.lower) * (i / dca_levels)
            dca_long = (self.data.close < long_threshold) & (self.data.close > self.data.close.shift())
            dca_long_signals.append(dca_long)
            
            # 空头：价格越高，仓位越重  
            short_threshold = self.dca_bb.upper - (self.dca_bb.upper - self.dca_bb.lower) * (i / dca_levels)
            dca_short = (self.data.close > short_threshold) & (self.data.close < self.data.close.shift())
            dca_short_signals.append(dca_short)
        
        # 布林带宽度分析（波动率指标）
        bb_width = (self.dca_bb.upper - self.dca_bb.lower) / self.dca_bb.lower
        high_volatility = bb_width > bb_width.rolling(20).mean()
        
        # 结合其他指标确认
        rsi = self.data.rsi(14)
        confirmed_long = self.dca_bb.long_signal & (rsi < 30)  # 超卖区域确认
        confirmed_short = self.dca_bb.short_signal & (rsi > 70)  # 超买区域确认
        
        # 轨道突破过滤（避免在强烈趋势中逆势）
        trend_strength = abs(self.data.close - self.dca_bb.lower) / (self.dca_bb.upper - self.dca_bb.lower)
        strong_downtrend = trend_strength > 0.7  # 价格接近下轨，下降趋势强
        strong_uptrend = trend_strength < 0.3    # 价格接近上轨，上升趋势强
```

---

### `Multi_Step_Vegas_SuperTrend_strategy` - 多步维加斯超级趋势策略
```python
def Multi_Step_Vegas_SuperTrend_strategy(self, atrPeriod=10, vegasWindow=100, superTrendMultiplier=5, volatilityAdjustment=5, matype="jma", **kwargs) -> IndFrame:
```
**功能**：结合维加斯通道和自适应超级趋势的复合趋势跟踪策略，通过波动率调整机制动态优化趋势灵敏度，在多时间框架中捕捉高质量趋势行情

**应用场景**：

- 多时间框架趋势确认
- 波动率自适应趋势跟踪
- 大周期趋势中的精确入场
- 趋势强度和持续性分析
- 机构级趋势跟踪系统

**计算原理**：
```
1. 维加斯通道构建：
   - 中轨 = JMA(close, 100)  # JMA均线作为基准
   - 标准差 = stdev(close, 100)
   - 上轨 = 中轨 + 标准差
   - 下轨 = 中轨 - 标准差

2. 自适应超级趋势乘数：
   - 通道波动率宽度 = 上轨 - 下轨
   - 调整乘数 = 基础乘数 + 波动调整 × (通道宽度 / 中轨)
   - 实现波动率自适应的动态参数调整

3. 超级趋势计算：
   - 基于HL3(最高最低收盘均价)计算
   - 上轨 = HL3 - 调整乘数 × ATR
   - 下轨 = HL3 + 调整乘数 × ATR
   - 动态跟踪趋势方向转换
```

**参数**：

- `atrPeriod`：ATR周期，默认10，衡量价格波动率
- `vegasWindow`：维加斯窗口，默认100，大周期趋势确认
- `superTrendMultiplier`：超级趋势基础乘数，默认5，控制趋势灵敏度
- `volatilityAdjustment`：波动率调整参数，默认5，动态调整乘数的强度
- `matype`：移动平均类型，默认"jma"，可选其他均线类型
- `**kwargs`：额外参数

**注意**：

- 维加斯通道提供大周期趋势背景，超级趋势提供精确入场点
- 波动率调整机制使策略在不同市场环境中自适应
- 策略在趋势明显的单边市中表现优异
- 震荡市可能产生多次假信号，建议结合其他过滤器
- JMA均线相比传统均线具有更好的平滑性和响应速度

**返回值**：IndFrame - 包含以下列：

- `superTrend`：自适应超级趋势线
- `marketTrend`：市场趋势方向（1: 多头, -1: 空头）
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用多步维加斯超级趋势策略
        self.vegas_st = self.data.tradingview.Multi_Step_Vegas_SuperTrend_strategy(
            atrPeriod=10, vegasWindow=100, superTrendMultiplier=5, 
            volatilityAdjustment=5, matype="jma"
        )
        
        # 基础信号应用
        long_entry = self.vegas_st.long_signal
        short_entry = self.vegas_st.short_signal
        
        # 趋势方向判断
        uptrend = self.vegas_st.marketTrend == 1
        downtrend = self.vegas_st.marketTrend == -1
        
        # 维加斯通道计算（用于可视化）
        vegas_ma = self.data.close.jma(100)
        vegas_std = self.data.close.stdev(100)
        vegas_upper = vegas_ma + vegas_std
        vegas_lower = vegas_ma - vegas_std
        
        # 多时间框架确认
        major_trend = self.data.close > vegas_ma  # 大周期趋势
        confirmed_long = self.vegas_st.long_signal & major_trend
        confirmed_short = self.vegas_st.short_signal & (~major_trend)
        
        # 波动率状态分析
        channel_width = vegas_upper - vegas_lower
        high_volatility = channel_width > channel_width.rolling(50).mean()
        
        # 趋势持续性判断
        trend_duration = (self.vegas_st.marketTrend != self.vegas_st.marketTrend.shift()).cumsum()
        long_trend_persistent = trend_duration >= 10  # 趋势持续10周期以上
```

---

### `The_Flash_Strategy` - Flash策略
```python
def The_Flash_Strategy(self, length=10, mom_rsi_val=50, atrPeriod=10, factor=3., AP2=12, AF2=.1618, **kwargs) -> IndFrame:
```
**功能**：动量RSI与EMA交叉结合的快速趋势策略，通过双重跟踪止损机制实现动态风险控制，专为捕捉快速趋势行情设计的高频响应系统

**应用场景**：

- 快速趋势行情捕捉
- 动量突破交易
- 动态止损管理
- 短线趋势跟踪
- 高频交易策略

**计算原理**：
```
1. 动量RSI计算：
   - 动量 = close - close[length]
   - 动量RSI = RSI(动量, length)
   - 衡量价格变动的速度和强度

2. 超级趋势基础：
   - 基于ATR和因子计算传统超级趋势
   - 提供基础趋势方向和支撑阻力

3. 自适应EMA跟踪止损：
   - Trail1 = EMA(close, AP2)
   - SL2 = Trail1 × AF2  # 动态止损幅度
   - Trail2通过复杂条件逻辑实现自适应跟踪：
     * 价格上升时：Trail2 = max(前值, Trail1 - SL2)
     * 价格下降时：Trail2 = min(前值, Trail1 + SL2)
```

**参数**：

- `length`：RSI周期，默认10，控制动量计算窗口
- `mom_rsi_val`：动量RSI阈值，默认50，动量强度过滤
- `atrPeriod`：ATR周期，默认10，波动率测量
- `factor`：超级趋势因子，默认3.0，控制轨道宽度
- `AP2`：自适应周期参数2，默认12，EMA计算周期
- `AF2`：自适应因子2，默认0.1618，止损幅度系数
- `**kwargs`：额外参数

**注意**：

- 策略响应速度快，适合短线交易
- 双重跟踪止损提供多层次风险保护
- 动量RSI过滤可提高信号质量
- 在趋势明确的市场中表现最佳
- 建议配合严格的仓位管理
- AF2使用黄金比例0.1618，具有数学美感

**返回值**：IndFrame - 包含以下列：

- `supertrend`：超级趋势线
- `Trail2`：自适应跟踪止损线
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用Flash策略
        self.flash = self.data.tradingview.The_Flash_Strategy(
            length=10, mom_rsi_val=50, atrPeriod=10, 
            factor=3.0, AP2=12, AF2=0.1618
        )
        
        # 基础信号应用
        long_entry = self.flash.long_signal
        short_entry = self.flash.short_signal
        
        # 动量RSI计算（用于信号过滤）
        mom = self.data.close - self.data.close.shift(10)
        mom_rsi = mom.rsi(10)
        strong_momentum = mom_rsi > 50  # 动量RSI过滤
        
        # 双重信号确认
        confirmed_long = self.flash.long_signal & strong_momentum
        confirmed_short = self.flash.short_signal & (~strong_momentum)
        
        # 跟踪止损应用
        long_stop_loss = self.flash.Trail2  # 多头止损位
        short_stop_loss = self.flash.Trail2  # 空头止损位
        
        # 趋势强度分析
        trend_strength = abs(self.data.close - self.flash.Trail2) / self.data.atr(10)
        strong_trend = trend_strength > 2.0  # 强烈的趋势行情
        
        # 多时间框架动量确认
        fast_mom = (self.data.close - self.data.close.shift(5)).rsi(5)
        slow_mom = (self.data.close - self.data.close.shift(20)).rsi(20)
        momentum_aligned = (fast_mom > 50) & (slow_mom > 50)  # 多时间框架动量一致
```

---

### `Quantum_Edge_Pro_Adaptive_AI` - 量子边缘专业自适应AI策略
```python
def Quantum_Edge_Pro_Adaptive_AI(self, TICK_SIZE=0.25, POINT_VALUE=2, DOLLAR_PER_POINT=2, LEARNING_PERIOD=40, ADAPTATION_SPEED=0.3, PERFORMANCE_MEMORY=200, BASE_MIN_SCORE=2, BASE_BARS_BETWEEN=9, MAX_DAILY_TRADES=50, **kwargs) -> IndFrame:
```
**功能**：多维度AI驱动的自适应交易系统，结合市场结构、动量、成交量、反转四大因子，通过机器学习机制动态调整权重，实现智能化的综合评分信号生成

**应用场景**：

- 多因子量化策略开发
- AI自适应交易系统
- 机构级智能投顾
- 动态权重优化
- 复杂市场环境下的信号过滤

**计算原理**：
```
1. 四大因子系统构建：
   - 市场结构分析：突破关键支撑阻力位识别
   - 动量指标集成：RSI多周期+MACD+ADX综合动量
   - 成交量分析：量价关系+成交量异常检测
   - 反转信号捕捉：超买超卖区域的均值回归

2. 自适应权重机制：
   - 基于历史表现动态调整各因子权重
   - 波动率调整因子：高波动率降低动量权重，低波动率增加
   - 学习周期机制持续优化参数

3. 综合评分计算：
   - 加权评分 = 动量分×动量权重 + 结构分×结构权重 + 成交量分×成交量权重 + 反转分×反转权重
   - 考虑市场波动率环境的动态乘数调整
```

**参数**：

- `TICK_SIZE`：最小变动价位，默认0.25，影响交易成本计算
- `POINT_VALUE`：点值，默认2，合约规格参数
- `DOLLAR_PER_POINT`：每点美元价值，默认2，盈亏计算参数
- `LEARNING_PERIOD`：学习周期，默认40，AI自适应学习窗口
- `ADAPTATION_SPEED`：适应速度，默认0.3，权重调整的灵敏度
- `PERFORMANCE_MEMORY`：性能记忆周期，默认200，历史表现跟踪窗口
- `BASE_MIN_SCORE`：基础最小分数，默认2，信号触发阈值
- `BASE_BARS_BETWEEN`：基础间隔柱数，默认9，最小交易间隔
- `MAX_DAILY_TRADES`：最大日交易次数，默认50，风险控制参数
- `**kwargs`：额外参数

**注意**：

- 策略复杂度高，需要充分理解各因子含义
- 自适应机制需要足够的历史数据才能有效工作
- 建议在模拟环境中充分测试后再实盘应用
- 多因子系统在多样化市场环境中表现稳定
- 参数设置对策略性能影响显著，需精细调优

**返回值**：IndFrame - 包含以下列：

- `weighted_score`：综合加权评分信号，正值看多，负值看空

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用量子边缘AI策略
        self.quantum = self.data.tradingview.Quantum_Edge_Pro_Adaptive_AI(
            TICK_SIZE=0.25, POINT_VALUE=2, DOLLAR_PER_POINT=2, 
            LEARNING_PERIOD=40, ADAPTATION_SPEED=0.3, 
            PERFORMANCE_MEMORY=200, BASE_MIN_SCORE=2, 
            BASE_BARS_BETWEEN=9, MAX_DAILY_TRADES=50
        )
        
        # 基础信号应用
        strong_bullish = self.quantum.weighted_score > 3.0
        moderate_bullish = self.quantum.weighted_score > 1.5
        neutral = abs(self.quantum.weighted_score) <= 1.5
        moderate_bearish = self.quantum.weighted_score < -1.5
        strong_bearish = self.quantum.weighted_score < -3.0
        
        # 信号强度分析
        signal_strength = abs(self.quantum.weighted_score)
        strong_signal = signal_strength > 2.5
        
        # 多时间框架确认
        fast_quantum = self.data.tradingview.Quantum_Edge_Pro_Adaptive_AI(
            LEARNING_PERIOD=20, PERFORMANCE_MEMORY=100
        )
        slow_quantum = self.data.tradingview.Quantum_Edge_Pro_Adaptive_AI(
            LEARNING_PERIOD=60, PERFORMANCE_MEMORY=300
        )
        
        # 多时间框架信号一致性
        aligned_bullish = (self.quantum.weighted_score > 1.5) & (fast_quantum.weighted_score > 1.0) & (slow_quantum.weighted_score > 0.5)
        aligned_bearish = (self.quantum.weighted_score < -1.5) & (fast_quantum.weighted_score < -1.0) & (slow_quantum.weighted_score < -0.5)
        
        # 信号变化率分析
        signal_momentum = self.quantum.weighted_score - self.quantum.weighted_score.shift(3)
        accelerating_bullish = (self.quantum.weighted_score > 0) & (signal_momentum > 0)
        accelerating_bearish = (self.quantum.weighted_score < 0) & (signal_momentum < 0)
```

---

### `LOWESS` - 局部加权散点图平滑
```python
def LOWESS(self, length=100, malen=100, **kwargs) -> IndFrame:
```
**功能**：基于高斯核函数的局部加权回归平滑技术，通过双重平滑机制有效过滤市场噪音，保留真实趋势特征，提供高质量的趋势识别信号

**应用场景**：

- 价格趋势平滑和去噪
- 关键支撑阻力位识别
- 趋势方向精确判断
- 技术指标信号过滤
- 长期趋势分析

**计算原理**：
```
1. 高斯移动平均计算：
   - 基于ATR和标准差的复合波动率测量：sigma = (ATR + STD) / 2
   - 高斯权重计算：weight = exp(-((i - (length-1)) / (2×sigma))² / 2)
   - 加权平均值：GaussianMA = ∑(value × weight) / ∑weight

2. LOWESS局部加权平滑：
   - 使用三立方权重函数：w = (1 - (i/length)³)³
   - 局部线性回归：a = ∑(w × y) / ∑w, b = ∑(w × x) / ∑w
   - 最终平滑值：smoothed = a + b / (length-1) / 2000
```

**参数**：

- `length`：主周期长度，默认100，控制高斯平滑的观察窗口
- `malen`：移动平均长度，默认100，LOWESS二次平滑的窗口大小
- `**kwargs`：额外参数

**注意**：

- 双重平滑机制提供极其平滑的趋势线
- 在长期趋势分析中表现优异
- 响应相对滞后，不适合短线交易
- 高斯权重自适应波动率，在不同市场环境下保持稳定性
- 适合作为其他策略的过滤器或趋势确认工具

**返回值**：IndFrame - 包含以下列：

- `GaussianMA`：高斯移动平均线，基于波动率加权的初级平滑
- `smoothed`：LOWESS二次平滑后的最终信号线

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用LOWESS平滑指标
        self.lowess = self.data.tradingview.LOWESS(length=100, malen=100)
        
        # 趋势方向判断
        uptrend = self.lowess.smoothed > self.lowess.smoothed.shift()
        downtrend = self.lowess.smoothed < self.lowess.smoothed.shift()
        
        # 价格与平滑线关系
        price_above_smooth = self.data.close > self.lowess.smoothed
        price_below_smooth = self.data.close < self.lowess.smoothed
        
        # 平滑线交叉信号
        fast_lowess = self.data.tradingview.LOWESS(length=50, malen=50)
        slow_lowess = self.data.tradingview.LOWESS(length=200, malen=200)
        
        golden_cross = fast_lowess.smoothed.cross_up(slow_lowess.smoothed)
        death_cross = fast_lowess.smoothed.cross_down(slow_lowess.smoothed)
        
        # 支撑阻力位识别
        support_levels = self.lowess.smoothed.tqfunc.llv(50)  # 近期低点作为支撑
        resistance_levels = self.lowess.smoothed.tqfunc.hhv(50)  # 近期高点作为阻力
        
        # 趋势强度分析
        smooth_slope = self.lowess.smoothed - self.lowess.smoothed.shift(10)
        strong_uptrend = uptrend & (smooth_slope > 0)
        strong_downtrend = downtrend & (smooth_slope < 0)
        
        # 与其他指标结合使用
        rsi = self.data.rsi(14)
        lowess_confirmed_bullish = price_above_smooth & (rsi > 50) & uptrend
        lowess_confirmed_bearish = price_below_smooth & (rsi < 50) & downtrend
```

---


### `The_Price_Radio` - John Ehlers价格收音机指标
```python
def The_Price_Radio(self, length=60, period=14, **kwargs) -> IndFrame:
```
**功能**：基于信号处理理论的先进技术指标，将价格变化类比为无线电信号，通过AM(幅度调制)和FM(频率调制)分析市场波动特征，揭示价格变化的深层动力学特性

**应用场景**：

- 市场波动率模式识别
- 趋势强度和稳定性分析
- 价格变化频率测量
- 信号处理理论在金融中的应用
- 高级市场微观结构研究

**计算原理**：
```
1. 价格导数计算：
   - deriv = (close - close[period]) / close[period] × 100%
   - 衡量价格变化的瞬时速率

2. AM幅度调制分析：
   - 计算价格导数的绝对值的4周期最高值
   - 对结果进行length周期简单移动平均
   - amup = AM上轨，amdn = -amup (AM下轨)
   - 反映价格变化的幅度特征

3. FM频率调制分析：
   - 将价格导数限制在length周期内的最高最低值之间
   - 对限制后的信号进行length周期简单移动平均
   - 反映价格变化的频率特征
```

**参数**：

- `length`：周期长度，默认60，控制AM/FM分析的主要窗口
- `period`：变化周期，默认14，计算价格导数的间隔周期
- `**kwargs`：额外参数

**注意**：

- 基于John Ehlers的信号处理理论，需要理解技术分析的高级概念
- AM分量反映市场波动的幅度，FM分量反映市场波动的频率
- 在趋势明显的市场中AM值较高，在震荡市中FM值可能更显著
- 适合与其他传统指标结合使用，提供不同的分析视角
- 建议在充分理解信号处理原理的基础上应用

**返回值**：IndFrame - 包含以下列：

- `deriv`：价格导数，反映价格变化的瞬时速率
- `amup`：AM上轨，价格变化幅度的正向边界
- `amdn`：AM下轨，价格变化幅度的负向边界
- `fm`：FM信号，反映价格变化的频率特征

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用价格收音机指标
        self.radio = self.data.tradingview.The_Price_Radio(length=60, period=14)
        
        # 价格变化速率分析
        high_momentum = abs(self.radio.deriv) > self.radio.deriv.rolling(20).mean()
        positive_momentum = self.radio.deriv > 0
        negative_momentum = self.radio.deriv < 0
        
        # AM幅度分析
        high_amplitude = self.radio.amup > self.radio.amup.rolling(20).mean()
        low_amplitude = self.radio.amup < self.radio.amup.rolling(20).mean()
        
        # FM频率分析
        high_frequency = self.radio.fm > self.radio.fm.rolling(20).mean()
        low_frequency = self.radio.fm < self.radio.fm.rolling(20).mean()
        
        # 市场状态识别
        trending_market = high_amplitude & low_frequency  # 高幅度低频率=趋势市
        ranging_market = low_amplitude & high_frequency   # 低幅度高频率=震荡市
        
        # 信号交叉策略
        am_cross = self.radio.deriv.cross_up(self.radio.amup)  # 突破AM上轨
        am_cross_down = self.radio.deriv.cross_down(self.radio.amdn)  # 跌破AM下轨
        
        # 多时间框架确认
        fast_radio = self.data.tradingview.The_Price_Radio(length=30, period=7)
        slow_radio = self.data.tradingview.The_Price_Radio(length=120, period=21)
        
        # 动量一致性
        momentum_aligned = (self.radio.deriv > 0) & (fast_radio.deriv > 0) & (slow_radio.deriv > 0)
```

---

### `PMax_Explorer` - PMax探索者指标
```python
def PMax_Explorer(self, Periods=10, Multiplier=3, mav="ema", length=10, var_length=9, **kwargs) -> IndFrame:
```
**功能**：基于变异调整移动平均的智能跟踪止损系统，通过动态ATR通道和方向识别机制，提供自适应的支撑阻力位和趋势跟踪信号

**应用场景**：

- 动态止损止盈设置
- 趋势方向精确识别
- 波动率自适应通道交易
- 突破和反转信号生成
- 风险管理工具

**计算原理**：
```
1. 变异调整移动平均计算：
   - 基于CMO(钱德动量振荡器)计算变异系数
   - VAR = alpha × |CMO| × 当前价格 + (1 - alpha × |CMO|) × 前VAR
   - 实现波动率自适应的移动平均

2. 多重移动平均选项：
   - 支持20+种移动平均类型：dema, ema, hma, wma, zlema, tsf等
   - 包括特殊平均：VAR, WWMA, ZLEMA, TSF

3. PMax通道构建：
   - 上轨 = 移动平均 + Multiplier × ATR
   - 下轨 = 移动平均 - Multiplier × ATR
   - 基于方向逻辑动态选择上下轨作为PMax线

4. 方向识别机制：
   - 当移动平均上穿PMax时转为多头方向
   - 当移动平均下穿PMax时转为空头方向
   - 确保信号的连续性和稳定性
```

**参数**：

- `Periods`：ATR周期，默认10，衡量价格波动率
- `Multiplier`：乘数因子，默认3，控制通道宽度
- `mav`：移动平均类型，默认"ema"，支持20+种平均类型
- `length`：移动平均长度，默认10，控制平均线的平滑度
- `var_length`：变异长度，默认9，VAR计算中的CMO周期
- `**kwargs`：额外参数

**注意**：

- PMax线在趋势市中提供优秀的跟踪止损，在震荡市中可能产生锯齿
- 乘数因子需根据市场波动率调整，高波动品种建议增大
- VAR移动平均在趋势明显的市场中表现最佳
- 方向转换逻辑确保信号不会频繁翻转
- 适合作为其他策略的动态止损工具

**返回值**：IndFrame - 包含以下列：

- `pmax`：PMax指标线，动态的支撑阻力位

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用PMax探索者指标
        self.pmax = self.data.tradingview.PMax_Explorer(
            Periods=10, Multiplier=3, mav="ema", length=10, var_length=9
        )
        
        # 动态支撑阻力应用
        dynamic_support = self.pmax.pmax
        dynamic_resistance = self.pmax.pmax
        
        # 价格与PMax关系
        price_above_pmax = self.data.close > self.pmax.pmax
        price_below_pmax = self.data.close < self.pmax.pmax
        
        # 突破交易信号
        breakout_long = self.data.close.cross_up(self.pmax.pmax)
        breakout_short = self.data.close.cross_down(self.pmax.pmax)
        
        # 多时间框架PMax
        fast_pmax = self.data.tradingview.PMax_Explorer(
            Periods=5, Multiplier=2, mav="ema", length=5, var_length=5
        )
        slow_pmax = self.data.tradingview.PMax_Explorer(
            Periods=20, Multiplier=4, mav="ema", length=20, var_length=14
        )
        
        # 趋势方向确认
        uptrend_confirmed = (self.data.close > self.pmax.pmax) & (self.data.close > fast_pmax.pmax) & (self.data.close > slow_pmax.pmax)
        downtrend_confirmed = (self.data.close < self.pmax.pmax) & (self.data.close < fast_pmax.pmax) & (self.data.close < slow_pmax.pmax)
        
        # 不同移动平均类型比较
        ema_pmax = self.data.tradingview.PMax_Explorer(mav="ema", length=10)
        hma_pmax = self.data.tradingview.PMax_Explorer(mav="hma", length=10)
        wma_pmax = self.data.tradingview.PMax_Explorer(mav="wma", length=10)
        
        # 移动平均一致性
        ma_alignment = (ema_pmax.pmax > hma_pmax.pmax) & (hma_pmax.pmax > wma_pmax.pmax)
```

---

### `VMA_Win` - VMA赢家仪表板
```python
def VMA_Win(self, length=15, **kwargs) -> IndFrame:
```
**功能**：基于方向运动指数的变异移动平均线，通过动态调整平滑系数实现自适应价格跟踪，在趋势和震荡市场中自动调整响应速度，提供更精准的趋势识别

**应用场景**：
- 自适应趋势跟踪
- 动态支撑阻力位识别
- 价格动量强度分析
- 趋势转换点检测
- 多时间框架趋势分析

**计算原理**：
```
1. 方向运动计算：
   - 正向运动PDM = max(close - close[1], 0)
   - 负向运动MDM = max(close[1] - close, 0)

2. 平滑方向指数：
   - PDM平滑 = (1-k) × 前PDM平滑 + k × 当前PDM
   - MDM平滑 = (1-k) × 前MDM平滑 + k × 当前MDM
   - 总运动 = PDM平滑 + MDM平滑

3. 方向指数比率：
   - PDI = PDM平滑 / 总运动
   - MDI = MDM平滑 / 总运动
   - 方向差异指数 = |PDI - MDI| / (PDI + MDI)

4. 变异系数计算：
   - 归一化VI = (当前DI - 周期内最小DI) / (周期内最大DI - 周期内最小DI)
   - 动态平滑系数 = k × VI

5. VMA计算：
   - VMA = (1 - 动态平滑系数) × 前VMA + 动态平滑系数 × 当前价格
```

**参数**：

- `length`：VMA周期长度，默认15，控制方向指数的观察窗口和平滑程度
- `**kwargs`：额外参数

**注意**：

- VMA在趋势明显的市场中响应更快，在震荡市中更加平滑
- 基于方向运动的动态调整机制使指标自适应市场状态
- 相比传统移动平均，VMA能更好地过滤假突破
- 适合作为其他策略的趋势过滤器或动态均线系统
- 在趋势转换初期可能有些滞后，但趋势确认后表现优异

**返回值**：IndFrame - 包含以下列：

- `vma`：变异移动平均线，自适应的趋势跟踪线

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用VMA赢家指标
        self.vma = self.data.tradingview.VMA_Win(length=15)
        
        # 趋势方向判断
        uptrend = self.data.close > self.vma.vma
        downtrend = self.data.close < self.vma.vma
        
        # VMA斜率分析
        vma_slope = self.vma.vma - self.vma.vma.shift(3)
        strong_uptrend = uptrend & (vma_slope > 0)
        strong_downtrend = downtrend & (vma_slope < 0)
        
        # 价格与VMA关系
        price_deviation = (self.data.close - self.vma.vma) / self.vma.vma
        extreme_deviation = abs(price_deviation) > 0.05  # 价格偏离VMA超过5%
        
        # 多时间框架VMA系统
        fast_vma = self.data.tradingview.VMA_Win(length=8)
        medium_vma = self.data.tradingview.VMA_Win(length=21)
        slow_vma = self.data.tradingview.VMA_Win(length=50)
        
        # 多均线排列
        ma_aligned_bullish = (fast_vma.vma > medium_vma.vma) & (medium_vma.vma > slow_vma.vma)
        ma_aligned_bearish = (fast_vma.vma < medium_vma.vma) & (medium_vma.vma < slow_vma.vma)
        
        # VMA交叉信号
        golden_cross = fast_vma.vma.cross_up(slow_vma.vma)
        death_cross = fast_vma.vma.cross_down(slow_vma.vma)
        
        # 支撑阻力应用
        dynamic_support = self.vma.vma
        dynamic_resistance = self.vma.vma
        
        # 与其他指标结合
        rsi = self.data.rsi(14)
        vma_confirmed_bullish = uptrend & (rsi > 50) & ma_aligned_bullish
        vma_confirmed_bearish = downtrend & (rsi < 50) & ma_aligned_bearish
```

---

### `RJ_Trend_Engine` - RJ趋势引擎
```python
def RJ_Trend_Engine(self, psarStart=0.02, psarIncrement=0.02, psarMax=0.2, stAtrPeriod=10, stFactor=3.0, adxLen=14, adxThreshold=20, bbLength=20, bbStdDev=3.0, **kwargs) -> IndFrame:
```
**功能**：多指标融合的复合趋势引擎，结合抛物线转向、超级趋势和ADX趋势强度指标，通过标准信号和反转信号双重机制，在趋势确认和趋势转换时提供高概率交易机会

**应用场景**：

- 多维度趋势确认
- 趋势转换点捕捉
- 高可靠性信号生成
- 趋势强度分析
- 机构级趋势跟踪系统

**计算原理**：
```
1. 三重指标融合：
   - 抛物线转向(SAR)：提供动态止损和趋势方向
   - 超级趋势(Supertrend)：基于ATR的动态支撑阻力
   - ADX指标：衡量趋势强度和方向

2. 标准信号逻辑：
   - 多头信号：SAR向上翻转 + 超级趋势看涨 + ADX趋势确认
   - 空头信号：SAR向下翻转 + 超级趋势看跌 + ADX趋势确认

3. 反转信号逻辑：
   - 反转多头：SAR向上翻转 + ADX趋势确认 + 超级趋势看跌（逆势反转）
   - 反转空头：SAR向下翻转 + ADX趋势确认 + 超级趋势看涨（逆势反转）

4. 趋势强度过滤：
   - ADX > 阈值确认趋势有效性
   - 避免在无趋势的震荡市中交易
```

**参数**：

- `psarStart`：SAR起始值，默认0.02，控制初始加速因子
- `psarIncrement`：SAR增量，默认0.02，每次调整的步长
- `psarMax`：SAR最大值，默认0.2，加速因子上限
- `stAtrPeriod`：超级趋势ATR周期，默认10，波动率测量窗口
- `stFactor`：超级趋势因子，默认3.0，控制轨道宽度
- `adxLen`：ADX长度，默认14，趋势强度计算周期
- `adxThreshold`：ADX阈值，默认20，趋势强度过滤门槛
- `bbLength`：布林带长度，默认20，备用参数
- `bbStdDev`：布林带标准差，默认3.0，备用参数
- `**kwargs`：额外参数

**注意**：

- 三重指标确认提供高可靠性信号，但可能减少交易机会
- 反转信号适合捕捉趋势转换点，但风险相对较高
- ADX过滤可有效避免在震荡市中交易
- 标准信号适合趋势跟踪，反转信号适合均值回归
- 建议配合严格的风险管理使用反转信号

**返回值**：IndFrame - 包含以下列：

- `psar`：抛物线转向指标，动态止损位
- `supertrend`：超级趋势线，动态支撑阻力
- `long_signal`：多头入场信号（包含标准和反转）
- `short_signal`：空头入场信号（包含标准和反转）

**所需数据字段**：`open`, `high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用RJ趋势引擎
        self.rj = self.data.tradingview.RJ_Trend_Engine(
            psarStart=0.02, psarIncrement=0.02, psarMax=0.2,
            stAtrPeriod=10, stFactor=3.0, adxLen=14, 
            adxThreshold=20, bbLength=20, bbStdDev=3.0
        )
        
        # 基础信号应用
        long_entry = self.rj.long_signal
        short_entry = self.rj.short_signal
        
        # 趋势方向判断
        uptrend = self.data.close > self.rj.psar
        downtrend = self.data.close < self.rj.psar
        
        # 信号分类
        adx = self.data.adx(14)
        strong_trend = adx > 25
        
        # 标准信号识别
        standard_long = self.rj.long_signal & (self.data.close > self.rj.supertrend)
        standard_short = self.rj.short_signal & (self.data.close < self.rj.supertrend)
        
        # 反转信号识别
        reversal_long = self.rj.long_signal & (self.data.close < self.rj.supertrend)
        reversal_short = self.rj.short_signal & (self.data.close > self.rj.supertrend)
        
        # 多时间框架确认
        fast_rj = self.data.tradingview.RJ_Trend_Engine(
            psarStart=0.01, psarIncrement=0.01, stAtrPeriod=5, stFactor=2.0
        )
        slow_rj = self.data.tradingview.RJ_Trend_Engine(
            psarStart=0.03, psarIncrement=0.03, stAtrPeriod=20, stFactor=4.0
        )
        
        # 三重时间框架确认
        confirmed_long = self.rj.long_signal & fast_rj.long_signal & (slow_rj.psar < self.data.close)
        confirmed_short = self.rj.short_signal & fast_rj.short_signal & (slow_rj.psar > self.data.close)
        
        # 动态止损设置
        long_stop_loss = min(self.rj.psar, self.rj.supertrend)  # 取更保守的止损位
        short_stop_loss = max(self.rj.psar, self.rj.supertrend)  # 取更保守的止损位
        
        # 趋势强度分级
        weak_trend = (adx > 20) & (adx <= 25)
        medium_trend = (adx > 25) & (adx <= 40)
        strong_trend = adx > 40
```

---

### `Twin_Range_Filter` - 双范围过滤器
```python
def Twin_Range_Filter(self, per1=127, mult1=1.6, per2=155, mult2=2.0, **kwargs) -> IndFrame:
```
**功能**：双重平滑范围过滤系统，通过两个不同周期的范围过滤器组合，生成高可靠性的趋势跟踪和反转信号，有效过滤市场噪音并捕捉主要趋势方向

**应用场景**：

- 趋势方向精确识别
- 动态支撑阻力位构建
- 突破和反转信号生成
- 多时间框架趋势分析
- 噪音过滤和趋势净化

**计算原理**：
```
1. 双重平滑范围计算：
   - 平滑范围1 = EMA(EMA(|价格变动|, per1), per1×2-1) × mult1
   - 平滑范围2 = EMA(EMA(|价格变动|, per2), per2×2-1) × mult2
   - 综合平滑范围 = (平滑范围1 + 平滑范围2) / 2

2. 范围过滤线生成：
   - 基于价格与平滑范围的动态关系构建过滤线
   - 当价格上升时：filt = max(前filt, 当前价格 - 平滑范围)
   - 当价格下降时：filt = min(前filt, 当前价格 + 平滑范围)

3. 趋势方向检测：
   - 上升趋势计数：连续filt上升的周期数
   - 下降趋势计数：连续filt下降的周期数

4. 信号生成机制：
   - 多头信号：价格上穿过滤线且处于上升趋势中
   - 空头信号：价格下穿过滤线且处于下降趋势中
   - 状态机确保信号不会频繁翻转
```

**参数**：

- `per1`：第一个周期，默认127，较短周期的范围计算
- `mult1`：第一个乘数，默认1.6，控制较短周期的范围宽度
- `per2`：第二个周期，默认155，较长周期的范围计算
- `mult2`：第二个乘数，默认2.0，控制较长周期的范围宽度
- `**kwargs`：额外参数

**注意**：

- 双重范围设计提供更稳定的过滤效果，减少假信号
- 较大的周期参数使指标更适合长线趋势跟踪
- 状态机机制确保信号连续性，避免频繁交易
- 在趋势明显的单边市中表现最佳
- 震荡市可能产生较少交易机会，但信号质量较高

**返回值**：IndFrame - 包含以下列：

- `filt`：范围过滤线，动态的支撑阻力位
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用双范围过滤器
        self.twin = self.data.tradingview.Twin_Range_Filter(
            per1=127, mult1=1.6, per2=155, mult2=2.0
        )
        
        # 基础信号应用
        long_entry = self.twin.long_signal
        short_entry = self.twin.short_signal
        
        # 过滤线与价格关系
        price_above_filter = self.data.close > self.twin.filt
        price_below_filter = self.data.close < self.twin.filt
        
        # 趋势强度分析
        filter_slope = self.twin.filt - self.twin.filt.shift(5)
        strong_uptrend = price_above_filter & (filter_slope > 0)
        strong_downtrend = price_below_filter & (filter_slope < 0)
        
        # 多时间框架确认
        fast_twin = self.data.tradingview.Twin_Range_Filter(
            per1=50, mult1=1.2, per2=100, mult2=1.8
        )
        slow_twin = self.data.tradingview.Twin_Range_Filter(
            per1=200, mult1=2.0, per2=300, mult2=2.5
        )
        
        # 三重时间框架确认
        confirmed_long = (self.twin.long_signal & 
                         fast_twin.long_signal & 
                         (slow_twin.filt < self.data.close))
        
        confirmed_short = (self.twin.short_signal & 
                          fast_twin.short_signal & 
                          (slow_twin.filt > self.data.close))
        
        # 过滤线突破策略
        filter_breakout_long = self.data.close.cross_up(self.twin.filt)
        filter_breakout_short = self.data.close.cross_down(self.twin.filt)
        
        # 与其他指标结合
        rsi = self.data.rsi(14)
        volume_sma = self.data.volume.rolling(20).mean()
        high_volume = self.data.volume > volume_sma
        
        volume_confirmed_long = self.twin.long_signal & high_volume & (rsi > 40)
        volume_confirmed_short = self.twin.short_signal & high_volume & (rsi < 60)
```

---

### `PMax_Explorer_STRATEGY` - PMax探索者策略
```python
def PMax_Explorer_STRATEGY(self, Periods=10, Multiplier=3., mav="ema", length=10, **kwargs) -> IndFrame:
```
**功能**：基于PMax指标的完整交易策略系统，通过移动平均与PMax线的双重确认机制，结合价格突破信号，提供高可靠性的趋势跟踪和反转交易机会

**应用场景**：

- 趋势跟踪和突破交易
- 动态止损止盈设置
- 趋势方向精确识别
- 波动率自适应通道交易
- 机构级趋势管理系统

**计算原理**：
```
1. PMax指标计算：
   - 基于指定移动平均类型和长度计算基础均线
   - 使用ATR和乘数构建动态通道
   - 通过方向逻辑选择上下轨作为PMax线

2. 双重确认信号生成：
   - 移动平均确认：MA上穿/下穿PMax线
   - 价格确认：价格上穿/下穿PMax线
   - 需要移动平均和价格同时确认才生成信号

3. 趋势方向识别：
   - thrend线提供明确的趋势方向指示
   - 避免在模糊的市场环境中交易
```

**参数**：

- `Periods`：周期参数，默认10，影响ATR计算和通道宽度
- `Multiplier`：乘数因子，默认3.0，控制PMax通道的宽度
- `mav`：移动平均类型，默认"ema"，支持多种移动平均算法
- `length`：移动平均长度，默认10，控制均线的平滑度
- `**kwargs`：额外参数

**注意**：

- 双重确认机制显著提高信号可靠性，但可能减少交易机会
- PMax线在趋势市中提供优秀的动态支撑阻力
- 移动平均过滤避免在均线方向与信号不一致时交易
- 适合中长线趋势跟踪，短线交易者可能需要调整参数
- 建议配合严格的风险管理使用

**返回值**：IndFrame - 包含以下列：

- `pmax`：PMax指标线，动态的支撑阻力位
- `thrend`：趋势方向线，明确的趋势指示
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用PMax探索者策略
        self.pmax_strat = self.data.tradingview.PMax_Explorer_STRATEGY(
            Periods=10, Multiplier=3.0, mav="ema", length=10
        )
        
        # 基础信号应用
        long_entry = self.pmax_strat.long_signal
        short_entry = self.pmax_strat.short_signal
        
        # 趋势方向判断
        uptrend = self.pmax_strat.thrend > 0
        downtrend = self.pmax_strat.thrend < 0
        
        # PMax线作为动态支撑阻力
        dynamic_support = self.pmax_strat.pmax
        dynamic_resistance = self.pmax_strat.pmax
        
        # 价格与PMax关系
        price_above_pmax = self.data.close > self.pmax_strat.pmax
        price_below_pmax = self.data.close < self.pmax_strat.pmax
        
        # 移动平均分析
        ma = self.data.close.ema(10)
        ma_above_pmax = ma > self.pmax_strat.pmax
        ma_below_pmax = ma < self.pmax_strat.pmax
        
        # 多时间框架PMax系统
        fast_pmax = self.data.tradingview.PMax_Explorer_STRATEGY(
            Periods=5, Multiplier=2.0, mav="ema", length=5
        )
        medium_pmax = self.data.tradingview.PMax_Explorer_STRATEGY(
            Periods=10, Multiplier=3.0, mav="ema", length=10
        )
        slow_pmax = self.data.tradingview.PMax_Explorer_STRATEGY(
            Periods=20, Multiplier=4.0, mav="ema", length=20
        )
        
        # 三重时间框架确认
        strong_uptrend = (fast_pmax.thrend > 0) & (medium_pmax.thrend > 0) & (slow_pmax.thrend > 0)
        strong_downtrend = (fast_pmax.thrend < 0) & (medium_pmax.thrend < 0) & (slow_pmax.thrend < 0)
        
        # 信号强度分析
        confirmed_long = (self.pmax_strat.long_signal & 
                         strong_uptrend & 
                         (self.data.close > fast_pmax.pmax))
        
        confirmed_short = (self.pmax_strat.short_signal & 
                          strong_downtrend & 
                          (self.data.close < fast_pmax.pmax))
        
        # 动态止损设置
        long_stop_loss = self.pmax_strat.pmax  # 使用PMax作为动态止损
        short_stop_loss = self.pmax_strat.pmax  # 使用PMax作为动态止损
        
        # 不同移动平均类型比较
        ema_pmax = self.data.tradingview.PMax_Explorer_STRATEGY(mav="ema", length=10)
        sma_pmax = self.data.tradingview.PMax_Explorer_STRATEGY(mav="sma", length=10)
        wma_pmax = self.data.tradingview.PMax_Explorer_STRATEGY(mav="wma", length=10)
        
        # 移动平均一致性信号
        ma_consensus_long = (ema_pmax.long_signal & sma_pmax.long_signal & wma_pmax.long_signal)
        ma_consensus_short = (ema_pmax.short_signal & sma_pmax.short_signal & wma_pmax.short_signal)
```

---

### `UT_Bot_Alerts` - UT Bot 警报指标
```python
def UT_Bot_Alerts(self, a=1., c=10, h=False, **kwargs) -> IndFrame:
```
**功能**：基于ATR的动态跟踪止损系统，通过自适应波动率调整止损位，结合价格突破和EMA确认机制，提供精确的入场和出场信号，特别适合自动化交易系统

**应用场景**：

- 动态止损止盈设置
- 突破交易信号生成
- 趋势方向自动识别
- 机器人交易系统
- 波动率自适应风险管理

**计算原理**：
```
1. ATR动态止损计算：
   - ATR值 = ATR(c周期)
   - 止损幅度 = a × ATR
   - 上轨 = 收盘价 + 止损幅度
   - 下轨 = 收盘价 - 止损幅度

2. 跟踪止损逻辑：
   - 价格上涨时：跟踪止损 = max(前止损, 下轨)
   - 价格下跌时：跟踪止损 = min(前止损, 上轨)
   - 价格突破时：跟踪止损 = 对应轨道的值

3. 位置状态识别：
   - 多头位置：价格上穿跟踪止损线
   - 空头位置：价格下穿跟踪止损线

4. 信号确认机制：
   - EMA(1)快速均线作为确认过滤器
   - 需要价格和EMA同时确认突破才生成信号
```

**参数**：

- `a`：调整因子参数，默认1.0，控制ATR乘数，影响止损幅度
- `c`：周期相关参数，默认10，ATR计算周期
- `h`：布尔值，默认False，控制是否使用Heikin Ashi蜡烛图计算
- `**kwargs`：其他扩展参数

**注意**：

- 较小的a值产生更紧密的止损，适合短线交易
- 较大的a值产生更宽松的止损，适合长线趋势跟踪
- Heikin Ashi模式可进一步平滑价格数据，减少噪音
- EMA(1)确认避免假突破，提高信号质量
- 适合作为自动化交易系统的核心信号发生器

**返回值**：IndFrame - 包含以下列：

- `alerts`：动态跟踪止损线，可作警报触发位
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用UT Bot警报指标
        self.utbot = self.data.tradingview.UT_Bot_Alerts(a=1.0, c=10, h=False)
        
        # 基础信号应用
        long_entry = self.utbot.long_signal
        short_entry = self.utbot.short_signal
        
        # 动态止损应用
        long_stop_loss = self.utbot.alerts  # 多头动态止损
        short_stop_loss = self.utbot.alerts  # 空头动态止损
        
        # 位置状态跟踪
        in_long_position = self.data.close > self.utbot.alerts
        in_short_position = self.data.close < self.utbot.alerts
        
        # 多时间框架UT Bot
        tight_utbot = self.data.tradingview.UT_Bot_Alerts(a=0.5, c=5, h=False)   # 紧密止损
        normal_utbot = self.data.tradingview.UT_Bot_Alerts(a=1.0, c=10, h=False) # 正常止损  
        loose_utbot = self.data.tradingview.UT_Bot_Alerts(a=2.0, c=20, h=False)  # 宽松止损
        
        # 三重确认策略
        confirmed_long = (self.utbot.long_signal & 
                         tight_utbot.long_signal & 
                         (normal_utbot.alerts < self.data.close))
        
        confirmed_short = (self.utbot.short_signal & 
                          tight_utbot.short_signal & 
                          (normal_utbot.alerts > self.data.close))
        
        # Heikin Ashi模式对比
        ha_utbot = self.data.tradingview.UT_Bot_Alerts(a=1.0, c=10, h=True)
        regular_utbot = self.data.tradingview.UT_Bot_Alerts(a=1.0, c=10, h=False)
        
        # 信号一致性分析
        signal_alignment = (ha_utbot.long_signal == regular_utbot.long_signal) & \
                          (ha_utbot.short_signal == regular_utbot.short_signal)
        
        # 波动率自适应
        atr = self.data.atr(14)
        high_volatility = atr > atr.rolling(20).mean()
        adaptive_a = np.where(high_volatility, 1.5, 1.0)  # 高波动率时增大止损
```

---

### `SuperTrend` - 超级趋势指标
```python
def SuperTrend(self, Periods=10, Multiplier=3., changeATR=True, **kwargs) -> IndFrame:
```
**功能**：经典的趋势跟踪指标，基于ATR波动率构建动态支撑阻力轨道，通过智能方向识别机制自动切换多空趋势，提供清晰的趋势方向和进出场信号

**应用场景**：

- 趋势方向自动识别
- 动态支撑阻力位构建
- 趋势跟踪策略开发
- 突破和反转信号生成
- 多时间框架趋势分析

**计算原理**：
```
1. ATR波动率计算：
   - 基础ATR = ATR(Periods)
   - 可选平滑：当changeATR为True时使用原始ATR，False时使用SMA平滑

2. 轨道构建：
   - 上轨 = HL2 - Multiplier × ATR
   - 下轨 = HL2 + Multiplier × ATR
   - 动态调整：价格在上轨上方时上轨只升不降，价格在下轨下方时下轨只降不升

3. 趋势方向逻辑：
   - 多头趋势：价格突破下轨时转为上涨趋势
   - 空头趋势：价格突破上轨时转为下跌趋势
   - 趋势线选择：多头时显示下轨作为支撑，空头时显示上轨作为阻力

4. 信号生成：
   - 多头信号：趋势由空转多时触发
   - 空头信号：趋势由多转空时触发
```

**参数**：

- `Periods`：ATR计算周期，默认10，控制波动率测量窗口
- `Multiplier`：ATR乘数，默认3.0，调整趋势轨道宽度
- `changeATR`：布尔值，默认True，控制是否对ATR进行SMA平滑
- `**kwargs`：其他扩展参数

**注意**：

- 较大的Multiplier值产生更宽的轨道，信号更稳定但响应较慢
- 较小的Multiplier值产生更窄的轨道，信号更敏感但可能有更多噪音
- changeATR平滑可减少ATR波动，在震荡市中表现更好
- 趋势转换信号具有很好的连续性，避免频繁交易
- 在趋势明显的市场中表现最佳

**返回值**：IndFrame - 包含以下列：

- `upper`：上轨阻力线（空头趋势时显示）
- `lower`：下轨支撑线（多头趋势时显示）
- `trend`：趋势方向（1: 多头, -1: 空头）
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用超级趋势指标
        self.st = self.data.tradingview.SuperTrend(Periods=10, Multiplier=3.0, changeATR=True)
        
        # 基础信号应用
        long_entry = self.st.long_signal
        short_entry = self.st.short_signal
        
        # 趋势方向判断
        uptrend = self.st.trend == 1
        downtrend = self.st.trend == -1
        
        # 动态支撑阻力应用
        dynamic_support = self.st.lower  # 多头趋势中的支撑
        dynamic_resistance = self.st.upper  # 空头趋势中的阻力
        
        # 多时间框架超级趋势
        fast_st = self.data.tradingview.SuperTrend(Periods=5, Multiplier=2.0, changeATR=True)
        medium_st = self.data.tradingview.SuperTrend(Periods=10, Multiplier=3.0, changeATR=True)
        slow_st = self.data.tradingview.SuperTrend(Periods=20, Multiplier=4.0, changeATR=True)
        
        # 三重时间框架趋势确认
        strong_uptrend = (fast_st.trend == 1) & (medium_st.trend == 1) & (slow_st.trend == 1)
        strong_downtrend = (fast_st.trend == -1) & (medium_st.trend == -1) & (slow_st.trend == -1)
        
        # 趋势强度分析
        trend_duration = (self.st.trend != self.st.trend.shift()).cumsum()
        mature_trend = trend_duration >= 10  # 趋势持续10周期以上
        
        # 与其他指标结合
        rsi = self.data.rsi(14)
        volume_sma = self.data.volume.rolling(20).mean()
        
        # 确认信号
        confirmed_long = self.st.long_signal & (rsi > 40) & (self.data.volume > volume_sma)
        confirmed_short = self.st.short_signal & (rsi < 60) & (self.data.volume > volume_sma)
        
        # 轨道突破策略
        upper_breakout = self.data.close.cross_up(self.st.upper)
        lower_breakout = self.data.close.cross_down(self.st.lower)
        
        # 不同参数组合分析
        sensitive_st = self.data.tradingview.SuperTrend(Periods=7, Multiplier=2.0)
        normal_st = self.data.tradingview.SuperTrend(Periods=10, Multiplier=3.0)
        stable_st = self.data.tradingview.SuperTrend(Periods=14, Multiplier=4.0)
```

---

### `CM_Williams_Vix_Fix_Finds_Market_Bottoms` - CM Williams Vix Fix 市场底部识别指标
```python
def CM_Williams_Vix_Fix_Finds_Market_Bottoms(self, hl=22, bbl=20, mult=2.0, lb=50, ph=.85, pl=1.01, **kwargs) -> IndFrame:
```
**功能**：基于Williams Vix Fix原理的市场极端波动率识别系统，专门用于检测市场恐慌性抛售和底部形成区域，通过波动率扩张和布林带突破识别潜在的反转机会

**应用场景**：

- 市场底部和恐慌性抛售识别
- 波动率极端值分析
- 均值回归交易机会捕捉
- 市场恐慌情绪量化
- 反转策略信号生成

**计算原理**：
```
1. Williams Vix Fix计算：
   - 计算hl周期内的最高收盘价
   - WVF = 100 × (最高价 - 最低价) / 最高价
   - 衡量当前价格相对于近期高点的回撤程度

2. 布林带构建：
   - 中线 = WVF的bbl周期简单移动平均
   - 标准差 = mult × WVF的bbl周期标准差
   - 上轨 = 中线 + 标准差
   - 下轨 = 中线 - 标准差

3. 历史范围统计：
   - 范围高点 = lb周期内WVF最高值 × ph系数
   - 范围低点 = lb周期内WVF最低值 × pl系数
   - 识别波动率的极端水平
```

**参数**：

- `hl`：高低点计算周期，默认22，控制WVF计算的观察窗口
- `bbl`：布林带周期，默认20，波动率通道的计算周期
- `mult`：布林带乘数，默认2.0，控制通道宽度
- `lb`：历史范围统计周期，默认50，极端值识别的回溯窗口
- `ph`：高点范围系数，默认0.85，调整高点阈值的敏感度
- `pl`：低点范围系数，默认1.01，调整低点阈值的敏感度
- `**kwargs`：其他扩展参数

**注意**：

- 高WVF值表示市场恐慌和大幅回撤，可能预示底部
- 范围高点和低点帮助识别波动率的统计极端值
- 布林带上轨突破可能表示波动率异常扩张
- 适合均值回归策略，在波动率极端高位寻找做多机会
- 建议结合价格行为和其他技术指标确认信号

**返回值**：IndFrame - 包含以下列：

- `wvf`：Williams Vix Fix波动率指标
- `lowerBand`：布林带下轨
- `upperBand`：布林带上轨
- `rangeHigh`：波动率高点范围阈值
- `rangeLow`：波动率低点范围阈值

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用CM Williams Vix Fix指标
        self.vixfix = self.data.tradingview.CM_Williams_Vix_Fix_Finds_Market_Bottoms(
            hl=22, bbl=20, mult=2.0, lb=50, ph=0.85, pl=1.01
        )
        
        # 波动率极端值识别
        high_volatility = self.vixfix.wvf > self.vixfix.rangeHigh
        low_volatility = self.vixfix.wvf < self.vixfix.rangeLow
        
        # 布林带突破信号
        upper_breakout = self.vixfix.wvf.cross_up(self.vixfix.upperBand)
        lower_breakout = self.vixfix.wvf.cross_down(self.vixfix.lowerBand)
        
        # 市场底部信号（高波动率+价格超卖）
        rsi = self.data.rsi(14)
        price_near_lows = self.data.close < self.data.close.rolling(50).mean()
        market_bottom_signal = high_volatility & (rsi < 30) & price_near_lows
        
        # 波动率回归正常信号
        volatility_normalizing = (self.vixfix.wvf < self.vixfix.upperBand) & \
                                (self.vixfix.wvf.shift() > self.vixfix.upperBand)
        
        # 多时间框架波动率分析
        short_term_vix = self.data.tradingview.CM_Williams_Vix_Fix_Finds_Market_Bottoms(
            hl=10, bbl=10, mult=1.5, lb=20, ph=0.8, pl=1.02
        )
        long_term_vix = self.data.tradingview.CM_Williams_Vix_Fix_Finds_Market_Bottoms(
            hl=50, bbl=30, mult=2.5, lb=100, ph=0.9, pl=1.0
        )
        
        # 波动率结构分析
        volatility_structure = (short_term_vix.wvf > long_term_vix.wvf)  # 短期波动率高于长期
        
        # 与其他恐慌指标结合
        vix_index = self.data.get_index('VIX')  # 假设有VIX指数数据
        vix_high = vix_index > vix_index.rolling(20).mean()
        confirmed_panic = high_volatility & vix_high
```

---

### `WaveTrend_Oscillator` - WaveTrend 振荡器指标
```python
def WaveTrend_Oscillator(self, n1=10, n2=21, n3=9, **kwargs) -> IndFrame:
```
**功能**：基于三重EMA平滑的先进动量振荡器，通过价格与均衡点的偏离度测量市场动量状态，提供精确的超买超卖信号和趋势动量变化预警

**应用场景**：

- 动量方向和强度分析
- 超买超卖区域识别
- 背离信号检测
- 趋势动量转换预警
- 摆动交易信号生成

**计算原理**：

```
1. 均衡点计算：
   - 使用HL3(最高最低收盘均价)作为价格基准
   - ESA = EMA(价格, n1)  # 均衡点

2. 偏差测量：
   - D = EMA(|价格 - ESA|, n1)  # 绝对偏差
   - CI = (价格 - ESA) / (0.015 × D)  # 通道指数

3. 动量平滑：
   - TCI = EMA(CI, n2)  # 双重平滑动量
   - WT1 = TCI  # 核心WaveTrend线
   - WT2 = SMA(WT1, n3)  # 信号线

4. 信号生成：
   - 信号 = WT1 - WT2  # 动量振荡器
```

**参数**：

- `n1`：第一周期参数，默认10，控制初始EMA平滑和偏差计算
- `n2`：第二周期参数，默认21，控制TCI动量线的平滑度
- `n3`：第三周期参数，默认9，控制信号线的计算周期
- `**kwargs`：其他扩展参数

**注意**：

- 振荡器在±60范围内波动，超过±53视为极端区域
- WT1与WT2的金叉死叉提供交易信号
- 价格与WaveTrend的背离具有很高的预测价值
- 0轴穿越表示动量方向变化
- 适合短线摆动交易和中线趋势确认

**返回值**：IndFrame - 包含以下列：

- `signal`：动量振荡信号，WT1与WT2的差值
- `wt1`：WaveTrend核心动量线
- `wt2`：WaveTrend信号线

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用WaveTrend振荡器
        self.wt = self.data.tradingview.WaveTrend_Oscillator(n1=10, n2=21, n3=9)
        
        # 超买超卖区域
        overbought = (self.wt.wt1 > 53) | (self.wt.wt2 > 53)
        oversold = (self.wt.wt1 < -53) | (self.wt.wt2 < -53)
        
        # 金叉死叉信号
        golden_cross = self.wt.wt1.cross_up(self.wt.wt2)
        death_cross = self.wt.wt1.cross_down(self.wt.wt2)
        
        # 零轴穿越
        zero_cross_up = self.wt.wt1.cross_up(0)
        zero_cross_down = self.wt.wt1.cross_down(0)
        
        # 动量强度分析
        strong_momentum = abs(self.wt.wt1) > 40
        weak_momentum = abs(self.wt.wt1) < 20
        
        # 背离检测
        price_higher_high = (self.data.close > self.data.close.shift()) & \
                           (self.data.close.shift() > self.data.close.shift(2))
        wt_lower_high = (self.wt.wt1 < self.wt.wt1.shift()) & \
                       (self.wt.wt1.shift() < self.wt.wt1.shift(2))
        bearish_divergence = price_higher_high & wt_lower_high
        
        # 多时间框架WaveTrend
        fast_wt = self.data.tradingview.WaveTrend_Oscillator(n1=5, n2=10, n3=5)
        slow_wt = self.data.tradingview.WaveTrend_Oscillator(n1=20, n2=40, n3=15)
        
        # 动量一致性
        momentum_aligned = (self.wt.wt1 > 0) & (fast_wt.wt1 > 0) & (slow_wt.wt1 > 0)
        momentum_divergence = (self.wt.wt1 > 0) & (fast_wt.wt1 < 0)  # 短期与中期动量分歧
        
        # 信号过滤
        filtered_buy = golden_cross & (self.wt.wt1 < 0) & (self.wt.signal > 0)
        filtered_sell = death_cross & (self.wt.wt1 > 0) & (self.wt.signal < 0)
        
        # 极端反转信号
        extreme_oversold_bounce = (self.wt.wt1 < -60) & golden_cross
        extreme_overbought_rejection = (self.wt.wt1 > 60) & death_cross
```

---

### `ADX_and_DI` - ADX 与 DI 指标（平均方向指数 + 方向指标）
```python
def ADX_and_DI(self, length=14, **kwargs) -> IndFrame:
```
**功能**：经典的趋势强度测量系统，通过平均方向指数(ADX)量化趋势强度，结合正向方向指标(DI+)和负向方向指标(DI-)识别趋势方向，提供完整的多维度趋势分析

**应用场景**：

- 趋势强度和持续性评估
- 趋势方向精确识别
- 趋势转换预警
- 突破交易确认
- 多时间框架趋势分析

**计算原理**：
```
1. 真实波幅计算：
   - TR = max(当日最高-当日最低, |当日最高-前日收盘|, |当日最低-前日收盘|)

2. 方向运动计算：
   - +DM = 当日最高 - 前日最高（如果为正且大于|当日最低-前日最低|）
   - -DM = 前日最低 - 当日最低（如果为正且大于|当日最高-前日最高|）

3. 平滑处理：
   - 平滑TR = 前平滑TR - (前平滑TR/length) + 当前TR
   - 平滑+DM = 前平滑+DM - (前平滑+DM/length) + 当前+DM
   - 平滑-DM = 前平滑-DM - (前平滑-DM/length) + 当前-DM

4. 方向指标计算：
   - +DI = 100 × (平滑+DM / 平滑TR)
   - -DI = 100 × (平滑-DM / 平滑TR)

5. 方向指数计算：
   - DX = 100 × |(+DI) - (-DI)| / (+DI + -DI)
   - ADX = DX的length周期简单移动平均
```

**参数**：

- `length`：ADX计算周期，默认14，控制趋势强度的平滑窗口
- `**kwargs`：其他扩展参数

**注意**：

- ADX > 25表示趋势明显，ADX < 20表示震荡市场
- +DI > -DI表示上升趋势，-DI > +DI表示下降趋势
- ADX上升表示趋势加强，ADX下降表示趋势减弱
- +DI与-DI交叉提供趋势转换信号
- 适合作为其他策略的趋势过滤器

**返回值**：IndFrame - 包含以下列：

- `ADX`：平均方向指数，衡量趋势强度
- `DIPlus`：正向方向指标，衡量上升趋势强度
- `DIMinus`：负向方向指标，衡量下降趋势强度

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用ADX与DI指标
        self.adx_di = self.data.tradingview.ADX_and_DI(length=14)
        
        # 趋势强度判断
        strong_trend = self.adx_di.ADX > 25
        weak_trend = self.adx_di.ADX < 20
        no_trend = self.adx_di.ADX < 15
        
        # 趋势方向判断
        uptrend = self.adx_di.DIPlus > self.adx_di.DIMinus
        downtrend = self.adx_di.DIMinus > self.adx_di.DIPlus
        
        # DI交叉信号
        di_bullish_cross = self.adx_di.DIPlus.cross_up(self.adx_di.DIMinus)
        di_bearish_cross = self.adx_di.DIPlus.cross_down(self.adx_di.DIMinus)
        
        # 趋势强度变化
        adx_rising = self.adx_di.ADX > self.adx_di.ADX.shift()
        adx_falling = self.adx_di.ADX < self.adx_di.ADX.shift()
        
        # 多时间框架ADX分析
        fast_adx = self.data.tradingview.ADX_and_DI(length=7)
        slow_adx = self.data.tradingview.ADX_and_DI(length=21)
        
        # 趋势一致性
        trend_aligned = (uptrend & (fast_adx.DIPlus > fast_adx.DIMinus) & 
                        (slow_adx.DIPlus > slow_adx.DIMinus))
        
        # ADX极端值识别
        extreme_trend_strength = self.adx_di.ADX > 50
        very_weak_trend = self.adx_di.ADX < 10
        
        # 与其他指标结合
        price_above_ma = self.data.close > self.data.close.ema(20)
        volume_sma = self.data.volume.rolling(20).mean()
        
        # 确认趋势信号
        confirmed_uptrend = uptrend & strong_trend & price_above_ma & (self.data.volume > volume_sma)
        confirmed_downtrend = downtrend & strong_trend & (~price_above_ma) & (self.data.volume > volume_sma)
        
        # 趋势转换预警
        trend_reversal_warning = di_bullish_cross & (self.adx_di.ADX > 20)
```

---

### `Bollinger_RSI_Double_Strategy` - 布林带 + RSI 双重策略
```python
def Bollinger_RSI_Double_Strategy(self, RSIlength=6, RSIoverSold=50., RSIoverBought=50., BBlength=200, BBmult=2., **kwargs) -> IndFrame:
```
**功能**：布林带突破与RSI动量确认的双重过滤策略，通过长周期布林带识别关键支撑阻力位，结合RSI超买超卖状态提供高概率的突破交易信号

**应用场景**：

- 突破交易策略
- 均值回归机会识别
- 动量确认交易
- 支撑阻力突破分析
- 双重确认信号生成

**计算原理**：
```
1. RSI动量计算：
   - RSI = 100 - (100 / (1 + 平均涨幅/平均跌幅))
   - 使用RSIlength周期计算相对强弱指数

2. 布林带构建：
   - 中线 = 价格的BBlength周期简单移动平均
   - 标准差 = BBmult × 价格的BBlength周期标准差
   - 上轨 = 中线 + 标准差
   - 下轨 = 中线 - 标准差

3. 双重确认信号：
   - 多头信号：价格上穿布林带下轨且RSI上穿超卖阈值
   - 空头信号：价格下穿布林带上轨且RSI下穿超买阈值
   - 需要价格和RSI同时确认才生成交易信号
```

**参数**：

- `RSIlength`：RSI计算周期，默认6，较短周期提供更敏感的动量信号
- `RSIoverSold`：RSI超卖阈值，默认50.0，较高的阈值产生更多信号
- `RSIoverBought`：RSI超买阈值，默认50.0，较低的阈值产生更多信号
- `BBlength`：布林带计算周期，默认200，长周期提供更稳定的支撑阻力
- `BBmult`：布林带乘数，默认2.0，控制轨道宽度
- `**kwargs`：其他扩展参数

**注意**：

- 使用50作为RSI阈值使策略更敏感，适合短线交易
- 长周期布林带(200)提供重要的长期支撑阻力位
- 双重确认机制显著减少假突破交易
- 策略在趋势初期的突破中表现最佳
- 建议配合止损和仓位管理使用

**返回值**：IndFrame - 包含以下列：

- `BBupper`：布林带上轨阻力线
- `BBlower`：布林带下轨支撑线
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用布林带RSI双重策略
        self.bb_rsi = self.data.tradingview.Bollinger_RSI_Double_Strategy(
            RSIlength=6, RSIoverSold=50.0, RSIoverBought=50.0, 
            BBlength=200, BBmult=2.0
        )
        
        # 基础信号应用
        long_entry = self.bb_rsi.long_signal
        short_entry = self.bb_rsi.short_signal
        
        # 布林带位置分析
        bb_position = (self.data.close - self.bb_rsi.BBlower) / (self.bb_rsi.BBupper - self.bb_rsi.BBlower)
        near_lower_band = bb_position < 0.2
        near_upper_band = bb_position > 0.8
        
        # RSI状态分析
        rsi = self.data.rsi(6)
        rsi_above_50 = rsi > 50
        rsi_below_50 = rsi < 50
        
        # 多时间框架确认
        fast_bb_rsi = self.data.tradingview.Bollinger_RSI_Double_Strategy(
            RSIlength=3, RSIoverSold=40.0, RSIoverBought=60.0, 
            BBlength=50, BBmult=1.5
        )
        slow_bb_rsi = self.data.tradingview.Bollinger_RSI_Double_Strategy(
            RSIlength=14, RSIoverSold=30.0, RSIoverBought=70.0, 
            BBlength=400, BBmult=2.5
        )
        
        # 三重时间框架确认
        confirmed_long = (self.bb_rsi.long_signal & 
                         fast_bb_rsi.long_signal & 
                         (slow_bb_rsi.BBlower < self.data.close))
        
        confirmed_short = (self.bb_rsi.short_signal & 
                          fast_bb_rsi.short_signal & 
                          (slow_bb_rsi.BBupper > self.data.close))
        
        # 布林带宽度分析
        bb_width = (self.bb_rsi.BBupper - self.bb_rsi.BBlower) / self.bb_rsi.BBlower
        high_volatility = bb_width > bb_width.rolling(50).mean()
        
        # 信号强度评估
        strong_long_signal = self.bb_rsi.long_signal & (rsi < 40) & high_volatility
        strong_short_signal = self.bb_rsi.short_signal & (rsi > 60) & high_volatility
        
        # 与其他指标结合
        volume_confirmation = self.data.volume > self.data.volume.rolling(20).mean()
        adx = self.data.adx(14)
        trend_confirmation = adx > 25
        
        # 趋势突破确认
        trend_breakout_long = self.bb_rsi.long_signal & trend_confirmation & volume_confirmation
        trend_breakout_short = self.bb_rsi.short_signal & trend_confirmation & volume_confirmation
```

---

### `Pivot_Point_Supertrend` - 枢轴点 + 超级趋势指标
```python
def Pivot_Point_Supertrend(self, prd=2, Factor=3, Pd=10, **kwargs) -> IndFrame:
```
**功能**：结合枢轴点理论和超级趋势算法的复合趋势跟踪系统，通过动态枢轴点识别关键价格水平，结合ATR波动率构建自适应跟踪止损，提供精确的趋势转换信号

**应用场景**：

- 动态支撑阻力位识别
- 趋势方向精确跟踪
- 突破和反转交易
- 自适应止损设置
- 多时间框架趋势分析

**计算原理**：
```
1. 枢轴点计算：
   - 基于2×prd+1周期的高低点识别关键枢轴
   - 当创周期新高时：lastpp = 最高价
   - 当创周期新低时：lastpp = 最低价
   - 否则：lastpp = 前中心值
   - 中心点 = (2 × 前中心值 + lastpp) / 3

2. 超级趋势轨道构建：
   - 上轨 = 中心点 - Factor × ATR(Pd)
   - 下轨 = 中心点 + Factor × ATR(Pd)

3. 趋势跟踪逻辑：
   - 价格在上轨上方时上轨只升不降
   - 价格在下轨下方时下轨只降不升
   - 趋势方向：价格突破下轨转多，突破上轨转空

4. 信号生成：
   - 多头信号：趋势由空转多时触发
   - 空头信号：趋势由多转空时触发
```

**参数**：

- `prd`：枢轴点计算周期相关参数，默认2，控制枢轴点识别的敏感度
- `Factor`：超级趋势乘数，默认3，控制轨道宽度
- `Pd`：ATR计算周期，默认10，衡量价格波动率
- `**kwargs`：其他扩展参数

**注意**：

- 枢轴点算法能够自适应识别重要的价格转折点
- 较大的Factor值产生更稳定的信号但响应较慢
- 在趋势明显的市场中表现最佳
- 枢轴点与超级趋势的结合提供双重趋势确认
- 适合中长线趋势跟踪策略

**返回值**：IndFrame - 包含以下列：

- `Trailingsl`：动态跟踪止损线，多空趋势的转换线
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用枢轴点超级趋势指标
        self.pp_st = self.data.tradingview.Pivot_Point_Supertrend(prd=2, Factor=3, Pd=10)
        
        # 基础信号应用
        long_entry = self.pp_st.long_signal
        short_entry = self.pp_st.short_signal
        
        # 趋势方向判断
        uptrend = self.data.close > self.pp_st.Trailingsl
        downtrend = self.data.close < self.pp_st.Trailingsl
        
        # 动态止损应用
        long_stop_loss = self.pp_st.Trailingsl
        short_stop_loss = self.pp_st.Trailingsl
        
        # 多时间框架系统
        fast_pp_st = self.data.tradingview.Pivot_Point_Supertrend(prd=1, Factor=2, Pd=5)
        slow_pp_st = self.data.tradingview.Pivot_Point_Supertrend(prd=3, Factor=4, Pd=20)
        
        # 趋势一致性确认
        confirmed_uptrend = (uptrend & 
                           (fast_pp_st.Trailingsl < self.data.close) & 
                           (slow_pp_st.Trailingsl < self.data.close))
        
        confirmed_downtrend = (downtrend & 
                             (fast_pp_st.Trailingsl > self.data.close) & 
                             (slow_pp_st.Trailingsl > self.data.close))
        
        # 枢轴点突破强度分析
        pivot_breakout_strength = abs(self.data.close - self.pp_st.Trailingsl) / self.data.atr(14)
        strong_breakout = pivot_breakout_strength > 2.0
        
        # 与其他指标结合
        volume_confirmation = self.data.volume > self.data.volume.rolling(20).mean()
        rsi = self.data.rsi(14)
        
        # 过滤信号
        filtered_long = self.pp_st.long_signal & strong_breakout & volume_confirmation & (rsi > 40)
        filtered_short = self.pp_st.short_signal & strong_breakout & volume_confirmation & (rsi < 60)
        
        # 趋势持续时间分析
        trend_duration = (self.pp_st.Trailingsl.diff() != 0).cumsum()
        mature_trend = trend_duration >= 8  # 趋势持续8周期以上
```

---

### `AlphaTrend` - Alpha 趋势指标
```python
def AlphaTrend(self, coeff=1., AP=14, novolumedata=False, **kwargs) -> IndFrame:
```
**功能**：基于资金流量指数(MFI)或RSI的智能趋势跟踪系统，通过成交量加权价格分析和ATR波动率调整，提供自适应的趋势识别和精确的转换信号

**应用场景**：

- 量价结合趋势分析
- 智能趋势方向识别
- 动态支撑阻力构建
- 突破和反转交易
- 机构级趋势跟踪

**计算原理**：
```
1. 波动率调整轨道：
   - ATR = 真实波幅的AP周期简单移动平均
   - 上轨 = 最低价 - coeff × ATR
   - 下轨 = 最高价 + coeff × ATR

2. 量价动量确认：
   - 默认使用MFI(资金流量指数)衡量资金流向
   - 可选使用RSI(当novolumedata为True时)
   - 阈值50作为多空分界线

3. Alpha趋势线生成：
   - MFI/RSI ≥ 50时：AlphaTrend = max(前值, 上轨)
   - MFI/RSI < 50时：AlphaTrend = min(前值, 下轨)
   - 确保趋势线的连续性

4. 趋势方向判定：
   - 基于AlphaTrend与2周期前值的比较
   - 上升趋势：当前值 > 2周期前值
   - 下降趋势：当前值 < 2周期前值
```

**参数**：

- `coeff`：系数参数，默认1.0，控制ATR轨道的宽度
- `AP`：ATR计算周期，默认14，波动率测量窗口
- `novolumedata`：布尔值，默认False，控制是否禁用成交量数据（使用RSI替代MFI）
- `**kwargs`：其他扩展参数

**注意**：

- MFI版本结合了价格和成交量，提供更可靠的趋势信号
- RSI版本在没有成交量数据时使用，信号质量稍差
- 2周期延迟比较避免噪音干扰，提供更稳定的趋势判断
- 适合各种时间框架，从短线到长线都表现良好
- 建议在趋势明显的市场环境中使用

**返回值**：IndFrame - 包含以下列：

- `AlphaTrend`：Alpha趋势线，动态的支撑阻力位
- `AlphaTrend2`：延迟2周期的Alpha趋势线，用于趋势方向判断
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`, `volume`（当novolumedata为False时）

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用Alpha趋势指标（使用MFI版本）
        self.alpha = self.data.tradingview.AlphaTrend(coeff=1.0, AP=14, novolumedata=False)
        
        # 基础信号应用
        long_entry = self.alpha.long_signal
        short_entry = self.alpha.short_signal
        
        # 趋势方向判断
        uptrend = self.alpha.AlphaTrend > self.alpha.AlphaTrend2
        downtrend = self.alpha.AlphaTrend < self.alpha.AlphaTrend2
        
        # 价格与趋势线关系
        price_above_alpha = self.data.close > self.alpha.AlphaTrend
        price_below_alpha = self.data.close < self.alpha.AlphaTrend
        
        # 多时间框架Alpha趋势
        fast_alpha = self.data.tradingview.AlphaTrend(coeff=0.8, AP=7, novolumedata=False)
        slow_alpha = self.data.tradingview.AlphaTrend(coeff=1.2, AP=21, novolumedata=False)
        
        # 三重时间框架确认
        strong_uptrend = (uptrend & 
                         (fast_alpha.AlphaTrend > fast_alpha.AlphaTrend2) & 
                         (slow_alpha.AlphaTrend > slow_alpha.AlphaTrend2))
        
        strong_downtrend = (downtrend & 
                           (fast_alpha.AlphaTrend < fast_alpha.AlphaTrend2) & 
                           (slow_alpha.AlphaTrend < slow_alpha.AlphaTrend2))
        
        # MFI/RSI状态分析
        if not self.alpha.params.novolumedata:
            mfi = self.data.hlc3().mfi(14)
            strong_bullish_mfi = mfi > 60
            strong_bearish_mfi = mfi < 40
        else:
            rsi = self.data.rsi(14)
            strong_bullish_rsi = rsi > 60
            strong_bearish_rsi = rsi < 40
        
        # 信号强度评估
        strong_long_signal = self.alpha.long_signal & strong_uptrend & price_above_alpha
        strong_short_signal = self.alpha.short_signal & strong_downtrend & price_below_alpha
        
        # 与其他指标结合
        atr = self.data.atr(14)
        volatility_ratio = atr / self.data.close
        high_volatility = volatility_ratio > volatility_ratio.rolling(20).mean()
        
        # 动态止损设置
        long_stop_loss = self.alpha.AlphaTrend
        short_stop_loss = self.alpha.AlphaTrend
        
        # 版本对比分析
        mfi_alpha = self.data.tradingview.AlphaTrend(novolumedata=False)
        rsi_alpha = self.data.tradingview.AlphaTrend(novolumedata=True)
        
        # 信号一致性
        signal_alignment = (mfi_alpha.long_signal == rsi_alpha.long_signal) & \
                          (mfi_alpha.short_signal == rsi_alpha.short_signal)
```

---

### `Volume_Flow_Indicator` - 成交量流量指标
```python
def Volume_Flow_Indicator(self, length=130, coef=0.2, vcoef=2.5, signalLength=5, smoothVFI=False, **kwargs) -> IndFrame:
```
**功能**：基于价格变动和成交量异常的智能资金流向分析系统，通过统计价格变动的标准差识别有效价格变动，结合成交量过滤机制，精确测量资金流入流出方向

**应用场景**：

- 资金流向分析和大单追踪
- 量价背离识别
- 机构资金动向监测
- 趋势强度确认
- 突破交易量能验证

**计算原理**：
```
1. 价格变动标准化：
   - 典型价格 = (最高+最低+收盘)/3
   - 对数变动 = ln(典型价格) - ln(前典型价格)
   - 变动标准差 = 对数变动的30周期标准差
   - 截断阈值 = coef × 变动标准差 × 收盘价

2. 成交量过滤：
   - 平均成交量 = 成交量的length周期简单移动平均
   - 最大成交量 = 平均成交量 × vcoef
   - 有效成交量 = min(当前成交量, 最大成交量)

3. 资金流向计算：
   - 价格变动 > 阈值：资金流入 = 有效成交量
   - 价格变动 < -阈值：资金流出 = -有效成交量
   - 其他情况：资金流 = 0

4. VFI指标：
   - VFI = ∑(资金流) / 平均成交量
   - 可选平滑：当smoothVFI为True时使用SMA平滑
   - 信号线 = VFI的signalLength周期指数移动平均
```

**参数**：

- `length`：基础周期，默认130，控制成交量平均和资金流计算的窗口
- `coef`：系数参数，默认0.2，控制价格变动截断的敏感度
- `vcoef`：成交量系数，默认2.5，控制异常成交量的过滤阈值
- `signalLength`：信号平滑周期，默认5，VFI信号线的计算周期
- `smoothVFI`：布尔值，默认False，控制是否对VFI进行额外平滑
- `**kwargs`：其他扩展参数

**注意**：

- 对数价格变动和标准差过滤有效识别有意义的价格变动
- 成交量过滤机制排除异常交易量的干扰
- VFI与价格背离具有很高的预测价值
- 正VFI表示资金净流入，负VFI表示资金净流出
- 信号线交叉提供交易时机

**返回值**：IndFrame - 包含以下列：

- `vfima`：VFI信号线，成交量流量指数的移动平均
- `vfi`：成交量流量指标，核心的资金流向测量

**所需数据字段**：`high`, `low`, `close`, `volume`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用成交量流量指标
        self.vfi = self.data.tradingview.Volume_Flow_Indicator(
            length=130, coef=0.2, vcoef=2.5, signalLength=5, smoothVFI=False
        )
        
        # 资金流向判断
        money_inflow = self.vfi.vfi > 0
        money_outflow = self.vfi.vfi < 0
        strong_inflow = self.vfi.vfi > 0.5
        strong_outflow = self.vfi.vfi < -0.5
        
        # 信号线交叉
        bullish_cross = self.vfi.vfi.cross_up(self.vfi.vfima)
        bearish_cross = self.vfi.vfi.cross_down(self.vfi.vfima)
        
        # 零轴穿越
        zero_cross_up = self.vfi.vfi.cross_up(0)
        zero_cross_down = self.vfi.vfi.cross_down(0)
        
        # 量价背离检测
        price_higher_high = (self.data.close > self.data.close.shift()) & \
                           (self.data.close.shift() > self.data.close.shift(2))
        vfi_lower_high = (self.vfi.vfi < self.vfi.vfi.shift()) & \
                        (self.vfi.vfi.shift() < self.vfi.vfi.shift(2))
        bearish_divergence = price_higher_high & vfi_lower_high
        
        # 多时间框架VFI分析
        fast_vfi = self.data.tradingview.Volume_Flow_Indicator(
            length=65, coef=0.3, vcoef=2.0, signalLength=3
        )
        slow_vfi = self.data.tradingview.Volume_Flow_Indicator(
            length=200, coef=0.15, vcoef=3.0, signalLength=8
        )
        
        # 资金流向一致性
        money_flow_aligned = (self.vfi.vfi > 0) & (fast_vfi.vfi > 0) & (slow_vfi.vfi > 0)
        
        # 与其他指标结合
        price_above_ma = self.data.close > self.data.close.ema(20)
        volume_sma = self.data.volume.rolling(20).mean()
        high_volume = self.data.volume > volume_sma
        
        # 确认信号
        confirmed_bullish = bullish_cross & money_inflow & price_above_ma & high_volume
        confirmed_bearish = bearish_cross & money_outflow & (~price_above_ma) & high_volume
        
        # VFI极端值识别
        extreme_inflow = self.vfi.vfi > 1.0
        extreme_outflow = self.vfi.vfi < -1.0
```

---

### `Chandelier_Exit` - 吊灯出场指标
```python
def Chandelier_Exit(self, length=22, mult=3., useClose=True, **kwargs) -> IndFrame:
```
**功能**：基于ATR波动率的智能跟踪止损系统，通过动态计算最高点/最低点的偏移止损位，为多头和空头头寸提供精确的出场信号，特别适合趋势跟踪策略的风险管理

**应用场景**：

- 动态止损止盈设置
- 趋势跟踪策略出场
- 风险管理工具
- 突破交易保护
- 多空头寸管理

**计算原理**：
```
1. ATR波动率计算：
   - ATR值 = ATR(length周期)
   - 止损幅度 = mult × ATR值

2. 止损位计算：
   - 多头止损：useClose为True时：最高收盘价 - 止损幅度
              useClose为False时：最高价 - 止损幅度
   - 空头止损：useClose为True时：最低收盘价 + 止损幅度
              useClose为False时：最低价 + 止损幅度

3. 动态调整逻辑：
   - 价格上涨时：多头止损只升不降
   - 价格下跌时：空头止损只降不升
   - 确保止损位向有利方向移动

4. 方向识别：
   - 价格上穿空头止损转多头
   - 价格下穿多头止损转空头
```

**参数**：

- `length`：周期参数，默认22，控制ATR和极值点的计算窗口
- `mult`：ATR乘数，默认3.0，控制止损幅度
- `useClose`：布尔值，默认True，控制使用收盘价还是最高最低价计算极值
- `**kwargs`：其他扩展参数

**注意**：

- 使用收盘价计算减少噪音，使用最高最低价更敏感
- 较大的mult值提供更宽松的止损，适合长线趋势
- 较小的mult值提供更紧密的止损，适合短线交易
- 吊灯止损只向有利方向移动，锁定利润的同时给趋势足够空间
- 适合作为其他趋势策略的动态止损工具

**返回值**：IndFrame - 包含以下列：

- `up`：上轨止损线（空头止损位）
- `dn`：下轨止损线（多头止损位）
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用吊灯出场指标
        self.ce = self.data.tradingview.Chandelier_Exit(length=22, mult=3.0, useClose=True)
        
        # 基础信号应用
        long_entry = self.ce.long_signal
        short_entry = self.ce.short_signal
        
        # 动态止损应用
        long_stop_loss = self.ce.dn  # 多头止损位
        short_stop_loss = self.ce.up  # 空头止损位
        
        # 趋势方向判断
        uptrend = self.data.close > self.ce.up
        downtrend = self.data.close < self.ce.dn
        
        # 多时间框架吊灯止损
        tight_ce = self.data.tradingview.Chandelier_Exit(length=14, mult=2.0, useClose=True)
        normal_ce = self.data.tradingview.Chandelier_Exit(length=22, mult=3.0, useClose=True)
        loose_ce = self.data.tradingview.Chandelier_Exit(length=30, mult=4.0, useClose=True)
        
        # 三重止损保护
        conservative_long_stop = max(self.ce.dn, tight_ce.dn, loose_ce.dn)
        conservative_short_stop = min(self.ce.up, tight_ce.up, loose_ce.up)
        
        # 止损距离分析
        long_stop_distance = (self.data.close - self.ce.dn) / self.data.close
        short_stop_distance = (self.ce.up - self.data.close) / self.data.close
        tight_stop = long_stop_distance < 0.02  # 止损距离小于2%
        
        # 与其他指标结合
        atr = self.data.atr(14)
        volatility_ratio = atr / self.data.close
        high_volatility = volatility_ratio > volatility_ratio.rolling(20).mean()
        
        # 自适应乘数
        adaptive_mult = np.where(high_volatility, 3.5, 2.5)  # 高波动率时增大止损
        
        # 版本对比
        close_ce = self.data.tradingview.Chandelier_Exit(useClose=True)
        highlow_ce = self.data.tradingview.Chandelier_Exit(useClose=False)
        
        # 止损敏感性分析
        more_sensitive_stop = close_ce.dn  # 使用收盘价通常更敏感
        less_sensitive_stop = highlow_ce.dn  # 使用最高最低价通常更宽松
        
        # 突破确认策略
        volume_confirmation = self.data.volume > self.data.volume.rolling(20).mean()
        confirmed_breakout_long = self.ce.long_signal & volume_confirmation
        confirmed_breakout_short = self.ce.short_signal & volume_confirmation
```

---

### `SuperTrend_STRATEGY` - 超级趋势策略
```python
def SuperTrend_STRATEGY(self, Periods=10, Multiplier=3., changeATR=True, **kwargs) -> IndFrame:
```
**功能**：基于ATR波动率的智能趋势跟踪策略，通过动态支撑阻力轨道和方向识别机制，提供清晰的趋势转换信号和精确的进出场时机，专为趋势跟踪交易设计

**应用场景**：

- 趋势方向自动识别和跟踪
- 突破交易策略执行
- 动态止损止盈设置
- 多时间框架趋势分析
- 自动化趋势跟踪系统

**计算原理**：
```
1. ATR波动率计算：
   - 基础ATR = ATR(Periods周期)
   - 可选平滑：当changeATR为False时，使用真实波幅的简单移动平均

2. 轨道构建：
   - 基于HL2(最高最低均价)计算基准线
   - 多头止损线 = HL2 - Multiplier × ATR
   - 空头止损线 = HL2 + Multiplier × ATR

3. 动态调整机制：
   - 价格上涨时：多头止损线只升不降
   - 价格下跌时：空头止损线只降不升
   - 确保止损位向有利方向移动

4. 方向识别逻辑：
   - 多头趋势：价格突破空头止损线
   - 空头趋势：价格跌破多头止损线
   - 趋势线选择：多头时显示下轨，空头时显示上轨
```

**参数**：

- `Periods`：ATR计算周期，默认10，控制波动率测量窗口
- `Multiplier`：ATR乘数，默认3.0，调整趋势轨道宽度
- `changeATR`：布尔值，默认True，控制是否使用标准ATR计算（False时使用TR的SMA）
- `**kwargs`：其他扩展参数

**注意**：

- 使用HL2均价计算减少单价格点的噪音影响
- 较大的Multiplier值提供更宽松的止损，适合长线趋势
- 较小的Multiplier值提供更紧密的止损，适合短线交易
- 在趋势明显的单边市中表现最佳
- 震荡市可能产生频繁的信号翻转

**返回值**：IndFrame - 包含以下列：

- `up`：上轨趋势线（空头趋势时显示）
- `dn`：下轨趋势线（多头趋势时显示）
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`, `close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用超级趋势策略
        self.st_strategy = self.data.tradingview.SuperTrend_STRATEGY(
            Periods=10, Multiplier=3.0, changeATR=True
        )
        
        # 基础信号应用
        long_entry = self.st_strategy.long_signal
        short_entry = self.st_strategy.short_signal
        
        # 趋势方向判断
        uptrend = self.data.close > self.st_strategy.dn
        downtrend = self.data.close < self.st_strategy.up
        
        # 动态止损应用
        long_stop_loss = self.st_strategy.dn
        short_stop_loss = self.st_strategy.up
        
        # 多时间框架超级趋势
        fast_st = self.data.tradingview.SuperTrend_STRATEGY(
            Periods=5, Multiplier=2.0, changeATR=True
        )
        slow_st = self.data.tradingview.SuperTrend_STRATEGY(
            Periods=20, Multiplier=4.0, changeATR=True
        )
        
        # 三重时间框架确认
        strong_uptrend = uptrend & (fast_st.dn < self.data.close) & (slow_st.dn < self.data.close)
        strong_downtrend = downtrend & (fast_st.up > self.data.close) & (slow_st.up > self.data.close)
        
        # 趋势强度分析
        trend_duration = (self.st_strategy.long_signal | self.st_strategy.short_signal).cumsum()
        mature_trend = trend_duration >= 5  # 趋势持续5周期以上
        
        # 与其他指标结合
        volume_confirmation = self.data.volume > self.data.volume.rolling(20).mean()
        rsi = self.data.rsi(14)
        
        # 过滤信号
        filtered_long = self.st_strategy.long_signal & volume_confirmation & (rsi > 40)
        filtered_short = self.st_strategy.short_signal & volume_confirmation & (rsi < 60)
        
        # 突破强度测量
        breakout_strength = abs(self.data.close - self.st_strategy.dn) / self.data.atr(14)
        strong_breakout = breakout_strength > 1.5
```

---

### `Optimized_Trend_Tracker` - 优化的趋势跟踪指标
```python
def Optimized_Trend_Tracker(self, length=2, var_length=9, percent=1.4, base=200, **kwargs) -> IndFrame:
```
**功能**：基于变异调整移动平均(VAR)的优化趋势跟踪系统，通过CMO动量振荡器动态调整平滑系数，结合百分比偏移机制构建智能趋势轨道，提供精确的趋势方向和转换信号

**应用场景**：

- 智能趋势识别和跟踪
- 动量自适应趋势分析
- 动态支撑阻力构建
- 突破和反转交易
- 多时间框架趋势确认

**计算原理**：
```
1. 变异调整移动平均(VAR)：
   - 基于CMO(钱德动量振荡器)计算动态平滑系数
   - CMO = (上涨总和 - 下跌总和) / (上涨总和 + 下跌总和)
   - VAR = alpha × |CMO| × 当前价格 + (1 - alpha × |CMO|) × 前VAR

2. 基础轨道构建：
   - 偏移幅度 = VAR × percent × 0.01
   - 多头止损线 = VAR - 偏移幅度
   - 空头止损线 = VAR + 偏移幅度

3. 动态调整机制：
   - VAR上涨时：多头止损线只升不降
   - VAR下跌时：空头止损线只降不升

4. 优化趋势跟踪(OTT)：
   - 基础系数：base_up = (base + percent) / base
   - 下降系数：base_dn = (base - percent) / base
   - OTT = VAR > MT ? MT × base_up : MT × base_dn
```

**参数**：

- `length`：基础周期，默认2，控制VAR计算的初始平滑系数
- `var_length`：变异周期，默认9，CMO动量计算窗口
- `percent`：百分比参数，默认1.4，控制轨道宽度
- `base`：基础参考值，默认200，影响OTT计算的系数
- `**kwargs`：其他扩展参数

**注意**：

- VAR移动平均在趋势市中响应更快，在震荡市中更加平滑
- OTT机制提供超前的趋势转换预警
- 较小的percent值产生更紧密的轨道，适合短线交易
- 较大的percent值产生更宽松的轨道，适合长线趋势
- 适合作为其他策略的趋势过滤器或动态止损工具

**返回值**：IndFrame - 包含以下列：

- `MT`：主趋势线，基于VAR的动态支撑阻力
- `OTT`：优化趋势跟踪线，提供趋势转换预警
- `long_signal`：多头入场信号（OTT上穿MT）
- `short_signal`：空头入场信号（MT上穿OTT）

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用优化趋势跟踪指标
        self.ott = self.data.tradingview.Optimized_Trend_Tracker(
            length=2, var_length=9, percent=1.4, base=200
        )
        
        # 基础信号应用
        long_entry = self.ott.long_signal
        short_entry = self.ott.short_signal
        
        # 趋势方向判断
        uptrend = self.ott.OTT > self.ott.MT
        downtrend = self.ott.OTT < self.ott.MT
        
        # 交叉信号强度
        strong_bullish_cross = self.ott.long_signal & (self.ott.OTT > self.ott.OTT.shift())
        strong_bearish_cross = self.ott.short_signal & (self.ott.OTT < self.ott.OTT.shift())
        
        # 多时间框架OTT系统
        fast_ott = self.data.tradingview.Optimized_Trend_Tracker(
            length=1, var_length=5, percent=1.0, base=100
        )
        slow_ott = self.data.tradingview.Optimized_Trend_Tracker(
            length=3, var_length=14, percent=2.0, base=300
        )
        
        # 三重时间框架趋势确认
        confirmed_uptrend = uptrend & (fast_ott.OTT > fast_ott.MT) & (slow_ott.OTT > slow_ott.MT)
        confirmed_downtrend = downtrend & (fast_ott.OTT < fast_ott.MT) & (slow_ott.OTT < slow_ott.MT)
        
        # 趋势转换预警
        trend_reversal_warning = (self.ott.OTT - self.ott.MT).abs() < (self.ott.OTT - self.ott.MT).abs().rolling(10).mean() * 0.5
        
        # 与其他指标结合
        volume_sma = self.data.volume.rolling(20).mean()
        high_volume = self.data.volume > volume_sma
        adx = self.data.adx(14)
        strong_trend = adx > 25
        
        # 确认信号
        volume_confirmed_long = self.ott.long_signal & high_volume & strong_trend
        volume_confirmed_short = self.ott.short_signal & high_volume & strong_trend
        
        # OTT与价格关系
        price_above_ott = self.data.close > self.ott.OTT
        price_below_ott = self.data.close < self.ott.OTT
        
        # 动态支撑阻力应用
        dynamic_support = self.ott.MT
        dynamic_resistance = self.ott.OTT
```

---

### `TonyUX_EMA_Scalper` - TonyUX EMA 剥头皮策略
```python
def TonyUX_EMA_Scalper(self, length=20, period=8, **kwargs) -> IndFrame:
```
**功能**：基于EMA交叉和价格动量确认的短线剥头皮交易系统，通过快速EMA突破结合近期高低点分析，捕捉短期价格波动中的精确入场时机

**应用场景**：

- 短线剥头皮交易
- 日内突破策略
- 快速动量交易
- 震荡市场中的波段操作
- 高频交易信号生成

**计算原理**：
```
1. EMA趋势线计算：
   - EMA = 收盘价的length周期指数移动平均
   - 提供动态的短期趋势参考线

2. 近期高低点识别：
   - 近期高点 = 收盘价的period周期最高值
   - 近期低点 = 收盘价的period周期最低值
   - 识别短期的支撑阻力位

3. 双重确认信号：
   - 多头信号：价格上穿EMA且前根K线收盘价上涨
   - 空头信号：价格下穿EMA且前根K线收盘价下跌
   - 价格动量过滤避免假突破
```

**参数**：

- `length`：EMA计算周期，默认20，控制趋势线的平滑度
- `period`：价格高低点统计周期，默认8，控制近期极值点的识别窗口
- `**kwargs`：其他扩展参数

**注意**：

- 策略响应速度快，适合短线交易
- 价格动量过滤提高信号质量，减少假突破
- 较小的EMA周期提供更敏感的信号
- 在震荡明显的市场中表现最佳
- 建议配合严格的止损和快速的止盈

**返回值**：IndFrame - 包含以下列：

- `lasth`：近期高点，短期阻力位参考
- `lastl`：近期低点，短期支撑位参考
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`close`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用TonyUX EMA剥头皮策略
        self.scalper = self.data.tradingview.TonyUX_EMA_Scalper(length=20, period=8)
        
        # 基础信号应用
        long_entry = self.scalper.long_signal
        short_entry = self.scalper.short_signal
        
        # 近期高低点应用
        resistance = self.scalper.lasth
        support = self.scalper.lastl
        
        # 价格与EMA关系
        price_above_ema = self.data.close > self.data.close.ema(20)
        price_below_ema = self.data.close < self.data.close.ema(20)
        
        # 多时间框架EMA系统
        fast_scalper = self.data.tradingview.TonyUX_EMA_Scalper(length=10, period=5)
        slow_scalper = self.data.tradingview.TonyUX_EMA_Scalper(length=30, period=13)
        
        # 三重时间框架确认
        confirmed_long = (self.scalper.long_signal & 
                         fast_scalper.long_signal & 
                         price_above_ema)
        
        confirmed_short = (self.scalper.short_signal & 
                          fast_scalper.short_signal & 
                          price_below_ema)
        
        # 动量强度分析
        price_momentum = self.data.close - self.data.close.shift(3)
        strong_momentum = abs(price_momentum) > self.data.close.rolling(10).std()
        
        # 与其他指标结合
        rsi = self.data.rsi(14)
        volume_sma = self.data.volume.rolling(20).mean()
        high_volume = self.data.volume > volume_sma
        
        # 过滤信号
        filtered_long = self.scalper.long_signal & (rsi > 30) & high_volume & strong_momentum
        filtered_short = self.scalper.short_signal & (rsi < 70) & high_volume & strong_momentum
        
        # 支撑阻力突破策略
        resistance_break = self.data.close.cross_up(self.scalper.lasth)
        support_break = self.data.close.cross_down(self.scalper.lastl)
```

---

### `Turtle_Trade_Channels_Indicator_TUTCI` - 海龟交易通道指标
```python
def Turtle_Trade_Channels_Indicator_TUTCI(self, length=20, len2=10, **kwargs) -> IndFrame:
```
**功能**：经典海龟交易系统的通道实现，通过双重时间框架的高低点通道构建动态支撑阻力系统，结合条件逻辑识别趋势方向和关键突破位，提供完整的海龟交易信号

**应用场景**：

- 海龟交易系统执行
- 通道突破策略
- 趋势方向识别
- 动态支撑阻力构建
- 机构级趋势跟踪

**计算原理**：
```
1. 双重通道构建：
   - 主通道：基于length周期的高低点
     * 上轨 = 最高价的length周期最高值
     * 下轨 = 最低价的length周期最低值
   - 辅助通道：基于len2周期的高低点
     * 上轨 = 最高价的len2周期最高值
     * 下轨 = 最低价的len2周期最低值

2. 趋势条件判断：
   - 条件 = 突破上轨的barslast ≤ 突破下轨的barslast
   - 识别当前趋势方向偏向

3. 关键趋势线计算：
   - 条件为真时（偏多）：K1 = 下轨, K2 = 辅助下轨
   - 条件为假时（偏空）：K1 = 上轨, K2 = 辅助上轨
   - K = 条件为真时取K1和K2的最小值，为假时取最大值

4. 信号生成：
   - 多头信号：条件由假转真
   - 空头信号：条件由真转假
   - 出场信号：价格触及辅助通道边界
```

**参数**：

- `length`：主通道周期，默认20，控制主要趋势通道的宽度
- `len2`：辅助通道周期，默认10，控制次要趋势通道的宽度
- `**kwargs`：其他扩展参数

**注意**：

- 基于经典海龟交易法则，适合系统化执行
- 双重通道设计提供不同时间框架的支撑阻力
- K线提供关键的趋势转换位
- 出场信号基于辅助通道，提供动态止损
- 适合中长线趋势跟踪策略

**返回值**：IndFrame - 包含以下列：

- `sup`：辅助上轨通道
- `sdown`：辅助下轨通道
- `K`：关键趋势线，动态的多空分界线
- `long_signal`：多头入场信号
- `short_signal`：空头入场信号

**所需数据字段**：`high`, `low`

**示例**：
```python
class Example(Strategy):

    def __init__(self):
        self.data = self.get_kline(LocalDatas.test)
        # 调用海龟交易通道指标
        self.turtle = self.data.tradingview.Turtle_Trade_Channels_Indicator_TUTCI(length=20, len2=10)
        
        # 基础信号应用
        long_entry = self.turtle.long_signal
        short_entry = self.turtle.short_signal
        
        # 通道位置分析
        in_upper_channel = self.data.high > self.turtle.sup
        in_lower_channel = self.data.low < self.turtle.sdown
        in_main_channel = (~in_upper_channel) & (~in_lower_channel)
        
        # 趋势方向判断
        uptrend = self.data.close > self.turtle.K
        downtrend = self.data.close < self.turtle.K
        
        # 多时间框架海龟系统
        fast_turtle = self.data.tradingview.Turtle_Trade_Channels_Indicator_TUTCI(length=10, len2=5)
        slow_turtle = self.data.tradingview.Turtle_Trade_Channels_Indicator_TUTCI(length=55, len2=20)
        
        # 三重时间框架趋势确认
        strong_uptrend = uptrend & (fast_turtle.K < self.data.close) & (slow_turtle.K < self.data.close)
        strong_downtrend = downtrend & (fast_turtle.K > self.data.close) & (slow_turtle.K > self.data.close)
        
        # 通道突破强度
        breakout_strength = abs(self.data.close - self.turtle.K) / (self.turtle.sup - self.turtle.sdown)
        strong_breakout = breakout_strength > 0.3
        
        # 与其他海龟规则结合
        atr = self.data.atr(20)
        # 海龟式头寸规模计算
        volatility_unit = atr * self.data.close / 100
        position_size = (self.capital * 0.01) / volatility_unit
        
        # 动态止损设置
        long_stop_loss = self.turtle.sdown
        short_stop_loss = self.turtle.sup
        
        # 趋势持续时间分析
        trend_duration = (self.turtle.long_signal | self.turtle.short_signal).cumsum()
        mature_trend = trend_duration >= 4  # 趋势持续4周期以上
        
        # 过滤信号
        volume_confirmation = self.data.volume > self.data.volume.rolling(20).mean()
        filtered_long = self.turtle.long_signal & strong_breakout & volume_confirmation
        filtered_short = self.turtle.short_signal & strong_breakout & volume_confirmation
```
---