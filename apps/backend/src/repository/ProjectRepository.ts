import { BaseRepository } from "./BaseRepository";
import { IProjectRepository, Project } from "./interfaces/IProjectRepository";

export class ProjectRepository
    extends BaseRepository<Project>
    implements IProjectRepository
{
    getAllProjectsForUser(userId: string): Promise<Project[]> {
        const projects = this.queryBuilder
            .select("*")
            .from("projects")
            .where({ userId: userId });
        return projects as Promise<Project[]>;
    }
    getProjectById(projectId: string): Promise<Project> {
        console.log(projectId);
        const project = this.queryBuilder
            .select("*")
            .from("projects")
            .where({ id: projectId });
        console.log(project);
        return project;
    }
}
