window.KAMONDON_DATA = {
  packages: [
    {
      id: "maasai-mara",
      title: "3 Days Maasai Mara Safari",
      duration: "3 days / 2 nights",
      location: "Maasai Mara",
      summary: "Full-board accommodation, game drives, flexible transport, and a choice of selected Maasai Mara camps.",
      image: "assets/images/Images-K/Hotels/Enkorok-mara-camp-hotel-4a.webp",
      imageAlt: "Guest area at Enkorok Mara Camp in Maasai Mara",
      tags: ["Family", "Big Five"],
      priceLabel: "From $550",
      inclusions: ["Meals on full board", "Game drive", "Hotel facility access", "Two nights’ accommodation"],
      exclusions: ["Tips", "Parking"],
      accommodationOptions: ["Enchoro Wild Camp", "Flair Camp", "Mara Ndovu Lodge", "Enkorok Mara Camp", "Marandini Camp"],
      transportOptions: ["Land Cruiser", "Tour Van"],
      detailHref: "package-detail.html",
      detailLabel: "View full package"
    },
    {
      id: "nairobi-circuit",
      title: "Nairobi Circuit Day Trip",
      duration: "Day trip",
      location: "Nairobi",
      summary: "Visit Nairobi’s wildlife attractions and city recreation sites in one flexible day itinerary.",
      image: "assets/images/Images-K/Nairobi Circuit/giraffe-center-1a.jpg",
      imageAlt: "Visitors feeding giraffes at the Giraffe Centre in Nairobi",
      tags: ["Day Trip", "Nairobi"],
      priceLabel: "Request USD quote",
      stops: ["Animal Orphanage", "Nairobi Safari Walk", "Giraffe Centre", "Uhuru Park"],
      exclusions: ["Tips", "Park entry"],
      detailHref: "packages.html#nairobi-circuit",
      detailLabel: "View itinerary"
    }
  ],
  gallery: [
    ["enchoro-camp", "assets/images/Images-K/Hotels/Enchoro-Hotel-campsite- Hotel-1a.jpg", "Tent accommodation at Enchoro Camp in Maasai Mara", "Enchoro Camp", "Hotels & Camps"],
    ["enchoro-tent", "assets/images/Images-K/Hotels/Enchoro-Hotel-superior-double-tent - Hotel-1b.jpg", "Superior double tent at Enchoro Camp", "Enchoro superior tent", "Hotels & Camps"],
    ["flair", "assets/images/Images-K/Hotels/Flair-Camp-Hotel-2.jpg", "Accommodation at Flair Camp in Maasai Mara", "Flair Camp", "Hotels & Camps"],
    ["ndovu", "assets/images/Images-K/Hotels/MaraNdovu-Lodge-Hotel-3.jpg", "Guest accommodation at Mara Ndovu Lodge", "Mara Ndovu Lodge", "Hotels & Camps"],
    ["enkorok-a", "assets/images/Images-K/Hotels/Enkorok-mara-camp-hotel-4a.webp", "Guest area at Enkorok Mara Camp", "Enkorok Mara Camp", "Hotels & Camps"],
    ["enkorok-b", "assets/images/Images-K/Hotels/Enkorok-Mara-Camp-hotel-4b.jpeg", "Tented accommodation at Enkorok Mara Camp", "Enkorok tented stay", "Hotels & Camps"],
    ["giraffe-a", "assets/images/Images-K/Nairobi Circuit/giraffe-center-1a.jpg", "Visitors feeding giraffes at the Giraffe Centre in Nairobi", "Giraffe Centre", "Nairobi Circuit"],
    ["giraffe-b", "assets/images/Images-K/Nairobi Circuit/giraffe-center-1b.jpg", "Giraffe at the Giraffe Centre in Nairobi", "Giraffe Centre wildlife", "Wildlife"],
    ["orphanage-a", "assets/images/Images-K/Nairobi Circuit/Nairobi-Ophanage-1a.jpg", "Wildlife at Nairobi Animal Orphanage", "Animal Orphanage", "Wildlife"],
    ["orphanage-b", "assets/images/Images-K/Nairobi Circuit/Nairobi-Ophanage-1b.jpg", "Animal viewing area at Nairobi Animal Orphanage", "Nairobi Animal Orphanage", "Nairobi Circuit"],
    ["walk-a", "assets/images/Images-K/Nairobi Circuit/Nairobi-safari-walk-2a.jpg", "Nairobi Safari Walk viewing area", "Nairobi Safari Walk", "Nairobi Circuit"],
    ["walk-b", "assets/images/Images-K/Nairobi Circuit/Nairobi-Safari-Walk-2b.jpg", "Raised walkway at Nairobi Safari Walk", "Safari Walk", "Nairobi Circuit"],
    ["uhuru-a", "assets/images/Images-K/Nairobi Circuit/uhuru-park-1a.jpg", "Uhuru Park and Nairobi skyline", "Uhuru Park", "City Experiences"],
    ["uhuru-b", "assets/images/Images-K/Nairobi Circuit/uhuru-park-1b.jpg", "Landscaped recreation area at Uhuru Park", "Uhuru Park recreation", "City Experiences"]
  ].map(([id, src, alt, caption, category]) => ({ id, src, alt, caption, category }))
};
