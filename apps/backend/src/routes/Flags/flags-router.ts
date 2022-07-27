import { Request, Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { IFlagsRepository } from "../../repository/interfaces/IFlagsRepository";
import { RequestSchema } from "../Authentication/validator";
import { FlagsPostSchema } from "./validator";

export function ProjectRouter(flagsRepository: IFlagsRepository) {
    const router = Router();

    router.get(
        "/:projectId",
        async (req: Request<{ projectId: string }>, res: Response) => {
            const projectId = req.params.projectId;

            const projectFlags = await flagsRepository.getAllFlagsForAProject(
                projectId
            );

            res.send(`${JSON.stringify(projectFlags)}`);
        }
    );

    router.post(
        "/",
        async (
            req: ValidatedRequest<RequestSchema<FlagsPostSchema>>,
            res: Response
        ) => {
            const { name, description, projectId, state } = req.body;

            const flagId = await flagsRepository.create({
                description: description,
                name: name,
                projectId: projectId,
                state: state,
            });

            res.send(`Flag Id: ${flagId}`);
        }
    );

    router.delete(
        "/:projectId/:flagId",
        async (
            req: Request<{ projectId: string; flagId: string }>,
            res: Response
        ) => {
            const { projectId, flagId } = req.params;

            if (!projectId || !flagId) return res.status(400).send();

            const deleted = await flagsRepository.deleteProject(
                projectId,
                flagId
            );

            if (!deleted)
                return res
                    .status(400)
                    .send(`Project ${projectId} could not be deleted!`);

            res.status(200).send(`Project ${projectId} deleted!`);
        }
    );

    return router;
}
