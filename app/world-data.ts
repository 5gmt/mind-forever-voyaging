// Generated from the preserved ZIL source by scripts/extract-world.mjs.
// Do not edit by hand; the original game remains canonical.

export type WorldExit = { command: string; targetId: string; target: string };
export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit> };

export type WorldObject = { id: string; name: string; initialLocation: string | null; flags: string[] };

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
    ]
  },
  {
    "id": "OUTLETS",
    "name": "list of communication outlets",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "TRAFFIC-COMPUTER",
    "name": "Metropolitan Traffic Computer",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "RACKS",
    "name": "racks of fashionable clothes",
    "initialLocation": "DUNBARS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "CC-STAFFER",
    "name": "PRISM Project staff member",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "CULTURAL-CENTER",
    "name": "Riverside Cultural Center",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ]
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
    ]
  },
  {
    "id": "MORNING-START",
    "name": "morning rush hour start",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "FORMULA",
    "name": "bottle of baby formula",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ]
  },
  {
    "id": "SCOTCH",
    "name": "bottle of cheap scotch",
    "initialLocation": "LIQUOR-STORE",
    "flags": [
      "TAKEBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ]
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
    ]
  },
  {
    "id": "AIR-CONDITIONING-UNIT",
    "name": "air conditioning unit",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "LOGIC-GAME",
    "name": "electronic logic game",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "EVENING-END",
    "name": "evening rush hour end",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "JANITORIAL-CONTROLLER",
    "name": "Janitorial Controller",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "JANITORIAL-INSTRUCTIONS",
    "name": "JANITORIAL.CONTROLLER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "MORNING-END",
    "name": "morning rush hour end",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "RYDER",
    "name": "Senator Richard Ryder",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "ACTORBIT"
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
    ]
  },
  {
    "id": "SIMULATION-INSTRUCTIONS",
    "name": "SIMULATION.CONTROLLER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "REPORT-BUFFER",
    "name": "Special Report buffer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "BUFFERBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "ENTERTAINMENT-CENTER",
    "name": "entertainment center",
    "initialLocation": "DEN",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "PORT-LIST",
    "name": "List of Active Ports",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "READBIT",
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "AUDIT-PERCENT",
    "name": "auditing percentage",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "VOWELBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "BROWN-TUBECAR-DOOR",
    "name": "brown tubecar doors",
    "initialLocation": "BROWN-TUBECAR",
    "flags": [
      "DOORBIT",
      "NDESCBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "COMM-MODE",
    "name": "Communications Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "GOVERNMENT-OFFICIAL",
    "name": "government official",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT"
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
    ]
  },
  {
    "id": "SABOTEURS",
    "name": "maintenance workers",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "NEWSPAPER-DISPENSER",
    "name": "newspaper dispenser",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PARKVIEW-APARTMENTS-OBJECT",
    "name": "Parkview Apartments",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "COUNTRYSIDE",
    "name": "rolling countryside",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MEMORY-BANKS",
    "name": "row of memory banks",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "SPARE-PARTS",
    "name": "bin of spare parts",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CHURCH-STREET-CITY-OBJECT",
    "name": "Church Street City",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "HIGHWAY",
    "name": "interstate highway",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "NATIONAL-GUARDSMAN",
    "name": "National Guardsman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "RESIGNATION-LETTER",
    "name": "RESIGNATION.LETTER",
    "initialLocation": "PERELMAN-PERSONAL-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "ROTATING",
    "name": "rotating functions",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "UNIVERSITY-HEIGHTS-OBJECT",
    "name": "University Heights",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "TIMBERS",
    "name": "blackened timbers",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "BOARDING-PLATFORM",
    "name": "boarding platform",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "CONSTRUCTION-OBJECT",
    "name": "construction site",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "FOUNTAIN",
    "name": "dried-up fountain",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "INFOTECH-BUILDING",
    "name": "InfoTech Building",
    "initialLocation": "MAIN-AND-KENNEDY",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "PERELMAN-PERSONAL-DIRECTORY",
    "name": "PERELMAN.PERSONAL",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "RED-TUBECAR-DOOR",
    "name": "red tubecar doors",
    "initialLocation": "RED-TUBECAR",
    "flags": [
      "DOORBIT",
      "NDESCBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "SILICORP-BUILDING",
    "name": "Silicorp Building",
    "initialLocation": "MAIN-AND-KENNEDY",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "NEWS-BUFFER",
    "name": "World News buffer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "BUFFERBIT",
      "UNSEENBIT"
    ]
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
    ]
  },
  {
    "id": "GROCERIES",
    "name": "bag of groceries",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ]
  },
  {
    "id": "DRIVERS-LICENSE",
    "name": "driver's license",
    "initialLocation": "WALLET",
    "flags": [
      "READBIT",
      "TAKEBIT"
    ]
  },
  {
    "id": "FORTZMAN",
    "name": "Eleanor Fortzman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "VOWELBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "GARBAGE",
    "name": "garbage disposal",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "MAGAZINE-ARTICLE",
    "name": "magazine article",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "PICKFORD-THEATRE-OBJECT",
    "name": "Pickford Theatre",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BEAMS",
    "name": "plastalloy beams",
    "initialLocation": "CONSTRUCTION-SITE-1",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "PRISM-INTERFACES-DIRECTORY",
    "name": "PRISM.INTERFACES",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "RECEIVER-STATION",
    "name": "receiver station",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "TRAFFIC-INSTRUCTIONS",
    "name": "TRAFFIC.COMPUTER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "WEATHER-INSTRUCTIONS",
    "name": "WEATHER.COMPUTER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "AUDITING-INSTRUCTIONS",
    "name": "AUDITING.SYSTEM",
    "initialLocation": null,
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "ESTHER",
    "name": "Esther Perelman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "VOWELBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "PAMPHLET",
    "name": "glossy pamphlet",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "READBIT"
    ]
  },
  {
    "id": "GRANOLA-CLUSTER",
    "name": "granola cluster",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "EATBIT"
    ]
  },
  {
    "id": "HVAC-CONTROLLER",
    "name": "HVAC Controller",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "HVAC-INSTRUCTIONS",
    "name": "HVAC.CONTROLLER",
    "initialLocation": "PRISM-INTERFACES-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "INDUSTRIAL-PARK-OBJECT",
    "name": "industrial park",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "LIBRARY-ACCOUNT",
    "name": "library account",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "CHUN-BUILDING",
    "name": "office building",
    "initialLocation": "AQUARIUM-AND-KENNEDY",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "ROY",
    "name": "old Chinese man",
    "initialLocation": null,
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "PLAN-POPULARITY",
    "name": "PLAN.POPULARITY",
    "initialLocation": "PLAN-DATA-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "RAILROAD-BRIDGE",
    "name": "railroad bridge",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SERVICE-STATION-OBJECT",
    "name": "service station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SIMULATION-MODE",
    "name": "Simulation Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "STACKS-OF-PAPERS",
    "name": "stack of papers",
    "initialLocation": "OFFICE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "TURKEY-SANDWICH",
    "name": "turkey sandwich",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "EATBIT"
    ]
  },
  {
    "id": "SALAD",
    "name": "vegetable salad",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "CONTROL-CENTER-OBJECT",
    "name": "control center",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CURRENT-EVENTS-DIRECTORY",
    "name": "CURRENT.EVENTS",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "HALLEY-ESTATES-OBJECT",
    "name": "Halley Estates",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "HARDWARE-STORE-OBJECT",
    "name": "hardware store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "HEIMAN-VILLAGE-OBJECT",
    "name": "Heiman Village",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "INTERFACE-MODE",
    "name": "Interface Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "LIBYAN-ECONOMY",
    "name": "LIBYAN.ECONOMY",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "BANNED-TITLES-LIST",
    "name": "list of titles",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ]
  },
  {
    "id": "MOUNT-TAKEOVER",
    "name": "MOUNT.TAKEOVER",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "POLICEMAN",
    "name": "police officer",
    "initialLocation": "POLICE-STATION",
    "flags": [
      "ACTORBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "POLICE-STATION-OBJECT",
    "name": "police station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RYDER-SPEECHES",
    "name": "RYDER.SPEECHES",
    "initialLocation": "PLAN-DATA-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "SPACEPORT-GATE",
    "name": "spaceport gate",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "STOCK-EXCHANGE-OBJECT",
    "name": "Stock Exchange",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "WORD-PROCESSOR",
    "name": "word processor",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "LIGHTBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "BAMBOO-SCREEN",
    "name": "bamboo screen",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BROWN-TUBECAR-OBJECT",
    "name": "brown tubecar",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "VEHBIT"
    ]
  },
  {
    "id": "BSF-FORMATION",
    "name": "BSF.FORMATION",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "COFFEE",
    "name": "cup of coffee",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "HEALTH-CENTER-OBJECT",
    "name": "health center",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MOVIE-THEATRE-OBJECT",
    "name": "movie theatre",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PLAN-ELEMENTS",
    "name": "PLAN.ELEMENTS",
    "initialLocation": "PLAN-DATA-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "POWER-STATION-OBJECT",
    "name": "power station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RAILROAD-YARD",
    "name": "railroad yard",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RAV",
    "name": "Rav and Frita",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "RECORD-BUFFER",
    "name": "record buffer",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "BUFFERBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "JILL-BOOK",
    "name": "romance novel",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "STREET-BRIDGE",
    "name": "street bridge",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "STUDENT-UNION-OBJECT",
    "name": "student union",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SYMPHONY-HALL-OBJECT",
    "name": "Symphony Hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "TICKET-SELLER",
    "name": "ticket seller",
    "initialLocation": "CINEMA",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "TRAIN-STATION-OBJECT",
    "name": "train station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "WELLS-THEATRE-OBJECT",
    "name": "Wells Theatre",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "AIRPORT-GATE",
    "name": "airport gate",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "ALI-BUILDING",
    "name": "ALI Building",
    "initialLocation": "MIDLAND-AND-RIVER",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "ALPHA-SECTOR",
    "name": "alpha sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "PRICE",
    "name": "Alyson Price",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "RANDU",
    "name": "Aseejh Randu",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLE",
      "VOWELBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "CARD-CATALOG",
    "name": "card catalog",
    "initialLocation": "MAIN-LIBRARY",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CHURCH-OFFICIAL",
    "name": "church elder",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT"
    ]
  },
  {
    "id": "CONVERSATION",
    "name": "conversation",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CURRENT-FEED",
    "name": "current feed",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "DELTA-SECTOR",
    "name": "delta sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "DISHES",
    "name": "dirty dishes",
    "initialLocation": "KITCHEN",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "GRIMWOLD",
    "name": "Dr. Grimwold",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "PERELMAN",
    "name": "Dr. Perelman",
    "initialLocation": "OFFICE",
    "flags": [
      "NARTICLEBIT",
      "ACTORBIT"
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
    ]
  },
  {
    "id": "FIREHOUSE-OBJECT",
    "name": "fire station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "GAMMA-SECTOR",
    "name": "gamma sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "DUMP-OBJECT",
    "name": "garbage dump",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "HAM-SANDWICH",
    "name": "ham sandwich",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "EATBIT"
    ]
  },
  {
    "id": "HEIMAN-WORLD-OBJECT",
    "name": "Heiman World",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "LECTURE-HALL-OBJECT",
    "name": "lecture hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "LIBRARY-MODE",
    "name": "Library Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "LIBRARY-UNIT",
    "name": "library unit",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "LIQUOR-STORE-OBJECT",
    "name": "liquor store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "ROOF-SHADOWS",
    "name": "long shadows",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "DUCKS",
    "name": "mallard duck",
    "initialLocation": "HALLEY-PARK-WEST",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "PEREZ-TOWERS",
    "name": "Perez Towers",
    "initialLocation": "MAIN-AND-RIVER",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "PICTUREPHONE",
    "name": "picturephone",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MOLD",
    "name": "pile of mold",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRYTAKEBIT",
      "TAKEBIT"
    ]
  },
  {
    "id": "REFRIGERATOR",
    "name": "refrigerator",
    "initialLocation": "KITCHEN",
    "flags": [
      "NDESCBIT",
      "CONTBIT",
      "SEARCHBIT"
    ]
  },
  {
    "id": "SHOWER",
    "name": "shower stall",
    "initialLocation": "BATHROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "OPENBIT"
    ]
  },
  {
    "id": "SOUP-KITCHEN",
    "name": "soup kitchen",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RAILROAD-TRACKS",
    "name": "train tracks",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "TUBE-STATION",
    "name": "Tube station",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
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
    ]
  },
  {
    "id": "MY-MAILBOX",
    "name": "your mailbox",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "MYBIT"
    ]
  },
  {
    "id": "PARENTS",
    "name": "your parents",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "MYBIT"
    ]
  },
  {
    "id": "BETA-SECTOR",
    "name": "beta sector",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "SODA",
    "name": "can of soda",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "DRINKBIT"
    ]
  },
  {
    "id": "CREDIT-CARD",
    "name": "credit card",
    "initialLocation": "WALLET",
    "flags": [
      "READBIT",
      "TAKEBIT"
    ]
  },
  {
    "id": "DERRICOPTERS",
    "name": "derricopter",
    "initialLocation": "CONSTRUCTION-SITE-1",
    "flags": [
      "NDESCBIT"
    ]
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
    ]
  },
  {
    "id": "DINING-ROOM-OBJECT",
    "name": "dining room",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "INTERCHANGE-OBJECT",
    "name": "interchange",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "LIVING-ROOM-OBJECT",
    "name": "living room",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BEER",
    "name": "mug of beer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ]
  },
  {
    "id": "CARLOT",
    "name": "parking lot",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "POST-OFFICE-OBJECT",
    "name": "post office",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PROTRUSIONS",
    "name": "protrusions",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "RATION-CARD",
    "name": "ration card",
    "initialLocation": null,
    "flags": [
      "READBIT",
      "TAKEBIT"
    ]
  },
  {
    "id": "RED-TUBECAR-OBJECT",
    "name": "red tubecar",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "VEHBIT"
    ]
  },
  {
    "id": "RESIGNATION",
    "name": "resignation",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RUSTY-CROSS",
    "name": "rusty cross",
    "initialLocation": null,
    "flags": [
      "TRYTAKEBIT",
      "TAKEBIT"
    ]
  },
  {
    "id": "SILVER-DOVE",
    "name": "Silver Dove",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SUPERMARKET",
    "name": "supermarket",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "VENTILATION",
    "name": "ventilation",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "WATER-TOWER-OBJECT",
    "name": "water tower",
    "initialLocation": "WATER-TOWER",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MY-BUZZER",
    "name": "your buzzer",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "MYBIT"
    ]
  },
  {
    "id": "AUDITORIUM",
    "name": "auditorium",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CLERKMATON",
    "name": "clerkmaton",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "COURTHOUSE-OBJECT",
    "name": "courthouse",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "DRUG-STORE-OBJECT",
    "name": "drug store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "FIRECOPTER",
    "name": "firecopter",
    "initialLocation": "FIREHOUSE",
    "flags": [
      "VEHBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "FLOODLIGHT",
    "name": "floodlight",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "HEADSTONES",
    "name": "headstones",
    "initialLocation": "CEMETERY",
    "flags": [
      "READBIT",
      "NDESCBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "HUANG-HALL-OBJECT",
    "name": "Huang Hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "POOL-TABLE",
    "name": "pool table",
    "initialLocation": "POOL-HALL",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "PRISM-NAME",
    "name": "PRISM.NAME",
    "initialLocation": "PERELMAN-PERSONAL-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "PROSTITUTE",
    "name": "prostitute",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT"
    ]
  },
  {
    "id": "JOYBOOTH-BUTTON",
    "name": "red button",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "RESTAURANT-OBJECT",
    "name": "restaurant",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RIVER-BANK",
    "name": "river bank",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SLEEP-MODE",
    "name": "Sleep Mode",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
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
    ]
  },
  {
    "id": "VACANT-LOT",
    "name": "vacant lot",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "VIEWSCREEN",
    "name": "viewscreen",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "WNN-FEEDER",
    "name": "WNN Feeder",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "WNN-INSTRUCTIONS",
    "name": "WNN.FEEDER",
    "initialLocation": null,
    "flags": [
      "READBIT"
    ]
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
    ]
  },
  {
    "id": "TEETH",
    "name": "your teeth",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "MYBIT"
    ]
  },
  {
    "id": "APARTMENT-OBJECT",
    "name": "apartment",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "BATHROOMS",
    "name": "bathrooms",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "POOL",
    "name": "billiards",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "BLEACHERS",
    "name": "bleachers",
    "initialLocation": "ATHLETIC-FIELD",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT"
    ]
  },
  {
    "id": "SCHOOL-BOOKSTORE",
    "name": "bookstore",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "BOOKSTORE-OBJECT",
    "name": "bookstore",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BSF-GUARDS",
    "name": "BSF guard",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "CAFETERIA-OBJECT",
    "name": "cafeteria",
    "initialLocation": "CAFETERIA",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "UNIVERSITY-CAFETERIA",
    "name": "cafeteria",
    "initialLocation": "STUDENT-UNION",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CITY-HALL-OBJECT",
    "name": "City Hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "CLASSROOMS",
    "name": "classroom",
    "initialLocation": "LECTURE-HALL",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "ANDERSON-DIRECTORY",
    "name": "directory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "DORM-OBJECT",
    "name": "dormitory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "DUCK-POND",
    "name": "duck pond",
    "initialLocation": "HALLEY-PARK-WEST",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "FIREPLACE",
    "name": "fireplace",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "FIRETRUCK",
    "name": "firetruck",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VEHBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "HAZE",
    "name": "gray haze",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "LAMP-POST",
    "name": "lamp post",
    "initialLocation": "BODANSKI-SQUARE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MACHINERY",
    "name": "machinery",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MANTA-RAY",
    "name": "manta ray",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MILKSHAKE",
    "name": "milkshake",
    "initialLocation": "DRUG-STORE",
    "flags": [
      "NDESCBIT"
    ]
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
    ]
  },
  {
    "id": "PARTITION",
    "name": "partition",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PLAN-DATA-DIRECTORY",
    "name": "PLAN.DATA",
    "initialLocation": "LIBRARY",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "POOL-HALL-OBJECT",
    "name": "pool hall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "RESERVOIR",
    "name": "reservoir",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "CHURCH-SKYCOPTER",
    "name": "skycopter",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SOY-PATTY",
    "name": "soy patty",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT"
    ]
  },
  {
    "id": "SPACEPORT",
    "name": "spaceport",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "TAX-STUDY",
    "name": "TAX.STUDY",
    "initialLocation": "CURRENT-EVENTS-DIRECTORY",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "TERMINAL-BANKS",
    "name": "terminals",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "TOWNHOUSE",
    "name": "townhouse",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "GOLD",
    "name": "Vera Gold",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "WAREHOUSE-OBJECT",
    "name": "warehouse",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "WATERPOOL",
    "name": "waterpool",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "EARS",
    "name": "your ears",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "MYBIT"
    ]
  },
  {
    "id": "EYES",
    "name": "your eyes",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT",
      "MYBIT"
    ]
  },
  {
    "id": "HEAD",
    "name": "your head",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "MYBIT"
    ]
  },
  {
    "id": "MY-NAME",
    "name": "your name",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "MYBIT"
    ]
  },
  {
    "id": "AQUARIUM-OBJECT",
    "name": "Aquarium",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BATHROOM-OBJECT",
    "name": "bathroom",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BSF-BASE",
    "name": "BSF base",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BUILDING",
    "name": "building",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "CEMETERY-OBJECT",
    "name": "cemetery",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "CHILDREN",
    "name": "children",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "CRIMINAL",
    "name": "criminal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "DUNBARS-OBJECT",
    "name": "Dunbar's",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "DOORWAY",
    "name": "entrance",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "EXHIBITS",
    "name": "exhibits",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "VOWELBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "GRAFFITI",
    "name": "graffiti",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "READBIT"
    ]
  },
  {
    "id": "GUN-SHOP-OBJECT",
    "name": "gun shop",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "HARDWARE",
    "name": "hardware",
    "initialLocation": "HARDWARE-STORE",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "HOMEWORK",
    "name": "homework",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "HOSPITAL-OBJECT",
    "name": "hospital",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "JOYBOOTH-OBJECT",
    "name": "joybooth",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MAGAZINE",
    "name": "magazine",
    "initialLocation": "DRUG-STORE",
    "flags": [
      "NDESCBIT",
      "READBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "MIDNIGHT",
    "name": "midnight",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
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
    ]
  },
  {
    "id": "OVERCOAT",
    "name": "overcoat",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "PAINTING",
    "name": "painting",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "PEDESTAL",
    "name": "pedestal",
    "initialLocation": "HALLEY-PARK-EAST",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ]
  },
  {
    "id": "AIRPORT-SIGN",
    "name": "red sign",
    "initialLocation": "TERMINAL",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ]
  },
  {
    "id": "SKYLIGHT",
    "name": "skylight",
    "initialLocation": "COLONIAL-HOTEL",
    "flags": [
      "NDESCBIT",
      "TRANSBIT"
    ]
  },
  {
    "id": "SOUVENIR",
    "name": "souvenir",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "TENEMENT-OBJECT",
    "name": "tenement",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PERELMAN-TERMINAL",
    "name": "terminal",
    "initialLocation": "OFFICE",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "SKYBUS-TERMINAL-OBJECT",
    "name": "terminal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "AIRPORT-TERMINAL-OBJECT",
    "name": "terminal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PLAN",
    "name": "the Plan",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "TOTE-BAGS",
    "name": "tote bag",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "TOY",
    "name": "toy duck",
    "initialLocation": "CRIB",
    "flags": [
      "TAKEBIT"
    ]
  },
  {
    "id": "VIBRAMAT",
    "name": "vibramat",
    "initialLocation": "LAUNDROMAT",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "ME",
    "name": "yourself",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "ACTORBIT",
      "TOUCHBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "BARKING",
    "name": "barking",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "BEDROOM-OBJECT",
    "name": "bedroom",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "BLANKET",
    "name": "blanket",
    "initialLocation": "JAIL-CELL",
    "flags": [
      "TAKEBIT"
    ]
  },
  {
    "id": "CEILING",
    "name": "ceiling",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "TOUCHBIT"
    ]
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
    ]
  },
  {
    "id": "COOLING",
    "name": "cooling",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
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
    ]
  },
  {
    "id": "DECODER",
    "name": "decoder",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "FACTORY-OBJECT",
    "name": "factory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "GUN",
    "name": "firearm",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "HALLWAY",
    "name": "hallway",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "HEADSET",
    "name": "headset",
    "initialLocation": "JOYBOOTH",
    "flags": [
      "NDESCBIT",
      "WEARBIT"
    ]
  },
  {
    "id": "HEATING",
    "name": "heating",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "HORIZON",
    "name": "horizon",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "JUKEBOX",
    "name": "jukebox",
    "initialLocation": "BAR",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "KITCHEN-OBJECT",
    "name": "kitchen",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MAIN-LIBRARY-OBJECT",
    "name": "library",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MAILBOXES",
    "name": "mailbox",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MARQUEE",
    "name": "marquee",
    "initialLocation": "CINEMA",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ]
  },
  {
    "id": "RECTORY-OBJECT",
    "name": "rectory",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "ROCKVIL-OBJECT",
    "name": "Rockvil",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "SHELVES",
    "name": "shelves",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "SKYCAR",
    "name": "skycars",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "STADIUM-OBJECT",
    "name": "stadium",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SOLARIUM-OBJECT",
    "name": "sunroom",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
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
    ]
  },
  {
    "id": "PATIO-OBJECT",
    "name": "terrace",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "WASHERS",
    "name": "washers",
    "initialLocation": "LAUNDROMAT",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "ANIMAL",
    "name": "animal",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "ATRIUM",
    "name": "atrium",
    "initialLocation": "COLONIAL-HOTEL",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "BANNER",
    "name": "banner",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ]
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
    ]
  },
  {
    "id": "BUZZERS",
    "name": "buzzer",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "CAMPUS",
    "name": "campus",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "CHURCH-OBJECT",
    "name": "church",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "DRYERS",
    "name": "dryers",
    "initialLocation": "LAUNDROMAT",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "FLOORS",
    "name": "floors",
    "initialLocation": "INTERFACE-ROOM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "UNSEENBIT"
    ]
  },
  {
    "id": "GROUND",
    "name": "ground",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "LIQUOR",
    "name": "liquor",
    "initialLocation": "LIQUOR-STORE",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "OTHER-LIQUOR",
    "name": "liquor",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "LOUNGE",
    "name": "lounge",
    "initialLocation": "DORM",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MINDEX",
    "name": "mindex",
    "initialLocation": "DORM",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "MUSEUM-OBJECT",
    "name": "museum",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "INTNUM",
    "name": "number",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "OFFICE-OBJECT",
    "name": "office",
    "initialLocation": "OFFICE",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "PROFESSOR-OFFICES",
    "name": "office",
    "initialLocation": "LECTURE-HALL",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "PEOPLE",
    "name": "people",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "PLURALBIT"
    ]
  },
  {
    "id": "PLAQUE",
    "name": "plaque",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ]
  },
  {
    "id": "JAIL-OBJECT",
    "name": "prison",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PSEUDO-OBJECT",
    "name": "pseudo",
    "initialLocation": null,
    "flags": []
  },
  {
    "id": "CC-PRINTOUT",
    "name": "report",
    "initialLocation": "CONTROL-CENTER",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "SCHOOL-OBJECT",
    "name": "school",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SKYBUS",
    "name": "skybus",
    "initialLocation": "SKYBUS-TERMINAL",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "SKYCAB-OBJECT",
    "name": "skycab",
    "initialLocation": "SKYCAB",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "STAIRS",
    "name": "stairs",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "STATUE",
    "name": "statue",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "HALLEY-STATUE",
    "name": "statue",
    "initialLocation": "HALLEY-PARK-EAST",
    "flags": [
      "NDESCBIT",
      "READBIT"
    ]
  },
  {
    "id": "TICKET",
    "name": "ticket",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "TRYTAKEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "TOILET",
    "name": "toilet",
    "initialLocation": "BATHROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "FURNITUREBIT"
    ]
  },
  {
    "id": "TUNNEL",
    "name": "tunnel",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "TURTLE",
    "name": "turtle",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "WALLET",
    "name": "wallet",
    "initialLocation": null,
    "flags": [
      "CONTBIT",
      "TAKEBIT",
      "SEARCHBIT"
    ]
  },
  {
    "id": "APARTMENT-WINDOW",
    "name": "window",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRANSBIT"
    ]
  },
  {
    "id": "GLOBAL-WINDOW",
    "name": "window",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TRANSBIT"
    ]
  },
  {
    "id": "ALARM",
    "name": "alarm",
    "initialLocation": "WAREHOUSE-2",
    "flags": [
      "NDESCBIT",
      "VOWELBIT"
    ]
  },
  {
    "id": "ALLEY-OBJECT",
    "name": "alley",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "VOWELBIT"
    ]
  },
  {
    "id": "ANNEX-OBJECT",
    "name": "annex",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "APPLE",
    "name": "apple",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VOWELBIT",
      "TAKEBIT",
      "EATBIT"
    ]
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
    ]
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
    ]
  },
  {
    "id": "CAGES",
    "name": "cages",
    "initialLocation": "ZOO",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT",
      "PLURALBIT"
    ]
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
    ]
  },
  {
    "id": "CLAVE",
    "name": "Clave",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "ACTORBIT"
    ]
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
    ]
  },
  {
    "id": "CRATE",
    "name": "crate",
    "initialLocation": "WAREHOUSE-2",
    "flags": [
      "NDESCBIT",
      "CONTBIT",
      "SEARCHBIT"
    ]
  },
  {
    "id": "CRIME",
    "name": "crime",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "DRUGS",
    "name": "drugs",
    "initialLocation": "DRUG-STORE",
    "flags": [
      "NDESCBIT",
      "PLURALBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "EASEL",
    "name": "easel",
    "initialLocation": "LIVING-ROOM",
    "flags": [
      "VOWELBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "FENCE",
    "name": "fence",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "FIELD",
    "name": "field",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "GLASS",
    "name": "glass",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "HOTEL-OBJECT",
    "name": "hotel",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "LABEL",
    "name": "label",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "MOVIE",
    "name": "movie",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "MUSIC",
    "name": "music",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "NIGHT",
    "name": "night",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "RIVER",
    "name": "river",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "SCARF",
    "name": "scarf",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "WEARBIT"
    ]
  },
  {
    "id": "SLEEP",
    "name": "sleep",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "SMOKE",
    "name": "smoke",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "OFFICIAL-SNACK",
    "name": "snack",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "STONES",
    "name": "stone",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "TAKEBIT"
    ]
  },
  {
    "id": "BAR-STOOL",
    "name": "stool",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "VEHBIT",
      "FURNITUREBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "STORE-OBJECT",
    "name": "store",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "GLOBAL-TABLE",
    "name": "table",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "SURFACEBIT",
      "VEHBIT"
    ]
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
    ]
  },
  {
    "id": "WASTE",
    "name": "waste",
    "initialLocation": "CITY-DUMP",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "WATER",
    "name": "water",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "WOMAN",
    "name": "woman",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "BABY",
    "name": "baby",
    "initialLocation": "CRIB",
    "flags": [
      "TAKEBIT",
      "ACTORBIT"
    ]
  },
  {
    "id": "BANK-OBJECT",
    "name": "bank",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "CARD-CATALOG-CARD",
    "name": "card",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
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
    ]
  },
  {
    "id": "DAWN",
    "name": "dawn",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "DESK",
    "name": "desk",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
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
    ]
  },
  {
    "id": "PARKVIEW-DOOR",
    "name": "door",
    "initialLocation": "PARKVIEW-APARTMENTS",
    "flags": [
      "DOORBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "APARTMENT-DOOR",
    "name": "door",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "DOORBIT"
    ]
  },
  {
    "id": "UNOPENABLE-DOOR",
    "name": "door",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "DOORBIT"
    ]
  },
  {
    "id": "WAREHOUSE-DOOR",
    "name": "door",
    "initialLocation": "WAREHOUSE-1",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "DUSK",
    "name": "dusk",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "FISH",
    "name": "fish",
    "initialLocation": "AQUARIUM",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MEAL",
    "name": "food",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "FYLA",
    "name": "Fyla",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "ACTORBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "GATE",
    "name": "gate",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
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
    ]
  },
  {
    "id": "LAWN",
    "name": "lawn",
    "initialLocation": "CAFETERIA",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "MALL-OBJECT",
    "name": "mall",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "MENU",
    "name": "menu",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "NOON",
    "name": "noon",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NARTICLEBIT"
    ]
  },
  {
    "id": "NOTE",
    "name": "note",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "PARK-OBJECT",
    "name": "park",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PIER-OBJECT",
    "name": "pier",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PLAY",
    "name": "play",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "PAMPHLET-RACK",
    "name": "rack",
    "initialLocation": "TRAIN-STATION",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "RAMP",
    "name": "ramp",
    "initialLocation": "AQUARIUM",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "STREET",
    "name": "road",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "ROOF",
    "name": "roof",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "GLOBAL-ROOM",
    "name": "room",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "SACK",
    "name": "sack",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "TAKEBIT",
      "CONTBIT",
      "SEARCHBIT"
    ]
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
    ]
  },
  {
    "id": "GLOBAL-SIGN",
    "name": "sign",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "TUBE-SIGN",
    "name": "sign",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "READBIT"
    ]
  },
  {
    "id": "SINK",
    "name": "sink",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NDESCBIT"
    ]
  },
  {
    "id": "SLOT",
    "name": "slot",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "STEW",
    "name": "soup",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": [
      "NARTICLEBIT",
      "NDESCBIT"
    ]
  },
  {
    "id": "TANK",
    "name": "tank",
    "initialLocation": "AQUARIUM",
    "flags": [
      "NDESCBIT",
      "TRANSBIT"
    ]
  },
  {
    "id": "TOOL",
    "name": "tool",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "VENT",
    "name": "vent",
    "initialLocation": "CORE",
    "flags": [
      "NDESCBIT"
    ]
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
    ]
  },
  {
    "id": "WALLS",
    "name": "wall",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "NDESCBIT",
      "TOUCHBIT"
    ]
  },
  {
    "id": "AIR",
    "name": "air",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": [
      "VOWELBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "BAR-OBJECT",
    "name": "bar",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
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
    ]
  },
  {
    "id": "DAY",
    "name": "day",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "DEN-OBJECT",
    "name": "den",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  },
  {
    "id": "DEW",
    "name": "dew",
    "initialLocation": "ROOFTOP",
    "flags": [
      "NDESCBIT",
      "NARTICLEBIT"
    ]
  },
  {
    "id": "KEY",
    "name": "key",
    "initialLocation": null,
    "flags": [
      "TAKEBIT",
      "KEYBIT"
    ]
  },
  {
    "id": "MAP",
    "name": "map",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "PEN",
    "name": "pen",
    "initialLocation": "PERELMAN-DESK",
    "flags": [
      "NDESCBIT",
      "TRYTAKEBIT"
    ]
  },
  {
    "id": "SKY",
    "name": "sky",
    "initialLocation": "GLOBAL-OBJECTS",
    "flags": []
  },
  {
    "id": "TUB",
    "name": "tub",
    "initialLocation": "EPILOGUE-BATHROOM",
    "flags": [
      "NDESCBIT",
      "VEHBIT",
      "OPENBIT"
    ]
  },
  {
    "id": "ZOO-OBJECT",
    "name": "zoo",
    "initialLocation": "LOCAL-GLOBALS",
    "flags": []
  }
];
