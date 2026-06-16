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

card1.originPosition = "";
card2.originPosition = "";
card3.originPosition = "";
card4.originPosition = "";
card5.originPosition = "";

card1.description = "I don't wait for direction to explore. Whether it's a new framework or an unfamiliar domain, I dig in, ask the right questions, and push until I understand it fully.";
card2.description = "I approach every challenge as a puzzle. I look for the elegant solution — one that's not just functional, but thoughtful, clean, and built to last.";
card3.description = "I've built most of my skill set outside the classroom — through projects, experimentation, and a lot of deliberate practice. Give me a problem and I'll figure it out.";
card4.description = "Tech stacks change, project scopes shift, deadlines move. I adjust without losing momentum — staying focused on the outcome regardless of what changes around me.";
card5.description = "I say what I mean and deliver what I promise. No overclaiming, no excuses — just clear communication and consistent follow-through.";

const cards = new Array(card1, card2, card3, card4, card5);

var animating = false;

function magicCard() {
    var prevCard = null;

    $.each(cards, function (index, value) {
        value.originPosition = $("." + value.className).parent().offset();
    });

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
    const targetOffset = $(".cardPlacement").offset();
    const cardDescription = $(".cardDescription");

    $.each(cards, function (index, value) {
        if (selectedCard.hasClass(value.className)) {
            if (selectedCard.hasClass("notMoved")) {
                cardOffset = value.originPosition;
            }
        }
    });

    animating = true;
    cardDescription.fadeOut(250);

    selectedCard.animate({
        top: (targetOffset.top - cardOffset.top) + "px",
        left: (targetOffset.left - cardOffset.left) + "px"
    }, 500, function () {
        $.each(cards, function (index, value) {
            if (selectedCard.hasClass(value.className)) {
                cardDescription.html(value.description).fadeIn(250);
                if (selectedCard.hasClass("moved")) {
                    cardDescription.html("");
                }
                selectedCard.toggleClass("moved");
                selectedCard.toggleClass("notMoved");
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
        const off = imageContainer.offset();
        const cw = imageContainer.outerWidth();
        const ch = imageContainer.outerHeight();
        const w = puzzlePiece.outerWidth();
        const h = puzzlePiece.outerHeight();

        var newX = e.pageX - w / 2;
        var newY = e.pageY - h / 2;

        // keep the whole piece inside the container
        newX = Math.max(off.left, Math.min(newX, off.left + cw - w));
        newY = Math.max(off.top, Math.min(newY, off.top + ch - h));

        puzzlePiece.css({
            left: newX,
            top: newY
        });
    }).mouseleave(function () {
        randomMovement(imageContainer.position());
    }).click(function (e) {
        currentMousePos.x = e.pageX;
        currentMousePos.y = e.pageY;
        console.log(currentMousePos, missingPiecePosX, missingPiecePosY);
        const newX = currentMousePos.x - width;
        const newY = currentMousePos.y - height;
        if (newX + 20 >= missingPiecePosX
            && newX - 20 <= missingPiecePosX
            && newY + 20 >= missingPiecePosY
            && newY - 20 <= missingPiecePosY) {
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

function atomProjectCases() {
    const currentClickableCase = $(".label-pop");

    currentClickableCase.click(function () {
        // over
        $(this).children(".label-hidden").show();
        $(this).children(".label-hidden").animate({
            width: "100%",
        }, 500);
    }).hover(function () {
        // nothing            
    }, function () {
        // out
        const hideLabels = $(this).children(".label-hidden");
        hideLabels.animate({
            width: "0",
        }, 500, function () {
            hideLabels.hide();
        });
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