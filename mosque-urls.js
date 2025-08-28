/**
 * @fileoverview Mosque URL Configuration
 * Contains the list of mosques with their names, slugs, and InspireFM URLs for scraping
 */

/**
 * Array of mosque configurations for scraping prayer times from InspireFM
 * Each mosque object contains the name, URL-friendly slug, and direct link to prayer times
 * @type {Array<{name: string, slug: string, url: string}>}
 */
const mosqueUrls = [
  {
    name: "Al Hira Centre",
    slug: "al-hira-centre",
    url: "https://www.inspirefm.org/view-prayer-timings/al-hira-centre?refkey=H69pKMxtH1Kztwe",
  },
  {
    name: "Jalalabad Jamia Masjid",
    slug: "jalalabad-jamia-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/jalalabad-jamia-masjid?refkey=sUwxYOInm6JyotH",
  },
  {
    name: "Al Jalal Masjid",
    slug: "al-jalal-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/al-jalal-masjid?refkey=j8PEK3D8ML97xM3",
  },
  {
    name: "Bait Ul Abrar Jamia Masjid",
    slug: "bait-ul-abrar-jamia-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/bait-ul-abrar-jamia-masjid?refkey=dkuKAhYnSNXGvqn",
  },
  {
    name: "Bury Park Jamia Masjid",
    slug: "bury-park-jamia-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/bury-park-jamia-masjid?refkey=G81ehjaJ7fP5ih6",
  },
  {
    name: "Faizan-e-Mushkil Kusha",
    slug: "faizan-e-mushkil-kusha",
    url: "https://www.inspirefm.org/view-prayer-timings/faizan-e-mushkil-kusha?refkey=vCoQLkUuXU5yO09",
  },
  {
    name: "Hockwell Ring Masjid",
    slug: "hockwell-ring-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/hockwell-ring-masjid?refkey=5ykxLZeGUjOoh8U",
  },
  {
    name: "Farley Hill Masjid",
    slug: "farley-hill-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/farley-hill-masjid?refkey=8H5VvyjFIruMyiw",
  },
  {
    name: "Jamia Islamia Ghousia Trust",
    slug: "jamia-islamia-ghousia-trust",
    url: "https://www.inspirefm.org/view-prayer-timings/jamia-islamia-ghousia-trust?refkey=SMnmK9CWUuPdaze",
  },
  {
    name: "Jamia Al-Akbaria",
    slug: "jamia-al-akbaria",
    url: "https://www.inspirefm.org/view-prayer-timings/jamia-al-akbaria?refkey=z9aSnU7xoneCiCW",
  },
  {
    name: "Leagrave Hall Masjid",
    slug: "leagrave-hall-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/leagrave-hall-masjid?refkey=NoEtlOSFgfnWqKe",
  },
  {
    name: "Lewsey Community Centre",
    slug: "lewsey-community-centre",
    url: "https://www.inspirefm.org/view-prayer-timings/lewsey-community-centre?refkey=Rwc3aJBphwlkNbd",
  },
  {
    name: "Madinah Masjid",
    slug: "madinah-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/madinah-masjid?refkey=Mg7JBd0Ntm3EX3f",
  },
  {
    name: "Luton Central Masjid",
    slug: "luton-central-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/luton-central-masjid?refkey=W9DeMtrs5IOnSKe",
  },
  {
    name: "Kokni Masjid",
    slug: "kokni-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/kokni-masjid?refkey=e31KjldaiV1piny",
  },
  {
    name: "Masjid Al-Huda",
    slug: "masjid-al-huda",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-al-huda?refkey=Zca8cRxIOQBAucL",
  },
  {
    name: "Masjid As-Sunnah",
    slug: "masjid-as-sunnah",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-as-sunnah?refkey=4k5QdbC1Z1DVB9e",
  },
  {
    name: "Masjid Bilal",
    slug: "masjid-bilal",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-bilal?refkey=FQEhRGD3UvmSZPw",
  },
  {
    name: "Masjid Irshad",
    slug: "masjid-irshad",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-irshad?refkey=CjpkjmLW4S6vaTj",
  },
  {
    name: "Masjid Suffa-Tul-Islam",
    slug: "masjid-suffa-tul-islam",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-suffa-tul-islam?refkey=wXzyqvR4jtutql3",
  },
  {
    name: "Masjid-e-Ali",
    slug: "masjid-e-ali",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-e-ali?refkey=1YUVYu1jnwl6Ugr",
  },
  {
    name: "Masjid-e-Noor",
    slug: "masjid-e-noor",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-e-noor?refkey=jmwgz9T4vEaeLPq",
  },
  {
    name: "Saints Area Masjid",
    slug: "saints-area-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/saints-area-masjid?refkey=HnualvqjTQSsQni",
  },
  {
    name: "Yusuf Hall",
    slug: "yusuf-hall",
    url: "https://www.inspirefm.org/view-prayer-timings/yusuf-hall?refkey=4oT6kawaV6OA9oj",
  },
  {
    name: "Turkish Community Assoc",
    slug: "turkish-community-assoc",
    url: "https://www.inspirefm.org/view-prayer-timings/turkish-community-assoc?refkey=NWLVMpvbQxaPYIs",
  },
  {
    name: "Zakariya Masjid",
    slug: "zakariya-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/zakariya-masjid?refkey=6NHPZpjAgFaicdr",
  },
  {
    name: "Zuhri Academy",
    slug: "zuhri-academy",
    url: "https://www.inspirefm.org/view-prayer-timings/zuhri-academy?refkey=isRqMqaSStYbjcp",
  },
  {
    name: "Luton Islamic Centre",
    slug: "luton-islamic-centre",
    url: "https://www.inspirefm.org/view-prayer-timings/luton-islamic-centre?refkey=OWCIb9HCIwj74jN",
  },
];

module.exports = {
  mosqueUrls,
};
