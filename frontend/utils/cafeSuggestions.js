const MAX_SUGGESTIONS = 6;
// Cafes further than this from the searched location get no credit for being nearby
const NEARBY_RADIUS_KM = 30;

// Number of single-character edits needed to turn one string into the other
function editDistance(a, b) {
  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const substitution = previous[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1);
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, substitution);
    }
    previous = current;
  }
  return previous[b.length];
}

function distanceKm(from, to) {
  const toRadians = (degrees) => (degrees * Math.PI) / 180;
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(from.lat)) * Math.cos(toRadians(to.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * 6371 * Math.asin(Math.sqrt(h));
}

// Works out which of the cafes' locations the user meant, allowing for typos
// e.g. "winchster" -> "Winchester"
export function resolveLocation(search, cafes) {
  const query = search.toLowerCase().trim();
  const locations = [...new Set(cafes.flatMap((cafe) => cafe.locations))];

  const partial = locations.filter((loc) => loc.toLowerCase().includes(query));
  if (partial.length > 0) return { locations: partial, corrected: false };

  const maxEdits = Math.max(1, Math.floor(query.length / 4));
  let closest = null;
  let closestDistance = Infinity;
  for (const loc of locations) {
    const distance = editDistance(query, loc.toLowerCase());
    if (distance < closestDistance) {
      closest = loc;
      closestDistance = distance;
    }
  }
  return closestDistance <= maxEdits
    ? { locations: [closest], corrected: true }
    : { locations: [], corrected: false };
}

function averageRating(cafe) {
  const ratings = (cafe.reviews || []).map((review) => review.rating).filter(Boolean);
  return ratings.length ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length : 0;
}

// Highest rated cafes first, for when nothing about the search matches
function recommendedCafes(cafes) {
  return [...cafes]
    .sort(
      (a, b) =>
        averageRating(b) - averageRating(a) ||
        (b.reviews?.length || 0) - (a.reviews?.length || 0) ||
        a.name.localeCompare(b.name)
    )
    .slice(0, MAX_SUGGESTIONS);
}

// Picks cafes to suggest when no cafe matches every filter. Each cafe is scored by how much of
// the search it satisfies; if nothing scores at all we fall back to recommended cafes.
export function suggestCafes(cafes, filters) {
  const name = filters.name?.toLowerCase().trim();
  const amenities = filters.amenities || [];
  const location = filters.location?.trim()
    ? resolveLocation(filters.location, cafes)
    : null;

  // Middle of the cafes in the searched location, to measure how near other cafes are
  const locationCafes = location
    ? cafes.filter((cafe) => cafe.locations.some((loc) => location.locations.includes(loc)))
    : [];
  const anchor = locationCafes.length > 0 && {
    lat: locationCafes.reduce((sum, cafe) => sum + cafe.lat, 0) / locationCafes.length,
    lng: locationCafes.reduce((sum, cafe) => sum + cafe.lng, 0) / locationCafes.length,
  };

  const locationScore = (cafe) => {
    if (locationCafes.includes(cafe)) return 1;
    if (cafe.lat == null || cafe.lng == null) return 0;
    return Math.max(0, 1 - distanceKm(anchor, cafe) / NEARBY_RADIUS_KM);
  };

  const scoreCafe = (cafe) => {
    let score = 0;

    if (name) {
      const cafeName = cafe.name.toLowerCase();
      if (cafeName.includes(name)) {
        score += 1;
      } else {
        // Partial credit when some words of the search appear in the name
        const words = name.split(/\s+/).filter((word) => word.length > 2);
        if (words.some((word) => cafeName.includes(word))) score += 0.5;
      }
    }

    if (anchor) {
      const nearby = locationScore(cafe);
      // Cafes too far from the searched location aren't close matches, whatever else they have
      if (nearby === 0) return 0;
      score += nearby;
    }

    if (amenities.length > 0) {
      const matched = amenities.filter((amenity) =>
        cafe.icons.some((icon) => icon.type === amenity)
      ).length;
      score += matched / amenities.length;
    }

    return score;
  };

  const closeMatches = cafes
    .map((cafe) => ({ cafe, score: scoreCafe(cafe) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.cafe.name.localeCompare(b.cafe.name))
    .slice(0, MAX_SUGGESTIONS)
    .map(({ cafe }) => cafe);

  if (closeMatches.length > 0) {
    const place = location?.locations[0];
    return {
      message: location?.corrected
        ? `We couldn't find "${filters.location.trim()}", so we've searched for ${place} instead.`
        : "We couldn't find any cafes that matched all of your filters.",
      heading: anchor ? `Here are some close matches near ${place}` : "Here are some close matches",
      cafes: closeMatches,
    };
  }

  return {
    message: "We couldn't find any cafes that matched your search.",
    heading: "Here are some of our recommended cafes",
    cafes: recommendedCafes(cafes),
  };
}
