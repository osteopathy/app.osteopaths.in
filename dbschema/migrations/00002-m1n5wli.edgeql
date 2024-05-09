CREATE MIGRATION m1n5wli3envtfics32xfrbaew2azcjt7p3k3tqwtoskeoie3fald3q
    ONTO m1nsh35wghlfdbtjtlicv4ebyeynpreyiaaullvyyu6v2blavoktka
{
  ALTER TYPE default::Account {
      DROP CONSTRAINT std::exclusive ON ((.provider, .providerAccountId));
      DROP PROPERTY userId;
  };
  ALTER TYPE default::User {
      DROP LINK accounts;
      ALTER LINK sessions {
          RESET CARDINALITY;
      };
      DROP PROPERTY createdAt;
      DROP PROPERTY email;
      DROP PROPERTY emailVerified;
      DROP PROPERTY image;
  };
  DROP TYPE default::Account;
  ALTER TYPE default::Session {
      CREATE INDEX ON (.user);
  };
  ALTER TYPE default::Session {
      DROP PROPERTY createdAt;
  };
  ALTER TYPE default::Session {
      DROP PROPERTY expires;
  };
  ALTER TYPE default::Session {
      CREATE REQUIRED PROPERTY expiresAt: std::int64 {
          SET REQUIRED USING (<std::int64>{});
      };
      DROP PROPERTY sessionToken;
  };
  ALTER TYPE default::Session {
      DROP PROPERTY userId;
  };
  DROP TYPE default::VerificationToken;
};
