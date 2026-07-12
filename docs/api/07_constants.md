# 常量与工具

## MaType

*位于 `minibt/utils.py`*

此 API 为模块级导出（函数/变量/实例），请参考源码。

---

## SignalLabel

## 信号标签
---

## Markers

*位于 `minibt/utils.py`*

此 API 为模块级导出（函数/变量/实例），请参考源码。

---

## LineDash

### 绘图线型枚举类（继承str类型，可直接用于可视化库的线型配置）

    - 该类定义了所有支持的图表线条样式，属性值与可视化库。
    - 兼容的线型名称一致，用于配置K线图、指标线等图表的线条展示样式。

    #### 属性说明
    - solid : str
        实线样式，取值为'solid'，适用于常规指标线展示
    - dashed : str
        虚线样式，取值为'dashed'，适用于辅助线、压力线展示
    - dotted : str
        点线样式，取值为'dotted'，适用于次要参考线展示
    - dotdash : str
        点虚线样式（点-横交替），取值为'dotdash'，适用于特殊标记线展示
    - dashdot : str
        虚点线样式（横-点交替），取值为'dashdot'，与dotdash样式互补
    - vbar : str
        竖线/柱状样式，取值为'vbar'，适用于成交量、乖离率等柱状图展示

    #### lightweight_charts
    LINE_STYLE = Literal['solid', 'dotted', 'dashed', 'large_dashed', 'sparse_dotted']

    #### 可选值汇总
    >>> ['solid', 'dashed', 'dotted', 'dotdash', 'dashdot', 'vbar']

### 成员列表

| 成员 | 值 |
|------|----|
| `solid` | `solid` |
| `dashed` | `dashed` |
| `dotted` | `dotted` |
| `dotdash` | `dotdash` |
| `dashdot` | `dashdot` |
| `vbar` | `vbar` |
| `large_dashed` | `large_dashed` |
| `sparse_dotted` | `sparse_dotted` |
---

## Colors

### 颜色枚举类（继承str类型，可直接用于可视化库的颜色配置）

    - 该类定义了大量标准Web颜色及自定义RGB十六进制颜色，属性值与主流可视化库
    - （如Bokeh、Plotly、Seaborn）兼容的颜色名称/十六进制字符串一致，
    - 可直接用于图表元素（线条、标记、填充、文字等）的配色配置，提升可视化效果的规范性。

    #### 可选值汇总
    >>> ["aliceblue", "antiquewhite", "aqua", "aquamarine", "azure",
        "beige", "bisque", "black", "blanchedalmond", "blue",
        "blueviolet", "brown", "burlywood", "cadetblue", "chartreuse",
        "chocolate", "coral", "cornflowerblue", "cornsilk", "crimson",
        "cyan", "darkblue", "darkcyan", "darkgoldenrod", "darkgray",
        "darkgreen", "darkgrey", "darkkhaki", "darkmagenta",
        "darkolivegreen", "darkorange", "darkorchid", "darkred",
        "darksalmon", "darkseagreen", "darkslateblue", "darkslategray",
        "darkslategrey", "darkturquoise", "darkviolet", "deeppink",
        "deepskyblue", "dimgray", "dimgrey", "dodgerblue", "firebrick",
        "floralwhite", "forestgreen", "fuchsia", "gainsboro", "ghostwhite",
        "gold", "goldenrod", "gray", "green", "greenyellow", "grey",
        "honeydew", "hotpink", "indianred", "indigo", "ivory", "khaki",
        "lavender", "lavenderblush", "lawngreen", "lemonchiffon",
        "lightblue", "lightcoral", "lightcyan", "lightgoldenrodyellow",
        "lightgray", "lightgreen", "lightgrey", "lightpink", "lightsalmon",
        "lightseagreen", "lightskyblue", "lightslategray",
        "lightslategrey", "lightsteelblue", "lightyellow",
        "lime", "limegreen", "linen", "magenta", "maroon",
        "mediumaquamarine", "mediumblue", "mediumorchid",
        "mediumpurple", "mediumseagreen", "mediumslateblue",
        "mediumspringgreen", "mediumturquoise", "mediumvioletred",
        "midnightblue", "mintcream", "mistyrose", "moccasin", "navajowhite",
        "navy", "oldlace", "olive", "olivedrab", "orange", "orangered",
        "orchid", "palegoldenrod", "palegreen", "paleturquoise",
        "palevioletred", "papayawhip", "peachpuff", "peru", "pink",
        "plum", "powderblue", "purple", "rebeccapurple", "red",
        "rosybrown", "royalblue", "saddlebrown", "salmon", "sandybrown",
        "seagreen", "seashell", "sienna", "silver", "skyblue", "slateblue",
        "slategray", "slategrey", "snow", "springgreen", "steelblue",
        "tan", "teal", "thistle", "tomato", "turquoise", "violet",
        "wheat", "white", "whitesmoke", "yellow", "yellowgreen",]

### 成员列表

| 成员 | 值 |
|------|----|
| `aliceblue` | `aliceblue` |
| `antiquewhite` | `antiquewhite` |
| `aqua` | `aqua` |
| `aquamarine` | `aquamarine` |
| `azure` | `azure` |
| `beige` | `beige` |
| `bisque` | `bisque` |
| `black` | `black` |
| `blanchedalmond` | `blanchedalmond` |
| `blue` | `blue` |
| `blueviolet` | `blueviolet` |
| `brown` | `brown` |
| `burlywood` | `burlywood` |
| `cadetblue` | `cadetblue` |
| `chartreuse` | `chartreuse` |
| `chocolate` | `chocolate` |
| `coral` | `coral` |
| `cornflowerblue` | `cornflowerblue` |
| `cornsilk` | `cornsilk` |
| `crimson` | `crimson` |
| `cyan` | `cyan` |
| `darkblue` | `darkblue` |
| `darkcyan` | `darkcyan` |
| `darkgoldenrod` | `darkgoldenrod` |
| `darkgray` | `darkgray` |
| `darkgreen` | `darkgreen` |
| `darkgrey` | `darkgrey` |
| `darkkhaki` | `darkkhaki` |
| `darkmagenta` | `darkmagenta` |
| `darkolivegreen` | `darkolivegreen` |
| `darkorange` | `darkorange` |
| `darkorchid` | `darkorchid` |
| `darkred` | `darkred` |
| `darksalmon` | `darksalmon` |
| `darkseagreen` | `darkseagreen` |
| `darkslateblue` | `darkslateblue` |
| `darkslategray` | `darkslategray` |
| `darkslategrey` | `darkslategrey` |
| `darkturquoise` | `darkturquoise` |
| `darkviolet` | `darkviolet` |
| `deeppink` | `deeppink` |
| `deepskyblue` | `deepskyblue` |
| `dimgray` | `dimgray` |
| `dimgrey` | `dimgrey` |
| `dodgerblue` | `dodgerblue` |
| `firebrick` | `firebrick` |
| `floralwhite` | `floralwhite` |
| `forestgreen` | `forestgreen` |
| `fuchsia` | `fuchsia` |
| `gainsboro` | `gainsboro` |
| `ghostwhite` | `ghostwhite` |
| `gold` | `gold` |
| `goldenrod` | `goldenrod` |
| `gray` | `gray` |
| `green` | `green` |
| `greenyellow` | `greenyellow` |
| `grey` | `grey` |
| `honeydew` | `honeydew` |
| `hotpink` | `hotpink` |
| `indianred` | `indianred` |
| `indigo` | `indigo` |
| `ivory` | `ivory` |
| `khaki` | `khaki` |
| `lavender` | `lavender` |
| `lavenderblush` | `lavenderblush` |
| `lawngreen` | `lawngreen` |
| `lemonchiffon` | `lemonchiffon` |
| `lightblue` | `lightblue` |
| `lightcoral` | `lightcoral` |
| `lightcyan` | `lightcyan` |
| `lightgoldenrodyellow` | `lightgoldenrodyellow` |
| `lightgray` | `lightgray` |
| `lightgreen` | `lightgreen` |
| `lightgrey` | `lightgrey` |
| `lightpink` | `lightpink` |
| `lightsalmon` | `lightsalmon` |
| `lightseagreen` | `lightseagreen` |
| `lightskyblue` | `lightskyblue` |
| `lightslategray` | `lightslategray` |
| `lightslategrey` | `lightslategrey` |
| `lightsteelblue` | `lightsteelblue` |
| `lightyellow` | `lightyellow` |
| `lime` | `lime` |
| `limegreen` | `limegreen` |
| `linen` | `linen` |
| `magenta` | `magenta` |
| `maroon` | `maroon` |
| `mediumaquamarine` | `mediumaquamarine` |
| `mediumblue` | `mediumblue` |
| `mediumorchid` | `mediumorchid` |
| `mediumpurple` | `mediumpurple` |
| `mediumseagreen` | `mediumseagreen` |
| `mediumslateblue` | `mediumslateblue` |
| `mediumspringgreen` | `mediumspringgreen` |
| `mediumturquoise` | `mediumturquoise` |
| `mediumvioletred` | `mediumvioletred` |
| `midnightblue` | `midnightblue` |
| `mintcream` | `mintcream` |
| `mistyrose` | `mistyrose` |
| `moccasin` | `moccasin` |
| `navajowhite` | `navajowhite` |
| `navy` | `navy` |
| `oldlace` | `oldlace` |
| `olive` | `olive` |
| `olivedrab` | `olivedrab` |
| `orange` | `orange` |
| `orangered` | `orangered` |
| `orchid` | `orchid` |
| `palegoldenrod` | `palegoldenrod` |
| `palegreen` | `palegreen` |
| `paleturquoise` | `paleturquoise` |
| `palevioletred` | `palevioletred` |
| `papayawhip` | `papayawhip` |
| `peachpuff` | `peachpuff` |
| `peru` | `peru` |
| `pink` | `pink` |
| `plum` | `plum` |
| `powderblue` | `powderblue` |
| `purple` | `purple` |
| `rebeccapurple` | `rebeccapurple` |
| `red` | `red` |
| `rosybrown` | `rosybrown` |
| `royalblue` | `royalblue` |
| `saddlebrown` | `saddlebrown` |
| `salmon` | `salmon` |
| `sandybrown` | `sandybrown` |
| `seagreen` | `seagreen` |
| `seashell` | `seashell` |
| `sienna` | `sienna` |
| `silver` | `silver` |
| `skyblue` | `skyblue` |
| `slateblue` | `slateblue` |
| `slategray` | `slategray` |
| `slategrey` | `slategrey` |
| `snow` | `snow` |
| `springgreen` | `springgreen` |
| `steelblue` | `steelblue` |
| `tan` | `tan` |
| `teal` | `teal` |
| `thistle` | `thistle` |
| `tomato` | `tomato` |
| `turquoise` | `turquoise` |
| `violet` | `violet` |
| `wheat` | `wheat` |
| `white` | `white` |
| `whitesmoke` | `whitesmoke` |
| `yellow` | `yellow` |
| `yellowgreen` | `yellowgreen` |
| `RGB666666` | `#666666` |
| `bear_color` | `rgba(200, 97, 100, 100)` |
| `bull_color` | `rgba(39, 157, 130, 100)` |
---

## LogLevel

## 日志级别枚举

### 成员列表

| 成员 | 值 |
|------|----|
| `DEBUG` | `DEBUG` |
| `INFO` | `INFO` |
| `WARNING` | `WARNING` |
| `ERROR` | `ERROR` |
| `CRITICAL` | `CRITICAL` |
| `SUCCESS` | `SUCCESS` |
| `TRADE` | `TRADE` |
---
