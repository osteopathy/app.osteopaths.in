CREATE MIGRATION m1ceen7igmzpyqykwfxgrm3j3earnjqja3ww3n474pvq7jakktr25a
    ONTO m1luwpyzgh7v7etgtqihv4igyeyaxf3n4zkposgxnh2vyzdxjil7mq
{
  ALTER TYPE default::Calendar {
      CREATE REQUIRED PROPERTY accessToken: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY accessTokenExpiresAt: std::datetime {
          SET REQUIRED USING (<std::datetime>{});
      };
      CREATE REQUIRED PROPERTY calendarId: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE PROPERTY eventId: std::str;
      CREATE REQUIRED PROPERTY gmail: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY idToken: std::str {
          SET REQUIRED USING (<std::str>{});
      };
      CREATE REQUIRED PROPERTY refreshToken: std::str {
          SET REQUIRED USING (<std::str>{});
      };
  };
};
