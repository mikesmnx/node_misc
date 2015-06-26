// показывает все возможные варианты американских буквенных телефонных номеров
// например, 1-800-THIS это 1-800-TGGQ или 1-800-UGIQ, или 1-800-VIHS 

var phone = '1-800-THIS';

var keymap = {
	'0': [],
	'1': [],
	'2': 'ABC',
	'3': 'DEF',
	'4': 'GHI',
	'5': 'JKL',
	'6': 'MNO',
	'7': 'PQRS',
	'8': 'TUV',
	'9': 'WXYZ',
	'-' : '-'
};

// номер типа 1-800-ABC-EFGH, без ограничений длины

var num_part = phone.toUpperCase().match(/^1\-800\-([A-Z-]+)$/);
if (num_part === null) {
	console.log('bad number');
	
	process.exit();
}


// преобразуем ABC-EFGH в цифры, которые нужно набрать и сразу подсчитаем количество
// номеров, которые будут в результате

var digits = [];
var letters = num_part[1].split('');
var num_count = 1;
for (var k in letters) {
	for (var j in keymap) {
		if (keymap[j].indexOf(letters[k]) > -1) {
			digits.push(j);
			num_count *= keymap[j].length;
			
			break;
		}
	}
}

var all_numbers_list = [];
var cur_count = 1;
var limit = 1;
var cur_letter = 0;

// список будет в массиве, добавим сразу 1-800- к результатам

for (k = 0; k < num_count; k++) {
	all_numbers_list[k] = '1-800-';
}

// проходим по всем цифрам, которые надо набрать
// и добавляем к результату необходимое количество букв
// AD => 'A A A B B B C C C' на первом шаге
// и 'AD AE AF BD BE BF CD CE CF' на втором

for (var i in digits) {
	cur_count = cur_count * keymap[digits[i]].length;
	limit = num_count / cur_count;
	k = limit;
	
	
	for (j = 0; j < num_count; j++) {
		all_numbers_list[j] += keymap[digits[i]][cur_letter];
		
		if (!--k) {
			k = limit;
			cur_letter = (cur_letter + 1) % keymap[digits[i]].length;
		}
	}
}

console.log(all_numbers_list);