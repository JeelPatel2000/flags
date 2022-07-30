import { randomUUID } from "crypto";
import { Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { Client } from "../../models/Interfaces/Client";
import { IFlagsRepository } from "../../repository/interfaces/IFlagsRepository";
import { RequestQuerySchema } from "../Authentication/validator";

export function flagsSubsribeRouter(
    clients: Client[],
    flagsRepository: IFlagsRepository
) {
    const router = Router();

    router.get(
        "/subscribeToFlagUpdates",
        async (
            req: ValidatedRequest<RequestQuerySchema<{ projectId: string }>>,
            res: Response
        ) => {
            try {
                const { projectId } = req.query;
                res.setHeader("Cache-Control", "no-cache");
                res.setHeader("Content-Type", "text/event-stream");
                res.setHeader("Access-Control-Allow-Origin", "*");
                res.setHeader("Connection", "keep-alive");
                res.flushHeaders(); // flush the headers to establish SSE with client

                const clientId = randomUUID();

                const flags = await flagsRepository.getAllFlagsForAProject(
                    projectId
                );

                const data = {
                    flags: flags.map((flag) => ({
                        flagKey: flag.name,
                        state: flag.state,
                    })),
                };

                res.write(`data: ${JSON.stringify(data)}\n\n`);

                const newClient: Client = {
                    clientId: clientId,
                    projectId: projectId,
                    response: res,
                };

                clients.push(newClient);

                req.on("close", () => {
                    const tempClients = [...clients];
                    clients.splice(0, clients.length);
                    clients.push(
                        ...tempClients.filter(
                            (client) => client.clientId !== clientId
                        )
                    );
                });
            } catch (err) {
                console.log(err);
                res.status(400).send("Error");
            }
        }
    );

    return router;
}
