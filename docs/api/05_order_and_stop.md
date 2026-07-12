# 订单与止损

## OrderType

*位于 `minibt/utils.py`*

此 API 为模块级导出（函数/变量/实例），请参考源码。

---

## BtStop

*位于 `minibt/stop/stop.py`*

此 API 为模块级导出（函数/变量/实例），请参考源码。

---

## Stop

## 停止类

    ### 常用属性
        >>> self.kline (KLine) : 合约数据
        self.price_tick (float) : 最小变化单位
        self.volume_multiple (float) :合约剩数
        self.stop_price (Line[float]): 停止价
        self.target_price (Line[float]): 目标价序列
        self.kline.open_price (float): 交易价格序列
        self.close (Line): 收盘价，或
        self.kline.close
        self.close[-1] (float): 最新价格
        self.stop_price[-2] (float): 前一停止价
        self.target_price[-2] (float): 前一目标价
        self.kline.stop_lines[-1] (np.ndarray[float]): 最新停止价和目标价

    ### 定义__init__,long和short方法
        >>> __init__初始化常量及基础计算
        long和short方法计算最新停止价或目标价
        通过以下方法进行赋值
        self.stop_price.new = new_stop_price
        self.target_price.new = new_target_price

    ### Examples
    ```python
    class SegmentationTracking(Stop):
        """## 分段跟踪停止策略
        根据价格波动幅度分段调整止损位置，结合ATR、标准差等指标

        ## Args:
            length (int, optional): atr指标长度. Defaults to 14.
            mult (float, optional): atr指标乘数. Defaults to 1..
            method (str, optional): 初始价选用指标,可选["atr","std","smoothrng"]. Defaults to "atr".
            acceleration (list[float], optional): 分段乘数. Defaults to [0.382, 0.5, 0.618, 1.0].
            min_distance (float, optional): 最小距离. Defaults to 0..
        """

        def __init__(self, length: int = 14, mult: float = 1., method: Literal["atr", "std", "smoothrng"] = "atr",
                    acceleration: list[float] = [0.382, 0.5, 0.618, 1.0], min_distance: float = 0.) -> None:
            self.length = length  # 指标计算周期长度
            self.mult = mult  # 指标乘数
            self.method = method  # 选用的指标方法
            self.acceleration = acceleration  # 分段加速度（调整系数）
            # 计算最小距离（基于加速度的第一个值）
            self.min_distance = max(min(1., min_distance), 0.) * acceleration[0]
            # 根据方法选择对应的指标函数
            if self.method == 'atr':
                self._atr = self.kline.atr(
                    self.length)
            elif self.method == 'std':
                self._atr = self.kline.close.stdev(
                    self.length)
            else:
                self._atr = self.kline.close.btind.smoothrng(
                    self.length)

        def long(self):
            """多单分段跟踪止损计算"""
            _atr = self._atr[-1]
            if not np.isnan(_atr):
                pre_stop_price = self.stop_price[-2]
                # 初始止损设置
                if np.isnan(pre_stop_price):
                    stop_price = self.low[-1] - self.mult * _atr
                else:
                    preprice = self.close[-2]  # 前收盘价
                    lastprice = self.close[-1]  # 最新收盘价
                    stop_price = pre_stop_price  # 上次止损价

                    # 若最新收盘价高于前收盘价（价格上涨）
                    if lastprice > preprice:
                        diff_price = lastprice - self.kline.open_price  # 与开仓价的差价
                        _atr *= self.mult  # 应用乘数
                        range_ = lastprice - preprice  # 价格波动范围

                        # 根据不同条件调整止损价
                        if stop_price < self.kline.open_price:
                            # 止损价低于开仓价时，用最小加速度调整
                            stop_price += self.acceleration[0] * range_
                        else:
                            # 根据差价与ATR的关系，使用不同加速度
                            if diff_price < _atr:
                                stop_price += self.acceleration[1] * range_
                            elif diff_price < 2. * _atr:
                                stop_price += self.acceleration[2] * range_
                            else:
                                stop_price += self.acceleration[3] * range_
                    else:
                        # 价格未上涨时，应用最小距离调整
                        if self.min_distance:
                            stop_price += self.min_distance * range_
                self.stop_price.new = stop_price  # 更新止损价

        def short(self):
            """空单分段跟踪止损计算"""
            _atr = self._atr[-1]
            if not np.isnan(_atr):
                pre_stop_price = self.stop_price[-2]
                # 若为初始止损设置
                if np.isnan(pre_stop_price):
                    stop_price = self.high[-1] + self.mult * _atr
                else:
                    preprice = self.close[-2]  # 前收盘价
                    lastprice = self.close[-1]  # 最新收盘价
                    stop_price = pre_stop_price  # 上次止损价

                    # 若前收盘价高于最新收盘价（价格下跌）
                    if preprice > lastprice:
                        diff_price = self.kline.open_price - lastprice  # 与开仓价的差价
                        _atr *= self.mult  # 应用乘数
                        range_ = preprice - lastprice  # 价格波动范围

                        # 根据不同条件调整止损价
                        if stop_price > self.kline.open_price:
                            # 止损价高于开仓价时，用最小加速度调整
                            stop_price -= self.acceleration[0] * range_
                        else:
                            # 根据差价与ATR的关系，使用不同加速度
                            if diff_price < _atr:
                                stop_price -= self.acceleration[1] * range_
                            elif diff_price < 2. * _atr:
                                stop_price -= self.acceleration[2] * range_
                            else:
                                stop_price -= self.acceleration[3] * range_
                    else:
                        # 价格未下跌时，应用最小距离调整
                        if self.min_distance:
                            stop_price += self.min_distance * range_
                self.stop_price.new = stop_price  # 更新止损价
    ```

### 方法

#### `def __init__(self, **kwargs)`

#### `def kline(self) -> KLine` *(property)*

## K线（KLine）

#### `def price_tick(self) -> float` *(property)*

## 合约最小变动单位

#### `def volume_multiple(self) -> float` *(property)*

## 合约剩数

#### `def datetime(self) -> Line[datetime.datetime]` *(property)*

## 时间序列

#### `def open(self) -> Line[float]` *(property)*

## 开盘价序列

#### `def high(self) -> Line[float]` *(property)*

## 最高价序列

#### `def low(self) -> Line[float]` *(property)*

## 最低价序列

#### `def close(self) -> Line[float]` *(property)*

## 收盘价序列

#### `def volume(self) -> Line[float]` *(property)*

## 成交量序列

#### `def index(self) -> int` *(property)*

#### `def stop_price(self) -> Line[float]` *(property)*

#### `def target_price(self) -> Line[float]` *(property)*

#### `def long(self) -> None`

## 多头停止计算

#### `def short(self) -> None`

## 空头停止计算

#### `def update(self) -> bool`

## 更新


---
