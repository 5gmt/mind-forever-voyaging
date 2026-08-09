// Generated from the preserved ZIL source by scripts/extract-world.mjs.
// Do not edit by hand; the original game remains canonical.

export type WorldExit = { command: string; targetId: string; target: string };
export type WorldRoom = { id: string; name: string; aliases: string[]; yearNames: Record<string, string>; globals: string[]; exits: Record<string, WorldExit> };

export type WorldObject = { id: string; name: string; initialLocation: string | null; dynamicLocations: string[]; movesToCurrentRoom: boolean; relatedObjectIds: string[]; removedObjectIds: string[]; flags: string[]; synonyms: string[]; adjectives: string[]; commandNoun: string | null; action: string | null; handledVerbs: string[]; verbGroups: string[][]; actionRooms: string[]; globalVerbs: string[]; guaranteedVerbs: string[]; refusalOnlyVerbs: string[]; verbRooms: Record<string, string[]>; hasText: boolean };

export const WORLD_ROOMS: WorldRoom[] = [
  {
    "id": "CONTROL-CENTER",
    "name": "PRISM Project Control Center",
    "aliases": [
      "PRISM Project Control Center"
    ],
    "yearNames": {},
    "globals": [
      "CONVERSATION",
      "GUN",
      "OUTLETS",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "PARK-ENTRANCE",
    "name": "Entrance to Halley Estates",
    "aliases": [
      "Entrance to Halley Estates",
      "Park Entrance"
    ],
    "yearNames": {
      "2041": "Park Entrance",
      "2051": "Park Entrance",
      "2061": "Park Entrance",
      "2071": "Entrance to Halley Estates",
      "2081": "Park Entrance",
      "2091": "Park Entrance"
    },
    "globals": [
      "PARK-OBJECT",
      "CARLOT",
      "GATE",
      "HALLEY-ESTATES-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "SKYCAR-LOT-5",
        "target": "Skycar Lot"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "WEST": {
        "command": "west",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      },
      "IN": {
        "command": "in",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      }
    }
  },
  {
    "id": "CHURCH-STREET-APARTMENTS",
    "name": "Church Street Apartments",
    "aliases": [
      "Church Street Apartments"
    ],
    "yearNames": {},
    "globals": [
      "UNOPENABLE-DOOR",
      "MAILBOXES",
      "PICTUREPHONE",
      "GRAFFITI",
      "GLASS"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      },
      "NW": {
        "command": "nw",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      },
      "IN": {
        "command": "in",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      },
      "SE": {
        "command": "se",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      }
    }
  },
  {
    "id": "PARKVIEW-HALL",
    "name": "Hall Near Your Apartment",
    "aliases": [
      "Hall Near Your Apartment"
    ],
    "yearNames": {},
    "globals": [
      "APARTMENT-DOOR",
      "APARTMENT-OBJECT",
      "STAIRS",
      "HALLWAY",
      "LIVING-ROOM-OBJECT",
      "PARKVIEW-APARTMENTS-OBJECT"
    ],
    "exits": {
      "IN": {
        "command": "in",
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      },
      "NORTH": {
        "command": "north",
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      },
      "EAST": {
        "command": "east",
        "targetId": "PARKVIEW-APARTMENTS",
        "target": "Parkview Apartments"
      },
      "OUT": {
        "command": "out",
        "targetId": "PARKVIEW-APARTMENTS",
        "target": "Parkview Apartments"
      },
      "DOWN": {
        "command": "down",
        "targetId": "PARKVIEW-APARTMENTS",
        "target": "Parkview Apartments"
      }
    }
  },
  {
    "id": "INDUSTRIAL-PARK-ENTRANCE",
    "name": "Industrial Park Entrance",
    "aliases": [
      "Industrial Park Entrance"
    ],
    "yearNames": {},
    "globals": [
      "INDUSTRIAL-PARK-OBJECT",
      "WAREHOUSE-OBJECT",
      "TENEMENT-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "WAREHOUSE-2",
        "target": "Warehouse"
      },
      "NE": {
        "command": "ne",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "TENEMENT-1",
        "target": "Tenement"
      },
      "SW": {
        "command": "sw",
        "targetId": "DUMP-ENTRANCE",
        "target": "Dump Entrance"
      },
      "NW": {
        "command": "nw",
        "targetId": "INDUSTRIAL-PARK-DRIVE",
        "target": "Industrial Park Drive"
      },
      "IN": {
        "command": "in",
        "targetId": "INDUSTRIAL-PARK-DRIVE",
        "target": "Industrial Park Drive"
      }
    }
  },
  {
    "id": "CAFETERIA",
    "name": "PRISM Facility Cafeteria",
    "aliases": [
      "PRISM Facility Cafeteria"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-WINDOW",
      "GLOBAL-TABLE",
      "OUTLETS",
      "FLOODLIGHT",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "ROOFTOP",
    "name": "Research Center Rooftop",
    "aliases": [
      "Research Center Rooftop"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "STAIRS",
      "OUTLETS",
      "FLOODLIGHT"
    ],
    "exits": {}
  },
  {
    "id": "NEWS",
    "name": "World News Network Feed",
    "aliases": [
      "World News Network Feed"
    ],
    "yearNames": {},
    "globals": [
      "OUTLETS"
    ],
    "exits": {}
  },
  {
    "id": "POWER-STATION-ENTRANCE",
    "name": "Power Station Entrance",
    "aliases": [
      "Power Station Entrance"
    ],
    "yearNames": {},
    "globals": [
      "POWER-STATION-OBJECT",
      "WATER",
      "RIVER",
      "RIVER-BANK",
      "STREET-BRIDGE",
      "FACTORY-OBJECT",
      "TENEMENT-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "SKYCAR-FACTORY",
        "target": "Skycar Factory"
      },
      "SE": {
        "command": "se",
        "targetId": "RIVER-STREET-BRIDGE",
        "target": "River Street Bridge"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "POWER-STATION",
        "target": "Power Station"
      },
      "SW": {
        "command": "sw",
        "targetId": "TENEMENT-1",
        "target": "Tenement"
      },
      "WEST": {
        "command": "west",
        "targetId": "TENEMENT-1",
        "target": "Tenement"
      },
      "NW": {
        "command": "nw",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "IN": {
        "command": "in",
        "targetId": "POWER-STATION",
        "target": "Power Station"
      }
    }
  },
  {
    "id": "OFFICE",
    "name": "Dr. Perelman's Office",
    "aliases": [
      "Dr. Perelman's Office"
    ],
    "yearNames": {},
    "globals": [
      "SHELVES",
      "OUTLETS",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "INDUSTRIAL-PARK-DRIVE",
    "name": "Industrial Park Drive",
    "aliases": [
      "Industrial Park Drive"
    ],
    "yearNames": {},
    "globals": [
      "UNOPENABLE-DOOR",
      "INDUSTRIAL-PARK-OBJECT",
      "FACTORY-OBJECT",
      "WAREHOUSE-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      }
    }
  },
  {
    "id": "CHURCH-ENTRANCE",
    "name": "Street by Vacant Lot",
    "aliases": [
      "Street by Vacant Lot",
      "Church Entrance"
    ],
    "yearNames": {
      "2041": "Church Entrance",
      "2051": "Church Entrance",
      "2061": "Church Entrance",
      "2071": "Street by Vacant Lot",
      "2081": "Church Entrance",
      "2091": "Church Entrance"
    },
    "globals": [
      "GRAFFITI",
      "CEMETERY-OBJECT",
      "VACANT-LOT",
      "CONSTRUCTION-OBJECT",
      "PEOPLE",
      "CHURCH-OBJECT",
      "RECTORY-OBJECT",
      "GATE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MIDLAND-AND-CHURCH",
        "target": "Midland & Church"
      },
      "EAST": {
        "command": "east",
        "targetId": "CEMETERY",
        "target": "Cemetery"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      },
      "WEST": {
        "command": "west",
        "targetId": "ST-MICHAELS",
        "target": "Vacant Lot"
      },
      "NW": {
        "command": "nw",
        "targetId": "CONSTRUCTION-SITE-5",
        "target": "Construction Site"
      },
      "IN": {
        "command": "in",
        "targetId": "ST-MICHAELS",
        "target": "Vacant Lot"
      }
    }
  },
  {
    "id": "HALLEY-AND-UNIVERSITY",
    "name": "Halley & University",
    "aliases": [
      "Halley & University"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "CAMPUS",
      "PARK-OBJECT",
      "GATE",
      "HALLEY-ESTATES-OBJECT",
      "PEOPLE",
      "INTERCHANGE-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      },
      "WEST": {
        "command": "west",
        "targetId": "INTERCHANGE",
        "target": "Interchange"
      },
      "NORTH": {
        "command": "north",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      }
    }
  },
  {
    "id": "PARKVIEW-APARTMENTS",
    "name": "Parkview Apartments",
    "aliases": [
      "Parkview Apartments"
    ],
    "yearNames": {},
    "globals": [
      "MAILBOXES",
      "PICTUREPHONE",
      "GRAFFITI",
      "PARKVIEW-APARTMENTS-OBJECT",
      "GLASS"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "EAST": {
        "command": "east",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "IN": {
        "command": "in",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      },
      "WEST": {
        "command": "west",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      }
    }
  },
  {
    "id": "RIVER-STREET-BRIDGE",
    "name": "River Street Bridge",
    "aliases": [
      "River Street Bridge"
    ],
    "yearNames": {},
    "globals": [
      "STREET-BRIDGE",
      "RIVER",
      "RIVER-BANK",
      "WATER"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "POWER-STATION-ENTRANCE",
        "target": "Power Station Entrance"
      }
    }
  },
  {
    "id": "ROCKVIL-REFORMATORY",
    "name": "Rockvil Reformatory",
    "aliases": [
      "Rockvil Reformatory"
    ],
    "yearNames": {},
    "globals": [
      "JAIL-OBJECT"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "WATER-TOWER",
        "target": "Water Tower"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "WATER-TOWER",
        "target": "Water Tower"
      }
    }
  },
  {
    "id": "AIRPORTWAY-AND-RIVER",
    "name": "Airportway & River",
    "aliases": [
      "Airportway & River"
    ],
    "yearNames": {},
    "globals": [
      "BSF-BASE",
      "FENCE",
      "WATER",
      "RESERVOIR",
      "HOTEL-OBJECT",
      "SCHOOL-OBJECT",
      "PEOPLE",
      "WELLS-THEATRE-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "RIVER-AND-KENNEDY",
        "target": "River & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "SYMPHONY-ENTRANCE",
        "target": "Symphony Entrance"
      },
      "SE": {
        "command": "se",
        "targetId": "COLONIAL-HOTEL",
        "target": "Colonial Hotel"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      },
      "SW": {
        "command": "sw",
        "targetId": "WELLS-THEATRE",
        "target": "Wells Theatre"
      },
      "WEST": {
        "command": "west",
        "targetId": "ROCKVIL-HIGH",
        "target": "Rockvil High"
      }
    }
  },
  {
    "id": "AQUARIUM-AND-KENNEDY",
    "name": "Aquarium & Kennedy",
    "aliases": [
      "Aquarium & Kennedy"
    ],
    "yearNames": {},
    "globals": [
      "BANK-OBJECT",
      "SCHOOL-OBJECT",
      "AQUARIUM-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "RIVER-AND-KENNEDY",
        "target": "River & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      },
      "SE": {
        "command": "se",
        "targetId": "DENTAL-SCHOOL",
        "target": "Dental School"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "PARK-ENTRANCE",
        "target": "Entrance to Halley Estates"
      },
      "WEST": {
        "command": "west",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "SW": {
        "command": "sw",
        "targetId": "AQUARIUM",
        "target": "Aquarium"
      },
      "NW": {
        "command": "nw",
        "targetId": "BANK",
        "target": "Bank"
      }
    }
  },
  {
    "id": "AQUARIUM-UNDERPASS",
    "name": "Aquarium Underpass",
    "aliases": [
      "Aquarium Underpass"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "ZOO-ENTRANCE",
        "target": "Zoo Entrance"
      }
    }
  },
  {
    "id": "CHURCH-STREET-PARK",
    "name": "Church Street Park",
    "aliases": [
      "Church Street Park",
      "Church Street City"
    ],
    "yearNames": {
      "2041": "Church Street Park",
      "2051": "Church Street Park",
      "2061": "Church Street City",
      "2071": "Church Street City",
      "2081": "Church Street City",
      "2091": "Church Street City"
    },
    "globals": [
      "GRAFFITI",
      "TUNNEL",
      "PARK-OBJECT",
      "CHURCH-STREET-CITY-OBJECT",
      "FENCE",
      "HEIMAN-VILLAGE-OBJECT",
      "RAILROAD-TRACKS",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      },
      "WEST": {
        "command": "west",
        "targetId": "HEIMAN-VILLAGE",
        "target": "Heiman Village"
      }
    }
  },
  {
    "id": "MAIN-STREET-BRIDGE",
    "name": "Main Street Bridge",
    "aliases": [
      "Main Street Bridge"
    ],
    "yearNames": {},
    "globals": [
      "STREET-BRIDGE",
      "RIVER",
      "RIVER-BANK",
      "WATER"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      }
    }
  },
  {
    "id": "ROCKVIL-UNIVERSITY",
    "name": "Rockvil University",
    "aliases": [
      "Rockvil University"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "DORM-OBJECT",
      "STUDENT-UNION-OBJECT",
      "LECTURE-HALL-OBJECT",
      "CAMPUS",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "HALLEY-AND-UNIVERSITY",
        "target": "Halley & University"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "NE": {
        "command": "ne",
        "targetId": "STUDENT-UNION",
        "target": "Student Union"
      },
      "SE": {
        "command": "se",
        "targetId": "LECTURE-HALL",
        "target": "Lecture Hall"
      },
      "WEST": {
        "command": "west",
        "targetId": "DORM",
        "target": "Dorm"
      }
    }
  },
  {
    "id": "SOUTHWAY-AND-KENNEDY",
    "name": "Southway & Kennedy",
    "aliases": [
      "Southway & Kennedy"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "CARLOT",
      "CONSTRUCTION-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "NE": {
        "command": "ne",
        "targetId": "SKYCAR-LOT-2",
        "target": "Skycar Lot"
      },
      "EAST": {
        "command": "east",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "SE": {
        "command": "se",
        "targetId": "ROW-HOUSES",
        "target": "Row Houses"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ROW-HOUSES",
        "target": "Row Houses"
      },
      "SW": {
        "command": "sw",
        "targetId": "ROW-HOUSES",
        "target": "Row Houses"
      },
      "WEST": {
        "command": "west",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "NW": {
        "command": "nw",
        "targetId": "CONSTRUCTION-SITE-1",
        "target": "Construction Site"
      }
    }
  },
  {
    "id": "SOUTHWAY-UNDERPASS",
    "name": "Southway Underpass",
    "aliases": [
      "Southway Underpass"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "FIREHOUSE-OBJECT",
      "CARLOT",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "EAST": {
        "command": "east",
        "targetId": "SKYCAR-LOT-1",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "targetId": "SKYCAR-LOT-1",
        "target": "Skycar Lot"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SKYCAR-LOT-1",
        "target": "Skycar Lot"
      },
      "NW": {
        "command": "nw",
        "targetId": "FIREHOUSE",
        "target": "Firehouse"
      }
    }
  },
  {
    "id": "UNIVERSITY-HEIGHTS",
    "name": "University Heights",
    "aliases": [
      "University Heights"
    ],
    "yearNames": {},
    "globals": [
      "UNOPENABLE-DOOR",
      "MAILBOXES",
      "PICTUREPHONE",
      "GRAFFITI",
      "GLASS",
      "UNIVERSITY-HEIGHTS-OBJECT"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "NORTH": {
        "command": "north",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "IN": {
        "command": "in",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      }
    }
  },
  {
    "id": "CONSTRUCTION-SITE-1",
    "name": "Construction Site",
    "aliases": [
      "Construction Site"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "FENCE",
      "CONSTRUCTION-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "OUT": {
        "command": "out",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      }
    }
  },
  {
    "id": "CONSTRUCTION-SITE-2",
    "name": "Construction Site",
    "aliases": [
      "Construction Site",
      "Heiman World"
    ],
    "yearNames": {
      "2041": "Construction Site",
      "2051": "Heiman World",
      "2061": "Heiman World",
      "2071": "Heiman World",
      "2081": "Heiman World",
      "2091": "Heiman World"
    },
    "globals": [
      "GLOBAL-SIGN",
      "CONSTRUCTION-OBJECT",
      "HEIMAN-WORLD-OBJECT",
      "FENCE"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "SW": {
        "command": "sw",
        "targetId": "BEND",
        "target": "Bend"
      }
    }
  },
  {
    "id": "CONSTRUCTION-SITE-5",
    "name": "Construction Site",
    "aliases": [
      "Construction Site",
      "Rectory",
      "Ruined Building"
    ],
    "yearNames": {
      "2041": "Construction Site",
      "2051": "Rectory",
      "2061": "Ruined Building",
      "2071": "Ruined Building",
      "2081": "Ruined Building",
      "2091": "Ruined Building"
    },
    "globals": [
      "GLASS",
      "RECTORY-OBJECT",
      "CONSTRUCTION-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "MIDLAND-AND-CHURCH",
        "target": "Midland & Church"
      },
      "SE": {
        "command": "se",
        "targetId": "CHURCH-ENTRANCE",
        "target": "Street by Vacant Lot"
      }
    }
  },
  {
    "id": "SYMPHONY-ENTRANCE",
    "name": "Symphony Entrance",
    "aliases": [
      "Symphony Entrance"
    ],
    "yearNames": {},
    "globals": [
      "BSF-BASE",
      "GLOBAL-SIGN",
      "WATER",
      "RIVER",
      "CARLOT",
      "SYMPHONY-HALL-OBJECT",
      "RIVER-BANK",
      "UNOPENABLE-DOOR",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "BASE-GATE",
        "target": "Base Gate"
      },
      "NE": {
        "command": "ne",
        "targetId": "AIRPORT-ENTRANCE",
        "target": "Airport Entrance"
      },
      "SW": {
        "command": "sw",
        "targetId": "SKYCAR-LOT-7",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
        "targetId": "AIRPORTWAY-AND-RIVER",
        "target": "Airportway & River"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SYMPHONY-HALL",
        "target": "Symphony Hall"
      },
      "IN": {
        "command": "in",
        "targetId": "SYMPHONY-HALL",
        "target": "Symphony Hall"
      }
    }
  },
  {
    "id": "AIRPORT-ENTRANCE",
    "name": "Airport Entrance",
    "aliases": [
      "Airport Entrance"
    ],
    "yearNames": {},
    "globals": [
      "AIRPORT-TERMINAL-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "TERMINAL",
        "target": "Terminal"
      },
      "SW": {
        "command": "sw",
        "targetId": "SYMPHONY-ENTRANCE",
        "target": "Symphony Entrance"
      },
      "IN": {
        "command": "in",
        "targetId": "TERMINAL",
        "target": "Terminal"
      }
    }
  },
  {
    "id": "AQUARIUM-AND-RIVER",
    "name": "Aquarium & River",
    "aliases": [
      "Aquarium & River"
    ],
    "yearNames": {},
    "globals": [
      "VACANT-LOT",
      "CHURCH-OBJECT",
      "PICKFORD-THEATRE-OBJECT",
      "PEOPLE",
      "WELLS-THEATRE-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "AIRPORTWAY-AND-RIVER",
        "target": "Airportway & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "PICKFORD-THEATRE",
        "target": "Pickford Theatre"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "SW": {
        "command": "sw",
        "targetId": "FIRST-METHODIST-CHURCH",
        "target": "Vacant Lot"
      },
      "WEST": {
        "command": "west",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "NW": {
        "command": "nw",
        "targetId": "WELLS-THEATRE",
        "target": "Wells Theatre"
      }
    }
  },
  {
    "id": "CENTRE-AND-KENNEDY",
    "name": "Centre & Kennedy",
    "aliases": [
      "Centre & Kennedy"
    ],
    "yearNames": {},
    "globals": [
      "HOTEL-OBJECT",
      "HUANG-HALL-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "PARK-ENTRANCE",
        "target": "Entrance to Halley Estates"
      },
      "NE": {
        "command": "ne",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "EAST": {
        "command": "east",
        "targetId": "VELDRAN-HOTEL",
        "target": "Veldran Hotel"
      },
      "SE": {
        "command": "se",
        "targetId": "VELDRAN-HOTEL",
        "target": "Veldran Hotel"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      },
      "WEST": {
        "command": "west",
        "targetId": "HUANG-HALL",
        "target": "Huang Hall"
      }
    }
  },
  {
    "id": "ELM-AND-UNIVERSITY",
    "name": "Elm & University",
    "aliases": [
      "Elm & University"
    ],
    "yearNames": {},
    "globals": [
      "CAMPUS",
      "STAIRS",
      "UNIVERSITY-HEIGHTS-OBJECT",
      "TUBE-STATION",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "UNIVERSITY-HEIGHTS",
        "target": "University Heights"
      },
      "WEST": {
        "command": "west",
        "targetId": "ELM-UNDERPASS",
        "target": "Elm Underpass"
      },
      "NW": {
        "command": "nw",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      }
    }
  },
  {
    "id": "FACTORY-ENTRANCE",
    "name": "Factory Entrance",
    "aliases": [
      "Factory Entrance"
    ],
    "yearNames": {},
    "globals": [
      "FACTORY-OBJECT",
      "TENEMENT-OBJECT",
      "GUN-SHOP-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      },
      "EAST": {
        "command": "east",
        "targetId": "ALLEY",
        "target": "Alley"
      },
      "SE": {
        "command": "se",
        "targetId": "SKYCAR-FACTORY",
        "target": "Skycar Factory"
      },
      "SW": {
        "command": "sw",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "WEST": {
        "command": "west",
        "targetId": "TENEMENT-2",
        "target": "Tenement"
      },
      "NW": {
        "command": "nw",
        "targetId": "TENEMENT-2",
        "target": "Tenement"
      },
      "IN": {
        "command": "in",
        "targetId": "SKYCAR-FACTORY",
        "target": "Skycar Factory"
      },
      "NORTH": {
        "command": "north",
        "targetId": "GUN-SHOP",
        "target": "Gun Shop"
      }
    }
  },
  {
    "id": "HALLEY-PARK-EAST",
    "name": "Halley Park East",
    "aliases": [
      "Halley Park East"
    ],
    "yearNames": {},
    "globals": [
      "GRAFFITI",
      "PARK-OBJECT",
      "CARLOT",
      "AQUARIUM-OBJECT",
      "HUANG-HALL-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "PARK-ENTRANCE",
        "target": "Entrance to Halley Estates"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "HUANG-HALL",
        "target": "Huang Hall"
      },
      "SW": {
        "command": "sw",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      },
      "NW": {
        "command": "nw",
        "targetId": "SKYCAR-LOT-4",
        "target": "Skycar Lot"
      },
      "NORTH": {
        "command": "north",
        "targetId": "AQUARIUM",
        "target": "Aquarium"
      },
      "WEST": {
        "command": "west",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      }
    }
  },
  {
    "id": "HALLEY-PARK-WEST",
    "name": "Halley Park West",
    "aliases": [
      "Halley Park West"
    ],
    "yearNames": {},
    "globals": [
      "PEOPLE",
      "STAIRS",
      "ZOO-OBJECT",
      "PARK-OBJECT",
      "WATER",
      "CARLOT",
      "TUBE-STATION"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SKYCAR-LOT-4",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "HALLEY-AND-UNIVERSITY",
        "target": "Halley & University"
      },
      "WEST": {
        "command": "west",
        "targetId": "ZOO",
        "target": "Zoo"
      },
      "NW": {
        "command": "nw",
        "targetId": "ZOO",
        "target": "Zoo"
      },
      "EAST": {
        "command": "east",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      }
    }
  },
  {
    "id": "CORE",
    "name": "Maintenance Core",
    "aliases": [
      "Maintenance Core"
    ],
    "yearNames": {},
    "globals": [
      "GUN",
      "OUTLETS",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "MIDLAND-AND-CHURCH",
    "name": "Midland & Church",
    "aliases": [
      "Midland & Church"
    ],
    "yearNames": {},
    "globals": [
      "CEMETERY-OBJECT",
      "RAILROAD-YARD",
      "CONSTRUCTION-OBJECT",
      "PEOPLE",
      "RECTORY-OBJECT",
      "GATE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "CEMETERY",
        "target": "Cemetery"
      },
      "SE": {
        "command": "se",
        "targetId": "CEMETERY",
        "target": "Cemetery"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "CHURCH-ENTRANCE",
        "target": "Street by Vacant Lot"
      },
      "WEST": {
        "command": "west",
        "targetId": "MIDLAND-AND-RIVER",
        "target": "Midland & River"
      },
      "SW": {
        "command": "sw",
        "targetId": "CONSTRUCTION-SITE-5",
        "target": "Construction Site"
      }
    }
  },
  {
    "id": "PICKFORD-THEATRE",
    "name": "Pickford Theatre",
    "aliases": [
      "Pickford Theatre"
    ],
    "yearNames": {},
    "globals": [
      "PICKFORD-THEATRE-OBJECT",
      "PLAY"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      },
      "OUT": {
        "command": "out",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      }
    }
  },
  {
    "id": "SOUTHWAY-AND-RIVER",
    "name": "Southway & River",
    "aliases": [
      "Southway & River"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "RIVER",
      "RIVER-BANK",
      "CONSTRUCTION-OBJECT",
      "HEIMAN-WORLD-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "CONSTRUCTION-SITE-2",
        "target": "Construction Site"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "BEND",
        "target": "Bend"
      },
      "SW": {
        "command": "sw",
        "targetId": "ROW-HOUSES",
        "target": "Row Houses"
      },
      "WEST": {
        "command": "west",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "NW": {
        "command": "nw",
        "targetId": "SKYCAR-LOT-2",
        "target": "Skycar Lot"
      }
    }
  },
  {
    "id": "AQUARIUM-AND-PARK",
    "name": "Aquarium & Park",
    "aliases": [
      "Aquarium & Park"
    ],
    "yearNames": {},
    "globals": [
      "TUNNEL",
      "RESTAURANT-OBJECT",
      "BAR-OBJECT",
      "CARLOT",
      "AQUARIUM-OBJECT",
      "SERVICE-STATION-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "RIVER-AND-PARK",
        "target": "River & Park"
      },
      "EAST": {
        "command": "east",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "SKYCAR-LOT-4",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
        "targetId": "ZOO-ENTRANCE",
        "target": "Zoo Entrance"
      },
      "NW": {
        "command": "nw",
        "targetId": "SERVICE-STATION",
        "target": "Service Station"
      },
      "NE": {
        "command": "ne",
        "targetId": "BURGER-MEISTER",
        "target": "Bar"
      },
      "SE": {
        "command": "se",
        "targetId": "AQUARIUM",
        "target": "Aquarium"
      }
    }
  },
  {
    "id": "BODANSKI-SQUARE",
    "name": "Bodanski Square",
    "aliases": [
      "Bodanski Square"
    ],
    "yearNames": {},
    "globals": [
      "TRAIN-STATION-OBJECT",
      "STAIRS",
      "SLOT",
      "RESTAURANT-OBJECT",
      "CARLOT",
      "PEOPLE",
      "CHURCH-OBJECT",
      "TUBE-STATION"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "MUSEUM-ENTRANCE",
        "target": "Museum Entrance"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "MIDLAND-AND-RIVER",
        "target": "Midland & River"
      },
      "SW": {
        "command": "sw",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "WEST": {
        "command": "west",
        "targetId": "SKYCAR-LOT-5",
        "target": "Skycar Lot"
      },
      "NE": {
        "command": "ne",
        "targetId": "SIMONS",
        "target": "Simon's"
      },
      "SE": {
        "command": "se",
        "targetId": "TRAIN-STATION",
        "target": "Train Station"
      }
    }
  },
  {
    "id": "BURNED-OUT-AREA",
    "name": "Burned-out Area",
    "aliases": [
      "Burned-out Area"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-WINDOW"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "NE": {
        "command": "ne",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "EAST": {
        "command": "east",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "SE": {
        "command": "se",
        "targetId": "DUMP-ENTRANCE",
        "target": "Dump Entrance"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "SW": {
        "command": "sw",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "WEST": {
        "command": "west",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "NW": {
        "command": "nw",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      }
    }
  },
  {
    "id": "MIDLAND-AND-RIVER",
    "name": "Midland & River",
    "aliases": [
      "Midland & River"
    ],
    "yearNames": {},
    "globals": [
      "GLASS",
      "CARLOT",
      "CHURCH-OBJECT",
      "TRAIN-STATION-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "EAST": {
        "command": "east",
        "targetId": "MIDLAND-AND-CHURCH",
        "target": "Midland & Church"
      },
      "SE": {
        "command": "se",
        "targetId": "SKYCAR-LOT-3",
        "target": "Skycar Lot"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "MAIN-AND-RIVER",
        "target": "Main & River"
      },
      "NE": {
        "command": "ne",
        "targetId": "TRAIN-STATION",
        "target": "Train Station"
      }
    }
  },
  {
    "id": "MUSEUM-ENTRANCE",
    "name": "Museum Entrance",
    "aliases": [
      "Museum Entrance"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "MUSEUM-OBJECT",
      "MOVIE-THEATRE-OBJECT",
      "PEOPLE",
      "PARK-OBJECT",
      "CARLOT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SKYCAR-LOT-6",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "EAST": {
        "command": "east",
        "targetId": "RIVERSIDE-PARK",
        "target": "Riverside Park"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "RAILROAD-MUSEUM",
        "target": "Railroad Museum"
      },
      "NW": {
        "command": "nw",
        "targetId": "CINEMA",
        "target": "Cinema"
      },
      "IN": {
        "command": "in",
        "targetId": "RAILROAD-MUSEUM",
        "target": "Railroad Museum"
      }
    }
  },
  {
    "id": "RAILROAD-MUSEUM",
    "name": "Railroad Museum",
    "aliases": [
      "Railroad Museum"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-WINDOW",
      "MUSEUM-OBJECT",
      "RAILROAD-YARD",
      "EXHIBITS",
      "PARK-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MUSEUM-ENTRANCE",
        "target": "Museum Entrance"
      },
      "OUT": {
        "command": "out",
        "targetId": "MUSEUM-ENTRANCE",
        "target": "Museum Entrance"
      },
      "EAST": {
        "command": "east",
        "targetId": "RIVERSIDE-PARK",
        "target": "Riverside Park"
      }
    }
  },
  {
    "id": "RIVER-AND-KENNEDY",
    "name": "River & Kennedy",
    "aliases": [
      "River & Kennedy"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "WATER",
      "RESERVOIR",
      "SCHOOL-OBJECT",
      "FIELD",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "AIRPORTWAY-AND-RIVER",
        "target": "Airportway & River"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "ATHLETIC-FIELD",
        "target": "Athletic Field"
      },
      "WEST": {
        "command": "west",
        "targetId": "RIVER-AND-PARK",
        "target": "River & Park"
      },
      "SE": {
        "command": "se",
        "targetId": "ROCKVIL-HIGH",
        "target": "Rockvil High"
      }
    }
  },
  {
    "id": "ROCKVIL-STADIUM",
    "name": "Rockvil Stadium",
    "aliases": [
      "Rockvil Stadium"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "ANIMAL",
      "STADIUM-OBJECT",
      "TUBE-STATION",
      "FIELD",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "STADIUM-LOT-C",
        "target": "Stadium Lot C"
      },
      "EAST": {
        "command": "east",
        "targetId": "STADIUM-LOT-B",
        "target": "Stadium Lot B"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "STADIUM-LOT-A",
        "target": "Stadium Lot A"
      }
    }
  },
  {
    "id": "SERVICE-STATION",
    "name": "Service Station",
    "aliases": [
      "Service Station"
    ],
    "yearNames": {},
    "globals": [
      "SERVICE-STATION-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      }
    }
  },
  {
    "id": "SKYBUS-TERMINAL",
    "name": "Skybus Terminal",
    "aliases": [
      "Skybus Terminal"
    ],
    "yearNames": {},
    "globals": [
      "SKYBUS-TERMINAL-OBJECT",
      "GATE",
      "STAIRS",
      "TUBE-STATION",
      "BOARDING-PLATFORM"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      },
      "OUT": {
        "command": "out",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      }
    }
  },
  {
    "id": "SOUTHWAY-AND-PARK",
    "name": "Southway & Park",
    "aliases": [
      "Southway & Park"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "GLOBAL-WINDOW",
      "SUPERMARKET",
      "MAIN-LIBRARY-OBJECT",
      "PEOPLE",
      "HOSPITAL-OBJECT",
      "ANNEX-OBJECT",
      "NOTE",
      "PARKVIEW-APARTMENTS-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "NE": {
        "command": "ne",
        "targetId": "HOSPITAL-ANNEX",
        "target": "Hospital Annex"
      },
      "EAST": {
        "command": "east",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "SE": {
        "command": "se",
        "targetId": "ROW-HOUSES",
        "target": "Row Houses"
      },
      "SW": {
        "command": "sw",
        "targetId": "SOUTHWAY-UNDERPASS",
        "target": "Southway Underpass"
      },
      "WEST": {
        "command": "west",
        "targetId": "PARKVIEW-APARTMENTS",
        "target": "Parkview Apartments"
      },
      "NW": {
        "command": "nw",
        "targetId": "MAIN-LIBRARY",
        "target": "Main Library"
      }
    }
  },
  {
    "id": "ATHLETIC-FIELD",
    "name": "Athletic Field",
    "aliases": [
      "Athletic Field"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "CHILDREN",
      "FIELD",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "RIVER-AND-KENNEDY",
        "target": "River & Kennedy"
      },
      "NW": {
        "command": "nw",
        "targetId": "RIVER-AND-PARK",
        "target": "River & Park"
      }
    }
  },
  {
    "id": "CLOSED-FACTORY",
    "name": "Closed Factory",
    "aliases": [
      "Closed Factory",
      "Soup Kitchen"
    ],
    "yearNames": {
      "2041": "Closed Factory",
      "2051": "Soup Kitchen",
      "2061": "Soup Kitchen",
      "2071": "Soup Kitchen",
      "2081": "Soup Kitchen",
      "2091": "Soup Kitchen"
    },
    "globals": [
      "FACTORY-OBJECT",
      "GLOBAL-TABLE",
      "SOUP-KITCHEN"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "OUT": {
        "command": "out",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      }
    }
  },
  {
    "id": "COLONIAL-HOTEL",
    "name": "Colonial Hotel",
    "aliases": [
      "Colonial Hotel"
    ],
    "yearNames": {},
    "globals": [
      "CARLOT",
      "HOTEL-OBJECT"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "AIRPORTWAY-AND-RIVER",
        "target": "Airportway & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "SKYCAR-LOT-7",
        "target": "Skycar Lot"
      }
    }
  },
  {
    "id": "HARDWARE-STORE",
    "name": "Hardware Store",
    "aliases": [
      "Hardware Store"
    ],
    "yearNames": {},
    "globals": [
      "HARDWARE-STORE-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "BEND",
        "target": "Bend"
      },
      "OUT": {
        "command": "out",
        "targetId": "BEND",
        "target": "Bend"
      }
    }
  },
  {
    "id": "HEIMAN-VILLAGE",
    "name": "Heiman Village",
    "aliases": [
      "Heiman Village"
    ],
    "yearNames": {},
    "globals": [
      "PARK-OBJECT",
      "SCHOOL-OBJECT",
      "CHURCH-STREET-CITY-OBJECT",
      "HEIMAN-VILLAGE-OBJECT",
      "STORE-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "CHURCH-STREET-PARK",
        "target": "Church Street Park"
      },
      "WEST": {
        "command": "west",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "NW": {
        "command": "nw",
        "targetId": "MAIN-AND-RIVER",
        "target": "Main & River"
      }
    }
  },
  {
    "id": "HOSPITAL-ANNEX",
    "name": "Hospital Annex",
    "aliases": [
      "Hospital Annex"
    ],
    "yearNames": {},
    "globals": [
      "HOSPITAL-OBJECT",
      "ANNEX-OBJECT",
      "HALLWAY"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "HOSPITAL",
        "target": "Hospital"
      },
      "SW": {
        "command": "sw",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      }
    }
  },
  {
    "id": "MAIN-AND-KENNEDY",
    "name": "Main & Kennedy",
    "aliases": [
      "Main & Kennedy"
    ],
    "yearNames": {},
    "globals": [
      "SKYBUS-TERMINAL-OBJECT",
      "PARK-OBJECT",
      "GLASS",
      "TOWNHOUSE",
      "PEOPLE",
      "CONSTRUCTION-OBJECT",
      "GATE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "MAIN-AND-RIVER",
        "target": "Main & River"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "WEST": {
        "command": "west",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      },
      "SW": {
        "command": "sw",
        "targetId": "KENNEDY-PARK",
        "target": "Kennedy Park"
      },
      "NW": {
        "command": "nw",
        "targetId": "SKYBUS-TERMINAL",
        "target": "Skybus Terminal"
      }
    }
  },
  {
    "id": "MASTER-BEDROOM",
    "name": "Master Bedroom",
    "aliases": [
      "Master Bedroom"
    ],
    "yearNames": {},
    "globals": [
      "LIVING-ROOM-OBJECT",
      "BEDROOM-OBJECT",
      "STAIRS",
      "GLOBAL-WINDOW"
    ],
    "exits": {
      "DOWN": {
        "command": "down",
        "targetId": "EPILOGUE-LIVING-ROOM",
        "target": "Living Room"
      }
    }
  },
  {
    "id": "PARK-UNDERPASS",
    "name": "Park Underpass",
    "aliases": [
      "Park Underpass"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "WATER-TOWER",
        "target": "Water Tower"
      }
    }
  },
  {
    "id": "POLICE-STATION",
    "name": "Police Station",
    "aliases": [
      "Police Station"
    ],
    "yearNames": {},
    "globals": [
      "JAIL-OBJECT",
      "POLICE-STATION-OBJECT",
      "DESK",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      }
    }
  },
  {
    "id": "RIVERSIDE-PARK",
    "name": "Riverside Park",
    "aliases": [
      "Riverside Park"
    ],
    "yearNames": {},
    "globals": [
      "RAILROAD-YARD",
      "FENCE",
      "RIVER",
      "RIVER-BANK",
      "WATER",
      "PARK-OBJECT",
      "CARLOT",
      "GLOBAL-SIGN",
      "MUSEUM-OBJECT",
      "SYMPHONY-HALL-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "MUSEUM-ENTRANCE",
        "target": "Museum Entrance"
      },
      "NW": {
        "command": "nw",
        "targetId": "SKYCAR-LOT-6",
        "target": "Skycar Lot"
      },
      "NORTH": {
        "command": "north",
        "targetId": "SYMPHONY-HALL",
        "target": "Symphony Hall"
      },
      "SW": {
        "command": "sw",
        "targetId": "RAILROAD-MUSEUM",
        "target": "Railroad Museum"
      }
    }
  },
  {
    "id": "ROCKVIL-CENTRE",
    "name": "Rockvil Centre",
    "aliases": [
      "Rockvil Centre"
    ],
    "yearNames": {},
    "globals": [
      "CITY-HALL-OBJECT",
      "DUNBARS-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      },
      "NE": {
        "command": "ne",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "SE": {
        "command": "se",
        "targetId": "DUNBARS",
        "target": "Dunbar's"
      },
      "WEST": {
        "command": "west",
        "targetId": "CITY-HALL",
        "target": "City Hall"
      }
    }
  },
  {
    "id": "SKYCAR-FACTORY",
    "name": "Skycar Factory",
    "aliases": [
      "Skycar Factory"
    ],
    "yearNames": {},
    "globals": [
      "FACTORY-OBJECT",
      "CARLOT",
      "PEOPLE"
    ],
    "exits": {
      "SW": {
        "command": "sw",
        "targetId": "POWER-STATION-ENTRANCE",
        "target": "Power Station Entrance"
      },
      "NW": {
        "command": "nw",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      }
    }
  },
  {
    "id": "STOCK-EXCHANGE",
    "name": "Stock Exchange",
    "aliases": [
      "Stock Exchange"
    ],
    "yearNames": {},
    "globals": [
      "STOCK-EXCHANGE-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "SW": {
        "command": "sw",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      }
    }
  },
  {
    "id": "WICKER-AND-RIVER",
    "name": "Wicker & River",
    "aliases": [
      "Wicker & River"
    ],
    "yearNames": {},
    "globals": [
      "TENEMENT-OBJECT",
      "RAILROAD-BRIDGE",
      "VACANT-LOT",
      "WAREHOUSE-OBJECT",
      "FACTORY-OBJECT",
      "STAIRS",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "SOUP-KITCHEN"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      },
      "SE": {
        "command": "se",
        "targetId": "POWER-STATION-ENTRANCE",
        "target": "Power Station Entrance"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "TENEMENT-1",
        "target": "Tenement"
      },
      "SW": {
        "command": "sw",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      },
      "WEST": {
        "command": "west",
        "targetId": "WAREHOUSE-1",
        "target": "Warehouse"
      },
      "NW": {
        "command": "nw",
        "targetId": "BEND",
        "target": "Bend"
      },
      "NORTH": {
        "command": "north",
        "targetId": "CLOSED-FACTORY",
        "target": "Closed Factory"
      }
    }
  },
  {
    "id": "DENTAL-SCHOOL",
    "name": "Dental School",
    "aliases": [
      "Dental School"
    ],
    "yearNames": {},
    "globals": [
      "SCHOOL-OBJECT"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "OUT": {
        "command": "out",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      }
    }
  },
  {
    "id": "DUMP-ENTRANCE",
    "name": "Dump Entrance",
    "aliases": [
      "Dump Entrance"
    ],
    "yearNames": {},
    "globals": [
      "DUMP-OBJECT",
      "TENEMENT-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      },
      "SW": {
        "command": "sw",
        "targetId": "CITY-DUMP",
        "target": "City Dump"
      },
      "NW": {
        "command": "nw",
        "targetId": "BURNED-OUT-AREA",
        "target": "Burned-out Area"
      },
      "IN": {
        "command": "in",
        "targetId": "CITY-DUMP",
        "target": "City Dump"
      }
    }
  },
  {
    "id": "ELM-AND-KENNEDY",
    "name": "Elm & Kennedy",
    "aliases": [
      "Elm & Kennedy"
    ],
    "yearNames": {},
    "globals": [
      "STOCK-EXCHANGE-OBJECT",
      "MALL-OBJECT",
      "PARK-OBJECT",
      "HOSPITAL-OBJECT",
      "CONSTRUCTION-OBJECT",
      "GATE",
      "TOWNHOUSE",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "HOSPITAL",
        "target": "Hospital"
      },
      "WEST": {
        "command": "west",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "NE": {
        "command": "ne",
        "targetId": "STOCK-EXCHANGE",
        "target": "Stock Exchange"
      },
      "SE": {
        "command": "se",
        "targetId": "ROCKVIL-MALL",
        "target": "Rockvil Mall"
      },
      "NW": {
        "command": "nw",
        "targetId": "KENNEDY-PARK",
        "target": "Kennedy Park"
      }
    }
  },
  {
    "id": "ELM-UNDERPASS",
    "name": "Elm Underpass",
    "aliases": [
      "Elm Underpass"
    ],
    "yearNames": {},
    "globals": [
      "PEOPLE",
      "GRAFFITI",
      "GLOBAL-WINDOW",
      "HIGHWAY",
      "RESTAURANT-OBJECT",
      "BAR-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "NORTH": {
        "command": "north",
        "targetId": "EZZIS-BAR",
        "target": "Ezzi's Bar"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ROYS-PAGODA",
        "target": "Roy's Pagoda"
      }
    }
  },
  {
    "id": "HALLEY-AND-PARK",
    "name": "Halley & Park",
    "aliases": [
      "Halley & Park"
    ],
    "yearNames": {},
    "globals": [
      "TUNNEL",
      "MUSEUM-OBJECT",
      "PARK-OBJECT",
      "GATE",
      "HUANG-HALL-OBJECT",
      "HALLEY-ESTATES-OBJECT",
      "UNOPENABLE-DOOR",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "HUANG-HALL",
        "target": "Huang Hall"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      },
      "WEST": {
        "command": "west",
        "targetId": "HALLEY-AND-UNIVERSITY",
        "target": "Halley & University"
      },
      "NE": {
        "command": "ne",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      },
      "SW": {
        "command": "sw",
        "targetId": "HALLEY-MUSEUM",
        "target": "Halley Museum"
      },
      "NW": {
        "command": "nw",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      }
    }
  },
  {
    "id": "HALLEY-MUSEUM",
    "name": "Halley Museum",
    "aliases": [
      "Halley Museum"
    ],
    "yearNames": {},
    "globals": [
      "MUSEUM-OBJECT",
      "EXHIBITS",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      }
    }
  },
  {
    "id": "MAIN-AND-CHURCH",
    "name": "Main & Church",
    "aliases": [
      "Main & Church"
    ],
    "yearNames": {},
    "globals": [
      "CEMETERY-OBJECT",
      "PARK-OBJECT",
      "CONSTRUCTION-OBJECT",
      "GATE",
      "PEOPLE",
      "CHURCH-STREET-CITY-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "CHURCH-ENTRANCE",
        "target": "Street by Vacant Lot"
      },
      "NE": {
        "command": "ne",
        "targetId": "CEMETERY",
        "target": "Cemetery"
      },
      "EAST": {
        "command": "east",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      },
      "SE": {
        "command": "se",
        "targetId": "CHURCH-STREET-APARTMENTS",
        "target": "Church Street Apartments"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "CHURCH-STREET-PARK",
        "target": "Church Street Park"
      },
      "WEST": {
        "command": "west",
        "targetId": "MAIN-AND-RIVER",
        "target": "Main & River"
      }
    }
  },
  {
    "id": "MAIN-AND-WICKER",
    "name": "Main & Wicker",
    "aliases": [
      "Main & Wicker"
    ],
    "yearNames": {},
    "globals": [
      "CEMETERY-OBJECT",
      "GLOBAL-SIGN",
      "GLOBAL-WINDOW",
      "RAILROAD-BRIDGE",
      "GATE",
      "WATER",
      "RIVER",
      "SUPERMARKET",
      "RESTAURANT-OBJECT",
      "STREET-BRIDGE",
      "GLASS",
      "RAILROAD-TRACKS",
      "SMOKE",
      "NOTE",
      "RIVER-BANK",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "CEMETERY",
        "target": "Cemetery"
      },
      "EAST": {
        "command": "east",
        "targetId": "MAIN-STREET-BRIDGE",
        "target": "Main Street Bridge"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      },
      "SE": {
        "command": "se",
        "targetId": "THE-COACHMAN",
        "target": "The Coachman"
      },
      "WEST": {
        "command": "west",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      }
    }
  },
  {
    "id": "POWER-STATION",
    "name": "Power Station",
    "aliases": [
      "Power Station"
    ],
    "yearNames": {},
    "globals": [
      "POWER-STATION-OBJECT",
      "SMOKE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "POWER-STATION-ENTRANCE",
        "target": "Power Station Entrance"
      },
      "OUT": {
        "command": "out",
        "targetId": "POWER-STATION-ENTRANCE",
        "target": "Power Station Entrance"
      }
    }
  },
  {
    "id": "STADIUM-LOT-A",
    "name": "Stadium Lot A",
    "aliases": [
      "Stadium Lot A"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "STADIUM-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ROCKVIL-STADIUM",
        "target": "Rockvil Stadium"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ZOO-ENTRANCE",
        "target": "Zoo Entrance"
      }
    }
  },
  {
    "id": "STADIUM-LOT-B",
    "name": "Stadium Lot B",
    "aliases": [
      "Stadium Lot B"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "STADIUM-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "RIVER-AND-PARK",
        "target": "River & Park"
      },
      "WEST": {
        "command": "west",
        "targetId": "ROCKVIL-STADIUM",
        "target": "Rockvil Stadium"
      }
    }
  },
  {
    "id": "STADIUM-LOT-C",
    "name": "Stadium Lot C",
    "aliases": [
      "Stadium Lot C"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "STADIUM-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "WATER-TOWER",
        "target": "Water Tower"
      },
      "SW": {
        "command": "sw",
        "targetId": "ROCKVIL-STADIUM",
        "target": "Rockvil Stadium"
      }
    }
  },
  {
    "id": "STUDENT-UNION",
    "name": "Student Union",
    "aliases": [
      "Student Union"
    ],
    "yearNames": {},
    "globals": [
      "CAMPUS",
      "STUDENT-UNION-OBJECT"
    ],
    "exits": {
      "SW": {
        "command": "sw",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      },
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      }
    }
  },
  {
    "id": "SYMPHONY-HALL",
    "name": "Symphony Hall",
    "aliases": [
      "Symphony Hall"
    ],
    "yearNames": {},
    "globals": [
      "WATER",
      "RIVER",
      "RIVER-BANK",
      "PARK-OBJECT",
      "CARLOT",
      "SYMPHONY-HALL-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SYMPHONY-ENTRANCE",
        "target": "Symphony Entrance"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SKYCAR-LOT-6",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
        "targetId": "SKYCAR-LOT-7",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "targetId": "RIVERSIDE-PARK",
        "target": "Riverside Park"
      }
    }
  },
  {
    "id": "TRAIN-STATION",
    "name": "Train Station",
    "aliases": [
      "Train Station",
      "Church Lobby"
    ],
    "yearNames": {},
    "globals": [
      "CHURCH-OBJECT",
      "TRAIN-STATION-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "SW": {
        "command": "sw",
        "targetId": "MIDLAND-AND-RIVER",
        "target": "Midland & River"
      }
    }
  },
  {
    "id": "VELDRAN-HOTEL",
    "name": "Veldran Hotel",
    "aliases": [
      "Veldran Hotel"
    ],
    "yearNames": {},
    "globals": [
      "HOTEL-OBJECT"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "NW": {
        "command": "nw",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "OUT": {
        "command": "out",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      }
    }
  },
  {
    "id": "WELLS-THEATRE",
    "name": "Wells Theatre",
    "aliases": [
      "Wells Theatre"
    ],
    "yearNames": {},
    "globals": [
      "WELLS-THEATRE-OBJECT",
      "PLAY"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "AIRPORTWAY-AND-RIVER",
        "target": "Airportway & River"
      },
      "SE": {
        "command": "se",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      }
    }
  },
  {
    "id": "WICKER-AND-PIER",
    "name": "Wicker & Pier",
    "aliases": [
      "Wicker & Pier"
    ],
    "yearNames": {},
    "globals": [
      "RAILROAD-BRIDGE",
      "BOOKSTORE-OBJECT",
      "LIQUOR-STORE-OBJECT",
      "TENEMENT-OBJECT",
      "GLOBAL-WINDOW",
      "PIER-OBJECT",
      "RAILROAD-TRACKS"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      },
      "SE": {
        "command": "se",
        "targetId": "PIER",
        "target": "Pier"
      },
      "SW": {
        "command": "sw",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      },
      "NW": {
        "command": "nw",
        "targetId": "TENEMENT-3",
        "target": "Tenement"
      },
      "EAST": {
        "command": "east",
        "targetId": "BOOKSTORE",
        "target": "Bookstore"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "LIQUOR-STORE",
        "target": "Liquor Store"
      }
    }
  },
  {
    "id": "KENNEDY-PARK",
    "name": "Kennedy Park",
    "aliases": [
      "Kennedy Park",
      "Construction Site"
    ],
    "yearNames": {
      "2041": "Kennedy Park",
      "2051": "Kennedy Park",
      "2061": "Construction Site",
      "2071": "Construction Site",
      "2081": "Construction Site",
      "2091": "Construction Site"
    },
    "globals": [
      "PEOPLE",
      "GATE",
      "GLOBAL-SIGN",
      "WATER",
      "PARK-OBJECT",
      "CONSTRUCTION-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      },
      "SE": {
        "command": "se",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      }
    }
  },
  {
    "id": "LECTURE-HALL",
    "name": "Lecture Hall",
    "aliases": [
      "Lecture Hall"
    ],
    "yearNames": {},
    "globals": [
      "CAMPUS",
      "LECTURE-HALL-OBJECT"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      },
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      }
    }
  },
  {
    "id": "LIQUOR-STORE",
    "name": "Liquor Store",
    "aliases": [
      "Liquor Store"
    ],
    "yearNames": {},
    "globals": [
      "LIQUOR-STORE-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      },
      "OUT": {
        "command": "out",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      }
    }
  },
  {
    "id": "MAIN-AND-RIVER",
    "name": "Main & River",
    "aliases": [
      "Main & River"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "GLASS",
      "HEALTH-CENTER-OBJECT",
      "HEIMAN-VILLAGE-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MIDLAND-AND-RIVER",
        "target": "Midland & River"
      },
      "NE": {
        "command": "ne",
        "targetId": "HEALTH-CENTER",
        "target": "Serf Housing"
      },
      "EAST": {
        "command": "east",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      },
      "SE": {
        "command": "se",
        "targetId": "HEIMAN-VILLAGE",
        "target": "Heiman Village"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "WEST": {
        "command": "west",
        "targetId": "MAIN-AND-KENNEDY",
        "target": "Main & Kennedy"
      }
    }
  },
  {
    "id": "MAIN-LIBRARY",
    "name": "Main Library",
    "aliases": [
      "Main Library"
    ],
    "yearNames": {},
    "globals": [
      "MAIN-LIBRARY-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      }
    }
  },
  {
    "id": "RIVER-AND-PARK",
    "name": "River & Park",
    "aliases": [
      "River & Park"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "WATER",
      "RESERVOIR",
      "FIELD",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "RIVER-AND-KENNEDY",
        "target": "River & Kennedy"
      },
      "SE": {
        "command": "se",
        "targetId": "ATHLETIC-FIELD",
        "target": "Athletic Field"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "WEST": {
        "command": "west",
        "targetId": "STADIUM-LOT-B",
        "target": "Stadium Lot B"
      },
      "NW": {
        "command": "nw",
        "targetId": "WATER-TOWER",
        "target": "Water Tower"
      }
    }
  },
  {
    "id": "ROCKVIL-HIGH",
    "name": "Rockvil High",
    "aliases": [
      "Rockvil High",
      "The Vincent School"
    ],
    "yearNames": {
      "2041": "Rockvil High",
      "2051": "Rockvil High",
      "2061": "The Vincent School",
      "2071": "The Vincent School",
      "2081": "The Vincent School",
      "2091": "The Vincent School"
    },
    "globals": [
      "SCHOOL-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "AIRPORTWAY-AND-RIVER",
        "target": "Airportway & River"
      },
      "NW": {
        "command": "nw",
        "targetId": "RIVER-AND-KENNEDY",
        "target": "River & Kennedy"
      }
    }
  },
  {
    "id": "ROCKVIL-MALL",
    "name": "Rockvil Mall",
    "aliases": [
      "Rockvil Mall"
    ],
    "yearNames": {},
    "globals": [
      "JOYBOOTH-OBJECT",
      "MALL-OBJECT",
      "CARLOT",
      "STORE-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SKYCAR-LOT-2",
        "target": "Skycar Lot"
      },
      "NW": {
        "command": "nw",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "EAST": {
        "command": "east",
        "targetId": "JOYBOOTH",
        "target": "Joybooth"
      },
      "IN": {
        "command": "in",
        "targetId": "JOYBOOTH",
        "target": "Joybooth"
      }
    }
  },
  {
    "id": "ROYS-PAGODA",
    "name": "Roy's Pagoda",
    "aliases": [
      "Roy's Pagoda"
    ],
    "yearNames": {},
    "globals": [
      "RESTAURANT-OBJECT",
      "MENU",
      "PEOPLE",
      "GLOBAL-TABLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ELM-UNDERPASS",
        "target": "Elm Underpass"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-UNDERPASS",
        "target": "Elm Underpass"
      }
    }
  },
  {
    "id": "HEALTH-CENTER",
    "name": "Serf Housing",
    "aliases": [
      "Serf Housing",
      "Health Center"
    ],
    "yearNames": {
      "2041": "Health Center",
      "2051": "Health Center",
      "2061": "Health Center",
      "2071": "Serf Housing",
      "2081": "Health Center",
      "2091": "Health Center"
    },
    "globals": [
      "CARLOT",
      "HEALTH-CENTER-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SKYCAR-LOT-3",
        "target": "Skycar Lot"
      },
      "SW": {
        "command": "sw",
        "targetId": "MAIN-AND-RIVER",
        "target": "Main & River"
      }
    }
  },
  {
    "id": "THE-COACHMAN",
    "name": "The Coachman",
    "aliases": [
      "The Coachman"
    ],
    "yearNames": {},
    "globals": [
      "RESTAURANT-OBJECT",
      "MENU",
      "PEOPLE"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      },
      "OUT": {
        "command": "out",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      }
    }
  },
  {
    "id": "TUBE-AT-STADIUM",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "TUBE-SIGN",
      "STAIRS",
      "STADIUM-OBJECT",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "BOARDING-PLATFORM",
      "PEOPLE"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "ROCKVIL-STADIUM",
        "target": "Rockvil Stadium"
      },
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-STADIUM",
        "target": "Rockvil Stadium"
      },
      "IN": {
        "command": "in",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "NE": {
        "command": "ne",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "SW": {
        "command": "sw",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-AT-PARK",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "TUBE-SIGN",
      "STAIRS",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "BOARDING-PLATFORM",
      "PEOPLE"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      },
      "OUT": {
        "command": "out",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      },
      "IN": {
        "command": "in",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "NE": {
        "command": "ne",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "SW": {
        "command": "sw",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-AT-HEIMAN",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "TUBE-SIGN",
      "STAIRS",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "BOARDING-PLATFORM",
      "PEOPLE"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "IN": {
        "command": "in",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "NE": {
        "command": "ne",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "SW": {
        "command": "sw",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-AT-FACTORY",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "TUBE-SIGN",
      "STAIRS",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "BOARDING-PLATFORM",
      "PEOPLE"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "OUT": {
        "command": "out",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "IN": {
        "command": "in",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "NE": {
        "command": "ne",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "SW": {
        "command": "sw",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-AT-AIRPORT",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "TUBE-SIGN",
      "AIRPORT-TERMINAL-OBJECT",
      "RAILROAD-TRACKS",
      "PEOPLE",
      "TUBE-STATION",
      "BOARDING-PLATFORM"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "TERMINAL",
        "target": "Terminal"
      },
      "OUT": {
        "command": "out",
        "targetId": "TERMINAL",
        "target": "Terminal"
      },
      "SE": {
        "command": "se",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "NW": {
        "command": "nw",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "IN": {
        "command": "in",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-AT-BODANSKI",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "TUBE-SIGN",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "BOARDING-PLATFORM",
      "PEOPLE"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "OUT": {
        "command": "out",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "SE": {
        "command": "se",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "NW": {
        "command": "nw",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "IN": {
        "command": "in",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-AT-UNIVERSITY",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "TUBE-SIGN",
      "RAILROAD-TRACKS",
      "TUBE-STATION",
      "BOARDING-PLATFORM",
      "PEOPLE"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "SE": {
        "command": "se",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "NW": {
        "command": "nw",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "IN": {
        "command": "in",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "TUBE-JUNCTION",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "TUBE-SIGN",
      "SKYBUS-TERMINAL-OBJECT",
      "RAILROAD-TRACKS",
      "PEOPLE",
      "TUBE-STATION",
      "BOARDING-PLATFORM"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "SKYBUS-TERMINAL",
        "target": "Skybus Terminal"
      },
      "OUT": {
        "command": "out",
        "targetId": "SKYBUS-TERMINAL",
        "target": "Skybus Terminal"
      },
      "NE": {
        "command": "ne",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      },
      "NW": {
        "command": "nw",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "SE": {
        "command": "se",
        "targetId": "BROWN-TUBECAR",
        "target": "Tubecar"
      },
      "SW": {
        "command": "sw",
        "targetId": "RED-TUBECAR",
        "target": "Tubecar"
      }
    }
  },
  {
    "id": "ZOO-ENTRANCE",
    "name": "Zoo Entrance",
    "aliases": [
      "Zoo Entrance"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "PEOPLE",
      "ZOO-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "STADIUM-LOT-A",
        "target": "Stadium Lot A"
      },
      "EAST": {
        "command": "east",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "ZOO",
        "target": "Zoo"
      },
      "WEST": {
        "command": "west",
        "targetId": "AQUARIUM-UNDERPASS",
        "target": "Aquarium Underpass"
      },
      "IN": {
        "command": "in",
        "targetId": "ZOO",
        "target": "Zoo"
      }
    }
  },
  {
    "id": "DINING-ROOM",
    "name": "Dining Room",
    "aliases": [
      "Dining Room"
    ],
    "yearNames": {},
    "globals": [
      "LIVING-ROOM-OBJECT",
      "KITCHEN",
      "DINING-ROOM-OBJECT",
      "BAMBOO-SCREEN",
      "GLOBAL-TABLE"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "EPILOGUE-LIVING-ROOM",
        "target": "Living Room"
      },
      "EAST": {
        "command": "east",
        "targetId": "EPILOGUE-KITCHEN",
        "target": "Kitchen"
      },
      "IN": {
        "command": "in",
        "targetId": "EPILOGUE-KITCHEN",
        "target": "Kitchen"
      },
      "OUT": {
        "command": "out",
        "targetId": "EPILOGUE-LIVING-ROOM",
        "target": "Living Room"
      }
    }
  },
  {
    "id": "ELM-AND-RIVER",
    "name": "Elm & River",
    "aliases": [
      "Elm & River"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "STOCK-EXCHANGE-OBJECT",
      "MALL-OBJECT",
      "HEIMAN-VILLAGE-OBJECT",
      "TUBE-STATION",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MAIN-AND-RIVER",
        "target": "Main & River"
      },
      "NE": {
        "command": "ne",
        "targetId": "HEIMAN-VILLAGE",
        "target": "Heiman Village"
      },
      "EAST": {
        "command": "east",
        "targetId": "HEIMAN-VILLAGE",
        "target": "Heiman Village"
      },
      "SE": {
        "command": "se",
        "targetId": "HEIMAN-VILLAGE",
        "target": "Heiman Village"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "WEST": {
        "command": "west",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "ROCKVIL-MALL",
        "target": "Rockvil Mall"
      },
      "NW": {
        "command": "nw",
        "targetId": "STOCK-EXCHANGE",
        "target": "Stock Exchange"
      }
    }
  },
  {
    "id": "INTERCHANGE",
    "name": "Interchange",
    "aliases": [
      "Interchange"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "INTERCHANGE-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "HALLEY-AND-UNIVERSITY",
        "target": "Halley & University"
      }
    }
  },
  {
    "id": "LIVING-ROOM",
    "name": "Living Room",
    "aliases": [
      "Living Room"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "APARTMENT-OBJECT",
      "APARTMENT-WINDOW",
      "APARTMENT-DOOR",
      "HALLWAY",
      "CHILDREN",
      "KITCHEN-OBJECT",
      "LIVING-ROOM-OBJECT",
      "BEDROOM-OBJECT",
      "WOMAN",
      "PARKVIEW-APARTMENTS-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "BEDROOM",
        "target": "Bedroom"
      },
      "EAST": {
        "command": "east",
        "targetId": "KITCHEN",
        "target": "Kitchen"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      },
      "OUT": {
        "command": "out",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      }
    }
  },
  {
    "id": "EPILOGUE-LIVING-ROOM",
    "name": "Living Room",
    "aliases": [
      "Living Room"
    ],
    "yearNames": {},
    "globals": [
      "LIVING-ROOM-OBJECT",
      "HALLWAY",
      "BEDROOM-OBJECT",
      "SOLARIUM-OBJECT",
      "DINING-ROOM-OBJECT",
      "STAIRS",
      "FIREPLACE",
      "BAMBOO-SCREEN"
    ],
    "exits": {
      "UP": {
        "command": "up",
        "targetId": "MASTER-BEDROOM",
        "target": "Master Bedroom"
      },
      "EAST": {
        "command": "east",
        "targetId": "DINING-ROOM",
        "target": "Dining Room"
      },
      "NORTH": {
        "command": "north",
        "targetId": "FOYER",
        "target": "Foyer"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SOLARIUM",
        "target": "Solarium"
      }
    }
  },
  {
    "id": "POST-OFFICE",
    "name": "Post Office",
    "aliases": [
      "Post Office"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "GLOBAL-WINDOW",
      "POST-OFFICE-OBJECT",
      "COUNTER",
      "PEOPLE"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      }
    }
  },
  {
    "id": "WATER-TOWER",
    "name": "Water Tower",
    "aliases": [
      "Water Tower"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "FENCE",
      "WATER",
      "RESERVOIR",
      "JAIL-OBJECT",
      "CARLOT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ROCKVIL-REFORMATORY",
        "target": "Rockvil Reformatory"
      },
      "SE": {
        "command": "se",
        "targetId": "RIVER-AND-PARK",
        "target": "River & Park"
      },
      "SW": {
        "command": "sw",
        "targetId": "STADIUM-LOT-C",
        "target": "Stadium Lot C"
      },
      "WEST": {
        "command": "west",
        "targetId": "PARK-UNDERPASS",
        "target": "Park Underpass"
      }
    }
  },
  {
    "id": "COURTHOUSE",
    "name": "Courthouse",
    "aliases": [
      "Courthouse"
    ],
    "yearNames": {},
    "globals": [
      "COURTHOUSE-OBJECT",
      "WOMAN",
      "PEOPLE"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-AND-PARK",
        "target": "Elm & Park"
      }
    }
  },
  {
    "id": "DRUG-STORE",
    "name": "Drug Store",
    "aliases": [
      "Drug Store"
    ],
    "yearNames": {},
    "globals": [
      "DRUG-STORE-OBJECT",
      "COUNTER",
      "PEOPLE"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "BEND",
        "target": "Bend"
      },
      "OUT": {
        "command": "out",
        "targetId": "BEND",
        "target": "Bend"
      }
    }
  },
  {
    "id": "ELM-AND-PARK",
    "name": "Elm & Park",
    "aliases": [
      "Elm & Park"
    ],
    "yearNames": {},
    "globals": [
      "COURTHOUSE-OBJECT",
      "PARK-OBJECT",
      "POST-OFFICE-OBJECT",
      "TOWNHOUSE",
      "CONSTRUCTION-OBJECT",
      "GATE",
      "POLICE-STATION-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      },
      "EAST": {
        "command": "east",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "SE": {
        "command": "se",
        "targetId": "POST-OFFICE",
        "target": "Post Office"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "SW": {
        "command": "sw",
        "targetId": "POLICE-STATION",
        "target": "Police Station"
      },
      "WEST": {
        "command": "west",
        "targetId": "ELM-AND-UNIVERSITY",
        "target": "Elm & University"
      },
      "NE": {
        "command": "ne",
        "targetId": "KENNEDY-PARK",
        "target": "Kennedy Park"
      },
      "NW": {
        "command": "nw",
        "targetId": "COURTHOUSE",
        "target": "Courthouse"
      }
    }
  },
  {
    "id": "EZZIS-BAR",
    "name": "Ezzi's Bar",
    "aliases": [
      "Ezzi's Bar"
    ],
    "yearNames": {},
    "globals": [
      "BAR-OBJECT",
      "COUNTER",
      "PEOPLE"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "ELM-UNDERPASS",
        "target": "Elm Underpass"
      },
      "OUT": {
        "command": "out",
        "targetId": "ELM-UNDERPASS",
        "target": "Elm Underpass"
      }
    }
  },
  {
    "id": "GUEST-ROOM",
    "name": "Guest Room",
    "aliases": [
      "Guest Room"
    ],
    "yearNames": {},
    "globals": [
      "HALLWAY",
      "BEDROOM-OBJECT"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "FOYER",
        "target": "Foyer"
      },
      "OUT": {
        "command": "out",
        "targetId": "FOYER",
        "target": "Foyer"
      }
    }
  },
  {
    "id": "HUANG-HALL",
    "name": "Huang Hall",
    "aliases": [
      "Huang Hall"
    ],
    "yearNames": {},
    "globals": [
      "PARK-OBJECT",
      "HUANG-HALL-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "CENTRE-AND-KENNEDY",
        "target": "Centre & Kennedy"
      },
      "WEST": {
        "command": "west",
        "targetId": "HALLEY-AND-PARK",
        "target": "Halley & Park"
      },
      "NORTH": {
        "command": "north",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      }
    }
  },
  {
    "id": "LAUNDROMAT",
    "name": "Laundromat",
    "aliases": [
      "Laundromat"
    ],
    "yearNames": {},
    "globals": [],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "BEND",
        "target": "Bend"
      },
      "OUT": {
        "command": "out",
        "targetId": "BEND",
        "target": "Bend"
      }
    }
  },
  {
    "id": "ROW-HOUSES",
    "name": "Row Houses",
    "aliases": [
      "Row Houses"
    ],
    "yearNames": {},
    "globals": [
      "UNOPENABLE-DOOR"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "NE": {
        "command": "ne",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "NW": {
        "command": "nw",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      },
      "IN": {
        "command": "in",
        "targetId": "PARKVIEW-HALL",
        "target": "Hall Near Your Apartment"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-1",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "SUPERMARKET",
      "CARLOT",
      "INDUSTRIAL-PARK-OBJECT",
      "NOTE"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "SOUTHWAY-UNDERPASS",
        "target": "Southway Underpass"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-2",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "MALL-OBJECT",
      "CARLOT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "SW": {
        "command": "sw",
        "targetId": "SOUTHWAY-AND-KENNEDY",
        "target": "Southway & Kennedy"
      },
      "NORTH": {
        "command": "north",
        "targetId": "ROCKVIL-MALL",
        "target": "Rockvil Mall"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-3",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "CARLOT",
      "HEALTH-CENTER-OBJECT"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "HEALTH-CENTER",
        "target": "Serf Housing"
      },
      "NW": {
        "command": "nw",
        "targetId": "MIDLAND-AND-RIVER",
        "target": "Midland & River"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-4",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "ZOO-OBJECT",
      "PARK-OBJECT",
      "CARLOT",
      "GATE",
      "AQUARIUM-OBJECT",
      "HALLEY-ESTATES-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "WEST": {
        "command": "west",
        "targetId": "ZOO",
        "target": "Zoo"
      },
      "EAST": {
        "command": "east",
        "targetId": "AQUARIUM",
        "target": "Aquarium"
      },
      "SE": {
        "command": "se",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-5",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "VACANT-LOT",
      "CARLOT",
      "CHURCH-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "FIRST-METHODIST-CHURCH",
        "target": "Vacant Lot"
      },
      "EAST": {
        "command": "east",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "WEST": {
        "command": "west",
        "targetId": "PARK-ENTRANCE",
        "target": "Entrance to Halley Estates"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-6",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "FENCE",
      "MOVIE-THEATRE-OBJECT",
      "PARK-OBJECT",
      "CARLOT",
      "SYMPHONY-HALL-OBJECT",
      "UNOPENABLE-DOOR"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "MUSEUM-ENTRANCE",
        "target": "Museum Entrance"
      },
      "NORTH": {
        "command": "north",
        "targetId": "SYMPHONY-HALL",
        "target": "Symphony Hall"
      },
      "EAST": {
        "command": "east",
        "targetId": "RIVERSIDE-PARK",
        "target": "Riverside Park"
      },
      "WEST": {
        "command": "west",
        "targetId": "CINEMA",
        "target": "Cinema"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-7",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-SIGN",
      "FENCE",
      "MOVIE-THEATRE-OBJECT",
      "CARLOT",
      "HOTEL-OBJECT",
      "SYMPHONY-HALL-OBJECT",
      "UNOPENABLE-DOOR"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "SYMPHONY-ENTRANCE",
        "target": "Symphony Entrance"
      },
      "WEST": {
        "command": "west",
        "targetId": "COLONIAL-HOTEL",
        "target": "Colonial Hotel"
      },
      "EAST": {
        "command": "east",
        "targetId": "SYMPHONY-HALL",
        "target": "Symphony Hall"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "CINEMA",
        "target": "Cinema"
      }
    }
  },
  {
    "id": "ST-MICHAELS",
    "name": "Vacant Lot",
    "aliases": [
      "Vacant Lot",
      "St. Michael's"
    ],
    "yearNames": {
      "2041": "St. Michael's",
      "2051": "St. Michael's",
      "2061": "St. Michael's",
      "2071": "Vacant Lot",
      "2081": "St. Michael's",
      "2091": "St. Michael's"
    },
    "globals": [
      "VACANT-LOT",
      "CHURCH-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "CHURCH-ENTRANCE",
        "target": "Street by Vacant Lot"
      },
      "OUT": {
        "command": "out",
        "targetId": "CHURCH-ENTRANCE",
        "target": "Street by Vacant Lot"
      }
    }
  },
  {
    "id": "FIRST-METHODIST-CHURCH",
    "name": "Vacant Lot",
    "aliases": [
      "Vacant Lot",
      "First Methodist Church"
    ],
    "yearNames": {
      "2041": "First Methodist Church",
      "2051": "First Methodist Church",
      "2061": "First Methodist Church",
      "2071": "Vacant Lot",
      "2081": "First Methodist Church",
      "2091": "First Methodist Church"
    },
    "globals": [
      "VACANT-LOT",
      "CARLOT",
      "CHURCH-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      },
      "OUT": {
        "command": "out",
        "targetId": "AQUARIUM-AND-RIVER",
        "target": "Aquarium & River"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "SKYCAR-LOT-5",
        "target": "Skycar Lot"
      }
    }
  },
  {
    "id": "BASE-GATE",
    "name": "Base Gate",
    "aliases": [
      "Base Gate"
    ],
    "yearNames": {},
    "globals": [
      "BSF-BASE",
      "FENCE",
      "GATE",
      "GUN"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "SYMPHONY-ENTRANCE",
        "target": "Symphony Entrance"
      }
    }
  },
  {
    "id": "BOOKSTORE",
    "name": "Bookstore",
    "aliases": [
      "Bookstore"
    ],
    "yearNames": {},
    "globals": [
      "SHELVES",
      "BOOKSTORE-OBJECT"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      },
      "OUT": {
        "command": "out",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      }
    }
  },
  {
    "id": "CITY-DUMP",
    "name": "City Dump",
    "aliases": [
      "City Dump"
    ],
    "yearNames": {},
    "globals": [
      "FENCE",
      "RIVER",
      "RIVER-BANK",
      "WATER",
      "DUMP-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "DUMP-ENTRANCE",
        "target": "Dump Entrance"
      },
      "OUT": {
        "command": "out",
        "targetId": "DUMP-ENTRANCE",
        "target": "Dump Entrance"
      }
    }
  },
  {
    "id": "CITY-HALL",
    "name": "City Hall",
    "aliases": [
      "City Hall"
    ],
    "yearNames": {},
    "globals": [
      "CITY-HALL-OBJECT"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      },
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      }
    }
  },
  {
    "id": "FIREHOUSE",
    "name": "Firehouse",
    "aliases": [
      "Firehouse"
    ],
    "yearNames": {},
    "globals": [
      "FIREHOUSE-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "SOUTHWAY-UNDERPASS",
        "target": "Southway Underpass"
      },
      "OUT": {
        "command": "out",
        "targetId": "SOUTHWAY-UNDERPASS",
        "target": "Southway Underpass"
      }
    }
  },
  {
    "id": "FOODVILLE-1",
    "name": "Foodville",
    "aliases": [
      "Foodville"
    ],
    "yearNames": {},
    "globals": [
      "SUPERMARKET",
      "CARLOT",
      "SHELVES"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SOUTHWAY-AND-PARK",
        "target": "Southway & Park"
      },
      "SW": {
        "command": "sw",
        "targetId": "SKYCAR-LOT-1",
        "target": "Skycar Lot"
      }
    }
  },
  {
    "id": "FOODVILLE-2",
    "name": "Foodville",
    "aliases": [
      "Foodville"
    ],
    "yearNames": {},
    "globals": [
      "SUPERMARKET",
      "GLASS",
      "SHELVES"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      },
      "OUT": {
        "command": "out",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      }
    }
  },
  {
    "id": "JAIL-CELL",
    "name": "Jail Cell",
    "aliases": [
      "Jail Cell"
    ],
    "yearNames": {},
    "globals": [
      "JAIL-OBJECT",
      "UNOPENABLE-DOOR"
    ],
    "exits": {}
  },
  {
    "id": "POOL-HALL",
    "name": "Pool Hall",
    "aliases": [
      "Pool Hall"
    ],
    "yearNames": {},
    "globals": [
      "POOL-HALL-OBJECT",
      "PIER-OBJECT",
      "SMOKE",
      "PEOPLE"
    ],
    "exits": {
      "SW": {
        "command": "sw",
        "targetId": "PIER",
        "target": "Pier"
      },
      "OUT": {
        "command": "out",
        "targetId": "PIER",
        "target": "Pier"
      }
    }
  },
  {
    "id": "WAREHOUSE-1",
    "name": "Warehouse",
    "aliases": [
      "Warehouse",
      "Vacant Lot"
    ],
    "yearNames": {
      "2041": "Warehouse",
      "2051": "Warehouse",
      "2061": "Vacant Lot",
      "2071": "Vacant Lot",
      "2081": "Vacant Lot",
      "2091": "Vacant Lot"
    },
    "globals": [
      "VACANT-LOT",
      "WAREHOUSE-OBJECT",
      "FENCE",
      "RAILROAD-TRACKS"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      }
    }
  },
  {
    "id": "WAREHOUSE-2",
    "name": "Warehouse",
    "aliases": [
      "Warehouse"
    ],
    "yearNames": {},
    "globals": [
      "WAREHOUSE-OBJECT"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      },
      "OUT": {
        "command": "out",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      }
    }
  },
  {
    "id": "AQUARIUM",
    "name": "Aquarium",
    "aliases": [
      "Aquarium"
    ],
    "yearNames": {},
    "globals": [
      "EXHIBITS",
      "PARK-OBJECT",
      "CARLOT",
      "WATER",
      "AQUARIUM-OBJECT"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "WEST": {
        "command": "west",
        "targetId": "SKYCAR-LOT-4",
        "target": "Skycar Lot"
      },
      "NW": {
        "command": "nw",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "HALLEY-PARK-EAST",
        "target": "Halley Park East"
      }
    }
  },
  {
    "id": "BATHROOM",
    "name": "Bathroom",
    "aliases": [
      "Bathroom"
    ],
    "yearNames": {},
    "globals": [
      "APARTMENT-OBJECT",
      "WATER",
      "BEDROOM-OBJECT",
      "SINK",
      "BATHROOM-OBJECT",
      "PARKVIEW-APARTMENTS-OBJECT"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "BEDROOM",
        "target": "Bedroom"
      },
      "WEST": {
        "command": "west",
        "targetId": "BEDROOM",
        "target": "Bedroom"
      }
    }
  },
  {
    "id": "CEMETERY",
    "name": "Cemetery",
    "aliases": [
      "Cemetery"
    ],
    "yearNames": {},
    "globals": [
      "GRAFFITI",
      "WATER",
      "RIVER",
      "CEMETERY-OBJECT",
      "CONSTRUCTION-OBJECT",
      "GATE",
      "RIVER-BANK"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "MAIN-AND-WICKER",
        "target": "Main & Wicker"
      },
      "SW": {
        "command": "sw",
        "targetId": "MAIN-AND-CHURCH",
        "target": "Main & Church"
      },
      "WEST": {
        "command": "west",
        "targetId": "CHURCH-ENTRANCE",
        "target": "Street by Vacant Lot"
      },
      "NW": {
        "command": "nw",
        "targetId": "MIDLAND-AND-CHURCH",
        "target": "Midland & Church"
      }
    }
  },
  {
    "id": "DUNBARS",
    "name": "Dunbar's",
    "aliases": [
      "Dunbar's"
    ],
    "yearNames": {},
    "globals": [
      "DUNBARS-OBJECT",
      "PEOPLE"
    ],
    "exits": {
      "NW": {
        "command": "nw",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      },
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-CENTRE",
        "target": "Rockvil Centre"
      }
    }
  },
  {
    "id": "GUN-SHOP",
    "name": "Gun Shop",
    "aliases": [
      "Gun Shop"
    ],
    "yearNames": {},
    "globals": [
      "COUNTER",
      "GUN",
      "GUN-SHOP-OBJECT"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      },
      "OUT": {
        "command": "out",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      }
    }
  },
  {
    "id": "HOSPITAL",
    "name": "Hospital",
    "aliases": [
      "Hospital"
    ],
    "yearNames": {},
    "globals": [
      "HOSPITAL-OBJECT",
      "ANNEX-OBJECT",
      "HALLWAY",
      "DESK"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "ELM-AND-KENNEDY",
        "target": "Elm & Kennedy"
      },
      "SW": {
        "command": "sw",
        "targetId": "HOSPITAL-ANNEX",
        "target": "Hospital Annex"
      }
    }
  },
  {
    "id": "JOYBOOTH",
    "name": "Joybooth",
    "aliases": [
      "Joybooth"
    ],
    "yearNames": {},
    "globals": [
      "JOYBOOTH-OBJECT",
      "SLOT"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-MALL",
        "target": "Rockvil Mall"
      },
      "WEST": {
        "command": "west",
        "targetId": "ROCKVIL-MALL",
        "target": "Rockvil Mall"
      }
    }
  },
  {
    "id": "SOLARIUM",
    "name": "Solarium",
    "aliases": [
      "Solarium"
    ],
    "yearNames": {},
    "globals": [
      "LIVING-ROOM-OBJECT",
      "SOLARIUM-OBJECT",
      "PATIO-OBJECT"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "PATIO",
        "target": "Patio"
      },
      "NORTH": {
        "command": "north",
        "targetId": "EPILOGUE-LIVING-ROOM",
        "target": "Living Room"
      },
      "IN": {
        "command": "in",
        "targetId": "EPILOGUE-LIVING-ROOM",
        "target": "Living Room"
      },
      "OUT": {
        "command": "out",
        "targetId": "PATIO",
        "target": "Patio"
      }
    }
  },
  {
    "id": "TENEMENT-1",
    "name": "Tenement",
    "aliases": [
      "Tenement"
    ],
    "yearNames": {},
    "globals": [
      "TENEMENT-OBJECT"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "POWER-STATION-ENTRANCE",
        "target": "Power Station Entrance"
      },
      "WEST": {
        "command": "west",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      }
    }
  },
  {
    "id": "TENEMENT-2",
    "name": "Tenement",
    "aliases": [
      "Tenement"
    ],
    "yearNames": {},
    "globals": [
      "TENEMENT-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      },
      "OUT": {
        "command": "out",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      }
    }
  },
  {
    "id": "TENEMENT-3",
    "name": "Tenement",
    "aliases": [
      "Tenement"
    ],
    "yearNames": {},
    "globals": [
      "TENEMENT-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      },
      "OUT": {
        "command": "out",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      }
    }
  },
  {
    "id": "TERMINAL",
    "name": "Terminal",
    "aliases": [
      "Terminal"
    ],
    "yearNames": {},
    "globals": [
      "STAIRS",
      "AIRPORT-TERMINAL-OBJECT",
      "GUN",
      "TUBE-STATION",
      "PEOPLE"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "AIRPORT-ENTRANCE",
        "target": "Airport Entrance"
      }
    }
  },
  {
    "id": "BEDROOM",
    "name": "Bedroom",
    "aliases": [
      "Bedroom"
    ],
    "yearNames": {},
    "globals": [
      "APARTMENT-OBJECT",
      "APARTMENT-WINDOW",
      "BEDROOM-OBJECT",
      "BATHROOM-OBJECT",
      "LIVING-ROOM-OBJECT",
      "PARKVIEW-APARTMENTS-OBJECT"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      },
      "OUT": {
        "command": "out",
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      },
      "EAST": {
        "command": "east",
        "targetId": "BATHROOM",
        "target": "Bathroom"
      },
      "IN": {
        "command": "in",
        "targetId": "BATHROOM",
        "target": "Bathroom"
      }
    }
  },
  {
    "id": "KITCHEN",
    "name": "Kitchen",
    "aliases": [
      "Kitchen"
    ],
    "yearNames": {},
    "globals": [
      "SINK",
      "WATER",
      "APARTMENT-OBJECT",
      "KITCHEN-OBJECT",
      "LIVING-ROOM-OBJECT",
      "COUNTER",
      "PARKVIEW-APARTMENTS-OBJECT"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      },
      "OUT": {
        "command": "out",
        "targetId": "LIVING-ROOM",
        "target": "Living Room"
      }
    }
  },
  {
    "id": "EPILOGUE-KITCHEN",
    "name": "Kitchen",
    "aliases": [
      "Kitchen"
    ],
    "yearNames": {},
    "globals": [
      "SINK",
      "KITCHEN",
      "DINING-ROOM-OBJECT"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "DINING-ROOM",
        "target": "Dining Room"
      },
      "OUT": {
        "command": "out",
        "targetId": "DINING-ROOM",
        "target": "Dining Room"
      }
    }
  },
  {
    "id": "SIMONS",
    "name": "Simon's",
    "aliases": [
      "Simon's"
    ],
    "yearNames": {},
    "globals": [
      "RESTAURANT-OBJECT",
      "MENU",
      "PEOPLE"
    ],
    "exits": {
      "SW": {
        "command": "sw",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "OUT": {
        "command": "out",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      }
    }
  },
  {
    "id": "RED-TUBECAR",
    "name": "Tubecar",
    "aliases": [
      "Tubecar"
    ],
    "yearNames": {},
    "globals": [
      "TUBE-SIGN",
      "GRAFFITI",
      "TUBE-STATION",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "BROWN-TUBECAR",
    "name": "Tubecar",
    "aliases": [
      "Tubecar"
    ],
    "yearNames": {},
    "globals": [
      "TUBE-SIGN",
      "GRAFFITI",
      "TUBE-STATION",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "CINEMA",
    "name": "Cinema",
    "aliases": [
      "Cinema"
    ],
    "yearNames": {},
    "globals": [
      "SLOT",
      "MOVIE-THEATRE-OBJECT",
      "CARLOT",
      "HALLWAY",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SKYCAR-LOT-7",
        "target": "Skycar Lot"
      },
      "EAST": {
        "command": "east",
        "targetId": "SKYCAR-LOT-6",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "targetId": "MUSEUM-ENTRANCE",
        "target": "Museum Entrance"
      }
    }
  },
  {
    "id": "SKYCAB",
    "name": "Skycab",
    "aliases": [
      "Skycab"
    ],
    "yearNames": {},
    "globals": [
      "GLOBAL-WINDOW",
      "RIVER",
      "PIER-OBJECT",
      "PARK-OBJECT",
      "MUSEUM-OBJECT",
      "BSF-BASE",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "ALLEY",
    "name": "Alley",
    "aliases": [
      "Alley"
    ],
    "yearNames": {},
    "globals": [
      "BAR-OBJECT",
      "MUSIC"
    ],
    "exits": {
      "OUT": {
        "command": "out",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      },
      "WEST": {
        "command": "west",
        "targetId": "FACTORY-ENTRANCE",
        "target": "Factory Entrance"
      },
      "EAST": {
        "command": "east",
        "targetId": "BAR",
        "target": "Bar"
      },
      "IN": {
        "command": "in",
        "targetId": "BAR",
        "target": "Bar"
      }
    }
  },
  {
    "id": "FOYER",
    "name": "Foyer",
    "aliases": [
      "Foyer"
    ],
    "yearNames": {},
    "globals": [
      "LIVING-ROOM-OBJECT",
      "HALLWAY",
      "BEDROOM-OBJECT",
      "BATHROOM-OBJECT",
      "DEN-OBJECT",
      "STAIRS"
    ],
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "EPILOGUE-LIVING-ROOM",
        "target": "Living Room"
      },
      "SW": {
        "command": "sw",
        "targetId": "EPILOGUE-BATHROOM",
        "target": "Bath"
      },
      "DOWN": {
        "command": "down",
        "targetId": "EPILOGUE-BATHROOM",
        "target": "Bath"
      },
      "EAST": {
        "command": "east",
        "targetId": "GUEST-ROOM",
        "target": "Guest Room"
      },
      "WEST": {
        "command": "west",
        "targetId": "DEN",
        "target": "Den"
      }
    }
  },
  {
    "id": "PATIO",
    "name": "Patio",
    "aliases": [
      "Patio"
    ],
    "yearNames": {},
    "globals": [
      "SOLARIUM-OBJECT",
      "PATIO-OBJECT",
      "RIVER"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SOLARIUM",
        "target": "Solarium"
      },
      "IN": {
        "command": "in",
        "targetId": "SOLARIUM",
        "target": "Solarium"
      }
    }
  },
  {
    "id": "BANK",
    "name": "Bank",
    "aliases": [
      "Bank"
    ],
    "yearNames": {},
    "globals": [
      "BANK-OBJECT"
    ],
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      },
      "OUT": {
        "command": "out",
        "targetId": "AQUARIUM-AND-KENNEDY",
        "target": "Aquarium & Kennedy"
      }
    }
  },
  {
    "id": "EPILOGUE-BATHROOM",
    "name": "Bath",
    "aliases": [
      "Bath"
    ],
    "yearNames": {},
    "globals": [
      "SINK",
      "HALLWAY",
      "BATHROOM-OBJECT",
      "STAIRS"
    ],
    "exits": {
      "NE": {
        "command": "ne",
        "targetId": "FOYER",
        "target": "Foyer"
      },
      "OUT": {
        "command": "out",
        "targetId": "FOYER",
        "target": "Foyer"
      },
      "UP": {
        "command": "up",
        "targetId": "FOYER",
        "target": "Foyer"
      }
    }
  },
  {
    "id": "BEND",
    "name": "Bend",
    "aliases": [
      "Bend"
    ],
    "yearNames": {},
    "globals": [
      "PEOPLE",
      "RAILROAD-BRIDGE",
      "CONSTRUCTION-OBJECT",
      "DRUG-STORE-OBJECT",
      "FENCE",
      "HARDWARE-STORE-OBJECT",
      "HEIMAN-WORLD-OBJECT",
      "RAILROAD-TRACKS"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "NE": {
        "command": "ne",
        "targetId": "CONSTRUCTION-SITE-2",
        "target": "Construction Site"
      },
      "SE": {
        "command": "se",
        "targetId": "WICKER-AND-RIVER",
        "target": "Wicker & River"
      },
      "WEST": {
        "command": "west",
        "targetId": "LAUNDROMAT",
        "target": "Laundromat"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "HARDWARE-STORE",
        "target": "Hardware Store"
      },
      "SW": {
        "command": "sw",
        "targetId": "DRUG-STORE",
        "target": "Drug Store"
      }
    }
  },
  {
    "id": "DORM",
    "name": "Dorm",
    "aliases": [
      "Dorm"
    ],
    "yearNames": {},
    "globals": [
      "DORM-OBJECT",
      "CAMPUS",
      "CONVERSATION",
      "MUSIC"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      },
      "OUT": {
        "command": "out",
        "targetId": "ROCKVIL-UNIVERSITY",
        "target": "Rockvil University"
      }
    }
  },
  {
    "id": "PIER",
    "name": "Pier",
    "aliases": [
      "Pier"
    ],
    "yearNames": {},
    "globals": [
      "WATER",
      "RIVER",
      "RIVER-BANK",
      "BAR-OBJECT",
      "POOL-HALL-OBJECT",
      "PIER-OBJECT"
    ],
    "exits": {
      "SW": {
        "command": "sw",
        "targetId": "BAR",
        "target": "Bar"
      },
      "NW": {
        "command": "nw",
        "targetId": "WICKER-AND-PIER",
        "target": "Wicker & Pier"
      },
      "NE": {
        "command": "ne",
        "targetId": "POOL-HALL",
        "target": "Pool Hall"
      }
    }
  },
  {
    "id": "BURGER-MEISTER",
    "name": "Bar",
    "aliases": [
      "Bar",
      "Burgerworld",
      "Burger Meister"
    ],
    "yearNames": {
      "2041": "Burger Meister",
      "2051": "Burger Meister",
      "2061": "Burgerworld",
      "2071": "Bar",
      "2081": "Burger Meister",
      "2091": "Burger Meister"
    },
    "globals": [
      "RESTAURANT-OBJECT",
      "BAR-OBJECT",
      "COUNTER",
      "SMOKE",
      "GLOBAL-TABLE",
      "MENU",
      "PEOPLE"
    ],
    "exits": {
      "SW": {
        "command": "sw",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      },
      "OUT": {
        "command": "out",
        "targetId": "AQUARIUM-AND-PARK",
        "target": "Aquarium & Park"
      }
    }
  },
  {
    "id": "BAR",
    "name": "Bar",
    "aliases": [
      "Bar"
    ],
    "yearNames": {},
    "globals": [
      "BAR-OBJECT",
      "COUNTER",
      "PIER-OBJECT",
      "MUSIC",
      "SMOKE",
      "BAR",
      "PEOPLE"
    ],
    "exits": {
      "WEST": {
        "command": "west",
        "targetId": "ALLEY",
        "target": "Alley"
      },
      "NE": {
        "command": "ne",
        "targetId": "PIER",
        "target": "Pier"
      }
    }
  },
  {
    "id": "DEN",
    "name": "Den",
    "aliases": [
      "Den"
    ],
    "yearNames": {},
    "globals": [
      "HALLWAY",
      "DEN-OBJECT",
      "FIREPLACE"
    ],
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "FOYER",
        "target": "Foyer"
      },
      "OUT": {
        "command": "out",
        "targetId": "FOYER",
        "target": "Foyer"
      }
    }
  },
  {
    "id": "ZOO",
    "name": "Zoo",
    "aliases": [
      "Zoo"
    ],
    "yearNames": {},
    "globals": [
      "HIGHWAY",
      "ZOO-OBJECT",
      "PARK-OBJECT",
      "CARLOT",
      "CHILDREN",
      "GATE",
      "ANIMAL",
      "HALLEY-ESTATES-OBJECT",
      "GLOBAL-SIGN",
      "PEOPLE"
    ],
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ZOO-ENTRANCE",
        "target": "Zoo Entrance"
      },
      "EAST": {
        "command": "east",
        "targetId": "SKYCAR-LOT-4",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      },
      "SOUTH": {
        "command": "south",
        "targetId": "HALLEY-PARK-WEST",
        "target": "Halley Park West"
      }
    }
  }
];

export const WORLD_OBJECTS: WorldObject[] = [
  {
    "id": "WEATHER-COMPUTER",
    "name": "National Weather Center Computer",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "computer"
    ],
    "adjectives": [
      "national",
      "natl",
      "weather",
      "center"
    ],
    "commandNoun": "national computer",
    "action": "WEATHER-COMPUTER-F",
    "handledVerbs": [
      "STATUS",
      "HELLO"
    ],
    "verbGroups": [
      [
        "STATUS"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "OUTLETS",
    "name": "list of communication outlets",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "list",
      "outlet",
      "outlets",
      "location",
      "locations"
    ],
    "adjectives": [
      "communica",
      "comm"
    ],
    "commandNoun": "communication outlets",
    "action": "OUTLETS-F",
    "handledVerbs": [
      "DISPLAY",
      "READ",
      "WHAT"
    ],
    "verbGroups": [
      [
        "DISPLAY",
        "READ",
        "WHAT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "DISPLAY",
      "READ",
      "WHAT"
    ],
    "guaranteedVerbs": [
      "DISPLAY",
      "READ",
      "WHAT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TRAFFIC-COMPUTER",
    "name": "Metropolitan Traffic Computer",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "computer"
    ],
    "adjectives": [
      "metropoli",
      "metro",
      "traffic"
    ],
    "commandNoun": "metropolitan computer",
    "action": "TRAFFIC-COMPUTER-F",
    "handledVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "verbGroups": [
      [
        "STATUS"
      ],
      [
        "SET"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MORNING-START",
      "MORNING-END",
      "EVENING-START",
      "EVENING-END",
      "INTNUM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RACKS",
    "name": "racks of fashionable clothes",
    "initialLocation": "DUNBARS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "rack",
      "racks",
      "fashion",
      "fashions"
    ],
    "adjectives": [
      "fashionable"
    ],
    "commandNoun": "fashionable",
    "action": "RACKS-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CC-STAFFER",
    "name": "PRISM Project staff member",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "technician",
      "chief",
      "shift",
      "member"
    ],
    "adjectives": [
      "head",
      "night",
      "staff",
      "prism",
      "project"
    ],
    "commandNoun": "project member",
    "action": "CC-STAFFER-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CULTURAL-CENTER",
    "name": "Riverside Cultural Center",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "center"
    ],
    "adjectives": [
      "riverside",
      "cultural"
    ],
    "commandNoun": "riverside center",
    "action": "CULTURAL-CENTER-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "RECEIVER-STATION"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BORDELLO-AD",
    "name": "strip joint advertisement",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT",
      "TAKEBIT",
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "ad",
      "ads",
      "flyers",
      "leaflets",
      "advertise",
      "flyer",
      "photocopi",
      "photocopy",
      "leaflet"
    ],
    "adjectives": [
      "strip",
      "joint",
      "bordello",
      "cheap",
      "cheap-looking",
      "photocopi"
    ],
    "commandNoun": "strip advertisement",
    "action": "BORDELLO-AD-F",
    "handledVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "READ",
        "EXAMINE"
      ],
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "UNSHAVEN-MAN"
    ],
    "removedObjectIds": [
      "UNSHAVEN-MAN"
    ]
  },
  {
    "id": "EVENING-START",
    "name": "evening rush hour start",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "start"
    ],
    "adjectives": [
      "evening",
      "rush",
      "hour"
    ],
    "commandNoun": "evening start",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MORNING-START",
    "name": "morning rush hour start",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "start"
    ],
    "adjectives": [
      "morning",
      "rush",
      "hour"
    ],
    "commandNoun": "morning start",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FORMULA",
    "name": "bottle of baby formula",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ],
    "synonyms": [
      "bottle",
      "bottles",
      "formula"
    ],
    "adjectives": [
      "baby"
    ],
    "commandNoun": "baby formula",
    "action": "FORMULA-F",
    "handledVerbs": [
      "EXAMINE",
      "DRINK",
      "EAT"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "DRINK",
        "EAT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "DRINK",
      "EAT"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "DRINK",
      "EAT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SCOTCH",
    "name": "bottle of cheap scotch",
    "initialLocation": "LIQUOR-STORE",
    "flags": [
      "TAKEBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "bottle",
      "bottles",
      "scotch",
      "brand"
    ],
    "adjectives": [
      "cheap"
    ],
    "commandNoun": "cheap bottle",
    "action": "SCOTCH-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "OPEN",
      "DRINK",
      "CLOSE",
      "READ"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE",
        "OPEN",
        "DRINK"
      ],
      [
        "OPEN",
        "DRINK"
      ],
      [
        "CLOSE"
      ],
      [
        "READ"
      ]
    ],
    "actionRooms": [
      "LIQUOR-STORE",
      "EZZIS-BAR",
      "BAR",
      "BURGER-MEISTER"
    ],
    "globalVerbs": [
      "TAKE",
      "OPEN",
      "DRINK",
      "CLOSE",
      "READ"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "OPEN",
      "DRINK",
      "CLOSE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "LIQUOR-STORE",
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "LIQUOR-STORE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "OTHER-LIQUOR",
      "LIQUOR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "TRANSMITTER",
    "name": "WNN Feeder transmitter",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "LIGHTBIT",
      "ONBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "transmitt"
    ],
    "adjectives": [
      "world",
      "news",
      "network",
      "feeder",
      "wnn"
    ],
    "commandNoun": "feeder transmitter",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "AIR-CONDITIONING-UNIT",
    "name": "air conditioning unit",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "unit",
      "condition"
    ],
    "adjectives": [
      "air",
      "condition",
      "cooling"
    ],
    "commandNoun": "conditioning",
    "action": "AIR-CONDITIONING-UNIT-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SABOTEURS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "LOGIC-GAME",
    "name": "electronic logic game",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "game"
    ],
    "adjectives": [
      "new",
      "electronic",
      "logic",
      "mitchell",
      "favorite"
    ],
    "commandNoun": "electronic game",
    "action": "LOGIC-GAME-F",
    "handledVerbs": [
      "EXAMINE",
      "TAKE",
      "PLAY",
      "PLAY-WITH"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "TAKE",
        "PLAY",
        "PLAY-WITH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "PLAY",
      "PLAY-WITH"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "TAKE",
      "PLAY",
      "PLAY-WITH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "EVENING-END",
    "name": "evening rush hour end",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "end"
    ],
    "adjectives": [
      "evening",
      "rush",
      "hour"
    ],
    "commandNoun": "evening end",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JANITORIAL-CONTROLLER",
    "name": "Janitorial Controller",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "controlle"
    ],
    "adjectives": [
      "janitoria"
    ],
    "commandNoun": "janitorial controller",
    "action": "JANITORIAL-CONTROLLER-F",
    "handledVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "verbGroups": [
      [
        "STATUS"
      ],
      [
        "SET"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "FLOORS",
      "BATHROOMS",
      "GARBAGE",
      "ROTATING",
      "INTNUM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "JANITORIAL-INSTRUCTIONS",
    "name": "JANITORIAL.CONTROLLER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MORNING-END",
    "name": "morning rush hour end",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "end"
    ],
    "adjectives": [
      "morning",
      "rush",
      "hour"
    ],
    "commandNoun": "morning end",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RYDER",
    "name": "Senator Richard Ryder",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "ryder",
      "senator"
    ],
    "adjectives": [
      "senator",
      "richard"
    ],
    "commandNoun": "ryder",
    "action": "RYDER-F",
    "handledVerbs": [
      "TELL",
      "CALL",
      "EXAMINE",
      "LISTEN"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "CALL"
      ],
      [
        "EXAMINE"
      ],
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "CALL",
      "EXAMINE",
      "LISTEN"
    ],
    "guaranteedVerbs": [
      "TELL",
      "CALL",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "OFFICE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PERELMAN",
      "COFFEE"
    ],
    "removedObjectIds": [
      "RYDER",
      "PERELMAN",
      "COFFEE"
    ]
  },
  {
    "id": "SIMULATION-CONTROLLER",
    "name": "Simulation Controller",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "controlle",
      "processor"
    ],
    "adjectives": [
      "simulatio",
      "sim"
    ],
    "commandNoun": "simulation controller",
    "action": "SIMULATION-CONTROLLER-F",
    "handledVerbs": [
      "STATUS",
      "HELLO"
    ],
    "verbGroups": [
      [
        "STATUS"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "RECORD-BUFFER",
      "INTERFACE-MODE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SIMULATION-INSTRUCTIONS",
    "name": "SIMULATION.CONTROLLER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "REPORT-BUFFER",
    "name": "Special Report buffer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "BUFFERBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "buffer"
    ],
    "adjectives": [
      "report",
      "special"
    ],
    "commandNoun": "special buffer",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ENTERTAINMENT-CENTER",
    "name": "entertainment center",
    "initialLocation": "DEN",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "center",
      "ec"
    ],
    "adjectives": [
      "entertainment",
      "wall-mounted"
    ],
    "commandNoun": "entertainment center",
    "action": "ENTERTAINMENT-CENTER-F",
    "handledVerbs": [
      "EXAMINE",
      "ON"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "ON"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "ON"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PORT-LIST",
    "name": "List of Active Ports",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "READBIT",
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "list",
      "port",
      "ports"
    ],
    "adjectives": [
      "active"
    ],
    "commandNoun": "active ports",
    "action": "PORT-LIST-F",
    "handledVerbs": [
      "READ",
      "DISPLAY",
      "WHAT",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "DISPLAY",
        "WHAT",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "DISPLAY",
      "WHAT",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "DISPLAY",
      "WHAT",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SIMULATION-CONTROLLER",
      "HVAC-CONTROLLER",
      "JANITORIAL-CONTROLLER",
      "TRAFFIC-COMPUTER",
      "WEATHER-COMPUTER",
      "WNN-FEEDER",
      "AUDITING-SYSTEM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "AUDIT-PERCENT",
    "name": "auditing percentage",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "VOWELBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "percent",
      "percentag"
    ],
    "adjectives": [
      "audit",
      "auditing"
    ],
    "commandNoun": "auditing percentage",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BROWN-TUBECAR-DOOR",
    "name": "brown tubecar doors",
    "initialLocation": "BROWN-TUBECAR",
    "flags": [
      "DOORBIT",
      "NDESCBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "door",
      "doors"
    ],
    "adjectives": [
      "tubecar",
      "brown"
    ],
    "commandNoun": "tubecar doors",
    "action": "BROWN-TUBECAR-DOOR-F",
    "handledVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "OPEN",
        "CLOSE"
      ]
    ],
    "actionRooms": [
      "BROWN-TUBECAR"
    ],
    "globalVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "BROWN-TUBECAR"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "BROWN-TUBECAR"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BROWN-TUBECAR-OBJECT",
      "RED-TUBECAR-DOOR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "COMM-MODE",
    "name": "Communications Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "mode"
    ],
    "adjectives": [
      "communica",
      "comm"
    ],
    "commandNoun": "communications mode",
    "action": "COMM-MODE-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GOVERNMENT-OFFICIAL",
    "name": "government official",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT"
    ],
    "synonyms": [
      "official"
    ],
    "adjectives": [
      "government",
      "govt"
    ],
    "commandNoun": "government official",
    "action": "GOVERNMENT-OFFICIAL-F",
    "handledVerbs": [
      "TELL",
      "SIT-NEXT-TO"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "SIT-NEXT-TO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "SIT-NEXT-TO"
    ],
    "guaranteedVerbs": [
      "TELL",
      "SIT-NEXT-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CITY-HALL"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "OFFICIAL-SNACK",
      "BENCH"
    ],
    "removedObjectIds": [
      "OFFICIAL-SNACK"
    ]
  },
  {
    "id": "AUDITING-SYSTEM",
    "name": "IRS Auditing System",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "system"
    ],
    "adjectives": [
      "irs",
      "internal",
      "revenue",
      "service",
      "auditing"
    ],
    "commandNoun": "auditing system",
    "action": "AUDITING-SYSTEM-F",
    "handledVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "verbGroups": [
      [
        "STATUS"
      ],
      [
        "SET"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "AUDIT-PERCENT",
      "INTNUM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SABOTEURS",
    "name": "maintenance workers",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "workers",
      "saboteurs",
      "worker",
      "saboteur",
      "man",
      "men"
    ],
    "adjectives": [
      "maintenan",
      "furtive"
    ],
    "commandNoun": "maintenance workers",
    "action": "SABOTEURS-F",
    "handledVerbs": [
      "TELL",
      "TELL-ABOUT",
      "ASK-ABOUT",
      "ASK-FOR",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "TELL-ABOUT",
        "ASK-ABOUT",
        "ASK-FOR"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "TELL-ABOUT",
      "ASK-ABOUT",
      "ASK-FOR",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TELL",
      "TELL-ABOUT",
      "ASK-ABOUT",
      "ASK-FOR",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CORE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "NEWSPAPER-DISPENSER",
    "name": "newspaper dispenser",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "dispenser",
      "box"
    ],
    "adjectives": [
      "newspaper"
    ],
    "commandNoun": "newspaper dispenser",
    "action": "NEWSPAPER-DISPENSER-F",
    "handledVerbs": [
      "EXAMINE",
      "OPEN",
      "PUT"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "OPEN"
      ],
      [
        "PUT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "OPEN",
      "PUT"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "OPEN",
      "PUT"
    ],
    "refusalOnlyVerbs": [
      "OPEN"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "BODANSKI-SQUARE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CREDIT-CARD",
      "SLOT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "PARKVIEW-APARTMENTS-OBJECT",
    "name": "Parkview Apartments",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "apartment"
    ],
    "adjectives": [
      "parkview"
    ],
    "commandNoun": "parkview apartments",
    "action": "PARKVIEW-APARTMENTS-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "EXIT",
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SOUTHWAY-AND-PARK",
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "SOUTHWAY-AND-PARK"
      ],
      "WALK-TO": [
        "SOUTHWAY-AND-PARK"
      ],
      "EXIT": [
        "PARKVIEW-APARTMENTS",
        "SOUTHWAY-AND-PARK"
      ],
      "LEAVE": [
        "PARKVIEW-APARTMENTS",
        "SOUTHWAY-AND-PARK"
      ],
      "DISEMBARK": [
        "PARKVIEW-APARTMENTS",
        "SOUTHWAY-AND-PARK"
      ],
      "EXAMINE": [
        "PARKVIEW-APARTMENTS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "COUNTRYSIDE",
    "name": "rolling countryside",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "countrysi"
    ],
    "adjectives": [
      "rolling"
    ],
    "commandNoun": "rolling countryside",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MEMORY-BANKS",
    "name": "row of memory banks",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "banks",
      "row",
      "rows",
      "bank"
    ],
    "adjectives": [
      "memory"
    ],
    "commandNoun": "memory banks",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SPARE-PARTS",
    "name": "bin of spare parts",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "part",
      "parts",
      "bin"
    ],
    "adjectives": [
      "neatly",
      "organized",
      "spare"
    ],
    "commandNoun": "spare parts",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CHURCH-STREET-CITY-OBJECT",
    "name": "Church Street City",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "city",
      "structure",
      "ic"
    ],
    "adjectives": [
      "church",
      "street",
      "indoor",
      "fairly",
      "recent",
      "low-quality",
      "low",
      "quality"
    ],
    "commandNoun": "church city",
    "action": "CHURCH-STREET-CITY-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-CHURCH",
      "HEIMAN-VILLAGE",
      "CHURCH-STREET-PARK"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "MAIN-AND-CHURCH",
        "HEIMAN-VILLAGE"
      ],
      "THROUGH": [
        "MAIN-AND-CHURCH",
        "HEIMAN-VILLAGE"
      ],
      "DISEMBARK": [
        "CHURCH-STREET-PARK"
      ],
      "LEAVE": [
        "CHURCH-STREET-PARK"
      ],
      "EXAMINE": [
        "CHURCH-STREET-PARK"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HIGHWAY",
    "name": "interstate highway",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "highway",
      "roadway",
      "interstate"
    ],
    "adjectives": [
      "interstate",
      "old",
      "elevated"
    ],
    "commandNoun": "interstate",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "NATIONAL-GUARDSMAN",
    "name": "National Guardsman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "guard",
      "guards",
      "guardsman",
      "guardsmen"
    ],
    "adjectives": [
      "national",
      "natl",
      "rifle-bearing"
    ],
    "commandNoun": "national guardsman",
    "action": "BSF-GUARDS-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CONTROL-CENTER"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BSF-GUARDS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RESIGNATION-LETTER",
    "name": "RESIGNATION.LETTER",
    "initialLocation": "PERELMAN-PERSONAL-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ROTATING",
    "name": "rotating functions",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "functions"
    ],
    "adjectives": [
      "rotating"
    ],
    "commandNoun": "rotating functions",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "UNIVERSITY-HEIGHTS-OBJECT",
    "name": "University Heights",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "heights",
      "complex"
    ],
    "adjectives": [
      "tall",
      "apartment",
      "universit"
    ],
    "commandNoun": "university heights",
    "action": "UNIVERSITY-HEIGHTS-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ELM-AND-UNIVERSITY",
      "UNIVERSITY-HEIGHTS"
    ],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH"
    ],
    "guaranteedVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "LEAVE": [
        "ELM-AND-UNIVERSITY"
      ],
      "DISEMBARK": [
        "ELM-AND-UNIVERSITY"
      ],
      "EXAMINE": [
        "UNIVERSITY-HEIGHTS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TIMBERS",
    "name": "blackened timbers",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "timber",
      "timbers",
      "beam",
      "beams"
    ],
    "adjectives": [
      "blackened",
      "burned"
    ],
    "commandNoun": "blackened timbers",
    "action": "TIMBERS-F",
    "handledVerbs": [
      "MOVE",
      "TOUCH"
    ],
    "verbGroups": [
      [
        "MOVE",
        "TOUCH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "MOVE",
      "TOUCH"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "THE-COACHMAN"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BOARDING-PLATFORM",
    "name": "boarding platform",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "platform"
    ],
    "adjectives": [
      "boarding"
    ],
    "commandNoun": "boarding platform",
    "action": "BOARDING-PLATFORM-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXIT",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXIT",
        "LEAVE",
        "DISEMBARK"
      ]
    ],
    "actionRooms": [
      "SKYBUS-TERMINAL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "SKYBUS-TERMINAL"
      ],
      "THROUGH": [
        "SKYBUS-TERMINAL"
      ],
      "EXIT": [
        "SKYBUS-TERMINAL"
      ],
      "LEAVE": [
        "SKYBUS-TERMINAL"
      ],
      "DISEMBARK": [
        "SKYBUS-TERMINAL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CONSTRUCTION-OBJECT",
    "name": "construction site",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "construction",
      "site",
      "project"
    ],
    "adjectives": [
      "construction",
      "huge",
      "abandoned"
    ],
    "commandNoun": "construction",
    "action": "CONSTRUCTION-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "KENNEDY-PARK",
      "MAIN-AND-KENNEDY",
      "ELM-AND-KENNEDY",
      "ELM-AND-PARK",
      "CONSTRUCTION-SITE-1",
      "MAIN-AND-CHURCH",
      "CONSTRUCTION-SITE-2",
      "CONSTRUCTION-SITE-3",
      "CHURCH-ENTRANCE",
      "CONSTRUCTION-SITE-4",
      "CONSTRUCTION-SITE-5",
      "MIDLAND-AND-CHURCH",
      "SOUTHWAY-AND-KENNEDY",
      "SOUTHWAY-AND-RIVER",
      "BEND",
      "CEMETERY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BEND",
        "ELM-AND-PARK",
        "ELM-AND-KENNEDY",
        "SOUTHWAY-AND-KENNEDY",
        "MAIN-AND-KENNEDY",
        "MIDLAND-AND-CHURCH",
        "SOUTHWAY-AND-RIVER",
        "CHURCH-ENTRANCE",
        "MAIN-AND-CHURCH"
      ],
      "THROUGH": [
        "BEND",
        "ELM-AND-PARK",
        "ELM-AND-KENNEDY",
        "SOUTHWAY-AND-KENNEDY",
        "MAIN-AND-KENNEDY",
        "MIDLAND-AND-CHURCH",
        "SOUTHWAY-AND-RIVER",
        "CHURCH-ENTRANCE",
        "MAIN-AND-CHURCH"
      ],
      "DISEMBARK": [
        "CONSTRUCTION-SITE-1",
        "CONSTRUCTION-SITE-3",
        "KENNEDY-PARK",
        "CONSTRUCTION-SITE-4",
        "CONSTRUCTION-SITE-2",
        "CEMETERY",
        "CONSTRUCTION-SITE-5"
      ],
      "LEAVE": [
        "CONSTRUCTION-SITE-1",
        "CONSTRUCTION-SITE-3",
        "KENNEDY-PARK",
        "CONSTRUCTION-SITE-4",
        "CONSTRUCTION-SITE-2",
        "CEMETERY",
        "CONSTRUCTION-SITE-5"
      ],
      "EXAMINE": [
        "CONSTRUCTION-SITE-1",
        "KENNEDY-PARK",
        "CONSTRUCTION-SITE-2",
        "CONSTRUCTION-SITE-3",
        "CEMETERY",
        "CONSTRUCTION-SITE-4",
        "CONSTRUCTION-SITE-5"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FOUNTAIN",
    "name": "dried-up fountain",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "fountain"
    ],
    "adjectives": [
      "ornate",
      "dried-up",
      "dirty"
    ],
    "commandNoun": "fountain",
    "action": "FOUNTAIN-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CHURCH-STREET-PARK"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "INFOTECH-BUILDING",
    "name": "InfoTech Building",
    "initialLocation": "MAIN-AND-KENNEDY",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "building",
      "bldg",
      "landmark",
      "tower",
      "skyscraper"
    ],
    "adjectives": [
      "infotech",
      "info",
      "tech",
      "tall",
      "office",
      "famous"
    ],
    "commandNoun": "infotech building",
    "action": "INFOTECH-BUILDING-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-KENNEDY"
    ],
    "globalVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-KENNEDY"
      ],
      "WALK-TO": [
        "MAIN-AND-KENNEDY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PERELMAN-PERSONAL-DIRECTORY",
    "name": "PERELMAN.PERSONAL",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RED-TUBECAR-DOOR",
    "name": "red tubecar doors",
    "initialLocation": "RED-TUBECAR",
    "flags": [
      "DOORBIT",
      "NDESCBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "door",
      "doors"
    ],
    "adjectives": [
      "tubecar",
      "red"
    ],
    "commandNoun": "tubecar doors",
    "action": "RED-TUBECAR-DOOR-F",
    "handledVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "OPEN",
        "CLOSE"
      ]
    ],
    "actionRooms": [
      "RED-TUBECAR"
    ],
    "globalVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE"
    ],
    "refusalOnlyVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "verbRooms": {
      "THROUGH": [
        "RED-TUBECAR"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "RED-TUBECAR"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "RED-TUBECAR-OBJECT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SILICORP-BUILDING",
    "name": "Silicorp Building",
    "initialLocation": "MAIN-AND-KENNEDY",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "building",
      "bldg",
      "high-rise",
      "tower",
      "skyscraper"
    ],
    "adjectives": [
      "tall",
      "office",
      "silicorp"
    ],
    "commandNoun": "silicorp building",
    "action": "SILICORP-BUILDING-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-KENNEDY"
    ],
    "globalVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-KENNEDY"
      ],
      "WALK-TO": [
        "MAIN-AND-KENNEDY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "NEWS-BUFFER",
    "name": "World News buffer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "BUFFERBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "buffer"
    ],
    "adjectives": [
      "world",
      "news"
    ],
    "commandNoun": "world buffer",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FOURTH-FLOOR",
    "name": "activity offices",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT",
      "VOWELBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "office",
      "offices"
    ],
    "adjectives": [
      "student",
      "activity",
      "activitie"
    ],
    "commandNoun": "activity offices",
    "action": "STUDENT-UNION-ITEM-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GROCERIES",
    "name": "bag of groceries",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ],
    "synonyms": [
      "bag",
      "groceries",
      "food"
    ],
    "adjectives": [],
    "commandNoun": "groceries",
    "action": "GROCERIES-F",
    "handledVerbs": [
      "LOOK-INSIDE",
      "EXAMINE",
      "OPEN",
      "EAT",
      "PUT",
      "PUT-AWAY",
      "BUY"
    ],
    "verbGroups": [
      [
        "LOOK-INSIDE",
        "EXAMINE"
      ],
      [
        "OPEN"
      ],
      [
        "EAT"
      ],
      [
        "PUT"
      ],
      [
        "PUT-AWAY"
      ],
      [
        "PUT"
      ],
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "KITCHEN"
    ],
    "globalVerbs": [
      "LOOK-INSIDE",
      "EXAMINE",
      "OPEN",
      "PUT",
      "BUY"
    ],
    "guaranteedVerbs": [
      "LOOK-INSIDE",
      "EXAMINE",
      "OPEN",
      "EAT",
      "PUT",
      "PUT-AWAY",
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EAT": [
        "KITCHEN"
      ],
      "PUT-AWAY": [
        "KITCHEN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "KITCHEN-OBJECT",
      "MEAL"
    ],
    "removedObjectIds": [
      "GROCERIES"
    ]
  },
  {
    "id": "DRIVERS-LICENSE",
    "name": "driver's license",
    "initialLocation": "WALLET",
    "flags": [
      "READBIT",
      "TAKEBIT"
    ],
    "synonyms": [
      "license"
    ],
    "adjectives": [
      "your",
      "my",
      "driver's",
      "drivers"
    ],
    "commandNoun": "driver's license",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FORTZMAN",
    "name": "Eleanor Fortzman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "VOWELBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "eleanor",
      "fortzman"
    ],
    "adjectives": [
      "eleanor"
    ],
    "commandNoun": "fortzman",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GARBAGE",
    "name": "garbage disposal",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "disposal"
    ],
    "adjectives": [
      "garbage"
    ],
    "commandNoun": "garbage disposal",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MAGAZINE-ARTICLE",
    "name": "magazine article",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "printout",
      "article",
      "excerpt"
    ],
    "adjectives": [
      "magazine",
      "mag"
    ],
    "commandNoun": "magazine article",
    "action": "ITEM-IN-PACKAGE-F",
    "handledVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PICKFORD-THEATRE-OBJECT",
    "name": "Pickford Theatre",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "theatre",
      "theater"
    ],
    "adjectives": [
      "pickford",
      "fine",
      "old",
      "older"
    ],
    "commandNoun": "pickford theatre",
    "action": "PICKFORD-THEATRE-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "PICKFORD-THEATRE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "PICKFORD-THEATRE"
      ],
      "THROUGH": [
        "PICKFORD-THEATRE"
      ],
      "LEAVE": [
        "PICKFORD-THEATRE"
      ],
      "DISEMBARK": [
        "PICKFORD-THEATRE"
      ],
      "EXAMINE": [
        "PICKFORD-THEATRE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BEAMS",
    "name": "plastalloy beams",
    "initialLocation": "CONSTRUCTION-SITE-1",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "beam",
      "beams",
      "bundle",
      "bundles"
    ],
    "adjectives": [
      "plastallo"
    ],
    "commandNoun": "plastalloy beams",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PRISM-INTERFACES-DIRECTORY",
    "name": "PRISM.INTERFACES",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RECEIVER-STATION",
    "name": "receiver station",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "station"
    ],
    "adjectives": [
      "receiver",
      "gleaming"
    ],
    "commandNoun": "receiver station",
    "action": "RECEIVER-STATION-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TRAFFIC-INSTRUCTIONS",
    "name": "TRAFFIC.COMPUTER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WEATHER-INSTRUCTIONS",
    "name": "WEATHER.COMPUTER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "AUDITING-INSTRUCTIONS",
    "name": "AUDITING.SYSTEM",
    "initialLocation": null,
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ESTHER",
    "name": "Esther Perelman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "VOWELBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "esther",
      "perelman",
      "daughter"
    ],
    "adjectives": [
      "esther",
      "your",
      "only"
    ],
    "commandNoun": "perelman",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PAMPHLET",
    "name": "glossy pamphlet",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "READBIT"
    ],
    "synonyms": [
      "literatur",
      "pamphlet",
      "booklet",
      "leaflet",
      "flyer"
    ],
    "adjectives": [
      "glossy"
    ],
    "commandNoun": "glossy pamphlet",
    "action": "PAMPHLET-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "TRAIN-STATION"
    ],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GRANOLA-CLUSTER",
    "name": "granola cluster",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "EATBIT"
    ],
    "synonyms": [
      "cluster",
      "food"
    ],
    "adjectives": [
      "granola"
    ],
    "commandNoun": "granola cluster",
    "action": "RANDOM-FOOD-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BUY"
    ],
    "guaranteedVerbs": [
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MEAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HVAC-CONTROLLER",
    "name": "HVAC Controller",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "controlle",
      "computer"
    ],
    "adjectives": [
      "hvac",
      "heating",
      "ventilati",
      "air",
      "condition"
    ],
    "commandNoun": "hvac controller",
    "action": "HVAC-CONTROLLER-F",
    "handledVerbs": [
      "SSHUT-OFF",
      "STURN-ON",
      "STATUS",
      "SHUT-OFF",
      "TURN-ON",
      "ON",
      "OFF",
      "HELLO"
    ],
    "verbGroups": [
      [
        "SSHUT-OFF"
      ],
      [
        "STURN-ON"
      ],
      [
        "STATUS"
      ],
      [
        "SHUT-OFF",
        "TURN-ON"
      ],
      [
        "SHUT-OFF"
      ],
      [
        "ON",
        "OFF"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "SSHUT-OFF",
      "STURN-ON",
      "STATUS",
      "SHUT-OFF",
      "TURN-ON",
      "ON",
      "OFF",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "SHUT-OFF",
      "TURN-ON",
      "ON",
      "OFF",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "ALPHA-SECTOR",
      "BETA-SECTOR",
      "GAMMA-SECTOR",
      "DELTA-SECTOR",
      "HEATING",
      "COOLING",
      "VENTILATION",
      "SABOTEURS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HVAC-INSTRUCTIONS",
    "name": "HVAC.CONTROLLER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "INDUSTRIAL-PARK-OBJECT",
    "name": "industrial park",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "park"
    ],
    "adjectives": [
      "industrial",
      "rockvil"
    ],
    "commandNoun": "industrial park",
    "action": "INDUSTRIAL-PARK-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "INDUSTRIAL-PARK-ENTRANCE",
      "SKYCAR-LOT-1",
      "INDUSTRIAL-PARK-DRIVE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "INDUSTRIAL-PARK-ENTRANCE",
        "SKYCAR-LOT-1"
      ],
      "WALK-TO": [
        "INDUSTRIAL-PARK-ENTRANCE",
        "SKYCAR-LOT-1"
      ],
      "DISEMBARK": [
        "INDUSTRIAL-PARK-ENTRANCE"
      ],
      "LEAVE": [
        "INDUSTRIAL-PARK-ENTRANCE"
      ],
      "EXAMINE": [
        "INDUSTRIAL-PARK-DRIVE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LIBRARY-ACCOUNT",
    "name": "library account",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "account"
    ],
    "adjectives": [
      "library"
    ],
    "commandNoun": "library account",
    "action": "LIBRARY-ACCOUNT-F",
    "handledVerbs": [
      "ASK-FOR"
    ],
    "verbGroups": [
      [
        "ASK-FOR"
      ]
    ],
    "actionRooms": [
      "MAIN-LIBRARY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "ASK-FOR"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "ASK-FOR": [
        "MAIN-LIBRARY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CHUN-BUILDING",
    "name": "office building",
    "initialLocation": "AQUARIUM-AND-KENNEDY",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "building",
      "bldg"
    ],
    "adjectives": [
      "chun",
      "small",
      "office"
    ],
    "commandNoun": "office building",
    "action": "CHUN-BUILDING-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ROY",
    "name": "old Chinese man",
    "initialLocation": null,
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "chinaman",
      "man",
      "roy"
    ],
    "adjectives": [
      "old",
      "chinese"
    ],
    "commandNoun": "chinese man",
    "action": "ROY-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "ELM-UNDERPASS"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PLAN-POPULARITY",
    "name": "PLAN.POPULARITY",
    "initialLocation": "PLAN-DATA-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RAILROAD-BRIDGE",
    "name": "railroad bridge",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bridge",
      "trestle"
    ],
    "adjectives": [
      "old",
      "unused",
      "rail",
      "railroad",
      "rr"
    ],
    "commandNoun": "railroad bridge",
    "action": "RAILROAD-BRIDGE-F",
    "handledVerbs": [
      "CROSS",
      "WALK-UNDER"
    ],
    "verbGroups": [
      [
        "CROSS",
        "WALK-UNDER"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-WICKER",
      "BEND",
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "CROSS",
      "WALK-UNDER"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "CROSS": [
        "MAIN-AND-WICKER",
        "BEND",
        "WICKER-AND-RIVER"
      ],
      "WALK-UNDER": [
        "MAIN-AND-WICKER",
        "BEND",
        "WICKER-AND-RIVER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SERVICE-STATION-OBJECT",
    "name": "service station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "station",
      "center"
    ],
    "adjectives": [
      "unusually",
      "large",
      "skycar",
      "service"
    ],
    "commandNoun": "service station",
    "action": "SERVICE-STATION-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "AQUARIUM-AND-PARK",
      "SERVICE-STATION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "AQUARIUM-AND-PARK"
      ],
      "WALK-TO": [
        "AQUARIUM-AND-PARK"
      ],
      "LEAVE": [
        "SERVICE-STATION"
      ],
      "DISEMBARK": [
        "SERVICE-STATION"
      ],
      "EXAMINE": [
        "SERVICE-STATION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SIMULATION-MODE",
    "name": "Simulation Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "mode"
    ],
    "adjectives": [
      "simulatio",
      "sim"
    ],
    "commandNoun": "simulation mode",
    "action": "SIMULATION-MODE-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "COMM-MODE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "STACKS-OF-PAPERS",
    "name": "stack of papers",
    "initialLocation": "OFFICE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "stack",
      "stacks",
      "paper",
      "papers",
      "paperwork"
    ],
    "adjectives": [],
    "commandNoun": "papers",
    "action": "STACKS-OF-PAPERS-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TURKEY-SANDWICH",
    "name": "turkey sandwich",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "EATBIT"
    ],
    "synonyms": [
      "sandwich",
      "sandwiches",
      "food"
    ],
    "adjectives": [
      "turkey"
    ],
    "commandNoun": "turkey sandwich",
    "action": "SANDWICH-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MEAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SALAD",
    "name": "vegetable salad",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "salad",
      "food"
    ],
    "adjectives": [
      "vegetable"
    ],
    "commandNoun": "vegetable salad",
    "action": "SALAD-F",
    "handledVerbs": [
      "TAKE",
      "EAT"
    ],
    "verbGroups": [
      [
        "TAKE",
        "EAT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "EAT"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "EAT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "KITCHEN"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CONTROL-CENTER-OBJECT",
    "name": "control center",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "center"
    ],
    "adjectives": [
      "control",
      "prism",
      "project"
    ],
    "commandNoun": "control center",
    "action": "CONTROL-CENTER-OBJECT-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CURRENT-EVENTS-DIRECTORY",
    "name": "CURRENT.EVENTS",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HALLEY-ESTATES-OBJECT",
    "name": "Halley Estates",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "estate",
      "estates"
    ],
    "adjectives": [
      "halley",
      "wealthy",
      "affluent"
    ],
    "commandNoun": "halley estates",
    "action": "HALLEY-ESTATES-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "PARK-ENTRANCE",
      "HALLEY-AND-PARK",
      "HALLEY-AND-UNIVERSITY"
    ],
    "globalVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {
      "WALK-TO": [
        "PARK-ENTRANCE",
        "HALLEY-AND-PARK",
        "HALLEY-AND-UNIVERSITY"
      ],
      "THROUGH": [
        "PARK-ENTRANCE",
        "HALLEY-AND-PARK",
        "HALLEY-AND-UNIVERSITY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HARDWARE-STORE-OBJECT",
    "name": "hardware store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "store",
      "stores",
      "shop",
      "shops"
    ],
    "adjectives": [
      "hardware",
      "large",
      "well-stocked"
    ],
    "commandNoun": "hardware store",
    "action": "HARDWARE-STORE-OBJECT-F",
    "handledVerbs": [
      "DISEMBARK",
      "LEAVE",
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "HARDWARE-STORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "DISEMBARK": [
        "HARDWARE-STORE"
      ],
      "LEAVE": [
        "HARDWARE-STORE"
      ],
      "WALK-TO": [
        "HARDWARE-STORE"
      ],
      "THROUGH": [
        "HARDWARE-STORE"
      ],
      "EXAMINE": [
        "HARDWARE-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HEIMAN-VILLAGE-OBJECT",
    "name": "Heiman Village",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "village",
      "city",
      "building",
      "bldg",
      "walls",
      "complex",
      "microcosm",
      "cocoon",
      "ghetto",
      "landmark",
      "ic"
    ],
    "adjectives": [
      "heiman",
      "older",
      "first",
      "vast",
      "massive",
      "village",
      "urban",
      "indoor",
      "revolutionary",
      "controversial",
      "sterile",
      "isolated",
      "popular",
      "most",
      "famous",
      "ill-maintained",
      "extremely",
      "roofed-in"
    ],
    "commandNoun": "village",
    "action": "HEIMAN-VILLAGE-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "HEIMAN-VILLAGE",
      "CHURCH-STREET-PARK"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "HEIMAN-VILLAGE",
        "CHURCH-STREET-PARK"
      ],
      "THROUGH": [
        "HEIMAN-VILLAGE",
        "CHURCH-STREET-PARK"
      ],
      "LEAVE": [
        "HEIMAN-VILLAGE"
      ],
      "DISEMBARK": [
        "HEIMAN-VILLAGE"
      ],
      "EXAMINE": [
        "HEIMAN-VILLAGE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "INTERFACE-MODE",
    "name": "Interface Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "mode"
    ],
    "adjectives": [
      "interface"
    ],
    "commandNoun": "interface mode",
    "action": "INTERFACE-MODE-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CURRENT-FEED",
      "PORT-LIST"
    ],
    "removedObjectIds": []
  },
  {
    "id": "LIBYAN-ECONOMY",
    "name": "LIBYAN.ECONOMY",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BANNED-TITLES-LIST",
    "name": "list of titles",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ],
    "synonyms": [
      "list",
      "titles",
      "tapes",
      "programs"
    ],
    "adjectives": [
      "banned",
      "latest",
      "comprehensive"
    ],
    "commandNoun": "titles",
    "action": "BANNED-TITLES-LIST-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "MAIN-LIBRARY"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MOUNT-TAKEOVER",
    "name": "MOUNT.TAKEOVER",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "POLICEMAN",
    "name": "police officer",
    "initialLocation": "POLICE-STATION",
    "flags": [
      "ACTORBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "officer",
      "police",
      "policeman",
      "policemen",
      "cop",
      "cops"
    ],
    "adjectives": [
      "police",
      "desk"
    ],
    "commandNoun": "police officer",
    "action": "POLICEMAN-F",
    "handledVerbs": [
      "TELL-ABOUT"
    ],
    "verbGroups": [
      [
        "TELL-ABOUT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TELL-ABOUT"
    ],
    "guaranteedVerbs": [
      "TELL-ABOUT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CRIME",
      "CRIMINAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "POLICE-STATION-OBJECT",
    "name": "police station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "station",
      "headquarters",
      "hq"
    ],
    "adjectives": [
      "police"
    ],
    "commandNoun": "police station",
    "action": "POLICE-STATION-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ELM-AND-PARK",
      "POLICE-STATION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "ELM-AND-PARK"
      ],
      "THROUGH": [
        "ELM-AND-PARK"
      ],
      "LEAVE": [
        "POLICE-STATION"
      ],
      "DISEMBARK": [
        "POLICE-STATION"
      ],
      "EXAMINE": [
        "POLICE-STATION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RYDER-SPEECHES",
    "name": "RYDER.SPEECHES",
    "initialLocation": "PLAN-DATA-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SPACEPORT-GATE",
    "name": "spaceport gate",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "gate",
      "gates"
    ],
    "adjectives": [
      "spaceport"
    ],
    "commandNoun": "spaceport gate",
    "action": "SPACEPORT-GATE-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "AIRPORT-GATE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "STOCK-EXCHANGE-OBJECT",
    "name": "Stock Exchange",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "exchange",
      "building",
      "bldg"
    ],
    "adjectives": [
      "stock",
      "exchange",
      "aging",
      "impressiv",
      "old"
    ],
    "commandNoun": "exchange",
    "action": "STOCK-EXCHANGE-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "STOCK-EXCHANGE",
      "ELM-AND-RIVER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STOCK-EXCHANGE",
        "ELM-AND-RIVER"
      ],
      "WALK-TO": [
        "STOCK-EXCHANGE",
        "ELM-AND-RIVER"
      ],
      "DISEMBARK": [
        "STOCK-EXCHANGE"
      ],
      "LEAVE": [
        "STOCK-EXCHANGE"
      ],
      "EXAMINE": [
        "STOCK-EXCHANGE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WORD-PROCESSOR",
    "name": "word processor",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "LIGHTBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "processor",
      "typewriter",
      "wp"
    ],
    "adjectives": [
      "word",
      "old"
    ],
    "commandNoun": "word processor",
    "action": "WORD-PROCESSOR-F",
    "handledVerbs": [
      "EXAMINE",
      "WRITE",
      "SIT",
      "BOARD",
      "TAKE",
      "MOVE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "WRITE",
        "SIT",
        "BOARD"
      ],
      [
        "TAKE",
        "MOVE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "WRITE",
      "SIT",
      "BOARD",
      "TAKE",
      "MOVE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "WRITE",
      "SIT",
      "BOARD",
      "TAKE",
      "MOVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BAMBOO-SCREEN",
    "name": "bamboo screen",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "screen",
      "curtain"
    ],
    "adjectives": [
      "bamboo"
    ],
    "commandNoun": "bamboo screen",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BROWN-TUBECAR-OBJECT",
    "name": "brown tubecar",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "VEHBIT"
    ],
    "synonyms": [
      "tubecar",
      "car",
      "train",
      "subway"
    ],
    "adjectives": [
      "brown",
      "tube",
      "airport",
      "rockvil",
      "universit"
    ],
    "commandNoun": "tubecar",
    "action": "BROWN-TUBECAR-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "BOARD",
      "LEAVE",
      "DISEMBARK",
      "WAIT-FOR"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "BOARD"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "WAIT-FOR"
      ]
    ],
    "actionRooms": [
      "BROWN-TUBECAR"
    ],
    "globalVerbs": [
      "WAIT-FOR"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "BOARD",
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "BROWN-TUBECAR"
      ],
      "BOARD": [
        "BROWN-TUBECAR"
      ],
      "LEAVE": [
        "BROWN-TUBECAR"
      ],
      "DISEMBARK": [
        "BROWN-TUBECAR"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "BROWN-TUBECAR"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BSF-FORMATION",
    "name": "BSF.FORMATION",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "COFFEE",
    "name": "cup of coffee",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "cup",
      "coffee",
      "steam",
      "mug"
    ],
    "adjectives": [
      "steaming",
      "hot",
      "coffee"
    ],
    "commandNoun": "coffee",
    "action": "COFFEE-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BUY"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "OFFICE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HEALTH-CENTER-OBJECT",
    "name": "health center",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "center",
      "hmo",
      "facility"
    ],
    "adjectives": [
      "health",
      "anderson"
    ],
    "commandNoun": "health center",
    "action": "HEALTH-CENTER-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "HEALTH-CENTER",
      "MAIN-AND-RIVER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "HEALTH-CENTER",
        "MAIN-AND-RIVER"
      ],
      "WALK-TO": [
        "HEALTH-CENTER",
        "MAIN-AND-RIVER"
      ],
      "LEAVE": [
        "HEALTH-CENTER"
      ],
      "DISEMBARK": [
        "HEALTH-CENTER"
      ],
      "EXAMINE": [
        "HEALTH-CENTER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MOVIE-THEATRE-OBJECT",
    "name": "movie theatre",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "theater",
      "theatre",
      "cinema",
      "complex"
    ],
    "adjectives": [
      "movie",
      "downtown",
      "quad",
      "huge",
      "four-theatre"
    ],
    "commandNoun": "movie theatre",
    "action": "MOVIE-THEATRE-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "MUSEUM-ENTRANCE",
      "CINEMA",
      "SKYCAR-LOT-7"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "MUSEUM-ENTRANCE",
        "CINEMA",
        "SKYCAR-LOT-7"
      ],
      "WALK-TO": [
        "MUSEUM-ENTRANCE",
        "CINEMA",
        "SKYCAR-LOT-7"
      ],
      "DISEMBARK": [
        "CINEMA"
      ],
      "LEAVE": [
        "CINEMA"
      ],
      "EXAMINE": [
        "CINEMA"
      ],
      "SMELL": [
        "CINEMA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PLAN-ELEMENTS",
    "name": "PLAN.ELEMENTS",
    "initialLocation": "PLAN-DATA-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "POWER-STATION-OBJECT",
    "name": "power station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "station"
    ],
    "adjectives": [
      "power",
      "utility",
      "central"
    ],
    "commandNoun": "power station",
    "action": "POWER-STATION-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "POWER-STATION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "POWER-STATION"
      ],
      "THROUGH": [
        "POWER-STATION"
      ],
      "LEAVE": [
        "POWER-STATION"
      ],
      "DISEMBARK": [
        "POWER-STATION"
      ],
      "EXAMINE": [
        "POWER-STATION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RAILROAD-YARD",
    "name": "railroad yard",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "yard",
      "yards"
    ],
    "adjectives": [
      "old",
      "abandoned",
      "railroad"
    ],
    "commandNoun": "railroad yard",
    "action": "RAILROAD-YARD-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ]
    ],
    "actionRooms": [
      "MIDLAND-AND-CHURCH"
    ],
    "globalVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "MIDLAND-AND-CHURCH"
      ],
      "WALK-TO": [
        "MIDLAND-AND-CHURCH"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RAV",
    "name": "Rav and Frita",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "rav",
      "frita"
    ],
    "adjectives": [],
    "commandNoun": "frita",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RECORD-BUFFER",
    "name": "record buffer",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "BUFFERBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "buffer",
      "recording",
      "record"
    ],
    "adjectives": [
      "my",
      "record"
    ],
    "commandNoun": "record buffer",
    "action": "RECORD-BUFFER-F",
    "handledVerbs": [
      "ON",
      "OFF"
    ],
    "verbGroups": [
      [
        "ON"
      ],
      [
        "OFF"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "ON",
      "OFF"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JILL-BOOK",
    "name": "romance novel",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "READBIT"
    ],
    "synonyms": [
      "novel",
      "book"
    ],
    "adjectives": [
      "gothic",
      "romance",
      "jill's",
      "her"
    ],
    "commandNoun": "romance novel",
    "action": "JILL-BOOK-F",
    "handledVerbs": [
      "TAKE",
      "READ",
      "EXAMINE",
      "OPEN",
      "CLOSE",
      "BUY"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "READ",
        "EXAMINE",
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "BUY"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE",
      "OPEN",
      "CLOSE",
      "BUY"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "READ",
      "EXAMINE",
      "OPEN",
      "CLOSE",
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "BEDROOM",
      "LIVING-ROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BOOKS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "STREET-BRIDGE",
    "name": "street bridge",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bridge"
    ],
    "adjectives": [
      "main",
      "river",
      "river-bank",
      "street",
      "rusted",
      "neglected",
      "once-proud"
    ],
    "commandNoun": "street bridge",
    "action": "STREET-BRIDGE-F",
    "handledVerbs": [
      "DISEMBARK",
      "LEAVE",
      "THROUGH",
      "WALK-TO",
      "CROSS",
      "LOOK-UNDER"
    ],
    "verbGroups": [
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "THROUGH",
        "WALK-TO",
        "CROSS"
      ],
      [
        "CROSS"
      ],
      [
        "LOOK-UNDER"
      ]
    ],
    "actionRooms": [
      "RIVER-STREET-BRIDGE",
      "MAIN-STREET-BRIDGE",
      "MAIN-AND-WICKER"
    ],
    "globalVerbs": [
      "CROSS",
      "LOOK-UNDER"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "THROUGH",
      "WALK-TO",
      "CROSS",
      "LOOK-UNDER"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "DISEMBARK": [
        "RIVER-STREET-BRIDGE",
        "MAIN-STREET-BRIDGE"
      ],
      "LEAVE": [
        "RIVER-STREET-BRIDGE",
        "MAIN-STREET-BRIDGE"
      ],
      "THROUGH": [
        "RIVER-STREET-BRIDGE",
        "MAIN-STREET-BRIDGE",
        "MAIN-AND-WICKER"
      ],
      "WALK-TO": [
        "RIVER-STREET-BRIDGE",
        "MAIN-STREET-BRIDGE",
        "MAIN-AND-WICKER"
      ],
      "CROSS": [
        "RIVER-STREET-BRIDGE",
        "MAIN-STREET-BRIDGE",
        "MAIN-AND-WICKER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STUDENT-UNION-OBJECT",
    "name": "student union",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "union",
      "center"
    ],
    "adjectives": [
      "student",
      "wide",
      "sprawling"
    ],
    "commandNoun": "student union",
    "action": "STUDENT-UNION-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "STUDENT-UNION"
      ],
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "LEAVE": [
        "STUDENT-UNION"
      ],
      "DISEMBARK": [
        "STUDENT-UNION"
      ],
      "EXAMINE": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SYMPHONY-HALL-OBJECT",
    "name": "Symphony Hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hall",
      "symphony"
    ],
    "adjectives": [
      "symphony",
      "ornate"
    ],
    "commandNoun": "symphony",
    "action": "SYMPHONY-HALL-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SYMPHONY-HALL",
      "SYMPHONY-ENTRANCE",
      "SKYCAR-LOT-7"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "SYMPHONY-HALL",
        "SYMPHONY-ENTRANCE",
        "SKYCAR-LOT-7"
      ],
      "THROUGH": [
        "SYMPHONY-HALL",
        "SYMPHONY-ENTRANCE",
        "SKYCAR-LOT-7"
      ],
      "LEAVE": [
        "SYMPHONY-HALL"
      ],
      "DISEMBARK": [
        "SYMPHONY-HALL"
      ],
      "EXAMINE": [
        "SYMPHONY-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TICKET-SELLER",
    "name": "ticket seller",
    "initialLocation": "CINEMA",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "seller",
      "dispenser",
      "window",
      "windows"
    ],
    "adjectives": [
      "ticket"
    ],
    "commandNoun": "ticket seller",
    "action": "TICKET-SELLER-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CREDIT-CARD"
    ],
    "removedObjectIds": []
  },
  {
    "id": "TRAIN-STATION-OBJECT",
    "name": "train station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "station",
      "landmark"
    ],
    "adjectives": [
      "train",
      "old",
      "north",
      "central",
      "former",
      "magnifice",
      "restored",
      "national",
      "natl"
    ],
    "commandNoun": "train station",
    "action": "TRAIN-STATION-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "BODANSKI-SQUARE",
      "MIDLAND-AND-RIVER",
      "TRAIN-STATION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BODANSKI-SQUARE",
        "MIDLAND-AND-RIVER"
      ],
      "THROUGH": [
        "BODANSKI-SQUARE",
        "MIDLAND-AND-RIVER"
      ],
      "LEAVE": [
        "TRAIN-STATION"
      ],
      "DISEMBARK": [
        "TRAIN-STATION"
      ],
      "EXAMINE": [
        "TRAIN-STATION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WELLS-THEATRE-OBJECT",
    "name": "Wells Theatre",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "theatre",
      "theater"
    ],
    "adjectives": [
      "wells",
      "modern",
      "well-maintained"
    ],
    "commandNoun": "wells theatre",
    "action": "WELLS-THEATRE-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "AIRPORTWAY-AND-RIVER",
      "AQUARIUM-AND-RIVER",
      "WELLS-THEATRE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "AIRPORTWAY-AND-RIVER",
        "AQUARIUM-AND-RIVER"
      ],
      "THROUGH": [
        "AIRPORTWAY-AND-RIVER",
        "AQUARIUM-AND-RIVER"
      ],
      "LEAVE": [
        "WELLS-THEATRE"
      ],
      "DISEMBARK": [
        "WELLS-THEATRE"
      ],
      "EXAMINE": [
        "WELLS-THEATRE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "AIRPORT-GATE",
    "name": "airport gate",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "gate",
      "gates"
    ],
    "adjectives": [
      "airport"
    ],
    "commandNoun": "airport gate",
    "action": "AIRPORT-GATE-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "CLOSE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ALI-BUILDING",
    "name": "ALI Building",
    "initialLocation": "MIDLAND-AND-RIVER",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "building",
      "bldg",
      "hq",
      "headquarters",
      "skyscraper",
      "group"
    ],
    "adjectives": [
      "ali",
      "american",
      "life",
      "insurance",
      "fairly",
      "typical",
      "twenty-first",
      "century"
    ],
    "commandNoun": "ali building",
    "action": "ALI-BUILDING-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ALPHA-SECTOR",
    "name": "alpha sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "sector",
      "sectors",
      "alpha"
    ],
    "adjectives": [
      "alpha"
    ],
    "commandNoun": "alpha sector",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PRICE",
    "name": "Alyson Price",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "alyson",
      "price"
    ],
    "adjectives": [
      "alyson"
    ],
    "commandNoun": "price",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RANDU",
    "name": "Aseejh Randu",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLE",
      "VOWELBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "randu",
      "aseejh"
    ],
    "adjectives": [
      "aseejh"
    ],
    "commandNoun": "randu",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CARD-CATALOG",
    "name": "card catalog",
    "initialLocation": "MAIN-LIBRARY",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "catalog",
      "file"
    ],
    "adjectives": [
      "card",
      "computeri"
    ],
    "commandNoun": "card catalog",
    "action": "CARD-CATALOG-F",
    "handledVerbs": [
      "OPEN",
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "EXAMINE"
      ],
      [
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CHURCH-OFFICIAL",
    "name": "church elder",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT"
    ],
    "synonyms": [
      "official",
      "elder"
    ],
    "adjectives": [
      "church"
    ],
    "commandNoun": "church elder",
    "action": "CHURCH-OFFICIAL-F",
    "handledVerbs": [
      "TELL"
    ],
    "verbGroups": [
      [
        "TELL"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TELL"
    ],
    "guaranteedVerbs": [
      "TELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CONVERSATION",
    "name": "conversation",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "buzz",
      "conversat"
    ],
    "adjectives": [],
    "commandNoun": "conversation",
    "action": "CONVERSATION-F",
    "handledVerbs": [
      "LISTEN"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [
      "DORM",
      "CONTROL-CENTER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LISTEN"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "LISTEN": [
        "CONTROL-CENTER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CURRENT-FEED",
    "name": "current feed",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "feed",
      "news"
    ],
    "adjectives": [
      "current"
    ],
    "commandNoun": "current feed",
    "action": "CURRENT-FEED-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "NEWS"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "NEWS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "NEWS"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DELTA-SECTOR",
    "name": "delta sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "sector",
      "sectors",
      "delta"
    ],
    "adjectives": [
      "delta"
    ],
    "commandNoun": "delta sector",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DISHES",
    "name": "dirty dishes",
    "initialLocation": "KITCHEN",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "dish",
      "dishes"
    ],
    "adjectives": [
      "dirty"
    ],
    "commandNoun": "dirty dishes",
    "action": "DISHES-F",
    "handledVerbs": [
      "TAKE",
      "WASH"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "WASH"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "JILL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "GRIMWOLD",
    "name": "Dr. Grimwold",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "dr",
      "doctor",
      "psychiatr",
      "shrink",
      "ernest",
      "grimwold",
      "man"
    ],
    "adjectives": [
      "dr",
      "doctor",
      "ernest",
      "well-groomed",
      "stereotypical",
      "old"
    ],
    "commandNoun": "grimwold",
    "action": "GRIMWOLD-F",
    "handledVerbs": [
      "YES",
      "NO",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "YES"
      ],
      [
        "NO"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "YES",
      "NO",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "OFFICE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PERELMAN",
    "name": "Dr. Perelman",
    "initialLocation": "OFFICE",
    "flags": [
      "NARTICLEBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "doctor",
      "dr",
      "perelman",
      "abraham",
      "abe",
      "doc"
    ],
    "adjectives": [
      "abraham",
      "abe",
      "doctor",
      "dr",
      "mr",
      "mister"
    ],
    "commandNoun": "perelman",
    "action": "PERELMAN-F",
    "handledVerbs": [
      "YES",
      "NO",
      "EXAMINE",
      "READ",
      "WHO",
      "WHAT",
      "TELL-ABOUT",
      "THANK",
      "CALL",
      "SHOW",
      "GIVE"
    ],
    "verbGroups": [
      [
        "YES"
      ],
      [
        "NO"
      ],
      [
        "EXAMINE",
        "READ"
      ],
      [
        "WHO",
        "WHAT"
      ],
      [
        "TELL-ABOUT"
      ],
      [
        "YES"
      ],
      [
        "NO"
      ],
      [
        "THANK"
      ],
      [
        "CALL"
      ],
      [
        "SHOW",
        "GIVE"
      ],
      [
        "TELL-ABOUT"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "YES",
      "NO",
      "EXAMINE",
      "READ",
      "WHO",
      "WHAT",
      "TELL-ABOUT",
      "THANK",
      "CALL",
      "SHOW",
      "GIVE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "READ",
      "WHO",
      "WHAT",
      "TELL-ABOUT",
      "THANK",
      "CALL",
      "SHOW",
      "GIVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CONTROL-CENTER",
      "OFFICE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "RYDER",
      "GRIMWOLD",
      "RECORD-BUFFER",
      "ME",
      "MY-NAME",
      "LIBRARY-MODE",
      "ESTHER",
      "PLAN",
      "RANDU",
      "GOLD",
      "PRICE",
      "FORTZMAN",
      "WARREN",
      "RESIGNATION",
      "MINDEX",
      "CLERKMATON",
      "PARENTS",
      "CLAVE",
      "RAV",
      "FYLA",
      "CC-PRINTOUT",
      "SILVER-DOVE",
      "SIMULATION-MODE",
      "COFFEE"
    ],
    "removedObjectIds": [
      "PERELMAN",
      "COFFEE"
    ]
  },
  {
    "id": "WARREN",
    "name": "Emily Warren",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "emily",
      "warren"
    ],
    "adjectives": [
      "emily"
    ],
    "commandNoun": "warren",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FIREHOUSE-OBJECT",
    "name": "fire station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "firehouse",
      "house",
      "station"
    ],
    "adjectives": [
      "fire",
      "old"
    ],
    "commandNoun": "fire station",
    "action": "FIREHOUSE-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ]
    ],
    "actionRooms": [
      "FIREHOUSE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "FIREHOUSE"
      ],
      "WALK-TO": [
        "FIREHOUSE"
      ],
      "LEAVE": [
        "FIREHOUSE"
      ],
      "DISEMBARK": [
        "FIREHOUSE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GAMMA-SECTOR",
    "name": "gamma sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "sector",
      "sectors",
      "gamma"
    ],
    "adjectives": [
      "gamma"
    ],
    "commandNoun": "gamma sector",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DUMP-OBJECT",
    "name": "garbage dump",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "dump",
      "facility",
      "site"
    ],
    "adjectives": [
      "sprawling",
      "city",
      "city's",
      "rockvil",
      "rockvil's",
      "primary",
      "waste",
      "disposal",
      "garbage",
      "multiple",
      "unit"
    ],
    "commandNoun": "garbage dump",
    "action": "DUMP-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CITY-DUMP"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "CITY-DUMP"
      ],
      "THROUGH": [
        "CITY-DUMP"
      ],
      "LEAVE": [
        "CITY-DUMP"
      ],
      "DISEMBARK": [
        "CITY-DUMP"
      ],
      "EXAMINE": [
        "CITY-DUMP"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HAM-SANDWICH",
    "name": "ham sandwich",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "EATBIT"
    ],
    "synonyms": [
      "sandwich",
      "sandwiches",
      "food"
    ],
    "adjectives": [
      "ham"
    ],
    "commandNoun": "ham sandwich",
    "action": "SANDWICH-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MEAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HEIMAN-WORLD-OBJECT",
    "name": "Heiman World",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "world",
      "slum",
      "city",
      "ic"
    ],
    "adjectives": [
      "heiman",
      "run-down",
      "second",
      "vast",
      "indoor"
    ],
    "commandNoun": "heiman world",
    "action": "HEIMAN-WORLD-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SOUTHWAY-AND-RIVER",
      "BEND",
      "CONSTRUCTION-SITE-2"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "SOUTHWAY-AND-RIVER",
        "BEND"
      ],
      "THROUGH": [
        "SOUTHWAY-AND-RIVER",
        "BEND"
      ],
      "LEAVE": [
        "CONSTRUCTION-SITE-2"
      ],
      "DISEMBARK": [
        "CONSTRUCTION-SITE-2"
      ],
      "EXAMINE": [
        "CONSTRUCTION-SITE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LECTURE-HALL-OBJECT",
    "name": "lecture hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hall"
    ],
    "adjectives": [
      "lecture"
    ],
    "commandNoun": "lecture hall",
    "action": "LECTURE-HALL-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ROCKVIL-UNIVERSITY",
      "LECTURE-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "ROCKVIL-UNIVERSITY"
      ],
      "THROUGH": [
        "ROCKVIL-UNIVERSITY"
      ],
      "LEAVE": [
        "LECTURE-HALL"
      ],
      "DISEMBARK": [
        "LECTURE-HALL"
      ],
      "EXAMINE": [
        "LECTURE-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LIBRARY-MODE",
    "name": "Library Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "mode"
    ],
    "adjectives": [
      "library"
    ],
    "commandNoun": "library mode",
    "action": "LIBRARY-MODE-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LIBRARY-UNIT",
    "name": "library unit",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "unit"
    ],
    "adjectives": [
      "library"
    ],
    "commandNoun": "library unit",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LIQUOR-STORE-OBJECT",
    "name": "liquor store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "store",
      "stores",
      "shop",
      "shops"
    ],
    "adjectives": [
      "liquor",
      "package"
    ],
    "commandNoun": "liquor store",
    "action": "LIQUOR-STORE-OBJECT-F",
    "handledVerbs": [
      "LEAVE",
      "DISEMBARK",
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "LIQUOR-STORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "LEAVE": [
        "LIQUOR-STORE"
      ],
      "DISEMBARK": [
        "LIQUOR-STORE"
      ],
      "WALK-TO": [
        "LIQUOR-STORE"
      ],
      "THROUGH": [
        "LIQUOR-STORE"
      ],
      "EXAMINE": [
        "LIQUOR-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DUCKS",
    "name": "mallard duck",
    "initialLocation": "HALLEY-PARK-WEST",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "duck",
      "ducks",
      "mallard",
      "mallards"
    ],
    "adjectives": [
      "mallard",
      "common"
    ],
    "commandNoun": "mallard",
    "action": "DUCKS-F",
    "handledVerbs": [
      "EXAMINE",
      "TAKE",
      "KICK"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "TAKE",
        "KICK"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "KICK"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "TAKE",
      "KICK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "HALLEY-PARK-WEST"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PEREZ-TOWERS",
    "name": "Perez Towers",
    "initialLocation": "MAIN-AND-RIVER",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "towers",
      "tower",
      "building",
      "bldg"
    ],
    "adjectives": [
      "perez",
      "luxury",
      "apartment"
    ],
    "commandNoun": "perez towers",
    "action": "PEREZ-TOWERS-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-RIVER"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-RIVER"
      ],
      "WALK-TO": [
        "MAIN-AND-RIVER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PICTUREPHONE",
    "name": "picturephone",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "phone",
      "telephone",
      "pictureph"
    ],
    "adjectives": [
      "picture"
    ],
    "commandNoun": "picturephone",
    "action": "PICTUREPHONE-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MOLD",
    "name": "pile of mold",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRYTAKEBIT",
      "TAKEBIT"
    ],
    "synonyms": [
      "pile",
      "mold"
    ],
    "adjectives": [
      "disgustin",
      "putrid",
      "putrid-smelling"
    ],
    "commandNoun": "pile",
    "action": "MOLD-F",
    "handledVerbs": [
      "EAT",
      "SMELL",
      "TAKE"
    ],
    "verbGroups": [
      [
        "EAT"
      ],
      [
        "SMELL"
      ],
      [
        "TAKE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EAT",
      "SMELL",
      "TAKE"
    ],
    "guaranteedVerbs": [
      "EAT",
      "SMELL",
      "TAKE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "FOODVILLE-2"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "REFRIGERATOR",
    "name": "refrigerator",
    "initialLocation": "KITCHEN",
    "flags": [
      "NDESCBIT",
      "CONTBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "refrigera",
      "fridge",
      "frige",
      "frig",
      "icebox"
    ],
    "adjectives": [
      "small"
    ],
    "commandNoun": "refrigerator",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "EPILOGUE-KITCHEN"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SHOWER",
    "name": "shower stall",
    "initialLocation": "BATHROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "shower",
      "stall"
    ],
    "adjectives": [
      "shower"
    ],
    "commandNoun": "shower",
    "action": "SHOWER-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE",
      "TAKE",
      "ON"
    ],
    "verbGroups": [
      [
        "OPEN",
        "CLOSE"
      ],
      [
        "TAKE",
        "ON"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "TAKE",
      "ON"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "TAKE",
      "ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BABY"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SOUP-KITCHEN",
    "name": "soup kitchen",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "kitchen"
    ],
    "adjectives": [
      "soup",
      "boarded-up",
      "closed",
      "dirty",
      "crowded"
    ],
    "commandNoun": "soup kitchen",
    "action": "SOUP-KITCHEN-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "WICKER-AND-RIVER",
      "CLOSED-FACTORY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "WICKER-AND-RIVER"
      ],
      "THROUGH": [
        "WICKER-AND-RIVER"
      ],
      "LEAVE": [
        "CLOSED-FACTORY"
      ],
      "DISEMBARK": [
        "CLOSED-FACTORY"
      ],
      "EXAMINE": [
        "CLOSED-FACTORY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RAILROAD-TRACKS",
    "name": "train tracks",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "set",
      "pair",
      "track",
      "tracks"
    ],
    "adjectives": [
      "railroad",
      "rr",
      "train",
      "tube",
      "subway",
      "rusting",
      "overgrown"
    ],
    "commandNoun": "train tracks",
    "action": "RAILROAD-TRACKS-F",
    "handledVerbs": [
      "CROSS"
    ],
    "verbGroups": [
      [
        "CROSS"
      ]
    ],
    "actionRooms": [
      "CHURCH-STREET-PARK",
      "WAREHOUSE-1",
      "WICKER-AND-PIER",
      "MAIN-AND-WICKER",
      "BEND",
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "CROSS"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "CROSS": [
        "WICKER-AND-PIER",
        "MAIN-AND-WICKER",
        "CHURCH-STREET-PARK",
        "BEND",
        "WICKER-AND-RIVER",
        "WAREHOUSE-1"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TUBE-STATION",
    "name": "Tube station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "tubes",
      "station",
      "system"
    ],
    "adjectives": [
      "tube",
      "tubes"
    ],
    "commandNoun": "tube station",
    "action": "TUBE-STATION-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "RED-TUBECAR",
      "BROWN-TUBECAR",
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "RED-TUBECAR",
        "BROWN-TUBECAR"
      ],
      "THROUGH": [
        "RED-TUBECAR",
        "BROWN-TUBECAR"
      ],
      "LEAVE": [
        "RED-TUBECAR",
        "BROWN-TUBECAR"
      ],
      "DISEMBARK": [
        "RED-TUBECAR",
        "BROWN-TUBECAR"
      ],
      "SMELL": [
        "WICKER-AND-RIVER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "STAIRS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "UNSHAVEN-MAN",
    "name": "unshaven man",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "VOWELBIT",
      "OPENBIT",
      "CONTBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "man"
    ],
    "adjectives": [
      "bored",
      "unshaven"
    ],
    "commandNoun": "unshaven man",
    "action": "UNSHAVEN-MAN-F",
    "handledVerbs": [
      "GIVE",
      "SGIVE",
      "ASK-FOR"
    ],
    "verbGroups": [
      [
        "GIVE"
      ],
      [
        "SGIVE"
      ],
      [
        "ASK-FOR"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "GIVE",
      "SGIVE",
      "ASK-FOR"
    ],
    "guaranteedVerbs": [
      "GIVE",
      "SGIVE",
      "ASK-FOR"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "BORDELLO-AD"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MY-MAILBOX",
    "name": "your mailbox",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "MYBIT"
    ],
    "synonyms": [
      "mailbox",
      "box"
    ],
    "adjectives": [
      "my",
      "mail"
    ],
    "commandNoun": "mailbox",
    "action": "MY-MAILBOX-F",
    "handledVerbs": [
      "OPEN",
      "EXAMINE",
      "LOOK-INSIDE",
      "UNLOCK",
      "CLOSE"
    ],
    "verbGroups": [
      [
        "OPEN",
        "EXAMINE",
        "LOOK-INSIDE",
        "UNLOCK"
      ],
      [
        "CLOSE"
      ]
    ],
    "actionRooms": [
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [
      "OPEN",
      "EXAMINE",
      "LOOK-INSIDE",
      "UNLOCK",
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "EXAMINE",
      "LOOK-INSIDE",
      "UNLOCK",
      "CLOSE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PARENTS",
    "name": "your parents",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "MYBIT"
    ],
    "synonyms": [
      "parents",
      "parent",
      "mother",
      "father",
      "mom",
      "dad"
    ],
    "adjectives": [
      "my"
    ],
    "commandNoun": "parents",
    "action": "PARENTS-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "JILL",
      "ME"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BETA-SECTOR",
    "name": "beta sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "sector",
      "sectors",
      "beta"
    ],
    "adjectives": [
      "beta"
    ],
    "commandNoun": "beta sector",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SODA",
    "name": "can of soda",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "DRINKBIT"
    ],
    "synonyms": [
      "can",
      "soda",
      "coke",
      "pepsi",
      "cola",
      "pepsi-cola",
      "coca-cola",
      "pop",
      "tonic"
    ],
    "adjectives": [
      "coca",
      "pepsi",
      "soda"
    ],
    "commandNoun": "soda",
    "action": "SODA-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE",
      "BUY",
      "LOOK-INSIDE",
      "DRINK"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "BUY"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "DRINK"
      ]
    ],
    "actionRooms": [
      "EZZIS-BAR",
      "BAR",
      "BURGER-MEISTER",
      "FOODVILLE-1",
      "FOODVILLE-2",
      "DRUG-STORE"
    ],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "LOOK-INSIDE",
      "DRINK"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "BUY",
      "LOOK-INSIDE",
      "DRINK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER",
        "FOODVILLE-1",
        "FOODVILLE-2",
        "DRUG-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MILKSHAKE"
    ],
    "removedObjectIds": [
      "SODA"
    ]
  },
  {
    "id": "CREDIT-CARD",
    "name": "credit card",
    "initialLocation": "WALLET",
    "flags": [
      "READBIT",
      "TAKEBIT"
    ],
    "synonyms": [
      "card"
    ],
    "adjectives": [
      "your",
      "my",
      "credit"
    ],
    "commandNoun": "credit card",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DERRICOPTERS",
    "name": "derricopter",
    "initialLocation": "CONSTRUCTION-SITE-1",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "derricopt"
    ],
    "adjectives": [],
    "commandNoun": "derricopter",
    "action": "DERRICOPTERS-F",
    "handledVerbs": [
      "EXAMINE",
      "LISTEN"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "LISTEN"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "LISTEN"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DINETTE-SET",
    "name": "dinette set",
    "initialLocation": "KITCHEN",
    "flags": [
      "NDESCBIT",
      "FURNITUREBIT",
      "SURFACEBIT",
      "VEHBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "set",
      "table",
      "chair",
      "chairs"
    ],
    "adjectives": [
      "dinette"
    ],
    "commandNoun": "dinette set",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DINING-ROOM-OBJECT",
    "name": "dining room",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "room"
    ],
    "adjectives": [
      "spacious",
      "dining"
    ],
    "commandNoun": "dining room",
    "action": "DINING-ROOM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "EPILOGUE-KITCHEN",
      "EPILOGUE-LIVING-ROOM",
      "DINING-ROOM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "EPILOGUE-KITCHEN",
        "EPILOGUE-LIVING-ROOM"
      ],
      "THROUGH": [
        "EPILOGUE-KITCHEN",
        "EPILOGUE-LIVING-ROOM"
      ],
      "LEAVE": [
        "DINING-ROOM"
      ],
      "DISEMBARK": [
        "DINING-ROOM"
      ],
      "EXAMINE": [
        "DINING-ROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "INTERCHANGE-OBJECT",
    "name": "interchange",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "interchange",
      "cloverleaf"
    ],
    "adjectives": [
      "huge",
      "cloverleaf"
    ],
    "commandNoun": "interchange",
    "action": "INTERCHANGE-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "INTERCHANGE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "INTERCHANGE"
      ],
      "THROUGH": [
        "INTERCHANGE"
      ],
      "LEAVE": [
        "INTERCHANGE"
      ],
      "DISEMBARK": [
        "INTERCHANGE"
      ],
      "EXAMINE": [
        "INTERCHANGE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LIVING-ROOM-OBJECT",
    "name": "living room",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "room"
    ],
    "adjectives": [
      "living",
      "large",
      "sprawling"
    ],
    "commandNoun": "living room",
    "action": "LIVING-ROOM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "WASH"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "KITCHEN",
      "PARKVIEW-HALL",
      "BEDROOM",
      "SOLARIUM",
      "FOYER",
      "MASTER-BEDROOM",
      "DINING-ROOM",
      "LIVING-ROOM",
      "EPILOGUE-LIVING-ROOM"
    ],
    "globalVerbs": [
      "WASH"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "KITCHEN",
        "PARKVIEW-HALL",
        "BEDROOM",
        "SOLARIUM",
        "FOYER",
        "MASTER-BEDROOM",
        "DINING-ROOM"
      ],
      "THROUGH": [
        "KITCHEN",
        "PARKVIEW-HALL",
        "BEDROOM",
        "SOLARIUM",
        "FOYER",
        "MASTER-BEDROOM",
        "DINING-ROOM"
      ],
      "LEAVE": [
        "LIVING-ROOM",
        "EPILOGUE-LIVING-ROOM"
      ],
      "DISEMBARK": [
        "LIVING-ROOM",
        "EPILOGUE-LIVING-ROOM"
      ],
      "EXAMINE": [
        "LIVING-ROOM",
        "EPILOGUE-LIVING-ROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "GLOBAL-ROOM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BEER",
    "name": "mug of beer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ],
    "synonyms": [
      "drink",
      "beer",
      "ale",
      "glass",
      "mug",
      "brew"
    ],
    "adjectives": [
      "tall",
      "foamy",
      "my"
    ],
    "commandNoun": "beer",
    "action": "BEER-F",
    "handledVerbs": [
      "BUY",
      "THROW",
      "DRINK"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "THROW"
      ],
      [
        "DRINK"
      ]
    ],
    "actionRooms": [
      "EZZIS-BAR",
      "BAR",
      "BURGER-MEISTER",
      "LIQUOR-STORE",
      "ROYS-PAGODA"
    ],
    "globalVerbs": [
      "THROW",
      "DRINK"
    ],
    "guaranteedVerbs": [
      "THROW",
      "DRINK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER",
        "LIQUOR-STORE",
        "ROYS-PAGODA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "LIQUOR"
    ],
    "removedObjectIds": [
      "BEER"
    ]
  },
  {
    "id": "CARLOT",
    "name": "parking lot",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "lot"
    ],
    "adjectives": [
      "parking",
      "skycar",
      "sky",
      "car"
    ],
    "commandNoun": "parking lot",
    "action": "CARLOT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE",
        "LOOK-INSIDE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SKYCAR-LOT-1",
      "SKYCAR-LOT-2",
      "SKYCAR-LOT-3",
      "SKYCAR-LOT-4",
      "SKYCAR-LOT-5",
      "SKYCAR-LOT-6",
      "SKYCAR-LOT-7",
      "SKYCAR-FACTORY"
    ],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "SKYCAR-FACTORY"
      ],
      "LOOK-INSIDE": [
        "SKYCAR-FACTORY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SKYCAR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "POST-OFFICE-OBJECT",
    "name": "post office",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "office"
    ],
    "adjectives": [
      "post"
    ],
    "commandNoun": "post office",
    "action": "POST-OFFICE-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "POST-OFFICE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "POST-OFFICE"
      ],
      "WALK-TO": [
        "POST-OFFICE"
      ],
      "LEAVE": [
        "POST-OFFICE"
      ],
      "DISEMBARK": [
        "POST-OFFICE"
      ],
      "EXAMINE": [
        "POST-OFFICE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PROTRUSIONS",
    "name": "protrusions",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "protrusio",
      "pipe",
      "pipes",
      "vent",
      "vents",
      "antenna",
      "antennae",
      "antennas"
    ],
    "adjectives": [],
    "commandNoun": "protrusions",
    "action": "PROTRUSIONS-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RATION-CARD",
    "name": "ration card",
    "initialLocation": null,
    "flags": [
      "READBIT",
      "TAKEBIT"
    ],
    "synonyms": [
      "card"
    ],
    "adjectives": [
      "your",
      "my",
      "ration"
    ],
    "commandNoun": "ration card",
    "action": "RATION-CARD-F",
    "handledVerbs": [
      "GIVE",
      "SHOW"
    ],
    "verbGroups": [
      [
        "GIVE",
        "SHOW"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "GIVE",
      "SHOW"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "GIVE": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ],
      "SHOW": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SOY-PATTY"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RED-TUBECAR-OBJECT",
    "name": "red tubecar",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "VEHBIT"
    ],
    "synonyms": [
      "tubecar",
      "car",
      "train",
      "subway"
    ],
    "adjectives": [
      "red",
      "tube",
      "omni-fabb",
      "plant",
      "rockvil",
      "stadium"
    ],
    "commandNoun": "tubecar",
    "action": "RED-TUBECAR-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "BOARD",
      "DISEMBARK",
      "LEAVE",
      "WAIT-FOR"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "BOARD"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "WAIT-FOR"
      ]
    ],
    "actionRooms": [
      "RED-TUBECAR"
    ],
    "globalVerbs": [
      "WAIT-FOR"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "BOARD",
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "RED-TUBECAR"
      ],
      "BOARD": [
        "RED-TUBECAR"
      ],
      "DISEMBARK": [
        "RED-TUBECAR"
      ],
      "LEAVE": [
        "RED-TUBECAR"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "RED-TUBECAR"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RESIGNATION",
    "name": "resignation",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "resignation",
      "letter"
    ],
    "adjectives": [
      "resignation",
      "your"
    ],
    "commandNoun": "resignation",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RUSTY-CROSS",
    "name": "rusty cross",
    "initialLocation": null,
    "flags": [
      "TRYTAKEBIT",
      "TAKEBIT"
    ],
    "synonyms": [
      "cross",
      "object"
    ],
    "adjectives": [
      "rusty",
      "rusting",
      "metal"
    ],
    "commandNoun": "rusty cross",
    "action": "RUSTY-CROSS-F",
    "handledVerbs": [
      "TAKE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SILVER-DOVE",
    "name": "Silver Dove",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "dove"
    ],
    "adjectives": [
      "silver"
    ],
    "commandNoun": "silver dove",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SUPERMARKET",
    "name": "supermarket",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "foodville",
      "supermark",
      "store",
      "grocery",
      "market"
    ],
    "adjectives": [
      "grocery",
      "food"
    ],
    "commandNoun": "supermarket",
    "action": "SUPERMARKET-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE",
      "SMELL",
      "WASH"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2",
      "SOUTHWAY-AND-PARK",
      "MAIN-AND-WICKER"
    ],
    "globalVerbs": [
      "SMELL",
      "WASH"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "SMELL",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "FOODVILLE-1",
        "FOODVILLE-2",
        "SOUTHWAY-AND-PARK",
        "MAIN-AND-WICKER"
      ],
      "WALK-TO": [
        "FOODVILLE-1",
        "FOODVILLE-2",
        "SOUTHWAY-AND-PARK",
        "MAIN-AND-WICKER"
      ],
      "DISEMBARK": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ],
      "LEAVE": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ],
      "EXAMINE": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BUILDING",
      "GLOBAL-ROOM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "VENTILATION",
    "name": "ventilation",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "ventilati"
    ],
    "adjectives": [
      "alpha",
      "beta",
      "gamma",
      "delta"
    ],
    "commandNoun": "ventilation",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WATER-TOWER-OBJECT",
    "name": "water tower",
    "initialLocation": "WATER-TOWER",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "tower",
      "tank"
    ],
    "adjectives": [
      "water",
      "shiny",
      "corroding",
      "decrepit",
      "plastallo"
    ],
    "commandNoun": "water tower",
    "action": "WATER-TOWER-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "CLIMB-FOO",
      "CLIMB-UP"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "CLIMB-FOO",
        "CLIMB-UP"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "CLIMB-FOO",
      "CLIMB-UP"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "CLIMB-FOO",
      "CLIMB-UP"
    ],
    "refusalOnlyVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MY-BUZZER",
    "name": "your buzzer",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "MYBIT"
    ],
    "synonyms": [
      "buzzer",
      "bell"
    ],
    "adjectives": [
      "my"
    ],
    "commandNoun": "buzzer",
    "action": "MY-BUZZER-F",
    "handledVerbs": [
      "PUSH",
      "READ"
    ],
    "verbGroups": [
      [
        "PUSH"
      ],
      [
        "READ"
      ]
    ],
    "actionRooms": [
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [
      "PUSH",
      "READ"
    ],
    "guaranteedVerbs": [
      "PUSH",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PARKVIEW-DOOR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "AUDITORIUM",
    "name": "auditorium",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "auditorium"
    ],
    "adjectives": [
      "kresge"
    ],
    "commandNoun": "auditorium",
    "action": "STUDENT-UNION-ITEM-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CLERKMATON",
    "name": "clerkmaton",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "clerkmato"
    ],
    "adjectives": [],
    "commandNoun": "clerkmaton",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "COURTHOUSE-OBJECT",
    "name": "courthouse",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "courthouse",
      "house"
    ],
    "adjectives": [
      "court"
    ],
    "commandNoun": "courthouse",
    "action": "COURTHOUSE-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "COURTHOUSE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "COURTHOUSE"
      ],
      "WALK-TO": [
        "COURTHOUSE"
      ],
      "LEAVE": [
        "COURTHOUSE"
      ],
      "DISEMBARK": [
        "COURTHOUSE"
      ],
      "EXAMINE": [
        "COURTHOUSE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DRUG-STORE-OBJECT",
    "name": "drug store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "store",
      "stores",
      "shop",
      "shops",
      "pharmacy"
    ],
    "adjectives": [
      "drug"
    ],
    "commandNoun": "drug store",
    "action": "DRUG-STORE-OBJECT-F",
    "handledVerbs": [
      "DISEMBARK",
      "LEAVE",
      "THROUGH",
      "WALK-TO",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "DRUG-STORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "DISEMBARK": [
        "DRUG-STORE"
      ],
      "LEAVE": [
        "DRUG-STORE"
      ],
      "THROUGH": [
        "DRUG-STORE"
      ],
      "WALK-TO": [
        "DRUG-STORE"
      ],
      "EXAMINE": [
        "DRUG-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FIRECOPTER",
    "name": "firecopter",
    "initialLocation": "FIREHOUSE",
    "flags": [
      "VEHBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "firecopte",
      "copter"
    ],
    "adjectives": [
      "fire",
      "yellow"
    ],
    "commandNoun": "firecopter",
    "action": "FIRETRUCK-F",
    "handledVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "BOARD",
        "THROUGH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FLOODLIGHT",
    "name": "floodlight",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "spotlight",
      "floodlight"
    ],
    "adjectives": [
      "harsh",
      "powerful"
    ],
    "commandNoun": "floodlight",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HEADSTONES",
    "name": "headstones",
    "initialLocation": "CEMETERY",
    "flags": [
      "READBIT",
      "NDESCBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "headstone",
      "graveston",
      "tombstone",
      "stone",
      "stones"
    ],
    "adjectives": [
      "head",
      "grave",
      "tomb",
      "toppled",
      "vandalize"
    ],
    "commandNoun": "headstones",
    "action": "HEADSTONES-F",
    "handledVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "GRAFFITI"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HUANG-HALL-OBJECT",
    "name": "Huang Hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hall",
      "center",
      "facade"
    ],
    "adjectives": [
      "huang",
      "convention",
      "austere",
      "boxy",
      "multi-purpose",
      "plain"
    ],
    "commandNoun": "huang hall",
    "action": "HUANG-HALL-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CENTRE-AND-KENNEDY",
      "HALLEY-AND-PARK",
      "HALLEY-PARK-EAST",
      "HUANG-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "CENTRE-AND-KENNEDY",
        "HALLEY-AND-PARK",
        "HALLEY-PARK-EAST"
      ],
      "THROUGH": [
        "CENTRE-AND-KENNEDY",
        "HALLEY-AND-PARK",
        "HALLEY-PARK-EAST"
      ],
      "LEAVE": [
        "HUANG-HALL"
      ],
      "DISEMBARK": [
        "HUANG-HALL"
      ],
      "EXAMINE": [
        "HUANG-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "POOL-TABLE",
    "name": "pool table",
    "initialLocation": "POOL-HALL",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "table",
      "tables"
    ],
    "adjectives": [
      "pool",
      "billiard"
    ],
    "commandNoun": "pool table",
    "action": "POOL-TABLE-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PRISM-NAME",
    "name": "PRISM.NAME",
    "initialLocation": "PERELMAN-PERSONAL-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PROSTITUTE",
    "name": "prostitute",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT"
    ],
    "synonyms": [
      "prostitute",
      "whore",
      "harlot",
      "hooker",
      "streetwalker",
      "paramour",
      "concubine",
      "nightwalker",
      "cocotte",
      "slut"
    ],
    "adjectives": [],
    "commandNoun": "prostitute",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JOYBOOTH-BUTTON",
    "name": "red button",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "button"
    ],
    "adjectives": [
      "red"
    ],
    "commandNoun": "red button",
    "action": "JOYBOOTH-BUTTON-F",
    "handledVerbs": [
      "PUSH"
    ],
    "verbGroups": [
      [
        "PUSH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "PUSH"
    ],
    "guaranteedVerbs": [
      "PUSH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "JOYBOOTH"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "HEADSET",
      "SEAT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RESTAURANT-OBJECT",
    "name": "restaurant",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "restaurant",
      "pagoda",
      "coachman",
      "meister",
      "world",
      "burgerwor",
      "simon's"
    ],
    "adjectives": [
      "small",
      "large",
      "chinese",
      "famous",
      "expensive",
      "well-known",
      "fast",
      "food",
      "fast-food",
      "four",
      "star",
      "four-star",
      "well",
      "known",
      "roy's",
      "roys"
    ],
    "commandNoun": "restaurant",
    "action": "RESTAURANT-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "BURGER-MEISTER",
      "AQUARIUM-AND-PARK",
      "MAIN-AND-WICKER",
      "BODANSKI-SQUARE",
      "ELM-UNDERPASS"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-WICKER",
        "AQUARIUM-AND-PARK",
        "BODANSKI-SQUARE"
      ],
      "WALK-TO": [
        "MAIN-AND-WICKER",
        "AQUARIUM-AND-PARK",
        "BODANSKI-SQUARE"
      ],
      "DISEMBARK": [
        "ELM-UNDERPASS",
        "MAIN-AND-WICKER",
        "BODANSKI-SQUARE",
        "AQUARIUM-AND-PARK"
      ],
      "LEAVE": [
        "ELM-UNDERPASS",
        "MAIN-AND-WICKER",
        "BODANSKI-SQUARE",
        "AQUARIUM-AND-PARK"
      ],
      "EXAMINE": [
        "ELM-UNDERPASS",
        "AQUARIUM-AND-PARK",
        "BODANSKI-SQUARE",
        "MAIN-AND-WICKER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BUILDING"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RIVER-BANK",
    "name": "river bank",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bank",
      "riverbank",
      "river-bank"
    ],
    "adjectives": [
      "river"
    ],
    "commandNoun": "river bank",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SLEEP-MODE",
    "name": "Sleep Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "mode"
    ],
    "adjectives": [
      "sleep"
    ],
    "commandNoun": "sleep mode",
    "action": "SLEEP-MODE-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STADIUM-STANDS",
    "name": "the stands",
    "initialLocation": "ROCKVIL-STADIUM",
    "flags": [
      "VEHBIT",
      "FURNITUREBIT",
      "NARTICLEBIT",
      "PLURALBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "stands",
      "seat",
      "seats",
      "deck",
      "bleachers",
      "bleacher"
    ],
    "adjectives": [
      "bleacher",
      "upper",
      "lower",
      "stadium"
    ],
    "commandNoun": "stands",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "VACANT-LOT",
    "name": "vacant lot",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "lot"
    ],
    "adjectives": [
      "vacant",
      "empty",
      "large"
    ],
    "commandNoun": "vacant lot",
    "action": "VACANT-LOT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ]
    ],
    "actionRooms": [
      "WAREHOUSE-1",
      "WICKER-AND-RIVER",
      "AQUARIUM-AND-RIVER",
      "SKYCAR-LOT-5",
      "CHURCH-ENTRANCE",
      "ST-MICHAELS",
      "FIRST-METHODIST-CHURCH"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "AQUARIUM-AND-RIVER",
        "SKYCAR-LOT-5",
        "WICKER-AND-RIVER",
        "CHURCH-ENTRANCE"
      ],
      "WALK-TO": [
        "AQUARIUM-AND-RIVER",
        "SKYCAR-LOT-5",
        "WICKER-AND-RIVER",
        "CHURCH-ENTRANCE"
      ],
      "LEAVE": [
        "WAREHOUSE-1",
        "ST-MICHAELS",
        "FIRST-METHODIST-CHURCH"
      ],
      "DISEMBARK": [
        "WAREHOUSE-1",
        "ST-MICHAELS",
        "FIRST-METHODIST-CHURCH"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "VIEWSCREEN",
    "name": "viewscreen",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "viewscreen",
      "screen"
    ],
    "adjectives": [
      "two-meter"
    ],
    "commandNoun": "viewscreen",
    "action": "VIEWSCREEN-F",
    "handledVerbs": [
      "EXAMINE",
      "ON"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "ON"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "ON"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WNN-FEEDER",
    "name": "WNN Feeder",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "feeder"
    ],
    "adjectives": [
      "wnn",
      "world",
      "news",
      "network"
    ],
    "commandNoun": "feeder",
    "action": "WNN-FEEDER-F",
    "handledVerbs": [
      "STATUS",
      "ON",
      "OFF",
      "SET",
      "TRANSMIT",
      "HELLO"
    ],
    "verbGroups": [
      [
        "STATUS"
      ],
      [
        "ON"
      ],
      [
        "OFF"
      ],
      [
        "SET"
      ],
      [
        "TRANSMIT"
      ],
      [
        "HELLO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "ON",
      "OFF",
      "SET",
      "TRANSMIT",
      "HELLO"
    ],
    "guaranteedVerbs": [
      "STATUS",
      "ON",
      "OFF",
      "SET",
      "TRANSMIT",
      "HELLO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "TRANSMITTER",
      "RECORD-BUFFER",
      "CURRENT-FEED",
      "REPORT-BUFFER",
      "NEWS-BUFFER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "WNN-INSTRUCTIONS",
    "name": "WNN.FEEDER",
    "initialLocation": null,
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HANDS",
    "name": "your hands",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "TOUCHBIT",
      "NARTICLEBIT",
      "PLURALBIT",
      "MYBIT"
    ],
    "synonyms": [
      "hands",
      "hand"
    ],
    "adjectives": [
      "bare",
      "my",
      "your"
    ],
    "commandNoun": "your hands",
    "action": "HANDS-F",
    "handledVerbs": [
      "WAVE",
      "SHAKE",
      "WASH"
    ],
    "verbGroups": [
      [
        "WAVE"
      ],
      [
        "SHAKE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "WAVE",
      "SHAKE",
      "WASH"
    ],
    "guaranteedVerbs": [
      "WAVE",
      "SHAKE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SINK"
    ],
    "removedObjectIds": []
  },
  {
    "id": "APARTMENT-OBJECT",
    "name": "apartment",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "apartment",
      "flat",
      "pad"
    ],
    "adjectives": [],
    "commandNoun": "apartment",
    "action": "APARTMENT-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "WASH"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "LIVING-ROOM"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO",
      "WASH"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "DISEMBARK": [
        "LIVING-ROOM"
      ],
      "LEAVE": [
        "LIVING-ROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "GLOBAL-ROOM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BATHROOMS",
    "name": "bathrooms",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "bathrooms"
    ],
    "adjectives": [],
    "commandNoun": "bathrooms",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "POOL",
    "name": "billiards",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "pool",
      "billiards"
    ],
    "adjectives": [],
    "commandNoun": "billiards",
    "action": "POOL-F",
    "handledVerbs": [
      "PLAY",
      "SHOOT"
    ],
    "verbGroups": [
      [
        "PLAY",
        "SHOOT"
      ]
    ],
    "actionRooms": [
      "POOL-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "PLAY",
      "SHOOT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "PLAY": [
        "POOL-HALL"
      ],
      "SHOOT": [
        "POOL-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BLEACHERS",
    "name": "bleachers",
    "initialLocation": "ATHLETIC-FIELD",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT"
    ],
    "synonyms": [
      "bleacher",
      "bleachers"
    ],
    "adjectives": [],
    "commandNoun": "bleachers",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SCHOOL-BOOKSTORE",
    "name": "bookstore",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "store",
      "bookstore",
      "shop",
      "bookshop"
    ],
    "adjectives": [
      "book"
    ],
    "commandNoun": "bookstore",
    "action": "STUDENT-UNION-ITEM-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BOOKSTORE-OBJECT",
    "name": "bookstore",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "store",
      "stores",
      "shop",
      "shops",
      "bookstore"
    ],
    "adjectives": [
      "book"
    ],
    "commandNoun": "bookstore",
    "action": "BOOKSTORE-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SEARCH",
      "SMELL"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SEARCH"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "BOOKSTORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SEARCH",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BOOKSTORE"
      ],
      "THROUGH": [
        "BOOKSTORE"
      ],
      "LEAVE": [
        "BOOKSTORE"
      ],
      "DISEMBARK": [
        "BOOKSTORE"
      ],
      "EXAMINE": [
        "BOOKSTORE"
      ],
      "SEARCH": [
        "BOOKSTORE"
      ],
      "SMELL": [
        "BOOKSTORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BOOKS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BSF-GUARDS",
    "name": "BSF guard",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "guard",
      "guards"
    ],
    "adjectives": [
      "bsf",
      "border",
      "security",
      "force"
    ],
    "commandNoun": "bsf guard",
    "action": "BSF-GUARDS-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "NATIONAL-GUARDSMAN"
    ],
    "removedObjectIds": []
  },
  {
    "id": "CAFETERIA-OBJECT",
    "name": "cafeteria",
    "initialLocation": "CAFETERIA",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "cafeteria",
      "cafe",
      "hall"
    ],
    "adjectives": [
      "dining"
    ],
    "commandNoun": "cafeteria",
    "action": "CAFETERIA-OBJECT-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "UNIVERSITY-CAFETERIA",
    "name": "cafeteria",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "cafeteria",
      "cafe"
    ],
    "adjectives": [],
    "commandNoun": "cafeteria",
    "action": "STUDENT-UNION-ITEM-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CITY-HALL-OBJECT",
    "name": "City Hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "hall"
    ],
    "adjectives": [
      "city"
    ],
    "commandNoun": "city hall",
    "action": "CITY-HALL-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ]
    ],
    "actionRooms": [
      "CITY-HALL",
      "ROCKVIL-CENTRE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "CITY-HALL"
      ],
      "WALK-TO": [
        "CITY-HALL"
      ],
      "LEAVE": [
        "ROCKVIL-CENTRE"
      ],
      "DISEMBARK": [
        "ROCKVIL-CENTRE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CLASSROOMS",
    "name": "classroom",
    "initialLocation": "LECTURE-HALL",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "classroom",
      "room",
      "rooms"
    ],
    "adjectives": [
      "small",
      "smaller",
      "class"
    ],
    "commandNoun": "classroom",
    "action": "LECTURE-HALL-ITEM-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "LECTURE-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "LECTURE-HALL"
      ],
      "WALK-TO": [
        "LECTURE-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ANDERSON-DIRECTORY",
    "name": "directory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "directory"
    ],
    "adjectives": [],
    "commandNoun": "directory",
    "action": "ANDERSON-DIRECTORY-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "HEALTH-CENTER"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "HEALTH-CENTER-OBJECT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "DORM-OBJECT",
    "name": "dormitory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "dorm",
      "dormitory",
      "complex"
    ],
    "adjectives": [
      "dorm",
      "dormitory"
    ],
    "commandNoun": "dormitory",
    "action": "DORM-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "SMELL",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "SMELL"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "DORM"
    ],
    "globalVerbs": [
      "SMELL"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "DORM"
      ],
      "WALK-TO": [
        "DORM"
      ],
      "DISEMBARK": [
        "DORM"
      ],
      "LEAVE": [
        "DORM"
      ],
      "EXAMINE": [
        "DORM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MINDEX"
    ],
    "removedObjectIds": []
  },
  {
    "id": "DUCK-POND",
    "name": "duck pond",
    "initialLocation": "HALLEY-PARK-WEST",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "pond",
      "bed"
    ],
    "adjectives": [
      "small",
      "duck",
      "dried-out"
    ],
    "commandNoun": "duck pond",
    "action": "DUCK-POND-F",
    "handledVerbs": [
      "EXAMINE",
      "LOOK-INSIDE",
      "PUT",
      "THROW",
      "BOARD",
      "THROUGH",
      "SWIM"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "PUT",
        "THROW"
      ],
      [
        "BOARD",
        "THROUGH",
        "SWIM"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "LOOK-INSIDE",
      "PUT",
      "THROW",
      "BOARD",
      "THROUGH",
      "SWIM"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "LOOK-INSIDE",
      "PUT",
      "THROW",
      "BOARD",
      "THROUGH",
      "SWIM"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FIREPLACE",
    "name": "fireplace",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "fireplace",
      "hearth",
      "brick",
      "chimney"
    ],
    "adjectives": [
      "central",
      "circular",
      "deep",
      "red",
      "brick"
    ],
    "commandNoun": "fireplace",
    "action": "FIREPLACE-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FIRETRUCK",
    "name": "firetruck",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VEHBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "firetruck",
      "truck"
    ],
    "adjectives": [
      "fire",
      "yellow"
    ],
    "commandNoun": "firetruck",
    "action": "FIRETRUCK-F",
    "handledVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "BOARD",
        "THROUGH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "FIREHOUSE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LAMP-POST",
    "name": "lamp post",
    "initialLocation": "BODANSKI-SQUARE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "post"
    ],
    "adjectives": [
      "lamp"
    ],
    "commandNoun": "lamp post",
    "action": "LAMP-POST-F",
    "handledVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "CLIMB-FOO",
        "CLIMB-UP"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "NEWSPAPER-DISPENSER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MACHINERY",
    "name": "machinery",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "machinery"
    ],
    "adjectives": [],
    "commandNoun": "machinery",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MANTA-RAY",
    "name": "manta ray",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "ray"
    ],
    "adjectives": [
      "manta"
    ],
    "commandNoun": "manta ray",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "AQUARIUM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MILKSHAKE",
    "name": "milkshake",
    "initialLocation": "DRUG-STORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "milkshake",
      "frappe",
      "soda",
      "shake",
      "float",
      "cream"
    ],
    "adjectives": [
      "milk",
      "ice",
      "cream"
    ],
    "commandNoun": "milkshake",
    "action": "MILKSHAKE-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY",
        "TAKE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "DRUG-STORE"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "DRUG-STORE"
      ],
      "TAKE": [
        "DRUG-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "NEWSPAPER",
    "name": "newspaper",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT",
      "TAKEBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "newspaper",
      "paper",
      "times",
      "article",
      "story",
      "section"
    ],
    "adjectives": [
      "news",
      "rockie",
      "headline",
      "newspaper"
    ],
    "commandNoun": "newspaper",
    "action": "NEWSPAPER-F",
    "handledVerbs": [
      "READ",
      "TAKE",
      "BUY",
      "PUT"
    ],
    "verbGroups": [
      [
        "READ",
        "TAKE"
      ],
      [
        "READ"
      ],
      [
        "BUY"
      ],
      [
        "PUT"
      ]
    ],
    "actionRooms": [
      "BODANSKI-SQUARE",
      "DRUG-STORE"
    ],
    "globalVerbs": [
      "READ",
      "TAKE",
      "PUT"
    ],
    "guaranteedVerbs": [
      "READ",
      "TAKE",
      "BUY",
      "PUT"
    ],
    "refusalOnlyVerbs": [
      "PUT"
    ],
    "verbRooms": {
      "BUY": [
        "BODANSKI-SQUARE",
        "DRUG-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "EPILOGUE-LIVING-ROOM",
      "BODANSKI-SQUARE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "NEWSPAPER-DISPENSER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "PARTITION",
    "name": "partition",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "partition"
    ],
    "adjectives": [
      "thin"
    ],
    "commandNoun": "partition",
    "action": "PARTITION-F",
    "handledVerbs": [
      "LOOK-BEHIND",
      "WALK-AROUND",
      "LOOK"
    ],
    "verbGroups": [
      [
        "LOOK-BEHIND",
        "WALK-AROUND",
        "LOOK"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-BEHIND",
      "WALK-AROUND",
      "LOOK"
    ],
    "guaranteedVerbs": [
      "LOOK-BEHIND",
      "WALK-AROUND",
      "LOOK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "LIVING-ROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PLAN-DATA-DIRECTORY",
    "name": "PLAN.DATA",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "POOL-HALL-OBJECT",
    "name": "pool hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hall",
      "establishment"
    ],
    "adjectives": [
      "pool",
      "classless"
    ],
    "commandNoun": "pool hall",
    "action": "POOL-HALL-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "POOL-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "POOL-HALL"
      ],
      "THROUGH": [
        "POOL-HALL"
      ],
      "LEAVE": [
        "POOL-HALL"
      ],
      "DISEMBARK": [
        "POOL-HALL"
      ],
      "EXAMINE": [
        "POOL-HALL"
      ],
      "SMELL": [
        "POOL-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RESERVOIR",
    "name": "reservoir",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "reservoir"
    ],
    "adjectives": [],
    "commandNoun": "reservoir",
    "action": "RESERVOIR-F",
    "handledVerbs": [
      "BOARD",
      "THROUGH",
      "SWIM",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BOARD",
        "THROUGH",
        "SWIM"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BOARD",
      "THROUGH",
      "SWIM",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BOARD",
      "THROUGH",
      "SWIM",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CHURCH-SKYCOPTER",
    "name": "skycopter",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "skycopter",
      "announcem",
      "loudspeak",
      "speaker",
      "copter"
    ],
    "adjectives": [
      "sky"
    ],
    "commandNoun": "skycopter",
    "action": "CHURCH-SKYCOPTER-F",
    "handledVerbs": [
      "LISTEN",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "LISTEN",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": [
      "CHURCH-SKYCOPTER"
    ]
  },
  {
    "id": "SOY-PATTY",
    "name": "soy patty",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ],
    "synonyms": [
      "patty",
      "package",
      "food"
    ],
    "adjectives": [
      "soy",
      "smelly"
    ],
    "commandNoun": "soy patty",
    "action": "SOY-PATTY-F",
    "handledVerbs": [
      "EAT",
      "EXAMINE",
      "BUY"
    ],
    "verbGroups": [
      [
        "EAT"
      ],
      [
        "EXAMINE"
      ],
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [
      "EAT",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EAT",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "BUY"
    ],
    "verbRooms": {
      "BUY": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": [
      "SOY-PATTY"
    ]
  },
  {
    "id": "SPACEPORT",
    "name": "spaceport",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "spaceport"
    ],
    "adjectives": [
      "once",
      "thriving",
      "once-thriving"
    ],
    "commandNoun": "spaceport",
    "action": "SPACEPORT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ]
    ],
    "actionRooms": [
      "TERMINAL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "WALK-TO",
      "THROUGH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "TERMINAL"
      ],
      "THROUGH": [
        "TERMINAL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TAX-STUDY",
    "name": "TAX.STUDY",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ],
    "synonyms": [],
    "adjectives": [],
    "commandNoun": null,
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TERMINAL-BANKS",
    "name": "terminals",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "bank",
      "banks",
      "terminal",
      "terminals",
      "equipment"
    ],
    "adjectives": [],
    "commandNoun": "terminals",
    "action": "COMPUTER-TERMINAL-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "STACKS-OF-PAPERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "TOWNHOUSE",
    "name": "townhouse",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "townhouse",
      "complex",
      "cluster"
    ],
    "adjectives": [
      "luxury",
      "high-security"
    ],
    "commandNoun": "townhouse",
    "action": "TOWNHOUSE-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-KENNEDY",
      "ELM-AND-KENNEDY",
      "ELM-AND-PARK"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "MAIN-AND-KENNEDY",
        "ELM-AND-KENNEDY",
        "ELM-AND-PARK"
      ],
      "THROUGH": [
        "MAIN-AND-KENNEDY",
        "ELM-AND-KENNEDY",
        "ELM-AND-PARK"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GOLD",
    "name": "Vera Gold",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "vera",
      "gold",
      "administr"
    ],
    "adjectives": [
      "vera",
      "chief"
    ],
    "commandNoun": "gold",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WAREHOUSE-OBJECT",
    "name": "warehouse",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "warehouse"
    ],
    "adjectives": [
      "gray",
      "grey",
      "old",
      "dingy"
    ],
    "commandNoun": "warehouse",
    "action": "WAREHOUSE-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "WAREHOUSE-1",
      "WICKER-AND-RIVER",
      "INDUSTRIAL-PARK-ENTRANCE",
      "INDUSTRIAL-PARK-DRIVE",
      "WAREHOUSE-2"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "WICKER-AND-RIVER",
        "INDUSTRIAL-PARK-ENTRANCE",
        "INDUSTRIAL-PARK-DRIVE"
      ],
      "THROUGH": [
        "WICKER-AND-RIVER",
        "INDUSTRIAL-PARK-ENTRANCE",
        "INDUSTRIAL-PARK-DRIVE"
      ],
      "LEAVE": [
        "WAREHOUSE-1",
        "WAREHOUSE-2"
      ],
      "DISEMBARK": [
        "WAREHOUSE-1",
        "WAREHOUSE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "FACTORY-OBJECT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "WATERPOOL",
    "name": "waterpool",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "waterpool",
      "pool",
      "fountain"
    ],
    "adjectives": [
      "sprawling",
      "free-form",
      "water"
    ],
    "commandNoun": "waterpool",
    "action": "WATERPOOL-F",
    "handledVerbs": [
      "THROUGH",
      "BOARD",
      "SWIM",
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "BOARD",
        "SWIM"
      ],
      [
        "LOOK-INSIDE",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "BOARD",
      "SWIM",
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "BOARD",
      "SWIM",
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "KENNEDY-PARK"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HEAD",
    "name": "your head",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "MYBIT"
    ],
    "synonyms": [
      "head",
      "face"
    ],
    "adjectives": [
      "your",
      "my"
    ],
    "commandNoun": "your head",
    "action": "HEAD-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "refusalOnlyVerbs": [
      "CLOSE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MY-NAME",
    "name": "your name",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "MYBIT"
    ],
    "synonyms": [
      "name"
    ],
    "adjectives": [
      "my",
      "your"
    ],
    "commandNoun": "your name",
    "action": "MY-NAME-F",
    "handledVerbs": [
      "WHAT"
    ],
    "verbGroups": [
      [
        "WHAT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "WHAT"
    ],
    "guaranteedVerbs": [
      "WHAT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "ME"
    ],
    "removedObjectIds": []
  },
  {
    "id": "AQUARIUM-OBJECT",
    "name": "Aquarium",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "aquarium"
    ],
    "adjectives": [],
    "commandNoun": "aquarium",
    "action": "AQUARIUM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "HALLEY-PARK-EAST",
      "SKYCAR-LOT-4",
      "AQUARIUM-AND-PARK",
      "AQUARIUM-AND-KENNEDY",
      "AQUARIUM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "HALLEY-PARK-EAST",
        "SKYCAR-LOT-4",
        "AQUARIUM-AND-PARK",
        "AQUARIUM-AND-KENNEDY"
      ],
      "THROUGH": [
        "HALLEY-PARK-EAST",
        "SKYCAR-LOT-4",
        "AQUARIUM-AND-PARK",
        "AQUARIUM-AND-KENNEDY"
      ],
      "LEAVE": [
        "AQUARIUM"
      ],
      "DISEMBARK": [
        "AQUARIUM"
      ],
      "EXAMINE": [
        "AQUARIUM"
      ],
      "SMELL": [
        "AQUARIUM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BATHROOM-OBJECT",
    "name": "bathroom",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bath",
      "bathroom",
      "room",
      "restroom"
    ],
    "adjectives": [
      "large",
      "plain",
      "rest",
      "bath"
    ],
    "commandNoun": "bathroom",
    "action": "BATHROOM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "TAKE",
      "EXAMINE",
      "WASH"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "TAKE"
      ],
      [
        "EXAMINE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "BEDROOM",
      "FOYER",
      "EPILOGUE-BATHROOM",
      "BATHROOM"
    ],
    "globalVerbs": [
      "WASH"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "TAKE",
      "EXAMINE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BEDROOM",
        "FOYER"
      ],
      "THROUGH": [
        "BEDROOM",
        "FOYER"
      ],
      "LEAVE": [
        "BEDROOM",
        "FOYER",
        "EPILOGUE-BATHROOM"
      ],
      "DISEMBARK": [
        "BEDROOM",
        "FOYER",
        "EPILOGUE-BATHROOM"
      ],
      "TAKE": [
        "EPILOGUE-BATHROOM"
      ],
      "EXAMINE": [
        "BATHROOM",
        "EPILOGUE-BATHROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "TUB",
      "GLOBAL-ROOM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BSF-BASE",
    "name": "BSF base",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "base",
      "monument"
    ],
    "adjectives": [
      "manville",
      "border",
      "security",
      "force",
      "bsf",
      "military",
      "sobering"
    ],
    "commandNoun": "bsf base",
    "action": "BSF-BASE-F",
    "handledVerbs": [
      "EXAMINE",
      "LEAVE",
      "DISEMBARK",
      "WALK-TO",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SKYCAB",
      "BASE-GATE",
      "SYMPHONY-ENTRANCE"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {
      "LEAVE": [
        "BASE-GATE"
      ],
      "DISEMBARK": [
        "BASE-GATE"
      ],
      "WALK-TO": [
        "BASE-GATE",
        "SYMPHONY-ENTRANCE"
      ],
      "THROUGH": [
        "BASE-GATE",
        "SYMPHONY-ENTRANCE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BUILDING",
    "name": "building",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "building",
      "apartment",
      "bldg",
      "buildings",
      "bldgs",
      "structure",
      "edifice",
      "edifices"
    ],
    "adjectives": [
      "apartment"
    ],
    "commandNoun": "building",
    "action": "BUILDING-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO",
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "BURNED-OUT-AREA",
      "CHURCH-ENTRANCE",
      "MIDLAND-AND-CHURCH",
      "CONSTRUCTION-SITE-5"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "BURNED-OUT-AREA",
        "CHURCH-ENTRANCE",
        "MIDLAND-AND-CHURCH",
        "CONSTRUCTION-SITE-5"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CEMETERY-OBJECT",
    "name": "cemetery",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "cemetery",
      "graveyard"
    ],
    "adjectives": [
      "midland"
    ],
    "commandNoun": "cemetery",
    "action": "CEMETERY-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CEMETERY",
      "MAIN-AND-WICKER",
      "MAIN-AND-CHURCH",
      "CHURCH-ENTRANCE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "CEMETERY",
        "MAIN-AND-WICKER",
        "MAIN-AND-CHURCH",
        "CHURCH-ENTRANCE"
      ],
      "WALK-TO": [
        "CEMETERY",
        "MAIN-AND-WICKER",
        "MAIN-AND-CHURCH",
        "CHURCH-ENTRANCE"
      ],
      "DISEMBARK": [
        "CEMETERY"
      ],
      "LEAVE": [
        "CEMETERY"
      ],
      "EXAMINE": [
        "CEMETERY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CHILDREN",
    "name": "children",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "child",
      "children",
      "schoolchild",
      "kid",
      "kids"
    ],
    "adjectives": [
      "school"
    ],
    "commandNoun": "children",
    "action": "CHILDREN-F",
    "handledVerbs": [
      "TELL",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "LIVING-ROOM",
      "ZOO"
    ],
    "globalVerbs": [
      "TELL",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TELL",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MITCHELL",
      "PAINTING"
    ],
    "removedObjectIds": []
  },
  {
    "id": "CRIMINAL",
    "name": "criminal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "criminal",
      "thief",
      "murderer",
      "mugger"
    ],
    "adjectives": [],
    "commandNoun": "criminal",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DUNBARS-OBJECT",
    "name": "Dunbar's",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "dunbar's",
      "dunbars",
      "store",
      "shop",
      "boutique"
    ],
    "adjectives": [
      "venerable",
      "departmen",
      "dept",
      "swank",
      "elegant",
      "upscale"
    ],
    "commandNoun": "dunbar's",
    "action": "DUNBARS-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "DUNBARS",
      "ROCKVIL-CENTRE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "DUNBARS"
      ],
      "WALK-TO": [
        "DUNBARS"
      ],
      "DISEMBARK": [
        "ROCKVIL-CENTRE"
      ],
      "LEAVE": [
        "ROCKVIL-CENTRE"
      ],
      "EXAMINE": [
        "DUNBARS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DOORWAY",
    "name": "entrance",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "door",
      "doors",
      "entrance",
      "opening",
      "doorway",
      "arch",
      "archway",
      "portal",
      "portals"
    ],
    "adjectives": [
      "wide",
      "steel",
      "impressiv",
      "tall",
      "arched"
    ],
    "commandNoun": "entrance",
    "action": "DOORWAY-F",
    "handledVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE",
      "SMELL",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "SMELL"
      ],
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE",
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "SMELL",
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [
      "CLOSE",
      "LOOK-INSIDE"
    ],
    "verbRooms": {
      "SMELL": [
        "WICKER-AND-RIVER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "STAIRS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "EXHIBITS",
    "name": "exhibits",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "VOWELBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "exhibit",
      "exhibits",
      "life",
      "art",
      "science",
      "engineeri",
      "history",
      "travel"
    ],
    "adjectives": [
      "smaller",
      "marine",
      "life",
      "modern",
      "classical",
      "natural",
      "human",
      "art",
      "history",
      "science",
      "engineeri",
      "railroad",
      "rr",
      "rail",
      "travel",
      "visually",
      "interesti"
    ],
    "commandNoun": "exhibits",
    "action": "EXHIBITS-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "AQUARIUM",
      "RAILROAD-MUSEUM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "AQUARIUM",
        "RAILROAD-MUSEUM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GRAFFITI",
    "name": "graffiti",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "READBIT"
    ],
    "synonyms": [
      "graffiti"
    ],
    "adjectives": [],
    "commandNoun": "graffiti",
    "action": "GRAFFITI-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [
      "RED-TUBECAR",
      "BROWN-TUBECAR",
      "CEMETERY",
      "ELM-UNDERPASS",
      "CHURCH-STREET-PARK",
      "CHURCH-ENTRANCE",
      "HALLEY-PARK-EAST"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "READ": [
        "CEMETERY",
        "CHURCH-STREET-PARK",
        "RED-TUBECAR",
        "BROWN-TUBECAR",
        "ELM-UNDERPASS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PICTUREPHONE",
      "HEADSTONES"
    ],
    "removedObjectIds": []
  },
  {
    "id": "GUN-SHOP-OBJECT",
    "name": "gun shop",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "shop",
      "store"
    ],
    "adjectives": [
      "gun"
    ],
    "commandNoun": "gun shop",
    "action": "GUN-SHOP-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXIT",
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "FACTORY-ENTRANCE",
      "GUN-SHOP"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "FACTORY-ENTRANCE"
      ],
      "THROUGH": [
        "FACTORY-ENTRANCE"
      ],
      "EXIT": [
        "FACTORY-ENTRANCE"
      ],
      "LEAVE": [
        "FACTORY-ENTRANCE"
      ],
      "DISEMBARK": [
        "FACTORY-ENTRANCE"
      ],
      "EXAMINE": [
        "GUN-SHOP"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HARDWARE",
    "name": "hardware",
    "initialLocation": "HARDWARE-STORE",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "hardware",
      "tool",
      "tools"
    ],
    "adjectives": [],
    "commandNoun": "hardware",
    "action": "HARDWARE-F",
    "handledVerbs": [
      "BUY",
      "TAKE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE"
      ]
    ],
    "actionRooms": [
      "HARDWARE-STORE"
    ],
    "globalVerbs": [
      "TAKE"
    ],
    "guaranteedVerbs": [
      "TAKE"
    ],
    "refusalOnlyVerbs": [
      "BUY"
    ],
    "verbRooms": {
      "BUY": [
        "HARDWARE-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HOMEWORK",
    "name": "homework",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "homework",
      "coursework"
    ],
    "adjectives": [
      "typical",
      "sixth-grade"
    ],
    "commandNoun": "homework",
    "action": "HOMEWORK-F",
    "handledVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "LIVING-ROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HOSPITAL-OBJECT",
    "name": "hospital",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hospital",
      "facility"
    ],
    "adjectives": [
      "rockvil",
      "general",
      "old",
      "prestigious"
    ],
    "commandNoun": "hospital",
    "action": "HOSPITAL-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "HOSPITAL",
      "ELM-AND-KENNEDY",
      "HOSPITAL-ANNEX"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "HOSPITAL",
        "ELM-AND-KENNEDY"
      ],
      "THROUGH": [
        "HOSPITAL",
        "ELM-AND-KENNEDY"
      ],
      "DISEMBARK": [
        "HOSPITAL",
        "HOSPITAL-ANNEX"
      ],
      "LEAVE": [
        "HOSPITAL",
        "HOSPITAL-ANNEX"
      ],
      "EXAMINE": [
        "HOSPITAL",
        "HOSPITAL-ANNEX"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JOYBOOTH-OBJECT",
    "name": "joybooth",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "joybooth",
      "joybooths",
      "booth",
      "booths"
    ],
    "adjectives": [
      "joy",
      "dizzard"
    ],
    "commandNoun": "joybooth",
    "action": "JOYBOOTH-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "JOYBOOTH",
      "ROCKVIL-MALL"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "JOYBOOTH"
      ],
      "WALK-TO": [
        "JOYBOOTH"
      ],
      "DISEMBARK": [
        "ROCKVIL-MALL"
      ],
      "LEAVE": [
        "ROCKVIL-MALL"
      ],
      "EXAMINE": [
        "JOYBOOTH"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MAGAZINE",
    "name": "magazine",
    "initialLocation": "DRUG-STORE",
    "flags": [
      "NDESCBIT",
      "READBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "magazine",
      "magazines",
      "mag",
      "mags",
      "publicati",
      "periodica",
      "article"
    ],
    "adjectives": [
      "magazine"
    ],
    "commandNoun": "magazine",
    "action": "MAGAZINE-F",
    "handledVerbs": [
      "TAKE",
      "READ",
      "EXAMINE",
      "BUY"
    ],
    "verbGroups": [
      [
        "TAKE",
        "READ",
        "EXAMINE"
      ],
      [
        "BUY",
        "TAKE",
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SKYCAB",
      "DRUG-STORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "TAKE",
      "READ",
      "EXAMINE",
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "TAKE": [
        "SKYCAB",
        "DRUG-STORE"
      ],
      "READ": [
        "SKYCAB",
        "DRUG-STORE"
      ],
      "EXAMINE": [
        "SKYCAB",
        "DRUG-STORE"
      ],
      "BUY": [
        "DRUG-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MIDNIGHT",
    "name": "midnight",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "midnight"
    ],
    "adjectives": [],
    "commandNoun": "midnight",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MITCHELL",
    "name": "Mitchell",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "CONTBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "mitchell",
      "simm",
      "mitch",
      "rav",
      "son",
      "boy",
      "lad"
    ],
    "adjectives": [
      "mitchell",
      "mitch",
      "rav",
      "my"
    ],
    "commandNoun": "mitchell",
    "action": "MITCHELL-F",
    "handledVerbs": [
      "HELLO",
      "KISS",
      "EXAMINE",
      "PLAY-WITH",
      "FOLLOW",
      "WALK-TO",
      "TOUCH"
    ],
    "verbGroups": [
      [
        "HELLO"
      ],
      [
        "KISS"
      ],
      [
        "EXAMINE"
      ],
      [
        "PLAY-WITH"
      ],
      [
        "FOLLOW"
      ],
      [
        "WALK-TO"
      ],
      [
        "TOUCH"
      ]
    ],
    "actionRooms": [
      "KITCHEN",
      "BEDROOM",
      "BATHROOM"
    ],
    "globalVerbs": [
      "HELLO",
      "KISS",
      "EXAMINE",
      "PLAY-WITH",
      "FOLLOW",
      "WALK-TO",
      "TOUCH"
    ],
    "guaranteedVerbs": [
      "HELLO",
      "KISS",
      "EXAMINE",
      "PLAY-WITH",
      "FOLLOW",
      "WALK-TO",
      "TOUCH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "LIVING-ROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PARTITION",
      "BED"
    ],
    "removedObjectIds": []
  },
  {
    "id": "OVERCOAT",
    "name": "overcoat",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "overcoat"
    ],
    "adjectives": [
      "white"
    ],
    "commandNoun": "overcoat",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PAINTING",
    "name": "painting",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "painting",
      "art",
      "artwork",
      "canvas",
      "sketch",
      "watercolor",
      "endeavor",
      "picture"
    ],
    "adjectives": [
      "watercolor",
      "bright",
      "artistic",
      "vibrant",
      "acrylide",
      "brooding",
      "dark",
      "pencil"
    ],
    "commandNoun": "painting",
    "action": "PAINTING-F",
    "handledVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TAKE",
        "MOVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "EASEL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "PEDESTAL",
    "name": "pedestal",
    "initialLocation": "HALLEY-PARK-EAST",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ],
    "synonyms": [
      "base",
      "pedestal",
      "inscripti"
    ],
    "adjectives": [
      "defaced",
      "inscribed"
    ],
    "commandNoun": "pedestal",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "AIRPORT-SIGN",
    "name": "red sign",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ],
    "synonyms": [
      "sign"
    ],
    "adjectives": [
      "red"
    ],
    "commandNoun": "red sign",
    "action": "AIRPORT-SIGN-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SKYLIGHT",
    "name": "skylight",
    "initialLocation": "COLONIAL-HOTEL",
    "flags": [
      "NDESCBIT",
      "TRANSBIT"
    ],
    "synonyms": [
      "skylight"
    ],
    "adjectives": [
      "wide"
    ],
    "commandNoun": "skylight",
    "action": "SKYLIGHT-F",
    "handledVerbs": [
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SOUVENIR",
    "name": "souvenir",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "souvenir",
      "souvenirs",
      "trinket",
      "trinkets",
      "junk"
    ],
    "adjectives": [
      "typically",
      "cheap",
      "overpriced",
      "over-priced",
      "train-related"
    ],
    "commandNoun": "souvenir",
    "action": "SOUVENIR-F",
    "handledVerbs": [
      "BUY",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "TRAIN-STATION"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "TRAIN-STATION"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "TRAIN-STATION"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TENEMENT-OBJECT",
    "name": "tenement",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "tenement",
      "tenements",
      "slum",
      "slums",
      "row",
      "unit"
    ],
    "adjectives": [
      "old",
      "dirty",
      "filthy",
      "run-down",
      "ugly",
      "deserted",
      "residence",
      "disease",
      "ridden",
      "disease-ridden",
      "malodorous",
      "substandard",
      "sub-standard",
      "rat-infested",
      "rat",
      "infested"
    ],
    "commandNoun": "tenement",
    "action": "TENEMENT-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "WICKER-AND-RIVER",
      "POWER-STATION-ENTRANCE",
      "INDUSTRIAL-PARK-ENTRANCE",
      "DUMP-ENTRANCE",
      "FACTORY-ENTRANCE",
      "WICKER-AND-PIER",
      "TENEMENT-2",
      "TENEMENT-3",
      "TENEMENT-1"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "WICKER-AND-RIVER",
        "POWER-STATION-ENTRANCE",
        "INDUSTRIAL-PARK-ENTRANCE",
        "DUMP-ENTRANCE",
        "FACTORY-ENTRANCE",
        "WICKER-AND-PIER"
      ],
      "THROUGH": [
        "WICKER-AND-RIVER",
        "POWER-STATION-ENTRANCE",
        "INDUSTRIAL-PARK-ENTRANCE",
        "DUMP-ENTRANCE",
        "FACTORY-ENTRANCE",
        "WICKER-AND-PIER"
      ],
      "LEAVE": [
        "TENEMENT-2",
        "TENEMENT-3"
      ],
      "DISEMBARK": [
        "TENEMENT-2",
        "TENEMENT-3"
      ],
      "EXAMINE": [
        "TENEMENT-1",
        "TENEMENT-2",
        "TENEMENT-3"
      ],
      "SMELL": [
        "TENEMENT-2",
        "TENEMENT-3"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PERELMAN-TERMINAL",
    "name": "terminal",
    "initialLocation": "OFFICE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "terminal"
    ],
    "adjectives": [
      "computer"
    ],
    "commandNoun": "terminal",
    "action": "COMPUTER-TERMINAL-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "STACKS-OF-PAPERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SKYBUS-TERMINAL-OBJECT",
    "name": "terminal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "terminal",
      "station"
    ],
    "adjectives": [
      "skybus",
      "run-down"
    ],
    "commandNoun": "terminal",
    "action": "SKYBUS-TERMINAL-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ]
    ],
    "actionRooms": [
      "SKYBUS-TERMINAL",
      "MAIN-AND-KENNEDY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "SKYBUS-TERMINAL",
        "MAIN-AND-KENNEDY"
      ],
      "WALK-TO": [
        "SKYBUS-TERMINAL",
        "MAIN-AND-KENNEDY"
      ],
      "DISEMBARK": [
        "SKYBUS-TERMINAL"
      ],
      "LEAVE": [
        "SKYBUS-TERMINAL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "AIRPORT-TERMINAL-OBJECT",
    "name": "terminal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "terminal",
      "airport"
    ],
    "adjectives": [
      "airport"
    ],
    "commandNoun": "terminal",
    "action": "AIRPORT-TERMINAL-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "TERMINAL",
      "AIRPORT-ENTRANCE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "TERMINAL",
        "AIRPORT-ENTRANCE"
      ],
      "WALK-TO": [
        "TERMINAL",
        "AIRPORT-ENTRANCE"
      ],
      "DISEMBARK": [
        "TERMINAL"
      ],
      "LEAVE": [
        "TERMINAL"
      ],
      "EXAMINE": [
        "TERMINAL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PLAN",
    "name": "the Plan",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "plan"
    ],
    "adjectives": [],
    "commandNoun": "plan",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TOTE-BAGS",
    "name": "tote bag",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "bag",
      "bags"
    ],
    "adjectives": [
      "tote",
      "small"
    ],
    "commandNoun": "tote bag",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CORE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TOY",
    "name": "toy duck",
    "initialLocation": "CRIB",
    "flags": [
      "TAKEBIT"
    ],
    "synonyms": [
      "toy",
      "duck",
      "ducks",
      "duckie"
    ],
    "adjectives": [
      "toy",
      "rubber",
      "yellow"
    ],
    "commandNoun": "toy duck",
    "action": "TOY-F",
    "handledVerbs": [
      "EXAMINE",
      "SQUEEZE",
      "PLAY-WITH"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "SQUEEZE",
        "PLAY-WITH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "SQUEEZE",
      "PLAY-WITH"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "SQUEEZE",
      "PLAY-WITH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "VIBRAMAT",
    "name": "vibramat",
    "initialLocation": "LAUNDROMAT",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "vibramat"
    ],
    "adjectives": [],
    "commandNoun": "vibramat",
    "action": "LAUNDROMAT-OBJECT-F",
    "handledVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "verbGroups": [
      [
        "OPEN",
        "ON"
      ],
      [
        "PUT"
      ],
      [
        "PUT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "refusalOnlyVerbs": [
      "OPEN",
      "ON"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "WASHERS",
      "DRYERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "ME",
    "name": "yourself",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "ACTORBIT",
      "TOUCHBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "myself",
      "perry",
      "prism",
      "self",
      "simm",
      "me",
      "i"
    ],
    "adjectives": [
      "perry"
    ],
    "commandNoun": "myself",
    "action": "ME-F",
    "handledVerbs": [
      "TELL",
      "LISTEN",
      "ALARM",
      "GIVE",
      "MOVE",
      "SEARCH",
      "KILL",
      "MUNG",
      "FIND",
      "WHERE",
      "WHO",
      "FOLLOW",
      "EXAMINE",
      "WASH",
      "CALL"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "LISTEN"
      ],
      [
        "ALARM"
      ],
      [
        "GIVE"
      ],
      [
        "MOVE"
      ],
      [
        "SEARCH"
      ],
      [
        "KILL",
        "MUNG"
      ],
      [
        "FIND",
        "WHERE"
      ],
      [
        "WHO"
      ],
      [
        "FOLLOW"
      ],
      [
        "EXAMINE"
      ],
      [
        "WASH"
      ],
      [
        "CALL"
      ]
    ],
    "actionRooms": [
      "MAIN-STREET-BRIDGE",
      "RIVER-STREET-BRIDGE",
      "PIER",
      "INTERFACE-ROOM",
      "SIMULATION-ROOM",
      "LIBRARY-ROOM",
      "SLEEP-ROOM",
      "COMM-ROOM"
    ],
    "globalVerbs": [
      "TELL",
      "LISTEN",
      "ALARM",
      "GIVE",
      "MOVE",
      "SEARCH",
      "KILL",
      "MUNG",
      "WHO",
      "FOLLOW",
      "EXAMINE",
      "WASH",
      "CALL"
    ],
    "guaranteedVerbs": [
      "TELL",
      "LISTEN",
      "ALARM",
      "GIVE",
      "KILL",
      "MUNG",
      "FIND",
      "WHERE",
      "WHO",
      "FOLLOW",
      "EXAMINE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "FIND": [
        "MAIN-STREET-BRIDGE",
        "RIVER-STREET-BRIDGE",
        "PIER",
        "INTERFACE-ROOM",
        "SIMULATION-ROOM",
        "LIBRARY-ROOM",
        "SLEEP-ROOM",
        "COMM-ROOM"
      ],
      "WHERE": [
        "MAIN-STREET-BRIDGE",
        "RIVER-STREET-BRIDGE",
        "PIER",
        "INTERFACE-ROOM",
        "SIMULATION-ROOM",
        "LIBRARY-ROOM",
        "SLEEP-ROOM",
        "COMM-ROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SLEEP-MODE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BARKING",
    "name": "barking",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "barking"
    ],
    "adjectives": [
      "distant"
    ],
    "commandNoun": "barking",
    "action": "BARKING-F",
    "handledVerbs": [
      "LISTEN"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN"
    ],
    "guaranteedVerbs": [
      "LISTEN"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BEDROOM-OBJECT",
    "name": "bedroom",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bedroom",
      "room"
    ],
    "adjectives": [
      "bed",
      "guest",
      "master",
      "huge",
      "round",
      "sunny",
      "cozy"
    ],
    "commandNoun": "bedroom",
    "action": "BEDROOM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE",
      "WASH"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "BEDROOM",
      "MASTER-BEDROOM",
      "GUEST-ROOM",
      "BATHROOM",
      "FOYER",
      "EPILOGUE-LIVING-ROOM"
    ],
    "globalVerbs": [
      "WASH"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BEDROOM",
        "MASTER-BEDROOM",
        "GUEST-ROOM",
        "BATHROOM",
        "FOYER",
        "EPILOGUE-LIVING-ROOM"
      ],
      "THROUGH": [
        "BEDROOM",
        "MASTER-BEDROOM",
        "GUEST-ROOM",
        "BATHROOM",
        "FOYER",
        "EPILOGUE-LIVING-ROOM"
      ],
      "DISEMBARK": [
        "BEDROOM",
        "MASTER-BEDROOM",
        "GUEST-ROOM"
      ],
      "LEAVE": [
        "BEDROOM",
        "MASTER-BEDROOM",
        "GUEST-ROOM"
      ],
      "EXAMINE": [
        "BEDROOM",
        "MASTER-BEDROOM",
        "GUEST-ROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "GLOBAL-ROOM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BLANKET",
    "name": "blanket",
    "initialLocation": "JAIL-CELL",
    "flags": [
      "TAKEBIT"
    ],
    "synonyms": [
      "blanket"
    ],
    "adjectives": [
      "ratty",
      "torn",
      "bug-infested"
    ],
    "commandNoun": "blanket",
    "action": "BLANKET-F",
    "handledVerbs": [
      "PUT-ON",
      "EXAMINE",
      "BOARD",
      "LIE-DOWN",
      "CLIMB-ON",
      "WEAR"
    ],
    "verbGroups": [
      [
        "PUT-ON"
      ],
      [
        "EXAMINE"
      ],
      [
        "BOARD",
        "LIE-DOWN",
        "CLIMB-ON",
        "WEAR"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "PUT-ON",
      "EXAMINE",
      "BOARD",
      "LIE-DOWN",
      "CLIMB-ON",
      "WEAR"
    ],
    "guaranteedVerbs": [
      "PUT-ON",
      "EXAMINE",
      "BOARD",
      "LIE-DOWN",
      "CLIMB-ON",
      "WEAR"
    ],
    "refusalOnlyVerbs": [
      "BOARD",
      "LIE-DOWN",
      "CLIMB-ON",
      "WEAR"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "JAIL-CELL"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "ME"
    ],
    "removedObjectIds": []
  },
  {
    "id": "CEILING",
    "name": "ceiling",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "TOUCHBIT"
    ],
    "synonyms": [
      "ceiling",
      "roof"
    ],
    "adjectives": [],
    "commandNoun": "ceiling",
    "action": "CEILING-F",
    "handledVerbs": [
      "LOOK-UNDER"
    ],
    "verbGroups": [
      [
        "LOOK-UNDER"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-UNDER"
    ],
    "guaranteedVerbs": [
      "LOOK-UNDER"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CLOTHES",
    "name": "clothes",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "TRYTAKEBIT",
      "NDESCBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "clothes",
      "clothing",
      "garment",
      "garments",
      "pants",
      "shirt",
      "shirts"
    ],
    "adjectives": [
      "my",
      "pair",
      "pairs",
      "fashionable",
      "drab",
      "brown",
      "olive",
      "stylish",
      "violet",
      "gold"
    ],
    "commandNoun": "clothes",
    "action": "CLOTHES-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "WEAR",
      "REMOVE",
      "TAKE-OFF",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE",
        "WEAR"
      ],
      [
        "REMOVE",
        "TAKE-OFF"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "DUNBARS",
      "HEIMAN-VILLAGE",
      "ROCKVIL-MALL"
    ],
    "globalVerbs": [
      "REMOVE",
      "TAKE-OFF"
    ],
    "guaranteedVerbs": [
      "BUY",
      "TAKE",
      "WEAR",
      "REMOVE",
      "TAKE-OFF",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "DUNBARS",
        "HEIMAN-VILLAGE",
        "ROCKVIL-MALL"
      ],
      "TAKE": [
        "DUNBARS"
      ],
      "WEAR": [
        "DUNBARS"
      ],
      "EXAMINE": [
        "DUNBARS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SWEATER",
      "SCARF",
      "VEST",
      "RACKS",
      "ME"
    ],
    "removedObjectIds": []
  },
  {
    "id": "COOLING",
    "name": "cooling",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "cooling"
    ],
    "adjectives": [
      "alpha",
      "beta",
      "gamma",
      "delta"
    ],
    "commandNoun": "cooling",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "COUNTER",
    "name": "counter",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "SURFACEBIT",
      "OPENBIT",
      "CONTBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "counter",
      "counters"
    ],
    "adjectives": [],
    "commandNoun": "counter",
    "action": "COUNTER-F",
    "handledVerbs": [
      "PUT",
      "PUT-ON"
    ],
    "verbGroups": [
      [
        "PUT",
        "PUT-ON"
      ]
    ],
    "actionRooms": [
      "KITCHEN",
      "EPILOGUE-KITCHEN"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "PUT": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ],
      "PUT-ON": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "EPILOGUE-KITCHEN"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BEER",
      "GLOBAL-TABLE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "DECODER",
    "name": "decoder",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "decoder"
    ],
    "adjectives": [],
    "commandNoun": "decoder",
    "action": "ITEM-IN-PACKAGE-F",
    "handledVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FACTORY-OBJECT",
    "name": "factory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "factory",
      "factories",
      "complex",
      "plant"
    ],
    "adjectives": [
      "factory",
      "large",
      "huge",
      "skycar",
      "omni",
      "fabb",
      "omni-fabb",
      "closed",
      "crumbling",
      "chip",
      "once-booming"
    ],
    "commandNoun": "factory",
    "action": "FACTORY-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CLOSED-FACTORY",
      "WICKER-AND-RIVER",
      "POWER-STATION-ENTRANCE",
      "FACTORY-ENTRANCE",
      "INDUSTRIAL-PARK-DRIVE",
      "SKYCAR-FACTORY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "WICKER-AND-RIVER",
        "POWER-STATION-ENTRANCE",
        "FACTORY-ENTRANCE",
        "INDUSTRIAL-PARK-DRIVE"
      ],
      "THROUGH": [
        "WICKER-AND-RIVER",
        "POWER-STATION-ENTRANCE",
        "FACTORY-ENTRANCE",
        "INDUSTRIAL-PARK-DRIVE"
      ],
      "LEAVE": [
        "CLOSED-FACTORY",
        "SKYCAR-FACTORY"
      ],
      "DISEMBARK": [
        "CLOSED-FACTORY",
        "SKYCAR-FACTORY"
      ],
      "EXAMINE": [
        "SKYCAR-FACTORY",
        "CLOSED-FACTORY",
        "INDUSTRIAL-PARK-DRIVE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GUN",
    "name": "firearm",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "firearm",
      "firearms",
      "gun",
      "guns",
      "rifle",
      "rifles",
      "pistol",
      "pistols",
      "weapon",
      "weapons",
      "gat",
      "gats",
      "heater",
      "heaters",
      "rod",
      "rods",
      "piece",
      "pieces",
      "automatic",
      "revolver",
      "revolvers",
      "special",
      "specials",
      "colt",
      "colts",
      "forty-five",
      "shotgun",
      "shotguns",
      "flintlock",
      "six-shooter",
      "biogun"
    ],
    "adjectives": [
      "snub",
      "nosed",
      "snub-nosed",
      "colt",
      "saturday",
      "night",
      "sawed-off",
      "bb",
      "machine",
      "sub-machine",
      "submachine",
      "forty-five",
      "caliber",
      "thirty-two",
      "thirty-eight",
      "twenty-two",
      "zip",
      "pellet",
      "silenced",
      "poorly",
      "concealed",
      "your"
    ],
    "commandNoun": "firearm",
    "action": "GUN-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "SHOOT",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE",
        "SHOOT"
      ],
      [
        "SHOOT"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CORE",
      "CONTROL-CENTER",
      "GUN-SHOP"
    ],
    "globalVerbs": [
      "SHOOT"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "SHOOT",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "GUN-SHOP"
      ],
      "TAKE": [
        "GUN-SHOP"
      ],
      "SHOOT": [
        "GUN-SHOP"
      ],
      "EXAMINE": [
        "GUN-SHOP"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SABOTEURS",
      "CREDIT-CARD"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HALLWAY",
    "name": "hallway",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hall",
      "hallway",
      "corridor",
      "foyer",
      "breezeway"
    ],
    "adjectives": [
      "dark",
      "bright",
      "airy"
    ],
    "commandNoun": "hallway",
    "action": "HALLWAY-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE",
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [
      "EPILOGUE-LIVING-ROOM",
      "HOSPITAL-ANNEX",
      "EPILOGUE-BATHROOM",
      "CINEMA",
      "LIVING-ROOM",
      "HOSPITAL",
      "DEN",
      "GUEST-ROOM",
      "PARKVIEW-HALL",
      "FOYER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "EPILOGUE-LIVING-ROOM",
        "HOSPITAL-ANNEX",
        "EPILOGUE-BATHROOM",
        "CINEMA",
        "LIVING-ROOM",
        "HOSPITAL",
        "DEN",
        "GUEST-ROOM"
      ],
      "THROUGH": [
        "EPILOGUE-LIVING-ROOM",
        "HOSPITAL-ANNEX",
        "EPILOGUE-BATHROOM",
        "CINEMA",
        "LIVING-ROOM",
        "HOSPITAL",
        "DEN",
        "GUEST-ROOM"
      ],
      "LEAVE": [
        "PARKVIEW-HALL",
        "FOYER"
      ],
      "DISEMBARK": [
        "PARKVIEW-HALL",
        "FOYER"
      ],
      "EXAMINE": [
        "PARKVIEW-HALL",
        "FOYER",
        "CINEMA"
      ],
      "LOOK-INSIDE": [
        "PARKVIEW-HALL",
        "FOYER",
        "CINEMA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HEADSET",
    "name": "headset",
    "initialLocation": "JOYBOOTH",
    "flags": [
      "NDESCBIT",
      "WEARBIT"
    ],
    "synonyms": [
      "headset",
      "headphone",
      "set"
    ],
    "adjectives": [
      "head"
    ],
    "commandNoun": "headset",
    "action": "HEADSET-F",
    "handledVerbs": [
      "TAKE",
      "PUT-ON"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "PUT-ON"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "PUT-ON"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "PUT-ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "JOYBOOTH"
    ],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "HEAD"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HEATING",
    "name": "heating",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "heating",
      "heat"
    ],
    "adjectives": [
      "alpha",
      "beta",
      "gamma",
      "delta"
    ],
    "commandNoun": "heating",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JUKEBOX",
    "name": "jukebox",
    "initialLocation": "BAR",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "jukebox",
      "box"
    ],
    "adjectives": [
      "juke",
      "old"
    ],
    "commandNoun": "jukebox",
    "action": "JUKEBOX-F",
    "handledVerbs": [
      "LISTEN",
      "ON",
      "PLAY"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ],
      [
        "ON",
        "PLAY"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN",
      "ON",
      "PLAY"
    ],
    "guaranteedVerbs": [
      "LISTEN",
      "ON",
      "PLAY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "KITCHEN-OBJECT",
    "name": "kitchen",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "kitchen"
    ],
    "adjectives": [
      "tiny",
      "lovely"
    ],
    "commandNoun": "kitchen",
    "action": "KITCHEN-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "WASH"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "KITCHEN",
      "EPILOGUE-KITCHEN"
    ],
    "globalVerbs": [
      "WASH"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "WASH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ],
      "THROUGH": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ],
      "LEAVE": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ],
      "DISEMBARK": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ],
      "EXAMINE": [
        "KITCHEN",
        "EPILOGUE-KITCHEN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "GLOBAL-ROOM"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MAIN-LIBRARY-OBJECT",
    "name": "library",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "library",
      "branch",
      "system"
    ],
    "adjectives": [
      "main",
      "rockvil",
      "public",
      "library"
    ],
    "commandNoun": "library",
    "action": "MAIN-LIBRARY-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "MAIN-LIBRARY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "MAIN-LIBRARY"
      ],
      "THROUGH": [
        "MAIN-LIBRARY"
      ],
      "LEAVE": [
        "MAIN-LIBRARY"
      ],
      "DISEMBARK": [
        "MAIN-LIBRARY"
      ],
      "EXAMINE": [
        "MAIN-LIBRARY"
      ],
      "SMELL": [
        "MAIN-LIBRARY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "LIBRARY-MODE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MAILBOXES",
    "name": "mailbox",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "mailbox",
      "mailboxes",
      "box",
      "boxes"
    ],
    "adjectives": [
      "vandalize",
      "tiny",
      "mail"
    ],
    "commandNoun": "mailbox",
    "action": "MAILBOXES-F",
    "handledVerbs": [
      "OPEN",
      "UNLOCK",
      "READ",
      "COUNT",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "UNLOCK"
      ],
      [
        "READ",
        "COUNT"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "UNLOCK",
      "READ",
      "COUNT",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "UNLOCK",
      "READ",
      "COUNT",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "UNLOCK"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "KEY",
      "BUZZERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MARQUEE",
    "name": "marquee",
    "initialLocation": "CINEMA",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ],
    "synonyms": [
      "marquee"
    ],
    "adjectives": [],
    "commandNoun": "marquee",
    "action": "MARQUEE-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RECTORY-OBJECT",
    "name": "rectory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "rectory",
      "parsonage",
      "pastorage",
      "building"
    ],
    "adjectives": [
      "old",
      "church"
    ],
    "commandNoun": "rectory",
    "action": "RECTORY-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "DISEMBARK"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CONSTRUCTION-SITE-5",
      "CHURCH-ENTRANCE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "CONSTRUCTION-SITE-5",
        "CHURCH-ENTRANCE"
      ],
      "DISEMBARK": [
        "CONSTRUCTION-SITE-5",
        "CHURCH-ENTRANCE"
      ],
      "LEAVE": [
        "CONSTRUCTION-SITE-5"
      ],
      "EXAMINE": [
        "CONSTRUCTION-SITE-5"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ROCKVIL-OBJECT",
    "name": "Rockvil",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "rockvil",
      "city"
    ],
    "adjectives": [],
    "commandNoun": "rockvil",
    "action": "ROCKVIL-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ROOFTOP",
      "SKYCAB"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "ROOFTOP",
        "SKYCAB"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SIMULATION-MODE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SHELVES",
    "name": "shelves",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "bookshelf",
      "bookshelves",
      "shelf",
      "shelves"
    ],
    "adjectives": [
      "overstuffed",
      "over-stuffed",
      "book",
      "bare",
      "closely",
      "placed",
      "heaping",
      "closely-placed",
      "sparsely",
      "filled",
      "adequately",
      "stocked"
    ],
    "commandNoun": "shelves",
    "action": "SHELVES-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "BOOKSTORE",
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "BOOKSTORE",
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SKYCAR",
    "name": "skycars",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "skycar",
      "skycars",
      "car",
      "cars"
    ],
    "adjectives": [
      "sky"
    ],
    "commandNoun": "skycars",
    "action": "SKYCAR-F",
    "handledVerbs": [
      "WAIT-FOR",
      "THROUGH",
      "BOARD",
      "COUNT",
      "BUY"
    ],
    "verbGroups": [
      [
        "WAIT-FOR"
      ],
      [
        "THROUGH",
        "BOARD"
      ],
      [
        "COUNT"
      ],
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "SERVICE-STATION",
      "SKYCAR-FACTORY"
    ],
    "globalVerbs": [
      "WAIT-FOR",
      "THROUGH",
      "BOARD",
      "BUY"
    ],
    "guaranteedVerbs": [
      "WAIT-FOR",
      "THROUGH",
      "BOARD",
      "COUNT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "COUNT": [
        "SKYCAR-FACTORY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STADIUM-OBJECT",
    "name": "stadium",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "stadium",
      "park",
      "facility"
    ],
    "adjectives": [
      "rockvil",
      "municipal",
      "monolithic",
      "plasticrete",
      "dark",
      "deserted",
      "multi-purpose",
      "multi",
      "purpose",
      "packed",
      "sporting",
      "sports",
      "event"
    ],
    "commandNoun": "stadium",
    "action": "STADIUM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "BOARD",
      "SIT"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "BOARD",
        "SIT"
      ]
    ],
    "actionRooms": [
      "ROCKVIL-STADIUM",
      "STADIUM-LOT-A",
      "STADIUM-LOT-B",
      "STADIUM-LOT-C",
      "TUBE-AT-STADIUM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "BOARD",
      "SIT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "ROCKVIL-STADIUM",
        "STADIUM-LOT-A",
        "STADIUM-LOT-B",
        "STADIUM-LOT-C"
      ],
      "THROUGH": [
        "ROCKVIL-STADIUM",
        "STADIUM-LOT-A",
        "STADIUM-LOT-B",
        "STADIUM-LOT-C"
      ],
      "LEAVE": [
        "ROCKVIL-STADIUM"
      ],
      "DISEMBARK": [
        "ROCKVIL-STADIUM"
      ],
      "EXAMINE": [
        "ROCKVIL-STADIUM",
        "TUBE-AT-STADIUM"
      ],
      "BOARD": [
        "ROCKVIL-STADIUM"
      ],
      "SIT": [
        "ROCKVIL-STADIUM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "STADIUM-STANDS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SOLARIUM-OBJECT",
    "name": "sunroom",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "solarium",
      "sunroom",
      "porch",
      "sunporch"
    ],
    "adjectives": [
      "enclosed",
      "glass-walled"
    ],
    "commandNoun": "sunroom",
    "action": "SOLARIUM-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "PATIO",
      "EPILOGUE-LIVING-ROOM",
      "SOLARIUM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "PATIO",
        "EPILOGUE-LIVING-ROOM"
      ],
      "THROUGH": [
        "PATIO",
        "EPILOGUE-LIVING-ROOM"
      ],
      "LEAVE": [
        "SOLARIUM"
      ],
      "DISEMBARK": [
        "SOLARIUM"
      ],
      "EXAMINE": [
        "SOLARIUM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SWEATER",
    "name": "sweater",
    "initialLocation": "DUNBARS",
    "flags": [
      "TAKEBIT",
      "WEARBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "sweater",
      "sweaters"
    ],
    "adjectives": [
      "brightly",
      "colored",
      "myalon",
      "my"
    ],
    "commandNoun": "sweater",
    "action": "SWEATER-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "DUNBARS"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CLOTHES"
    ],
    "removedObjectIds": []
  },
  {
    "id": "PATIO-OBJECT",
    "name": "terrace",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "patio",
      "terrace"
    ],
    "adjectives": [
      "wide",
      "outdoor"
    ],
    "commandNoun": "terrace",
    "action": "PATIO-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "PATIO"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "PATIO"
      ],
      "THROUGH": [
        "PATIO"
      ],
      "LEAVE": [
        "PATIO"
      ],
      "DISEMBARK": [
        "PATIO"
      ],
      "EXAMINE": [
        "PATIO"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WASHERS",
    "name": "washers",
    "initialLocation": "LAUNDROMAT",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "washer",
      "washers"
    ],
    "adjectives": [
      "tradition",
      "clothes"
    ],
    "commandNoun": "washers",
    "action": "LAUNDROMAT-OBJECT-F",
    "handledVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "verbGroups": [
      [
        "OPEN",
        "ON"
      ],
      [
        "PUT"
      ],
      [
        "PUT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "refusalOnlyVerbs": [
      "OPEN",
      "ON"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "VIBRAMAT",
      "DRYERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "ANIMAL",
    "name": "animal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "animal",
      "animals",
      "ape",
      "apes",
      "monkey",
      "monkeys",
      "ape",
      "apes"
    ],
    "adjectives": [
      "small",
      "whimpering",
      "various",
      "wild"
    ],
    "commandNoun": "animal",
    "action": "ANIMAL-F",
    "handledVerbs": [
      "TOUCH",
      "FEED",
      "GIVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TOUCH"
      ],
      [
        "FEED"
      ],
      [
        "GIVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ROCKVIL-STADIUM"
    ],
    "globalVerbs": [
      "TOUCH",
      "FEED",
      "GIVE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TOUCH",
      "FEED",
      "GIVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "TOUCH"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ATRIUM",
    "name": "atrium",
    "initialLocation": "COLONIAL-HOTEL",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "atrium"
    ],
    "adjectives": [
      "tremendou",
      "huge",
      "multi",
      "story",
      "multi-story"
    ],
    "commandNoun": "atrium",
    "action": "ATRIUM-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BANNER",
    "name": "banner",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ],
    "synonyms": [
      "banner"
    ],
    "adjectives": [],
    "commandNoun": "banner",
    "action": "BANNER-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "ZOO"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BUREAU",
    "name": "bureau",
    "initialLocation": "BEDROOM",
    "flags": [
      "NDESCBIT",
      "CONTBIT",
      "OPENBIT",
      "SURFACEBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "bureau",
      "dresser",
      "chest",
      "drawer",
      "drawers"
    ],
    "adjectives": [
      "flimsy"
    ],
    "commandNoun": "bureau",
    "action": "BUREAU-F",
    "handledVerbs": [
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "refusalOnlyVerbs": [
      "EXAMINE",
      "OPEN"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BUZZERS",
    "name": "buzzer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "buzzer",
      "buzzers",
      "doorbell",
      "doorbells"
    ],
    "adjectives": [
      "labelled"
    ],
    "commandNoun": "buzzer",
    "action": "BUZZERS-F",
    "handledVerbs": [
      "PUSH",
      "EXAMINE",
      "READ",
      "COUNT"
    ],
    "verbGroups": [
      [
        "PUSH"
      ],
      [
        "EXAMINE",
        "READ"
      ],
      [
        "COUNT"
      ]
    ],
    "actionRooms": [
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [
      "PUSH",
      "COUNT"
    ],
    "guaranteedVerbs": [
      "PUSH",
      "EXAMINE",
      "READ",
      "COUNT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "PARKVIEW-APARTMENTS"
      ],
      "READ": [
        "PARKVIEW-APARTMENTS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CAMPUS",
    "name": "campus",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "campus",
      "universit"
    ],
    "adjectives": [
      "rockvil",
      "universit",
      "bustling",
      "quiet",
      "nearly",
      "deserted",
      "urban",
      "closed"
    ],
    "commandNoun": "campus",
    "action": "CAMPUS-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ]
    ],
    "actionRooms": [
      "ELM-AND-UNIVERSITY",
      "LECTURE-HALL",
      "DORM",
      "HALLEY-AND-UNIVERSITY",
      "STUDENT-UNION",
      "ROCKVIL-UNIVERSITY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "refusalOnlyVerbs": [
      "LEAVE",
      "DISEMBARK"
    ],
    "verbRooms": {
      "THROUGH": [
        "ELM-AND-UNIVERSITY",
        "LECTURE-HALL",
        "DORM",
        "HALLEY-AND-UNIVERSITY",
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "ELM-AND-UNIVERSITY",
        "LECTURE-HALL",
        "DORM",
        "HALLEY-AND-UNIVERSITY",
        "STUDENT-UNION"
      ],
      "LEAVE": [
        "ROCKVIL-UNIVERSITY",
        "DORM",
        "STUDENT-UNION",
        "LECTURE-HALL"
      ],
      "DISEMBARK": [
        "ROCKVIL-UNIVERSITY",
        "DORM",
        "STUDENT-UNION",
        "LECTURE-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CHURCH-OBJECT",
    "name": "church",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "church",
      "word",
      "michael's",
      "headquarters"
    ],
    "adjectives": [
      "large",
      "opulent",
      "protestant",
      "catholic",
      "closed",
      "boarded",
      "boarded-up",
      "old",
      "new",
      "first",
      "methodist",
      "regional",
      "central",
      "michael's",
      "god's",
      "st"
    ],
    "commandNoun": "church",
    "action": "CHURCH-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "TRAIN-STATION",
      "BODANSKI-SQUARE",
      "MIDLAND-AND-RIVER",
      "AQUARIUM-AND-RIVER",
      "CHURCH-ENTRANCE",
      "FIRST-METHODIST-CHURCH",
      "SKYCAR-LOT-5",
      "ST-MICHAELS"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BODANSKI-SQUARE",
        "MIDLAND-AND-RIVER",
        "CHURCH-ENTRANCE",
        "SKYCAR-LOT-5",
        "AQUARIUM-AND-RIVER"
      ],
      "THROUGH": [
        "BODANSKI-SQUARE",
        "MIDLAND-AND-RIVER",
        "CHURCH-ENTRANCE",
        "SKYCAR-LOT-5",
        "AQUARIUM-AND-RIVER"
      ],
      "LEAVE": [
        "ST-MICHAELS",
        "TRAIN-STATION",
        "FIRST-METHODIST-CHURCH"
      ],
      "DISEMBARK": [
        "ST-MICHAELS",
        "TRAIN-STATION",
        "FIRST-METHODIST-CHURCH"
      ],
      "EXAMINE": [
        "TRAIN-STATION",
        "ST-MICHAELS",
        "FIRST-METHODIST-CHURCH",
        "CHURCH-ENTRANCE",
        "BODANSKI-SQUARE",
        "MIDLAND-AND-RIVER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DRYERS",
    "name": "dryers",
    "initialLocation": "LAUNDROMAT",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "dryer",
      "dryers"
    ],
    "adjectives": [
      "tradition",
      "clothes"
    ],
    "commandNoun": "dryers",
    "action": "LAUNDROMAT-OBJECT-F",
    "handledVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "verbGroups": [
      [
        "OPEN",
        "ON"
      ],
      [
        "PUT"
      ],
      [
        "PUT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "refusalOnlyVerbs": [
      "OPEN",
      "ON"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "VIBRAMAT",
      "WASHERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "FLOORS",
    "name": "floors",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ],
    "synonyms": [
      "floors"
    ],
    "adjectives": [],
    "commandNoun": "floors",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GROUND",
    "name": "ground",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "floor",
      "ground",
      "mud"
    ],
    "adjectives": [],
    "commandNoun": "ground",
    "action": "GROUND-F",
    "handledVerbs": [
      "CLIMB-UP",
      "CLIMB-ON",
      "CLIMB-FOO",
      "BOARD",
      "LIE-DOWN",
      "SIT",
      "LOOK-UNDER",
      "LEAVE"
    ],
    "verbGroups": [
      [
        "CLIMB-UP",
        "CLIMB-ON",
        "CLIMB-FOO",
        "BOARD",
        "LIE-DOWN",
        "SIT"
      ],
      [
        "LOOK-UNDER"
      ],
      [
        "LEAVE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "CLIMB-UP",
      "CLIMB-ON",
      "CLIMB-FOO",
      "BOARD",
      "LIE-DOWN",
      "SIT",
      "LOOK-UNDER",
      "LEAVE"
    ],
    "guaranteedVerbs": [
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LIQUOR",
    "name": "liquor",
    "initialLocation": "LIQUOR-STORE",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "drink",
      "liquor",
      "booze",
      "alcohol"
    ],
    "adjectives": [],
    "commandNoun": "liquor",
    "action": "LIQUOR-F",
    "handledVerbs": [
      "BUY",
      "TAKE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE"
      ]
    ],
    "actionRooms": [
      "LIQUOR-STORE",
      "EZZIS-BAR",
      "BAR",
      "BURGER-MEISTER",
      "SIMONS",
      "THE-COACHMAN",
      "ROYS-PAGODA"
    ],
    "globalVerbs": [
      "TAKE"
    ],
    "guaranteedVerbs": [
      "TAKE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "LIQUOR-STORE",
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER",
        "SIMONS",
        "THE-COACHMAN",
        "ROYS-PAGODA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SCOTCH",
      "BEER",
      "OTHER-LIQUOR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "OTHER-LIQUOR",
    "name": "liquor",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "champagne",
      "schnapps",
      "amaretto",
      "burgundy",
      "whiskey",
      "liqueur",
      "tequila",
      "whisky",
      "kahlua",
      "cognac",
      "sherry",
      "glass",
      "vodka",
      "wine",
      "port",
      "rum",
      "ale"
    ],
    "adjectives": [],
    "commandNoun": "champagne",
    "action": "OTHER-LIQUOR-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "LIQUOR-STORE",
      "EZZIS-BAR",
      "BAR",
      "BURGER-MEISTER",
      "SIMONS",
      "THE-COACHMAN",
      "ROYS-PAGODA"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "LIQUOR-STORE",
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER",
        "SIMONS",
        "THE-COACHMAN",
        "ROYS-PAGODA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SCOTCH",
      "LIQUOR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "LOUNGE",
    "name": "lounge",
    "initialLocation": "DORM",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "lounge"
    ],
    "adjectives": [],
    "commandNoun": "lounge",
    "action": "LOUNGE-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "SMELL"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "DORM"
    ],
    "globalVerbs": [
      "SMELL"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "DORM"
      ],
      "WALK-TO": [
        "DORM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MINDEX"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MINDEX",
    "name": "mindex",
    "initialLocation": "DORM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "mindex"
    ],
    "adjectives": [],
    "commandNoun": "mindex",
    "action": "MINDEX-F",
    "handledVerbs": [
      "PUSH",
      "MOVE",
      "TOUCH",
      "SMELL",
      "BUY"
    ],
    "verbGroups": [
      [
        "PUSH",
        "MOVE",
        "TOUCH"
      ],
      [
        "SMELL"
      ],
      [
        "BUY"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "PUSH",
      "MOVE",
      "TOUCH",
      "SMELL",
      "BUY"
    ],
    "guaranteedVerbs": [
      "PUSH",
      "MOVE",
      "TOUCH",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MUSEUM-OBJECT",
    "name": "museum",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "museum"
    ],
    "adjectives": [
      "halley",
      "railroad"
    ],
    "commandNoun": "museum",
    "action": "MUSEUM-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SKYCAB",
      "RIVERSIDE-PARK",
      "HALLEY-AND-PARK",
      "MUSEUM-ENTRANCE",
      "HALLEY-MUSEUM",
      "RAILROAD-MUSEUM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "RIVERSIDE-PARK",
        "HALLEY-AND-PARK",
        "MUSEUM-ENTRANCE"
      ],
      "WALK-TO": [
        "RIVERSIDE-PARK",
        "HALLEY-AND-PARK",
        "MUSEUM-ENTRANCE"
      ],
      "DISEMBARK": [
        "HALLEY-MUSEUM",
        "RAILROAD-MUSEUM"
      ],
      "LEAVE": [
        "HALLEY-MUSEUM",
        "RAILROAD-MUSEUM"
      ],
      "EXAMINE": [
        "HALLEY-MUSEUM",
        "RAILROAD-MUSEUM",
        "HALLEY-AND-PARK",
        "MUSEUM-ENTRANCE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BSF-BASE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "INTNUM",
    "name": "number",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "intnum"
    ],
    "adjectives": [
      "number"
    ],
    "commandNoun": "number intnum",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "OFFICE-OBJECT",
    "name": "office",
    "initialLocation": "OFFICE",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "office"
    ],
    "adjectives": [],
    "commandNoun": "office",
    "action": "OFFICE-OBJECT-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PROFESSOR-OFFICES",
    "name": "office",
    "initialLocation": "LECTURE-HALL",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "office",
      "offices"
    ],
    "adjectives": [
      "professor",
      "prof",
      "prof's"
    ],
    "commandNoun": "office",
    "action": "LECTURE-HALL-ITEM-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "LECTURE-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "LECTURE-HALL"
      ],
      "WALK-TO": [
        "LECTURE-HALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PEOPLE",
    "name": "people",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "people",
      "men",
      "women",
      "crowd",
      "crowds",
      "mob",
      "mobs",
      "diners",
      "serfs",
      "marketeer",
      "students"
    ],
    "adjectives": [
      "frenzied",
      "bloodthirsty",
      "mealtime",
      "black"
    ],
    "commandNoun": "people",
    "action": "PEOPLE-F",
    "handledVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "FOLLOW",
      "WAIT-FOR",
      "EXAMINE",
      "LISTEN"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "ASK-ABOUT",
        "TELL-ABOUT"
      ],
      [
        "FOLLOW"
      ],
      [
        "WAIT-FOR"
      ],
      [
        "EXAMINE",
        "LISTEN"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ATHLETIC-FIELD",
      "CORE",
      "ROOFTOP",
      "ROCKVIL-STADIUM",
      "BAR"
    ],
    "globalVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "FOLLOW"
    ],
    "guaranteedVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "EXAMINE",
      "LISTEN"
    ],
    "refusalOnlyVerbs": [
      "TELL"
    ],
    "verbRooms": {
      "WAIT-FOR": [
        "CORE",
        "ROOFTOP"
      ],
      "EXAMINE": [
        "ROCKVIL-STADIUM",
        "BAR"
      ],
      "LISTEN": [
        "ROCKVIL-STADIUM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "SABOTEURS",
      "CHILDREN"
    ],
    "removedObjectIds": []
  },
  {
    "id": "PLAQUE",
    "name": "plaque",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ],
    "synonyms": [
      "plaque"
    ],
    "adjectives": [
      "small",
      "bronze"
    ],
    "commandNoun": "plaque",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [
      "KENNEDY-PARK"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JAIL-OBJECT",
    "name": "prison",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "jail",
      "prison",
      "cell",
      "cells",
      "reformato"
    ],
    "adjectives": [
      "rockvil",
      "jail",
      "river",
      "street",
      "empty",
      "crowded"
    ],
    "commandNoun": "prison",
    "action": "JAIL-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "LOOK-INSIDE",
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "WATER-TOWER",
      "ROCKVIL-REFORMATORY",
      "POLICE-STATION",
      "JAIL-CELL"
    ],
    "globalVerbs": [
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "WATER-TOWER",
        "ROCKVIL-REFORMATORY",
        "POLICE-STATION"
      ],
      "WALK-TO": [
        "WATER-TOWER",
        "ROCKVIL-REFORMATORY",
        "POLICE-STATION"
      ],
      "DISEMBARK": [
        "WATER-TOWER",
        "POLICE-STATION",
        "ROCKVIL-REFORMATORY"
      ],
      "LEAVE": [
        "WATER-TOWER",
        "POLICE-STATION",
        "ROCKVIL-REFORMATORY"
      ],
      "EXAMINE": [
        "JAIL-CELL",
        "ROCKVIL-REFORMATORY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CC-PRINTOUT",
    "name": "report",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "report",
      "printout"
    ],
    "adjectives": [
      "hefty",
      "long",
      "thick"
    ],
    "commandNoun": "report",
    "action": "CC-PRINTOUT-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "STACKS-OF-PAPERS"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SCHOOL-OBJECT",
    "name": "school",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "school"
    ],
    "adjectives": [
      "vincent",
      "rockvil",
      "high",
      "public",
      "private",
      "old",
      "oldest",
      "secondary",
      "mortimer",
      "dental",
      "fairly",
      "new",
      "small",
      "church-owned"
    ],
    "commandNoun": "school",
    "action": "SCHOOL-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "HEIMAN-VILLAGE",
      "AQUARIUM-AND-KENNEDY",
      "RIVER-AND-KENNEDY",
      "AIRPORTWAY-AND-RIVER",
      "ROCKVIL-HIGH",
      "DENTAL-SCHOOL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "AQUARIUM-AND-KENNEDY",
        "RIVER-AND-KENNEDY",
        "AIRPORTWAY-AND-RIVER"
      ],
      "THROUGH": [
        "AQUARIUM-AND-KENNEDY",
        "RIVER-AND-KENNEDY",
        "AIRPORTWAY-AND-RIVER"
      ],
      "LEAVE": [
        "ROCKVIL-HIGH",
        "DENTAL-SCHOOL"
      ],
      "DISEMBARK": [
        "ROCKVIL-HIGH",
        "DENTAL-SCHOOL"
      ],
      "EXAMINE": [
        "DENTAL-SCHOOL",
        "ROCKVIL-HIGH",
        "AQUARIUM-AND-KENNEDY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SKYBUS",
    "name": "skybus",
    "initialLocation": "SKYBUS-TERMINAL",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "skybus"
    ],
    "adjectives": [],
    "commandNoun": "skybus",
    "action": "SKYBUS-F",
    "handledVerbs": [
      "THROUGH",
      "WAIT-FOR",
      "EXAMINE",
      "FIND"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "WAIT-FOR",
        "EXAMINE",
        "FIND"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WAIT-FOR",
      "EXAMINE",
      "FIND"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "WAIT-FOR",
      "EXAMINE",
      "FIND"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SKYCAB-OBJECT",
    "name": "skycab",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "skycab",
      "cab",
      "skytaxi",
      "taxi",
      "hack",
      "limousine",
      "limo"
    ],
    "adjectives": [
      "sky",
      "luxurious",
      "top-of-the-line"
    ],
    "commandNoun": "skycab",
    "action": "SKYCAB-OBJECT-F",
    "handledVerbs": [
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXIT",
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STAIRS",
    "name": "stairs",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "step",
      "steps",
      "stair",
      "stairs",
      "stairway",
      "staircase",
      "stairwell"
    ],
    "adjectives": [
      "sealed-off",
      "covered"
    ],
    "commandNoun": "stairs",
    "action": "STAIRS-F",
    "handledVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN",
      "SMELL",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "CLIMB-UP",
        "CLIMB-FOO"
      ],
      [
        "CLIMB-DOWN"
      ],
      [
        "SMELL"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "WICKER-AND-RIVER",
      "MASTER-BEDROOM"
    ],
    "globalVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN"
    ],
    "guaranteedVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN",
      "SMELL",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "SMELL": [
        "WICKER-AND-RIVER"
      ],
      "EXAMINE": [
        "MASTER-BEDROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STATUE",
    "name": "statue",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "statue",
      "kennedy",
      "john",
      "jfk"
    ],
    "adjectives": [
      "john",
      "fitzgeral"
    ],
    "commandNoun": "statue",
    "action": "STATUE-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "KENNEDY-PARK"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PLAQUE"
    ],
    "removedObjectIds": []
  },
  {
    "id": "HALLEY-STATUE",
    "name": "statue",
    "initialLocation": "HALLEY-PARK-EAST",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ],
    "synonyms": [
      "statue",
      "francisco",
      "halley"
    ],
    "adjectives": [
      "francisco",
      "halley"
    ],
    "commandNoun": "statue",
    "action": "HALLEY-STATUE-F",
    "handledVerbs": [
      "WHO",
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "WHO"
      ],
      [
        "EXAMINE",
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "WHO",
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "WHO",
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PEDESTAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "TICKET",
    "name": "ticket",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "ticket",
      "pass"
    ],
    "adjectives": [
      "boarding"
    ],
    "commandNoun": "ticket",
    "action": "TICKET-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE"
      ],
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CINEMA",
      "TRAIN-STATION",
      "WELLS-THEATRE",
      "PICKFORD-THEATRE",
      "SKYBUS-TERMINAL",
      "TERMINAL"
    ],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "CINEMA",
        "TRAIN-STATION",
        "WELLS-THEATRE",
        "PICKFORD-THEATRE",
        "SKYBUS-TERMINAL",
        "TERMINAL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "CINEMA"
    ],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "TICKET-SELLER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "TOILET",
    "name": "toilet",
    "initialLocation": "BATHROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT"
    ],
    "synonyms": [
      "toilet",
      "potty",
      "john"
    ],
    "adjectives": [],
    "commandNoun": "toilet",
    "action": "TOILET-F",
    "handledVerbs": [
      "FLUSH",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "FLUSH"
      ],
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "FLUSH",
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "FLUSH",
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "EPILOGUE-BATHROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TUNNEL",
    "name": "tunnel",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "tunnel"
    ],
    "adjectives": [],
    "commandNoun": "tunnel",
    "action": "TUNNEL-F",
    "handledVerbs": [
      "THROUGH",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [
      "CHURCH-STREET-PARK",
      "HALLEY-AND-PARK",
      "AQUARIUM-AND-PARK"
    ],
    "globalVerbs": [
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "HALLEY-AND-PARK",
        "AQUARIUM-AND-PARK"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TURTLE",
    "name": "turtle",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "turtle"
    ],
    "adjectives": [
      "sea"
    ],
    "commandNoun": "turtle",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "AQUARIUM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WALLET",
    "name": "wallet",
    "initialLocation": null,
    "flags": [
      "CONTBIT",
      "TAKEBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "wallet"
    ],
    "adjectives": [
      "your",
      "my"
    ],
    "commandNoun": "wallet",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "APARTMENT-WINDOW",
    "name": "window",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRANSBIT"
    ],
    "synonyms": [
      "window",
      "windows"
    ],
    "adjectives": [
      "huge"
    ],
    "commandNoun": "window",
    "action": "APARTMENT-WINDOW-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GLOBAL-WINDOW",
    "name": "window",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRANSBIT"
    ],
    "synonyms": [
      "window",
      "windows"
    ],
    "adjectives": [
      "broken",
      "tall",
      "large",
      "huge",
      "plate",
      "glass",
      "shattered",
      "tinted",
      "zero-glare"
    ],
    "commandNoun": "window",
    "action": "GLOBAL-WINDOW-F",
    "handledVerbs": [
      "LOOK-INSIDE",
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "verbGroups": [
      [
        "LOOK-INSIDE",
        "EXAMINE",
        "OPEN"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "LOOK-INSIDE",
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE",
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [
      "POST-OFFICE",
      "SOUTHWAY-AND-PARK",
      "MAIN-AND-WICKER",
      "ELM-UNDERPASS",
      "RAILROAD-MUSEUM",
      "BURNED-OUT-AREA",
      "WICKER-AND-PIER",
      "CAFETERIA",
      "MASTER-BEDROOM",
      "SKYCAB"
    ],
    "globalVerbs": [
      "LOOK-INSIDE",
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "LOOK-INSIDE",
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "refusalOnlyVerbs": [
      "OPEN",
      "LOOK-INSIDE"
    ],
    "verbRooms": {
      "LOOK-INSIDE": [
        "RAILROAD-MUSEUM",
        "CAFETERIA",
        "MASTER-BEDROOM",
        "SKYCAB"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "POST-OFFICE-OBJECT",
      "RAILROAD-YARD"
    ],
    "removedObjectIds": []
  },
  {
    "id": "ALARM",
    "name": "alarm",
    "initialLocation": "WAREHOUSE-2",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ],
    "synonyms": [
      "alarm"
    ],
    "adjectives": [
      "loud"
    ],
    "commandNoun": "alarm",
    "action": "ALARM-F",
    "handledVerbs": [
      "LISTEN"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN"
    ],
    "guaranteedVerbs": [
      "LISTEN"
    ],
    "refusalOnlyVerbs": [
      "LISTEN"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ALLEY-OBJECT",
    "name": "alley",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "VOWELBIT"
    ],
    "synonyms": [
      "alley"
    ],
    "adjectives": [
      "long",
      "narrow",
      "dim"
    ],
    "commandNoun": "alley",
    "action": "ALLEY-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ALLEY",
      "FACTORY-ENTRANCE",
      "BAR"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "ALLEY",
        "FACTORY-ENTRANCE",
        "BAR"
      ],
      "THROUGH": [
        "ALLEY",
        "FACTORY-ENTRANCE",
        "BAR"
      ],
      "LEAVE": [
        "ALLEY"
      ],
      "DISEMBARK": [
        "ALLEY"
      ],
      "EXAMINE": [
        "ALLEY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ANNEX-OBJECT",
    "name": "annex",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "annex",
      "wing"
    ],
    "adjectives": [
      "hospital",
      "new",
      "modern",
      "fairly",
      "well",
      "maintained",
      "well-maintained"
    ],
    "commandNoun": "annex",
    "action": "ANNEX-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "HOSPITAL",
      "HOSPITAL-ANNEX"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "HOSPITAL",
        "HOSPITAL-ANNEX"
      ],
      "WALK-TO": [
        "HOSPITAL",
        "HOSPITAL-ANNEX"
      ],
      "LEAVE": [
        "HOSPITAL-ANNEX"
      ],
      "DISEMBARK": [
        "HOSPITAL-ANNEX"
      ],
      "EXAMINE": [
        "HOSPITAL-ANNEX"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "APPLE",
    "name": "apple",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT",
      "TAKEBIT",
      "EATBIT"
    ],
    "synonyms": [
      "apple",
      "food"
    ],
    "adjectives": [],
    "commandNoun": "apple",
    "action": "RANDOM-FOOD-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BUY"
    ],
    "guaranteedVerbs": [
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MEAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BENCH",
    "name": "bench",
    "initialLocation": "CITY-HALL",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "CONTBIT",
      "FURNITUREBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "bench"
    ],
    "adjectives": [],
    "commandNoun": "bench",
    "action": "BENCH-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "GOVERNMENT-OFFICIAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BOOKS",
    "name": "books",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "book",
      "books",
      "novel",
      "novels"
    ],
    "adjectives": [
      "old",
      "used",
      "library"
    ],
    "commandNoun": "books",
    "action": "BOOKS-F",
    "handledVerbs": [
      "BUY",
      "SEARCH",
      "EXAMINE",
      "READ",
      "OPEN",
      "TAKE",
      "SMELL"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "SEARCH"
      ],
      [
        "EXAMINE"
      ],
      [
        "READ",
        "OPEN"
      ],
      [
        "TAKE"
      ],
      [
        "SMELL"
      ]
    ],
    "actionRooms": [
      "BOOKSTORE",
      "MAIN-LIBRARY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "BUY",
      "SEARCH",
      "EXAMINE",
      "READ",
      "OPEN",
      "TAKE",
      "SMELL"
    ],
    "refusalOnlyVerbs": [
      "TAKE"
    ],
    "verbRooms": {
      "BUY": [
        "BOOKSTORE"
      ],
      "SEARCH": [
        "BOOKSTORE"
      ],
      "EXAMINE": [
        "BOOKSTORE",
        "MAIN-LIBRARY"
      ],
      "READ": [
        "BOOKSTORE",
        "MAIN-LIBRARY"
      ],
      "OPEN": [
        "BOOKSTORE",
        "MAIN-LIBRARY"
      ],
      "TAKE": [
        "MAIN-LIBRARY"
      ],
      "SMELL": [
        "MAIN-LIBRARY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "CREDIT-CARD",
      "MAIN-LIBRARY-OBJECT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "CAGES",
    "name": "cages",
    "initialLocation": "ZOO",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ],
    "synonyms": [
      "cage",
      "cages"
    ],
    "adjectives": [],
    "commandNoun": "cages",
    "action": "CAGES-F",
    "handledVerbs": [
      "THROUGH",
      "EXAMINE",
      "LOOK-INSIDE",
      "OPEN",
      "UNLOCK"
    ],
    "verbGroups": [
      [
        "THROUGH"
      ],
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ],
      [
        "OPEN",
        "UNLOCK"
      ]
    ],
    "actionRooms": [
      "ZOO"
    ],
    "globalVerbs": [
      "THROUGH",
      "EXAMINE",
      "LOOK-INSIDE",
      "OPEN",
      "UNLOCK"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "EXAMINE",
      "LOOK-INSIDE",
      "OPEN",
      "UNLOCK"
    ],
    "refusalOnlyVerbs": [
      "THROUGH"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "ANIMAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "CHAIR",
    "name": "chair",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "chair",
      "chairs",
      "seat",
      "seats"
    ],
    "adjectives": [
      "desk",
      "swivel"
    ],
    "commandNoun": "chair",
    "action": "CHAIR-F",
    "handledVerbs": [
      "SIT",
      "CLIMB-ON",
      "BOARD"
    ],
    "verbGroups": [
      [
        "SIT",
        "CLIMB-ON",
        "BOARD"
      ]
    ],
    "actionRooms": [
      "SIMONS",
      "THE-COACHMAN",
      "ROYS-PAGODA",
      "DINING-ROOM"
    ],
    "globalVerbs": [
      "SIT",
      "CLIMB-ON",
      "BOARD"
    ],
    "guaranteedVerbs": [
      "SIT",
      "CLIMB-ON",
      "BOARD"
    ],
    "refusalOnlyVerbs": [
      "SIT",
      "CLIMB-ON",
      "BOARD"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "DINING-ROOM"
    ],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CLAVE",
    "name": "Clave",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "clave",
      "clavius",
      "simm",
      "brother"
    ],
    "adjectives": [
      "my",
      "clave",
      "clavius"
    ],
    "commandNoun": "clave",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "COUCH",
    "name": "couch",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "couch",
      "sofa"
    ],
    "adjectives": [],
    "commandNoun": "couch",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CRATE",
    "name": "crate",
    "initialLocation": "WAREHOUSE-2",
    "flags": [
      "NDESCBIT",
      "CONTBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "crate",
      "crates"
    ],
    "adjectives": [
      "dusty"
    ],
    "commandNoun": "crate",
    "action": "CRATE-F",
    "handledVerbs": [
      "OPEN",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CRIME",
    "name": "crime",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "crime",
      "mugging",
      "robbery",
      "murder",
      "shooting",
      "theft"
    ],
    "adjectives": [],
    "commandNoun": "crime",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DRUGS",
    "name": "drugs",
    "initialLocation": "DRUG-STORE",
    "flags": [
      "NDESCBIT",
      "PLURALBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "drug",
      "drugs",
      "pill",
      "pills",
      "pharmaceu",
      "medicine",
      "medicines"
    ],
    "adjectives": [],
    "commandNoun": "drugs",
    "action": "DRUGS-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "DRUG-STORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "BUY"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "DRUG-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "EASEL",
    "name": "easel",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "easel",
      "easle"
    ],
    "adjectives": [
      "jill's"
    ],
    "commandNoun": "easel",
    "action": "EASEL-F",
    "handledVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TAKE",
        "MOVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TAKE",
      "MOVE"
    ],
    "refusalOnlyVerbs": [
      "TAKE",
      "MOVE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FENCE",
    "name": "fence",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "fence"
    ],
    "adjectives": [
      "tall",
      "high",
      "perimeter",
      "wooden",
      "temporary"
    ],
    "commandNoun": "fence",
    "action": "FENCE-F",
    "handledVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP",
      "CLIMB-OVER",
      "LEAP"
    ],
    "verbGroups": [
      [
        "CLIMB-FOO",
        "CLIMB-UP",
        "CLIMB-OVER",
        "LEAP"
      ]
    ],
    "actionRooms": [
      "SOUTHWAY-AND-KENNEDY",
      "SOUTHWAY-AND-RIVER",
      "BEND",
      "CONSTRUCTION-SITE-2",
      "WAREHOUSE-1",
      "CHURCH-STREET-PARK",
      "ROOFTOP"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP",
      "CLIMB-OVER",
      "LEAP"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "CLIMB-FOO": [
        "ROOFTOP"
      ],
      "CLIMB-UP": [
        "ROOFTOP"
      ],
      "CLIMB-OVER": [
        "ROOFTOP"
      ],
      "LEAP": [
        "ROOFTOP"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FIELD",
    "name": "field",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "field"
    ],
    "adjectives": [
      "athletic",
      "outdoor"
    ],
    "commandNoun": "field",
    "action": "FIELD-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "RIVER-AND-PARK",
      "RIVER-AND-KENNEDY",
      "ROCKVIL-STADIUM",
      "ATHLETIC-FIELD"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "RIVER-AND-PARK",
        "RIVER-AND-KENNEDY",
        "ROCKVIL-STADIUM"
      ],
      "THROUGH": [
        "RIVER-AND-PARK",
        "RIVER-AND-KENNEDY",
        "ROCKVIL-STADIUM"
      ],
      "DISEMBARK": [
        "ATHLETIC-FIELD",
        "ROCKVIL-STADIUM"
      ],
      "LEAVE": [
        "ATHLETIC-FIELD",
        "ROCKVIL-STADIUM"
      ],
      "EXAMINE": [
        "ROCKVIL-STADIUM",
        "ATHLETIC-FIELD"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GLASS",
    "name": "glass",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "glass"
    ],
    "adjectives": [
      "broken",
      "shattered"
    ],
    "commandNoun": "glass",
    "action": "GLASS-F",
    "handledVerbs": [
      "EXAMINE",
      "TAKE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "TAKE"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-2",
      "CONSTRUCTION-SITE-5",
      "MIDLAND-AND-RIVER",
      "UNIVERSITY-HEIGHTS",
      "PARKVIEW-APARTMENTS",
      "CHURCH-STREET-APARTMENTS"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXAMINE",
      "TAKE"
    ],
    "refusalOnlyVerbs": [
      "TAKE"
    ],
    "verbRooms": {
      "EXAMINE": [
        "FOODVILLE-2",
        "CONSTRUCTION-SITE-5"
      ],
      "TAKE": [
        "FOODVILLE-2",
        "CONSTRUCTION-SITE-5"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "HOTEL-OBJECT",
    "name": "hotel",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "hotel"
    ],
    "adjectives": [
      "veldran",
      "colonial",
      "fairly",
      "old",
      "opulent",
      "luxury",
      "high-rise"
    ],
    "commandNoun": "hotel",
    "action": "HOTEL-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "CENTRE-AND-KENNEDY",
      "AIRPORTWAY-AND-RIVER",
      "SKYCAR-LOT-7",
      "VELDRAN-HOTEL",
      "COLONIAL-HOTEL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "CENTRE-AND-KENNEDY",
        "AIRPORTWAY-AND-RIVER",
        "SKYCAR-LOT-7"
      ],
      "THROUGH": [
        "CENTRE-AND-KENNEDY",
        "AIRPORTWAY-AND-RIVER",
        "SKYCAR-LOT-7"
      ],
      "DISEMBARK": [
        "VELDRAN-HOTEL",
        "COLONIAL-HOTEL"
      ],
      "LEAVE": [
        "VELDRAN-HOTEL",
        "COLONIAL-HOTEL"
      ],
      "EXAMINE": [
        "VELDRAN-HOTEL",
        "COLONIAL-HOTEL",
        "CENTRE-AND-KENNEDY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "LABEL",
    "name": "label",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "label",
      "labels"
    ],
    "adjectives": [
      "my"
    ],
    "commandNoun": "label",
    "action": "LABEL-F",
    "handledVerbs": [
      "COUNT",
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "COUNT",
        "READ",
        "EXAMINE"
      ],
      [
        "READ"
      ],
      [
        "READ"
      ]
    ],
    "actionRooms": [
      "PARKVIEW-APARTMENTS",
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [
      "COUNT",
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "COUNT",
      "READ",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MY-BUZZER",
      "BUZZERS",
      "SCOTCH"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MOVIE",
    "name": "movie",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "movie",
      "film"
    ],
    "adjectives": [],
    "commandNoun": "movie",
    "action": "MOVIE-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MOVIE-THEATRE-OBJECT"
    ],
    "removedObjectIds": []
  },
  {
    "id": "MUSIC",
    "name": "music",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "music"
    ],
    "adjectives": [
      "loud",
      "raucous",
      "distorted",
      "muffled"
    ],
    "commandNoun": "music",
    "action": "MUSIC-F",
    "handledVerbs": [
      "LISTEN"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [
      "DORM",
      "BAR"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LISTEN"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "LISTEN": [
        "BAR"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "JUKEBOX"
    ],
    "removedObjectIds": []
  },
  {
    "id": "NIGHT",
    "name": "night",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "night",
      "nighttime",
      "nightime",
      "dark",
      "darkness"
    ],
    "adjectives": [],
    "commandNoun": "night",
    "action": "NIGHT-F",
    "handledVerbs": [
      "WAIT-FOR"
    ],
    "verbGroups": [
      [
        "WAIT-FOR"
      ]
    ],
    "actionRooms": [
      "ROOFTOP"
    ],
    "globalVerbs": [
      "WAIT-FOR"
    ],
    "guaranteedVerbs": [
      "WAIT-FOR"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "DUSK"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RIVER",
    "name": "river",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "river"
    ],
    "adjectives": [
      "little",
      "missouri",
      "wide",
      "polluted"
    ],
    "commandNoun": "river",
    "action": "RIVER-F",
    "handledVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH",
      "LEAP",
      "SWIM"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "BOARD",
        "THROUGH",
        "LEAP",
        "SWIM"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "PATIO",
      "SKYCAB"
    ],
    "globalVerbs": [
      "BOARD",
      "THROUGH",
      "LEAP",
      "SWIM",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH",
      "LEAP",
      "SWIM"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "PATIO"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CULTURAL-CENTER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SCARF",
    "name": "scarf",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "WEARBIT"
    ],
    "synonyms": [
      "scarf"
    ],
    "adjectives": [
      "conservative",
      "male"
    ],
    "commandNoun": "scarf",
    "action": "SCARF-F",
    "handledVerbs": [
      "BUY",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BUY",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CLOTHES"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SLEEP",
    "name": "sleep",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "sleep",
      "nap"
    ],
    "adjectives": [],
    "commandNoun": "sleep",
    "action": "SLEEP-F",
    "handledVerbs": [
      "TAKE",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "TAKE",
        "WALK-TO"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "WALK-TO"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SMOKE",
    "name": "smoke",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "smoke",
      "billow",
      "billows",
      "pillar",
      "pillars"
    ],
    "adjectives": [
      "black",
      "ashy",
      "tobacco",
      "tremendou",
      "thick"
    ],
    "commandNoun": "smoke",
    "action": "SMOKE-F",
    "handledVerbs": [
      "WALK-TO",
      "SMELL",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO"
      ],
      [
        "SMELL"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "MAIN-AND-WICKER",
      "POWER-STATION",
      "BURGER-MEISTER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "WALK-TO",
      "SMELL"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "MAIN-AND-WICKER"
      ],
      "SMELL": [
        "MAIN-AND-WICKER",
        "POWER-STATION"
      ],
      "EXAMINE": [
        "POWER-STATION",
        "MAIN-AND-WICKER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "OFFICIAL-SNACK",
    "name": "snack",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "snack",
      "cupcake",
      "donut",
      "doughnut",
      "cake"
    ],
    "adjectives": [
      "cup",
      "large"
    ],
    "commandNoun": "snack",
    "action": "SNACK-F",
    "handledVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "TAKE",
        "EAT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT"
    ],
    "refusalOnlyVerbs": [
      "TAKE",
      "EAT"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "CITY-HALL"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STONES",
    "name": "stone",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "TAKEBIT"
    ],
    "synonyms": [
      "stone",
      "stones",
      "rock",
      "rocks"
    ],
    "adjectives": [],
    "commandNoun": "stone",
    "action": "STONES-F",
    "handledVerbs": [
      "TAKE"
    ],
    "verbGroups": [
      [
        "TAKE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TAKE"
    ],
    "guaranteedVerbs": [
      "TAKE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "ATHLETIC-FIELD"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BAR-STOOL",
    "name": "stool",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VEHBIT",
      "FURNITUREBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "stool",
      "stools"
    ],
    "adjectives": [
      "battered",
      "wooden"
    ],
    "commandNoun": "stool",
    "action": "BAR-STOOL-F",
    "handledVerbs": [
      "PUT"
    ],
    "verbGroups": [
      [
        "PUT"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "PUT"
    ],
    "guaranteedVerbs": [
      "PUT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "ME"
    ],
    "removedObjectIds": []
  },
  {
    "id": "STORE-OBJECT",
    "name": "store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "store",
      "stores",
      "shop",
      "shops"
    ],
    "adjectives": [],
    "commandNoun": "store",
    "action": "STORE-OBJECT-F",
    "handledVerbs": [
      "LEAVE",
      "DISEMBARK",
      "WALK-TO",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "WALK-TO",
        "THROUGH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LEAVE",
      "DISEMBARK",
      "WALK-TO",
      "THROUGH"
    ],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "WALK-TO",
      "THROUGH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GLOBAL-TABLE",
    "name": "table",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "SURFACEBIT",
      "VEHBIT"
    ],
    "synonyms": [
      "table",
      "tables"
    ],
    "adjectives": [
      "tiny",
      "old",
      "wooden"
    ],
    "commandNoun": "table",
    "action": "GLOBAL-TABLE-F",
    "handledVerbs": [
      "EXAMINE",
      "PUT",
      "PUT-ON"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "PUT",
        "PUT-ON"
      ]
    ],
    "actionRooms": [
      "CLOSED-FACTORY",
      "DINING-ROOM",
      "CAFETERIA"
    ],
    "globalVerbs": [
      "PUT",
      "PUT-ON"
    ],
    "guaranteedVerbs": [
      "PUT",
      "PUT-ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "CAFETERIA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "RESTAURANT-TABLE",
    "name": "table",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VEHBIT",
      "SURFACEBIT",
      "OPENBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "table"
    ],
    "adjectives": [],
    "commandNoun": "table",
    "action": "RESTAURANT-TABLE-F",
    "handledVerbs": [
      "BOARD",
      "SIT"
    ],
    "verbGroups": [
      [
        "BOARD",
        "SIT"
      ]
    ],
    "actionRooms": [
      "ROYS-PAGODA"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "BOARD",
      "SIT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BOARD": [
        "ROYS-PAGODA"
      ],
      "SIT": [
        "ROYS-PAGODA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WASTE",
    "name": "waste",
    "initialLocation": "CITY-DUMP",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "waste",
      "wastes",
      "garbage",
      "landfill"
    ],
    "adjectives": [
      "liquid",
      "processed",
      "dechemified",
      "radioactive",
      "radio-active"
    ],
    "commandNoun": "waste",
    "action": "WASTE-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "WATER",
    "name": "water",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "water"
    ],
    "adjectives": [
      "placid",
      "hot",
      "cold",
      "ice",
      "murky"
    ],
    "commandNoun": "water",
    "action": "WATER-F",
    "handledVerbs": [
      "BUY",
      "DRINK",
      "OFF",
      "ON"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "DRINK"
      ],
      [
        "OFF"
      ],
      [
        "ON"
      ]
    ],
    "actionRooms": [
      "KENNEDY-PARK",
      "HALLEY-PARK-WEST",
      "SIMONS",
      "THE-COACHMAN",
      "ROYS-PAGODA",
      "BAR",
      "EZZIS-BAR",
      "KITCHEN",
      "BATHROOM",
      "AQUARIUM"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "BUY",
      "DRINK",
      "OFF",
      "ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "SIMONS",
        "THE-COACHMAN",
        "ROYS-PAGODA",
        "BAR",
        "EZZIS-BAR"
      ],
      "DRINK": [
        "KITCHEN",
        "BATHROOM"
      ],
      "OFF": [
        "BATHROOM",
        "KITCHEN"
      ],
      "ON": [
        "BATHROOM",
        "KITCHEN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "WATERPOOL",
      "DUCK-POND",
      "RESERVOIR",
      "TANK",
      "RIVER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "WOMAN",
    "name": "woman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "woman",
      "beggar"
    ],
    "adjectives": [
      "beggar"
    ],
    "commandNoun": "woman",
    "action": "WOMAN-F",
    "handledVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "ASK-ABOUT",
        "TELL-ABOUT"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "LIVING-ROOM"
    ],
    "globalVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "TELL"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PAINTING"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BABY",
    "name": "baby",
    "initialLocation": "CRIB",
    "flags": [
      "TAKEBIT",
      "ACTORBIT"
    ],
    "synonyms": [
      "baby",
      "mitchell",
      "mitch",
      "rav",
      "simm",
      "son"
    ],
    "adjectives": [
      "mitchell",
      "mitch",
      "rav",
      "my"
    ],
    "commandNoun": "baby",
    "action": "BABY-F",
    "handledVerbs": [
      "TELL",
      "WASH",
      "GIVE",
      "EXAMINE",
      "FEED",
      "SHOW",
      "THANK",
      "PLAY-WITH",
      "KISS",
      "SHAKE",
      "ALARM",
      "PUT",
      "PUT-ON",
      "DROP",
      "THROW",
      "KICK"
    ],
    "verbGroups": [
      [
        "TELL"
      ],
      [
        "WASH"
      ],
      [
        "GIVE"
      ],
      [
        "EXAMINE"
      ],
      [
        "GIVE"
      ],
      [
        "FEED"
      ],
      [
        "GIVE",
        "SHOW"
      ],
      [
        "THANK",
        "PLAY-WITH"
      ],
      [
        "KISS"
      ],
      [
        "SHAKE"
      ],
      [
        "ALARM"
      ],
      [
        "PUT",
        "PUT-ON"
      ],
      [
        "DROP"
      ],
      [
        "THROW",
        "KICK"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "WASH",
      "GIVE",
      "EXAMINE",
      "FEED",
      "SHOW",
      "THANK",
      "PLAY-WITH",
      "KISS",
      "SHAKE",
      "ALARM",
      "PUT",
      "PUT-ON",
      "DROP",
      "THROW",
      "KICK"
    ],
    "guaranteedVerbs": [
      "TELL",
      "WASH",
      "GIVE",
      "EXAMINE",
      "FEED",
      "SHOW",
      "THANK",
      "PLAY-WITH",
      "KISS",
      "SHAKE",
      "ALARM",
      "THROW",
      "KICK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BATHROOM-OBJECT",
      "SHOWER",
      "FORMULA",
      "CRIB",
      "GROUND"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BANK-OBJECT",
    "name": "bank",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bank"
    ],
    "adjectives": [
      "first",
      "continent"
    ],
    "commandNoun": "bank",
    "action": "BANK-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "BANK"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "BANK"
      ],
      "WALK-TO": [
        "BANK"
      ],
      "DISEMBARK": [
        "BANK"
      ],
      "LEAVE": [
        "BANK"
      ],
      "EXAMINE": [
        "BANK"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "CARD-CATALOG-CARD",
    "name": "card",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "card"
    ],
    "adjectives": [],
    "commandNoun": "card",
    "action": "CARD-CATALOG-CARD-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CARD-CATALOG"
    ],
    "removedObjectIds": []
  },
  {
    "id": "CRIB",
    "name": "crib",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "CONTBIT",
      "OPENBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "crib"
    ],
    "adjectives": [
      "baby's",
      "mitch's",
      "mitchell"
    ],
    "commandNoun": "crib",
    "action": "CRIB-F",
    "handledVerbs": [
      "CLOSE"
    ],
    "verbGroups": [
      [
        "CLOSE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "CLOSE"
    ],
    "guaranteedVerbs": [
      "CLOSE"
    ],
    "refusalOnlyVerbs": [
      "CLOSE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "BEDROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DAWN",
    "name": "dawn",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "dawn",
      "sunrise",
      "sunup"
    ],
    "adjectives": [
      "morning"
    ],
    "commandNoun": "dawn",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DESK",
    "name": "desk",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "desk"
    ],
    "adjectives": [
      "receiving",
      "admitting"
    ],
    "commandNoun": "desk",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PERELMAN-DESK",
    "name": "desk",
    "initialLocation": "OFFICE",
    "flags": [
      "NDESCBIT",
      "SURFACEBIT",
      "CONTBIT",
      "SEARCHBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "desk"
    ],
    "adjectives": [
      "perelman",
      "abe's"
    ],
    "commandNoun": "desk",
    "action": "PERELMAN-DESK-F",
    "handledVerbs": [
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PARKVIEW-DOOR",
    "name": "door",
    "initialLocation": "PARKVIEW-APARTMENTS",
    "flags": [
      "DOORBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "door",
      "doors"
    ],
    "adjectives": [],
    "commandNoun": "door",
    "action": "PARKVIEW-DOOR-F",
    "handledVerbs": [
      "OPEN",
      "UNLOCK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "OPEN",
        "UNLOCK"
      ],
      [
        "OPEN"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "UNLOCK",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "UNLOCK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "KEY",
      "UNOPENABLE-DOOR"
    ],
    "removedObjectIds": []
  },
  {
    "id": "APARTMENT-DOOR",
    "name": "door",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "DOORBIT"
    ],
    "synonyms": [
      "door"
    ],
    "adjectives": [],
    "commandNoun": "door",
    "action": "APARTMENT-DOOR-F",
    "handledVerbs": [
      "OPEN",
      "THROUGH",
      "UNLOCK",
      "LOCK",
      "KNOCK"
    ],
    "verbGroups": [
      [
        "OPEN",
        "THROUGH"
      ],
      [
        "UNLOCK",
        "OPEN"
      ],
      [
        "LOCK"
      ],
      [
        "KNOCK"
      ],
      [
        "OPEN"
      ]
    ],
    "actionRooms": [
      "FOYER",
      "LIVING-ROOM",
      "PARKVIEW-HALL"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "OPEN",
      "THROUGH",
      "UNLOCK",
      "LOCK",
      "KNOCK"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "OPEN": [
        "FOYER",
        "LIVING-ROOM",
        "PARKVIEW-HALL"
      ],
      "THROUGH": [
        "FOYER"
      ],
      "UNLOCK": [
        "FOYER",
        "LIVING-ROOM"
      ],
      "LOCK": [
        "FOYER"
      ],
      "KNOCK": [
        "LIVING-ROOM",
        "FOYER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "FOYER"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "KEY",
      "JILL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "UNOPENABLE-DOOR",
    "name": "door",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "DOORBIT"
    ],
    "synonyms": [
      "door",
      "doors"
    ],
    "adjectives": [
      "shattered",
      "glass"
    ],
    "commandNoun": "door",
    "action": "UNOPENABLE-DOOR-F",
    "handledVerbs": [
      "OPEN",
      "UNLOCK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "OPEN",
        "UNLOCK"
      ],
      [
        "OPEN"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "UNIVERSITY-HEIGHTS",
      "PARKVIEW-APARTMENTS",
      "CHURCH-STREET-APARTMENTS"
    ],
    "globalVerbs": [
      "OPEN",
      "UNLOCK"
    ],
    "guaranteedVerbs": [
      "OPEN",
      "UNLOCK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "OPEN",
      "UNLOCK"
    ],
    "verbRooms": {
      "EXAMINE": [
        "UNIVERSITY-HEIGHTS",
        "PARKVIEW-APARTMENTS",
        "CHURCH-STREET-APARTMENTS"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "KEY"
    ],
    "removedObjectIds": []
  },
  {
    "id": "WAREHOUSE-DOOR",
    "name": "door",
    "initialLocation": "WAREHOUSE-1",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "door"
    ],
    "adjectives": [],
    "commandNoun": "door",
    "action": "WAREHOUSE-DOOR-F",
    "handledVerbs": [
      "THROUGH",
      "OPEN",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "OPEN",
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "OPEN",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "OPEN",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "THROUGH",
      "OPEN",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "DUSK",
    "name": "dusk",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "dusk",
      "sunset",
      "sundown"
    ],
    "adjectives": [
      "evening"
    ],
    "commandNoun": "dusk",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "FISH",
    "name": "fish",
    "initialLocation": "AQUARIUM",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "fish"
    ],
    "adjectives": [
      "large",
      "graceful"
    ],
    "commandNoun": "fish",
    "action": "FISH-F",
    "handledVerbs": [
      "EXAMINE",
      "EAT",
      "TOUCH"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "EAT",
        "TOUCH"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "EAT",
      "TOUCH"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "EAT",
      "TOUCH"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MEAL",
    "name": "food",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "food",
      "meal",
      "lunch",
      "dinner",
      "breakfast",
      "snack",
      "burger",
      "hamburger",
      "beefburge",
      "soyburger",
      "kelpburge",
      "tins"
    ],
    "adjectives": [
      "soy",
      "kelp",
      "beef",
      "plain",
      "badly",
      "labelled"
    ],
    "commandNoun": "food",
    "action": "MEAL-F",
    "handledVerbs": [
      "EXAMINE",
      "TAKE",
      "BUY",
      "WAIT-FOR",
      "EAT"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "TAKE"
      ],
      [
        "BUY"
      ],
      [
        "WAIT-FOR"
      ],
      [
        "TAKE",
        "EAT"
      ],
      [
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ],
      [
        "WAIT-FOR"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-2",
      "SIMONS",
      "THE-COACHMAN",
      "ROYS-PAGODA",
      "BURGER-MEISTER",
      "FOODVILLE-1",
      "CAFETERIA"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "WAIT-FOR",
      "TAKE",
      "EAT",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {
      "EXAMINE": [
        "FOODVILLE-2",
        "CAFETERIA"
      ],
      "TAKE": [
        "FOODVILLE-2",
        "FOODVILLE-1",
        "BURGER-MEISTER",
        "ROYS-PAGODA",
        "SIMONS",
        "THE-COACHMAN"
      ],
      "BUY": [
        "SIMONS",
        "THE-COACHMAN",
        "ROYS-PAGODA",
        "BURGER-MEISTER",
        "FOODVILLE-1",
        "FOODVILLE-2"
      ],
      "WAIT-FOR": [
        "THE-COACHMAN",
        "SIMONS"
      ],
      "EAT": [
        "FOODVILLE-1",
        "FOODVILLE-2",
        "BURGER-MEISTER",
        "ROYS-PAGODA",
        "SIMONS",
        "THE-COACHMAN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "RESTAURANT-TABLE",
      "CREDIT-CARD",
      "GLOBAL-TABLE",
      "GROCERIES",
      "GOLD",
      "MENU",
      "FORTZMAN"
    ],
    "removedObjectIds": []
  },
  {
    "id": "FYLA",
    "name": "Fyla",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ],
    "synonyms": [
      "fyla"
    ],
    "adjectives": [],
    "commandNoun": "fyla",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GATE",
    "name": "gate",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "gates",
      "gate"
    ],
    "adjectives": [
      "base",
      "boarding"
    ],
    "commandNoun": "gate",
    "action": "GATE-F",
    "handledVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH"
    ],
    "verbGroups": [
      [
        "OPEN"
      ],
      [
        "CLOSE"
      ],
      [
        "THROUGH"
      ]
    ],
    "actionRooms": [
      "KENNEDY-PARK",
      "MAIN-AND-KENNEDY",
      "ELM-AND-KENNEDY",
      "ELM-AND-PARK",
      "HALLEY-AND-PARK",
      "ZOO",
      "SKYCAR-LOT-4",
      "PARK-ENTRANCE",
      "HALLEY-AND-UNIVERSITY",
      "SKYBUS-TERMINAL",
      "BASE-GATE",
      "CEMETERY",
      "MAIN-AND-WICKER",
      "MIDLAND-AND-CHURCH",
      "CHURCH-ENTRANCE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH"
    ],
    "refusalOnlyVerbs": [
      "CLOSE"
    ],
    "verbRooms": {
      "OPEN": [
        "SKYBUS-TERMINAL",
        "BASE-GATE",
        "PARK-ENTRANCE",
        "HALLEY-AND-UNIVERSITY",
        "HALLEY-AND-PARK",
        "ZOO",
        "SKYCAR-LOT-4"
      ],
      "CLOSE": [
        "PARK-ENTRANCE",
        "HALLEY-AND-UNIVERSITY",
        "SKYBUS-TERMINAL",
        "HALLEY-AND-PARK",
        "ZOO",
        "BASE-GATE",
        "SKYCAR-LOT-4"
      ],
      "THROUGH": [
        "KENNEDY-PARK",
        "CEMETERY",
        "MAIN-AND-WICKER",
        "HALLEY-AND-UNIVERSITY",
        "MIDLAND-AND-CHURCH",
        "ZOO",
        "CHURCH-ENTRANCE",
        "MAIN-AND-KENNEDY",
        "ELM-AND-KENNEDY",
        "BASE-GATE",
        "SKYBUS-TERMINAL",
        "PARK-ENTRANCE",
        "SKYCAR-LOT-4"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "JILL",
    "name": "Jill",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "OPENBIT",
      "CONTBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "jill",
      "wife"
    ],
    "adjectives": [
      "my"
    ],
    "commandNoun": "jill",
    "action": "JILL-F",
    "handledVerbs": [
      "YES",
      "NO",
      "WHO",
      "WHAT",
      "TELL-ABOUT",
      "HELLO",
      "EXAMINE",
      "THANK",
      "CLIMB-ON",
      "CLIMB-FOO",
      "BOARD",
      "LIE-DOWN",
      "ALARM",
      "PLAY-WITH",
      "TOUCH",
      "SQUEEZE",
      "COMFORT",
      "KISS",
      "SHOW",
      "GIVE",
      "FOLLOW",
      "SIT-NEXT-TO"
    ],
    "verbGroups": [
      [
        "YES"
      ],
      [
        "NO"
      ],
      [
        "WHO",
        "WHAT"
      ],
      [
        "TELL-ABOUT"
      ],
      [
        "HELLO"
      ],
      [
        "EXAMINE"
      ],
      [
        "THANK"
      ],
      [
        "CLIMB-ON",
        "CLIMB-FOO",
        "BOARD",
        "LIE-DOWN"
      ],
      [
        "ALARM"
      ],
      [
        "PLAY-WITH"
      ],
      [
        "TOUCH",
        "SQUEEZE"
      ],
      [
        "COMFORT"
      ],
      [
        "KISS"
      ],
      [
        "EXAMINE"
      ],
      [
        "SHOW"
      ],
      [
        "GIVE"
      ],
      [
        "FOLLOW"
      ],
      [
        "SIT-NEXT-TO"
      ],
      [
        "SIT-NEXT-TO"
      ]
    ],
    "actionRooms": [
      "SKYCAB",
      "MASTER-BEDROOM",
      "BEDROOM",
      "LIVING-ROOM",
      "KITCHEN",
      "BATHROOM"
    ],
    "globalVerbs": [
      "YES",
      "NO",
      "WHO",
      "WHAT",
      "TELL-ABOUT",
      "HELLO",
      "EXAMINE",
      "THANK",
      "CLIMB-ON",
      "CLIMB-FOO",
      "BOARD",
      "LIE-DOWN",
      "ALARM",
      "PLAY-WITH",
      "TOUCH",
      "SQUEEZE",
      "COMFORT",
      "KISS",
      "SHOW",
      "FOLLOW",
      "SIT-NEXT-TO"
    ],
    "guaranteedVerbs": [
      "WHO",
      "WHAT",
      "TELL-ABOUT",
      "HELLO",
      "EXAMINE",
      "CLIMB-ON",
      "CLIMB-FOO",
      "BOARD",
      "LIE-DOWN",
      "ALARM",
      "PLAY-WITH",
      "TOUCH",
      "SQUEEZE",
      "KISS",
      "GIVE",
      "FOLLOW",
      "SIT-NEXT-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "GIVE": [
        "BEDROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "LIVING-ROOM",
      "BEDROOM",
      "BATHROOM",
      "KITCHEN",
      "MASTER-BEDROOM"
    ],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [
      "ME",
      "CLERKMATON",
      "BABY",
      "MITCHELL",
      "PAINTING",
      "JILL-BOOK",
      "FYLA",
      "PERELMAN",
      "GOLD",
      "ESTHER",
      "RANDU",
      "GRIMWOLD",
      "WARREN",
      "PRICE",
      "SILVER-DOVE",
      "FORTZMAN",
      "CRIB",
      "RUSTY-CROSS",
      "COUCH",
      "DINETTE-SET"
    ],
    "removedObjectIds": [
      "RUSTY-CROSS"
    ]
  },
  {
    "id": "LAWN",
    "name": "lawn",
    "initialLocation": "CAFETERIA",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "lawn",
      "lawns",
      "grass"
    ],
    "adjectives": [
      "lush",
      "green",
      "well-manicured"
    ],
    "commandNoun": "lawn",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MALL-OBJECT",
    "name": "mall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "mall"
    ],
    "adjectives": [
      "busy",
      "deserted",
      "shopping",
      "rockvil"
    ],
    "commandNoun": "mall",
    "action": "MALL-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ]
    ],
    "actionRooms": [
      "ROCKVIL-MALL",
      "ELM-AND-KENNEDY",
      "ELM-AND-RIVER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "ROCKVIL-MALL",
        "ELM-AND-KENNEDY",
        "ELM-AND-RIVER"
      ],
      "WALK-TO": [
        "ROCKVIL-MALL",
        "ELM-AND-KENNEDY",
        "ELM-AND-RIVER"
      ],
      "DISEMBARK": [
        "ROCKVIL-MALL"
      ],
      "LEAVE": [
        "ROCKVIL-MALL"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MENU",
    "name": "menu",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ],
    "synonyms": [
      "menu",
      "menuboard",
      "board"
    ],
    "adjectives": [
      "menu"
    ],
    "commandNoun": "menu",
    "action": "MENU-F",
    "handledVerbs": [
      "READ",
      "EXAMINE",
      "ASK-NO-ONE-FOR"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ],
      [
        "READ",
        "EXAMINE",
        "ASK-NO-ONE-FOR"
      ]
    ],
    "actionRooms": [
      "BURGER-MEISTER"
    ],
    "globalVerbs": [
      "READ",
      "EXAMINE",
      "ASK-NO-ONE-FOR"
    ],
    "guaranteedVerbs": [
      "READ",
      "EXAMINE",
      "ASK-NO-ONE-FOR"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MEAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "NOON",
    "name": "noon",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ],
    "synonyms": [
      "noon",
      "midday",
      "mid-day"
    ],
    "adjectives": [],
    "commandNoun": "noon",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "NOTE",
    "name": "note",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ],
    "synonyms": [
      "note"
    ],
    "adjectives": [],
    "commandNoun": "note",
    "action": "NOTE-F",
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": true,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PARK-OBJECT",
    "name": "park",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "park",
      "garden",
      "gardens",
      "common",
      "commons"
    ],
    "adjectives": [
      "kennedy",
      "riverside",
      "halley",
      "church",
      "street",
      "small",
      "downtown",
      "old",
      "popular",
      "public"
    ],
    "commandNoun": "park",
    "action": "PARK-OBJECT-F",
    "handledVerbs": [
      "EXAMINE",
      "WALK-TO",
      "THROUGH",
      "DISEMBARK",
      "LEAVE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "EXAMINE"
      ],
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ]
    ],
    "actionRooms": [
      "ZOO",
      "HUANG-HALL",
      "HALLEY-AND-PARK",
      "AQUARIUM",
      "HALLEY-AND-UNIVERSITY",
      "PARK-ENTRANCE",
      "SKYCAR-LOT-4",
      "ELM-AND-PARK",
      "MAIN-AND-CHURCH",
      "CHURCH-STREET-PARK",
      "ELM-AND-KENNEDY",
      "HEIMAN-VILLAGE",
      "MAIN-AND-KENNEDY",
      "SKYCAB",
      "HALLEY-PARK-EAST",
      "HALLEY-PARK-WEST",
      "KENNEDY-PARK",
      "RIVERSIDE-PARK",
      "SYMPHONY-HALL"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "HALLEY-PARK-EAST",
        "HALLEY-PARK-WEST",
        "CHURCH-STREET-PARK",
        "KENNEDY-PARK",
        "RIVERSIDE-PARK"
      ],
      "WALK-TO": [
        "HALLEY-PARK-EAST",
        "HALLEY-PARK-WEST",
        "KENNEDY-PARK",
        "RIVERSIDE-PARK",
        "CHURCH-STREET-PARK",
        "ZOO",
        "SYMPHONY-HALL",
        "HALLEY-AND-PARK",
        "ELM-AND-KENNEDY",
        "PARK-ENTRANCE",
        "ELM-AND-PARK",
        "MAIN-AND-KENNEDY",
        "AQUARIUM",
        "MAIN-AND-CHURCH",
        "SKYCAR-LOT-4",
        "HALLEY-AND-UNIVERSITY",
        "HUANG-HALL"
      ],
      "THROUGH": [
        "HALLEY-PARK-EAST",
        "HALLEY-PARK-WEST",
        "KENNEDY-PARK",
        "RIVERSIDE-PARK",
        "CHURCH-STREET-PARK",
        "ZOO",
        "SYMPHONY-HALL",
        "HALLEY-AND-PARK",
        "ELM-AND-KENNEDY",
        "PARK-ENTRANCE",
        "ELM-AND-PARK",
        "MAIN-AND-KENNEDY",
        "AQUARIUM",
        "MAIN-AND-CHURCH",
        "SKYCAR-LOT-4",
        "HALLEY-AND-UNIVERSITY",
        "HUANG-HALL"
      ],
      "DISEMBARK": [
        "HALLEY-PARK-EAST",
        "HALLEY-PARK-WEST",
        "KENNEDY-PARK",
        "RIVERSIDE-PARK",
        "CHURCH-STREET-PARK"
      ],
      "LEAVE": [
        "HALLEY-PARK-EAST",
        "HALLEY-PARK-WEST",
        "KENNEDY-PARK",
        "RIVERSIDE-PARK",
        "CHURCH-STREET-PARK"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PIER-OBJECT",
    "name": "pier",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "pier",
      "wharf",
      "dock",
      "quay"
    ],
    "adjectives": [
      "aging",
      "riverfront",
      "short",
      "wooden",
      "rockvil"
    ],
    "commandNoun": "pier",
    "action": "PIER-OBJECT-F",
    "handledVerbs": [
      "EXAMINE",
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "SKYCAB",
      "BAR",
      "WICKER-AND-PIER",
      "POOL-HALL",
      "PIER"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "SKYCAB",
        "PIER"
      ],
      "WALK-TO": [
        "BAR",
        "WICKER-AND-PIER",
        "POOL-HALL"
      ],
      "THROUGH": [
        "BAR",
        "WICKER-AND-PIER",
        "POOL-HALL"
      ],
      "LEAVE": [
        "PIER"
      ],
      "DISEMBARK": [
        "PIER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PLAY",
    "name": "play",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "play",
      "production",
      "musical"
    ],
    "adjectives": [],
    "commandNoun": "play",
    "action": "PLAY-F",
    "handledVerbs": [
      "EXAMINE",
      "THROUGH",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "THROUGH",
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "WELLS-THEATRE",
      "PICKFORD-THEATRE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXAMINE",
      "THROUGH",
      "WALK-TO"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "WELLS-THEATRE",
        "PICKFORD-THEATRE"
      ],
      "THROUGH": [
        "WELLS-THEATRE",
        "PICKFORD-THEATRE"
      ],
      "WALK-TO": [
        "WELLS-THEATRE",
        "PICKFORD-THEATRE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PAMPHLET-RACK",
    "name": "rack",
    "initialLocation": "TRAIN-STATION",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "rack"
    ],
    "adjectives": [
      "wooden"
    ],
    "commandNoun": "rack",
    "action": "RACK-F",
    "handledVerbs": [
      "PUT",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbGroups": [
      [
        "PUT"
      ],
      [
        "EXAMINE",
        "LOOK-INSIDE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "PUT",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "guaranteedVerbs": [
      "PUT",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "PAMPHLET"
    ],
    "removedObjectIds": []
  },
  {
    "id": "RAMP",
    "name": "ramp",
    "initialLocation": "AQUARIUM",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "ramp"
    ],
    "adjectives": [],
    "commandNoun": "ramp",
    "action": "RAMP-F",
    "handledVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN"
    ],
    "verbGroups": [
      [
        "CLIMB-UP",
        "CLIMB-FOO",
        "CLIMB-DOWN"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN"
    ],
    "guaranteedVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "STREET",
    "name": "road",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "street",
      "road",
      "avenue",
      "boulevard",
      "blvd",
      "drive"
    ],
    "adjectives": [
      "wide"
    ],
    "commandNoun": "road",
    "action": "STREET-F",
    "handledVerbs": [
      "CROSS",
      "FOLLOW"
    ],
    "verbGroups": [
      [
        "CROSS"
      ],
      [
        "FOLLOW"
      ]
    ],
    "actionRooms": [
      "ROOFTOP"
    ],
    "globalVerbs": [
      "CROSS",
      "FOLLOW"
    ],
    "guaranteedVerbs": [
      "CROSS"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ROOF",
    "name": "roof",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "roof",
      "rooftop"
    ],
    "adjectives": [],
    "commandNoun": "roof",
    "action": null,
    "handledVerbs": [],
    "verbGroups": [],
    "actionRooms": [],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GLOBAL-ROOM",
    "name": "room",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "room",
      "chamber",
      "place",
      "hall"
    ],
    "adjectives": [
      "area"
    ],
    "commandNoun": "room",
    "action": "GLOBAL-ROOM-F",
    "handledVerbs": [
      "LOOK",
      "EXAMINE",
      "LOOK-INSIDE",
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "WALK-AROUND",
      "WASH"
    ],
    "verbGroups": [
      [
        "LOOK",
        "EXAMINE",
        "LOOK-INSIDE"
      ],
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "WALK-AROUND"
      ],
      [
        "WASH"
      ]
    ],
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [
      "LOOK",
      "EXAMINE",
      "LOOK-INSIDE",
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK",
      "WALK-AROUND",
      "WASH"
    ],
    "guaranteedVerbs": [
      "LOOK",
      "EXAMINE",
      "LOOK-INSIDE",
      "LEAVE",
      "DISEMBARK",
      "WALK-AROUND"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "JILL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SACK",
    "name": "sack",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "CONTBIT",
      "SEARCHBIT"
    ],
    "synonyms": [
      "sack"
    ],
    "adjectives": [
      "blood-soaked"
    ],
    "commandNoun": "sack",
    "action": "SACK-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [
      "MAIN-STREET-BRIDGE"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SEAT",
    "name": "seat",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "OPENBIT",
      "FURNITUREBIT"
    ],
    "synonyms": [
      "seat",
      "seats",
      "pillowseat",
      "chair",
      "chairs"
    ],
    "adjectives": [
      "plain",
      "built-in"
    ],
    "commandNoun": "seat",
    "action": "SEAT-F",
    "handledVerbs": [
      "COUNT",
      "DISEMBARK"
    ],
    "verbGroups": [
      [
        "COUNT"
      ],
      [
        "DISEMBARK"
      ]
    ],
    "actionRooms": [
      "LECTURE-HALL",
      "SKYCAB"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "COUNT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "COUNT": [
        "LECTURE-HALL"
      ],
      "DISEMBARK": [
        "SKYCAB"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "SKYCAB"
    ],
    "movesToCurrentRoom": true,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "GLOBAL-SIGN",
    "name": "sign",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ],
    "synonyms": [
      "sign",
      "signs",
      "billboard"
    ],
    "adjectives": [
      "large"
    ],
    "commandNoun": "sign",
    "action": "GLOBAL-SIGN-F",
    "handledVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "READ",
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "KENNEDY-PARK",
      "MAIN-AND-WICKER",
      "CONSTRUCTION-SITE-1",
      "CONSTRUCTION-SITE-2",
      "MAIN-AND-RIVER",
      "SOUTHWAY-AND-PARK",
      "SYMPHONY-ENTRANCE",
      "SKYCAR-LOT-6",
      "SKYCAR-LOT-7",
      "ZOO",
      "POST-OFFICE",
      "MUSEUM-ENTRANCE",
      "RIVERSIDE-PARK"
    ],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TUBE-SIGN",
    "name": "sign",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ],
    "synonyms": [
      "sign"
    ],
    "adjectives": [
      "red",
      "brown"
    ],
    "commandNoun": "sign",
    "action": "TUBE-SIGN-F",
    "handledVerbs": [
      "READ"
    ],
    "verbGroups": [
      [
        "READ"
      ]
    ],
    "actionRooms": [
      "RED-TUBECAR",
      "BROWN-TUBECAR"
    ],
    "globalVerbs": [
      "READ"
    ],
    "guaranteedVerbs": [
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SINK",
    "name": "sink",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "sink",
      "basin",
      "washbasin",
      "faucet",
      "spigot"
    ],
    "adjectives": [
      "kitchen",
      "bathroom"
    ],
    "commandNoun": "sink",
    "action": "SINK-F",
    "handledVerbs": [
      "PUT",
      "EXAMINE",
      "LOOK-INSIDE",
      "TURN",
      "ON",
      "OFF"
    ],
    "verbGroups": [
      [
        "PUT"
      ],
      [
        "EXAMINE",
        "LOOK-INSIDE"
      ],
      [
        "TURN",
        "ON",
        "OFF"
      ]
    ],
    "actionRooms": [
      "KITCHEN"
    ],
    "globalVerbs": [
      "PUT",
      "TURN",
      "ON",
      "OFF"
    ],
    "guaranteedVerbs": [
      "PUT",
      "EXAMINE",
      "LOOK-INSIDE",
      "TURN",
      "ON",
      "OFF"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "KITCHEN"
      ],
      "LOOK-INSIDE": [
        "KITCHEN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "WATER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "SLOT",
    "name": "slot",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "slot"
    ],
    "adjectives": [
      "credit",
      "card"
    ],
    "commandNoun": "slot",
    "action": "SLOT-F",
    "handledVerbs": [
      "PUT"
    ],
    "verbGroups": [
      [
        "PUT"
      ],
      [
        "PUT"
      ]
    ],
    "actionRooms": [
      "BODANSKI-SQUARE",
      "JOYBOOTH",
      "CINEMA"
    ],
    "globalVerbs": [
      "PUT"
    ],
    "guaranteedVerbs": [
      "PUT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "PUT": [
        "JOYBOOTH",
        "BODANSKI-SQUARE",
        "CINEMA"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CREDIT-CARD",
      "HEADSET",
      "SEAT",
      "NEWSPAPER",
      "TICKET",
      "DRIVERS-LICENSE",
      "RATION-CARD"
    ],
    "removedObjectIds": []
  },
  {
    "id": "STEW",
    "name": "soup",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "soup",
      "stew",
      "food",
      "meal"
    ],
    "adjectives": [
      "thin"
    ],
    "commandNoun": "soup",
    "action": "STEW-F",
    "handledVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT",
      "BUY"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ],
      [
        "TAKE",
        "EAT"
      ],
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "CLOSED-FACTORY",
      "ROYS-PAGODA",
      "SIMONS",
      "THE-COACHMAN",
      "BURGER-MEISTER"
    ],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "CLOSED-FACTORY",
        "ROYS-PAGODA",
        "SIMONS",
        "THE-COACHMAN",
        "BURGER-MEISTER"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "CLOSED-FACTORY"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "MEAL"
    ],
    "removedObjectIds": []
  },
  {
    "id": "TANK",
    "name": "tank",
    "initialLocation": "AQUARIUM",
    "flags": [
      "NDESCBIT",
      "TRANSBIT"
    ],
    "synonyms": [
      "tank"
    ],
    "adjectives": [
      "large",
      "central"
    ],
    "commandNoun": "tank",
    "action": "TANK-F",
    "handledVerbs": [
      "LOOK-INSIDE",
      "WASH",
      "THROUGH",
      "BOARD",
      "SWIM"
    ],
    "verbGroups": [
      [
        "LOOK-INSIDE"
      ],
      [
        "WASH"
      ],
      [
        "THROUGH",
        "BOARD",
        "SWIM"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-INSIDE",
      "WASH",
      "THROUGH",
      "BOARD",
      "SWIM"
    ],
    "guaranteedVerbs": [
      "LOOK-INSIDE",
      "WASH",
      "THROUGH",
      "BOARD",
      "SWIM"
    ],
    "refusalOnlyVerbs": [
      "WASH"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TOOL",
    "name": "tool",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "screwdriver",
      "crowbar",
      "hacksaw",
      "wrench",
      "hammer",
      "saw"
    ],
    "adjectives": [],
    "commandNoun": "screwdriver",
    "action": "TOOL-F",
    "handledVerbs": [
      "BUY"
    ],
    "verbGroups": [
      [
        "BUY"
      ]
    ],
    "actionRooms": [
      "HARDWARE-STORE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "BUY": [
        "HARDWARE-STORE"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "VENT",
    "name": "vent",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ],
    "synonyms": [
      "vent",
      "vents"
    ],
    "adjectives": [
      "noisy",
      "silent"
    ],
    "commandNoun": "vent",
    "action": "VENT-F",
    "handledVerbs": [
      "LISTEN"
    ],
    "verbGroups": [
      [
        "LISTEN"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN"
    ],
    "guaranteedVerbs": [
      "LISTEN"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "VEST",
    "name": "vest",
    "initialLocation": "DUNBARS",
    "flags": [
      "TAKEBIT",
      "WEARBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ],
    "synonyms": [
      "vest",
      "vests"
    ],
    "adjectives": [
      "thin",
      "imitation",
      "wool"
    ],
    "commandNoun": "vest",
    "action": "VEST-F",
    "handledVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "BUY"
      ],
      [
        "TAKE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "CLOTHES"
    ],
    "removedObjectIds": []
  },
  {
    "id": "WALLS",
    "name": "wall",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "TOUCHBIT"
    ],
    "synonyms": [
      "wall",
      "walls"
    ],
    "adjectives": [],
    "commandNoun": "wall",
    "action": "WALLS-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ROCKVIL-REFORMATORY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "ROCKVIL-REFORMATORY"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "BAR-OBJECT",
    "name": "bar",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "bar",
      "lounge",
      "club",
      "spot"
    ],
    "adjectives": [
      "noisy",
      "tiny",
      "favorite",
      "hangout",
      "dingy",
      "dingy-looking",
      "looking",
      "smoky",
      "smoke-filled",
      "smoke",
      "filled",
      "ezzis",
      "ezzi's"
    ],
    "commandNoun": "bar",
    "action": "BAR-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL",
      "PUT-ON"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ],
      [
        "SMELL"
      ],
      [
        "PUT-ON"
      ]
    ],
    "actionRooms": [
      "BURGER-MEISTER",
      "AQUARIUM-AND-PARK",
      "EZZIS-BAR",
      "BAR",
      "ELM-UNDERPASS",
      "ALLEY"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE",
      "SMELL",
      "PUT-ON"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "BURGER-MEISTER",
        "EZZIS-BAR",
        "BAR",
        "AQUARIUM-AND-PARK",
        "ELM-UNDERPASS",
        "ALLEY"
      ],
      "THROUGH": [
        "BURGER-MEISTER",
        "EZZIS-BAR",
        "BAR",
        "AQUARIUM-AND-PARK",
        "ELM-UNDERPASS",
        "ALLEY"
      ],
      "LEAVE": [
        "BURGER-MEISTER",
        "EZZIS-BAR",
        "BAR"
      ],
      "DISEMBARK": [
        "BURGER-MEISTER",
        "EZZIS-BAR",
        "BAR"
      ],
      "EXAMINE": [
        "BURGER-MEISTER",
        "EZZIS-BAR",
        "BAR"
      ],
      "SMELL": [
        "BURGER-MEISTER"
      ],
      "PUT-ON": [
        "BURGER-MEISTER",
        "EZZIS-BAR",
        "BAR"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "COUNTER"
    ],
    "removedObjectIds": []
  },
  {
    "id": "BED",
    "name": "bed",
    "initialLocation": "BEDROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "bed"
    ],
    "adjectives": [
      "your",
      "my"
    ],
    "commandNoun": "bed",
    "action": "BED-F",
    "handledVerbs": [
      "TAKE",
      "PUT",
      "PUT-ON",
      "WALK-TO"
    ],
    "verbGroups": [
      [
        "TAKE"
      ],
      [
        "PUT",
        "PUT-ON"
      ],
      [
        "WALK-TO"
      ]
    ],
    "actionRooms": [
      "MASTER-BEDROOM"
    ],
    "globalVerbs": [
      "WALK-TO"
    ],
    "guaranteedVerbs": [],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "TAKE": [
        "MASTER-BEDROOM"
      ],
      "PUT": [
        "MASTER-BEDROOM"
      ],
      "PUT-ON": [
        "MASTER-BEDROOM"
      ]
    },
    "hasText": false,
    "dynamicLocations": [
      "MASTER-BEDROOM"
    ],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "BUREAU"
    ],
    "removedObjectIds": []
  },
  {
    "id": "DAY",
    "name": "day",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "day",
      "daytime",
      "daylight",
      "lightness",
      "light",
      "sunshine"
    ],
    "adjectives": [],
    "commandNoun": "day",
    "action": "DAY-F",
    "handledVerbs": [
      "WAIT-FOR"
    ],
    "verbGroups": [
      [
        "WAIT-FOR"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "WAIT-FOR"
    ],
    "guaranteedVerbs": [
      "WAIT-FOR"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [
      "DAWN"
    ],
    "removedObjectIds": []
  },
  {
    "id": "DEN-OBJECT",
    "name": "den",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "den",
      "space"
    ],
    "adjectives": [
      "homey"
    ],
    "commandNoun": "den",
    "action": "DEN-OBJECT-F",
    "handledVerbs": [
      "WALK-TO",
      "THROUGH",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "WALK-TO",
        "THROUGH"
      ],
      [
        "LEAVE",
        "DISEMBARK"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "FOYER",
      "DEN"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "FOYER"
      ],
      "THROUGH": [
        "FOYER"
      ],
      "LEAVE": [
        "DEN"
      ],
      "DISEMBARK": [
        "DEN"
      ],
      "EXAMINE": [
        "DEN"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "KEY",
    "name": "key",
    "initialLocation": null,
    "flags": [
      "TAKEBIT",
      "KEYBIT"
    ],
    "synonyms": [
      "key"
    ],
    "adjectives": [
      "your",
      "my"
    ],
    "commandNoun": "key",
    "action": "KEY-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "MAP",
    "name": "map",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "map",
      "city",
      "rockvil"
    ],
    "adjectives": [
      "rockvil",
      "city"
    ],
    "commandNoun": "map",
    "action": "ITEM-IN-PACKAGE-F",
    "handledVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "PEN",
    "name": "pen",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ],
    "synonyms": [
      "pen"
    ],
    "adjectives": [
      "ball",
      "point",
      "ball-point"
    ],
    "commandNoun": "pen",
    "action": "ITEM-IN-PACKAGE-F",
    "handledVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbGroups": [
      [
        "EXAMINE",
        "READ"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "guaranteedVerbs": [
      "EXAMINE",
      "READ"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "SKY",
    "name": "sky",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [],
    "synonyms": [
      "sky"
    ],
    "adjectives": [
      "darkening",
      "smoggy",
      "gray"
    ],
    "commandNoun": "sky",
    "action": "SKY-F",
    "handledVerbs": [
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "TUB",
    "name": "tub",
    "initialLocation": "EPILOGUE-BATHROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "OPENBIT"
    ],
    "synonyms": [
      "tub",
      "jacuzzi"
    ],
    "adjectives": [
      "large",
      "whirlpool",
      "bath"
    ],
    "commandNoun": "tub",
    "action": "TUB-F",
    "handledVerbs": [
      "THROUGH",
      "BOARD",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "BOARD"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "BOARD",
      "EXAMINE"
    ],
    "guaranteedVerbs": [
      "THROUGH",
      "BOARD",
      "EXAMINE"
    ],
    "refusalOnlyVerbs": [
      "THROUGH",
      "BOARD"
    ],
    "verbRooms": {},
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  },
  {
    "id": "ZOO-OBJECT",
    "name": "zoo",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [],
    "synonyms": [
      "zoo",
      "garden"
    ],
    "adjectives": [
      "rockvil",
      "zoologica",
      "moderatel",
      "sized"
    ],
    "commandNoun": "zoo",
    "action": "ZOO-OBJECT-F",
    "handledVerbs": [
      "THROUGH",
      "WALK-TO",
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbGroups": [
      [
        "THROUGH",
        "WALK-TO"
      ],
      [
        "DISEMBARK",
        "LEAVE"
      ],
      [
        "EXAMINE"
      ]
    ],
    "actionRooms": [
      "ZOO",
      "ZOO-ENTRANCE"
    ],
    "globalVerbs": [],
    "guaranteedVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "refusalOnlyVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "ZOO",
        "ZOO-ENTRANCE"
      ],
      "WALK-TO": [
        "ZOO",
        "ZOO-ENTRANCE"
      ],
      "DISEMBARK": [
        "ZOO"
      ],
      "LEAVE": [
        "ZOO"
      ],
      "EXAMINE": [
        "ZOO"
      ]
    },
    "hasText": false,
    "dynamicLocations": [],
    "movesToCurrentRoom": false,
    "relatedObjectIds": [],
    "removedObjectIds": []
  }
];
