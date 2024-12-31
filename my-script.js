window.onload = function () {
    const carousel = document.querySelector('.carousel');
    const leftArrow = document.getElementById('left-arrow');
    const rightArrow = document.getElementById('right-arrow');

    fetch('book-description.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(book => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="photos/${book.photo}" alt="${book.title}">
                    <h3>${book.title}</h3>
                    <p>${book.description}</p>
                `;
                carousel.appendChild(card);
            });

            initializeCarousel(data.length, 3);
        });

    function initializeCarousel(totalCards, visibleCards) {
        let currentIndex = 0;
        function duplicateCards() {
            const cards = Array.from(carousel.children);
            const firstCards = cards.slice(0, visibleCards);
            const lastCards = cards.slice(-visibleCards);

            firstCards.forEach(card => carousel.appendChild(card.cloneNode(true)));
            lastCards.forEach(card => carousel.insertBefore(card.cloneNode(true), carousel.firstChild));
        }

        function updateCarousel() {
            const offset = -((100 / visibleCards) * currentIndex);
            carousel.style.transition = "transform 0.5s ease";
            carousel.style.transform = `translateX(${offset}%)`;
        }

        function handleTransitionEnd() {
            const cards = Array.from(carousel.children);

            if (currentIndex >= totalCards) {
                carousel.style.transition = 'none';
                currentIndex = 0;
                updateCarousel();
                setTimeout(() => {
                    carousel.style.transition = "transform 0.5s ease";
                    currentIndex++;
                    updateCarousel();
                }, 50);
            } else if (currentIndex < 0) {
                carousel.style.transition = 'none';
                currentIndex = totalCards - 1;
                updateCarousel();
                setTimeout(() => {
                    carousel.style.transition = "transform 0.5s ease";
                    currentIndex--;
                    updateCarousel();
                }, 50);
            }
        }

        rightArrow.addEventListener('click', () => {
            currentIndex++;
            updateCarousel();
        });

        leftArrow.addEventListener('click', () => {
            currentIndex--;
            updateCarousel();
        });

        carousel.addEventListener('transitionend', handleTransitionEnd);

        duplicateCards();
        updateCarousel();
        
        setInterval(() => {
            currentIndex++;
            updateCarousel();
        }, 3000);
    }
};
