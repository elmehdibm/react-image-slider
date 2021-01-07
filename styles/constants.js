export let MapClasseNames = {};

export const initiateMapClassNames = (id) => {
    MapClasseNames = {

        slidesContainer: "emui_slides_container_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        slideContainer: "emui_slide_container_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        slide: "emui_slide_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        next: "emui_next_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        nextContainer: "emui_next_container_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        prev: "emui_prev_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        prevContainer: "emui_prev_container_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        dotsContainer: "emui_dots_container_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        dot: "emui_dot_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        activeDot: "emui_activeDot_" + Math.floor(Math.random().toFixed(2) * 1000) + id,

        inactiveDot: "emui_inactiveDot_" + Math.floor(Math.random().toFixed(2) * 1000) + id,


    };
};
