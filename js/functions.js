function marquee() {
    const $track = $('.track');

    const firstOriginal = $track.children().first()[0];

    $track.append($track.children().clone());

    const pxPerSec = 80;
    var repeatWidth = measureRepeat();

    function measureRepeat() {
        const children = $track.children();
        const firstCloneIndex = children.length / 2;
        const a = children.eq(0)[0].getBoundingClientRect().left;
        const b = children.eq(firstCloneIndex)[0].getBoundingClientRect().left;
        return b - a;
    }

    var offset = 0;
    var lastTime = null;

    function step(now) {
        if (lastTime !== null) {
            const delta = (now - lastTime) / 1000;
            offset += pxPerSec * delta;

            if (offset >= repeatWidth) offset -= repeatWidth;

            $track.css('transform', 'translate3d(' + (-offset) + 'px, 0, 0)');
        }
        lastTime = now;
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    $(window).on('resize', () => { repeatWidth = measureRepeat(); });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => { repeatWidth = measureRepeat(); });
    }
}

const card = {
    className: "",
    description: "",
};

const card1 = Object.create(card);
const card2 = Object.create(card);
const card3 = Object.create(card);
const card4 = Object.create(card);
const card5 = Object.create(card);

card1.className = "card1";
card2.className = "card2";
card3.className = "card3";
card4.className = "card4";
card5.className = "card5";

card1.description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima ratione labore at porro, impedit soluta voluptate laborum nobis quasi unde doloribus fugiat. Rem veniam repellat sapiente illum provident! Sunt, exercitationem!";
card2.description = "Quia, praesentium! Laborum architecto qui rem quod. Porro quaerat est fugiat optio tempore quod voluptates laborum sint? Dolorum natus voluptate aut temporibus mollitia saepe? Cum velit quia odio magnam ipsam.";
card3.description = "Architecto, mollitia nobis saepe blanditiis quia pariatur laudantium assumenda tempora est ex hic amet fugiat optio iusto deleniti ea vero beatae consectetur unde ipsa non deserunt. Nisi illo amet quam.";
card4.description = "Ut impedit voluptatum ipsa aliquam repellendus explicabo accusamus eligendi deleniti vero dolores modi repellat, est porro eaque nam reiciendis, qui, necessitatibus magni culpa quod ratione assumenda natus recusandae aperiam. Dicta.";
card5.description = "Eligendi repellendus obcaecati nostrum magnam ullam natus voluptatum enim impedit ipsa voluptate magni modi veritatis nihil, eius quis quisquam? Culpa voluptates cumque error deserunt ut molestiae quae autem asperiores sequi.";

const cards = new Array(card1, card2, card3, card4, card5);

var animating = false;

function magicCard() {
    var prevCard = null;

    $(".card").on("click", function () {
        var selectedCard = $(this);

        if (animating) return null;

        if (prevCard != null) {
            moveCard(prevCard);
            prevCard = null;
        }

        if (selectedCard.hasClass("moved")) return null;

        moveCard(selectedCard);

        prevCard = selectedCard;
    });
}

function moveCard(selectedCard) {
    const cardOffset = selectedCard.offset();
    const targetOffset = $(".cardPlacement").offset();
    const cardDescription = $(".cardDescription");

    animating = true;
    cardDescription.fadeOut(250);

    selectedCard.animate({
        top: (targetOffset.top - cardOffset.top) + "px",
        left: (targetOffset.left - cardOffset.left) + "px"
    }, 500, function () {
        $.each(cards, function (index, value) {
            if (selectedCard.hasClass(cards[index].className)) {
                cardDescription.html(cards[index].description).fadeIn(250);
                if (selectedCard.hasClass("moved")) {
                    cardDescription.html("");
                }
                selectedCard.toggleClass("moved");
                animating = false;
            }
        });
    });
}

const imageContainer = $("#Image");
const puzzlePiece = $(".puzzlePiece");
const missingPiecePlacement = $(".missingPiecePlacement");

function dragPuzzle() {
    const width = puzzlePiece.width();
    const height = puzzlePiece.height();

    const missingPiecePos = missingPiecePlacement.position();
    const missingPiecePosX = missingPiecePos.left - width / 2;
    const missingPiecePosY = missingPiecePos.top - width / 2;

    var currentMousePos = { x: -1, y: -1 };
    imageContainer.mousemove(function (e) {
        puzzlePiece.stop(true);
        currentMousePos.x = e.pageX;
        currentMousePos.y = e.pageY;
        const newX = currentMousePos.x - width / 2;
        const newY = currentMousePos.y - height / 2;
        puzzlePiece.css({ left: newX, top: newY });
    }).mouseleave(function () {
        randomMovement(imageContainer.position());
    }).click(function (e) {
        currentMousePos.x = e.pageX;
        currentMousePos.y = e.pageY;
        const newX = currentMousePos.x - width;
        const newY = currentMousePos.y - height;
        if (newX + 10 >= missingPiecePosX
            && newX - 10 <= missingPiecePosX
            && newY + 10 >= missingPiecePosY
            && newY - 10 <= missingPiecePosY) {
            // imageContainer.css({ "filter": "invert(100)" });
            imageContainer.addClass("alive");
            puzzlePiece.hide();
            missingPiecePlacement.hide();
        }
    });
}

function randomMovementPuzzle() {
    const containerOffset = imageContainer.position();

    randomMovement(containerOffset);
}

function randomMovement(containerOffset) {
    const x = containerOffset.left + Math.random() * (imageContainer.width() - puzzlePiece.width());
    const y = containerOffset.top + Math.random() * (imageContainer.height() - puzzlePiece.height());

    const currentX = parseFloat(puzzlePiece.css("left"));
    const currentY = parseFloat(puzzlePiece.css("top"));

    const deltaX = x - currentX;
    const deltaY = y - currentY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const speed = 0.05;
    const duration = distance / speed;

    puzzlePiece.animate({ left: x + "px", top: y + "px" }, duration, function () {
        randomMovement(containerOffset);
    });
}

function atomDrawer() {
    const $atom = $('#Projects .atom');
    const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.75 });

    $atom.each(function () {
        observer.observe(this);
    });
}

function hamburgerNav() {
    const $nav = $("header nav");
    const $hamburger = $(".hamburger");

    $hamburger.on("click", function () {
        const isOpen = $nav.toggleClass("nav-open").hasClass("nav-open");
        $hamburger.attr("aria-expanded", isOpen);
    });

    $nav.find("ul a").on("click", function () {
        $nav.removeClass("nav-open");
        $hamburger.attr("aria-expanded", "false");
    });
}