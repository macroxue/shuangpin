#!/usr/bin/python3

import argparse
import opencc

parser = argparse.ArgumentParser(description='准备编码文件')
parser.add_argument('-c', '--count', help='取频率排前的N字', type=int, default='70000')
args = parser.parse_args()

converter = opencc.OpenCC('t2s')

# 读入字的对数频率，例如：
# 的 -1.4254
char_freq = {}
with open('char_freq.txt') as f:
    for line in f.readlines():
        char, freq = line.split()
        # 只要简体字
        simple = converter.convert(char)
        if char == simple:
            char_freq[char] = float(freq)

# 读入字的发音和多音字的对数频率，例如：
# 的	di	-3.4828
char_pinyin = []
with open('char_pinyin.txt') as f:
    for line in f.readlines():
        char, pinyin, freq = line.split()
        if char in char_freq:
            char_pinyin += [(char, pinyin, float(freq) + char_freq[char])]

# 以字加读音的对数频率排序
char_pinyin.sort(key=lambda item: item[2], reverse=True)

# 读入字的笔画，例如：
# 的	pszhhpzn
char_strokes = {}
with open('char_strokes.txt') as f:
    for line in f.readlines():
        if len(line) > 1 and line[0] != '#':
            char, strokes = line.split()
            char_strokes[char] = strokes[:5]

# 输出关于字的信息
with open('char_info.js', 'w') as f:
    f.write('var char_info = [\n')
    for char, pinyin, freq in char_pinyin[:args.count]:
        f.write('["%c","%s","%s",%.4f],\n' % (char, pinyin, char_strokes[char][:5], freq))
    f.write('];\n')

