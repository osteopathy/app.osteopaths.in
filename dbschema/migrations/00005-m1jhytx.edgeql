CREATE MIGRATION m1jhytxcb3houkh5e5bvgaza7hqswieysqzm3mx7ssxno4y5bvhbsa
    ONTO m1mpcfijallyjmecqm73e76lzmpahig4yq2kagxy75o5zarsmqlm4a
{
  CREATE TYPE default::Session {
      CREATE REQUIRED LINK user: default::User;
      CREATE INDEX ON (.user);
      CREATE REQUIRED PROPERTY expiresAt: std::datetime;
  };
};
