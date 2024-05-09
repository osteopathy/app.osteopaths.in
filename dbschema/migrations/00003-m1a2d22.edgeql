CREATE MIGRATION m1a2d22jhdodx4lxiph47efmjhb7qv4oaiqyxmpfly4tm4rhgagxka
    ONTO m1n5wli3envtfics32xfrbaew2azcjt7p3k3tqwtoskeoie3fald3q
{
  ALTER TYPE default::User {
      ALTER PROPERTY name {
          RENAME TO email;
      };
  };
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          SET REQUIRED USING (<std::str>{});
      };
  };
  CREATE SCALAR TYPE default::Role EXTENDING enum<Admin, User, Osteopath>;
};
