# Leiden Photo Audit Summary

## Scope

The audit inspected the 21 source images in `public/photos/leiden`. All are tracked JPEG files. No separate Leiden photo-import directory was found under `/Users/chloeclemens/Developer`.

The 21 images in `dist/photos/leiden` were also hash-checked. Every file is an exact generated copy of the same-named source asset, so the build output is documented as a duplicate set rather than counted as a second set of original photographs.

## Results

1. **Total source images inspected:** 21
2. **Images containing GPS coordinates:** 0
3. **Images containing capture dates:** 0
4. **Images with no usable embedded metadata:** 21
5. **Duplicate or near-duplicate source files:** None detected
6. **Files that could not be read:** 0

For this report, “usable embedded metadata” means EXIF, IPTC, or XMP values that identify capture time, GPS position, camera/device, title, description, keywords, or location. File hashes and pixel dimensions were successfully extracted for every image, but they are not counted as descriptive or location metadata.

## Metadata findings

- All 21 source files are readable progressive JPEGs.
- Nineteen images are 1350 × 1800 pixels.
- Two images, `img_1098.jpg` and `img_7271.jpg`, are 1800 × 1350 pixels.
- No EXIF, IPTC, or XMP metadata blocks were detected.
- No GPS latitude or longitude is embedded in the available source files.
- No capture date/time or camera/device model is embedded.
- No embedded title, description, keywords, or location fields are present.

The available files therefore appear to be web-ready exports whose original phone or camera metadata was stripped before they entered this repository. Recovering capture dates or GPS data would require access to earlier original files, such as the unexported HEIC/JPEG files from Photos, iCloud Photos, a phone export, or the original photo-import folder.

## Duplicate analysis

- **Exact duplicates among source assets:** None. Every source SHA-256 hash is unique.
- **Near-duplicates among source assets:** None detected using a 64-bit difference hash threshold of 6 bits. The closest source pairs were still 20 bits apart, which is not a near-duplicate signal.
- **Generated build duplicates:** All 21 files in `dist/photos/leiden` exactly match their corresponding files in `public/photos/leiden` by SHA-256 hash. These are Astro build artifacts, not additional originals.

## Reverse geocoding

Reverse geocoding was not performed because no approved reverse-geocoding service is configured. The photo files also contain no GPS coordinates to submit.

To populate suggested place names and addresses later, the project would need:

1. original images containing GPS coordinates;
2. an approved reverse-geocoding provider;
3. configured credentials and usage limits; and
4. approval to transmit those coordinates to that provider.

The CSV fields `suggestedPlaceName`, `suggestedAddress`, and `confidence` are blank. `reverseGeocodingStatus` is set to `not_requested_no_configured_geocoder` for every image.

## Existing Leiden map pins

The current map derives its pins from recommendation-card attributes in `src/pages/destinations/leiden.astro`.

| Recommendation | Latitude | Longitude | Approximate or placeholder status |
| --- | ---: | ---: | --- |
| Falafel salad stop | 52.1607 | 4.4902 | No explicit coordinate flag. The recommendation copy says the exact business and context still need to be added, so the location is unverified. |
| Coffee break | 52.1593 | 4.4928 | No explicit coordinate flag. The generic recommendation name and copy indicate placeholder content, so the location is unverified. |
| Fresh stroopwafel | 52.1588 | 4.4889 | No explicit coordinate flag. The recommendation remains generic and does not identify a verified vendor, so the location is unverified. |

No coordinates were changed during this audit.
