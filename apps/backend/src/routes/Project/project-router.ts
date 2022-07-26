import { Request, Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { IProjectRepository } from "../../repository/interfaces/IProjectRepository";
import { RequestSchema } from "../Authentication/validator";
import { ProjectPostSchema } from "./validator";

export function ProjectRouter(projectRepository: IProjectRepository) {
    const router = Router();

    router.get(
        "/:userId",
        async (req: Request<{ userId: string }>, res: Response) => {
            const userId = req.params.userId;

            const userProjects = await projectRepository.getAllProjectsForUser(
                userId
            );

            res.send(`${JSON.stringify(userProjects)}`);
        }
    );

    router.post(
        "/",
        async (
            req: ValidatedRequest<RequestSchema<ProjectPostSchema>>,
            res: Response
        ) => {
            const { name, description, userId } = req.body;

            const projectId = await projectRepository.create({
                description: description,
                name: name,
                userId: userId,
            });

            res.send(`Project Id: ${projectId}`);
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
