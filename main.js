document.addEventListener("DOMContentLoaded", () => {
    // === БУРГЕР МЕНЮ ===
    const burger = document.querySelector(".burger");
    const anchorNav = document.querySelector(".anchor-nav");

    burger?.addEventListener("click", () => {
        anchorNav.classList.toggle("active");
    });

    // === ЯКОРНАЯ ПРОКРУТКА: центрирование блока по новому правилу ===
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            // Получаем высоту фиксированной шапки
            const headerHeight = document.querySelector(".header").offsetHeight;
            // Целевая позиция: верх элемента должен быть на 10% высоты экрана ниже шапки
            const offset = headerHeight + window.innerHeight * 0.01;
            const targetPosition = target.offsetTop - offset;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });

            // Закрываем бургер-меню, если оно открыто
            const anchorNav = document.querySelector(".anchor-nav");
            anchorNav.classList.remove("active");
        });
    });

    // === ПЕРЕВОРОТ КАРТОЧЕК ===
    document.querySelectorAll(".flip-card").forEach((card) => {
        card.addEventListener("click", () => {
            card.classList.toggle("flipped");
        });
    });

    // === МОДАЛЬНЫЕ ОКНА ===
    const dividerModal = document.getElementById("divider-modal");
    const detailsModal = document.getElementById("details-modal");
    const openDivider = document.getElementById("divider-trigger");
    const closeButtons = document.querySelectorAll(".close");

    openDivider?.addEventListener("click", () => {
        dividerModal.style.display = "flex";
    });

    document.getElementById("block2").addEventListener("click", function (e) {
        if (e.target.classList.contains("details-btn")) {
            e.stopPropagation();
            const detailsModal = document.getElementById("details-modal");
            const modalText = detailsModal.querySelector(".modal-text");

            // Пример контента. Замените на реальные данные.
            modalText.innerHTML = `
      <h3>Кейс</h3>
      <p>ПУСТО ...</p>
    `;
            detailsModal.style.display = "flex";
        }
    });

    document.querySelectorAll(".details-btn").forEach((btn, index) => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const detailsModal = document.getElementById("details-modal");
            const modalText = detailsModal.querySelector(".modal-text");

            // === ЗДЕСЬ НАЧИНАЮТСЯ ОПИСАНИЯ ДЛЯ КАЖДОГО КЕЙСА ===
            switch (index) {
                case 0: // Ньютон
                    modalText.innerHTML = `
                    <h3>Корпускулярная теория света</h3>
                    <p>Свет состоит из мельчайших частиц (корпускул), которые движутся прямолинейно. Это объясняло отражение и преломление, но не интерференцию.</p>
                `;
                    break;
                case 1: // Фарадей
                    modalText.innerHTML = `
                    <h3>Концепция поля</h3>
                    <p>Вместо действия на расстоянии, электрические и магнитные силы передаются через напряжённое состояние пространства — поле. Это был радикальный отказ от ньютоновской механики.</p>
                `;
                    break;
                case 2: // Максвелл
                    modalText.innerHTML = `
                    <h3>Единая теория ЭМ-волн</h3>
                    <p>Математически объединил электричество и магнетизм в одну систему уравнений. Предсказал существование электромагнитных волн, распространяющихся со скоростью света.</p>
                `;
                    break;
                case 3: // Герц
                    modalText.innerHTML = `
                    <h3>Практическое подтверждение ЭМ-волн</h3>
                    <p>Первым экспериментально создал и обнаружил радиоволны, предсказанные Максвеллом. Его установка стала первым передатчиком и приёмником радиосигналов.</p>
                `;
                    break;
                case 4: // Больцман
                    modalText.innerHTML = `
                    <h3>Кинетическая теория газов</h3>
                    <p>Макроскопические свойства вещества (давление, температура) объяснил как статистический результат движения огромного числа атомов и молекул.</p>
                `;
                    break;
                default:
                    modalText.innerHTML = `<h3>Кейс ${
                        index + 1
                    }</h3><p>Описание...</p>`;
            }
            // === ЗДЕСЬ ЗАКАНЧИВАЮТСЯ ОПИСАНИЯ ===

            detailsModal.style.display = "flex";
        });
    });

    document
        .querySelector(".final-back-content .details-btn")
        .addEventListener("click", (e) => {
            e.stopPropagation();
            const detailsModal = document.getElementById("details-modal");
            const modalText = detailsModal.querySelector(".modal-text");

            // Пример контента. Замените на нужный текст.
            modalText.innerHTML = `
        <h3>Следующий этап</h3>
        <p>Подробное описание перехода к следующей теме...</p>
    `;

            detailsModal.style.display = "flex";
        });

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            btn.closest(".modal").style.display = "none";
        });
    });

    window.addEventListener("click", (e) => {
        if (e.target === dividerModal || e.target === detailsModal) {
            e.target.style.display = "none";
        }
    });

    // === СЛАЙДЕР ХРОНОЛОГИИ ===
    const track = document.getElementById("sliderTrack");
    const dotsContainer = document.getElementById("dotsContainer");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const allSlides = Array.from(track.children);
    const slideCount = allSlides.length;

    // Добавляем клоны для зацикливания
    const firstClone = allSlides[0].cloneNode(true);
    const lastClone = allSlides[slideCount - 1].cloneNode(true);
    track.insertBefore(lastClone, allSlides[0]);
    track.appendChild(firstClone);

    const extendedSlides = Array.from(track.children);
    let currentIndex = 1; // Начинаем с оригинала первого слайда
    let isAnimating = false;

    // Создаём индикаторы (точки)
    allSlides.forEach((_, index) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const updateDots = () => {
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex - 1);
        });
    };

    const updateSlider = (immediate = false) => {
        if (immediate) {
            track.style.transition = "none";
        } else {
            track.style.transition =
                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }
        const slideHeight = allSlides[0].offsetHeight;
        track.style.transform = `translateY(-${currentIndex * slideHeight}px)`;
        setTimeout(() => {
            track.style.transition =
                "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
        }, 50);
    };

    const handleTransitionEnd = () => {
        isAnimating = false;
        if (currentIndex === 0) {
            // Перескакиваем на оригинал последнего слайда
            currentIndex = slideCount;
            updateSlider(true);
        } else if (currentIndex === extendedSlides.length - 1) {
            // Перескакиваем на оригинал первого слайда
            currentIndex = 1;
            updateSlider(true);
        }
        updateDots();
    };

    const goToSlide = (index) => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex = index + 1;
        updateSlider();
    };

    prevBtn.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex--;
        updateSlider();
    });

    nextBtn.addEventListener("click", () => {
        if (isAnimating) return;
        isAnimating = true;
        currentIndex++;
        updateSlider();
    });

    track.addEventListener("transitionend", handleTransitionEnd);
    updateDots();

    // Переворот карточки внутри слайдера
    document.querySelectorAll("#block2 .card").forEach((card) => {
        card.addEventListener("click", (e) => {
            if (!e.target.classList.contains("details-btn")) {
                card.classList.toggle("flipped");
            }
        });
    });

    // Автопрокрутка
    let autoSlideInterval = setInterval(() => {
        nextBtn.click();
    }, 100000);

    track.addEventListener("mouseenter", () =>
        clearInterval(autoSlideInterval)
    );
    track.addEventListener("mouseleave", () => {
        autoSlideInterval = setInterval(() => {
            nextBtn.click();
        }, 100000);
    });

    // Инициализация
    updateSlider();
});
