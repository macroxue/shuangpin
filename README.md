# 输入法生成器

[在此](https://macroxue.github.io/shuangpin/eval.html)生成你自己的输入法。
这是在原来的双拼评测工具的基础上添加的一条龙服务：从评测定制双拼开始，
到自动键位优化，再到定制笔画顶功，最后输出基于 [Rime](https://rime.im/)
输入法框架的配置文件。适合追求极度个性化的玩家。

最近折腾了各式各样的双拼加辅助码的输入方式，历程记录在
[双拼吧](https://tieba.baidu.com/p/6806794788)。到头来还是觉得最佳的输入
方式就是双拼整句，多数时候都可以不看屏幕依着声韵声韵的舒适节奏快速打字。
偶尔要回头修改时，可以通过添加辅助码方便地“选字”。而最简单的辅助码就是笔画，
学习成本接近于零，并且可以在和声母没有冲突时形成顶功，近似于整句输入的体验。

![输出方案](https://macroxue.github.io/shuangpin/screenshots/exporter.png)

工具自动生成 Rime 下的三个配置文件。
 * double_pinyin_stroke.dict.yaml：单字编码字典
 * double_pinyin_stroke.schema.yaml：单字顶功方案
 * double_pinyin_smart.schema.yaml：双拼整句加单字顶功方案

下载后把它们拷贝或移动到 Rime 的配置目录下，然后在 default.custom.yaml 文件
中添加 double_pinyin_stroke 和 double_pinyin_smart 两个方案，重新部署后就
可以使用。这些配置都是最基本的，可以自行修改和添加个性化的功能。

使用时既可以连续输入双拼也可以连续输入单字顶功，二者之间的切换仅以空格上屏
为界，非常自然。
![单字顶功输入](https://macroxue.github.io/shuangpin/screenshots/single_input.png)
![双拼连续输入](https://macroxue.github.io/shuangpin/screenshots/double_input.png)

双拼输入节奏感好，常用词句的转换成功率高。顶功输入按键较多，适合比较离散
的文本，也可以用来修改不成功的双拼转换。比如双拼并不真正懂得我的心意，这时
可以用光标键或Tab移动到成功转换的文字之后，以空格键确认，然后移动到需要
修改的双拼之后输入笔画，加一个代表“点”的 o 键就可以得到正确的“懂”字。
![混合输入](https://macroxue.github.io/shuangpin/screenshots/mixed_input.png)

一个明显的不足是：两种方案的无法共享用户词库。“懂我心意”以顶功方式输入后，
双拼模式下还是不懂我的心意。目前该工具还不能评测加了辅助码的方案性能，
以后会实现。原则上该工具可以继续扩展，和其它类型的辅助码对接。不过其它
辅助码都没有标准，所以码表需要编码者自己提供，实现起来比较麻烦，以后再说吧。

# 双拼评测工具

网上比较流行的双拼评测是基于[击键当量](https://tiansh.github.io/lqbz/sp/)
的，越舒适的键盘布局对应越小的当量。
比如微软双拼的单字当量是13.67，连续当量是13.86。相比较我的UAI优化方案
的单字当量是13.12，连续当量是13.72。击键当量的好处是定量地衡量打字的
舒适程度，但是缺点也很明显，就是这个量很不直观。曾经看到网上有人宣称某个
自定义方案比已有的方案高出几个量级，并给出基于当量的数据是13.11。这就有
夸大其词的嫌疑了，小数点后的变化怎么可能是几个量级的区别呢？要不就是这个
量本身有问题，不利于直观地比较不同的方案。

终于我写了个自认为比较满意的
[双拼评测工具](https://macroxue.github.io/shuangpin/eval.html)。
这个工具是建立在一个简单的、以时间为基础的击键模型上。不同的手指的灵活
程度，也就是移动和击键的速度，是不一样的。食指最为灵活，中指和无名指次之，
小指最不灵活。每次击键时，手指移动的距离加上按键的深度，再除以手指的速度，
就得到了这次击键的时间。另外模型假定两手交替击键时，第二次击键前的移动
可以和第一次击键完全重叠，因此这样的重叠移动是不计时的，但是向下按键的
动作总是被计时的。

给定一份文稿，把击键的总次数除以击键的总时间，就得到了一个击键速度。这个
速度类似于每分钟打字的速度，可以直观地理解，感性地比较。比如，微软双拼
的速度得分是122.4分，而我的自定义方案是134.8分。好比是一个高手用微软
双拼可以每分钟打122字，而用我的方案可以每分钟打135字。区别就是这么具体，
这么简单，用不着抽象地说哪个方案比哪个方案高几个量级。

# UAI优化双拼方案

该方案起这么一个名字是因为u族韵母、a族韵母、i族韵母基本上分别占据一、二、三行。
下面是评测UAI优化方案的屏幕截图。其得分高达134.8，比常用的流行方案高出8到12
分不等。

![UAI优化双拼方案](https://macroxue.github.io/shuangpin/UAI优化/eval.png)

几个假设：
 * 根据习惯，单韵母 a、o、e、i、u、ü 分别固定在 A、O、E、I、U、V 键位。
 * 考虑到美感和易记，ong和iong，iang和uang，ia和ua，ui和ue，都两两分配
在同一个键位上。

从整体布局上看，顶行主要是u族韵母，中间行是高频a族韵母和后鼻音ng族韵母，
底行是低频i族韵母。声母 zh、ch、sh、r、y、w 在顶行，它们和底行的i族韵母
不可拼， 避免了很多跨行击键。

下面是复韵母以使用频率排序：
 * 1~10： an、en、ong/iong、ai、ian、ao、ang、ing、ou、ui/ue,
 * 11~20： eng、ei、uan、iang/uang、in、ia/ua、iao、ie、iu、un,
 * 21~：   er、uai、ng

所有a族韵母 an、ai、ao、ang 都高频常用，所以放在中间行，手指不必离开
原位键就可以轻易击打。

后鼻音韵母 ong、iong、ing、eng 排名靠前，所以也放中间行。iang和uang
不那么常用，放在边上的分号键，这样所有的后鼻音韵母就都在同一行了，
有一定的美感。

排名第五的 ian 常常不被其它方案重视，本方案把它放在an和iang之间，看起来
像一个连续的变化。

排名第二并且放在顶行的en比较特殊。在用的比较多的带en的拼音里只有ben
是异指跨行，其它更高频的ren、men、shen、wen、fen以及更低频的zhen、hen、
chen、gen都很顺手。x和en不可拼，所以en没有同指跨行。

同指跨行击键只有：ce、nu、mu、shei、nuan。前三个不带复韵母，所以不可避免。
第四个是‘谁’的多音字，不常用而且可以用顺手的shui替代。最后一个是‘暖’字，
而且是唯一的发nuan音的字。

助记一：中国男足
 * 球稳着，揉腿。怨输耻，我刎。
 * 阿嫂当锋，硬轰，爱看怜样。
 * 瞎业余，濒尿没？

助记二：儿童不宜
 * 求吻者，柔腿圆，书痴卧闻。
 * 阿嫂荡，丰盈红，爱看怜样。
 * 夏夜语，鬓袅美。

如果分号键不可用，一个替代方案是把ia和ua放Z键，iang和uang放X键。代价是
增加了qia同指跨行和qiang异指跨行，得分从134.8降低到133.6。


# 火星双拼

火星双拼是从 Rime 地球拼音演化而来的带调双拼加笔画辅助的整句输入法, 其最大
特点是以两次击键表示声韵调组合。诸位要问了，声韵调共有一千多种组合，两次
击键怎么够用呢？是不够，那就压缩呗，下图就是方案。

![火星键位](https://macroxue.github.io/shuangpin/mars火星/scheme.png)

编码规则非常简单。所有编码因素，声、韵、调、笔，都有规范可循。
 * 第一码：声母，23键。需要记忆zh、ch、sh、零声母的键位。
 * 第二码：韵母 + 声调，30键。以韵母定列，以声调定排。如果是复韵母则忽略其韵头
   i、u、ü。注意 iu、ui、un 分别是 iou、uei、uen 的缩写，忽略韵头后分别得到
   ou、ei、en。 上排所有键代表四声，中排代表二声和三声，下排代表轻声和一声。
 * 第三码以后：笔画辅助，5键。

不带调的双拼的有效组合只有400个出头。相比之下，火星双拼前两码的空间大小为690，
其中共有645个有效组合，比不带调的双拼高出60%之多。因此在整句输入时，准确度更高，
而记忆量却更少。当然，前提是使用者已经熟练掌握了声调。

下面是两个例子，由于火星双拼的准确率非常高，辅助码只用到了一次。

![输入例子](https://macroxue.github.io/shuangpin/mars火星/examples.png)

双拼整句输入已经非常方便了，为了追求更少的击键量，还可以添加词组。双拼打二字词
已经是得心应手，没有必要再画蛇添足，所以只需要考虑三字或更长的词组就可以了。
词组以隔音符号引导，只包含简码，和整句输入自然混合而不冲突。如图所示，41个字和
3个标点，总共74键。

![输入词组](https://macroxue.github.io/shuangpin/mars火星/phrase.png)

词组既可以双拼输入，也可以简拼输入，词组简拼就像笔画辅助码一样，可用可不用。
美中不足的是自动造的新词不能直接用简拼，需要手动加入到简拼词典里。

Rime 的三个 .yaml 配置文件可以在
[mars火星](https://macroxue.github.io/shuangpin/mars火星)
目录下找到。把它们拷贝到 Rime 的配置目录下，然后在 default.custom.yaml 文件
中添加 mars 方案，重新部署后就可以使用。


# 地球双拼

如果火星上过于激进和危险，那么让我们回到地球上来，把火星双拼除去声调后重新
映射键位就得到了地球双拼。其用法和普通双拼无异，需要时可以在任何一个字之后
添加其笔画作为辅助码，以提高转换的成功率。

![地球键位](https://macroxue.github.io/shuangpin/earth地球/scheme.png)

配置文件可以在[earth地球](https://macroxue.github.io/shuangpin/earth地球)
目录下找到。把它拷贝到 Rime 的配置目录下，然后在 default.custom.yaml 文件
中添加 earth 方案，重新部署后就可以使用。新方案依赖于火星双拼的字典，所以
火星双拼要先部署。

因为没有声调，“是”和“时”这两个常用字既无法以拼音区分也无法以前6个笔画区分。
刚好 uv 二键码是空闲的，于是就分给“是”字专用。


# 六六双拼方案

本人曾经使用过一些双拼方案，但每次不用一段时间就记不得了那些韵母的分布，
还得从头拾起。原因很简单，就是绝大多数方案靠的是肌肉记忆，用进废退。
这可能也是双拼不普及的一个原因吧。

于是本人设计了一个极小记忆量的新方案，并认为不可能还有更小记忆量的了。
有了它，忘了就忘了吧，捡起来也就是分分钟的事。下面隆重推出：

![六六双拼方案](https://macroxue.github.io/shuangpin/66六六/scheme.jpg)

本方案把键盘划分为六个规整的区域，每个区域最多六键，方案也因此得名。
每个区域内由一个根韵母根据简单而统一的规则派生出其它韵母。十分难得的是，
这个规则没有例外！

比如 a 区的根韵母是 a，右边是 根+i 得 ai，下边是 根+n 得 an，
右下是 根+ng 得 ang，右上是 根+o 得 ao。

再比如 ua 和 ia 共享一个 G 键，ua 是第一根韵母，ia 是第二根韵母。
右边是 根+i 得 uai 因为没有 iai，下边是 第一根+n 得 uan，
右下是 根+ng 得 uang 和 iang，右上是 根+o 得 iao 因为没有 uao，
上边是 第二根+n 得 ian。

共享键位在双拼方案里是不可避免的，因为韵母的数量比英文字母多。下面是
所有共享键位的韵母，其它方案里也有类似的共享。

 * ua 和 ia 共享，派生 ian 在上，uan 在下。
 * er 和 ie 共享。原则上 er 可以和任何一个不可单独成音的韵母共享，
   选择 ie 的目的是把 er 分配在 e 区。
 * ü 和 ui 共享，ue/üe 和 uai 共享， uo 和 o 共享， iong 和 ong 共享，
   都是相似和谐音。

双拼方案百花齐放，本方案独树一帜，最有规律，无需口诀助记。其设计的
唯一的目的是韵母分布的规律性，所以在击键舒适度上可能略逊色于某些方案。

# Linux 安装

 * 安装 fcitx
 * 拷贝 sp.dat 至 ~/.config/fcitx/pinyin 目录下
 * 在 fcitx 配置中选择自定义双拼
