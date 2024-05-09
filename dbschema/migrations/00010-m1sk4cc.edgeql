CREATE MIGRATION m1sk4cc7dizsf6vxlo2m66vd4ymwaqcqzw6lu5pqdu6wjlhe2rygfa
    ONTO m1pxakm5k3k674k5ocr5l5panr3vvwrglv66zukmeucc4tdzrkdsea
{
  CREATE TYPE default::Course {
      CREATE REQUIRED PROPERTY code: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.code);
      CREATE REQUIRED PROPERTY description: std::str;
      CREATE REQUIRED PROPERTY label: std::str;
  };
  CREATE TYPE default::Student {
      CREATE REQUIRED LINK course: default::Course;
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.email);
      CREATE PROPERTY batch: std::str;
      CREATE PROPERTY isAlumni: std::bool;
      CREATE PROPERTY university: std::str;
  };
  CREATE TYPE default::Osteopath {
      CREATE REQUIRED PROPERTY username: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.username);
      CREATE LINK student: default::Student;
      CREATE PROPERTY bio: std::str;
      CREATE PROPERTY friday: std::json;
      CREATE PROPERTY monday: std::json;
      CREATE PROPERTY saturday: std::json;
      CREATE PROPERTY sunday: std::json;
      CREATE PROPERTY thursday: std::json;
      CREATE PROPERTY tuesday: std::json;
      CREATE PROPERTY verification_by: std::str;
      CREATE PROPERTY wednesday: std::json;
  };
  ALTER TYPE default::User {
      CREATE LINK osteopath: default::Osteopath {
          CREATE CONSTRAINT std::exclusive;
      };
      ALTER PROPERTY role {
          SET default := 'user';
      };
      CREATE PROPERTY status: std::str;
  };
  ALTER TYPE default::Osteopath {
      CREATE SINGLE LINK user := (.<osteopath[IS default::User]);
  };
  ALTER SCALAR TYPE default::Role EXTENDING enum<admin, user, osteopath>;
};
