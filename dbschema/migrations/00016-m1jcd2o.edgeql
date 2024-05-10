CREATE MIGRATION m1jcd2opx6sx3utadosim6qd3qw4qzalberff6b7dqm6dxju6yciha
    ONTO m1xoevuoqs2y6zevzhgsntradouqu27xbmjgtuqozxatqcx6t6zdtq
{
  ALTER TYPE default::Session {
      ALTER LINK user {
          RESET ON SOURCE DELETE;
      };
  };
};
