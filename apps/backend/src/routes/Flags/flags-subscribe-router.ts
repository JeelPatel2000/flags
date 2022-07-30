import { randomUUID } from "crypto";
import { Response, Router } from "express";
import { ValidatedRequest } from "express-joi-validation";
import { Client } from "../../models/Interfaces/Client";
import { RequestQuerySchema } from "../Authentication/validator";

export function flagsSubsribeRouter(clients: Client[]) {
    const router = Router();

    router.get(
        "/subscribeToFlagUpdates",
        async (
            req: ValidatedRequest<RequestQuerySchema<{ projectId: string }>>,
            res: Response
        ) => {
            const { projectId } = req.query;
            console.log(projectId);
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders(); // flush the headers to establish SSE with client

            const clientId = randomUUID();

            const data = {
                flags: [{ name: "navigation-driver-1", status: true }],
            };

            res.write(`data: ${JSON.stringify(data)}\n\n`);

            const newClient: Client = {
                clientId: clientId,
                projectId: projectId,
                response: res,
            };

            clients.push(newClient);

            req.on("close", () => {
                // clients = clients.filter(client => client.id !== clientId);
            });
        }
    );

    return router;
}
