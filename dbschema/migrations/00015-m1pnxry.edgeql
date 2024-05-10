CREATE MIGRATION m1pnxrykkwmuulrt2gkc562unv52z2b4cgw3atz4oicewll6hd5gja
    ONTO m1fw33wfkl2uh5fbzztf7rxvta2y7ujd53ecwwihdcf77fzi7j7kga
{
  ALTER TYPE default::User {
      CREATE PROPERTY phoneNumber: std::str;
  };
};
