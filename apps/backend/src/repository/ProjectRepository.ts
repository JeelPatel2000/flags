import { BaseRepository } from "./BaseRepository";
import { IProjectRepository, Project } from "./interfaces/IProjectRepository";

export class ProjectRepository
    extends BaseRepository<Project>
    implements IProjectRepository
{
    async createWithUUID(item: Project): Promise<Project> {
        const [output] = await this.queryBuilder
            .insert<Project>(item)
            .returning("id");

        return output as Promise<Project>;
    }
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
