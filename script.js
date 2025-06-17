function locoGSAP(){
    gsap.registerPlugin(ScrollTrigger);

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


    const locoScroll = new LocomotiveScroll({
        
        el: document.querySelector("#main"),
        smooth: true,
        multiplier: isMobile ? 0.5 : 1, // Reduce scroll speed on mobile
        lerp: isMobile ? 0.1 : 0.05, // Adjust lerp for mobile
        smartphone: {
            smooth: false,
            breakpoint: 767
        },
        tablet: {
            smooth: false,
            breakpoint: 1024
        }
    });

locoScroll.on("scroll", ScrollTrigger.update);



ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, 
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },

  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

function handleResize() {
    setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
    }, 200);
}


window.addEventListener('resize', handleResize);

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        locoScroll.update();
        ScrollTrigger.refresh();
    }, 200);
});
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

if (isMobile) {
    document.querySelector("#main").style.touchAction = "auto";
    document.body.style.overflow = "auto";
}

return locoScroll; // Re
}
locoGSAP();



// loader animations
function loaderAnimation(){
    var tl = gsap.timeline();

    //letters
    tl
    .to(".loader-box .letters h1", {
        delay: 1,
        duration: 0.5,
        transform: "translateY(-100%)",
        stagger: 0.2
    })
    //yellow boxes
    .to(".loader-box", {
        delay: -0.8,
        transform: "translateY(-100%)",
        stagger: 0.2
    })
    .to("#loader", {
        transform: "translateY(-100%)"
    })
}
loaderAnimation();


function headingAnimation(){
    const headingContainer = document.querySelector("#home #heading-container");
    const scrollAnimation = gsap.to(headingContainer, {
        x: "-100%",
        duration: 20,
        ease: "linear",
        repeat: -1, 
        modifiers: {
            x: gsap.utils.unitize(value => parseFloat(value) % 100) 
        }
    });
    headingContainer.addEventListener('mouseenter', () => {

        gsap.to(scrollAnimation, {
            timeScale: 0,
            duration: 0.5,
        });
    });
    headingContainer.addEventListener('mouseleave', () => {

        gsap.to(scrollAnimation, {
            timeScale: 1, 
            duration: 0.5, 
        });
    });
}
headingAnimation();

function startAnimation(){
    const masker = document.querySelector("#start-container #masker");

    const timeline = gsap.timeline({ paused: true });

    timeline.to(masker, {
        scale: 1, 
        duration: 0.5, 
        ease: "power2.out" 
    })

    .to(masker, {
        fontSize: "1.2vw", 
        ease: "power2.out" 
    }, "-=0.2"); 

    document.querySelector("#start-container").addEventListener("mouseenter", () => {
        timeline.play(); 
    });


    document.querySelector("#start-container").addEventListener("mouseleave", () => {
        timeline.reverse(); 
    });
}
startAnimation();


function page2Animations(){
    var tl2 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2",
            start: "top 60%",
            onEnter: () => tl2.restart(), // Restart the timeline when entering
            onLeaveBack: () => tl2.pause(0) // Pause the timeline at the start when leaving
        }
    });
   tl2
    .from("#heading h1 span", {
        duration: 0.5,
        y: 30,
        stagger: 0.1,
    })
      .from("p", {
        duration: 1,
        y: 30,
        stagger: 0.1,
    }, 0);
    gsap.to("#content", {
        y: "-10%",
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2",
            start: "top 10%",
            scrub: 3,
        }
    })
    gsap.to(".box#box1", {
        y: "20%",
        ease: "power1.out",  
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2",
            start: "top 5%",
            end: "bottom center",
            scrub: 3,
        }
    })
    gsap.to(".box#box2", {
        y: "-10%",
        ease: "power1.out",  
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2",
            start: "top 10%",
            end: "bottom center",
            scrub: 2,
        }
    })
    gsap.to(".box#box3", {
        y: "10%",
        ease: "power1.out",  
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page2",
            start: "top 5%",
            end: "bottom center",
            scrub: 2,
        }
    })
}
page2Animations();
  
function page3Animations(){
    gsap.from(".box", {
        scale: 0,
        duration: 1,
        ease: "power1.inOut",
        scrollTrigger: {
            scroller: "#main",
            trigger: ".box",
            start: "top 90%",
            end: "top 30%",
            end: "bottom center",
        }
    })
    
    
    
    var tl4 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page3",
            start: "top 70%",
            end: "top 30%",
            onEnter: () => tl4.restart(), // Restart the timeline when entering
            onLeaveBack: () => tl4.pause() // Pause the timeline at the start when leaving
        }
    });
    tl4
    .from("#page3 #left h1", {
        y: "30%",
        opacity: 0,
    })
    .from("#page3 #right>h3", {
        x: "5%",
        opacity: 0,
    }, 0)
    
    tl4.from("#page3 #right #right-content", {
        y: "20%",
        opacity: 0,
    })
}
page3Animations();


function page4Animations(){
    var tl5 = gsap.timeline({
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page4",
            start: "top 80%",
            end: "bottom 50%",
            onEnter: () => tl5.restart(), // Add this to handle scrolling back up
            onLeave: () => tl5.pause()  // Add this to reset when leaving
        }
    });
    
    tl5
    .from("#page4 #head", {
        y: "30%",
        opacity: 0,
        duration: 0.5
    })
    .from("#page4 #content-left", {
        scale: 0,
        duration: 0.5,
        ease: "power2.out"
    })
    
    // Create a timeline for the boxes
    let boxesTimeline = gsap.timeline();
    
    // Add each box animation to the main timeline
    gsap.utils.toArray("#btm-box").forEach((box, i) => {
        boxesTimeline.from(box, {
            y: 40,
            opacity: 0,
            duration: 0.4,
            delay: i * 0.1 // This creates sequential animation
        }, "<0.1"); // This creates a slight overlap between animations
    });
    
    // Add the boxes timeline to the main timeline
    tl5.add(boxesTimeline);
    
    // Create the scroll trigger for the entire animation
    ScrollTrigger.create({
        scroller: "#main",
        trigger: "#page4",
        start: "top 70%",
        onEnter: () => tl5.restart(),
        onLeave: () => tl5.pause(),
    });
    
    
}
page4Animations();

function heading2Animation(){
    const headingContainer = document.querySelector("#page5 #heading-container");
    const scrollAnimation = gsap.to(headingContainer, {
        x: "-100%",
        duration: 20,
        ease: "linear",
        repeat: -1, 
        modifiers: {
            x: gsap.utils.unitize(value => parseFloat(value) % 100) 
        },
        scrollTrigger: {
            scroller: "#main",
            trigger: "#page5",
            start: "top 60%",
            onEnter: () => scrollAnimation.restart(), // Restart the timeline when entering
            onLeaveBack: () => scrollAnimation.pause(0) // Pause the timeline at the start when leaving	
        }
    });
    headingContainer.addEventListener('mouseenter', () => {
        gsap.to(scrollAnimation, {
            timeScale: 0,
            duration: 0.5,
        });
    });
    headingContainer.addEventListener('mouseleave', () => {

        gsap.to(scrollAnimation, {
            timeScale: 1, 
            duration: 0.5, 
        });
    });
}
heading2Animation();