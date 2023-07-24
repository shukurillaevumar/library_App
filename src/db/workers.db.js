const ROLE = {
    DIRECTOR: "director",
    LIBRARIAN: "librarian",
    SECURITY: "security",
    CLEANER: "cleaner"
}

const workers = [
    {
        id: "fae8daa8-7942-401b-b25e-f5fe0d2d9a6e",
        name: "Muhammadumar",
        age: "15",
        role: ROLE.DIRECTOR,
        email: "muhammadumar@gmail.com"
    },
    {
        id: "233711ea-5e30-49cd-86b2-5612d28513b7",
        name: "John Doe",
        age: "34",
        role: ROLE.SECURITY,
        email: "example@gmail.com"
    },
    {
        id: "4653e047-505b-45f8-b164-2592e08025de",
        name: "Will Smith",
        age: "36",
        role: ROLE.LIBRARIAN,
        email: "example@gmail.com"
    },
    {
        id: "f2823d94-1155-469d-b4db-a22a62b121c1",
        name: "Ann Wotson",
        age: "24",
        role: ROLE.CLEANER,
        email: "example@gmail.com"
    }
]

module.exports = workers;
