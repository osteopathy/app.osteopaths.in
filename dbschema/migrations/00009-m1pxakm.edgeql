CREATE MIGRATION m1pxakm5k3k674k5ocr5l5panr3vvwrglv66zukmeucc4tdzrkdsea
    ONTO m1kj2be25whlmpsfwl3mpay7fckv6cidub3t7vlv4cyanmtl4afg2a
{
  ALTER TYPE default::User {
      CREATE PROPERTY name: std::str;
      CREATE PROPERTY picture: std::str;
      CREATE PROPERTY role: default::Role;
  };
};
