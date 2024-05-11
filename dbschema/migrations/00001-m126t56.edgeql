CREATE MIGRATION m126t56lhklkigcobsqd5w6zz3jtyha5vpdibvnh7tagcf2ajsmhia
    ONTO initial
{
  CREATE TYPE default::Calendar {
      CREATE REQUIRED PROPERTY gmail: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.gmail);
      CREATE REQUIRED PROPERTY accessToken: std::str;
      CREATE REQUIRED PROPERTY accessTokenExpiresAt: std::datetime;
      CREATE REQUIRED PROPERTY calendarId: std::str;
      CREATE PROPERTY eventId: std::str;
      CREATE REQUIRED PROPERTY idToken: std::str;
      CREATE REQUIRED PROPERTY refreshToken: std::str;
  };
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
  CREATE SCALAR TYPE default::Role EXTENDING enum<admin, user, osteopath>;
  CREATE TYPE default::User {
      CREATE LINK osteopath: default::Osteopath {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE REQUIRED PROPERTY email: std::str {
          CREATE CONSTRAINT std::exclusive;
      };
      CREATE INDEX ON (.email);
      CREATE PROPERTY createdAt: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY phoneNumber: std::str;
      CREATE PROPERTY picture: std::str;
      CREATE PROPERTY role: default::Role {
          SET default := 'user';
      };
      CREATE PROPERTY status: std::str;
      CREATE PROPERTY updatedAt: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::Osteopath {
      CREATE SINGLE LINK user := (.<osteopath[IS default::User]);
  };
  CREATE TYPE default::Session {
      CREATE REQUIRED LINK user: default::User;
      CREATE INDEX ON (.user);
      CREATE REQUIRED PROPERTY expiresAt: std::datetime;
  };
  ALTER TYPE default::User {
      CREATE MULTI LINK sessions := (.<user[IS default::Session]);
  };
};
