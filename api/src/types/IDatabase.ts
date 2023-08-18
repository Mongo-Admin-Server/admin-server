
export interface IDatabase{
    /** Nom de la base de données */
    name: string,
    
    /** Taille de la base  */
    sizeOnDisk?: number,
    
    /** Base de donnée vide  */
    empty?: boolean,
    
    /** Le nombre de collections */
    collections?: any,
}

export type IDatabaseUpdate = Partial<IDatabase>;
export type IDatabaseRO = Readonly<IDatabase>;