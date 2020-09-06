var shengs = ['b','p','m','f','d','t','n','l','g','k','h',
  'j','q','x','zh','ch','sh','r','z','c','s', 'y','w'];

var yuns = {
	a: ['0','b','c','ch','d','f','g','h','k','l','m','n','p','s','sh','t','w','y','z','zh'],
	ai: ['0','b','c','ch','d','g','h','k','l','m','n','p','s','sh','t','w','z','zh'],
	an: ['0','b','c','ch','d','f','g','h','k','l','m','n','p','r','s','sh','t','w','y','z','zh'],
	ang: ['0','b','c','ch','d','f','g','h','k','l','m','n','p','r','s','sh','t','w','y','z','zh'],
	ao: ['0','b','c','ch','d','g','h','k','l','m','n','p','r','s','sh','t','y','z','zh'],
	o: ['0','b','f','l','m','p','w','y'],
	ong: ['c','ch','d','g','h','k','l','n','r','s','t','y','z','zh'],
	ou: ['0','c','ch','d','f','g','h','k','l','m','n','p','r','s','sh','t','y','z','zh'],
	e: ['0','c','ch','d','g','h','k','l','m','n','r','s','sh','t','y','z','zh'],
	ei: ['0','b','d','f','g','h','l','m','n','p','sh','w','z','zh'],
	en: ['0','b','c','ch','f','g','h','k','m','n','p','r','s','sh','w','z','zh'],
	eng: ['0', 'b','c','ch','d','f','g','h','k','l','m','n','p','r','s','sh','t','w','z','zh'],
	er: ['0'],
	i: ['b','c','ch','d','j','l','m','n','p','q','r','s','sh','t','x','y','z','zh'],
	ia: ['d','j','l','q','x'],
	ian: ['b','d','j','l','m','n','p','q','t','x'],
	iang: ['j','l','n','q','x'],
	iao: ['b','d','j','l','m','n','p','q','t','x'],
	ie: ['b','d','j','l','m','n','p','q','t','x'],
	in: ['b','j','l','m','n','p','q','x','y'],
	ing: ['b','d','j','l','m','n','p','q','t','x','y'],
	iong: ['j','q','x'],
	iu: ['d','j','l','m','n','q','x'],
	u: ['b','c','ch','d','f','g','h','j','k','l','m','n','p','q','r','s','sh','t','w','x','y','z','zh'],
	ua: ['g','h','k','sh','zh'],
	uai: ['ch','g','h','k','sh','zh'],
	uan: ['c','ch','d','g','h','j','k','l','n','q','r','s','sh','t','x','y','z','zh'],
	uang: ['ch','g','h','k','sh','zh'],
	ue: ['j','q','x','y'],
	ui: ['c','ch','d','g','h','k','r','s','sh','t','z','zh'],
	un: ['c','ch','d','g','h','j','k','l','q','r','s','sh','t','x','y','z','zh'],
	uo: ['c','ch','d','g','h','k','l','n','r','s','sh','t','z','zh'],
	v: ['l','n'],
	ve: ['l','n'],
};

var stroke_names = {'-':'横', '|':'竖', '/':'撇', '\\':'点(捺)', '^':'折'};
var stroke_symbols = {h:'-', s:'|', p:'/', n:'\\', z:'^'};

var rime_switches = `\
switches:
  - name: ascii_mode
    reset: 0
    states: [ 中文, 西文 ]
  - name: full_shape
    states: [ 半角, 全角 ]
  - name: simplification
    reset: 1
    states: [ 漢字, 汉字 ]
  - name: ascii_punct
    states: [ 。，, ．， ]`;

var rime_common = `\
reverse_lookup:
  dictionary: stroke
  enable_completion: true
  prefix: "\`"
  suffix: "'"
  tips: 〔笔画〕
  preedit_format:
    - xlit/hspnz/一丨丿丶乙/
  comment_format:
    - xform/([nl])v/$1ü/

punctuator:
  import_preset: default

key_binder:
  import_preset: default
  bindings:
    - { when: has_menu, accept: comma, send: comma }
    - { when: has_menu, accept: period, send: period }
    - { when: has_menu, accept: bracketleft, send: Prior }
    - { when: has_menu, accept: bracketright, send: Next }

recognizer:
  import_preset: default
  patterns:
    reverse_lookup: "\`[a-z]*'?$"`;

var rime_engine = `\
engine:
  processors:
    - ascii_composer
    - recognizer
    - key_binder
    - speller
    - punctuator
    - selector
    - navigator
    - express_editor
  segmentors:
    - ascii_segmentor
    - matcher
    - abc_segmentor
    - punct_segmentor
    - fallback_segmentor`;

function check_key_map(pinyin_map) {
  for (var sheng of shengs) {
    if (pinyin_map[sheng] == null) {
      alert('声母 ' + sheng + ' 没有定义');
      return false;
    }
  }
  for (var yun in yuns) {
    if (pinyin_map[yun] == null) {
      alert('韵母 ' + yun + ' 没有定义');
      return false;
    }
  }
  return true;
}

function check_key_map_with_strokes(pinyin_map) {
  if (!check_key_map(pinyin_map)) {
    return false;
  }
  for (var stroke in stroke_names) {
    if (pinyin_map[stroke] == null) {
      alert(stroke_names[stroke] + '(' + stroke + ')' + '的笔画辅助码没有定义');
      return false;
    }
  }
  return true;
}

function get_initials(pinyin_map) {
  var initials = '';
  for (var sheng of shengs) {
    var key = pinyin_map[sheng];
    if (key != null && initials.indexOf(key) == -1) {
      initials += key;
    }
  }
  if (pinyin_map['0'] == null) {
    initials += 'aoe';
  }
  return initials;
}

function get_alphabet(pinyin_map) {
  var alphabet = get_initials(pinyin_map);
  for (var yun in yuns) {
    var key = pinyin_map[yun];
    if (key != null && alphabet.indexOf(key) == -1) {
      alphabet += key;
    }
  }
  for (var stroke in stroke_names) {
    var key = pinyin_map[stroke];
    if (key != null && alphabet.indexOf(key) == -1) {
      alphabet += key;
    }
  }
  return alphabet;
}

function convert_pinyin_to_double(pinyin, pinyin_map) {
  var sheng_yun = split_pinyin(pinyin);
  if (sheng_yun.yun == '') {
    return '';
  } else if (sheng_yun.sheng == '') {
    if (pinyin_map['0'] == null) {
      return sheng_yun.yun[0] + pinyin_map[sheng_yun.yun];
    } else {
      return pinyin_map['0'] + pinyin_map[sheng_yun.yun];
    }
  } else {
    return pinyin_map[sheng_yun.sheng] + pinyin_map[sheng_yun.yun];
  }
}

function convert_strokes(strokes, pinyin_map) {
  var converted = '';
  for (var stroke of strokes) {
    converted += pinyin_map[stroke_symbols[stroke]];
  }
  return converted;
}

function export_stroke_dict_for_rime() {
  var scheme_name = document.getElementById('scheme-name').value;
  var scheme = get_scheme_from_keyboard();
  var pinyin_map = read_pinyin_map_from_scheme(scheme).pinyin_map;

  var code_book = {};
  var dict = '';
  for (var i = 0; i < char_info.length; ++i) {
    var char = char_info[i][0];
    var double_pinyin = convert_pinyin_to_double(char_info[i][1], pinyin_map);
    if (double_pinyin == '') {
      continue;
    }
    var strokes = convert_strokes(char_info[i][2], pinyin_map);
    var code = double_pinyin + strokes;
    var freq = Math.ceil(Math.pow(10, char_info[i][3]) * 1e9);

    // 生成简码
    var simplified = false;
    for (var j = 1; j < code.length; ++j) {
      var prefix = code.slice(0, j + 1);
      if (code_book[prefix] == null) {
        code_book[prefix] = true;
        simplified = true;
        dict += char + '\t' + prefix + '\t' + freq + '\n';
        break;
      }
    }
    if (!simplified) {
      dict += char + '\t' + code + '\t' + freq + '\n';
    }
  }
  return `\
# Rime dictionary: double_pinyin_stroke
# encoding: utf-8
#
# 双拼加笔画辅助码字典

---
name: double_pinyin_stroke
version: "0.1"
sort: by_weight
use_preset_vocabulary: true
max_phrase_length: 2
columns:
  - text
  - code
  - weight
...

${dict}
b	b	0
p	p	0
m	m	0
f	f	0
d	d	0
t	t	0
l	l	0
n	n	0
g	g	0
k	k	0
h	h	0
j	j	0
q	q	0
x	x	0
r	r	0
z	z	0
c	c	0
s	s	0
y	y	0
w	w	0
a	a	0
o	o	0
e	e	0
i	i	0
u	u	0
v	v	0
  `;
}

function export_stroke_scheme_for_rime() {
  var scheme_name = document.getElementById('scheme-name').value;
  var scheme = get_scheme_from_keyboard();
  var pinyin_map = read_pinyin_map_from_scheme(scheme).pinyin_map;
  var alphabet = get_alphabet(pinyin_map);
  var initials = get_initials(pinyin_map);
  return `\
# Rime schema
# encoding: utf-8

schema:
  schema_id: double_pinyin_stroke
  name: ${scheme_name} + 笔画顶功
  version: "0.1"
  author:
    - 无名氏
  description: |
    朙月拼音＋${scheme_name}双拼方案 + 笔画顶功。
  dependencies:
    - stroke

${rime_switches}

${rime_engine}
  translators:
    - punct_translator
    - reverse_lookup_translator
    - table_translator
  filters:
    - simplifier
    - uniquifier

speller:
  alphabet: "${alphabet}"
  initials: "${initials}"
  delimiter: " '"

translator:
  dictionary: double_pinyin_stroke
  enable_user_dict: false
  preedit_format:
    - "xform/^/〔单〕/"

${rime_common}
  `;
}

function export_scheme_for_rime(smart) {
  var scheme_name = document.getElementById('scheme-name').value;
  var scheme = get_scheme_from_keyboard();
  var pinyin_map = read_pinyin_map_from_scheme(scheme).pinyin_map;
  var alphabet = get_alphabet(pinyin_map);
  var initials = get_initials(pinyin_map);

  var zero_sheng_speller = '', sheng_speller = '', yun_speller = '';
  var zero_sheng_translator = '', sheng_translator = '', yun_translator = '';

  var has_zero_sheng = (pinyin_map['0'] != null);
  if (has_zero_sheng) {
    var key = pinyin_map['0'];
    zero_sheng_speller += '    - xform/^([aoe].*)$/' +
      key.toUpperCase() + '$1/\n';
    zero_sheng_translator += '    - "xform/(^|[ \'])' + key + '/$1/"\n';
  } else {
    zero_sheng_speller += '    - xform/^([aoe])(.*)$/$1$1$2/\n';
    zero_sheng_translator += '    - "xform/(^|[ \'])[aoe]/$1/"\n';
  }

  for (var sheng of shengs) {
    var key = pinyin_map[sheng];
    if (sheng != null && sheng != key) {
      sheng_speller += '    - xform/^' + sheng + '/' +
        key.toUpperCase() + '/\n';
      sheng_translator += '    - "xform/(^|[ \'])' +
        key + '/$1' + sheng.toUpperCase() + '/"\n';
    }
  }

  var sorted_yuns = Object.keys(yuns);
  sorted_yuns.sort(function(a, b) { return b.length - a.length; });
  for (var yun of sorted_yuns) {
    var key = pinyin_map[yun];
    if (yun != null && yun != key) {
      yun_speller += '    - xform/' + yun + '$/' +
        key.toUpperCase() + '/\n';

      var prefixes = '';
      for (var sheng of yuns[yun]) {
        if (sheng == '0' && !has_zero_sheng) {
          sheng = yun[0];
        }
        prefixes += pinyin_map[sheng];
      }
      yun_translator += '    - xform/([' + prefixes + '])' +
        key + '/$1' + yun.toUpperCase() + '/\n';
    }
  }

  speller_xforms = (zero_sheng_speller + sheng_speller +
                    yun_speller).slice(0, -1);
  translator_xforms = (yun_translator + sheng_translator +
                       zero_sheng_translator).slice(0, -1);

  optional_id = '';
  optional_name = '';
  optional_description = '';
  optional_second_translator = '';
  second_translator = '';
  if (smart) {
    optional_id = '_smart';
    optional_name = ' + 智能整句 + 笔画顶功';
    optional_description = optional_name;
    optional_second_translator = `\
    - table_translator@second_translator
`;
    second_translator = `\
second_translator:
  dictionary: double_pinyin_stroke
  enable_user_dict: false
  preedit_format:
    - "xform/^/〔单〕/"
`;
  }

  return `\
# Rime schema
# encoding: utf-8

schema:
  schema_id: double_pinyin${optional_id}
  name: ${scheme_name}${optional_name}
  version: "0.1"
  author:
    - 无名氏
  description: |
    朙月拼音＋${scheme_name}双拼方案${optional_description}。
  dependencies:
    - stroke

${rime_switches}

${rime_engine}
  translators:
    - punct_translator
    - reverse_lookup_translator
    - script_translator
${optional_second_translator}
  filters:
    - simplifier
    - uniquifier

speller:
  alphabet: "${alphabet}"
  initials: "${initials}"
  delimiter: " '"
  algebra:
    - erase/^xx$/
    - derive/^([jqxy])u$/$1v/
${speller_xforms}
    - xlit/ABCDEFGHIJKLMNOPQRSTUVWXYZ/abcdefghijklmnopqrstuvwxyz/

translator:
  dictionary: luna_pinyin
  prism: double_pinyin${optional_id}
  preedit_format:
    - "xform/^/〔双〕/"

${second_translator}

${rime_common}
  `;
}

function export_scheme_for_fcitx() {
  var scheme_name = document.getElementById('scheme-name').value;
  var scheme = get_scheme_from_keyboard();
  var pinyin_map = read_pinyin_map_from_scheme(scheme).pinyin_map;

  var zero_sheng_section = '';
  if (pinyin_map['0'] != null) {
    zero_sheng_section += '=' + pinyin_map['0'].toUpperCase() + '\n';
  }

  var sheng_section = '';
  for (var sheng of shengs) {
    var key = pinyin_map[sheng];
    if (sheng != null && sheng != key) {
      sheng_section += sheng + '=' + key.toUpperCase() + '\n';
    }
  }

  var yun_section = '';
  for (var yun in yuns) {
    var key = pinyin_map[yun];
    if (yun != null && yun != key) {
      yun_section += yun + '=' + key.toUpperCase() + '\n';
    }
  }

  return `\
[方案]
方案名称=${scheme_name}

[零声母标识]
${zero_sheng_section}
[声母]
# 双拼编码就是它本身的声母不必列出
${sheng_section}
[韵母]
# 双拼编码就是它本身的韵母不必列出
${yun_section}
`;
}

