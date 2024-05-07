module default {
    scalar type Role extending enum<Admin, User, Osteopath>;

    type Session {
        required user: User;
        required expiresAt: datetime;
        index on (.user);
    }
    
    type User {
        required email: str;
        multi link sessions := .<user[is Session];

        createdAt: datetime {
            rewrite insert using (datetime_of_statement());
        }
        updatedAt: datetime {
            rewrite insert using (datetime_of_statement());
            rewrite update using (datetime_of_statement());
        }
    }
}