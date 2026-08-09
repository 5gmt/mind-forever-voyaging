// Generated from the preserved ZIL source by scripts/extract-world.mjs.
// Do not edit by hand; the original game remains canonical.

export type WorldExit = { command: string; targetId: string; target: string };
export type WorldRoom = { id: string; name: string; aliases: string[]; globals: string[]; exits: Record<string, WorldExit> };

export type WorldObject = { id: string; name: string; initialLocation: string | null; flags: string[]; synonyms: string[]; adjectives: string[]; commandNoun: string | null; action: string | null; handledVerbs: string[]; actionRooms: string[]; globalVerbs: string[]; verbRooms: Record<string, string[]>; hasText: boolean };

export const WORLD_ROOMS: WorldRoom[] = [
  {
    "id": "CONTROL-CENTER",
    "name": "PRISM Project Control Center",
    "aliases": [
      "PRISM Project Control Center"
    ],
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
      }
    }
  },
  {
    "id": "CHURCH-STREET-APARTMENTS",
    "name": "Church Street Apartments",
    "aliases": [
      "Church Street Apartments"
    ],
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
      }
    }
  },
  {
    "id": "PARKVIEW-HALL",
    "name": "Hall Near Your Apartment",
    "aliases": [
      "Hall Near Your Apartment"
    ],
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
      }
    }
  },
  {
    "id": "INDUSTRIAL-PARK-ENTRANCE",
    "name": "Industrial Park Entrance",
    "aliases": [
      "Industrial Park Entrance"
    ],
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
      }
    }
  },
  {
    "id": "HALLEY-AND-UNIVERSITY",
    "name": "Halley & University",
    "aliases": [
      "Halley & University"
    ],
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
      }
    }
  },
  {
    "id": "PARKVIEW-APARTMENTS",
    "name": "Parkview Apartments",
    "aliases": [
      "Parkview Apartments"
    ],
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
      }
    }
  },
  {
    "id": "RIVER-STREET-BRIDGE",
    "name": "River Street Bridge",
    "aliases": [
      "River Street Bridge"
    ],
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
      }
    }
  },
  {
    "id": "AQUARIUM-AND-KENNEDY",
    "name": "Aquarium & Kennedy",
    "aliases": [
      "Aquarium & Kennedy"
    ],
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
      }
    }
  },
  {
    "id": "AQUARIUM-UNDERPASS",
    "name": "Aquarium Underpass",
    "aliases": [
      "Aquarium Underpass"
    ],
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
      }
    }
  },
  {
    "id": "SOUTHWAY-AND-KENNEDY",
    "name": "Southway & Kennedy",
    "aliases": [
      "Southway & Kennedy"
    ],
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
      }
    }
  },
  {
    "id": "SOUTHWAY-UNDERPASS",
    "name": "Southway Underpass",
    "aliases": [
      "Southway Underpass"
    ],
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
      }
    }
  },
  {
    "id": "CONSTRUCTION-SITE-1",
    "name": "Construction Site",
    "aliases": [
      "Construction Site"
    ],
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
      }
    }
  },
  {
    "id": "AIRPORT-ENTRANCE",
    "name": "Airport Entrance",
    "aliases": [
      "Airport Entrance"
    ],
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
      }
    }
  },
  {
    "id": "HALLEY-PARK-EAST",
    "name": "Halley Park East",
    "aliases": [
      "Halley Park East"
    ],
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
      }
    }
  },
  {
    "id": "HALLEY-PARK-WEST",
    "name": "Halley Park West",
    "aliases": [
      "Halley Park West"
    ],
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
      }
    }
  },
  {
    "id": "CORE",
    "name": "Maintenance Core",
    "aliases": [
      "Maintenance Core"
    ],
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
      }
    }
  },
  {
    "id": "PICKFORD-THEATRE",
    "name": "Pickford Theatre",
    "aliases": [
      "Pickford Theatre"
    ],
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
      }
    }
  },
  {
    "id": "BODANSKI-SQUARE",
    "name": "Bodanski Square",
    "aliases": [
      "Bodanski Square"
    ],
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
      }
    }
  },
  {
    "id": "BURNED-OUT-AREA",
    "name": "Burned-out Area",
    "aliases": [
      "Burned-out Area"
    ],
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
      }
    }
  },
  {
    "id": "MUSEUM-ENTRANCE",
    "name": "Museum Entrance",
    "aliases": [
      "Museum Entrance"
    ],
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
      }
    }
  },
  {
    "id": "RAILROAD-MUSEUM",
    "name": "Railroad Museum",
    "aliases": [
      "Railroad Museum"
    ],
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
      }
    }
  },
  {
    "id": "RIVER-AND-KENNEDY",
    "name": "River & Kennedy",
    "aliases": [
      "River & Kennedy"
    ],
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
      }
    }
  },
  {
    "id": "ROCKVIL-STADIUM",
    "name": "Rockvil Stadium",
    "aliases": [
      "Rockvil Stadium"
    ],
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
      }
    }
  },
  {
    "id": "ATHLETIC-FIELD",
    "name": "Athletic Field",
    "aliases": [
      "Athletic Field"
    ],
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
      }
    }
  },
  {
    "id": "MASTER-BEDROOM",
    "name": "Master Bedroom",
    "aliases": [
      "Master Bedroom"
    ],
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
      }
    }
  },
  {
    "id": "ROCKVIL-CENTRE",
    "name": "Rockvil Centre",
    "aliases": [
      "Rockvil Centre"
    ],
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
      }
    }
  },
  {
    "id": "SKYCAR-FACTORY",
    "name": "Skycar Factory",
    "aliases": [
      "Skycar Factory"
    ],
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
      }
    }
  },
  {
    "id": "DENTAL-SCHOOL",
    "name": "Dental School",
    "aliases": [
      "Dental School"
    ],
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
      }
    }
  },
  {
    "id": "ELM-UNDERPASS",
    "name": "Elm Underpass",
    "aliases": [
      "Elm Underpass"
    ],
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
      }
    }
  },
  {
    "id": "HALLEY-AND-PARK",
    "name": "Halley & Park",
    "aliases": [
      "Halley & Park"
    ],
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
      }
    }
  },
  {
    "id": "HALLEY-MUSEUM",
    "name": "Halley Museum",
    "aliases": [
      "Halley Museum"
    ],
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
      }
    }
  },
  {
    "id": "POWER-STATION",
    "name": "Power Station",
    "aliases": [
      "Power Station"
    ],
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
      }
    }
  },
  {
    "id": "ROYS-PAGODA",
    "name": "Roy's Pagoda",
    "aliases": [
      "Roy's Pagoda"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-AT-PARK",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-AT-HEIMAN",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-AT-FACTORY",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-AT-AIRPORT",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-AT-BODANSKI",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-AT-UNIVERSITY",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "TUBE-JUNCTION",
    "name": "Tube Station",
    "aliases": [
      "Tube Station"
    ],
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
      }
    }
  },
  {
    "id": "ZOO-ENTRANCE",
    "name": "Zoo Entrance",
    "aliases": [
      "Zoo Entrance"
    ],
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
      }
    }
  },
  {
    "id": "INTERCHANGE",
    "name": "Interchange",
    "aliases": [
      "Interchange"
    ],
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
      }
    }
  },
  {
    "id": "EPILOGUE-LIVING-ROOM",
    "name": "Living Room",
    "aliases": [
      "Living Room"
    ],
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
      }
    }
  },
  {
    "id": "EZZIS-BAR",
    "name": "Ezzi's Bar",
    "aliases": [
      "Ezzi's Bar"
    ],
    "globals": [
      "BAR-OBJECT",
      "COUNTER",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "GUEST-ROOM",
    "name": "Guest Room",
    "aliases": [
      "Guest Room"
    ],
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
      }
    }
  },
  {
    "id": "LAUNDROMAT",
    "name": "Laundromat",
    "aliases": [
      "Laundromat"
    ],
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
      }
    }
  },
  {
    "id": "SKYCAR-LOT-1",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
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
      }
    }
  },
  {
    "id": "SKYCAR-LOT-3",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
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
      }
    }
  },
  {
    "id": "SKYCAR-LOT-5",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
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
      }
    }
  },
  {
    "id": "SKYCAR-LOT-7",
    "name": "Skycar Lot",
    "aliases": [
      "Skycar Lot"
    ],
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
      }
    }
  },
  {
    "id": "BATHROOM",
    "name": "Bathroom",
    "aliases": [
      "Bathroom"
    ],
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
    "globals": [
      "JOYBOOTH-OBJECT",
      "SLOT"
    ],
    "exits": {}
  },
  {
    "id": "SOLARIUM",
    "name": "Solarium",
    "aliases": [
      "Solarium"
    ],
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
      }
    }
  },
  {
    "id": "DORM",
    "name": "Dorm",
    "aliases": [
      "Dorm"
    ],
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
    "globals": [
      "RESTAURANT-OBJECT",
      "BAR-OBJECT",
      "COUNTER",
      "SMOKE",
      "GLOBAL-TABLE",
      "MENU",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "BAR",
    "name": "Bar",
    "aliases": [
      "Bar"
    ],
    "globals": [
      "BAR-OBJECT",
      "COUNTER",
      "PIER-OBJECT",
      "MUSIC",
      "SMOKE",
      "BAR",
      "PEOPLE"
    ],
    "exits": {}
  },
  {
    "id": "DEN",
    "name": "Den",
    "aliases": [
      "Den"
    ],
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
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "HELLO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "DISPLAY",
      "READ",
      "WHAT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "DRINK",
      "EAT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {
      "BUY": [
        "LIQUOR-STORE",
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "PLAY",
      "PLAY-WITH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "CALL",
      "EXAMINE",
      "LISTEN"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "HELLO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "ON"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "DISPLAY",
      "WHAT",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "BROWN-TUBECAR"
    ],
    "globalVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "verbRooms": {
      "THROUGH": [
        "BROWN-TUBECAR"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "SIT-NEXT-TO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "SET",
      "HELLO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TELL",
      "TELL-ABOUT",
      "ASK-ABOUT",
      "ASK-FOR",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "OPEN",
      "PUT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "SOUTHWAY-AND-PARK",
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "MAIN-AND-CHURCH",
      "HEIMAN-VILLAGE",
      "CHURCH-STREET-PARK"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ELM-AND-UNIVERSITY",
      "UNIVERSITY-HEIGHTS"
    ],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH"
    ],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "MOVE",
      "TOUCH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "SKYBUS-TERMINAL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "MAIN-AND-KENNEDY"
    ],
    "globalVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-KENNEDY"
      ],
      "WALK-TO": [
        "MAIN-AND-KENNEDY"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "RED-TUBECAR"
    ],
    "globalVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "verbRooms": {
      "THROUGH": [
        "RED-TUBECAR"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "MAIN-AND-KENNEDY"
    ],
    "globalVerbs": [
      "DISEMBARK",
      "LEAVE",
      "EXAMINE"
    ],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-KENNEDY"
      ],
      "WALK-TO": [
        "MAIN-AND-KENNEDY"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false
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
    "verbRooms": {
      "EAT": [
        "KITCHEN"
      ],
      "PUT-AWAY": [
        "KITCHEN"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "PICKFORD-THEATRE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "BUY"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [
      "INDUSTRIAL-PARK-ENTRANCE",
      "SKYCAR-LOT-1",
      "INDUSTRIAL-PARK-DRIVE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "MAIN-LIBRARY"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "ASK-FOR": [
        "MAIN-LIBRARY"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [
      "MAIN-AND-WICKER",
      "BEND",
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "AQUARIUM-AND-PARK",
      "SERVICE-STATION"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO",
      "LEAVE",
      "DISEMBARK"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "BUY": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "EAT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [
      "HARDWARE-STORE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "HEIMAN-VILLAGE",
      "CHURCH-STREET-PARK"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "TELL-ABOUT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ELM-AND-PARK",
      "POLICE-STATION"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "STOCK-EXCHANGE",
      "ELM-AND-RIVER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "WRITE",
      "SIT",
      "BOARD",
      "TAKE",
      "MOVE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "BROWN-TUBECAR"
    ],
    "globalVerbs": [
      "WAIT-FOR"
    ],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "BUY"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "HEALTH-CENTER",
      "MAIN-AND-RIVER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "MUSEUM-ENTRANCE",
      "CINEMA",
      "SKYCAR-LOT-7"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [
      "POWER-STATION"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "MIDLAND-AND-CHURCH"
    ],
    "globalVerbs": [
      "DISEMBARK",
      "LEAVE"
    ],
    "verbRooms": {
      "THROUGH": [
        "MIDLAND-AND-CHURCH"
      ],
      "WALK-TO": [
        "MIDLAND-AND-CHURCH"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "ON",
      "OFF"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE",
      "OPEN",
      "CLOSE",
      "BUY"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "RIVER-STREET-BRIDGE",
      "MAIN-STREET-BRIDGE",
      "MAIN-AND-WICKER"
    ],
    "globalVerbs": [
      "CROSS",
      "LOOK-UNDER"
    ],
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
    "hasText": false
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
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "SYMPHONY-HALL",
      "SYMPHONY-ENTRANCE",
      "SKYCAR-LOT-7"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "BODANSKI-SQUARE",
      "MIDLAND-AND-RIVER",
      "TRAIN-STATION"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "AIRPORTWAY-AND-RIVER",
      "AQUARIUM-AND-RIVER",
      "WELLS-THEATRE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "THROUGH",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TELL"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DORM",
      "CONTROL-CENTER"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "LISTEN": [
        "CONTROL-CENTER"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "NEWS"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "NEWS"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "WASH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "YES",
      "NO",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "FIREHOUSE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "CITY-DUMP"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "BUY": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "SOUTHWAY-AND-RIVER",
      "BEND",
      "CONSTRUCTION-SITE-2"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "ROCKVIL-UNIVERSITY",
      "LECTURE-HALL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "LIQUOR-STORE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "KICK"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "MAIN-AND-RIVER"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {
      "THROUGH": [
        "MAIN-AND-RIVER"
      ],
      "WALK-TO": [
        "MAIN-AND-RIVER"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EAT",
      "SMELL",
      "TAKE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "TAKE",
      "ON"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "WICKER-AND-RIVER",
      "CLOSED-FACTORY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "CHURCH-STREET-PARK",
      "WAREHOUSE-1",
      "WICKER-AND-PIER",
      "MAIN-AND-WICKER",
      "BEND",
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "RED-TUBECAR",
      "BROWN-TUBECAR",
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "GIVE",
      "SGIVE",
      "ASK-FOR"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "LISTEN"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "EPILOGUE-KITCHEN",
      "EPILOGUE-LIVING-ROOM",
      "DINING-ROOM"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "INTERCHANGE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "hasText": false
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
    "verbRooms": {
      "BUY": [
        "EZZIS-BAR",
        "BAR",
        "BURGER-MEISTER",
        "LIQUOR-STORE",
        "ROYS-PAGODA"
      ]
    },
    "hasText": false
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
    "verbRooms": {
      "EXAMINE": [
        "SKYCAR-FACTORY"
      ],
      "LOOK-INSIDE": [
        "SKYCAR-FACTORY"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "POST-OFFICE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
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
    "hasText": true
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
    "actionRooms": [
      "RED-TUBECAR"
    ],
    "globalVerbs": [
      "WAIT-FOR"
    ],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "CLIMB-FOO",
      "CLIMB-UP"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [
      "PUSH",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "COURTHOUSE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "DRUG-STORE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "CENTRE-AND-KENNEDY",
      "HALLEY-AND-PARK",
      "HALLEY-PARK-EAST",
      "HUANG-HALL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "PUSH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "BURGER-MEISTER",
      "AQUARIUM-AND-PARK",
      "MAIN-AND-WICKER",
      "BODANSKI-SQUARE",
      "ELM-UNDERPASS"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "ON"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "STATUS",
      "ON",
      "OFF",
      "SET",
      "TRANSMIT",
      "HELLO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "WAVE",
      "SHAKE",
      "WASH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "LIVING-ROOM"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO",
      "WASH"
    ],
    "verbRooms": {
      "DISEMBARK": [
        "LIVING-ROOM"
      ],
      "LEAVE": [
        "LIVING-ROOM"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "POOL-HALL"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "PLAY": [
        "POOL-HALL"
      ],
      "SHOOT": [
        "POOL-HALL"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "BOOKSTORE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "STUDENT-UNION"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "STUDENT-UNION"
      ],
      "WALK-TO": [
        "STUDENT-UNION"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "CITY-HALL",
      "ROCKVIL-CENTRE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "LECTURE-HALL"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "LECTURE-HALL"
      ],
      "WALK-TO": [
        "LECTURE-HALL"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DORM"
    ],
    "globalVerbs": [
      "SMELL"
    ],
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
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "BOARD",
      "THROUGH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "CLIMB-FOO",
      "CLIMB-UP",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DRUG-STORE"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {
      "BUY": [
        "DRUG-STORE"
      ],
      "TAKE": [
        "DRUG-STORE"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "BODANSKI-SQUARE",
      "DRUG-STORE"
    ],
    "globalVerbs": [
      "READ",
      "TAKE",
      "PUT"
    ],
    "verbRooms": {
      "BUY": [
        "BODANSKI-SQUARE",
        "DRUG-STORE"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-BEHIND",
      "WALK-AROUND",
      "LOOK"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "POOL-HALL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "BOARD",
      "THROUGH",
      "SWIM",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [
      "EAT",
      "EXAMINE"
    ],
    "verbRooms": {
      "BUY": [
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "TERMINAL"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "WALK-TO": [
        "TERMINAL"
      ],
      "THROUGH": [
        "TERMINAL"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "MAIN-AND-KENNEDY",
      "ELM-AND-KENNEDY",
      "ELM-AND-PARK"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "BOARD",
      "SWIM",
      "LOOK-INSIDE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "WHAT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "HALLEY-PARK-EAST",
      "SKYCAR-LOT-4",
      "AQUARIUM-AND-PARK",
      "AQUARIUM-AND-KENNEDY",
      "AQUARIUM"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "BEDROOM",
      "FOYER",
      "EPILOGUE-BATHROOM",
      "BATHROOM"
    ],
    "globalVerbs": [
      "WASH"
    ],
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
    "hasText": false
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
    "actionRooms": [
      "SKYCAB",
      "BASE-GATE",
      "SYMPHONY-ENTRANCE"
    ],
    "globalVerbs": [
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
    "hasText": false
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
    "verbRooms": {
      "EXAMINE": [
        "BURNED-OUT-AREA",
        "CHURCH-ENTRANCE",
        "MIDLAND-AND-CHURCH",
        "CONSTRUCTION-SITE-5"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "CEMETERY",
      "MAIN-AND-WICKER",
      "MAIN-AND-CHURCH",
      "CHURCH-ENTRANCE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "LIVING-ROOM",
      "ZOO"
    ],
    "globalVerbs": [
      "TELL",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DUNBARS",
      "ROCKVIL-CENTRE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "WICKER-AND-RIVER"
    ],
    "globalVerbs": [
      "THROUGH",
      "OPEN",
      "CLOSE",
      "LOOK-INSIDE"
    ],
    "verbRooms": {
      "SMELL": [
        "WICKER-AND-RIVER"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "AQUARIUM",
      "RAILROAD-MUSEUM"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "AQUARIUM",
        "RAILROAD-MUSEUM"
      ]
    },
    "hasText": false
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
    "verbRooms": {
      "READ": [
        "CEMETERY",
        "CHURCH-STREET-PARK",
        "RED-TUBECAR",
        "BROWN-TUBECAR",
        "ELM-UNDERPASS"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "FACTORY-ENTRANCE",
      "GUN-SHOP"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "HARDWARE-STORE"
    ],
    "globalVerbs": [
      "TAKE"
    ],
    "verbRooms": {
      "BUY": [
        "HARDWARE-STORE"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "HOSPITAL",
      "ELM-AND-KENNEDY",
      "HOSPITAL-ANNEX"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "JOYBOOTH",
      "ROCKVIL-MALL"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
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
    "hasText": false
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
    "actionRooms": [
      "SKYCAB",
      "DRUG-STORE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-INSIDE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "TRAIN-STATION"
    ],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {
      "BUY": [
        "TRAIN-STATION"
      ]
    },
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "SKYBUS-TERMINAL",
      "MAIN-AND-KENNEDY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "TERMINAL",
      "AIRPORT-ENTRANCE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "SQUEEZE",
      "PLAY-WITH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN"
    ],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "PUT-ON",
      "EXAMINE",
      "BOARD",
      "LIE-DOWN",
      "CLIMB-ON",
      "WEAR"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-UNDER"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DUNBARS",
      "HEIMAN-VILLAGE",
      "ROCKVIL-MALL"
    ],
    "globalVerbs": [
      "REMOVE",
      "TAKE-OFF"
    ],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "KITCHEN",
      "EPILOGUE-KITCHEN"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "CLOSED-FACTORY",
      "WICKER-AND-RIVER",
      "POWER-STATION-ENTRANCE",
      "FACTORY-ENTRANCE",
      "INDUSTRIAL-PARK-DRIVE",
      "SKYCAR-FACTORY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "CORE",
      "CONTROL-CENTER",
      "GUN-SHOP"
    ],
    "globalVerbs": [
      "SHOOT"
    ],
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
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "PUT-ON"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN",
      "ON",
      "PLAY"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "KITCHEN",
      "EPILOGUE-KITCHEN"
    ],
    "globalVerbs": [
      "WASH"
    ],
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
    "hasText": false
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
    "actionRooms": [
      "MAIN-LIBRARY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "UNLOCK",
      "READ",
      "COUNT",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "CONSTRUCTION-SITE-5",
      "CHURCH-ENTRANCE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "ROOFTOP",
      "SKYCAB"
    ],
    "globalVerbs": [
      "THROUGH",
      "WALK-TO"
    ],
    "verbRooms": {
      "EXAMINE": [
        "ROOFTOP",
        "SKYCAB"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "BOOKSTORE",
      "FOODVILLE-1",
      "FOODVILLE-2"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "BOOKSTORE",
        "FOODVILLE-1",
        "FOODVILLE-2"
      ]
    },
    "hasText": false
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
    "verbRooms": {
      "COUNT": [
        "SKYCAR-FACTORY"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "ROCKVIL-STADIUM",
      "STADIUM-LOT-A",
      "STADIUM-LOT-B",
      "STADIUM-LOT-C",
      "TUBE-AT-STADIUM"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "PATIO",
      "EPILOGUE-LIVING-ROOM",
      "SOLARIUM"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "PATIO"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ROCKVIL-STADIUM"
    ],
    "globalVerbs": [
      "TOUCH",
      "FEED",
      "GIVE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "OPEN",
      "CLOSE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "PARKVIEW-APARTMENTS"
    ],
    "globalVerbs": [
      "PUSH",
      "COUNT"
    ],
    "verbRooms": {
      "EXAMINE": [
        "PARKVIEW-APARTMENTS"
      ],
      "READ": [
        "PARKVIEW-APARTMENTS"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "ELM-AND-UNIVERSITY",
      "LECTURE-HALL",
      "DORM",
      "HALLEY-AND-UNIVERSITY",
      "STUDENT-UNION",
      "ROCKVIL-UNIVERSITY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "ON",
      "PUT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [
      "DORM"
    ],
    "globalVerbs": [
      "SMELL"
    ],
    "verbRooms": {
      "THROUGH": [
        "DORM"
      ],
      "WALK-TO": [
        "DORM"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "PUSH",
      "MOVE",
      "TOUCH",
      "SMELL",
      "BUY"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "SKYCAB",
      "RIVERSIDE-PARK",
      "HALLEY-AND-PARK",
      "MUSEUM-ENTRANCE",
      "HALLEY-MUSEUM",
      "RAILROAD-MUSEUM"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "LECTURE-HALL"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "THROUGH": [
        "LECTURE-HALL"
      ],
      "WALK-TO": [
        "LECTURE-HALL"
      ]
    },
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "HEIMAN-VILLAGE",
      "AQUARIUM-AND-KENNEDY",
      "RIVER-AND-KENNEDY",
      "AIRPORTWAY-AND-RIVER",
      "ROCKVIL-HIGH",
      "DENTAL-SCHOOL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "WAIT-FOR",
      "EXAMINE",
      "FIND"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXIT",
      "LEAVE",
      "DISEMBARK",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "WICKER-AND-RIVER",
      "MASTER-BEDROOM"
    ],
    "globalVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN"
    ],
    "verbRooms": {
      "SMELL": [
        "WICKER-AND-RIVER"
      ],
      "EXAMINE": [
        "MASTER-BEDROOM"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "READ",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "WHO",
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "FLUSH",
      "LOOK-INSIDE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "CHURCH-STREET-PARK",
      "HALLEY-AND-PARK",
      "AQUARIUM-AND-PARK"
    ],
    "globalVerbs": [
      "LOOK-INSIDE"
    ],
    "verbRooms": {
      "THROUGH": [
        "HALLEY-AND-PARK",
        "AQUARIUM-AND-PARK"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "CLOSE",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {
      "LOOK-INSIDE": [
        "RAILROAD-MUSEUM",
        "CAFETERIA",
        "MASTER-BEDROOM",
        "SKYCAB"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ALLEY",
      "FACTORY-ENTRANCE",
      "BAR"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "HOSPITAL",
      "HOSPITAL-ANNEX"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "BUY"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "BOOKSTORE",
      "MAIN-LIBRARY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DRUG-STORE"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "BUY": [
        "DRUG-STORE"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "MOVE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [
      "RIVER-AND-PARK",
      "RIVER-AND-KENNEDY",
      "ROCKVIL-STADIUM",
      "ATHLETIC-FIELD"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "FOODVILLE-2",
      "CONSTRUCTION-SITE-5",
      "MIDLAND-AND-RIVER",
      "UNIVERSITY-HEIGHTS",
      "PARKVIEW-APARTMENTS",
      "CHURCH-STREET-APARTMENTS"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "CENTRE-AND-KENNEDY",
      "AIRPORTWAY-AND-RIVER",
      "SKYCAR-LOT-7",
      "VELDRAN-HOTEL",
      "COLONIAL-HOTEL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "WALK-TO",
      "THROUGH",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "DORM",
      "BAR"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "LISTEN": [
        "BAR"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "ROOFTOP"
    ],
    "globalVerbs": [
      "WAIT-FOR"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {
      "EXAMINE": [
        "PATIO"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "BUY",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE",
      "WALK-TO"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "MAIN-AND-WICKER",
      "POWER-STATION",
      "BURGER-MEISTER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "TAKE",
      "EAT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "TAKE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "PUT"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LEAVE",
      "DISEMBARK",
      "WALK-TO",
      "THROUGH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "CLOSED-FACTORY",
      "DINING-ROOM",
      "CAFETERIA"
    ],
    "globalVerbs": [
      "PUT",
      "PUT-ON"
    ],
    "verbRooms": {
      "EXAMINE": [
        "CAFETERIA"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "ROYS-PAGODA"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "BOARD": [
        "ROYS-PAGODA"
      ],
      "SIT": [
        "ROYS-PAGODA"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [
      "LIVING-ROOM"
    ],
    "globalVerbs": [
      "TELL",
      "ASK-ABOUT",
      "TELL-ABOUT",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "BANK"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "CLOSE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "OPEN",
      "UNLOCK",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "FOYER",
      "LIVING-ROOM",
      "PARKVIEW-HALL"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "UNIVERSITY-HEIGHTS",
      "PARKVIEW-APARTMENTS",
      "CHURCH-STREET-APARTMENTS"
    ],
    "globalVerbs": [
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "OPEN",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "EAT",
      "TOUCH"
    ],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "hasText": false
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
    "verbRooms": {
      "GIVE": [
        "BEDROOM"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ROCKVIL-MALL",
      "ELM-AND-KENNEDY",
      "ELM-AND-RIVER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "BURGER-MEISTER"
    ],
    "globalVerbs": [
      "READ",
      "EXAMINE",
      "ASK-NO-ONE-FOR"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": true
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
    "hasText": false
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
    "actionRooms": [
      "SKYCAB",
      "BAR",
      "WICKER-AND-PIER",
      "POOL-HALL",
      "PIER"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "WELLS-THEATRE",
      "PICKFORD-THEATRE"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "PUT",
      "EXAMINE",
      "LOOK-INSIDE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "CLIMB-UP",
      "CLIMB-FOO",
      "CLIMB-DOWN"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ROOFTOP"
    ],
    "globalVerbs": [
      "CROSS",
      "FOLLOW"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [],
    "verbRooms": {},
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "LECTURE-HALL",
      "SKYCAB"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "COUNT": [
        "LECTURE-HALL"
      ],
      "DISEMBARK": [
        "SKYCAB"
      ]
    },
    "hasText": false
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
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "RED-TUBECAR",
      "BROWN-TUBECAR"
    ],
    "globalVerbs": [
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "KITCHEN"
    ],
    "globalVerbs": [
      "PUT",
      "TURN",
      "ON",
      "OFF"
    ],
    "verbRooms": {
      "EXAMINE": [
        "KITCHEN"
      ],
      "LOOK-INSIDE": [
        "KITCHEN"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "BODANSKI-SQUARE",
      "JOYBOOTH",
      "CINEMA"
    ],
    "globalVerbs": [
      "PUT"
    ],
    "verbRooms": {
      "PUT": [
        "JOYBOOTH",
        "BODANSKI-SQUARE",
        "CINEMA"
      ]
    },
    "hasText": false
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
    "verbRooms": {
      "BUY": [
        "CLOSED-FACTORY",
        "ROYS-PAGODA",
        "SIMONS",
        "THE-COACHMAN",
        "BURGER-MEISTER"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LOOK-INSIDE",
      "WASH",
      "THROUGH",
      "BOARD",
      "SWIM"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "HARDWARE-STORE"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "BUY": [
        "HARDWARE-STORE"
      ]
    },
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "LISTEN"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "BUY",
      "TAKE",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ROCKVIL-REFORMATORY"
    ],
    "globalVerbs": [],
    "verbRooms": {
      "EXAMINE": [
        "ROCKVIL-REFORMATORY"
      ]
    },
    "hasText": false
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
    "actionRooms": [
      "BURGER-MEISTER",
      "AQUARIUM-AND-PARK",
      "EZZIS-BAR",
      "BAR",
      "ELM-UNDERPASS",
      "ALLEY"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [
      "MASTER-BEDROOM"
    ],
    "globalVerbs": [
      "WALK-TO"
    ],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "WAIT-FOR"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "FOYER",
      "DEN"
    ],
    "globalVerbs": [],
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
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE",
      "READ"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [],
    "globalVerbs": [
      "THROUGH",
      "BOARD",
      "EXAMINE"
    ],
    "verbRooms": {},
    "hasText": false
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
    "actionRooms": [
      "ZOO",
      "ZOO-ENTRANCE"
    ],
    "globalVerbs": [],
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
    "hasText": false
  }
];
