CREATE MIGRATION m13q3byhy6zk4xgwuylpowvqp6tdcgkfbo7yptpieazk5oj6gth3qa
    ONTO m1ceen7igmzpyqykwfxgrm3j3earnjqja3ww3n474pvq7jakktr25a
{
  ALTER TYPE default::Calendar {
      CREATE INDEX ON (.gmail);
  };
};
