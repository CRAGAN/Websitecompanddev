const headerText = document.querySelector("#header-text");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const leafLayers = document.querySelectorAll(".leaf-layer");

if (!prefersReducedMotion) {
    leafLayers.forEach((leafLayer) => {
        for (let index = 0; index < 20; index += 1) {
            const leaf = document.createElement("span");
            const fallDuration = 8 + Math.random() * 8;

            leaf.className = "falling-leaf";
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.width = `${8 + Math.random() * 8}px`;
            leaf.style.height = `${10 + Math.random() * 9}px`;
            leaf.style.setProperty("--fall-duration", `${fallDuration}s`);
            leaf.style.setProperty("--fall-delay", `${-Math.random() * fallDuration}s`);
            leaf.style.setProperty("--sway-duration", `${3 + Math.random() * 4}s`);
            leaf.style.setProperty("--leaf-rotation", `${Math.random() * 360}deg`);
            leafLayer.append(leaf);
        }
    });
}

const portfolioCarousel = document.querySelector("[data-portfolio-carousel]");

if (portfolioCarousel) {
    const cards = Array.from(portfolioCarousel.querySelectorAll(".portfolio-card"));
    const previousButton = portfolioCarousel.querySelector(".carousel-previous");
    const nextButton = portfolioCarousel.querySelector(".carousel-next");
    const status = portfolioCarousel.parentElement.querySelector(".carousel-status");
    const positions = {
        "-2": "far-previous",
        "-1": "previous",
        "0": "active",
        "1": "next",
        "2": "far-next",
    };
    let activeIndex = 0;

    const updateCarousel = () => {
        cards.forEach((card, index) => {
            const relativeIndex = (index - activeIndex + cards.length) % cards.length;
            const offset = relativeIndex > Math.floor(cards.length / 2)
                ? relativeIndex - cards.length
                : relativeIndex;
            const isActive = index === activeIndex;

            card.dataset.position = positions[offset];
            card.setAttribute("aria-pressed", String(isActive));
            card.disabled = !isActive;
        });

        status.textContent = `Project ${activeIndex + 1} of ${cards.length}`;
    };

    previousButton.addEventListener("click", () => {
        activeIndex = (activeIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    nextButton.addEventListener("click", () => {
        activeIndex = (activeIndex + 1) % cards.length;
        updateCarousel();
    });

    cards.forEach((card, index) => {
        card.addEventListener("click", () => {
            activeIndex = index;
            updateCarousel();
        });
    });

    updateCarousel();
}

if (headerText) {
    
    const message = Array.from("Olive's website...");
    const typeDelay = 100;
    const repeatDelay = 10_000;

    const typeMessage = () => {
        headerText.textContent = "";
        let characterIndex = 0;

        const typeNextCharacter = () => {
            headerText.textContent += message[characterIndex];
            characterIndex += 1;

            if (characterIndex < message.length) {
                window.setTimeout(typeNextCharacter, typeDelay);
            } else {
                window.setTimeout(typeMessage, repeatDelay);
            }
        };

        typeNextCharacter();
    };

    if (prefersReducedMotion) {
        headerText.textContent = message.join("");
    } else {
        typeMessage();
    }
}

const parallaxBackground = document.querySelector(".parallax-background");
const parallaxStarFields = document.querySelectorAll(".parallax-star-field");

if (parallaxBackground) {
    let updateScheduled = false;

    const updateParallax = () => {
        updateScheduled = false;

        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = maxScroll > 0
            ? Math.max(0, Math.min(window.scrollY / maxScroll, 1))
            : 0;
        parallaxBackground.style.setProperty("--parallax-y", `${-50 * progress}px`);
        parallaxBackground.style.setProperty("--parallax-blur", `${3 * progress}px`);
        parallaxBackground.style.setProperty("--parallax-brightness", `${1 - 0.2 * progress}`);

        if (!prefersReducedMotion) {
            parallaxStarFields.forEach((starField) => {
                starField.style.setProperty("--star-parallax-y", `${window.scrollY * 0.18}px`);
            });
        }
    };

    const scheduleParallaxUpdate = () => {
        if (!updateScheduled) {
            updateScheduled = true;
            window.requestAnimationFrame(updateParallax);
        }
    };

    window.addEventListener("scroll", scheduleParallaxUpdate, { passive: true });
    window.addEventListener("resize", scheduleParallaxUpdate);
    window.addEventListener("load", scheduleParallaxUpdate, { once: true });
    updateParallax();
}

// <![CDATA[
var colour="#d8e8ffeb"; // in addition to "random" can be set to any valid colour eg "#f0f" or "red"
var sparkles=50;

/****************************
*  Tinkerbell Magic Sparkle *
*(c)2005-13 mf2fm web-design*
*  http://www.mf2fm.com/rv  *
* DON'T EDIT BELOW THIS BOX *
****************************/
var x=ox=400;
var y=oy=300;
var swide=800;
var shigh=600;
var sleft=sdown=0;
var tiny=new Array();
var star=new Array();
var starv=new Array();
var starx=new Array();
var stary=new Array();
var tinyx=new Array();
var tinyy=new Array();
var tinyv=new Array();

window.onload=function() { if (document.getElementById) {
  var i, rats, rlef, rdow;
  for (var i=0; i<sparkles; i++) {
    var rats=createDiv(3, 3);
    rats.style.visibility="hidden";
    rats.style.zIndex="999";
    document.body.appendChild(tiny[i]=rats);
    starv[i]=0;
    tinyv[i]=0;
    var rats=createDiv(5, 5);
    rats.style.backgroundColor="transparent";
    rats.style.visibility="hidden";
    rats.style.zIndex="999";
    var rlef=createDiv(1, 5);
    var rdow=createDiv(5, 1);
    rats.appendChild(rlef);
    rats.appendChild(rdow);
    rlef.style.top="2px";
    rlef.style.left="0px";
    rdow.style.top="0px";
    rdow.style.left="2px";
    document.body.appendChild(star[i]=rats);
  }
  set_width();
  sparkle();
}}

function sparkle() {
  var c;
  if (Math.abs(x-ox)>1 || Math.abs(y-oy)>1) {
    ox=x;
    oy=y;
    for (c=0; c<sparkles; c++) if (!starv[c]) {
      star[c].style.left=(starx[c]=x)+"px";
      star[c].style.top=(stary[c]=y+1)+"px";
      star[c].style.clip="rect(0px, 5px, 5px, 0px)";
      star[c].childNodes[0].style.backgroundColor=star[c].childNodes[1].style.backgroundColor=(colour=="random")?newColour():colour;
      star[c].style.visibility="visible";
      starv[c]=50;
      break;
    }
  }
  for (c=0; c<sparkles; c++) {
    if (starv[c]) update_star(c);
    if (tinyv[c]) update_tiny(c);
  }
  setTimeout("sparkle()", 40);
}

function update_star(i) {
  if (--starv[i]==25) star[i].style.clip="rect(1px, 4px, 4px, 1px)";
  if (starv[i]) {
    stary[i]+=1+Math.random()*3;
    starx[i]+=(i%5-2)/5;
    if (stary[i]<shigh+sdown) {
      star[i].style.top=stary[i]+"px";
      star[i].style.left=starx[i]+"px";
    }
    else {
      star[i].style.visibility="hidden";
      starv[i]=0;
      return;
    }
  }
  else {
    tinyv[i]=50;
    tiny[i].style.top=(tinyy[i]=stary[i])+"px";
    tiny[i].style.left=(tinyx[i]=starx[i])+"px";
    tiny[i].style.width="2px";
    tiny[i].style.height="2px";
    tiny[i].style.backgroundColor=star[i].childNodes[0].style.backgroundColor;
    star[i].style.visibility="hidden";
    tiny[i].style.visibility="visible"
  }
}

function update_tiny(i) {
  if (--tinyv[i]==25) {
    tiny[i].style.width="1px";
    tiny[i].style.height="1px";
  }
  if (tinyv[i]) {
    tinyy[i]+=1+Math.random()*3;
    tinyx[i]+=(i%5-2)/5;
    if (tinyy[i]<shigh+sdown) {
      tiny[i].style.top=tinyy[i]+"px";
      tiny[i].style.left=tinyx[i]+"px";
    }
    else {
      tiny[i].style.visibility="hidden";
      tinyv[i]=0;
      return;
    }
  }
  else tiny[i].style.visibility="hidden";
}

document.onmousemove=mouse;
function mouse(e) {
  if (e) {
    y=e.pageY;
    x=e.pageX;
  }
  else {
    set_scroll();
    y=event.y+sdown;
    x=event.x+sleft;
  }
}

window.onscroll=set_scroll;
function set_scroll() {
  if (typeof(self.pageYOffset)=='number') {
    sdown=self.pageYOffset;
    sleft=self.pageXOffset;
  }
  else if (document.body && (document.body.scrollTop || document.body.scrollLeft)) {
    sdown=document.body.scrollTop;
    sleft=document.body.scrollLeft;
  }
  else if (document.documentElement && (document.documentElement.scrollTop || document.documentElement.scrollLeft)) {
    sleft=document.documentElement.scrollLeft;
    sdown=document.documentElement.scrollTop;
  }
  else {
    sdown=0;
    sleft=0;
  }
}

window.onresize=set_width;
function set_width() {
  var sw_min=999999;
  var sh_min=999999;
  if (document.documentElement && document.documentElement.clientWidth) {
    if (document.documentElement.clientWidth>0) sw_min=document.documentElement.clientWidth;
    if (document.documentElement.clientHeight>0) sh_min=document.documentElement.clientHeight;
  }
  if (typeof(self.innerWidth)=='number' && self.innerWidth) {
    if (self.innerWidth>0 && self.innerWidth<sw_min) sw_min=self.innerWidth;
    if (self.innerHeight>0 && self.innerHeight<sh_min) sh_min=self.innerHeight;
  }
  if (document.body.clientWidth) {
    if (document.body.clientWidth>0 && document.body.clientWidth<sw_min) sw_min=document.body.clientWidth;
    if (document.body.clientHeight>0 && document.body.clientHeight<sh_min) sh_min=document.body.clientHeight;
  }
  if (sw_min==999999 || sh_min==999999) {
    sw_min=800;
    sh_min=600;
  }
  swide=sw_min;
  shigh=sh_min;
}

function createDiv(height, width) {
  var div=document.createElement("div");
  div.style.position="absolute";
  div.style.height=height+"px";
  div.style.width=width+"px";
  div.style.overflow="hidden";
  return (div);
}

function newColour() {
  var c=new Array();
  c[0]=255;
  c[1]=Math.floor(Math.random()*256);
  c[2]=Math.floor(Math.random()*(256-c[1]/2));
  c.sort(function(){return (0.5 - Math.random());});
  return ("rgb("+c[0]+", "+c[1]+", "+c[2]+")");
}
