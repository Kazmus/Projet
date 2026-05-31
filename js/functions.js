function marquee() {
    const $track = $('.track');

    // Measure the EXACT (fractional) width of the original strip BEFORE cloning.
    const firstOriginal = $track.children().first()[0];

    // Clone the items so a seamless second copy follows the first.
    $track.append($track.children().clone());

    const pxPerSec = 160;
    var repeatWidth = measureRepeat();

    // True distance from the first original item to its clone — sub-pixel accurate.
    function measureRepeat() {
        const children = $track.children();
        const firstCloneIndex = children.length / 2;          // clone starts at the midpoint
        const a = children.eq(0)[0].getBoundingClientRect().left;
        const b = children.eq(firstCloneIndex)[0].getBoundingClientRect().left;
        return b - a;                                         // fractional, not rounded
    }

    var offset = 0;
    var lastTime = null;

    function step(now) {
        if (lastTime !== null) {
            const delta = (now - lastTime) / 1000;
            offset += pxPerSec * delta;

            // Subtract the EXACT repeat width. The overshoot carries over,
            // so there's no rounding snap.
            if (offset >= repeatWidth) offset -= repeatWidth;

            $track.css('transform', 'translate3d(' + (-offset) + 'px, 0, 0)');
        }
        lastTime = now;
        requestAnimationFrame(step);
    }
    requestAnimationFrame(step);

    // Remeasure on resize, and after fonts load (Font Awesome changes widths late).
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
    var cardOffset = selectedCard.offset();
    var targetOffset = $(".cardPlacement").offset();
    var cardDescription = $(".cardDescription");

    animating = true;

    selectedCard.animate({
        top: (targetOffset.top - cardOffset.top) + "px",
        left: (targetOffset.left - cardOffset.left) + "px"
    }, 250, function() {
        $.each(cards, function (index, value) { 
            if (selectedCard.hasClass(cards[index].className))
            {
                cardDescription.html(cards[index].description);
                if (selectedCard.hasClass("moved")) {
                    cardDescription.html("");
                }
                selectedCard.toggleClass("moved");
                animating = false;
            }
        });
    });
}