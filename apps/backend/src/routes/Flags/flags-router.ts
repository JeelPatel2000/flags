import { randomUUID } from "crypto";
import { Request, Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { IFlagsRepository } from "../../repository/interfaces/IFlagsRepository";
import { RequestSchema } from "../Authentication/validator";
import { FlagsPostSchema } from "./validator";

export function flagsRouter(flagsRepository: IFlagsRepository) {
    const router = Router();

    router.get(
        "/project/:projectId",
        async (req: Request<{ projectId: string }>, res: Response) => {
            const projectId = req.params.projectId;

            const projectFlags = await flagsRepository.getAllFlagsForAProject(
                projectId
            );

            res.type("json").send(`${JSON.stringify(projectFlags)}`);
        }
    );

    router.post(
        "/",
        async (
            req: ValidatedRequest<RequestSchema<FlagsPostSchema>>,
            res: Response
        ) => {
            const { name, description, projectId, state } = req.body;

            const uuid = randomUUID();
            try {
                await flagsRepository.createWithUUID({
                    id: uuid,
                    description: description,
                    name: name,
                    projectId: projectId,
                    state: state,
                });
            } catch (err) {
                console.log(`Error: ${err}`);
                return res.status(400).send("Cannot create flag!");
            }

            res.send(`Flag Id: ${uuid}`);
        }
    );

    router.delete(
        "/:flagId",
        async (req: Request<{ flagId: string }>, res: Response) => {
            const { flagId } = req.params;

            if (!flagId) return res.status(400).send();

            const deleted = await flagsRepository.delete(flagId);

            if (!deleted)
                return res
                    .status(400)
                    .send(`Flag ${flagId} could not be deleted!`);

            res.status(200).send(`Flag ${flagId} deleted!`);
        }
    );

    return router;
}
