module default {
    scalar type Role extending enum<Admin, User, Osteopath>;

    type Session {
        required user: User;
        required expiresAt: datetime;
        
        index on (.user);
    }
    
    type User {
        required email: str {
            constraint exclusive;
        };

        name: str;
        picture: str;
        role: Role;

        multi link sessions := .<user[is Session];
        
        createdAt: datetime {
            rewrite insert using (datetime_of_statement());
        }
        
        updatedAt: datetime {
            rewrite insert using (datetime_of_statement());
            rewrite update using (datetime_of_statement());
        }
        
        index on (.email)
    }
}