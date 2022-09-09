const area = document.getElementById('area');
let move = 0;
let result = '';
const contentWrapper = document.getElementById('content');
const modalResult = document.getElementById('modal-result-wrapper');
const overlay = document.getElementById('overlay');
const btnClose = document.getElementById('btn-close');


/* Событие click для area.
Если клик был по элементу с классом box, то выполняется условие
При клике по area, если значение переменной move четное число, то пишется 'X', если нечетное, то пишется '0'
*/
area.addEventListener('click', e => {
    if(e.target.className = 'box') {
        move % 2 === 0 ? e.target.innerHTML = 'X': e.target.innerHTML = '0';
        move += 1;
        check();
    }
});


/* Прооверка на выигрыш.
В переменную boxes, сохраняю все элементы с классом box.
Создаем массив arr, элементами которого являются массивы, с выиграшными комбинациями ячеек.
Цикл for, переменная i = 0, пока i меньше кол-ва элементов, помсле каждого элемента i += 1.
Далее, условие если:
Обращаемся к boxes(все ячейки), обращаемся к arr, обращаемся к i. Проверяем в элементах arr (например:
[0,1,2] - это первый элемент arr, с индексом 0). Если элемент с индексом 0 равен X или 0,
элемент с индексом 1 равен X или 0, элемент с индексом 2 равен X или 0 (например в элементе массива arr с индексом 2, [6,7,8], 
6 имеет индекс 0, 7 имеет индекс 1, 8 имеет индекс 2,)
Если условие верно, то переменной result присваиваем значаение 'крестики' или 'нолики' и вызываем функцию prepareResult,
со значением result.
*/
const check = () => {
    const boxes = document.getElementsByClassName('box');
    const arr = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (i = 0; i < arr.length; i ++) {
        if (
            boxes[arr[i][0]].innerHTML == 'X' && boxes[arr[i][1]].innerHTML == 'X' && boxes[arr[i][2]].innerHTML == 'X'
        ) {
            result = 'крестики'
            prepareResult(result)
        } else if (
            boxes[arr[i][0]].innerHTML == '0' && boxes[arr[i][1]].innerHTML == '0' && boxes[arr[i][2]].innerHTML == '0'
        ) {
            result = 'нолики'
            prepareResult(result)
        }
    };
    if (
        move === 9 && result != 'нолики' && result != 'крестики'
    ) {
        prepareResultDraw()
    }
};

/* Функция для выводла победителя.
Функция принимает победителя, из переменной result.
Далее формирует строку с победителем
Обращаемся к modalResult, присваиваем стиль display = 'block', чтобы он был видимым
*/
const prepareResult = winner => {
    contentWrapper.innerHTML = `Победили ${winner} !`;
    modalResult.style.display = 'block';
}

// Функция вывода ничьи
const prepareResultDraw = winner => {
    contentWrapper.innerHTML = `Ничья!`;
    modalResult.style.display = 'block';
}

/* Функция для закрытия модального окна.
Обращаемся к modalResult, присваиваем стиль display = 'none', чтобы закрыть (стал невидимым)
Перезагрузка страницы location.reload(); чтобы автоматически начиналась новая игра
*/
const closeModal = () => {
    modalResult.style.display = 'none';
    location.reload();
};

/* При событии клика по overlay или btnClose, выполнить функцию closeModal()
*/
overlay.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);


