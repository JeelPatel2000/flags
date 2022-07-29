import { randomUUID } from "crypto";
import { Request, Response, Router } from "express";
import { Client } from "../../models/Interfaces/Client";

export function flagsSubsribeRouter(clients: Client[]) {
    const router = Router();

    router.get(
        "/subscribeToFlagUpdates/:projectId",
        async (req: Request<{ projectId: string }>, res: Response) => {
            const { projectId } = req.params;
            res.setHeader("Cache-Control", "no-cache");
            res.setHeader("Content-Type", "text/event-stream");
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.setHeader("Connection", "keep-alive");
            res.flushHeaders(); // flush the headers to establish SSE with client

            const clientId = randomUUID();

            const data = {
                flags: [{ name: "navigation-driver-1", status: true }],
            };

            res.write(JSON.stringify(data));

            const newClient: Client = {
                clientId: clientId,
                projectId: projectId,
                response: res,
            };

            clients.push(newClient);

            req.on("close", () => {
                console.log(`${clientId} Connection closed`);
                // clients = clients.filter(client => client.id !== clientId);
            });
        }
    );

    return router;
}
