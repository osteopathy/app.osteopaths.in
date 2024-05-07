CREATE MIGRATION m1ok7qiqws4zo6tjac335dltvy3e63afe43akyh224bfstucu3se7a
    ONTO m1i7yfy36nulqcuovz4uuye3w633tpq5qtt4422klazfhwugkxsdrq
{
  ALTER TYPE default::User {
      CREATE INDEX ON (.email);
  };
};
