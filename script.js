$(function() {
    const dictionary = {
        easy: {
            title: "Початковий",
            words: [
                { en: "Apple", ua: "яблуко" },
                { en: "Book", ua: "книга" },
                { en: "House", ua: "будинок" },
                { en: "Water", ua: "вода" },
                { en: "Sun", ua: "сонце" },
                { en: "Friend", ua: "друг" },
                { en: "Time", ua: "час" },
                { en: "Work", ua: "робота" },
                { en: "City", ua: "місто" },
                { en: "Car", ua: "машина" }
            ]
        },
        medium: {
            title: "Середній",
            words: [
                { en: "Journey", ua: "подорож" },
                { en: "Knowledge", ua: "знання" },
                { en: "Decision", ua: "рішення" },
                { en: "Experience", ua: "досвід" },
                { en: "Purpose", ua: "мета" },
                { en: "Success", ua: "успіх" },
                { en: "Development", ua: "розвиток" },
                { en: "Environment", ua: "довкілля" },
                { en: "Opportunity", ua: "можливість" },
                { en: "Confidence", ua: "впевненість" }
            ]
        },
        hard: {
            title: "Високий",
            words: [
                { en: "Ambiguous", ua: "двозначний" },
                { en: "Consequence", ua: "наслідок" },
                { en: "Inevitable", ua: "неминучий" },
                { en: "Perseverance", ua: "наполегливість" },
                { en: "Substantial", ua: "суттєвий" },
                { en: "Vulnerable", ua: "вразливий" },
                { en: "Contradiction", ua: "суперечність" },
                { en: "Comprehensive", ua: "всебічний" },
                { en: "Deteriorate", ua: "погіршуватися" },
                { en: "Sophisticated", ua: "витончений" }
            ]
        }
    };

    let currentLevel = "easy";
    let list = [], step = 0, ok = 0, bad = 0;

    function start() {
        currentLevel = $("input[name='level']:checked").val();
        list = [...dictionary[currentLevel].words].sort(() => Math.random() - 0.5);
        step = ok = bad = 0;
        $("#modal").hide();
        update();
    }

    function update() {
        $("#step").text(`Крок ${step + 1} / ${list.length}`);
        $("#ok").text(ok);
        $("#bad").text(bad);
        $("#card").text(list[step].en);
        $("#input").val("").focus();
        $("#err").hide();
    }

    function checkAnswer() {
        const val = $("#input").val().trim().toLowerCase();

        if (!/^[а-яА-ЯіІїЇєЄґҐa-zA-Z\s'-]+$/.test(val)) {
            $("#err").show();
            return;
        }

        if (val === list[step].ua) ok++;
        else bad++;

        step++;
        if (step < list.length) {
            update();
        } else {
            $("#ok").text(ok);
            $("#bad").text(bad);
            $("#resLevel").text(dictionary[currentLevel].title);
            $("#resOk").text(ok);
            $("#resBad").text(bad);
            $("#modal").css("display", "flex");
        }
    }

    $("#card").click(checkAnswer);
    $("#input").keypress(function(e) {
        if (e.which === 13) checkAnswer();
    });

    $("input[name='level']").change(start);

    $("#restart").click(start);
    start();
});