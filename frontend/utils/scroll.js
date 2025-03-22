export const disableScroll = () => {
    //1. Saves the current vertical scroll position
    const scrollY = window.scrollY;

    //2. Prevents page from moving when the user tries to scroll
    document.body.style.position = "fixed";

    /*3. Moves the body up by the exact amount the user had scrolled. 
    Ensures user doesn't see abrupt jump when scrolling disabled */
    document.body.style.top = `-${scrollY}px`;

    //4. Prevents unwanted layout shifts when position: fixed is applied
    document.body.style.width = "100%";
}

export const enableScroll = () => {
    /*1. The top value was set in disableScroll as a negative number (-scrollY)
    We convert it back to a positive number using Maths.ab() to restore exact scroll position*/
    const scrollY = Math.abs(parseInt(document.body.style.top || "0", 10));

    //2. Reset the body styles, removes position fixed and top so page behaves normally.
    document.body.style.position = "";
    document.body.style.top = "";

    //3. Restores the scroll position, back to where they left off, preventing jumps.
    window.scrollTo(0, scrollY);
}