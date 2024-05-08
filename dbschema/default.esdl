module default {
    scalar type Role extending enum<admin, user, osteopath>;

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
        role: Role {
            default := "user";
        };

        # this field will help us, figure out if the user is onboarding, or user is verification of himself
        status: str;

        osteopath: Osteopath {
            constraint exclusive;
        };

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

    type Osteopath {
        required username: str {
            constraint exclusive;
        };

        bio: str;
        verification_by: str;

        single link user := .<osteopath[is User];
        student: Student;

        sunday: json;
        monday: json;
        tuesday: json;
        wednesday: json;
        thursday: json;
        friday: json;
        saturday: json;

        index on (.username)
    }

    type Student {
        # university email address or email address used for verification of the student
        required email: str {
            constraint exclusive;
        };
        # srisriuniversity
        university: str;
        # 2024 batch
        batch: str;
        # is passed out
	    isAlumni: bool;

        required course: Course;
        index on (.email)
    }

    type Course {
        required code: str {
            constraint exclusive;
        };

        required label: str;
        required description: str;

        index on (.code)
    }

    type Osteopath {
        required username: str {
            constraint exclusive;
        };

        bio: str;
        verification_by: str;

        single link user := .<osteopath[is User];
        student: Student;

        sunday: json;
        monday: json;
        tuesday: json;
        wednesday: json;
        thursday: json;
        friday: json;
        saturday: json;

        index on (.username)
    }

    type Student {
        # university email address or email address used for verification of the student
        required email: str {
            constraint exclusive;
        };
        # srisriuniversity
        university: str;
        # 2024 batch
        batch: str;
        # is passed out
	    isAlumni: bool;

        required course: Course;
        index on (.email)
    }

    type Course {
        required code: str {
            constraint exclusive;
        };

        required label: str;
        required description: str;

        index on (.code)
    }
}
