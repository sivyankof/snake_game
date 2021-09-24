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

    // moveUserTo(USER.direction);
    moveUserTo(USER.direction);
}

document.addEventListener('keydown', (e) => {
    const target = e.keyCode;
    if (Object.values(USER.KEYS).includes(e.keyCode)) {
        const pressKey = Object.entries(USER.KEYS).find((key) => key.includes(target));

        USER.direction = pressKey[0];
    }
});

//ИСПРАВИТЬ ПРОТИВОПОЛОЖНОЕ НАПРАВЛЕНИЕ
// https://thecode.media/snake-js/
// https://prognote.ru/web-dev/front-end/how-to-make-a-snake-on-js-with-canvas/

function moveUserTo(direction) {
    if (direction === 'UP' && direction !== 'DOWN') {
        USER.cells.pop();

        let head = Object.assign({}, USER.cells[0]);
        head.y -= 1;
        USER.cells.unshift(head);
    } else if (direction === 'DOWN' && direction !== 'UP') {
        USER.cells.pop();

        let head = Object.assign({}, USER.cells[0]);
        head.y += 1;
        USER.cells.unshift(head);
    } else if (direction === 'LEFT' && direction !== 'RIGHT') {
        USER.cells.pop();

        let head = Object.assign({}, USER.cells[0]);
        head.x -= 1;
        USER.cells.unshift(head);
    } else if (direction === 'RIGHT' && direction !== 'LEFT') {
        USER.cells.pop();

        console.log(USER.cells[0]);

        let head = Object.assign({}, USER.cells[0]);
        head.x += 1;

        console.log(head);
        USER.cells.unshift(head);
    }
}
