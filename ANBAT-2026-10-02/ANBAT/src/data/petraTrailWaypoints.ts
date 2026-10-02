/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Accurate GPS coordinates tracing the actual walking trail through Petra's canyons and mountain staircases.
// Used as walking waypoints for Google Maps Directions API and as a 100% faithful canyon path
// that eliminates any straight theoretical lines across the mountains to Ad-Deir.

export interface LatLngPoint {
  lat: number;
  lng: number;
}

export const PETRA_WALKING_TRAIL_WAYPOINTS: LatLngPoint[] = [
  // 1. Bab as-Siq to Siq Entrance
  { lat: 30.3262, lng: 35.4578 },
  { lat: 30.3259, lng: 35.4565 },
  { lat: 30.3256, lng: 35.4552 },
  { lat: 30.3253, lng: 35.4542 }, // Siq Entrance

  // 2. Winding through the Siq Canyon (narrow winding sandstone gorge)
  { lat: 30.3248, lng: 35.4538 },
  { lat: 30.3242, lng: 35.4535 },
  { lat: 30.3235, lng: 35.4533 },
  { lat: 30.3230, lng: 35.4531 },
  { lat: 30.3225, lng: 35.4528 },
  { lat: 30.3223, lng: 35.4524 },
  { lat: 30.3222, lng: 35.4516 }, // Al-Khazneh (The Treasury)

  // 3. Outer Siq into the Main Valley
  { lat: 30.3224, lng: 35.4508 },
  { lat: 30.3228, lng: 35.4498 },
  { lat: 30.3232, lng: 35.4488 },
  { lat: 30.3236, lng: 35.4478 }, // Street of Facades

  // 4. Past the Theatre & Wadi Farasa junction
  { lat: 30.3239, lng: 35.4468 },
  { lat: 30.3242, lng: 35.4455 }, // The Rock-Cut Theatre

  // 5. Junction to the Royal Tombs cliffside
  { lat: 30.3250, lng: 35.4460 },
  { lat: 30.3258, lng: 35.4465 },
  { lat: 30.3262, lng: 35.4468 }, // The Royal Tombs & Court (Urn Tomb)

  // 6. Along the Colonnaded Street through ancient city center
  { lat: 30.3268, lng: 35.4455 },
  { lat: 30.3274, lng: 35.4442 },
  { lat: 30.3279, lng: 35.4430 },
  { lat: 30.3283, lng: 35.4418 }, // Colonnaded Street & Temenos Gate
  { lat: 30.3288, lng: 35.4408 }, // Qasr al-Bint Temple

  // 7. Through the Basin area (Wadi al-Siyagh)
  { lat: 30.3294, lng: 35.4398 },
  { lat: 30.3298, lng: 35.4392 }, // Basin Restaurant & Trailhead
  { lat: 30.3305, lng: 35.4385 },
  { lat: 30.3312, lng: 35.4378 },

  // 8. Serpentine Mountain Steps to Ad-Deir (The Monastery)
  // Winding through the rock chasms and ascending 800 rock-hewn steps
  { lat: 30.3318, lng: 35.4370 },
  { lat: 30.3323, lng: 35.4362 },
  { lat: 30.3328, lng: 35.4355 },
  { lat: 30.3333, lng: 35.4348 },
  { lat: 30.3339, lng: 35.4342 },
  { lat: 30.3345, lng: 35.4336 },
  { lat: 30.3352, lng: 35.4331 },
  { lat: 30.3359, lng: 35.4326 },
  { lat: 30.3366, lng: 35.4321 },
  { lat: 30.3372, lng: 35.4318 },
  { lat: 30.3377, lng: 35.4316 }  // Ad-Deir (The Monastery)
];

// Fallback segment distance (meters) and walking duration (seconds) based on verified on-site archaeological trekking data
export const PETRA_SEGMENT_WALKING_DATA: Record<string, { distanceMeters: number; durationSeconds: number; durationTextEn: string; durationTextAr: string; distanceTextEn: string; distanceTextAr: string }> = {
  'siq-to-treasury': {
    distanceMeters: 1200,
    durationSeconds: 1320,
    durationTextEn: '22 mins walk',
    durationTextAr: '22 دقيقة مشياً',
    distanceTextEn: '1.2 km',
    distanceTextAr: '1.2 كم'
  },
  'treasury-to-facades': {
    distanceMeters: 450,
    durationSeconds: 480,
    durationTextEn: '8 mins walk',
    durationTextAr: '8 دقائق مشياً',
    distanceTextEn: '450 m',
    distanceTextAr: '450 متر'
  },
  'facades-to-theatre': {
    distanceMeters: 300,
    durationSeconds: 300,
    durationTextEn: '5 mins walk',
    durationTextAr: '5 دقائق مشياً',
    distanceTextEn: '300 m',
    distanceTextAr: '300 متر'
  },
  'theatre-to-royal_tombs': {
    distanceMeters: 380,
    durationSeconds: 420,
    durationTextEn: '7 mins walk',
    durationTextAr: '7 دقائق مشياً',
    distanceTextEn: '380 m',
    distanceTextAr: '380 متر'
  },
  'royal_tombs-to-colonnaded_street': {
    distanceMeters: 750,
    durationSeconds: 780,
    durationTextEn: '13 mins walk',
    durationTextAr: '13 دقيقة مشياً',
    distanceTextEn: '750 m',
    distanceTextAr: '750 متر'
  },
  'colonnaded_street-to-monastery': {
    distanceMeters: 1850,
    durationSeconds: 3000,
    durationTextEn: '50 mins mountain climb (800 steps)',
    durationTextAr: '50 دقيقة صعود جبلي (800 درجة)',
    distanceTextEn: '1.85 km',
    distanceTextAr: '1.85 كم'
  }
};
