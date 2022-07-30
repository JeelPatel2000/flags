import { randomUUID } from "crypto";
import { EventEmitter } from "events";
import { Request, Response, Router } from "express";
import { createValidator, ValidatedRequest } from "express-joi-validation";
import { IFlagsRepository } from "../../repository/interfaces/IFlagsRepository";
import { RequestBodySchema } from "../Authentication/validator";
import {
    flagsPatchSchema,
    FlagsPatchSchema,
    flagsPostSchema,
    FlagsPostSchema,
} from "./validator";

export function flagsRouter(
    flagsRepository: IFlagsRepository,
    eventEmitter: EventEmitter
) {
    const router = Router();
    const validator = createValidator();

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
        validator.body(flagsPostSchema),
        async (
            req: ValidatedRequest<RequestBodySchema<FlagsPostSchema>>,
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

    router.patch(
        "/:flagId",
        validator.body(flagsPatchSchema),
        async (
            req: ValidatedRequest<RequestBodySchema<FlagsPatchSchema>>,
            res: Response
        ) => {
            const { flagId } = req.params;
            const { name, description, state, projectId } = req.body;

            try {
                const updated = await flagsRepository.update(flagId, {
                    name,
                    description,
                    state,
                });

                if (!updated)
                    return res.status(400).send(`Flag ${flagId} not updated!`);
            } catch (err) {
                return res
                    .status(400)
                    .send(`Error while updated flag ${flagId}`);
            }

            eventEmitter.emit("flagsUpdated", {
                projectId,
            });

            res.status(200).send(`Flag updated!`);
        }
    );

    return router;
}
