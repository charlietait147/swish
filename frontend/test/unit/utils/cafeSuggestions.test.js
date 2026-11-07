import { resolveLocation, suggestCafes } from "../../../utils/cafeSuggestions.js";

const cafe = (overrides) => ({
  _id: overrides.name,
  locations: [],
  image: "image.jpg",
  icons: [],
  reviews: [],
  ...overrides,
});

const cafes = [
  cafe({ _id: "1", name: "Winchester Cafe", locations: ["Winchester", "Hampshire"], lat: 51.062, lng: -1.318, icons: [{ type: "Dog Friendly" }] }),
  cafe({ _id: "2", name: "Alresford Cafe", locations: ["Alresford", "Hampshire"], lat: 51.09, lng: -1.162, icons: [{ type: "Onsite Parking" }], reviews: [{ rating: 5 }] }),
  cafe({ _id: "3", name: "Cobham Cafe", locations: ["Cobham", "Surrey"], lat: 51.33, lng: -0.41, icons: [{ type: "Onsite Parking" }], reviews: [{ rating: 3 }] }),
];

describe("resolveLocation", () => {
  it("matches part of a location name", () => {
    expect(resolveLocation("winch", cafes)).toEqual({ locations: ["Winchester"], corrected: false });
  });

  it("corrects small typos to the nearest known location", () => {
    expect(resolveLocation("Winchster", cafes)).toEqual({ locations: ["Winchester"], corrected: true });
  });

  it("returns no locations when nothing is close", () => {
    expect(resolveLocation("Edinburgh", cafes).locations).toEqual([]);
  });
});

describe("suggestCafes", () => {
  it("suggests the nearest cafes with the wanted amenity when none in the location have it", () => {
    const result = suggestCafes(cafes, { name: "", location: "Winchester", amenities: ["Onsite Parking"] });

    expect(result.heading).toBe("Here are some close matches near Winchester");
    // Alresford is nearby and has parking; Cobham has parking but is too far away to suggest
    expect(result.cafes.map((c) => c.name)).toEqual(["Alresford Cafe", "Winchester Cafe"]);
  });

  it("explains when a misspelt location has been corrected", () => {
    const result = suggestCafes(cafes, { name: "", location: "Winchster", amenities: ["Hot Food Available"] });

    expect(result.message).toBe(`We couldn't find "Winchster", so we've searched for Winchester instead.`);
    expect(result.cafes[0].name).toBe("Winchester Cafe");
  });

  it("falls back to the highest rated cafes when nothing about the search matches", () => {
    const result = suggestCafes(cafes, { name: "Zzz", location: "Edinburgh", amenities: [] });

    expect(result.heading).toBe("Here are some of our recommended cafes");
    expect(result.cafes.map((c) => c.name)).toEqual(["Alresford Cafe", "Cobham Cafe", "Winchester Cafe"]);
  });
});
