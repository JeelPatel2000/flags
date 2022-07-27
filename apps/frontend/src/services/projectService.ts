import http from "./httpService";

const apiEndpoint = "/projects";

export async function getAllProjectsForUser(userId: string) {
    const result = await http.get(`${apiEndpoint}/${userId}`);

    return result;
}

export async function addProject(project: any) {
    const result = await http.post(`${apiEndpoint}`, project);
    return result;
}

export async function getProjectById(projectId: string) {
    const { data } = await http.get(`${apiEndpoint}/project/${projectId}`);
    return data;
}
