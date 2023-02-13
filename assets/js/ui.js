$(document).ready(function(){

    let ww = $(window).width();
    let html = $("html");
    let loading = $(".loading");

    cursor();
    visualMemberMove();
    memberSlide(); //memberSlide
    newsSlide(); //newsSlide
    
    // sub 체크
    let subCheck = $("#wrap").is(".sub");
    if (subCheck) {
        $("#container").addClass("active");
    }

    // loading 최초 한번만 노출
    function loadingStart() {
        // loading 중 스크롤 막기 
        html.on("scroll touchmove mousewheel", function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        });
        loading.addClass("ing");
        setTimeout(function() { 
            loading.addClass("up");
        }, 2000);
        setTimeout(function() { 
            $(".visualText01, .visualText02, .visualText03").addClass("active");
        }, 3500);
        setTimeout(function() { 
            sessionStorage.setItem("loading", "end");
            html.css("background","transparent");
            html.off("scroll touchmove mousewheel");// 스크롤 풀기 
        }, 4000);
    }
    function loadingEnd() {
        html.css("background","transparent");
        loading.addClass("hide");
        setTimeout(function() { 
            $(".visualText01, .visualText02, .visualText03").addClass("active");
        }, 500);
    }
    if (sessionStorage.getItem("loading")) {
        loadingEnd();
    } else if (!sessionStorage.getItem("loading")) {
        loadingStart();
    }

    // fullpage
    $("#fullpage").fullpage({
        menu: ".menu",
        anchors: ["section01", "section02", "section03", "section04"],
        licenseKey: "OPEN-SOURCE-GPLV3-LICENSE",
        autoScrolling: true,
        scrollingSpeed: 1500,
        navigation: false,
        css3: true,
        easing: "ease",
        easingcss3: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        //responsiveWidth: 1199,
        "afterLoad": function (anchorLink, index) {
            let total = $("#fullpage > .section").length;
            $(".sectionNum .sectionTotal").text(total < 10 ? "0" + total : total);
            $(".sectionNum .sectionIndex").text(index < 10 ? "0" + index : index);
            
            let bgVideo = $(".bgVideo").find("video"),
                scrollDown = $(".scrollDown");

            if (index == 1){
                $(".menuTop").addClass("active");
                $(".menuLeft").removeClass("active");
                scrollDown.removeClass("hide");
                bgVideo.get(0).play();
            } else if (index == 2){
                $(".menuLeft").addClass("active");
                $(".menuTop").removeClass("active");
                scrollDown.removeClass("hide");
                bgVideo.get(0).currentTime = 0;
                $(".memberSlide").slick("goTo", 0);
            } else if (index == 3){
                $(".menuLeft").addClass("active");
                $(".menuTop").removeClass("active");
                scrollDown.removeClass("hide");
                bgVideo.get(0).currentTime = 0;
                $(".newsSlide").slick("goTo", 0);
            } else if (index == 4){
                $(".menuLeft").addClass("active");
                $(".menuTop").removeClass("active");
                scrollDown.addClass("hide");
                bgVideo.get(0).currentTime = 0;
            }
        },	
        // 페이지 이동할 때
        "onLeave" : function (index, nextIndex, direction){
            if (index == 1 && direction == "down"){

            } else if (index == 3 && direction == "up"){

            }
        }
    });

    //cursor
    function cursor() {
        if (ww > 767){
            let cursorBall = $("#cursor");
            document.body.addEventListener("mousemove", evt=> {
                const mouseX = evt.clientX; 
                const mouseY = evt.clientY;
                
                gsap.set(cursorBall, {
                    x:mouseX,
                    y:mouseY
                });
            });
            $("a, button").mouseover(function(){
                cursorBall.addClass("hovered");
            }).mouseleave(function(){
                cursorBall.removeClass("hovered");
            });
        }
    }

    // visualMemberMove
    function visualMemberMove() {
        if (ww > 930){
            $(".section01").waypoint(function() {
                $(".section01").mousemove(function(e){
                    parallax(e, ".img_visual_member01", -40);
                    parallax(e, ".img_visual_member02", 45);
                    parallax(e, ".img_visual_member03", 20);
                    parallax(e, ".img_visual_member04", -20);
                });
            });
            function parallax(e, target, movement) {

                let $this = $(e.currentTarget);
                let relX = e.pageX - $this.offset().left;
                let relY = e.pageY - $this.offset().top;

                TweenMax.to(target, 3, {
                    x: (relX - $this.width() / 2) / $this.width() * movement,
                    y: (relY - $this.height() / 2) / $this.height() * movement
                });
            }
        }
    }

    // member fixCrew
    if($(".fixCrew").length) {
        $(".fixCrew a").mouseover(function(){
            $(this).addClass("on");
            $(this).find("img").attr("src", "assets/images/img_fixcrew_on.png");
        }).mouseleave(function(){
            $(this).removeClass("on");
            $(this).find("img").attr("src", "assets/images/img_fixcrew_off.png");
        });
    }
    
    // memberSlide
    function memberSlide() {
        $(".memberSlide").on("init", function (event, slick) {
            setTimeout(function() { 
                $(".memberSlide .slick-slide:first").addClass("currentSlide");
            }, 500);
            $(".memberSlideControl .prev").addClass("slick-disabled");
        });
        $(".memberSlide").slick({
            fade: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 1000,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            pauseOnHover: false,
            arrows: true,
            prevArrow: $(".memberSlideControl .arrow .prev"),
            nextArrow: $(".memberSlideControl .arrow .next"),
            dots: true,
            customPaging: function (slick, index) {
                $(".memberSlideControl .nums > span").html((slick.slideCount));
                $(".memberSlideControl .bar span").css({
                    width: (100 / slick.slideCount) + "%"
                });
            }
        }).on("beforeChange", function (event, slick, currentSlide, nextSlide) {
            let i = (nextSlide ? nextSlide : 0) + 1;
            $(".memberSlideControl .nums strong").html((i));
            $(".memberSlideControl .bar span").css({
                width: ((100 / slick.slideCount) * (nextSlide + 1)) + "%"
            });
            $(".slick-slide").removeClass("currentSlide");
            $(".slick-slide").eq(nextSlide).addClass("currentSlide");
        }).on("afterChange", function (event, slick, currentSlide) {
            if (currentSlide === 0) {
                $(".memberSlideControl .prev").addClass("slick-disabled");
                $(".memberSlideControl .next").removeClass("slick-disabled");
            } else {
                $(".memberSlideControl .prev").removeClass("slick-disabled");
            }
            if (slick.slideCount === currentSlide + 1) {
                $(".memberSlideControl .next").addClass("slick-disabled");
            } else {
                $(".memberSlideControl .next").removeClass("slick-disabled");
            }
        });
    }

    // news Slide
    function newsSlide() {
        $(".newsSlide").on("init", function (event, slick) {
            $(".newsArrow .prev").addClass("slick-disabled");
        });
        $(".newsSlide").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 3000,
            speed: 700,
            dots: false,
            infinite: true,
            pauseOnHover: false,
            arrows: true,
            prevArrow: $(".newsArrow .prev"),
            nextArrow: $(".newsArrow .next"),
            responsive: [
                {
                    breakpoint: 1119,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        }).on("afterChange", function (event, slick, currentSlide) {
            if (currentSlide === 0) {
                $(".newsArrow .prev").addClass("slick-disabled");
                $(".newsArrow .next").removeClass("slick-disabled");
            } else {
                $(".newsArrow .prev").removeClass("slick-disabled");
            }
            if (slick.slideCount === currentSlide + 1) {
                $(".newsArrow .next").addClass("slick-disabled");
            } else {
                $(".newsArrow .next").removeClass("slick-disabled");
            }
        });
    }

    // 개인정보취급방침
    $(document).on("click", ".btnPrivacyOpen", function () {
        $("#privacyPopup").fadeIn("400").addClass("show");
        return false;
    }).on("click", ".btnPrivacyClose", function () {
        $("#privacyPopup").removeClass("show");
        return false;
    });
    // 문의하기
    $(document).on("click", ".btnMailOpen", function () {
        $("#mailPopup").fadeIn("400").addClass("show");
        return false;
    }).on("click", ".btnMailClose", function () {
        $("#mailPopup").removeClass("show");
        return false;
    });
    // 크리티스 크루 신청하기
    $(document).on("click", ".btnCrewOpen", function () {
        $("#crewPopup").fadeIn("400").addClass("show");
        return false;
    }).on("click", ".btnCrewClose", function () {
        $("#crewPopup").removeClass("show");
        return false;
    });
});