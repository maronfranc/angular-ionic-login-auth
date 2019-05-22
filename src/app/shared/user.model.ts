export class User {
    constructor(
        address: Address,
        created: string,
        email: string,
        gender: number,
        id: number,
        imageProfile: string,
        name: string,
        permission: any,
        slug: string,
        status: number,
        teacher: Teacher,
        updated: string
    ) { }
}

export class Teacher {
    constructor(
        created: string,
        id: number,
        needsReview: number,
        order: number,
        updated: string
    ) { }
}

export interface Address {
    complement: string;
    number: string;
    street: string;
    zipCode: string;
}
