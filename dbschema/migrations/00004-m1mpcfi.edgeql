CREATE MIGRATION m1mpcfijallyjmecqm73e76lzmpahig4yq2kagxy75o5zarsmqlm4a
    ONTO m1a2d22jhdodx4lxiph47efmjhb7qv4oaiqyxmpfly4tm4rhgagxka
{
  ALTER TYPE default::Session {
      DROP INDEX ON (.user);
  };
  ALTER TYPE default::User {
      DROP LINK sessions;
  };
  DROP TYPE default::Session;
  ALTER TYPE default::User {
      CREATE PROPERTY createdAt: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
      };
  };
  ALTER TYPE default::User {
      CREATE PROPERTY updatedAt: std::datetime {
          CREATE REWRITE
              INSERT 
              USING (std::datetime_of_statement());
          CREATE REWRITE
              UPDATE 
              USING (std::datetime_of_statement());
      };
  };
};
