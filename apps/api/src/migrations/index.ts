import * as migration_20260410_133557 from './20260410_133557';
import * as migration_20260410_144520 from './20260410_144520';
import * as migration_20260412_062140_schema_brands_programs_v2 from './20260412_062140_schema_brands_programs_v2';
import * as migration_20260420_185812_program_cta from './20260420_185812_program_cta';
import * as migration_20260420_193220_exhibitions_city from './20260420_193220_exhibitions_city';

export const migrations = [
  {
    up: migration_20260410_133557.up,
    down: migration_20260410_133557.down,
    name: '20260410_133557',
  },
  {
    up: migration_20260410_144520.up,
    down: migration_20260410_144520.down,
    name: '20260410_144520',
  },
  {
    up: migration_20260412_062140_schema_brands_programs_v2.up,
    down: migration_20260412_062140_schema_brands_programs_v2.down,
    name: '20260412_062140_schema_brands_programs_v2',
  },
  {
    up: migration_20260420_185812_program_cta.up,
    down: migration_20260420_185812_program_cta.down,
    name: '20260420_185812_program_cta',
  },
  {
    up: migration_20260420_193220_exhibitions_city.up,
    down: migration_20260420_193220_exhibitions_city.down,
    name: '20260420_193220_exhibitions_city'
  },
];
