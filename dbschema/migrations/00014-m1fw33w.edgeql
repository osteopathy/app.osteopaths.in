CREATE MIGRATION m1fw33wfkl2uh5fbzztf7rxvta2y7ujd53ecwwihdcf77fzi7j7kga
    ONTO m13q3byhy6zk4xgwuylpowvqp6tdcgkfbo7yptpieazk5oj6gth3qa
{
  ALTER TYPE default::Calendar {
      ALTER PROPERTY gmail {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
