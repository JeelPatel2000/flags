import { IBaseRepository } from "./IBaseRepository";

export interface Flag {
    id: string;
    name: string;
    description: string;
    state: boolean;
    projectId: string;
}

export interface IFlagsRepository extends IBaseRepository<Flag> {
    getAllFlagsForAProject(projectId: string): Promise<Flag[]>;
    deleteProject(projectId: string, flagId: string): Promise<boolean>;
}
