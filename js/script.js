window.addEventListener('DOMContentLoaded', function () {

    let btn = document.getElementsByTagName('BUTTON'),
        input = document.getElementById('input'),
        select = document.getElementById('color'),
        row = document.getElementsByClassName('row')[0], //родитель items, для дилегирования и добавления 
        items = document.getElementsByClassName('item'); //псевдомассив блоков;

    //показать/скрыть форму выбора цвета
    btn[0].addEventListener('click', function () { 
        select.classList.toggle('show');
    });
    //показать форму ввода количества блоков
    btn[1].addEventListener('click', function () { 
        input.classList.add('show');
    });
    //отмена вызова контекстного меню в input
    input.addEventListener('contextmenu', function (event) { 
        if (event) {
            event.preventDefault();
        }
    });
    input.addEventListener('keydown', function (event) { //запрет нажатия ctrl на windows и metaKey на маке
        if (event.ctrlKey || event.metaKey) { // для запрета вставки значений из буфера обмена
            event.preventDefault();
        }
    });
    //keydown не различает 1 и !, 2 и @  а keypress не распознает специальные клавиши, поэтому 2 события на input
    input.addEventListener('keypress', function (event) { //валидация ввода
        var chr = getChar(event); //получаем введенный символ
        if (chr == null) return; //если получаем null, то завершаем событие
        if (chr < '0' || chr > '9') { //если 
            event.preventDefault();
        }
    });
    //преобразование кода символа в сам символ
    function getChar(event) { 
        if (event.which == null) { //если браузер не поддерживает метод which *
            if (event.keyCode < 32) { //запрещаем ввод недопустимых символов 
                event.preventDefault();
            }
            return String.fromCharCode(event.keyCode); // *возвращаем через keyCode преобразованный символ
        }

        if (event.which != 0 && event.charCode != 0) { //тоже самое только для браузеров с поодержкой which
            if (event.which < 32) {
                event.preventDefault();
            }
            return String.fromCharCode(event.which);
        }

        return null; // специальная клавиша
    }
    //добавляем  n блоков 
    function createBlock(n) { 
        for (let i = 0; i < n; i++) { //let i = length; i < n + length; i++
            let newBlock = document.createElement('div');
            newBlock.classList.add('item');
            row.appendChild(newBlock);
        }
    }
    //удаляем n блоков
    function removeBlock(n) { 
        for (let i = 0; i < n; i++) {
            let lastBlock = items[items.length - 1]; //выбираем последний блок в текущей итерации 
            lastBlock.remove(); //и удаляем
        }
    }
    //добавление/удаление
    input.addEventListener('keydown', function (event) {     
        if (event.keyCode == 13) { //нажатие на Enter
            let length = items.length; //текущее количество блоков 
            if (length < input.value) { //если текущее количество меньше введенного значения
                createBlock(input.value - length); //добавляем блоки
            } else {                               //если текущее количество больше введенного значения
                removeBlock(length - input.value); //удаляем блоки
            }
        }
    });
    //закрашивание
    row.addEventListener('click', function (event) { 
        let target = event.target,
            currentColor = select.value; //текущий цвет
        if (target.classList.contains('item') && select.classList.contains('show') && currentColor != 'empty') {
            target.style.background = currentColor;
        }
    });
});
