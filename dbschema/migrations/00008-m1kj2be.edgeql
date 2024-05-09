CREATE MIGRATION m1kj2be25whlmpsfwl3mpay7fckv6cidub3t7vlv4cyanmtl4afg2a
    ONTO m1ok7qiqws4zo6tjac335dltvy3e63afe43akyh224bfstucu3se7a
{
  ALTER TYPE default::User {
      ALTER PROPERTY email {
          CREATE CONSTRAINT std::exclusive;
      };
  };
};
