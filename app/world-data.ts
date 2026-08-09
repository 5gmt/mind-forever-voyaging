// Generated from the preserved ZIL source by scripts/extract-world.mjs.
// Do not edit by hand; the original game remains canonical.

export type WorldExit = { command: string; target: string };
export type WorldRoom = { id: string; name: string; exits: Record<string, WorldExit> };

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
        "target": "Main & Church"
      },
      "NW": {
        "command": "nw",
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
        "target": "Living Room"
      },
      "NORTH": {
        "command": "north",
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
        "target": "Warehouse"
      },
      "NE": {
        "command": "ne",
        "target": "Wicker & River"
      },
      "EAST": {
        "command": "east",
        "target": "Tenement"
      },
      "SW": {
        "command": "sw",
        "target": "Dump Entrance"
      },
      "NW": {
        "command": "nw",
        "target": "Industrial Park Drive"
      },
      "IN": {
        "command": "in",
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
        "target": "Skycar Factory"
      },
      "SE": {
        "command": "se",
        "target": "River Street Bridge"
      },
      "SOUTH": {
        "command": "south",
        "target": "Power Station"
      },
      "SW": {
        "command": "sw",
        "target": "Tenement"
      },
      "WEST": {
        "command": "west",
        "target": "Tenement"
      },
      "NW": {
        "command": "nw",
        "target": "Wicker & River"
      },
      "IN": {
        "command": "in",
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
        "target": "Halley & Park"
      },
      "SOUTH": {
        "command": "south",
        "target": "Rockvil University"
      },
      "WEST": {
        "command": "west",
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
        "target": "Southway & Park"
      },
      "EAST": {
        "command": "east",
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
        "target": "Water Tower"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "River & Kennedy"
      },
      "EAST": {
        "command": "east",
        "target": "Symphony Entrance"
      },
      "SE": {
        "command": "se",
        "target": "Colonial Hotel"
      },
      "SOUTH": {
        "command": "south",
        "target": "Aquarium & River"
      },
      "SW": {
        "command": "sw",
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
        "target": "River & Kennedy"
      },
      "EAST": {
        "command": "east",
        "target": "Aquarium & River"
      },
      "SE": {
        "command": "se",
        "target": "Dental School"
      },
      "SOUTH": {
        "command": "south",
        "target": "park entrance"
      },
      "WEST": {
        "command": "west",
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
        "target": "Halley & University"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "Elm & Kennedy"
      },
      "NE": {
        "command": "ne",
        "target": "Skycar Lot"
      },
      "EAST": {
        "command": "east",
        "target": "Southway & River"
      },
      "SE": {
        "command": "se",
        "target": "Row Houses"
      },
      "SOUTH": {
        "command": "south",
        "target": "Row Houses"
      },
      "SW": {
        "command": "sw",
        "target": "Row Houses"
      },
      "WEST": {
        "command": "west",
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
        "target": "Southway & Park"
      },
      "EAST": {
        "command": "east",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "target": "Skycar Lot"
      },
      "SOUTH": {
        "command": "south",
        "target": "Skycar Lot"
      },
      "NW": {
        "command": "nw",
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
        "target": "Elm & University"
      },
      "NORTH": {
        "command": "north",
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
        "target": "Southway & Kennedy"
      },
      "OUT": {
        "command": "out",
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
        "target": "Base Gate"
      },
      "NE": {
        "command": "ne",
        "target": "Airport Entrance"
      },
      "SW": {
        "command": "sw",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
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
        "target": "Terminal"
      },
      "SW": {
        "command": "sw",
        "target": "Symphony Entrance"
      },
      "IN": {
        "command": "in",
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
        "target": "Airportway & River"
      },
      "EAST": {
        "command": "east",
        "target": "Pickford Theatre"
      },
      "SOUTH": {
        "command": "south",
        "target": "Bodanski Square"
      },
      "SW": {
        "command": "sw",
        "target": "first methodist church"
      },
      "WEST": {
        "command": "west",
        "target": "Aquarium & Kennedy"
      },
      "NW": {
        "command": "nw",
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
        "target": "park entrance"
      },
      "NE": {
        "command": "ne",
        "target": "Bodanski Square"
      },
      "EAST": {
        "command": "east",
        "target": "Veldran Hotel"
      },
      "SE": {
        "command": "se",
        "target": "Veldran Hotel"
      },
      "SOUTH": {
        "command": "south",
        "target": "Main & Kennedy"
      },
      "SW": {
        "command": "sw",
        "target": "Rockvil Centre"
      },
      "WEST": {
        "command": "west",
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
        "target": "Elm & Park"
      },
      "SOUTH": {
        "command": "south",
        "target": "University Heights"
      },
      "WEST": {
        "command": "west",
        "target": "Elm Underpass"
      },
      "NW": {
        "command": "nw",
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
        "target": "Wicker & Pier"
      },
      "EAST": {
        "command": "east",
        "target": "Alley"
      },
      "SE": {
        "command": "se",
        "target": "Skycar Factory"
      },
      "SW": {
        "command": "sw",
        "target": "Wicker & River"
      },
      "WEST": {
        "command": "west",
        "target": "Tenement"
      },
      "NW": {
        "command": "nw",
        "target": "Tenement"
      },
      "IN": {
        "command": "in",
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
        "target": "park entrance"
      },
      "SOUTH": {
        "command": "south",
        "target": "Huang Hall"
      },
      "SW": {
        "command": "sw",
        "target": "Halley & Park"
      },
      "NW": {
        "command": "nw",
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
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
        "target": "Halley & Park"
      },
      "SOUTH": {
        "command": "south",
        "target": "Halley & University"
      },
      "WEST": {
        "command": "west",
        "target": "Zoo"
      },
      "NW": {
        "command": "nw",
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
        "target": "Cemetery"
      },
      "SE": {
        "command": "se",
        "target": "Cemetery"
      },
      "SOUTH": {
        "command": "south",
        "target": "church entrance"
      },
      "WEST": {
        "command": "west",
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
        "target": "Aquarium & River"
      },
      "OUT": {
        "command": "out",
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
        "target": "Elm & River"
      },
      "EAST": {
        "command": "east",
        "target": "construction site 2"
      },
      "SOUTH": {
        "command": "south",
        "target": "Bend"
      },
      "SW": {
        "command": "sw",
        "target": "Row Houses"
      },
      "WEST": {
        "command": "west",
        "target": "Southway & Kennedy"
      },
      "NW": {
        "command": "nw",
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
        "target": "River & Park"
      },
      "EAST": {
        "command": "east",
        "target": "Aquarium & Kennedy"
      },
      "SW": {
        "command": "sw",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
        "target": "Zoo Entrance"
      },
      "NW": {
        "command": "nw",
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
        "target": "Aquarium & River"
      },
      "EAST": {
        "command": "east",
        "target": "Museum Entrance"
      },
      "SOUTH": {
        "command": "south",
        "target": "Midland & River"
      },
      "SW": {
        "command": "sw",
        "target": "Centre & Kennedy"
      },
      "WEST": {
        "command": "west",
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
        "target": "Burned-out Area"
      },
      "NE": {
        "command": "ne",
        "target": "Burned-out Area"
      },
      "EAST": {
        "command": "east",
        "target": "Burned-out Area"
      },
      "SE": {
        "command": "se",
        "target": "Dump Entrance"
      },
      "SOUTH": {
        "command": "south",
        "target": "Burned-out Area"
      },
      "SW": {
        "command": "sw",
        "target": "Burned-out Area"
      },
      "WEST": {
        "command": "west",
        "target": "Burned-out Area"
      },
      "NW": {
        "command": "nw",
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
        "target": "Bodanski Square"
      },
      "EAST": {
        "command": "east",
        "target": "Midland & Church"
      },
      "SE": {
        "command": "se",
        "target": "Skycar Lot"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
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
        "target": "Museum Entrance"
      },
      "OUT": {
        "command": "out",
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
        "target": "Airportway & River"
      },
      "SOUTH": {
        "command": "south",
        "target": "Aquarium & Kennedy"
      },
      "SW": {
        "command": "sw",
        "target": "Athletic Field"
      },
      "WEST": {
        "command": "west",
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
        "target": "Stadium Lot C"
      },
      "EAST": {
        "command": "east",
        "target": "Stadium Lot B"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "Aquarium & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "Main & Kennedy"
      },
      "OUT": {
        "command": "out",
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
        "target": "Elm & Park"
      },
      "NE": {
        "command": "ne",
        "target": "Hospital Annex"
      },
      "EAST": {
        "command": "east",
        "target": "Southway & Kennedy"
      },
      "SE": {
        "command": "se",
        "target": "Row Houses"
      },
      "SW": {
        "command": "sw",
        "target": "Southway Underpass"
      },
      "WEST": {
        "command": "west",
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
        "target": "River & Kennedy"
      },
      "NW": {
        "command": "nw",
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
        "target": "Airportway & River"
      },
      "EAST": {
        "command": "east",
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
        "target": "Bend"
      },
      "OUT": {
        "command": "out",
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
        "target": "church street park"
      },
      "WEST": {
        "command": "west",
        "target": "Elm & River"
      },
      "NW": {
        "command": "nw",
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
        "target": "Hospital"
      },
      "SW": {
        "command": "sw",
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
        "target": "Centre & Kennedy"
      },
      "EAST": {
        "command": "east",
        "target": "Main & River"
      },
      "SOUTH": {
        "command": "south",
        "target": "Elm & Kennedy"
      },
      "WEST": {
        "command": "west",
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
        "target": "Elm & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "Museum Entrance"
      },
      "NW": {
        "command": "nw",
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
        "target": "Halley & Park"
      },
      "NE": {
        "command": "ne",
        "target": "Centre & Kennedy"
      },
      "EAST": {
        "command": "east",
        "target": "Main & Kennedy"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "Power Station Entrance"
      },
      "NW": {
        "command": "nw",
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
        "target": "Elm & River"
      },
      "SW": {
        "command": "sw",
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
        "target": "Factory Entrance"
      },
      "SE": {
        "command": "se",
        "target": "Power Station Entrance"
      },
      "SOUTH": {
        "command": "south",
        "target": "Tenement"
      },
      "SW": {
        "command": "sw",
        "target": "Industrial Park Entrance"
      },
      "WEST": {
        "command": "west",
        "target": "warehouse 1"
      },
      "NW": {
        "command": "nw",
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
        "target": "Aquarium & Kennedy"
      },
      "OUT": {
        "command": "out",
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
        "target": "Industrial Park Entrance"
      },
      "SW": {
        "command": "sw",
        "target": "City Dump"
      },
      "NW": {
        "command": "nw",
        "target": "Burned-out Area"
      },
      "IN": {
        "command": "in",
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
        "target": "Main & Kennedy"
      },
      "EAST": {
        "command": "east",
        "target": "Elm & River"
      },
      "SOUTH": {
        "command": "south",
        "target": "Southway & Kennedy"
      },
      "SW": {
        "command": "sw",
        "target": "Hospital"
      },
      "WEST": {
        "command": "west",
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
        "target": "Huang Hall"
      },
      "SOUTH": {
        "command": "south",
        "target": "Rockvil Centre"
      },
      "WEST": {
        "command": "west",
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
        "target": "Halley & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "church entrance"
      },
      "NE": {
        "command": "ne",
        "target": "Cemetery"
      },
      "EAST": {
        "command": "east",
        "target": "Main & Wicker"
      },
      "SE": {
        "command": "se",
        "target": "Church Street Apartments"
      },
      "SOUTH": {
        "command": "south",
        "target": "church street park"
      },
      "WEST": {
        "command": "west",
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
        "target": "Cemetery"
      },
      "EAST": {
        "command": "east",
        "target": "Main Street Bridge"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "Power Station Entrance"
      },
      "OUT": {
        "command": "out",
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
        "target": "Rockvil Stadium"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "River & Park"
      },
      "WEST": {
        "command": "west",
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
        "target": "Water Tower"
      },
      "SW": {
        "command": "sw",
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
        "target": "Rockvil University"
      },
      "OUT": {
        "command": "out",
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
        "target": "Symphony Entrance"
      },
      "SOUTH": {
        "command": "south",
        "target": "Skycar Lot"
      },
      "WEST": {
        "command": "west",
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
        "target": "Centre & Kennedy"
      },
      "NW": {
        "command": "nw",
        "target": "Centre & Kennedy"
      },
      "OUT": {
        "command": "out",
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
        "target": "Airportway & River"
      },
      "SE": {
        "command": "se",
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
        "target": "Main & Wicker"
      },
      "SE": {
        "command": "se",
        "target": "Pier"
      },
      "SW": {
        "command": "sw",
        "target": "Factory Entrance"
      },
      "NW": {
        "command": "nw",
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
        "target": "Rockvil University"
      },
      "OUT": {
        "command": "out",
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
        "target": "Wicker & Pier"
      },
      "OUT": {
        "command": "out",
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
        "target": "Midland & River"
      },
      "NE": {
        "command": "ne",
        "target": "health center"
      },
      "EAST": {
        "command": "east",
        "target": "Main & Church"
      },
      "SE": {
        "command": "se",
        "target": "Heiman Village"
      },
      "SOUTH": {
        "command": "south",
        "target": "Elm & River"
      },
      "WEST": {
        "command": "west",
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
        "target": "Southway & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "River & Kennedy"
      },
      "SE": {
        "command": "se",
        "target": "Athletic Field"
      },
      "SOUTH": {
        "command": "south",
        "target": "Aquarium & Park"
      },
      "WEST": {
        "command": "west",
        "target": "Stadium Lot B"
      },
      "NW": {
        "command": "nw",
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
        "target": "Elm & River"
      },
      "SOUTH": {
        "command": "south",
        "target": "Skycar Lot"
      },
      "NW": {
        "command": "nw",
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
        "target": "Elm Underpass"
      },
      "OUT": {
        "command": "out",
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
        "target": "Main & Wicker"
      },
      "OUT": {
        "command": "out",
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
        "target": "Rockvil Stadium"
      },
      "OUT": {
        "command": "out",
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
        "target": "Halley Park West"
      },
      "OUT": {
        "command": "out",
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
        "target": "Elm & River"
      },
      "OUT": {
        "command": "out",
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
        "target": "Wicker & River"
      },
      "OUT": {
        "command": "out",
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
        "target": "Terminal"
      },
      "OUT": {
        "command": "out",
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
        "target": "Bodanski Square"
      },
      "OUT": {
        "command": "out",
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
        "target": "Elm & University"
      },
      "OUT": {
        "command": "out",
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
        "target": "Skybus Terminal"
      },
      "OUT": {
        "command": "out",
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
        "target": "Stadium Lot A"
      },
      "EAST": {
        "command": "east",
        "target": "Aquarium & Park"
      },
      "SOUTH": {
        "command": "south",
        "target": "Zoo"
      },
      "WEST": {
        "command": "west",
        "target": "Aquarium Underpass"
      },
      "IN": {
        "command": "in",
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
        "target": "Living Room"
      },
      "EAST": {
        "command": "east",
        "target": "Kitchen"
      },
      "IN": {
        "command": "in",
        "target": "Kitchen"
      },
      "OUT": {
        "command": "out",
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
        "target": "Main & River"
      },
      "NE": {
        "command": "ne",
        "target": "Heiman Village"
      },
      "EAST": {
        "command": "east",
        "target": "Heiman Village"
      },
      "SE": {
        "command": "se",
        "target": "Heiman Village"
      },
      "SOUTH": {
        "command": "south",
        "target": "Southway & River"
      },
      "WEST": {
        "command": "west",
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
        "target": "Bedroom"
      },
      "EAST": {
        "command": "east",
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
        "target": "Master Bedroom"
      },
      "EAST": {
        "command": "east",
        "target": "Dining Room"
      },
      "NORTH": {
        "command": "north",
        "target": "Foyer"
      },
      "SOUTH": {
        "command": "south",
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
        "target": "Elm & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "Rockvil Reformatory"
      },
      "SE": {
        "command": "se",
        "target": "River & Park"
      },
      "SW": {
        "command": "sw",
        "target": "Stadium Lot C"
      },
      "WEST": {
        "command": "west",
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
        "target": "Elm & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "Bend"
      },
      "OUT": {
        "command": "out",
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
        "target": "Rockvil Centre"
      },
      "EAST": {
        "command": "east",
        "target": "Elm & Kennedy"
      },
      "SE": {
        "command": "se",
        "target": "Post Office"
      },
      "SOUTH": {
        "command": "south",
        "target": "Southway & Park"
      },
      "SW": {
        "command": "sw",
        "target": "Police Station"
      },
      "WEST": {
        "command": "west",
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
        "target": "Foyer"
      },
      "OUT": {
        "command": "out",
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
        "target": "Centre & Kennedy"
      },
      "WEST": {
        "command": "west",
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
        "target": "Bend"
      },
      "OUT": {
        "command": "out",
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
        "target": "Southway & Kennedy"
      },
      "NE": {
        "command": "ne",
        "target": "Southway & River"
      },
      "NW": {
        "command": "nw",
        "target": "Southway & Park"
      },
      "OUT": {
        "command": "out",
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
        "target": "Southway & River"
      },
      "SW": {
        "command": "sw",
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
        "target": "health center"
      },
      "NW": {
        "command": "nw",
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
        "target": "Aquarium & Park"
      },
      "WEST": {
        "command": "west",
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
        "target": "first methodist church"
      },
      "EAST": {
        "command": "east",
        "target": "Bodanski Square"
      },
      "WEST": {
        "command": "west",
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
        "target": "Symphony Entrance"
      },
      "WEST": {
        "command": "west",
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
        "target": "Wicker & Pier"
      },
      "OUT": {
        "command": "out",
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
        "target": "Dump Entrance"
      },
      "OUT": {
        "command": "out",
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
        "target": "Rockvil Centre"
      },
      "OUT": {
        "command": "out",
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
        "target": "Southway Underpass"
      },
      "OUT": {
        "command": "out",
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
        "target": "Southway & Park"
      },
      "SW": {
        "command": "sw",
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
        "target": "Main & Wicker"
      },
      "OUT": {
        "command": "out",
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
        "target": "Pier"
      },
      "OUT": {
        "command": "out",
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
        "target": "Industrial Park Entrance"
      },
      "OUT": {
        "command": "out",
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
        "target": "Aquarium & Kennedy"
      },
      "WEST": {
        "command": "west",
        "target": "Skycar Lot"
      },
      "NW": {
        "command": "nw",
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
        "target": "Bedroom"
      },
      "WEST": {
        "command": "west",
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
        "target": "Main & Wicker"
      },
      "SW": {
        "command": "sw",
        "target": "Main & Church"
      },
      "WEST": {
        "command": "west",
        "target": "church entrance"
      },
      "NW": {
        "command": "nw",
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
        "target": "Rockvil Centre"
      },
      "OUT": {
        "command": "out",
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
        "target": "Factory Entrance"
      },
      "OUT": {
        "command": "out",
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
        "target": "Elm & Kennedy"
      },
      "SW": {
        "command": "sw",
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
        "target": "Patio"
      },
      "NORTH": {
        "command": "north",
        "target": "Living Room"
      },
      "IN": {
        "command": "in",
        "target": "Living Room"
      },
      "OUT": {
        "command": "out",
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
        "target": "Wicker & River"
      },
      "EAST": {
        "command": "east",
        "target": "Power Station Entrance"
      },
      "WEST": {
        "command": "west",
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
        "target": "Factory Entrance"
      },
      "OUT": {
        "command": "out",
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
        "target": "Wicker & Pier"
      },
      "OUT": {
        "command": "out",
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
        "target": "Living Room"
      },
      "OUT": {
        "command": "out",
        "target": "Living Room"
      },
      "EAST": {
        "command": "east",
        "target": "Bathroom"
      },
      "IN": {
        "command": "in",
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
        "target": "Living Room"
      },
      "OUT": {
        "command": "out",
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
        "target": "Dining Room"
      },
      "OUT": {
        "command": "out",
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
        "target": "Bodanski Square"
      },
      "OUT": {
        "command": "out",
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
        "target": "Skycar Lot"
      },
      "EAST": {
        "command": "east",
        "target": "Skycar Lot"
      },
      "SE": {
        "command": "se",
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
        "target": "Factory Entrance"
      },
      "WEST": {
        "command": "west",
        "target": "Factory Entrance"
      },
      "EAST": {
        "command": "east",
        "target": "Bar"
      },
      "IN": {
        "command": "in",
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
        "target": "Living Room"
      },
      "SW": {
        "command": "sw",
        "target": "Bath"
      },
      "DOWN": {
        "command": "down",
        "target": "Bath"
      },
      "EAST": {
        "command": "east",
        "target": "Guest Room"
      },
      "WEST": {
        "command": "west",
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
        "target": "Solarium"
      },
      "IN": {
        "command": "in",
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
        "target": "Aquarium & Kennedy"
      },
      "OUT": {
        "command": "out",
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
        "target": "Foyer"
      },
      "OUT": {
        "command": "out",
        "target": "Foyer"
      },
      "UP": {
        "command": "up",
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
        "target": "Southway & River"
      },
      "NE": {
        "command": "ne",
        "target": "construction site 2"
      },
      "SE": {
        "command": "se",
        "target": "Wicker & River"
      },
      "WEST": {
        "command": "west",
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
        "target": "Rockvil University"
      },
      "OUT": {
        "command": "out",
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
        "target": "Bar"
      },
      "NW": {
        "command": "nw",
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
        "target": "Foyer"
      },
      "OUT": {
        "command": "out",
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
        "target": "Zoo Entrance"
      },
      "EAST": {
        "command": "east",
        "target": "Skycar Lot"
      }
    }
  }
];
