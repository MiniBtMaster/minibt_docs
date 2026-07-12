# 常见问题

## 安装相关问题

### Q: 如何安装 MiniBT？
**A:** 可以通过 pip 直接安装：
```bash
pip install minibt
```

### Q: 安装时出现依赖冲突怎么办？
**A:** 建议使用虚拟环境安装：
```bash
# 创建虚拟环境
python -m venv minibt_env
# 激活虚拟环境（Windows）
minibt_env\Scripts\activate
# 激活虚拟环境（Mac/Linux）
source minibt_env/bin/activate
# 安装 MiniBT
pip install minibt
```

### Q: 支持哪些 Python 版本？
**A:** MiniBT 支持 Python 3.7 及以上版本。

## 使用相关问题

### Q: 如何获取股票数据？
**A:** MiniBT 支持多种数据源：

- 从全局变量获取数据（auto=True）
- 从手动添加的数据获取（auto=False）
- 使用 LocalDatas 类获取数据
- 从文件路径获取数据
- 直接传入 DataFrame 对象
- 获取期货数据（TQSDK）
- 获取股票数据（pytdx/baostock/akshare）
- 实盘模式获取数据
```python
# 从 CSV 文件加载数据
self.data = self.get_kline("./test.csv")

# 从 pandas DataFrame 加载
self.data = self.get_kline(LocalDatas.test.dataframe)

# 在线获取数据（需要安装相应库）
self.data = self.get_kline('SHFE.rb2410', 
                           user_name="您的账号", 
                           password="您的密码")
```

### Q: 如何创建第一个策略？
**A:** 参考我们的入门教程：
```python
from minibt import *

class MyStrategy(Strategy):
    def init(self):
        self.data = self.get_kline(LocalDatas.test) 
        # 添加移动平均线指标
        self.sma_fast = self.data.close.sma(10)
        self.sma_slow = self.data.close.sma(20)
        self.long_signal=self.sma_fast.cross_up(self.sma_slow)
        self.short_signal=self.sma_fast.cross_down(self.sma_slow)
    
    def next(self):
        # 策略逻辑
        if not self.data.position:
            if self.long_signal.new:
                self.data.buy()
            elif self.short_signal.new:
                self.data.sell()
```

### Q: 如何优化策略参数？
**A:** 使用 MiniBT 内置的参数优化功能：
```python
from minibt import *

class MA(Strategy):
    # 定义可优化参数
    params = dict(length1=10, length2=20)

    def __init__(self):
        # 获取数据
        self.data = self.get_kline(LocalDatas.v2509_60_1)
        
        # 计算技术指标
        self.ma1 = self.data.close.sma(self.params.length1)
        self.ma2 = self.data.close.sma(self.params.length2)
        
        # 生成交易信号
        self.long_signal = self.ma1.cross_up(self.ma2)
        self.short_signal = self.ma2.cross_down(self.ma1)

    def next(self):
        # 策略逻辑
        if not self.data.position:
            if self.long_signal.new:
                self.data.buy()
            elif self.short_signal.new:
                self.data.sell()
        elif self.data.position > 0 and self.short_signal.new:
            self.sell()
        elif self.data.position < 0 and self.long_signal.new:
            self.buy()


if __name__ == "__main__":
    bt = Bt(auto=True)
    # 设置优化目标和参数范围
    bt.optstrategy(
        ["profit", "win_rate"],  # 优化目标：收益和胜率
        (1, 1),                  # 权重配置
        length1=(5, 15, 1),      # length1参数范围：5到15，步长为1
        length2=(20, 30, 1),     # length2参数范围：20到30，步长为1
        opconfig=OptunaConfig(n_trials=100)  # Optuna配置：100次试验
    )
    bt.run()
```

## 策略开发问题

### Q: 支持哪些交易品种？
**A:** MiniBT 支持股票、期货、加密货币、外汇等多种交易品种，只要数据格式正确即可。

### Q: 如何实现止损止盈？
**A:** 可以使用条件判断或内置的止损止盈功能：
```python
def next(self):
    if self.data.position:
        # 止损逻辑
        if self.data.close.new < self.data.position.cost_price * 0.95:
            self.data.sell()
        
        # 止盈逻辑
        if self.data.close.new > self.data.position.cost_price * 1.1:
            self.data.sell()
```

### Q: 如何回测多个股票？
**A:** 使用多资产回测：
```python
from minibt import *
from minibt.tradingview import *


class owen(Strategy):
    params = dict(l1=.6, l2=.95, l3=.65, symbol="v2509_60_3")

    def __init__(self):
        self.min_start_length = 300
        self.data = self.get_kline(
            LocalDatas.get(self.params.symbol), height=300)
        self.gc = G_Channels(self.data, cycle=1)
        self.gc.zig.line_dash = LineDash.dotdash
        self.gc.zig.line_width = 3
        self.gc.zig.line_color = Colors.blue
        self.ebsw = self.data.close.ebsw()
        self.macd = self.data.close.macd()
        self.adosc = self.data.close.ao()
        self.btindicatordataset.height=50
        self.buy_signal = self.ebsw.cross_up(self.params.l1)
        self.exit_buy_signal = self.ebsw.cross_up(
            self.params.l2) | self.ebsw.cross_down(self.params.l3)
        self.sell_signal=self.ebsw.cross_down(-self.params.l1)
        self.exit_sell_signal = self.ebsw.cross_down(
            -self.params.l2) | self.ebsw.cross_up(-self.params.l3)
        self.buy_signal.isplot=self.exit_buy_signal.isplot=self.sell_signal.isplot=self.exit_sell_signal.isplot=False

    def next(self):
        if not self.data.position:
            if self.buy_signal.new:
                self.data.buy()
            elif self.sell_signal.new:
                self.data.sell()
        elif self.data.position > 0 and self.exit_buy_signal.new:
            self.data.sell()
        elif self.data.position<0 and self.exit_sell_signal.new:
            self.data.buy()



owen1 = owen.copy(params=dict(l1=.5, l2=.8, l3=.7, symbol="v2509_60"))
if __name__ == "__main__":
    Bt().run(isplot=True,isreport=True,  report_cwd="./test", report_name="test")
```

## 性能与调试

### Q: 回测速度慢怎么办？
**A:** 可以尝试以下优化方法：

1. 减少数据量
2. 使用更简单的指标
3. 启用并行计算（如果支持）
4. 使用更高效的数据结构

### Q: 如何调试策略？
**A:** 可以使用打印语句或日志功能：
```python
def next(self):
    print(f"当前价格: {self.data.close.new}")
    print(f"持仓数量: {self.data.position.pos}")
```

## 数据问题

### Q: 数据格式要求是什么？
**A:** KLine数据需要包含以下列：

- `datetime` - 时间
- `open` - 开盘价
- `high` - 最高价
- `low` - 最低价
- `close` - 收盘价
- `volume` - 成交量

### Q: 如何处理缺失数据？
**A:** MiniBT 会自动处理常见的缺失数据问题，建议在导入前确保数据质量。

## 其他问题

### Q: MiniBT 是免费的吗？
**A:** 是的，MiniBT 是完全开源的免费软件，遵循 MIT 许可证。

### Q: 如何贡献代码？
**A:** 欢迎通过 GitHub 提交 Pull Request 或报告 Issue：

- GitHub: https://github.com/MiniBtMaster
- 问题反馈: https://github.com/MiniBtMaster/issues

### Q: 有没有社区或讨论群？
**A:** 可以通过以下方式加入社区：

- GitHub Discussions
- Discord 频道
- 微信公众号（详见联系方式）

---

如果这里没有找到您问题的答案，请通过 [联系方式](contact.md) 与我们联系。
<div class="discussion-container">
  <h3>💡 有问题？来这里讨论！</h3>
  
  <div class="discussion-options">
    <div class="option">
      <h4>📝 提问新问题</h4>
      <a href="https://github.com/MiniBtMaster/minibt/discussions/new" 
         target="_blank" 
         class="option-btn">
        创建新讨论
      </a>
    </div>
    
    <div class="option">
      <h4>🔍 浏览现有问题</h4>
      <a href="https://github.com/MiniBtMaster/minibt/discussions" 
         target="_blank" 
         class="option-btn">
        查看所有讨论
      </a>
    </div>
  </div>
  
  <div class="notice">
    <p>💡 <strong>提示：</strong>需要 GitHub 账号才能参与讨论</p>
  </div>
</div>

<style>
.discussion-container {
  max-width: 600px;
  margin: 20px auto;
}
.discussion-options {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}
.option {
  flex: 1;
  text-align: center;
  padding: 20px;
  border: 1px solid;
  border-color: inherit;
  border-radius: 8px;
  background: rgba(128, 128, 128, 0.05);
}
.option-btn {
  display: inline-block;
  background: transparent;
  color: inherit;
  padding: 10px 16px;
  border: 1px solid;
  border-color: inherit;
  border-radius: 6px;
  text-decoration: none;
  margin-top: 10px;
  font-weight: 500;
  transition: all 0.2s ease;
}
.option-btn:hover {
  background: rgba(128, 128, 128, 0.1);
  transform: translateY(-1px);
}
.notice {
  background: rgba(128, 128, 128, 0.08);
  border: 1px solid;
  border-color: inherit;
  border-radius: 6px;
  padding: 12px;
}

/* 移动端适配 */
@media (max-width: 768px) {
  .discussion-options {
    flex-direction: column;
  }
}
</style>
<!-- ## 评论

<div id="giscus-comments" class="giscus-container"></div> -->
