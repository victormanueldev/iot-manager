export interface Device {
    id?         : string;
    name        : string,
    description : string;
    image       : string;
    status      : string;
    enabled     : boolean;
    createdAt?  : Date;
}