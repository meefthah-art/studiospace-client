import { FiCamera, FiFilm, FiMic, FiMusic, FiFeather } from "react-icons/fi";

export const CATEGORIES = [
  { value: "Photo Studio", label: "Photo Studios", blurb: "Cyc walls, strobes and portrait lofts", icon: FiCamera },
  { value: "Film Stage", label: "Sound Stages", blurb: "Soundproofed stages with lighting grids", icon: FiFilm },
  { value: "Podcast Lounge", label: "Podcast Rooms", blurb: "Treated rooms with broadcast mics", icon: FiMic },
  { value: "Music Suite", label: "Music Suites", blurb: "Vocal booths, monitors and mixing desks", icon: FiMusic },
  { value: "Workshop", label: "Art Workshops", blurb: "Bright rooms for classes and craft", icon: FiFeather },
];

export const FORM_CATEGORIES = CATEGORIES.map((c) => c.value);

export const AMENITIES = [
  "Wi-Fi", "Parking", "Air Conditioning", "Changing Room", "Green Room", "Cyc Wall",
  "Green Screen", "Strobe Lights", "Acoustic Panels", "Power Backup", "Coffee", "Props Room",
];

export const STATUS_STYLES = {
  Pending: "badge-warning",
  Confirmed: "badge-success",
  Completed: "badge-info",
  Cancelled: "badge-error",
};

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=80`;
export const HERO_SLIDES = [
  {
    image: img("photo-1598300042247-d088f8ab3a91"),
    title: "Find the room your next shoot needs",
    text: "Cyc walls, sound stages and loft studios from local hosts, priced per hour and ready to book.",
  },
  {
    image: img("photo-1590602847861-f357a9332bbc"),
    title: "Record clean audio in a room built for it",
    text: "Podcast lounges and music suites with treated walls, real microphones and no setup fees.",
  },
  {
    image: img("photo-1478720568477-152d9b164e26"),
    title: "Earn from your empty studio hours",
    text: "List your space, set your rate and approve bookings when it suits you.",
  },
];
