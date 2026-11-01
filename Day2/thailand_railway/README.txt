oex export
==========

Generated:        2026-10-14 05:58:08 UTC
oex version:      0.4.16
Project:          https://github.com/osgeonepal/oex

Country (ISO3):   THA
Boundary:         geoBoundaries gbOpen ADM0
Bounding box:     (97.3438, 5.6129, 105.6368, 20.4648)

Dataset:          railways
Format:           ESRI Shapefile (shp)
Features:         6,383

Source:           OpenStreetMap contributors
Source URL:       https://www.openstreetmap.org/
Snapshot:         2026-10-13
License:          Open Database License (ODC-ODbL)
License URL:      https://opendatacommons.org/licenses/odbl/1-0/

About the source
  OpenStreetMap is a community-edited geographic dataset of the world. Country
  features are extracted from the source PBF via quackosm with the union of
  all category tag filters; per-category exports apply tag predicates at query
  time.

Notes
  - Shapefile output is split by geometry type:
    <category>_polygons.shp, <category>_lines.shp, <category>_points.shp.
    This is a shapefile-format limitation, not a data limitation.
  - Field names are truncated to 10 characters in shp; gpkg keeps them full.

Feedback:         https://github.com/osgeonepal/oex/issues
Engine: geofabrik