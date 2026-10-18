"use client";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import CafeFilters from "./CafeFilters";

const DESKTOP_QUERY = "(min-width: 1024px)";

// Orange band that continues on from the navbar. On desktop, once the full filters panel has
// scrolled out of view, it pins a shorter bar to the top that expands into the full panel on click.
// Once expanded, it stays open until the user scrolls back up to the full panel.
// On mobile the band is white and only the search row is sticky, picking up a bottom border
// once it sticks to the top. The heading above it scrolls away with the page.
function DiscoverFiltersBar(props) {
  const sectionRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [sectionHeight, setSectionHeight] = useState(null);
  const [viewportOffset, setViewportOffset] = useState(0);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);
    updateIsDesktop();
    mediaQuery.addEventListener("change", updateIsDesktop);
    return () => mediaQuery.removeEventListener("change", updateIsDesktop);
  }, []);

  // Hold the band's full height while its contents are pinned, so the page doesn't jump up
  useEffect(() => {
    if (!isDesktop || isPinned) return;
    const measure = () => setSectionHeight(sectionRef.current.offsetHeight);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [isDesktop, isPinned]);

  useEffect(() => {
    setIsPinned(false);
    setIsExpanded(false);
    setIsStuck(false);

    const handleScroll = () => {
      const rect = sectionRef.current.getBoundingClientRect();
      if (!isDesktop) {
        setIsStuck(window.scrollY > 0 && rect.top <= 0);
        return;
      }
      const pinned = rect.bottom <= 0;
      setIsPinned(pinned);
      if (!pinned) setIsExpanded(false);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDesktop]);

  // When the mobile keyboard opens, iOS pans the visible area down without moving sticky elements,
  // which pushes the search row off the top. Follow the visible area so it stays on screen.
  useEffect(() => {
    if (isDesktop || !window.visualViewport) {
      setViewportOffset(0);
      return;
    }
    const viewport = window.visualViewport;
    const updateOffset = () => setViewportOffset(Math.max(0, viewport.offsetTop));
    updateOffset();
    viewport.addEventListener("resize", updateOffset);
    viewport.addEventListener("scroll", updateOffset);
    return () => {
      viewport.removeEventListener("resize", updateOffset);
      viewport.removeEventListener("scroll", updateOffset);
    };
  }, [isDesktop]);

  const sectionStyle = isDesktop
    ? sectionHeight && { minHeight: sectionHeight }
    : viewportOffset && { top: viewportOffset };

  return (
    <>
    <h1 className="lg:hidden bg-white pt-4 text-xl font-semibold text-orange-500 tracking-wide text-center">
      Find your fix...
    </h1>
    <section
      ref={sectionRef}
      style={sectionStyle || undefined}
      className={`sticky top-0 z-10 pt-3 pb-4 bg-white border-b transition-colors duration-300 lg:static lg:pt-0 lg:pb-3 lg:bg-orange-500 lg:border-b-0 ${
        isStuck ? "border-gray-200" : "border-transparent"
      }`}
    >
      <div
        className={
          isPinned
            ? "fixed inset-x-0 top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 shadow-md animate-slide-down"
            : ""
        }
      >
        <div className="max-width mx-auto px-4 md:px-24 lg:px-4">
          <CafeFilters
            {...props}
            collapsed={isPinned && !isExpanded}
            pinned={isPinned}
            onExpand={() => setIsExpanded(true)}
          />
        </div>
      </div>
    </section>
    </>
  );
}

DiscoverFiltersBar.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  setSelectedAmenities: PropTypes.func.isRequired,
  selectedAmenities: PropTypes.arrayOf(PropTypes.string).isRequired,
  setLoading: PropTypes.func,
  locations: PropTypes.arrayOf(PropTypes.string),
};

export default DiscoverFiltersBar;
