export const mockParkings = [
  {
    id: 1,
    name: "Parking Cornavin",
    address: "Rue de Lausanne 30, Geneva",
    lat: 46.2085,
    lng: 6.1425,
    totalSpots: 120,
    availableSpots: 45,
    pricePerHour: 3.5,
    evChargers: 4,
    type: "covered",
    zone: "white",
    spotTypes: ["blue", "white"],
    spotSizes: ["large", "medium", "small"],
    hours: "24h",
    rating: 4.2,
    distance: "0.3 km",
    features: ["EV Charging", "24h Security", "CCTV", "Covered"],
    reviews: [
      { id: 1, user: "Marc D.", rating: 5, comment: "Great parking near the station, easy access.", date: "2024-01-15" },
      { id: 2, user: "Sophie L.", rating: 4, comment: "Clean and well lit. EV chargers worked perfectly.", date: "2024-01-10" },
      { id: 3, user: "Thomas B.", rating: 4, comment: "Good price for central Geneva location.", date: "2024-01-05" }
    ]
  },
  {
    id: 2,
    name: "Parking des Alpes",
    address: "Quai des Alpes 1, Geneva",
    lat: 46.2063,
    lng: 6.1478,
    totalSpots: 80,
    availableSpots: 12,
    pricePerHour: 4.0,
    evChargers: 2,
    type: "outdoor",
    zone: "blue",
    spotTypes: ["blue"],
    spotSizes: ["large", "medium"],
    hours: "6h - 22h",
    rating: 3.8,
    distance: "0.5 km",
    features: ["EV Charging", "CCTV"],
    reviews: [
      { id: 1, user: "Anna K.", rating: 4, comment: "Nice view of the lake. Easy to find.", date: "2024-01-12" },
      { id: 2, user: "Pierre M.", rating: 3, comment: "Limited spots, gets full quickly in peak hours.", date: "2024-01-08" }
    ]
  },
  {
    id: 3,
    name: "Parking Plainpalais",
    address: "Place du Cirque 2, Geneva",
    lat: 46.1980,
    lng: 6.1394,
    totalSpots: 200,
    availableSpots: 89,
    pricePerHour: 2.5,
    evChargers: 8,
    type: "underground",
    zone: "white",
    spotTypes: ["white", "blue"],
    spotSizes: ["large", "medium", "small", "motorcycle"],
    hours: "24h",
    rating: 4.5,
    distance: "0.8 km",
    features: ["EV Charging", "24h Security", "CCTV", "Covered", "Disabled Access"],
    reviews: [
      { id: 1, user: "Julie R.", rating: 5, comment: "Best parking in the area. Very clean underground.", date: "2024-01-14" },
      { id: 2, user: "Carlos M.", rating: 4, comment: "Plenty of space. Good EV charging options.", date: "2024-01-09" },
      { id: 3, user: "Emma S.", rating: 5, comment: "Safe and affordable. Always my first choice.", date: "2024-01-03" }
    ]
  },
  {
    id: 4,
    name: "Parking Molard",
    address: "Place du Molard 8, Geneva",
    lat: 46.2022,
    lng: 6.1463,
    totalSpots: 60,
    availableSpots: 0,
    pricePerHour: 5.0,
    evChargers: 0,
    type: "covered",
    zone: "blue",
    spotTypes: ["blue"],
    spotSizes: ["medium", "small"],
    hours: "7h - 21h",
    rating: 3.5,
    distance: "1.1 km",
    features: ["CCTV"],
    reviews: [
      { id: 1, user: "Jean P.", rating: 3, comment: "Central location but always full. Too expensive.", date: "2024-01-11" },
      { id: 2, user: "Marie F.", rating: 4, comment: "Good location for shopping. Easy in and out.", date: "2024-01-07" }
    ]
  },
  {
    id: 5,
    name: "Parking Rive",
    address: "Boulevard Helvétique 5, Geneva",
    lat: 46.2010,
    lng: 6.1520,
    totalSpots: 150,
    availableSpots: 67,
    pricePerHour: 3.0,
    evChargers: 6,
    type: "underground",
    zone: "white",
    spotTypes: ["white"],
    spotSizes: ["large", "medium", "small", "motorcycle"],
    hours: "24h",
    rating: 4.3,
    distance: "1.3 km",
    features: ["EV Charging", "24h Security", "CCTV", "Covered"],
    reviews: [
      { id: 1, user: "Lukas B.", rating: 5, comment: "Excellent facility. Clean and safe at night.", date: "2024-01-13" },
      { id: 2, user: "Isabelle V.", rating: 4, comment: "Good underground parking. EV chargers available.", date: "2024-01-06" }
    ]
  },
  {
    id: 6,
    name: "Parking Nations",
    address: "Avenue de la Paix 12, Geneva",
    lat: 46.2265,
    lng: 6.1415,
    totalSpots: 180,
    availableSpots: 23,
    pricePerHour: 2.0,
    evChargers: 10,
    type: "outdoor",
    zone: "white",
    spotTypes: ["white", "blue"],
    spotSizes: ["large", "medium"],
    hours: "24h",
    rating: 4.0,
    distance: "2.0 km",
    features: ["EV Charging", "CCTV"],
    reviews: [
      { id: 1, user: "David N.", rating: 4, comment: "Great for visiting UN area. Affordable rates.", date: "2024-01-12" }
    ]
  },
  {
    id: 7,
    name: "Parking Champel",
    address: "Route de Malagnou 40, Geneva",
    lat: 46.1951,
    lng: 6.1568,
    totalSpots: 90,
    availableSpots: 34,
    pricePerHour: 2.8,
    evChargers: 3,
    type: "covered",
    zone: "blue",
    spotTypes: ["blue", "white"],
    spotSizes: ["large", "medium", "small"],
    hours: "6h - 23h",
    rating: 3.9,
    distance: "1.8 km",
    features: ["EV Charging", "CCTV", "Covered"],
    reviews: [
      { id: 1, user: "Nathalie C.", rating: 4, comment: "Quiet area, good for visiting Champel.", date: "2024-01-10" },
      { id: 2, user: "Felix A.", rating: 4, comment: "Clean parking with good facilities.", date: "2024-01-04" }
    ]
  },
  {
    id: 8,
    name: "Parking Carouge",
    address: "Rue de Veyrier 5, Carouge",
    lat: 46.1851,
    lng: 6.1415,
    totalSpots: 70,
    availableSpots: 41,
    pricePerHour: 1.5,
    evChargers: 2,
    type: "outdoor",
    zone: "white",
    spotTypes: ["white"],
    spotSizes: ["medium", "small", "motorcycle"],
    hours: "24h",
    rating: 4.1,
    distance: "2.5 km",
    features: ["EV Charging", "CCTV"],
    reviews: [
      { id: 1, user: "Alice M.", rating: 4, comment: "Cheap parking in Carouge. Good for the area.", date: "2024-01-09" },
      { id: 2, user: "Robert T.", rating: 4, comment: "Nice location near the market. Affordable.", date: "2024-01-02" }
    ]
  }
];

export const mockNotifications = [
  { id: 1, title: "Spot Available!", message: "A spot near you just freed up at Parking Cornavin.", time: "2 min ago", read: false, type: "spot" },
  { id: 2, title: "Booking Confirmed", message: "Your booking at Parking Rive has been confirmed.", time: "1 hour ago", read: false, type: "booking" },
  { id: 3, title: "Expiry Warning", message: "Your parking at Parking Molard expires in 15 minutes.", time: "3 hours ago", read: true, type: "warning" },
  { id: 4, title: "Payment Success", message: "CHF 14.00 charged for your session at Parking Plainpalais.", time: "Yesterday", read: true, type: "payment" },
];

export const mockUser = {
  name: "User",
  email: "user@example.com",
  car: {
    model: "SL 250 ML",
    plate: "GE 123 456",
    type: "Sedan"
  }
};
