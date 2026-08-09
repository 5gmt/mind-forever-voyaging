// Generated from the preserved ZIL source by scripts/extract-world.mjs.
// Do not edit by hand; the original game remains canonical.

export type WorldExit = { command: string; targetId: string; target: string };
export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit> };

export type WorldObject = { id: string; name: string; initialLocation: string | null; flags: string[]; synonyms: string[]; adjectives: string[]; commandNoun: string | null };

export const WORLD_ROOMS: WorldRoom[] = [
  {
    "id": "CONTROL-CENTER",
    "name": "PRISM Project Control Center",
    "exits": {}
  },
  {
    "id": "CHURCH-STREET-APARTMENTS",
    "name": "Church Street Apartments",
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
    "exits": {}
  },
  {
    "id": "ROOFTOP",
    "name": "Research Center Rooftop",
    "exits": {}
  },
  {
    "id": "NEWS",
    "name": "World News Network Feed",
    "exits": {}
  },
  {
    "id": "POWER-STATION-ENTRANCE",
    "name": "Power Station Entrance",
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
    "exits": {}
  },
  {
    "id": "INDUSTRIAL-PARK-DRIVE",
    "name": "Industrial Park Drive",
    "exits": {
      "SE": {
        "command": "se",
        "targetId": "INDUSTRIAL-PARK-ENTRANCE",
        "target": "Industrial Park Entrance"
      }
    }
  },
  {
    "id": "HALLEY-AND-UNIVERSITY",
    "name": "Halley & University",
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
        "target": "park entrance"
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
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "ZOO-ENTRANCE",
        "target": "Zoo Entrance"
      }
    }
  },
  {
    "id": "MAIN-STREET-BRIDGE",
    "name": "Main Street Bridge",
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
    "id": "SYMPHONY-ENTRANCE",
    "name": "Symphony Entrance",
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
        "target": "first methodist church"
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
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "PARK-ENTRANCE",
        "target": "park entrance"
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
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "PARK-ENTRANCE",
        "target": "park entrance"
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
    "exits": {}
  },
  {
    "id": "MIDLAND-AND-CHURCH",
    "name": "Midland & Church",
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
        "target": "church entrance"
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
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "ELM-AND-RIVER",
        "target": "Elm & River"
      },
      "EAST": {
        "command": "east",
        "targetId": "CONSTRUCTION-SITE-2",
        "target": "construction site 2"
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
    "id": "COLONIAL-HOTEL",
    "name": "Colonial Hotel",
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
    "exits": {
      "EAST": {
        "command": "east",
        "targetId": "CHURCH-STREET-PARK",
        "target": "church street park"
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
        "target": "warehouse 1"
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
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "CHURCH-ENTRANCE",
        "target": "church entrance"
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
        "target": "church street park"
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
    "id": "VELDRAN-HOTEL",
    "name": "Veldran Hotel",
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
    "id": "LECTURE-HALL",
    "name": "Lecture Hall",
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
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "MIDLAND-AND-RIVER",
        "target": "Midland & River"
      },
      "NE": {
        "command": "ne",
        "targetId": "HEALTH-CENTER",
        "target": "health center"
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
    "id": "ROCKVIL-MALL",
    "name": "Rockvil Mall",
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
    "id": "THE-COACHMAN",
    "name": "The Coachman",
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
    "exits": {}
  },
  {
    "id": "GUEST-ROOM",
    "name": "Guest Room",
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
    "exits": {
      "SOUTH": {
        "command": "south",
        "targetId": "HEALTH-CENTER",
        "target": "health center"
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
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "FIRST-METHODIST-CHURCH",
        "target": "first methodist church"
      },
      "EAST": {
        "command": "east",
        "targetId": "BODANSKI-SQUARE",
        "target": "Bodanski Square"
      },
      "WEST": {
        "command": "west",
        "targetId": "PARK-ENTRANCE",
        "target": "park entrance"
      }
    }
  },
  {
    "id": "SKYCAR-LOT-6",
    "name": "Skycar Lot",
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
    "id": "BASE-GATE",
    "name": "Base Gate",
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
    "exits": {}
  },
  {
    "id": "POOL-HALL",
    "name": "Pool Hall",
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
    "id": "WAREHOUSE-2",
    "name": "Warehouse",
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
        "target": "church entrance"
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
    "exits": {}
  },
  {
    "id": "SOLARIUM",
    "name": "Solarium",
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
    "exits": {}
  },
  {
    "id": "BROWN-TUBECAR",
    "name": "Tubecar",
    "exits": {}
  },
  {
    "id": "CINEMA",
    "name": "Cinema",
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
    "exits": {}
  },
  {
    "id": "ALLEY",
    "name": "Alley",
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
    "exits": {
      "NORTH": {
        "command": "north",
        "targetId": "SOUTHWAY-AND-RIVER",
        "target": "Southway & River"
      },
      "NE": {
        "command": "ne",
        "targetId": "CONSTRUCTION-SITE-2",
        "target": "construction site 2"
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
    "id": "BAR",
    "name": "Bar",
    "exits": {}
  },
  {
    "id": "DEN",
    "name": "Den",
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
    "commandNoun": "national computer"
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
    "commandNoun": "communication outlets"
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
    "commandNoun": "metropolitan computer"
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
    "commandNoun": "fashionable"
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
    "commandNoun": "project member"
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
    "commandNoun": "riverside center"
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
    "commandNoun": "strip advertisement"
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
    "commandNoun": "evening start"
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
    "commandNoun": "morning start"
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
    "commandNoun": "baby formula"
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
    "commandNoun": "cheap bottle"
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
    "commandNoun": "feeder transmitter"
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
    "commandNoun": "conditioning"
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
    "commandNoun": "electronic game"
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
    "commandNoun": "evening end"
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
    "commandNoun": "janitorial controller"
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
    "commandNoun": null
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
    "commandNoun": "morning end"
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
    "commandNoun": "ryder"
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
    "commandNoun": "simulation controller"
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
    "commandNoun": null
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
    "commandNoun": "special buffer"
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
    "commandNoun": "entertainment center"
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
    "commandNoun": "active ports"
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
    "commandNoun": "auditing percentage"
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
    "commandNoun": "tubecar doors"
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
    "commandNoun": "communications mode"
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
    "commandNoun": "government official"
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
    "commandNoun": "auditing system"
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
    "commandNoun": "maintenance workers"
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
    "commandNoun": "newspaper dispenser"
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
    "commandNoun": "parkview apartments"
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
    "commandNoun": "rolling countryside"
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
    "commandNoun": "memory banks"
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
    "commandNoun": "spare parts"
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
    "commandNoun": "church city"
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
    "commandNoun": "interstate"
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
    "commandNoun": "national guardsman"
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
    "commandNoun": null
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
    "commandNoun": "rotating functions"
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
    "commandNoun": "university heights"
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
    "commandNoun": "blackened timbers"
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
    "commandNoun": "boarding platform"
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
    "commandNoun": "construction"
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
    "commandNoun": "fountain"
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
    "commandNoun": "infotech building"
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
    "commandNoun": null
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
    "commandNoun": "tubecar doors"
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
    "commandNoun": "silicorp building"
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
    "commandNoun": "world buffer"
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
    "commandNoun": "activity offices"
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
    "commandNoun": "groceries"
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
    "commandNoun": "driver's license"
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
    "commandNoun": "fortzman"
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
    "commandNoun": "garbage disposal"
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
    "commandNoun": "magazine article"
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
    "commandNoun": "pickford theatre"
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
    "commandNoun": "plastalloy beams"
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
    "commandNoun": null
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
    "commandNoun": "receiver station"
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
    "commandNoun": null
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
    "commandNoun": null
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
    "commandNoun": null
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
    "commandNoun": "perelman"
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
    "commandNoun": "glossy pamphlet"
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
    "commandNoun": "granola cluster"
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
    "commandNoun": "hvac controller"
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
    "commandNoun": null
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
    "commandNoun": "industrial park"
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
    "commandNoun": "library account"
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
    "commandNoun": "office building"
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
    "commandNoun": "chinese man"
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
    "commandNoun": null
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
    "commandNoun": "railroad bridge"
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
    "commandNoun": "service station"
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
    "commandNoun": "simulation mode"
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
    "commandNoun": "papers"
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
    "commandNoun": "turkey sandwich"
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
    "commandNoun": "vegetable salad"
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
    "commandNoun": "control center"
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
    "commandNoun": null
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
    "commandNoun": "halley estates"
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
    "commandNoun": "hardware store"
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
    "commandNoun": "village"
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
    "commandNoun": "interface mode"
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
    "commandNoun": null
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
    "commandNoun": "titles"
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
    "commandNoun": null
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
    "commandNoun": "police officer"
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
    "commandNoun": "police station"
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
    "commandNoun": null
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
    "commandNoun": "spaceport gate"
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
    "commandNoun": "exchange"
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
    "commandNoun": "word processor"
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
    "commandNoun": "bamboo screen"
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
    "commandNoun": "tubecar"
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
    "commandNoun": null
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
    "commandNoun": "coffee"
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
    "commandNoun": "health center"
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
    "commandNoun": "movie theatre"
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
    "commandNoun": null
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
    "commandNoun": "power station"
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
    "commandNoun": "railroad yard"
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
    "commandNoun": "frita"
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
    "commandNoun": "record buffer"
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
    "commandNoun": "romance novel"
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
    "commandNoun": "street bridge"
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
    "commandNoun": "student union"
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
    "commandNoun": "symphony"
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
    "commandNoun": "ticket seller"
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
    "commandNoun": "train station"
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
    "commandNoun": "wells theatre"
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
    "commandNoun": "airport gate"
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
    "commandNoun": "ali building"
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
    "commandNoun": "alpha sector"
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
    "commandNoun": "price"
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
    "commandNoun": "randu"
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
    "commandNoun": "card catalog"
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
    "commandNoun": "church elder"
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
    "commandNoun": "conversation"
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
    "commandNoun": "current feed"
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
    "commandNoun": "delta sector"
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
    "commandNoun": "dirty dishes"
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
    "commandNoun": "grimwold"
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
    "commandNoun": "perelman"
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
    "commandNoun": "warren"
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
    "commandNoun": "fire station"
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
    "commandNoun": "gamma sector"
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
    "commandNoun": "garbage dump"
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
    "commandNoun": "ham sandwich"
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
    "commandNoun": "heiman world"
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
    "commandNoun": "lecture hall"
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
    "commandNoun": "library mode"
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
    "commandNoun": "library unit"
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
    "commandNoun": "liquor store"
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
    "commandNoun": "mallard"
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
    "commandNoun": "perez towers"
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
    "commandNoun": "picturephone"
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
    "commandNoun": "pile"
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
    "commandNoun": "refrigerator"
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
    "commandNoun": "shower"
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
    "commandNoun": "soup kitchen"
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
    "commandNoun": "train tracks"
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
    "commandNoun": "tube station"
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
    "commandNoun": "unshaven man"
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
    "commandNoun": "mailbox"
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
    "commandNoun": "parents"
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
    "commandNoun": "beta sector"
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
    "commandNoun": "soda"
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
    "commandNoun": "credit card"
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
    "commandNoun": "derricopter"
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
    "commandNoun": "dinette set"
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
    "commandNoun": "dining room"
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
    "commandNoun": "interchange"
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
    "commandNoun": "living room"
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
    "commandNoun": "beer"
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
    "commandNoun": "parking lot"
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
    "commandNoun": "post office"
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
    "commandNoun": "protrusions"
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
    "commandNoun": "ration card"
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
    "commandNoun": "tubecar"
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
    "commandNoun": "resignation"
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
    "commandNoun": "rusty cross"
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
    "commandNoun": "silver dove"
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
    "commandNoun": "supermarket"
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
    "commandNoun": "ventilation"
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
    "commandNoun": "water tower"
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
    "commandNoun": "buzzer"
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
    "commandNoun": "auditorium"
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
    "commandNoun": "clerkmaton"
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
    "commandNoun": "courthouse"
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
    "commandNoun": "drug store"
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
    "commandNoun": "firecopter"
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
    "commandNoun": "floodlight"
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
    "commandNoun": "headstones"
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
    "commandNoun": "huang hall"
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
    "commandNoun": "pool table"
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
    "commandNoun": null
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
    "commandNoun": "prostitute"
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
    "commandNoun": "red button"
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
    "commandNoun": "restaurant"
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
    "commandNoun": "river bank"
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
    "commandNoun": "sleep mode"
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
    "commandNoun": "stands"
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
    "commandNoun": "vacant lot"
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
    "commandNoun": "viewscreen"
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
    "commandNoun": "feeder"
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
    "commandNoun": null
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
    "commandNoun": "your hands"
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
    "commandNoun": "apartment"
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
    "commandNoun": "bathrooms"
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
    "commandNoun": "billiards"
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
    "commandNoun": "bleachers"
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
    "commandNoun": "bookstore"
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
    "commandNoun": "bookstore"
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
    "commandNoun": "bsf guard"
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
    "commandNoun": "cafeteria"
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
    "commandNoun": "cafeteria"
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
    "commandNoun": "city hall"
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
    "commandNoun": "classroom"
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
    "commandNoun": "directory"
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
    "commandNoun": "dormitory"
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
    "commandNoun": "duck pond"
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
    "commandNoun": "fireplace"
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
    "commandNoun": "firetruck"
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
    "commandNoun": "lamp post"
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
    "commandNoun": "machinery"
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
    "commandNoun": "manta ray"
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
    "commandNoun": "milkshake"
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
    "commandNoun": "newspaper"
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
    "commandNoun": "partition"
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
    "commandNoun": null
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
    "commandNoun": "pool hall"
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
    "commandNoun": "reservoir"
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
    "commandNoun": "skycopter"
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
    "commandNoun": "soy patty"
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
    "commandNoun": "spaceport"
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
    "commandNoun": null
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
    "commandNoun": "terminals"
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
    "commandNoun": "townhouse"
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
    "commandNoun": "gold"
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
    "commandNoun": "warehouse"
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
    "commandNoun": "waterpool"
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
    "commandNoun": "your head"
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
    "commandNoun": "your name"
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
    "commandNoun": "aquarium"
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
    "commandNoun": "bathroom"
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
    "commandNoun": "bsf base"
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
    "commandNoun": "building"
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
    "commandNoun": "cemetery"
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
    "commandNoun": "children"
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
    "commandNoun": "criminal"
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
    "commandNoun": "dunbar's"
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
    "commandNoun": "entrance"
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
    "commandNoun": "exhibits"
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
    "commandNoun": "graffiti"
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
    "commandNoun": "gun shop"
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
    "commandNoun": "hardware"
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
    "commandNoun": "homework"
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
    "commandNoun": "hospital"
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
    "commandNoun": "joybooth"
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
    "commandNoun": "magazine"
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
    "commandNoun": "midnight"
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
    "commandNoun": "mitchell"
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
    "commandNoun": "overcoat"
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
    "commandNoun": "painting"
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
    "commandNoun": "pedestal"
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
    "commandNoun": "red sign"
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
    "commandNoun": "skylight"
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
    "commandNoun": "souvenir"
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
    "commandNoun": "tenement"
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
    "commandNoun": "terminal"
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
    "commandNoun": "terminal"
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
    "commandNoun": "terminal"
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
    "commandNoun": "plan"
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
    "commandNoun": "tote bag"
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
    "commandNoun": "toy duck"
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
    "commandNoun": "vibramat"
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
    "commandNoun": "myself"
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
    "commandNoun": "barking"
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
    "commandNoun": "bedroom"
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
    "commandNoun": "blanket"
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
    "commandNoun": "ceiling"
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
    "commandNoun": "clothes"
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
    "commandNoun": "cooling"
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
    "commandNoun": "counter"
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
    "commandNoun": "decoder"
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
    "commandNoun": "factory"
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
    "commandNoun": "firearm"
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
    "commandNoun": "hallway"
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
    "commandNoun": "headset"
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
    "commandNoun": "heating"
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
    "commandNoun": "jukebox"
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
    "commandNoun": "kitchen"
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
    "commandNoun": "library"
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
    "commandNoun": "mailbox"
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
    "commandNoun": "marquee"
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
    "commandNoun": "rectory"
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
    "commandNoun": "rockvil"
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
    "commandNoun": "shelves"
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
    "commandNoun": "skycars"
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
    "commandNoun": "stadium"
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
    "commandNoun": "sunroom"
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
    "commandNoun": "sweater"
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
    "commandNoun": "terrace"
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
    "commandNoun": "washers"
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
    "commandNoun": "animal"
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
    "commandNoun": "atrium"
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
    "commandNoun": "banner"
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
    "commandNoun": "bureau"
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
    "commandNoun": "buzzer"
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
    "commandNoun": "campus"
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
    "commandNoun": "church"
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
    "commandNoun": "dryers"
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
    "commandNoun": "floors"
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
    "commandNoun": "ground"
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
    "commandNoun": "liquor"
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
    "commandNoun": "champagne"
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
    "commandNoun": "lounge"
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
    "commandNoun": "mindex"
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
    "commandNoun": "museum"
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
    "commandNoun": "number intnum"
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
    "commandNoun": "office"
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
    "commandNoun": "office"
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
    "commandNoun": "people"
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
    "commandNoun": "plaque"
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
    "commandNoun": "prison"
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
    "commandNoun": "report"
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
    "commandNoun": "school"
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
    "commandNoun": "skybus"
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
    "commandNoun": "skycab"
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
    "commandNoun": "stairs"
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
    "commandNoun": "statue"
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
    "commandNoun": "statue"
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
    "commandNoun": "ticket"
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
    "commandNoun": "toilet"
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
    "commandNoun": "tunnel"
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
    "commandNoun": "turtle"
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
    "commandNoun": "wallet"
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
    "commandNoun": "window"
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
    "commandNoun": "window"
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
    "commandNoun": "alarm"
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
    "commandNoun": "alley"
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
    "commandNoun": "annex"
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
    "commandNoun": "apple"
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
    "commandNoun": "bench"
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
    "commandNoun": "books"
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
    "commandNoun": "cages"
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
    "commandNoun": "chair"
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
    "commandNoun": "clave"
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
    "commandNoun": "couch"
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
    "commandNoun": "crate"
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
    "commandNoun": "crime"
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
    "commandNoun": "drugs"
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
    "commandNoun": "easel"
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
    "commandNoun": "fence"
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
    "commandNoun": "field"
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
    "commandNoun": "glass"
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
    "commandNoun": "hotel"
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
    "commandNoun": "label"
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
    "commandNoun": "movie"
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
    "commandNoun": "music"
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
    "commandNoun": "night"
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
    "commandNoun": "river"
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
    "commandNoun": "scarf"
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
    "commandNoun": "sleep"
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
    "commandNoun": "smoke"
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
    "commandNoun": "snack"
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
    "commandNoun": "stone"
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
    "commandNoun": "stool"
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
    "commandNoun": "store"
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
    "commandNoun": "table"
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
    "commandNoun": "table"
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
    "commandNoun": "waste"
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
    "commandNoun": "water"
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
    "commandNoun": "woman"
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
    "commandNoun": "baby"
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
    "commandNoun": "bank"
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
    "commandNoun": "card"
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
    "commandNoun": "crib"
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
    "commandNoun": "dawn"
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
    "commandNoun": "desk"
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
    "commandNoun": "desk"
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
    "commandNoun": "door"
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
    "commandNoun": "door"
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
    "commandNoun": "door"
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
    "commandNoun": "door"
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
    "commandNoun": "dusk"
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
    "commandNoun": "fish"
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
    "commandNoun": "food"
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
    "commandNoun": "fyla"
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
    "commandNoun": "gate"
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
    "commandNoun": "jill"
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
    "commandNoun": "lawn"
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
    "commandNoun": "mall"
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
    "commandNoun": "menu"
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
    "commandNoun": "noon"
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
    "commandNoun": "note"
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
    "commandNoun": "park"
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
    "commandNoun": "pier"
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
    "commandNoun": "play"
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
    "commandNoun": "rack"
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
    "commandNoun": "ramp"
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
    "commandNoun": "road"
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
    "commandNoun": "roof"
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
    "commandNoun": "room"
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
    "commandNoun": "sack"
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
    "commandNoun": "seat"
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
    "commandNoun": "sign"
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
    "commandNoun": "sign"
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
    "commandNoun": "sink"
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
    "commandNoun": "slot"
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
    "commandNoun": "soup"
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
    "commandNoun": "tank"
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
    "commandNoun": "screwdriver"
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
    "commandNoun": "vent"
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
    "commandNoun": "vest"
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
    "commandNoun": "wall"
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
    "commandNoun": "bar"
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
    "commandNoun": "bed"
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
    "commandNoun": "day"
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
    "commandNoun": "den"
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
    "commandNoun": "key"
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
    "commandNoun": "map"
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
    "commandNoun": "pen"
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
    "commandNoun": "sky"
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
    "commandNoun": "tub"
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
    "commandNoun": "zoo"
  }
];
