"use client";
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const hiddenClasses = {
  up: "opacity-0 translate-y-10",
  left: "opacity-0 -translate-x-12",
  right: "opacity-0 translate-x-12",
  zoom: "opacity-0 scale-95",
};

// Fades and slides its children into place the first time they scroll into view
function Reveal({ children, direction = "up", delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:transform-none ${
        visible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : hiddenClasses[direction]
      } ${className}`}
    >
      {children}
    </div>
  );
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["up", "left", "right", "zoom"]),
  delay: PropTypes.number,
  className: PropTypes.string,
};

export default Reveal;
