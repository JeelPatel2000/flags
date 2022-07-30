import { randomUUID } from "crypto";
import { Request, Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { IFlagsRepository } from "../../repository/interfaces/IFlagsRepository";
import { IProjectRepository } from "../../repository/interfaces/IProjectRepository";
import { RequestBodySchema } from "../Authentication/validator";
import { ProjectPostSchema } from "./validator";

export function projectRouter(
    projectRepository: IProjectRepository,
    flagsRepository: IFlagsRepository
) {
    const router = Router();

    router.get(
        "/user/:userId",
        async (req: Request<{ userId: string }>, res: Response) => {
            const userId = req.params.userId;

            let userProjects = await projectRepository.getAllProjectsForUser(
                userId
            );
            userProjects = await Promise.all(
                userProjects.map(async (project) => {
                    const flags = await flagsRepository.getAllFlagsForAProject(
                        project.id
                    );
                    return {
                        ...project,
                        noOfFeatureFlags: flags.length,
                    };
                })
            );

            res.send(`${JSON.stringify(userProjects)}`);
        }
    );

    router.post(
        "/",
        async (
            req: ValidatedRequest<RequestBodySchema<ProjectPostSchema>>,
            res: Response
        ) => {
            const { name, description, userId } = req.body;

            const uuid = randomUUID();

            try {
                await projectRepository.createWithUUID({
                    id: uuid,
                    description: description,
                    name: name,
                    userId: userId,
                });
            } catch (err) {
                console.log(err);
                return res.status(400).send("Error while creating project");
            }
            res.send(`Project Id: ${uuid}`);
        }
    );

    router.get(
        "/:projectId",
        async (req: Request<{ projectId: string }>, res: Response) => {
            const projectId = req.params.projectId;
            const project = await projectRepository.getProjectById(projectId);

            res.send(`${JSON.stringify(project)}`);
        }
    );

    router.delete(
        "/:projectId",
        async (req: Request<{ projectId: string }>, res: Response) => {
            const projectId = req.params.projectId;

            if (!projectId) return res.status(400).send();

            const deleted = await projectRepository.delete(projectId);

            if (!deleted)
                return res
                    .status(400)
                    .send(`Project ${projectId} could not be deleted!`);

            res.status(200).send(`Project ${projectId} deleted!`);
        }
    );

    return router;
}
