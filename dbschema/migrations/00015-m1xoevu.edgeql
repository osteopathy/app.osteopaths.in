CREATE MIGRATION m1xoevuoqs2y6zevzhgsntradouqu27xbmjgtuqozxatqcx6t6zdtq
    ONTO m1fw33wfkl2uh5fbzztf7rxvta2y7ujd53ecwwihdcf77fzi7j7kga
{
  ALTER TYPE default::Session {
      ALTER LINK user {
          ON SOURCE DELETE DELETE TARGET;
      };
  };
};
