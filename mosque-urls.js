// Base mosque URLs and slugs for scraping
// This is used by the scraper to generate the consolidated mosque-index.json
const mosqueUrls = [
  {
    slug: "al-hira-centre",
    url: "https://www.inspirefm.org/view-prayer-timings/al-hira-centre?refkey=H69pKMxtH1Kztwe",
  },
  {
    slug: "jalalabad-jamia-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/jalalabad-jamia-masjid?refkey=sUwxYOInm6JyotH",
  },
  {
    slug: "al-jalal-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/al-jalal-masjid?refkey=j8PEK3D8ML97xM3",
  },
  {
    slug: "bait-ul-abrar-jamia-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/bait-ul-abrar-jamia-masjid?refkey=dkuKAhYnSNXGvqn",
  },
  {
    slug: "bury-park-jamia-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/bury-park-jamia-masjid?refkey=G81ehjaJ7fP5ih6",
  },
  {
    slug: "faizan-e-mushkil-kusha",
    url: "https://www.inspirefm.org/view-prayer-timings/faizan-e-mushkil-kusha?refkey=vCoQLkUuXU5yO09",
  },
  {
    slug: "hockwell-ring-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/hockwell-ring-masjid?refkey=5ykxLZeGUjOoh8U",
  },
  {
    slug: "farley-hill-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/farley-hill-masjid?refkey=8H5VvyjFIruMyiw",
  },
  {
    slug: "jamia-islamia-ghousia-trust",
    url: "https://www.inspirefm.org/view-prayer-timings/jamia-islamia-ghousia-trust?refkey=SMnmK9CWUuPdaze",
  },
  {
    slug: "jamia-al-akbaria",
    url: "https://www.inspirefm.org/view-prayer-timings/jamia-al-akbaria?refkey=z9aSnU7xoneCiCW",
  },
  {
    slug: "leagrave-hall-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/leagrave-hall-masjid?refkey=NoEtlOSFgfnWqKe",
  },
  {
    slug: "lewsey-community-centre",
    url: "https://www.inspirefm.org/view-prayer-timings/lewsey-community-centre?refkey=Rwc3aJBphwlkNbd",
  },
  {
    slug: "madinah-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/madinah-masjid?refkey=Mg7JBd0Ntm3EX3f",
  },
  {
    slug: "luton-central-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/luton-central-masjid?refkey=W9DeMtrs5IOnSKe",
  },
  {
    slug: "kokni-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/kokni-masjid?refkey=e31KjldaiV1piny",
  },
  {
    slug: "masjid-al-huda",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-al-huda?refkey=Zca8cRxIOQBAucL",
  },
  {
    slug: "masjid-as-sunnah",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-as-sunnah?refkey=4k5QdbC1Z1DVB9e",
  },
  {
    slug: "masjid-bilal",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-bilal?refkey=FQEhRGD3UvmSZPw",
  },
  {
    slug: "masjid-irshad",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-irshad?refkey=CjpkjmLW4S6vaTj",
  },
  {
    slug: "masjid-suffa-tul-islam",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-suffa-tul-islam?refkey=wXzyqvR4jtutql3",
  },
  {
    slug: "masjid-e-ali",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-e-ali?refkey=1YUVYu1jnwl6Ugr",
  },
  {
    slug: "masjid-e-noor",
    url: "https://www.inspirefm.org/view-prayer-timings/masjid-e-noor?refkey=jmwgz9T4vEaeLPq",
  },
  {
    slug: "saints-area-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/saints-area-masjid?refkey=HnualvqjTQSsQni",
  },
  {
    slug: "yusuf-hall",
    url: "https://www.inspirefm.org/view-prayer-timings/yusuf-hall?refkey=4oT6kawaV6OA9oj",
  },
  {
    slug: "turkish-community-assoc",
    url: "https://www.inspirefm.org/view-prayer-timings/turkish-community-assoc?refkey=NWLVMpvbQxaPYIs",
  },
  {
    slug: "zakariya-masjid",
    url: "https://www.inspirefm.org/view-prayer-timings/zakariya-masjid?refkey=6NHPZpjAgFaicdr",
  },
  {
    slug: "zuhri-academy",
    url: "https://www.inspirefm.org/view-prayer-timings/zuhri-academy?refkey=isRqMqaSStYbjcp",
  },
  {
    slug: "luton-islamic-centre",
    url: "https://www.inspirefm.org/view-prayer-timings/luton-islamic-centre?refkey=OWCIb9HCIwj74jN",
  },
];

module.exports = {
  mosqueUrls,
};
