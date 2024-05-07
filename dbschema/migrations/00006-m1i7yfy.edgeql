CREATE MIGRATION m1i7yfy36nulqcuovz4uuye3w633tpq5qtt4422klazfhwugkxsdrq
    ONTO m1jhytxcb3houkh5e5bvgaza7hqswieysqzm3mx7ssxno4y5bvhbsa
{
  ALTER TYPE default::User {
      CREATE MULTI LINK sessions := (.<user[IS default::Session]);
  };
};
