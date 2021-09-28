(function init() {
    if (USER.startLength > USER.cells.length) {
        const offsetX = (USER.startPosition.x -= 1);
        const offsetY = USER.startPosition.y;

        USER.cells.push({ x: offsetX, y: offsetY });
        console.log(USER.cells);
        init();
    }
})();

gameLoop();

function gameLoop() {
    HELPERS.clearField();

    // пример использования объекта HELPERS
    // просто рисуем змейку по параметрам из настроек пользователя
    // и яблоко каждый раз в случайном месте
    // for (var i = 0; i < USER.startLength; i++) {
    //     HELPERS.drawSnakeSegment(USER.startPosition.x - i, USER.startPosition.y);

    //     //добавление блоков в массив змеи
    // }

    USER.cells.forEach((el) => HELPERS.drawSnakeSegment(el.x, el.y));

    HELPERS.drawApple(HELPERS.random.getX(), HELPERS.random.getY());
    // конец примера
    setTimeout(gameLoop, TIME_INTERVAL);

    moveUserTo(USER.direction);
}

document.addEventListener('keydown', (e) => {
    const target = e.keyCode;
    const pressKey = Object.entries(USER.KEYS).find((key) => key.includes(target));

    if (target === 38 && USER.direction !== 'DOWN') {
        USER.direction = pressKey[0];
    } else if (target === 40 && USER.direction !== 'UP') {
        USER.direction = pressKey[0];
    } else if (target === 37 && USER.direction !== 'RIGHT') {
        USER.direction = pressKey[0];
    } else if (target === 39 && USER.direction !== 'LEFT') {
        USER.direction = pressKey[0];
    }
});

//ИСПРАВИТЬ ПРОТИВОПОЛОЖНОЕ НАПРАВЛЕНИЕ
// https://thecode.media/snake-js/
// https://prognote.ru/web-dev/front-end/how-to-make-a-snake-on-js-with-canvas/

function moveUserTo(direction) {
    USER.cells.pop();
    let head = Object.assign({}, USER.cells[0]);

    if (direction === 'UP') {
        head.y -= 1;
    } else if (direction === 'DOWN') {
        head.y += 1;
    } else if (direction === 'LEFT') {
        head.x -= 1;
    } else if (direction === 'RIGHT') {
        head.x += 1;
    }
    USER.cells.unshift(head);
}
