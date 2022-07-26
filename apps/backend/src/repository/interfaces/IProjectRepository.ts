import { IBaseRepository } from "./IBaseRepository";

export interface Project {
    id: string;
    name: string;
    description: string;
    userId: string;
}

export interface IProjectRepository extends IBaseRepository<Project> {
    getAllProjectsForUser(userId: string): Promise<Project[]>;
    getProjectById(projectId: string): Promise<Project>;
    createWithUUID(item: Project): Promise<Project>;
}
